export const grammarConcepts = {
  "nonfinite-infinitive": "不定式结构", "clause-condition": "条件从句", "clause-purpose": "目的从句", "parallel-structure": "并列结构", "passive-voice": "被动语态", "lexical-context": "语境词义",
  "finite-predicate": "找有限谓语", "subject-head": "主语范围与中心", "basic-svc": "主系表", "basic-svo": "主谓宾", "object-complement": "宾语补足语",
  "modifier-prepositional": "介词短语修饰", "modifier-adverb": "副词修饰", "clause-relative": "定语从句", "clause-object": "宾语从句",
  "clause-subject": "主语从句", "clause-predicative": "表语从句", "clause-time": "时间从句", "clause-concession": "让步状语从句", "clause-cause": "原因状语从句", "clause-place": "地点/情形状语从句", "complement-content": "内容补足从句",
  "nonfinite-participle": "分词结构", "nonfinite-subject": "非谓语逻辑主语", "reference-pronoun": "指代",
  "tense-past-perfect-progressive": "过去完成进行时", "modal-obligation": "情态与义务", "comparison-scope": "比较与数量范围",
  "time-reference": "时间参照", "negation-contrast": "否定与对比", "apposition": "同位说明", "author-voice": "观点归属", "paragraph-role": "段落作用", "passage-route": "全文发展路线",
} as const;
export const errorCategories = {
  vocabulary: "单词不会", collocation: "固定搭配不会", predicate: "谓语没找对", subject: "主语范围判断错",
  "clause-boundary": "从句边界判断错", attachment: "修饰对象判断错", reference: "代词指代错误", tense: "时态关系错误",
  translation: "能拆句但翻译不自然", "passage-logic": "文章逻辑没看懂", evidence: "题目定位错误", "option-logic": "干扰项排除错误",
} as const;
export type GrammarConceptId = keyof typeof grammarConcepts;
export type ErrorCategory = keyof typeof errorCategories;
export const hintTypes = ["word", "syntax", "translation", "article-map", "previous-answer"] as const;
export type HintType = typeof hintTypes[number];
export type PracticeTask = {
  id: string; revision: number; kind: "token" | "choice" | "range" | "link" | "order"; prompt: string; options: string[]; answer: string;
  evidence: string; feedback: string; conceptId: GrammarConceptId; errorType: ErrorCategory;
  links?: Array<{ source: string; target: string }>;
  rangeText?: string;
  hintWords?: string[];
  mapRevealsAnswer?: boolean;
  leaksToTaskIds?: string[];
  leaksToTasks?: Array<{ sentenceId: string; taskId: string }>;
};
export type PracticeAttempt = {
  id: string; articleId: string; sentenceId: string; taskId: string; revision: number; answer: string;
  correct: boolean; assisted: boolean; at: number; conceptId: GrammarConceptId; errorType: ErrorCategory;
  modelVersion?: 2; sessionId?: string; startedAt?: number;
  hintTypes?: HintType[]; hintSources?: string[]; relevantHintUsed?: boolean;
};
export type PracticeAttempts = Record<string, PracticeAttempt>;
export type PracticeHint = { id: string; type: HintType; source: string; at: number; taskKeys: string[] };
export type PracticeSession = { id: string; startedAt: number; lastActiveAt: number; hints: PracticeHint[] };
export type PracticeSessions = Record<string, PracticeSession>;
export const PRACTICE_IDLE_MS = 30 * 60_000;
export const DAY_MS = 86_400_000;
export const taskKey = (sentenceId: string, task: PracticeTask) => `${sentenceId}/${task.id}@${task.revision}`;
export function activePracticeSession(session: PracticeSession | undefined, now: number) {
  return session && now >= session.startedAt && now - session.lastActiveAt < PRACTICE_IDLE_MS ? session : undefined;
}
export function continuePracticeSession(session: PracticeSession | undefined, now: number, newId: string): PracticeSession {
  return { ...(activePracticeSession(session, now) ?? { id: newId, startedAt: now, hints: [] }), lastActiveAt: now };
}
export function addPracticeHint(session: PracticeSession, hint: PracticeHint): PracticeSession {
  return { ...session, lastActiveAt: hint.at, hints: [...session.hints.filter(h => h.type !== hint.type || h.source !== hint.source), hint] };
}
export function relevantPracticeHints(session: PracticeSession, task: PracticeTask, sentenceId: string, at: number) {
  return session.hints.filter(hint => hint.at >= session.startedAt && hint.at <= at && hint.taskKeys.includes(taskKey(sentenceId, task)));
}
export function hintAffectsTask(task: PracticeTask, type: HintType, source: string) {
  if (type === "article-map") return task.mapRevealsAnswer === true;
  if (type === "word") return (task.hintWords ?? []).some(word => word.toLowerCase() === source.toLowerCase());
  return type === "syntax" || type === "translation";
}
export function practiceHintTargets(sources: Array<{ id: string; practice?: PracticeTask[] }>, type: HintType, source: string, sentenceId?: string, feedbackTask?: PracticeTask) {
  return sources.flatMap(s => (s.practice ?? []).filter(task => feedbackTask
    ? (s.id === sentenceId && (task.id === feedbackTask.id || feedbackTask.leaksToTaskIds?.includes(task.id))) || feedbackTask.leaksToTasks?.some(target => target.sentenceId === s.id && target.taskId === task.id)
    : (!sentenceId || sentenceId === s.id) && hintAffectsTask(task, type, source)).map(task => taskKey(s.id, task)));
}
export function makePracticeAttempt(input: { id: string; articleId: string; sentenceId: string; task: PracticeTask; answer: string; at: number; session: PracticeSession }): PracticeAttempt {
  const { task, session, ...base } = input;
  const hints = relevantPracticeHints(session, task, input.sentenceId, input.at);
  return { ...base, taskId: task.id, revision: task.revision, correct: input.answer === task.answer,
    assisted: hints.length > 0, relevantHintUsed: hints.length > 0, modelVersion: 2, sessionId: session.id, startedAt: session.startedAt,
    hintTypes: [...new Set(hints.map(h => h.type))], hintSources: hints.map(h => h.source), conceptId: task.conceptId, errorType: task.errorType };
}
export const independentAttempt = (attempt: PracticeAttempt | undefined) => Boolean(attempt?.correct && attempt.modelVersion === 2 && !attempt.relevantHintUsed);
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
  return latest.every(independentAttempt) ? "independent" : "assisted";
}
export function practiceSchedule(history: PracticeAttempt[]) {
  let streak = 0, intervalDays = 0, dueAt = 0;
  for (const attempt of [...history].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id))) {
    if (!independentAttempt(attempt)) { streak = 0; intervalDays = 1; dueAt = attempt.at + DAY_MS; }
    else if (streak === 0 || attempt.at >= dueAt) {
      streak += 1; intervalDays = [3, 7, 14, 30][Math.min(streak - 1, 3)]; dueAt = attempt.at + intervalDays * DAY_MS;
    }
    // 提前再练可更新本次表现，但不靠当天反复答题提前晋级或不断延后到期日。
  }
  return { streak, intervalDays, dueAt };
}
export function practiceDueAt(attempt: PracticeAttempt, history: PracticeAttempt[] = [attempt]) {
  return practiceSchedule(history).dueAt;
}
export function practiceMetrics(sentences: Array<{ id: string; practice?: PracticeTask[] }>, attempts: PracticeAttempts, now: number) {
  const practiced = sentences.filter(s => s.practice?.length);
  return {
    total: practiced.length,
    completed: practiced.filter(s => s.practice!.every(task => latestTaskAttempt(attempts, task, s.id))).length,
    independent: practiced.filter(s => sentencePracticeStatus(s.practice!, attempts, s.id) === "independent").length,
    due: practiced.reduce((sum, s) => sum + s.practice!.filter(task => { const history = taskAttempts(attempts, task, s.id); return history.length && practiceSchedule(history).dueAt <= now; }).length, 0),
  };
}
export function isPracticeAttempt(value: unknown): value is PracticeAttempt {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return [v.id, v.articleId, v.sentenceId, v.taskId, v.answer].every(x => typeof x === "string")
    && typeof v.correct === "boolean" && typeof v.assisted === "boolean" && Number.isSafeInteger(v.at) && Number(v.at) >= 0
    && Number.isSafeInteger(v.revision) && Number(v.revision) > 0
    && typeof v.conceptId === "string" && Object.hasOwn(grammarConcepts, v.conceptId)
    && typeof v.errorType === "string" && Object.hasOwn(errorCategories, v.errorType)
    && (v.modelVersion === undefined || (v.modelVersion === 2 && typeof v.sessionId === "string" && Number.isSafeInteger(v.startedAt) && Number(v.startedAt) <= Number(v.at)
      && Array.isArray(v.hintTypes) && v.hintTypes.every(type => hintTypes.includes(type)) && Array.isArray(v.hintSources) && v.hintSources.every(source => typeof source === "string")
      && typeof v.relevantHintUsed === "boolean" && v.relevantHintUsed === v.assisted && v.relevantHintUsed === (v.hintTypes.length > 0)));
}
export function isPracticeSession(value: unknown): value is PracticeSession {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const s = value as PracticeSession;
  return typeof s.id === "string" && Number.isSafeInteger(s.startedAt) && s.startedAt >= 0 && Number.isSafeInteger(s.lastActiveAt) && s.lastActiveAt >= s.startedAt
    && Array.isArray(s.hints) && s.hints.every(h => h && typeof h === "object" && typeof h.id === "string" && hintTypes.includes(h.type) && typeof h.source === "string"
      && Number.isSafeInteger(h.at) && h.at >= 0 && Array.isArray(h.taskKeys) && h.taskKeys.every(key => typeof key === "string"));
}

