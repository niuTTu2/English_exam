import assert from 'node:assert/strict';
import test, { after } from 'node:test';
import {createServer} from 'vite';
import {fileURLToPath} from 'node:url';
import {readFileSync} from 'node:fs';
const root=fileURLToPath(new URL('..',import.meta.url));
const v=await createServer({configFile:false,root,resolve:{alias:{'@':root}},server:{middlewareMode:true,hmr:false}});after(()=>v.close());
const {articleContents}=await v.ssrLoadModule('/app/data.ts');
const {resolveEntry}=await v.ssrLoadModule('/app/study-app.tsx');
const {assessLocation}=await v.ssrLoadModule('/app/location-model.ts');
const {hintAffectsTask,practiceHintTargets,taskKey}=await v.ssrLoadModule('/app/learning-model.ts');
const {trainingSources}=await v.ssrLoadModule('/app/training-sources.ts');
const {passage2011P1SourceContexts}=await v.ssrLoadModule('/app/2011-passage-1-contexts.ts');
const a=articleContents['2011-p1'];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];

test('2011 Text1按带hash原卷快照保留4段，19句，21—25原题与答案',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures/2011-p1.json',import.meta.url),'utf8'));
 assert.equal(f.sha256,'c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82');
 assert.deepEqual(a.paragraphs.map(p=>p.sentenceIds.map(id=>a.sentences.find(s=>s.id===id).text).join(' ')),f.paragraphs.map(p=>p.text));
 assert.deepEqual(a.questions.map(q=>q.answer),['B','D','C','A','D']);
 assert.equal(a.questions.flatMap(q=>[q.analysis.prompt,...Object.values(q.analysis.options)]).length,25);
 assert.equal(a.sentences[18].beginnerSyntax.clauses.length,0);
 assert.equal(a.sentences[16].beginnerSyntax.clauses.length,6);
 assert.ok(a.sentences[11].beginnerSyntax.clauses[0].predicateDetails.length===0,'increases后增幅不是宾语或补语');
});

test('2011 Text1提示使用实际点击词形，地图和反馈只影响声明任务',()=>{
 const sources=trainingSources(a);
 for(const sentence of a.sentences){const labels=new Set([...tokens(sentence.text),...sentence.phrases].map(t=>t.toLowerCase()));for(const task of sentence.practice){for(const word of task.hintWords??[])assert.ok(labels.has(word.toLowerCase()),`${sentence.id}/${task.id}/${word}不是点击入口`);}}
 const task=a.sentences[2].practice.find(t=>t.id==='let-actors');
 assert.ok(hintAffectsTask(task,'word','let'));
 assert.ok(!hintAffectsTask(task,'word','Simmons'));
 const s=a.sentences[16], relation=s.practice.find(t=>t.id==='nested-relations'), time=s.practice.find(t=>t.id==='news-versus-wrongdoing');
 assert.ok(practiceHintTargets(sources,'previous-answer','',s.id,relation).includes(taskKey(s.id,time)));
 assert.ok(!practiceHintTargets(sources,'previous-answer','',s.id,time).includes(taskKey(s.id,relation)));
});

test('2011 Text1作者态度须跨段，股票风险不与盈利及败诉混淆',()=>{
 const r=a.questions[4].reasoning,ids=a.sentences.map(s=>s.id);
 assert.ok(assessLocation(r,{scope:'whole-passage',sentenceIds:['2011-p1-s3','2011-p1-s6','2011-p1-s18']},ids).passed);
 assert.ok(!assessLocation(r,{scope:'whole-passage',sentenceIds:['2011-p1-s6']},ids).passed);
 assert.ok(!assessLocation(r,{scope:'whole-passage',sentenceIds:ids},ids).passed);
 assert.match(a.questions[2].reasoning.options.B.reasoning,/概率/);
 assert.match(a.questions[2].reasoning.options.D.reasoning,/诉讼/);
 assert.match(a.questions[3].reasoning.options.B.reasoning,/在任不等于本人/);
});

test('2011 Text1正文与25题目来源的词义、语法、首搭配按来源隔离',()=>{
 for(const [sourceId,words] of Object.entries(passage2011P1SourceContexts))for(const [word,context] of Object.entries(words)){
  const entry=resolveEntry(word,false,sourceId);
  assert.equal(entry.contextualMeaning,context.contextualMeaning,`${sourceId}/${word}义项`);
  assert.equal(entry.grammarSummary,context.use,`${sourceId}/${word}语法`);
  assert.equal(entry.collocationDetails[0].label,context.preferredCollocations[0],`${sourceId}/${word}首搭配`);
  const linked=resolveEntry(entry.collocationDetails[0].label,true,sourceId);
  assert.ok(linked.structures?.length,`${sourceId}/${word}搭配链接`);
 }
 for(const [word,sourceId,part] of [['which','2011-p1-s10',/interrogative/],['to','question-201124-option-C',/^prep/],['offers','question-201124-option-A',/^n\./],['tended','2011-p1-s14',/过去式/],['falling','2011-p1-s8',/present participle/]])assert.match(resolveEntry(word,false,sourceId).partOfSpeech,part);
 assert.equal(resolveEntry('she',false,'2011-p1-s2').contextualMeaning,'她（西蒙斯）');
 assert.equal(resolveEntry('positive',false,'question-201125-option-B').contextualMeaning,'积极肯定的');
 assert.equal(resolveEntry('she',false,'2010-p2-s13').use,'she 是 interviewed 的主语；women 是省略关系词所代指的宾语。');
});
