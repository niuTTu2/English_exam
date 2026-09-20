import assert from 'node:assert/strict';
import test,{after} from 'node:test';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const root=fileURLToPath(new URL('..',import.meta.url));
const vite=await createServer({root,configFile:false,resolve:{alias:{'@':root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
const load=p=>vite.ssrLoadModule(`/app/${p}`);
const [data,source,content,study,keys,fixture]=await Promise.all([load('data.ts'),load('2013-passage-2-source.ts'),load('article-v2/content.ts'),load('study-app.tsx'),load('verified-answer-keys.ts'),readFile(new URL('./fixtures/2013-passage-2-source.json',import.meta.url),'utf8').then(JSON.parse)]);
const article=data.articleContents['2013-p2'];
test('2013 Text 2 preserves all five original paragraphs and questions 26–30',()=>{
 assert.equal(fixture.sha256,'7f00fcff824e1a0c21261d1f4d13e742b8f173748f56ec50abf275b143e75131');
 assert.deepEqual(source.passage2013P2ParagraphNumbers.map(ns=>ns.map(n=>article.sentences[n-1].text).join(' ')),fixture.paragraphs);
 assert.deepEqual(source.passage2013P2RawQuestions,fixture.questions);
 assert.equal(article.sentences.length,22);assert.equal(article.paragraphs.length,5);
 assert.deepEqual(article.questions.map(q=>q.number),[26,27,28,29,30]);
 assert.deepEqual(article.questions.map(q=>q.answer),['A','C','C','B','D']);
 for(const q of article.questions)assert.equal(q.answer,keys.verifiedAnswerKey2013Passage2[q.number]);
 assert.equal(article.experienceVersion,2);assert.deepEqual(content.validateV2Article(article,study.vocabularyCorpus),[]);
});
test('ordinary sentences stay shallow and inversion/closing argument have optional structure',()=>{
 assert.equal(content.hasDeepReading(article.sentences[2]),false);assert.equal(article.sentences[2].practice?.length??0,0);
 assert.equal(article.sentences[1].trunk,'came those');assert.ok(article.sentences[1].practice[0].answer.startsWith('those who'));
 assert.ok(article.sentences[21].beginnerSyntax.clauses[0].subject.includes('managing immigration'));
 for(const s of article.sentences)if(content.hasDeepReading(s))assert.ok(s.quickReading.keyReasons.length);
});
test('whole-passage legal tolerance and title judgments preserve limits and individual wrong-option feedback',async()=>{
 const {QuestionAnalysisPage}=await load('article-v2/question-mistake-card.tsx');
 const html=renderToStaticMarkup(React.createElement(QuestionAnalysisPage,{article,data:{version:1,updatedAt:0,answers:{201329:'C'},submittedSections:{'2013-p2':true},practiceAttempts:{}},onUpdate:()=>{},onSource:()=>{},renderDetails:()=>null}));
 assert.ok(html.includes('经济优待'));assert.ok(html.indexOf('你选择')<html.indexOf('最小充分原文证据'));
 assert.match(article.questions[3].reasoning.paraphrases[0].limit,/不是不受法律约束/);
 assert.match(article.questions[4].reasoning.paraphrases[0].limit,/不是说合法本身错误/);
});
test('all exact source tokens resolve and familiar words use this passage sense',async()=>{
 for(const [id,text]of content.articleSources(article))for(const token of new Set(text.match(/[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/gi)??[])){
  const entry=study.resolveEntry(token,false,id);assert.ok(entry.contextualMeaning,`${id}/${token}`);assert.ok(entry.use,`${id}/${token}`);assert.ok(!entry.partOfSpeech.startsWith('word（'),`${id}/${token}`);
 }
 const verb=study.resolveEntry('means',false,'2013-p2-s22');const noun=study.resolveEntry('means',false,'question-201327-option-D');
 assert.equal(verb.headword,'mean');assert.equal(verb.partOfSpeech,'v.');assert.equal(noun.headword,'means');assert.equal(noun.partOfSpeech,'n.');
 const us=study.resolveEntry('US',false,'question-201327-prompt');assert.equal(us.headword,'us');assert.equal(us.partOfSpeech,'proper n.');assert.equal(us.contextualMeaning,'美国');
 assert.match(study.resolveEntry('brand',false,'2013-p2-s8').contextualMeaning,/贴标签/);
 assert.equal(study.resolveEntry('construction',false,'2013-p2-s14').contextualMeaning,'建筑；建造');
 const {getPhraseKnowledge}=await load('knowledge-base.ts');
 for(const s of article.sentences)for(const p of s.phrases)assert.ok(getPhraseKnowledge(p,{articleId:article.id}),`${s.id}/${p}`);
 assert.equal(getPhraseKnowledge('for a while',{articleId:article.id}).key,getPhraseKnowledge('for a while').key);
});

test('equivalent translations share reviewed labels while distinct meanings and saved identities survive',async()=>{
 const {resolveReviewedSense}=await load('vocabulary-learning/sense-registry.ts');
 const {createMemory,mergeCandidate,memoryId}=await load('vocabulary-learning/model.ts');
 const check=(word,id,expected)=>{const x=study.resolveEntry(word,false,id);assert.equal(resolveReviewedSense(x.key,'word',x.partOfSpeech,x.contextualMeaning,id,word)?.senseId,`reviewed:${expected}`);};
 check('fixed','question-201327-option-D','repair');check('returned','2013-p2-s4','go-back');check('staying','2013-p2-s19','stay');check('work','2013-p2-s15','employment');check('managing','2013-p2-s22','manage');check('manage','2013-p2-s17','succeed');
 check('passage','2013-p2-s5','movement');check('brand','2013-p2-s8','label');
 const previous=study.vocabularyCorpus.resolveCandidate('left',false,'2011-p1-s4',true);
 const memory=createMemory(previous,1000);const saved={...memory,id:memoryId(memory.termKey,'word','source:2011-p1-s4|left','v'),senseId:'source:2011-p1-s4|left',dueAt:9999999999999,consecutiveKnown:3,paused:true,status:'paused'};
 const incoming=study.vocabularyCorpus.resolveCandidate('leave',false,'question-201326-option-B',true);
 const merged=mergeCandidate({[saved.id]:saved},incoming,2000);
 assert.equal(merged.id,saved.id);assert.equal(merged.dueAt,saved.dueAt);assert.equal(merged.consecutiveKnown,3);assert.equal(merged.paused,true);assert.equal(merged.contexts.length,2);
});
