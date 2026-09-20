/** Formatting equality only; qualifiers and semantic words must remain intact. */
export function normalizeMeaning(meaning: string) {
  return [...new Set(meaning.normalize("NFKC").replace(/\s/g, "")
    .split(/[;,、]/).map(part => part.replace(/[。]+$/g, "")).filter(Boolean))].sort().join(";");
}

export function normalizePartOfSpeech(pos: string) {
  const matches = Array.from(pos.matchAll(/\b(n|v|vt|vi|adj|adv|prep|conj|pron|det|aux|num)\./g), match => match[1] === "vt" || match[1] === "vi" ? "v" : match[1]);
  return matches.length ? Array.from(new Set(matches)).sort().join("/") : pos.replace(/[（(].*?[）)]/g, "").trim();
}
