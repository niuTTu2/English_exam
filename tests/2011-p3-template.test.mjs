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
const {practiceHintTargets,taskKey}=await v.ssrLoadModule('/app/learning-model.ts');
const {trainingSources}=await v.ssrLoadModule('/app/training-sources.ts');
const {passage2011P3SourceContexts}=await v.ssrLoadModule('/app/2011-passage-3-contexts.ts');
const {passage2011P3Lexicon}=await v.ssrLoadModule('/app/2011-passage-3-lexicon.ts');
const a=articleContents['2011-p3'];
const tokens=text=>text.match(/[A-Za-z]+(?:\d+[A-Za-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[A-Za-z]\.){2,}|(?<![A-Za-z0-9])[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g)??[];

test('2011 Text3 原卷快照七段17句及31—35题稳定，非谓语与比较省略不伪造从句',()=>{
 const f=JSON.parse(readFileSync(new URL('./fixtures/2011-p3.json',import.meta.url),'utf8'));
 assert.equal(f.sha256,'c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82');
 assert.deepEqual(a.paragraphs.map(p=>p.sentenceIds.map(id=>a.sentences.find(s=>s.id===id).text).join(' ')),f.paragraphs.map(p=>p.text));
 assert.deepEqual(a.questions.map(q=>q.answer),['C','D','C','D','B']);
 assert.equal(a.questions.flatMap(q=>[q.analysis.prompt,...Object.values(q.analysis.options)]).length,25);
 for(const n of [1,3,4,6,13,16])assert.equal(a.sentences[n-1].beginnerSyntax.clauses.length,0,`S${n}`);
 assert.equal(a.sentences[4].beginnerSyntax.clauses.length,2);
 assert.equal(a.sentences[8].beginnerSyntax.clauses.length,2);
 assert.equal(a.sentences[16].beginnerSyntax.clauses.length,4);
 assert.equal(a.sentences.flatMap(s=>s.practice).length,28);
 for(const s of a.sentences){assert.equal(s.chunks.map(c=>c.text).join(''),s.text);assert.ok(s.translationAlignment.every(c=>c.chinese.trim()));}
});

test('2011 Text3 真实提示词可点，反馈仅沿实际透露答案的方向关联',()=>{
 const sources=trainingSources(a);
 for(const s of a.sentences){const labels=new Set([...tokens(s.text),...s.phrases].map(x=>x.toLowerCase()));for(const t of s.practice)for(const hint of t.hintWords??[])assert.ok(labels.has(hint.toLowerCase()),`${s.id}/${t.id}/${hint}`);}
 const targets=(n,id)=>{const s=a.sentences[n-1],t=s.practice.find(t=>t.id===id);return practiceHintTargets(sources,'previous-answer','',s.id,t);};
 const key=(n,id)=>taskKey(a.sentences[n-1].id,a.sentences[n-1].practice.find(t=>t.id===id));
 assert.ok(targets(3,'make-object-complement').includes(key(3,'mindset-versus-feature')));
 assert.ok(!targets(3,'mindset-versus-feature').includes(key(3,'make-object-complement')));
 assert.ok(targets(7,'two-comparison-dimensions').includes(key(7,'organized-receiver')));
 assert.ok(!targets(7,'organized-receiver').includes(key(7,'two-comparison-dimensions')));
 assert.ok(!targets(12,'because-of-three-items').includes(key(12,'art-equivalent')));
 assert.ok(targets(13,'partial-negation').includes(key(15,'another-local-example')));
 assert.ok(!targets(9,'two-that-roles').includes(key(9,'materials-time')));
 const map=sources.find(s=>s.id==='2011-p3-map'),t=map.practice.find(t=>t.id==='less-with-conditions');
 const result=practiceHintTargets(sources,'previous-answer','',map.id,t);
 assert.ok(result.includes(key(7,'two-comparison-dimensions')));
 assert.ok(!result.includes(key(15,'commission-roles')));
});

test('2011 Text3 机构影响与公寓类比需多句证据，装饰观点允许两条有效路径',()=>{
 const ids=a.sentences.map(s=>s.id);
 const assess=(index,scope,ns)=>assessLocation(a.questions[index].reasoning,{scope,sentenceIds:ns.map(n=>`2011-p3-s${n}`)},ids).passed;
 assert.ok(assess(1,'paragraph',[5,6]));assert.ok(!assess(1,'paragraph',[6]));
 assert.ok(assess(2,'paragraph',[8]));assert.ok(assess(2,'paragraph',[7]));
 assert.ok(assess(3,'adjacent-sentences',[11,12]));assert.ok(!assess(3,'adjacent-sentences',[11]));
 assert.ok(!assess(3,'adjacent-sentences',Array.from({length:17},(_,i)=>i+1)));
 assert.match(a.questions[0].reasoning.options.B.reasoning,/心理|因果/);
 assert.match(a.questions[3].reasoning.options.B.reasoning,/艺术|材料/);
 assert.match(a.questions[4].reasoning.options.D.reasoning,/环保/);
});

test('2011 Text3 全部42来源词卡均为本篇人工解释，语境首搭配可点且词形角色准确',()=>{
 for(const[sourceId,words]of Object.entries(passage2011P3SourceContexts))for(const[word,c]of Object.entries(words)){
  const e=resolveEntry(word,false,sourceId);assert.equal(e.contextualMeaning,c.contextualMeaning,`${sourceId}/${word}/meaning`);assert.equal(e.grammarSummary,c.use,`${sourceId}/${word}/grammar`);assert.equal(e.collocationDetails[0].label,c.preferredCollocations[0],`${sourceId}/${word}/collocation`);assert.ok(resolveEntry(c.preferredCollocations[0],true,sourceId).structures?.length);
 }
 const sources=[...a.sentences.map(s=>[s.id,s.text]),...a.questions.flatMap(q=>[[`question-${q.id}-prompt`,q.prompt],...q.options.map(o=>[`question-${q.id}-option-${o.key}`,o.text])])];assert.equal(sources.length,42);
 for(const[id,text]of sources)for(const token of tokens(text)){const e=resolveEntry(token,false,id);assert.ok(['a','an','the'].includes(e.headword)||passage2011P3SourceContexts[id]?.[e.headword]||passage2011P3Lexicon[e.headword],`${id}/${token}`);assert.doesNotMatch(e.use,/Text 1|Text 2|数字鸿沟|Cavanaugh|报纸文本行|广告收入占比/);}
 for(const[word,id,re]of[['shared','question-201134-option-D',/过去式/],['shared','2011-p3-s17',/被动/],['associated','question-201132-option-C',/状态/],['building','2011-p3-s14',/动名词/],['buildings','question-201134-option-C',/^n/],['living','2011-p3-s4',/动名词/],['following','question-201132-prompt',/nominalized/],['following','2011-p3-s1',/后置定语/],['have','question-201132-option-D',/^v/]])assert.match(resolveEntry(word,false,id).partOfSpeech,re);
 assert.match(resolveEntry('I',false,'2011-p3-s1').contextualMeaning,/缩写/);
 assert.match(resolveEntry('he',false,'2011-p3-s14').contextualMeaning,/赖特/);
 assert.match(resolveEntry('material',false,'question-201135-option-D').use,/环保/);
 assert.equal(resolveEntry('derive',false,'2011-p3-s8').contextualSubstitutions[0].label,'stem');
 assert.match(resolveEntry('have',false,'2011-p2-s27').partOfSpeech,/aux/);
});
