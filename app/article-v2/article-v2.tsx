import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { questionOptionSourceId, type ArticleContent, type AnyQuestion } from "../data";
import type { VocabularyCorpus } from "../vocabulary-learning/corpus";
import { articleSources, validateV2Article } from "./content";
import { v2Pages, type V2Page } from "./model";
import { changePage, progressFor, type V2StudySnapshot, type V2Update } from "./state";
import { ExamPage } from "./exam-page";
import { QuickReadingPage, type OnTerm } from "./quick-reading-card";
import { QuestionAnalysisPage } from "./question-mistake-card";
import { ArticleVocabularyPage } from "./article-vocabulary-page";
import "./article-v2.css";

export type V2SourceRequest = { sourceId: string; nonce: number };
export type ArticleV2Props = {
  article: ArticleContent; data: V2StudySnapshot; ready: boolean; corpus: VocabularyCorpus;
  onUpdate: (update: V2Update) => void; onTerm: OnTerm; onExternalSource: (sourceId: string) => void;
  sourceRequest?: V2SourceRequest;
  renderQuestionDetails: (question: AnyQuestion, onSentence: (id: string) => void) => ReactNode;
};
export default function ArticleV2({ article, data, ready, corpus, onUpdate, onTerm, onExternalSource, sourceRequest, renderQuestionDetails }: ArticleV2Props) {
  const issues = useMemo(() => validateV2Article(article, corpus), [article, corpus]);
  const sources = useMemo(() => articleSources(article), [article]);
  const [error, setError] = useState(""), [anchor, setAnchor] = useState("");
  const [returnSource, setReturnSource] = useState<string>();
  const consumedRequest = useRef<number | undefined>(undefined);
  const page = progressFor(data, article.id).page;
  const save = useCallback((update: V2Update) => {
    try { onUpdate(update); setError(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "未能保存，请保留当前页面并重试。"); throw reason; }
  }, [onUpdate]);
  const navigate = useCallback((next: V2Page) => { save(current => changePage(current, article.id, next, Date.now())); setAnchor(""); }, [save, article.id]);
  const visitSource = useCallback((sourceId: string, origin?: string, questionPage: "exam" | "analysis" = "exam") => {
    if (!sources.has(sourceId)) { onExternalSource(sourceId); return; }
    const isSentence = article.sentences.some(s => s.id === sourceId);
    const target: V2Page = isSentence ? "read" : questionPage === "analysis" && data.submittedSections?.[article.id] ? "analysis" : "exam";
    let targetSource = sourceId;
    if (target === "analysis") {
      const q = article.questions.find(q => `question-${q.id}-prompt` === sourceId || q.options.some(o => questionOptionSourceId(q, o.key) === sourceId));
      if (q) targetSource = `question-${q.id}-prompt`;
    }
    navigate(target); setReturnSource(origin); setAnchor(`v2-${target}-${targetSource}`);
  }, [sources, article, data.submittedSections, navigate, onExternalSource]);
  useEffect(() => {
    if (!ready || !sourceRequest || consumedRequest.current === sourceRequest.nonce || !sources.has(sourceRequest.sourceId)) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try { visitSource(sourceRequest.sourceId); consumedRequest.current = sourceRequest.nonce; } catch { /* Save failure stays visible. */ }
    });
    return () => { cancelled = true; };
  }, [sourceRequest, sources, ready, visitSource]);
  useEffect(() => { if (!anchor) return; document.getElementById(anchor)?.scrollIntoView({ block: "start", behavior: "instant" }); }, [anchor, page]);
  if (issues.length) return <section className="article-v2" role="alert"><h2>这篇文章的 V2 内容尚未通过校验</h2><p>学习记录已保留，请联系内容维护者。</p><details><summary>查看缺项</summary><ul>{issues.map((issue, i) => <li key={i}>{issue}</li>)}</ul></details></section>;
  if (!ready) return <section className="article-v2" role="status">正在安全载入学习记录…</section>;
  const props = { article, data, onUpdate: save };
  const done = article.questions.filter(q => data.answers[q.id]).length;
  return <div className="article-v2">
    <header><p className="v2-eyebrow">{article.year} · {article.label}</p><h2>{article.title}</h2><p>{data.submittedSections?.[article.id] ? "答案已提交 · 从错题出发核对理解" : `已作答 ${done} / ${article.questions.length} 题`}</p></header>
    <nav className="v2-tabs" aria-label="文章学习页面">{Object.entries(v2Pages).map(([key, label]) => <button type="button" key={key} aria-current={page === key ? "page" : undefined} onClick={() => { setReturnSource(undefined); navigate(key as V2Page); }}>{label}</button>)}</nav>
    {error && <p className="v2-error" role="alert">{error}</p>}
    {returnSource && <aside className="v2-return"><span>正在核对原文</span><button type="button" onClick={() => visitSource(returnSource, undefined, "analysis")}>返回刚才的题目</button></aside>}
    {page === "exam" && <ExamPage {...props} corpus={corpus} />}
    {page === "read" && <QuickReadingPage {...props} onTerm={onTerm} />}
    {page === "analysis" && <QuestionAnalysisPage {...props} onSource={visitSource} renderDetails={renderQuestionDetails} />}
    {page === "vocabulary" && <ArticleVocabularyPage {...props} corpus={corpus} onTerm={onTerm} onSource={visitSource} />}
  </div>;
}
