/** Synthetic engineering fixture ONLY. Not an exam, pilot, or production catalog item. */
import { createV2Sentence } from "../../app/article-v2/model";
import type { ArticleContent, Question, VocabEntry } from "../../app/data";
import type { PracticeTask } from "../../app/learning-model";
import { createVocabularyCorpus } from "../../app/vocabulary-learning/corpus";
import { articleSources } from "../../app/article-v2/content";

const texts = ["The team kept notes.", "Although the report ended on a hopeful note, it did not promise success.", "Readers paid attention to the limits."];
const check = (id: string, evidence = "did not promise success"): PracticeTask => ({ id, revision: 1, kind: "choice", prompt: "原文有没有保证成功？", options: ["保证了", "没有保证"], answer: "没有保证", evidence, feedback: "did not promise success 表示没有保证成功。", conceptId: "negation-contrast", errorType: "option-logic", purpose: "answer-scope" });
export const syntheticArticle: ArticleContent = {
  id: "synthetic.v2", experienceVersion: 2, year: 2099, sectionId: "p1", label: "合成架构测试", badge: "测试专用", title: "V2 合成测试文章（非真题）", description: "只验证工程行为，不用于试点验收。", kind: "reading",
  sentences: texts.map((text, i) => createV2Sentence({ id: `synthetic.v2-s${i + 1}`, number: i + 1, text, natural: ["团队做了笔记。", "虽然报告以乐观的基调收尾，但它并未保证成功。", "读者注意了这些限制。"][i], logic: ["介绍团队的行为。", "给出需要把握的让步和否定边界。", "说明读者关注的对象。"][i], phrases: i === 1 ? ["on a hopeful note"] : i === 2 ? ["paid attention to"] : [], quickReading: { blocks: i === 1 ? [{ start: 0, end: 43 }, { start: 43, end: text.length }] : [{ start: 0, end: text.length }], obstacle: ["notes 在这里是笔记。", "先抓 did not promise，前面的乐观基调不是成功保证。", "paid attention to 作为整体读成注意。"][i], keyReasons: i === 1 ? ["answer-evidence", "reference-or-scope"] : [] }, ...(i === 1 ? {
    trunk: "it did not promise success", literal: "虽然报告以乐观基调结束，它没有保证成功。",
    beginnerSyntax: { components: [
      { text: "it", form: "代词", function: "主语", modifies: "did not promise", explanation: "it 接着指前面的报告。", relationKind: "trunk" },
      { text: "did not promise success", form: "谓语和宾语", function: "否定判断", modifies: "it", explanation: "报告没有保证成功。", relationKind: "trunk" },
      { text: "Although the report ended on a hopeful note", form: "让步状语从句", function: "承认背景", modifies: "it did not promise success", explanation: "先承认报告基调乐观，再说没有保证成功。", relationKind: "supplement" },
    ], clauses: [{ text: "Although the report ended on a hopeful note", type: "让步状语从句", marker: "Although", role: "给出与主句形成让步的背景", subject: "the report", predicate: "ended", translationOrder: "先承认乐观，再读没有保证。" }] },
    grammarPatches: [{ explanation: "乐观只是在说报告的语气，不能推出保证成功。", relation: "Although 引出背景，否定判断在后半句。", term: "让步状语从句", transferRule: "遇到 Although，读完后面的主句再判断作者的结论。" }],
    practice: [{ ...check("negative-range"), kind: "range", prompt: "划出完整的否定谓语范围", options: [], answer: "did not promise", purpose: "answer-scope" }],
  } : {}) })),
  paragraphs: [{ id: "synthetic-p1", sentenceIds: ["synthetic.v2-s1", "synthetic.v2-s2"] }, { id: "synthetic-p2", sentenceIds: ["synthetic.v2-s3"] }],
  questions: [],
  vocabularyFocus: [
    { sourceId: "synthetic.v2-s1", expression: "notes", kind: "word", categories: ["core"] },
    { sourceId: "synthetic.v2-s1", expression: "team", kind: "word", categories: ["recognition"] },
    { sourceId: "synthetic.v2-s2", expression: "note", kind: "word", categories: ["sense"] },
    { sourceId: "synthetic.v2-s2", expression: "on a hopeful note", kind: "phrase", categories: ["collocation"] },
    { sourceId: "synthetic.v2-s3", expression: "paid attention to", kind: "phrase", categories: ["collocation"] },
    { sourceId: "question-990001-prompt", expression: "report", kind: "word", categories: ["core"] },
    { sourceId: "question-990001-option-C", expression: "success", kind: "word", categories: ["paraphrase"], questionLink: { questionId: 990001, paraphraseIndex: 0 } },
  ],
};
const q: Question = { id: 990001, number: 21, sentenceId: "synthetic.v2-s2", prompt: "What does the report offer?", answer: "C", options: [{ key: "A", text: "Only bad news." }, { key: "B", text: "A guarantee of success." }, { key: "C", text: "A hopeful tone without a promise of success." }, { key: "D", text: "No information about its tone." }], locating: "报告的基调和保证是两个不同判断。", explanations: { A: "不是坏消息。", B: "没有保证。", C: "乐观但没有保证。", D: "明说了乐观基调。" },
  reasoning: { questionType: "细节理解", scope: "sentence", restatement: "报告究竟表达了什么？", keyInstruction: "区分语气与保证。", evidence: [{ id: "report-limit", sentenceId: "synthetic.v2-s2", quote: texts[1], role: "乐观基调不等于成功保证。", strength: "直接证据" }], paraphrases: [{ evidenceIds: ["report-limit"], meaning: "hopeful note 是乐观基调，did not promise 是否定保证", optionText: "A hopeful tone without a promise of success.", relation: "同义转换", limit: "不能扩大成保证成功。" }], options: {
    A: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["report-limit"], reasoning: "hopeful 明确表示乐观。" },
    B: { judgment: "排除", errorType: "偷换对象", evidenceIds: ["report-limit"], reasoning: "把乐观基调换成成功保证。" },
    C: { judgment: "选入", evidenceIds: ["report-limit"], reasoning: "同时保留乐观语气和不保证的限制。" },
    D: { judgment: "排除", errorType: "与原文相反", evidenceIds: ["report-limit"], reasoning: "原文说明了基调。" },
  }, transfer: "同时保留转折或让步两侧的信息。", correction: { minimalEvidenceIds: ["report-limit"], paraphraseIndexes: [0], byWrongOption: {
    A: { difference: "A 把乐观的基调读成了坏消息。", recheck: check("a-check") },
    B: { difference: "B 把乐观基调偷换成了成功保证。", recheck: check("b-check") },
    D: { difference: "D 漏读了明确写出的 hopeful note。", recheck: check("d-check") },
  }, correctCheck: check("correct-check") } },
};
syntheticArticle.questions = [q, { ...q, id: 990002, number: 22, prompt: "Which conclusion stays within the report's claim?", reasoning: structuredClone(q.reasoning) }];

