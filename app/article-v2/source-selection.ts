import type { ArticleV2Mark, TextRange } from "./model";

export type MarkMode = "read" | "word" | "phrase" | "sentence";
export type MarkSelection = TextRange & {
  sourceId: string;
  kind: ArticleV2Mark["kind"];
  anchor: TextRange;
  ready: boolean;
};

/** Selection is ephemeral. Only a separate confirmation writes a study record. */
export function selectMark(previous: MarkSelection | null, mode: Exclude<MarkMode, "read">, sourceId: string, range: TextRange): MarkSelection {
  if (mode !== "phrase") return { ...range, sourceId, kind: mode, anchor: range, ready: true };
  if (!previous || previous.sourceId !== sourceId || previous.kind === "option" || previous.kind === "sentence") return { ...range, sourceId, kind: "phrase", anchor: range, ready: false };
  const start = Math.min(previous.anchor.start, range.start), end = Math.max(previous.anchor.end, range.end);
  return { sourceId, start, end, anchor: previous.anchor, ready: true, kind: start === range.start && end === range.end ? "word" : "phrase" };
}

/** Same English token boundaries as the shared vocabulary corpus, preserving source offsets. */
export function readingWords(text: string): Array<TextRange & { text: string }> {
  return Array.from(text.matchAll(/[a-z]+(?:\d+[a-z]*)+\b|\d+(?:st|nd|rd|th)\b|\d{4}s\b|(?:[a-z]\.){2,}|(?<![a-z0-9])[a-z]+(?:-[a-z]+)?(?:['’][a-z]+)?/gi), match => ({ start: match.index!, end: match.index! + match[0].length, text: match[0] }));
}
