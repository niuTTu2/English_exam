import { useMemo } from "react";
import type { ArticleContent } from "../data";
import type { VocabularyCorpus } from "../vocabulary-learning/corpus";
import { readingMarkCandidate } from "../vocabulary-learning/reading-marks";
import type { V2StudySnapshot } from "./state";
import type { OnTerm } from "./quick-reading-card";

/** The exact marked source owns the translation, including prompts and wrong options. */
export function markedArticleVocabulary(article: ArticleContent, data: V2StudySnapshot, corpus: VocabularyCorpus) {
  const entries = new Map<string, NonNullable<ReturnType<typeof readingMarkCandidate>>>();
  for (const mark of Object.values(data.articleV2Marks ?? {})) {
    if (!mark.active || mark.articleId !== article.id) continue;
    const candidate = readingMarkCandidate(mark, corpus);
    if (candidate) entries.set(`${candidate.context.id}:${candidate.entry.kind}:${candidate.entry.key}`, candidate);
  }
  return [...entries.values()];
}

export function MarkedVocabulary({ article, data, corpus, onTerm }: { article: ArticleContent; data: V2StudySnapshot; corpus: VocabularyCorpus; onTerm: OnTerm }) {
  const entries = useMemo(() => markedArticleVocabulary(article, data, corpus), [article, data, corpus]);
  if (!entries.length) return null;
  return <section className="v2-marked-vocabulary" aria-label="本篇已标记生词的翻译">
    <h3>本篇已标记生词 · {entries.length} 处</h3><p>包括正文、题干和选项。已加入全局待复习；点击词查看详细用法。</p>
    <ul>{entries.map(candidate => <li key={`${candidate.context.id}:${candidate.entry.key}`}>
      <button type="button" className="v2-inline-word" onClick={() => onTerm(candidate.context.expression, candidate.context.sourceId, candidate.entry.kind === "phrase")}><strong lang="en">{candidate.entry.headword}</strong></button>
      {candidate.context.expression.toLowerCase() !== candidate.entry.headword.toLowerCase() && <span lang="en">（原文：{candidate.context.expression}）</span>}
      <span> · {candidate.entry.contextualMeaning}</span>
      <small>{corpus.getSource(candidate.context.sourceId)?.sourceLabel}</small>
    </li>)}</ul>
  </section>;
}
