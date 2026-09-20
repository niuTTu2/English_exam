import type { Question, SentenceAnalysis } from "./data";
import type { QuestionReasoning, DistractorType } from "./article-teaching";
import type { PracticeTask } from "./learning-model";
import { createV2Sentence } from "./article-v2/model";

/** Only assembles explicitly authored content; does not infer meanings or grammar. */
export function reviewedBlocks(text: string, starts: string[]) {
  const cuts = [0];
  for (const start of starts) {
    const at = text.indexOf(start, cuts[cuts.length - 1] + 1);
    if (at < 0) throw new Error(`Missing reviewed reading boundary: ${start}`);
    cuts.push(at);
  }
  return cuts.map((start, i) => ({ start, end: cuts[i + 1] ?? text.length }));
}
export type ReadingCheck = [prompt: string, options: string[], answer: string, evidence: string, feedback: string];
export type ReadingWrong = [key: Question["answer"], error: DistractorType, difference: string, check: ReadingCheck];
export type ReadingLanguage = [meaning: string, obstacle: string, phrases?: string[]];
export function reviewedReadingQuestion(articleId: string, raw: Pick<Question, "id" | "number" | "prompt"> & { options: readonly { key: Question["answer"]; text: string }[] }, input: {
  answer: Question["answer"]; sentence: number; type: string; scope: QuestionReasoning["scope"]; instruction: string;
  evidence: QuestionReasoning["evidence"]; minimal: string[]; paraphrase: string; limit: string; right: string;
  wrong: ReadingWrong[]; confirm: ReadingCheck; paths: number[][]; language: ReadingLanguage[];
}): Question {
  const task = (suffix: string, [prompt, options, answer, evidence, feedback]: ReadingCheck): PracticeTask => ({ id: `${articleId}-q${raw.number}-${suffix}`, revision: 1, kind: "choice", prompt, options, answer, evidence, feedback, conceptId: "lexical-context", errorType: "option-logic", purpose: "question-relation" });
  const language = (id: string, text: string, row: ReadingLanguage): SentenceAnalysis => createV2Sentence({ id, number: 0, text, natural: row[0], logic: row[1], phrases: row[2] ?? [], quickReading: { blocks: [{ start: 0, end: text.length }], obstacle: row[1], keyReasons: [] } });
  const options = raw.options.map(o => ({ ...o }));
  const evidenceIds = input.evidence.map(e => e.id);
  const reasoning: QuestionReasoning = {
    questionType: input.type, scope: input.scope, restatement: input.language[0][0], keyInstruction: input.instruction,
    evidence: input.evidence,
    paraphrases: [{ evidenceIds: input.minimal, meaning: input.paraphrase, optionText: options.find(o => o.key === input.answer)!.text, relation: "同义转换", limit: input.limit }],
    options: Object.fromEntries(options.map(o => { const wrong = input.wrong.find(w => w[0] === o.key); return [o.key, { judgment: o.key === input.answer ? "选入" : "排除", evidenceIds, reasoning: o.key === input.answer ? input.right : wrong![2], ...(wrong ? { errorType: wrong[1] } : {}) }]; })),
    transfer: input.instruction,
    locationPolicy: { revision: 1, paths: input.paths.map((ns, i) => ({ id: `${articleId}-q${raw.number}-path${i + 1}`, label: ns.map(n => `第${n}句`).join(" + "), groups: ns.map(n => [`${articleId}-s${n}`]), supportingSentenceIds: input.evidence.map(e => e.sentenceId), maxSentences: new Set([...ns.map(n => `${articleId}-s${n}`), ...input.evidence.map(e => e.sentenceId)]).size })) },
    correction: { minimalEvidenceIds: input.minimal, paraphraseIndexes: [0], byWrongOption: Object.fromEntries(input.wrong.map(([key, , difference, check]) => [key, { difference, recheck: task(`${key}-check`, check) }])), correctCheck: task("correct-check", input.confirm) },
  };
  return { ...raw, options, answer: input.answer, sentenceId: `${articleId}-s${input.sentence}`, locating: input.instruction, reasoning,
    explanations: Object.fromEntries(options.map(o => [o.key, reasoning.options[o.key].reasoning])) as Question["explanations"],
    analysis: { prompt: language(`question-${raw.id}-prompt`, raw.prompt, input.language[0]), options: Object.fromEntries(options.map((o, i) => [o.key, language(`question-${raw.id}-option-${o.key}`, o.text, input.language[i + 1])])) },
  };
}
