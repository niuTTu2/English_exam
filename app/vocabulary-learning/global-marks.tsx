"use client";

import { createContext, Fragment, useContext, useMemo, type ButtonHTMLAttributes, type ReactNode } from "react";
import { canonicalLemma, type LexicalContext } from "../lexicon";
import type { VocabularyCorpus } from "./corpus";
import type { VocabularyLearningData } from "./model";

/** Global highlighting is by lemma; learning continues to distinguish actual senses. */
export function createGlobalMarkLookup(data: VocabularyLearningData, corpus: VocabularyCorpus, legacy: Record<string, string[]> = {}) {
  const memories = Object.values(data.vocabularyMemories ?? {}).filter(memory => memory.kind === "word");
  const keys = new Set(memories.filter(memory => !memory.paused && memory.status !== "paused" && memory.contexts.some(context => context.mark)).map(memory => memory.termKey));
  for (const [key, tags] of Object.entries(legacy)) if (tags.length && !memories.some(memory => memory.termKey === key)) keys.add(key);
  return (expression: string, sourceId: string) => {
    if (!keys.size) return false;
    const source = corpus.getSource(sourceId);
    const lemma = canonicalLemma(expression, source ? { articleId: source.articleId as LexicalContext["articleId"], sourceId, sentenceId: source.sentenceId } : undefined);
    return keys.has(lemma);
  };
}

const GlobalMarks = createContext<(expression: string, sourceId: string) => boolean>(() => false);
export function GlobalVocabularyProvider({ data, corpus, legacy, children }: { data: VocabularyLearningData; corpus: VocabularyCorpus; legacy?: Record<string, string[]>; children: ReactNode }) {
  const lookup = useMemo(() => createGlobalMarkLookup(data, corpus, legacy), [data, corpus, legacy]);
  return <GlobalMarks.Provider value={lookup}>{children}</GlobalMarks.Provider>;
}
export const useGlobalWordMark = () => useContext(GlobalMarks);

export function GlobalWord({ word, sourceId, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { word: string; sourceId: string }) {
  const marked = useGlobalWordMark()(word, sourceId);
  return <button {...props} className={marked ? `${className ?? ""} global-vocabulary-mark` : className} data-global-vocabulary={marked || undefined} title={marked ? "已加入全局生词库" : props.title} />;
}

/** Plain exam text stays plain unless the user has already marked this lemma. */
export function GlobalMarkedText({ text, sourceId }: { text: string; sourceId: string }) {
  const marked = useGlobalWordMark();
  return <>{text.split(/([A-Za-z]+(?:[-'’][A-Za-z]+)*)/g).map((part, i) => /^[A-Za-z]/.test(part) && marked(part, sourceId)
    ? <mark className="global-vocabulary-mark" data-global-vocabulary title="已加入全局生词库" key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>)}</>;
}
