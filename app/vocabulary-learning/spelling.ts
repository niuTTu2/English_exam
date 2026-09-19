/** Only typographic differences are normalized; missing prepositions and wrong inflections remain wrong. */
export function normalizeSpelling(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[‘’]/g, "'").replace(/[‐‑‒–—]/g, "-").replace(/\s+/g, " ").trim();
}
export function gradeSpelling(answer: string, expected: string | string[]) {
  return (Array.isArray(expected) ? expected : [expected]).some(value => normalizeSpelling(value) === normalizeSpelling(answer));
}
export type VocabularyCloze = { before: string; answer: string; after: string; text: string };
/** Exact source expression only. No adjacent-token phrase generation or invented canonical inflection. */
export function makePhraseCloze(text: string, expression: string, keyPart?: string): VocabularyCloze | undefined {
  const escaped = expression.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!expression.trim()) return undefined;
  const match = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "iu").exec(text);
  if (!match) return undefined;
  let start = match.index, answer = match[0];
  if (keyPart) {
    const part = new RegExp(`(?<![\\p{L}\\p{N}])${keyPart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}])`, "iu").exec(answer);
    if (!part) return undefined;
    start += part.index; answer = part[0];
  }
  const before = text.slice(0, start), after = text.slice(start + answer.length);
  return { before, answer, after, text: `${before}____${after}` };
}
