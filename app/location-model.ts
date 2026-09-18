import type { QuestionReasoning } from "./article-teaching";
import type { QuestionWork } from "./learning-model";

export type LocationPath = { id: string; label: string; groups: string[][]; supportingSentenceIds: string[]; maxSentences: number };
export type LocationPolicy = { revision: number; paths: LocationPath[] };
export function assessLocation(reasoning: QuestionReasoning, work: QuestionWork, passageIds: string[]) {
  const selected = [...new Set(work.sentenceIds)];
  const candidates = (reasoning.locationPolicy?.paths ?? []).map(path => {
    const allowed = new Set([...path.groups.flat(), ...path.supportingSentenceIds]);
    const covered = path.groups.filter(group => group.some(id => selected.includes(id))).length;
    const unrelated = selected.filter(id => !allowed.has(id) || !passageIds.includes(id));
    const coverage = path.groups.length ? covered / path.groups.length : 0;
    const precision = selected.length ? (selected.length - unrelated.length) / selected.length : 0;
    const scopeMatch = work.scope === reasoning.scope;
    const tooBroad = selected.length > path.maxSentences || (passageIds.length > 1 && passageIds.every(id => selected.includes(id)));
    return { pathId: path.id, pathLabel: path.label, coverage, precision, scopeMatch, tooBroad, unrelated,
      passed: scopeMatch && coverage === 1 && precision === 1 && !tooBroad };
  });
  return candidates.sort((a, b) => Number(b.passed) - Number(a.passed) || (b.coverage + b.precision - Number(b.tooBroad)) - (a.coverage + a.precision - Number(a.tooBroad)))[0];
}
export type LocationAttempt = { id: string; articleId: string; questionId: number; at: number; revision: number; stage: "initial" | "review" | "legacy"; work: QuestionWork; result: NonNullable<ReturnType<typeof assessLocation>> };
export type LocationAttempts = Record<string, LocationAttempt>;
export function locationHistory(attempts: LocationAttempts, questionId: number) {
  return Object.values(attempts).filter(a => a.questionId === questionId).sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
}
export function makeLocationAttempt(input: Omit<LocationAttempt, "result" | "revision">, reasoning: QuestionReasoning, passageIds: string[]): LocationAttempt | undefined {
  if (!input.work.scope && !input.work.sentenceIds.length) return undefined;
  const result = assessLocation(reasoning, input.work, passageIds);
  if (!result || !reasoning.locationPolicy) return undefined;
  return { ...input, work: { ...input.work, sentenceIds: [...new Set(input.work.sentenceIds)] }, revision: reasoning.locationPolicy.revision, result };
}
export function isLocationAttempt(value: unknown): value is LocationAttempt {
  if (!value || typeof value !== "object") return false;
  const a = value as LocationAttempt, r = a.result;
  return typeof a.id === "string" && typeof a.articleId === "string" && Number.isSafeInteger(a.questionId) && Number.isSafeInteger(a.at) && a.at >= 0
    && Number.isSafeInteger(a.revision) && a.revision > 0 && ["initial", "review", "legacy"].includes(a.stage)
    && Boolean(a.work && ["", "sentence", "adjacent-sentences", "paragraph", "whole-passage"].includes(a.work.scope) && Array.isArray(a.work.sentenceIds) && a.work.sentenceIds.every(id => typeof id === "string"))
    && Boolean(r && typeof r.pathId === "string" && typeof r.pathLabel === "string" && [r.coverage, r.precision].every(n => Number.isFinite(n) && n >= 0 && n <= 1)
      && [r.scopeMatch, r.tooBroad, r.passed].every(v => typeof v === "boolean") && Array.isArray(r.unrelated) && r.unrelated.every(id => typeof id === "string"));
}
