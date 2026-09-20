import { reviewedSenses2013, reviewedAnnotations2013 } from "./reviewed-senses-2013";
import type { ReviewedSenseAnnotation, ReviewedSenseAnnotations, ReviewedSenseGroup, ReviewedSenseTable } from "./reviewed-sense-types";
import { normalizeMeaning, normalizePartOfSpeech } from "./semantic-normalization";
import { reviewedSensesAF, reviewedAnnotationsAF } from "./reviewed-senses-a-f";
import { reviewedSensesGM, reviewedAnnotationsGM } from "./reviewed-senses-g-m";
import { reviewedSensesNS, reviewedAnnotationsNS } from "./reviewed-senses-n-s";
import { reviewedSensesTZ, reviewedAnnotationsTZ } from "./reviewed-senses-t-z";
import { reviewedSensesFunction, reviewedAnnotationsFunction } from "./reviewed-senses-function";

export const reviewedSenseTables: readonly ReviewedSenseTable[] = [reviewedSenses2013, reviewedSensesAF, reviewedSensesGM, reviewedSensesNS, reviewedSensesTZ, reviewedSensesFunction];
export const reviewedAnnotationTables: readonly ReviewedSenseAnnotations[] = [reviewedAnnotations2013, reviewedAnnotationsAF, reviewedAnnotationsGM, reviewedAnnotationsNS, reviewedAnnotationsTZ, reviewedAnnotationsFunction];

const formKey = (pos: string, meaning: string) => JSON.stringify([normalizePartOfSpeech(pos), normalizeMeaning(meaning)]);
const sourceKey = (sourceId: string, pos: string, meaning: string, expression?: string) => JSON.stringify([sourceId, formKey(pos, meaning), expression?.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim() ?? null]);
type Index<T> = { forms: Map<string, T>; sources: Map<string, T> };

function index<T extends Pick<ReviewedSenseAnnotation, "forms" | "sources">>(groups: readonly T[], term: string, same: (a: T, b: T) => boolean): Index<T> {
  const result = { forms: new Map<string, T>(), sources: new Map<string, T>() };
  function add(map: Map<string, T>, key: string, group: T) {
    const previous = map.get(key);
    if (previous && !same(previous, group)) throw new Error(`Conflicting reviewed vocabulary mapping: ${term} ${key}`);
    map.set(key, group);
  }
  for (const group of groups) {
    for (const [pos, meanings] of group.forms ?? []) for (const meaning of meanings) add(result.forms, formKey(pos, meaning), group);
    for (const [sourceId, pos, meaning, expression] of group.sources ?? []) add(result.sources, sourceKey(sourceId, pos, meaning, expression), group);
  }
  return result;
}

const senses = new Map<string, Index<ReviewedSenseGroup>>();
const annotations = new Map<string, Index<ReviewedSenseAnnotation>>();
function lookup<T>(value: Index<T>, pos: string, meaning: string, sourceId?: string, expression?: string) {
  const candidates = [sourceId && expression ? value.sources.get(sourceKey(sourceId, pos, meaning, expression)) : undefined,
    sourceId ? value.sources.get(sourceKey(sourceId, pos, meaning)) : undefined, value.forms.get(formKey(pos, meaning))];
  const rank = candidates.findIndex(item => item !== undefined);
  return rank < 0 ? undefined : { value: candidates[rank]!, rank };
}

/** Built per opened/saved word, never by scanning the corpus on the home page. */
function resolve(term: string, pos: string, meaning: string, sourceId?: string, expression?: string) {
  if (!senses.has(term)) senses.set(term, index(reviewedSenseTables.flatMap(table => table[term] ?? []), term,
    (a, b) => a.id === b.id && normalizePartOfSpeech(a.pos) === normalizePartOfSpeech(b.pos) && a.meaning === b.meaning));
  if (!annotations.has(term)) annotations.set(term, index(reviewedAnnotationTables.flatMap(table => table[term] ?? []), term,
    (a, b) => a.reason === b.reason));
  const sense = lookup(senses.get(term)!, pos, meaning, sourceId, expression);
  const annotation = lookup(annotations.get(term)!, pos, meaning, sourceId, expression);
  return annotation && (!sense || annotation.rank < sense.rank) ? { annotation: annotation.value } : { sense: sense?.value };
}

export function getReviewedSenseMapping(term: string, pos: string, meaning: string, sourceId?: string, expression?: string) {
  return resolve(term, pos, meaning, sourceId, expression).sense;
}

/** Only explicitly reviewed notes move out of the sense list; no text-length or mixed-POS heuristic. */
export function getReviewedSenseAnnotation(term: string, pos: string, meaning: string, sourceId?: string, expression?: string) {
  // The most precise source/expression decision wins in either direction.
  return resolve(term, pos, meaning, sourceId, expression).annotation;
}

export function getReviewedSenseGroups(term: string) {
  return reviewedSenseTables.flatMap(table => table[term] ?? []);
}
