import { questionOptionSourceId, type ArticleContent, type BeginnerSyntaxComponent } from "../data";
import { grammarConcepts, errorCategories, type PracticeTask } from "../learning-model";
import { keySentenceReasons, vocabularyCategories, type TextRange } from "./model";
import type { VocabularyCorpus } from "../vocabulary-learning/corpus";

export function articleSources(article: ArticleContent) {
  const sources = new Map(article.sentences.map(s => [s.id, s.text]));
  for (const question of article.questions) {
    sources.set(`question-${question.id}-prompt`, question.prompt);
    for (const option of question.options) sources.set(questionOptionSourceId(question, option.key), option.text);
  }
  return sources;
}
export function validRange(range: TextRange, text: string) {
  return Number.isSafeInteger(range.start) && Number.isSafeInteger(range.end) && range.start >= 0 && range.end > range.start && range.end <= text.length;
}
export function hasDeepReading(sentence: ArticleContent["sentences"][number]) {
  return Boolean(sentence.beginnerSyntax || sentence.grammarPatches?.length || sentence.trunk || sentence.literal || sentence.translationAlignment?.length || sentence.translationNotes?.length);
}

/** Authoring gate, shared by the V2 importer and runtime boundary. Never generates content. */
export function validateV2Article(article: ArticleContent, corpus?: VocabularyCorpus): string[] {
  if (article.experienceVersion === undefined || article.experienceVersion === 1) return [];
  const errors: string[] = [];
  const need = (ok: unknown, label: string) => { if (!ok) errors.push(label); };
  const filled = (s: unknown) => typeof s === "string" && Boolean(s.trim());
  need(article.experienceVersion === 2, "未知的文章体验版本");
  need(article.kind === "reading", "V2 本轮只支持阅读文章");
  need(article.sentences.length && article.questions.length, "原卷正文与题目不可为空");
  const ids = article.sentences.map(s => s.id);
  const byId = new Map(article.sentences.map(s => [s.id, s]));
  need(new Set(ids).size === ids.length, "句子 ID 重复");
  need(new Set(article.questions.map(q => q.id)).size === article.questions.length, "题目 ID 重复");
  need(article.paragraphs?.length && article.paragraphs.every(p => p.sentenceIds.length), "必须保留原卷段落");
  need(JSON.stringify(article.paragraphs?.flatMap(p => p.sentenceIds)) === JSON.stringify(ids), "原卷段落必须按顺序覆盖每句一次");
  need(new Set(article.paragraphs?.map(p => p.id)).size === article.paragraphs?.length, "段落 ID 重复");
  const task = (t: PracticeTask, sourceText: string, label: string) => {
    need(t && filled(t.id) && Number.isSafeInteger(t.revision) && t.revision > 0, `${label}任务身份无效`);
    if (!t) return;
    need([t.prompt, t.feedback, t.answer, t.evidence].every(filled) && sourceText.includes(t.evidence), `${label}任务缺真实证据/反馈`);
    need(Object.hasOwn(grammarConcepts, t.conceptId) && Object.hasOwn(errorCategories, t.errorType), `${label}任务分类无效`);
    need(["find-trunk", "attachment-risk", "question-relation", "answer-scope", "transfer"].includes(t.purpose ?? ""), `${label}须说明练习的理解价值`);
    if (t.kind === "choice" || t.kind === "token") need(t.kind === "choice" ? t.options.includes(t.answer) : sourceText.includes(t.answer), `${label}答案不可作答`);
    else if (t.kind === "range") need((t.rangeText ?? sourceText).includes(t.answer), `${label}范围答案越界`);
    else if (t.kind === "link" || t.kind === "order") {
      try {
        const answer = JSON.parse(t.answer);
        need(Array.isArray(answer) && answer.length && answer.every(x => t.options.includes(x)), `${label}连接/排序答案无效`);
        if (t.kind === "link") need(JSON.stringify(t.links?.map(x => x.target)) === t.answer, `${label}连接答案不一致`);
      } catch { errors.push(`${label}任务答案格式无效`); }
    } else errors.push(`${label}未知任务类型`);
  };
  const components = (items: BeginnerSyntaxComponent[], parent: string, label: string) => {
    for (const c of items) {
      need(filled(c.text) && parent.includes(c.text), `${label}成分越过父范围`);
      need([c.form, c.function, c.modifies, c.explanation].every(filled), `${label}缺成分关系`);
      need(["trunk", "modifier", "supplement", "clause-internal"].includes(c.relationKind ?? ""), `${label}须区分主干/修饰/补充/从句内部关系`);
      components(c.children ?? [], c.text, label);
    }
  };
  for (const s of article.sentences) {
    const quick = s.quickReading;
    need([s.text, s.natural, s.logic].every(filled), `${s.id}缺原文/一句话意思/段落作用`);
    need(quick && filled(quick.obstacle) && quick.blocks.length, `${s.id}缺快速阅读层`);
    need(!s.grammar.length && !s.layers.length && !s.chunks.length, `${s.id}V2 使用快速分块和深度关系，不填 V1 彩色分块/术语列表`);
    if (quick) {
      let end = 0;
      for (const block of quick.blocks) { need(validRange(block, s.text) && block.start === end, `${s.id}最小分块不连续`); end = block.end; }
      need(end === s.text.length, `${s.id}最小分块未覆盖完整原句`);
      need(quick.keyReasons.every(r => keySentenceReasons.includes(r)), `${s.id}关键句理由无效`);
    }
    need(!hasDeepReading(s) || quick?.keyReasons.length, `${s.id}深度结构必须有关键句理由`);
    if (s.beginnerSyntax) {
      need(filled(s.trunk) && filled(s.literal) && s.beginnerSyntax.components.length, `${s.id}深度层缺主干/结构直译/关系`);
      components(s.beginnerSyntax.components, s.text, s.id);
      const sourceWords: string[] = s.text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? [];
      let cursor = 0;
      for (const word of s.trunk.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? []) {
        const found = sourceWords.indexOf(word, cursor); need(found >= 0, `${s.id}主干必须按原文次序删减`); cursor = found + 1;
      }
      for (const clause of s.beginnerSyntax.clauses) need(filled(clause.text) && s.text.includes(clause.text) && [clause.type, clause.marker, clause.role, clause.subject, clause.predicate, clause.translationOrder].every(filled), `${s.id}从句边界或关系无效`);
    }
    for (const patch of s.grammarPatches ?? []) need([patch.explanation, patch.relation, patch.term, patch.transferRule].every(filled), `${s.id}语法补丁必须先解释再给术语和迁移规则`);
    for (const p of s.phrases) need(filled(p) && s.text.includes(p), `${s.id}词组不是原句连续表达`);
    need(new Set(s.practice?.map(t => t.id)).size === (s.practice?.length ?? 0), `${s.id}任务 ID 重复`);
    for (const t of s.practice ?? []) task(t, s.text, s.id);
  }
  for (const q of article.questions) {
    const reasoning = q.reasoning, c = reasoning?.correction;
    need(q.options.some(o => o.key === q.answer), `${q.id}答案不在原卷选项中`);
    need(filled(q.prompt) && filled(q.locating) && byId.has(q.sentenceId), `${q.id}缺题干/定位或句子来源`);
    need(q.options.length >= 2 && new Set(q.options.map(o => o.key)).size === q.options.length && q.options.every(o => filled(o.text)), `${q.id}原卷选项不完整或重复`);
    need(reasoning && c, `${q.id}缺推理或错因优先层`);
    if (!reasoning || !c) continue;
    const evidenceIds = new Set(reasoning.evidence.map(e => e.id));
    need(evidenceIds.size === reasoning.evidence.length, `${q.id}证据 ID 重复`);
    for (const e of reasoning.evidence) need(filled(e.quote) && byId.get(e.sentenceId)?.text.includes(e.quote), `${q.id}证据必须来自原文`);
    need(c.minimalEvidenceIds.length && c.minimalEvidenceIds.every(id => evidenceIds.has(id)), `${q.id}缺最小充分证据引用`);
    need(c.paraphraseIndexes.length && c.paraphraseIndexes.every(i => Number.isSafeInteger(i) && reasoning.paraphrases[i]?.optionText === q.options.find(o => o.key === q.answer)?.text), `${q.id}须引用到正确选项的转换`);
    for (const p of reasoning.paraphrases) need(p.evidenceIds.length && p.evidenceIds.every(id => evidenceIds.has(id)) && filled(p.meaning) && filled(p.limit), `${q.id}同义转换缺依据/边界`);
    const sourceText = article.sentences.map(s => s.text).join(" ");
    for (const option of q.options) {
      const judgment = reasoning.options[option.key];
      need(judgment && filled(judgment.reasoning) && judgment.evidenceIds.every(id => evidenceIds.has(id)), `${q.id}/${option.key}缺有效选项依据`);
      if (option.key === q.answer) continue;
      const wrong = c.byWrongOption[option.key];
      need(wrong && filled(wrong.difference) && judgment?.errorType, `${q.id}/${option.key}缺针对该错项的差别与干扰方式`);
      if (wrong) task(wrong.recheck, sourceText, `${q.id}/${option.key}`);
    }
    task(c.correctCheck, sourceText, `${q.id}/correct`);
    const checks = [c.correctCheck, ...Object.values(c.byWrongOption).map(item => item!.recheck)].filter(Boolean);
    need(new Set(checks.map(t => t.id)).size === checks.length, `${q.id}不同错项的再判断任务必须有独立身份`);
  }
  if (article.guide) {
    const guide = article.guide;
    need(filled(guide.mainIdea) && guide.route.length && guide.route.every(filled), "篇章主线不可为空");
    for (const p of guide.paragraphs) need(article.paragraphs?.some(raw => raw.id === p.paragraphId) && [p.title, p.summary, p.relation].every(filled), "篇章段落必须引用真实原卷段落");
    for (const r of guide.references) need(byId.get(r.sentenceId)?.text.includes(r.expression) && r.targetSentenceIds.every(id => byId.has(id)) && [r.referent, r.explanation].every(filled), "篇章指代缺准确来源或目标");
  }
  const sources = articleSources(article);
  need(article.vocabularyFocus?.length, "缺本篇词汇搭配来源分类");
  for (const focus of article.vocabularyFocus ?? []) {
    const source = sources.get(focus.sourceId);
    need(filled(focus.expression) && source?.toLowerCase().includes(focus.expression.toLowerCase()), `${focus.sourceId}词汇来源无效`);
    need(focus.categories.length && focus.categories.every(c => Object.hasOwn(vocabularyCategories, c)), `${focus.sourceId}词汇分类无效`);
    need(!focus.categories.includes("collocation") || focus.kind === "phrase", `${focus.sourceId}搭配必须独立为词组`);
    need(!focus.categories.includes("recognition") || focus.categories.length === 1, `${focus.sourceId}识别词不可同时列为必学词`);
    if (focus.categories.includes("paraphrase")) {
      const link = focus.questionLink, question = article.questions.find(q => q.id === link?.questionId);
      need(link && question?.reasoning?.paraphrases[link.paraphraseIndex], `${focus.sourceId}同义替换缺题目链引用`);
    }
    if (corpus) {
      const candidate = corpus.resolveCandidate(focus.expression, focus.kind === "phrase", focus.sourceId);
      need(candidate && !candidate.entry.partOfSpeech.startsWith("word（"), `${focus.sourceId}/${focus.expression}不能以推测词条进入共用词汇系统`);
    }
  }
  return errors;
}
