import assert from 'node:assert/strict';
import test,{after} from 'node:test';
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
const {passage2011P2SourceContexts}=await v.ssrLoadModule('/app/2011-passage-2-contexts.ts');
const {passage2011P2Lexicon}=await v.ssrLoadModule('/app/2011-passage-2-lexicon.ts');
const a=articleContents['2011-p2'];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];

test('2011 Text2原卷快照五段30句、26—30题和答案保持稳定，残句与倒装不伪造从句',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures/2011-p2.json',import.meta.url),'utf8'));
 assert.equal(f.sha256,'c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82');
 assert.deepEqual(a.paragraphs.map(p=>p.sentenceIds.map(id=>a.sentences.find(s=>s.id===id).text).join(' ')),f.paragraphs.map(p=>p.text));
 assert.deepEqual(a.questions.map(q=>q.answer),['D','B','C','A','A']);
 assert.equal(a.questions.flatMap(q=>[q.analysis.prompt,...Object.values(q.analysis.options)]).length,25);
 assert.equal(a.sentences[12].textKind,'phrase');
 assert.equal(a.sentences[12].beginnerSyntax.clauses.length,1);
 assert.equal(a.sentences[26].beginnerSyntax.clauses.length,0);
 assert.ok(!a.sentences[26].text.includes('gone'));
 assert.equal(a.sentences[24].beginnerSyntax.clauses.length,2);
 assert.deepEqual(a.sentences[2].beginnerSyntax.clauses[0].predicateDetails,[]);
 assert.equal(a.sentences.flatMap(s=>s.practice).length,37);
});

test('2011 Text2真实点击提示、单向反馈与跨句分母关联准确，不污染无关任务',()=>{
 const sources=trainingSources(a);
 for(const sentence of a.sentences){const labels=new Set([...tokens(sentence.text),...sentence.phrases].map(x=>x.toLowerCase()));for(const task of sentence.practice)for(const hint of task.hintWords??[])assert.ok(labels.has(hint.toLowerCase()),`${sentence.id}/${task.id}/${hint}`);}
 const s=a.sentences[2],from=s.practice[0],to=s.practice[1];
 assert.ok(practiceHintTargets(sources,'previous-answer','',s.id,from).includes(taskKey(s.id,to)));
 assert.ok(!practiceHintTargets(sources,'previous-answer','',s.id,to).includes(taskKey(s.id,from)));
 assert.ok(hintAffectsTask(from,'word','fled'));
 assert.ok(!hintAffectsTask(from,'word','recession'));
 const boundary=a.sentences[17].practice[0],purpose=a.sentences[17].practice[1];
 assert.ok(!practiceHintTargets(sources,'previous-answer','',a.sentences[17].id,boundary).includes(taskKey(a.sentences[17].id,purpose)));
 const denominator=a.sentences[21].practice[0],indicator=a.sentences[22].practice[0];
 assert.ok(practiceHintTargets(sources,'previous-answer','',a.sentences[21].id,denominator).includes(taskKey(a.sentences[22].id,indicator)));
 const map=sources.find(s=>s.id==='2011-p2-map'),task=map.practice.find(t=>t.id==='same-revenue-basis');
 const targets=practiceHintTargets(sources,'previous-answer','',map.id,task);
 assert.ok(targets.includes(taskKey(a.sentences[21].id,denominator)));
 assert.ok(targets.includes(taskKey(a.sentences[22].id,indicator)));
 assert.ok(!targets.includes(taskKey(a.sentences[26].id,a.sentences[26].practice[0])));
});

test('2011 Text2多句定位核对同一指标与全文转折，全选或单句不能过关',()=>{
 const ids=a.sentences.map(s=>s.id),ratio=a.questions[2].reasoning,title=a.questions[4].reasoning;
 assert.ok(assessLocation(ratio,{scope:'paragraph',sentenceIds:['2011-p2-s22','2011-p2-s23','2011-p2-s24']},ids).passed);
 assert.ok(!assessLocation(ratio,{scope:'paragraph',sentenceIds:['2011-p2-s23']},ids).passed);
 assert.ok(assessLocation(title,{scope:'whole-passage',sentenceIds:['2011-p2-s12','2011-p2-s15','2011-p2-s30']},ids).passed);
 assert.ok(!assessLocation(title,{scope:'whole-passage',sentenceIds:['2011-p2-s12']},ids).passed);
 assert.ok(!assessLocation(title,{scope:'whole-passage',sentenceIds:ids},ids).passed);
 assert.match(ratio.options.A.reasoning,/比例.*数量/);
 assert.match(a.questions[3].reasoning.options.B.reasoning,/失败.*原因/);
});

test('2011 Text2全部55来源词卡有本篇或本句人工解释，语境首搭配可打开且无旧篇排错文字',()=>{
 for(const [sourceId,words]of Object.entries(passage2011P2SourceContexts))for(const[word,c]of Object.entries(words)){
  const entry=resolveEntry(word,false,sourceId);
  assert.equal(entry.contextualMeaning,c.contextualMeaning,`${sourceId}/${word}/义项`);
  assert.equal(entry.grammarSummary,c.use,`${sourceId}/${word}/语法`);
  assert.equal(entry.collocationDetails[0].label,c.preferredCollocations[0],`${sourceId}/${word}/首搭配`);
  assert.ok(resolveEntry(c.preferredCollocations[0],true,sourceId).structures?.length);
 }
 const sources=[...a.sentences.map(s=>[s.id,s.text]),...a.questions.flatMap(q=>[[`question-${q.id}-prompt`,q.prompt],...q.options.map(o=>[`question-${q.id}-option-${o.key}`,o.text])])];
 assert.equal(sources.length,55);
 for(const[id,text]of sources)for(const token of tokens(text)){
  const entry=resolveEntry(token,false,id);
  assert.ok(['a','an','the'].includes(entry.headword)||passage2011P2SourceContexts[id]?.[entry.headword]||passage2011P2Lexicon[entry.headword],`${id}/${token}缺本篇人工解释`);
  assert.doesNotMatch(entry.use,/Text 1|完形网络|数字鸿沟|Cavanaugh|飞机|外部董事/);
 }
 for(const[word,id,re]of[['Chronicle','2011-p2-s4',/^proper/],['chronicling','2011-p2-s4',/^v.-ing/],['had','2011-p2-s18',/^v\./],['have','2011-p2-s27',/^aux/],['have','question-201128-option-A',/^v\./],['Struggling','question-201130-option-A',/现在分词/],['What','question-201129-prompt',/interrogative/]])assert.match(resolveEntry(word,false,id).partOfSpeech,re);
 assert.match(resolveEntry('Chronicle',false,'2011-p2-s4').contextualMeaning,/纪事报/);
 assert.equal(resolveEntry('Chronicle',false,'2011-p2-s4').collocationDetails[0].label,'San Francisco Chronicle');
 assert.match(resolveEntry('chronicling',false,'2011-p2-s4').contextualMeaning,/记述/);
 assert.match(resolveEntry('It',false,'2011-p2-s8').contextualMeaning,/委员会/);
 assert.match(resolveEntry('It',false,'2011-p2-s14').contextualMeaning,/经历/);
 assert.match(resolveEntry('profit',false,'2011-p2-s12').use,/盈利/);
 assert.match(resolveEntry('profit',false,'question-201121-option-A').contextualMeaning,/利润/);
 assert.equal(resolveEntry('she',false,'2010-p2-s13').use,'she 是 interviewed 的主语；women 是省略关系词所代指的宾语。');
});