/** Tiny test dictionary injected into the REAL corpus/sense/memory bridge, never imported by production. */
export function syntheticEntry(label: string, isPhrase = false, sourceId = ""): VocabEntry {
  const lower = label.toLowerCase(), word = lower === "notes" ? "note" : lower;
  const meaning = lower === "notes" ? "笔记" : lower === "note" ? "基调；意味" : lower === "paid attention to" ? "注意" : lower === "on a hopeful note" ? "以乐观基调" : lower === "success" ? "成功" : lower === "report" ? "报告" : "团队";
  return { key: isPhrase ? `phrase:${word}` : word, headword: word, display: label, kind: isPhrase ? "phrase" : "word", partOfSpeech: isPhrase ? "phrase" : "n.", contextualMeaning: meaning, use: `本测试语境中的${meaning}`, ...(isPhrase ? { canonicalForm: lower === "paid attention to" ? "pay attention to" : "on a ... note", sourceExpression: label } : {}), collocations: [], otherMeanings: [], wordFamily: [], confusions: [], counts: { form: 1, lemma: 2, family: 2 }, occurrences: [{ sourceId, year: 2099, section: "合成测试", excerpt: articleSources(syntheticArticle).get(sourceId) ?? "" }] };
}
export const syntheticCorpus = createVocabularyCorpus({
  sources: [...articleSources(syntheticArticle)].map(([id, text]) => ({ id, text, article: syntheticArticle, section: "合成测试", ...(id.startsWith("synthetic") ? { sentenceId: id } : {}) })),
  phraseAnnotations: syntheticArticle.sentences.flatMap(s => s.phrases.map(label => ({ label, sourceId: s.id }))),
  resolveEntry: syntheticEntry, findTermContexts: () => [], tokenizeWords: text => text.match(/[a-z]+/gi) ?? [],
});
export const emptyV2State = { version: 1, updatedAt: 0, answers: {}, practiceAttempts: {}, termNotes: {}, sentenceNotes: {}, lists: [], listItems: {}, marks: {}, submittedSections: {} };
