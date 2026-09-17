import type { BeginnerClauseDetail, BeginnerSyntaxComponent, SentenceAnalysis, SyntaxRole } from "./data";
import type { ContextualSubstitution } from "./contextual-vocabulary";
import type { PhraseKnowledge } from "./knowledge-base";

type Segment = BeginnerSyntaxComponent & { role: SyntaxRole };
export function segment(text: string, role: SyntaxRole, form: string, grammaticalFunction: string, modifies: string, explanation: string): Segment {
  return { text, role, form, function: grammaticalFunction, modifies, explanation };
}
export function clause(text: string, type: string, marker: string, role: string, subject: string, predicate: string, objectOrComplement: string, translationOrder: string): BeginnerClauseDetail {
  return { text, type, marker, role, subject, predicate, objectOrComplement, translationOrder };
}
export function sentenceFactory(articleId: string) {
  return (number: number, parts: Segment[], trunk: string, literal: string, natural: string, logic: string, phrases: string[], clauses: BeginnerClauseDetail[] = []): SentenceAnalysis => ({
    id: `${articleId}-s${number}`, number, text: parts.map(part => part.text).join(""), trunk, literal, natural, logic, phrases,
    chunks: parts.map(({ text, role }) => ({ text, role })),
    layers: parts.map(part => ({ label: part.function, text: part.explanation })),
    grammar: parts.map(part => `${part.text.trim()}：${part.form}；${part.explanation}`),
    beginnerSyntax: { components: parts.map(({ text, form, function: grammaticalFunction, modifies, explanation }) => ({ text: text.trim(), form, function: grammaticalFunction, modifies, explanation })), clauses },
  });
}

export type ReviewedEntry = {
  partOfSpeech: string; contextualMeaning: string; use: string; specialForms: string[];
  collocations: string[]; examSynonyms: string[]; otherMeanings?: string[];
  contextualSubstitutions?: ContextualSubstitution[];
};
export type LexiconRow = [headword: string, forms: string, partOfSpeech: string, meaning: string, use: string, collocation: string, distinction: string];
export function reviewedLexicon(rows: LexiconRow[]) {
  const entries: Record<string, ReviewedEntry> = Object.fromEntries(rows.map(([headword, forms, partOfSpeech, contextualMeaning, use, collocation, distinction]) => [headword, {
    partOfSpeech, contextualMeaning, use,
    specialForms: [forms ? `${headword}的屈折词形：${forms.split(" ").join(" / ")}；派生词不并入原形次数。` : "本句使用原形，无需另记不规则屈折变化。"],
    collocations: [collocation.split("（")[0]], examSynonyms: [distinction],
  }]));
  const aliases: Record<string, string> = Object.fromEntries(rows.flatMap(([headword, forms]) => forms.split(" ").filter(Boolean).map(form => [form, headword])));
  const glosses: Record<string, { meaning: string; note: string }> = Object.fromEntries(rows.map(([, , , , note, collocation]) => {
    const [label, meaning] = collocation.split("（");
    return [label.toLowerCase(), { meaning: meaning.replace(/）$/, ""), note }];
  }));
  return { entries, aliases, glosses };
}

export type PhraseRow = [key: string, source: string, canonical: string, type: string, meaning: string, rule: string, english: string, chinese: string, pitfall: string];
export function reviewedPhrases(rows: PhraseRow[]) {
  const guides: Record<string, PhraseKnowledge> = Object.fromEntries(rows.map(([key, , canonical, type, meaning, rule, english, chinese, pitfall]) => [key, {
    key, canonical, type, meaning, summary: rule, grammarRole: type,
    structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall],
  }]));
  const aliases = Object.fromEntries(rows.flatMap(([key, source, canonical]) => [source, canonical].map(expression => [expression.toLowerCase(), key])));
  const glosses = Object.fromEntries(rows.map(([, source, , , meaning, note]) => [source.toLowerCase(), { meaning, note }]));
  return { guides, aliases, glosses };
}
