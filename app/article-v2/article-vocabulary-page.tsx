import { useMemo, useState } from "react";
import type { ArticleContent } from "../data";
import type { VocabularyCorpus } from "../vocabulary-learning/corpus";
import { createMemory } from "../vocabulary-learning/model";
import { memorySemanticKey } from "../vocabulary-learning/memory-groups";
import { enrollVocabulary } from "../vocabulary-learning/study-bridge";
import { VocabularyLearning } from "../vocabulary-learning/vocabulary-learning";
import { vocabularyCategories } from "./model";
import { vocabularyTitle } from "../vocabulary-learning/word-forms";
import type { OnTerm } from "./quick-reading-card";
import type { V2StudySnapshot, V2Update } from "./state";

export function ArticleVocabularyPage({ article, data, corpus, onUpdate, onTerm, onSource }: {
  article: ArticleContent; data: V2StudySnapshot; corpus: VocabularyCorpus; onUpdate: (update: V2Update) => void; onTerm: OnTerm; onSource: (sourceId: string) => void;
}) {
  const [learning, setLearning] = useState(false), [notice, setNotice] = useState("");
  const items = useMemo(() => (article.vocabularyFocus ?? []).map(focus => ({ focus, candidate: corpus.resolveCandidate(focus.expression, focus.kind === "phrase", focus.sourceId, true)! })), [article, corpus]);
  const memories = Object.values(data.vocabularyMemories ?? {});
  return <section aria-label="词汇搭配">
    <div className="v2-toolbar"><p>按本句义学习单词，把固定搭配作为一个记忆项。</p><button type="button" className="v2-primary" onClick={() => setLearning(!learning)}>{learning ? "返回本篇词汇" : "进入单词词组学习与复习"}</button></div>
    {notice && <p role="status">{notice}</p>}
    {learning ? <VocabularyLearning data={data} onUpdate={update => onUpdate(current => ({ ...current, ...update(current) }))} corpus={corpus} articleId={article.id} articleLabel={article.label} year={article.year} lists={data.lists} listItems={data.listItems} marks={data.marks} notes={data.termNotes} onNote={(key, note) => onUpdate(current => ({ ...current, termNotes: { ...current.termNotes, [key]: note } }))} onSource={onSource} /> : Object.entries(vocabularyCategories).map(([category, label]) => <section key={category}><h3>{label}</h3>
      {!items.some(item => item.focus.categories.includes(category as keyof typeof vocabularyCategories)) && <p>本篇暂无此类精审条目。</p>}
      {items.filter(item => item.focus.categories.includes(category as keyof typeof vocabularyCategories)).map(({ focus, candidate }, i) => {
        const identity = memorySemanticKey(createMemory(candidate, 0, memories));
        const enrolled = memories.some(m => memorySemanticKey(m) === identity);
        const contexts = corpus.candidatesForMemory(createMemory(candidate, 0, memories));
        return <article className="v2-vocabulary-item" key={`${focus.sourceId}-${focus.expression}-${i}`}>
          <h4><button type="button" onClick={() => onTerm(focus.expression, focus.sourceId, focus.kind === "phrase")}>{vocabularyTitle(candidate.entry)}</button> <small>{focus.kind === "phrase" ? "独立词组" : candidate.entry.partOfSpeech}</small></h4>
          <p className="v2-hint">原文词形：<span lang="en">{candidate.context.expression}</span></p>
          <p><strong>本句义：</strong>{candidate.entry.contextualMeaning}</p><p lang="en">{candidate.text}</p><p className="v2-hint">{candidate.sourceLabel} · {enrolled ? "已进入记忆系统" : "尚未加入"}</p>
          <div className="v2-actions"><button type="button" onClick={() => { onUpdate(current => ({ ...current, ...enrollVocabulary(current, candidate, Date.now()) })); setNotice(`已加入待学：${focus.expression}（当前语境义）。`); }}>加入待学</button>
            <button type="button" onClick={() => { onUpdate(current => ({ ...current, ...enrollVocabulary(current, candidate, Date.now(), "有些陌生") })); setNotice(`已加入复习：${focus.expression}（当前语境义）。`); }}>加入复习</button>
            <button type="button" onClick={() => onSource(focus.sourceId)}>回到原句或题目</button><button type="button" onClick={() => onTerm(focus.expression, focus.sourceId, focus.kind === "phrase")}>查看其他真题语境{contexts.length > 1 ? `（${contexts.length}）` : ""}</button></div>
        </article>;
      })}</section>)}
  </section>;
}
