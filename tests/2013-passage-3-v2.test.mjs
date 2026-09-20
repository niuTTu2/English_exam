import assert from 'node:assert/strict';import test,{after}from'node:test';import{readFile}from'node:fs/promises';import{fileURLToPath}from'node:url';import{createServer}from'vite';
const root=fileURLToPath(new URL('..',import.meta.url));const vite=await createServer({root,configFile:false,resolve:{alias:{'@':root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());const load=p=>vite.ssrLoadModule(`/app/${p}`);
const [data,src,c,study,keys,fixture]=await Promise.all([load('data.ts'),load('2013-passage-3-source.ts'),load('article-v2/content.ts'),load('study-app.tsx'),load('verified-answer-keys.ts'),readFile(new URL('./fixtures/2013-passage-3-source.json',import.meta.url),'utf8').then(JSON.parse)]);const a=data.articleContents['2013-p3'];
test('Text 3 retains source punctuation, six paragraphs, exact questions 31–35 and verified answers',()=>{
 assert.equal(fixture.sha256,'7f00fcff824e1a0c21261d1f4d13e742b8f173748f56ec50abf275b143e75131');assert.equal(a.sentences.length,17);assert.equal(a.paragraphs.length,6);
 assert.deepEqual(src.passage2013P3ParagraphNumbers.map(ns=>ns.map(n=>a.sentences[n-1].text).join(' ')),fixture.paragraphs);assert.deepEqual(src.passage2013P3RawQuestions,fixture.questions);
 assert.match(a.sentences[7].text,/doing, Subjects/);assert.match(a.sentences[7].quickReading.obstacle,/原卷/);
 assert.deepEqual(a.questions.map(q=>q.answer),['D','A','B','C','B']);for(const q of a.questions)assert.equal(q.answer,keys.verifiedAnswerKey2013Passage3[q.number]);
 assert.equal(a.experienceVersion,2);assert.deepEqual(c.validateV2Article(a,study.vocabularyCorpus),[]);
});
test('conditional layers and only-after prerequisite stay optional; simple transition has no grammar task',()=>{
 assert.equal(c.hasDeepReading(a.sentences[8]),false);assert.equal(a.sentences[8].practice?.length??0,0);
 assert.equal(a.sentences[0].beginnerSyntax.clauses.length,4);assert.equal(a.sentences[13].beginnerSyntax.clauses[0].subject,'what');
 assert.match(a.sentences[11].practice[0].answer,/^only after/);assert.equal(a.sentences.flatMap(s=>s.practice??[]).length,1);
 const q=a.questions[3];assert.match(q.reasoning.correction.byWrongOption.B.difference,/thin.*thick/);assert.match(a.questions[4].reasoning.correction.byWrongOption.C.difference,/still have/);
});
test('every word and phrase resolves by exact source; familiar words and inflections are corrected',async()=>{
 for(const[id,text]of c.articleSources(a))for(const token of new Set(text.match(/[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/gi)??[])){const x=study.resolveEntry(token,false,id);assert.ok(x.contextualMeaning,`${id}/${token}`);assert.ok(x.use);assert.ok(!x.partOfSpeech.startsWith('word（'),`${id}/${token}`);}
 for(const[token,id,lemma,meaning]of[['primes','2013-p3-s7','prime','诱发'],['Subjects','2013-p3-s8','subject','被试'],['ground','2013-p3-s12','ground','基础'],['retreat','2013-p3-s13','retreat','静居'],['act','question-201333-option-B','act','行动'],['stimuli','2013-p3-s6','stimulus','刺激']]){const x=study.resolveEntry(token,false,id);assert.equal(x.headword,lemma);assert.ok(x.contextualMeaning.includes(meaning));}
 const subjects=study.resolveEntry('Subjects',false,'2013-p3-s8'); assert.equal(subjects.collocationDetails[0].label,'experimental subjects'); assert.equal(subjects.collocationDetails[0].meaning,'实验被试');
 const {getPhraseKnowledge}=await load('knowledge-base.ts');for(const s of a.sentences)for(const p of s.phrases)assert.ok(getPhraseKnowledge(p,{articleId:a.id}),p);
 assert.equal(getPhraseKnowledge('are likely to',{articleId:a.id}).key,getPhraseKnowledge('be likely to do').key);assert.equal(getPhraseKnowledge('tend to',{articleId:a.id}).key,getPhraseKnowledge('tend to do something').key);
});


test('equivalent reading, reversal and technology glosses share labels, while physical brain and legal decision stay separate',async()=>{
 const {resolveReviewedSense}=await load('vocabulary-learning/sense-registry.ts');
 const sense=(word,id)=>{const x=study.resolveEntry(word,false,id);return resolveReviewedSense(x.key,'word',x.partOfSpeech,x.contextualMeaning,id,word)?.senseId;};
 assert.equal(sense('read','2013-p3-s7'),sense('read','p3-s10'));
 assert.equal(sense('reversing','question-201335-prompt'),sense('reversed','2012-p4-s9'));
 assert.equal(sense('technology','2013-p3-s16'),sense('technology','2013-p1-s9'));
 assert.notEqual(sense('brains','2013-p3-s2'),sense('brain','2012-translation-s5'));
 assert.notEqual(sense('decisions','2013-p3-s2'),sense('decision','2010-p4-s13'));
});