/** 不认识训练字段的旧页面也不能在同步时删掉新记录。当前没有清空训练历史的产品操作。 */
export function preserveTrainingRecords(previous: Record<string, unknown>, incoming: Record<string, unknown>) {
  const result = { ...incoming };
  for (const key of ["locationAttempts", "practiceAttempts", "practiceReveals", "practiceSessions", "learningReflections", "questionWork"]) {
    const oldMap = previous[key], newMap = incoming[key];
    if (oldMap && typeof oldMap === "object" && !Array.isArray(oldMap)) {
      result[key] = { ...oldMap, ...(newMap && typeof newMap === "object" && !Array.isArray(newMap) ? newMap : {}) };
    }
  }
  return result;
}


/** 相同轮次顺序稳定；下一次尝试轮换位置，避免只记“第三项”。 */
export function practiceOptions(options: string[], seed: string, attemptNumber: number) {
  let hash = 0;
  for (const char of seed) hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0;
  const values = hash % 2 ? [...options].reverse() : [...options];
  const offset = values.length ? (hash + attemptNumber) % values.length : 0;
  return [...values.slice(offset), ...values.slice(0, offset)];
}
export function rangeTokens(text: string) {
  return [...text.matchAll(/[A-Za-z0-9£$]+(?:['’\-][A-Za-z0-9]+)*/g)].map(match => ({ text: match[0], start: match.index!, end: match.index! + match[0].length }));
}
export function selectedRange(text: string, start: number, end: number) {
  const tokens = rangeTokens(text), first = tokens[Math.min(start, end)], last = tokens[Math.max(start, end)];
  return first && last ? text.slice(first.start, last.end) : "";
}
export function practiceAnswerLabel(task: PracticeTask, answer: string) {
  if (answer === "__unsure__") return "还没找到";
  if (!["link", "order"].includes(task.kind)) return answer;
  try { const values = JSON.parse(answer) as string[]; return values.map((value, i) => task.kind === "link" ? `${task.links?.[i]?.source} → ${value}` : `${i + 1}. ${value}`).join("；"); }
  catch { return answer; }
}
