import assert from 'node:assert/strict';import test,{after}from'node:test';import{readFile}from'node:fs/promises';import{fileURLToPath}from'node:url';import{createServer}from'vite';
const root=fileURLToPath(new URL('..',import.meta.url));const vite=await createServer({root,configFile:false,resolve:{alias:{'@':root}},server:{middlewareMode:true,hmr:false}});after(()=>vite.close());const load=p=>vite.ssrLoadModule(`/app/${p}`);
const [data,src,c,study,keys,fixture]=await Promise.all([load('data.ts'),load('2013-passage-4-source.ts'),load('article-v2/content.ts'),load('study-app.tsx'),load('verified-answer-keys.ts'),readFile(new URL('./fixtures/2013-passage-4-source.json',import.meta.url),'utf8').then(JSON.parse)]);const a=data.articleContents['2013-p4'];
test('Text 4 preserves seven original paragraphs, all source percentages, questions and verified answers',()=>{
 assert.equal(fixture.sha256,'7f00fcff824e1a0c21261d1f4d13e742b8f173748f56ec50abf275b143e75131');assert.equal(a.sentences.length,18);assert.equal(a.paragraphs.length,7);
 assert.deepEqual(src.passage2013P4ParagraphNumbers.map(ns=>ns.map(n=>a.sentences[n-1].text).join(' ')),fixture.paragraphs);assert.deepEqual(src.passage2013P4RawQuestions,fixture.questions);
 assert.match(a.sentences[3].text,/60 per cent/);assert.match(a.sentences[6].text,/40 per cent/);assert.match(a.sentences[2].text,/14 per cent/);
 assert.deepEqual(a.questions.map(q=>q.answer),['B','C','A','D','C']);for(const q of a.questions)assert.equal(q.answer,keys.verifiedAnswerKey2013Passage4[q.number]);assert.equal(a.experienceVersion,2);assert.deepEqual(c.validateV2Article(a,study.vocabularyCorpus),[]);
});
test('simple statement stays shallow; optional structures preserve hypothetical and comparison scope',()=>{
 assert.equal(c.hasDeepReading(a.sentences[0]),false);assert.equal(a.sentences[0].practice?.length??0,0);assert.ok(a.sentences[17].beginnerSyntax.clauses.some(x=>x.marker==='If'));
 assert.equal(a.sentences.flatMap(s=>s.practice??[]).length,1);assert.match(a.sentences[17].practice[0].answer,/^no more newsworthy than/);
 assert.match(a.questions[3].reasoning.correction.byWrongOption.A.difference,/But/);assert.match(a.questions[4].reasoning.correction.byWrongOption.B.difference,/massive attention/);
});
test('every source word resolves; inflections and familiar different meanings use the actual sentence',async()=>{
 for(const[id,text]of c.articleSources(a))for(const token of new Set(text.match(/[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/gi)??[])){const x=study.resolveEntry(token,false,id);assert.ok(x.contextualMeaning,`${id}/${token}`);assert.ok(x.use);assert.ok(!x.partOfSpeech.startsWith('word（'),`${id}/${token}`);}
 for(const[token,id,lemma,meaning]of[['fairer','2013-p4-s15','fair','公平'],['born','2013-p4-s5','bear','产生'],['promotion','2013-p4-s16','promotion','晋升'],['just','2013-p4-s18','just','公正'],['said','2013-p4-s10','say','说'],['say','question-201336-option-B','say','决定权'],['US','2013-p4-s16','us','美国'],['highly','2013-p4-s18','highly','非常'],['precisely','2013-p4-s17','precisely','恰恰']]){const x=study.resolveEntry(token,false,id);assert.equal(x.headword.toLowerCase(),lemma);assert.ok(x.contextualMeaning.includes(meaning));}
 const {getPhraseKnowledge}=await load('knowledge-base.ts');for(const s of a.sentences)for(const p of s.phrases)assert.ok(getPhraseKnowledge(p,{articleId:a.id}),p);
 for(const p of ['In particular','as well as'])assert.equal(getPhraseKnowledge(p,{articleId:a.id}).key,getPhraseKnowledge(p).key);
});
test('same meanings share identities while promotion and just retain distinct senses',async()=>{
 const {resolveReviewedSense}=await load('vocabulary-learning/sense-registry.ts');const sense=(w,id)=>{const x=study.resolveEntry(w,false,id);return resolveReviewedSense(x.key,'word',x.partOfSpeech,x.contextualMeaning,id,w)?.senseId;};
 assert.equal(sense('decisions','2013-p4-s2'),sense('decisions','2013-p3-s2'));assert.ok(sense('decisions','2013-p4-s2'));
 assert.ok(sense('promotions','question-201034-option-C'));assert.ok(sense('just','2010-p4-s1'));
 assert.equal(sense('does','2013-p4-s15'),sense('does','2001-p1-s6'));
 assert.notEqual(sense('promotion','2013-p4-s16'),sense('promotions','question-201034-option-C'));assert.notEqual(sense('just','2013-p4-s18'),sense('just','2010-p4-s1'));
});

 test('same-sentence do/did keep their actual roles and reuse existing sense labels', async () => {
  const {buildSenseOverview}=await load('vocabulary-learning/sense-overview.ts');
  assert.equal(study.resolveEntry('do',false,'2013-p4-s17').contextualMeaning,'确实（强调）');
  assert.equal(study.resolveEntry('did',false,'2013-p4-s17').contextualMeaning,'替代前述动作或谓语');
  assert.equal(study.resolveEntry('balance',false,'question-201337-option-A').partOfSpeech,'n.');
  assert.equal(study.resolveEntry('until',false,'2013-p4-s2').partOfSpeech,'conj.');
  assert.equal(study.resolveEntry('no',false,'2013-p4-s18').contextualMeaning,'不（否定比较）');
  assert.equal(study.resolveEntry('if',false,'2013-p4-s15').contextualMeaning,'as if中的组成作用');
  assert.equal(study.resolveEntry('it',false,'2013-p4-s15').contextualMeaning,'情境占位，不指具体实体');
  const rows=buildSenseOverview(study.resolveEntry('do',false,'2013-p4-s17')).filter(r=>!r.annotationReason);
  assert.ok(rows.find(r=>r.meaning==='确实（强调）').sources.some(s=>s.sourceId==='2013-p4-s17'&&s.expression==='do'));
  assert.ok(rows.find(r=>r.meaning==='替代前述动作或谓语').sources.some(s=>s.sourceId==='2013-p4-s17'&&s.expression==='did'));
  assert.equal(buildSenseOverview(study.resolveEntry('until',false,'2013-p4-s2')).filter(r=>!r.annotationReason && r.meaning==='直到……为止').length,1);
  assert.equal(buildSenseOverview(study.resolveEntry('US',false,'2013-p4-s16')).filter(r=>!r.annotationReason && r.meaning==='美国').length,1);
 });
