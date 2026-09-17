export const grammarConcepts = {
  "finite-predicate": "找有限谓语", "subject-head": "主语范围与中心", "basic-svc": "主系表", "basic-svo": "主谓宾", "object-complement": "宾语补足语",
  "modifier-prepositional": "介词短语修饰", "modifier-adverb": "副词修饰", "clause-relative": "定语从句", "clause-object": "宾语从句",
  "clause-subject": "主语从句", "clause-predicative": "表语从句", "clause-time": "时间从句", "complement-content": "内容补足从句",
  "nonfinite-participle": "分词结构", "nonfinite-subject": "非谓语逻辑主语", "reference-pronoun": "指代",
  "tense-past-perfect-progressive": "过去完成进行时", "modal-obligation": "情态与义务", "comparison-scope": "比较与数量范围",
  "time-reference": "时间参照", "negation-contrast": "否定与对比", "apposition": "同位说明", "author-voice": "观点归属",
} as const;
export const errorCategories = {
  vocabulary: "单词不会", collocation: "固定搭配不会", predicate: "谓语没找对", subject: "主语范围判断错",
  "clause-boundary": "从句边界判断错", attachment: "修饰对象判断错", reference: "代词指代错误", tense: "时态关系错误",
  translation: "能拆句但翻译不自然", "passage-logic": "文章逻辑没看懂", evidence: "题目定位错误", "option-logic": "干扰项排除错误",
} as const;
export type GrammarConceptId = keyof typeof grammarConcepts;
export type ErrorCategory = keyof typeof errorCategories;
export type PracticeTask = {
  id: string; revision: number; kind: "token" | "choice"; prompt: string; options: string[]; answer: string;
  evidence: string; feedback: string; conceptId: GrammarConceptId; errorType: ErrorCategory;
};
export type PracticeAttempt = {
  id: string; articleId: string; sentenceId: string; taskId: string; revision: number; answer: string;
  correct: boolean; assisted: boolean; at: number; conceptId: GrammarConceptId; errorType: ErrorCategory;
};
export type PracticeAttempts = Record<string, PracticeAttempt>;
export type LearningReflection = { translation: string; translationRating: "correct" | "unclear" | "wrong" | ""; errors: ErrorCategory[] };
export type QuestionWork = { scope: string; sentenceIds: string[] };
export const emptyReflection = (): LearningReflection => ({ translation: "", translationRating: "", errors: [] });

export function taskAttempts(attempts: PracticeAttempts, task: PracticeTask, sentenceId: string): PracticeAttempt[] {
  return Object.values(attempts).filter(a => a.sentenceId === sentenceId && a.taskId === task.id && a.revision === task.revision).sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
}
export function latestTaskAttempt(attempts: PracticeAttempts, task: PracticeTask, sentenceId: string) {
  return taskAttempts(attempts, task, sentenceId).at(-1);
}
export function sentencePracticeStatus(tasks: PracticeTask[], attempts: PracticeAttempts, sentenceId: string): "new" | "needs-review" | "assisted" | "independent" {
  const latest = tasks.map(task => latestTaskAttempt(attempts, task, sentenceId));
  if (latest.every(a => !a)) return "new";
  if (latest.some(a => !a?.correct)) return "needs-review";
  return latest.some(a => a?.assisted) ? "assisted" : "independent";
}
export function practiceDueAt(attempt: PracticeAttempt) {
  return attempt.correct ? attempt.at + (attempt.assisted ? 1 : 3) * 86_400_000 : attempt.at;
}
export function isPracticeAttempt(value: unknown): value is PracticeAttempt {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return [v.id, v.articleId, v.sentenceId, v.taskId, v.answer].every(x => typeof x === "string")
    && typeof v.correct === "boolean" && typeof v.assisted === "boolean" && Number.isSafeInteger(v.at) && Number(v.at) >= 0
    && Number.isSafeInteger(v.revision) && Number(v.revision) > 0
    && typeof v.conceptId === "string" && Object.hasOwn(grammarConcepts, v.conceptId)
    && typeof v.errorType === "string" && Object.hasOwn(errorCategories, v.errorType);
}

/** 不认识训练字段的旧页面也不能在同步时删掉新记录。当前没有清空训练历史的产品操作。 */
export function preserveTrainingRecords(previous: Record<string, unknown>, incoming: Record<string, unknown>) {
  const result = { ...incoming };
  for (const key of ["practiceAttempts", "practiceReveals", "learningReflections", "questionWork"]) {
    const oldMap = previous[key], newMap = incoming[key];
    if (oldMap && typeof oldMap === "object" && !Array.isArray(oldMap)) {
      result[key] = { ...oldMap, ...(newMap && typeof newMap === "object" && !Array.isArray(newMap) ? newMap : {}) };
    }
  }
  return result;
}
