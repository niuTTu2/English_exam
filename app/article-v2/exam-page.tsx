import { Fragment, useEffect, useState } from "react";
import { questionOptionSourceId, type ArticleContent } from "../data";
import type { ArticleV2Mark, TextRange } from "./model";
import { changePage, elapsed, pauseTimer, progressFor, toggleSourceMark, type V2StudySnapshot, type V2Update } from "./state";

type MarkMode = "read" | "sentence" | "range";
export function SourceText({ text, sourceId, mode, marks, onMark }: {
  text: string; sourceId: string; mode: MarkMode; marks: ArticleV2Mark[];
  onMark: (sourceId: string, range: TextRange, kind: ArticleV2Mark["kind"]) => void;
}) {
  const [start, setStart] = useState<number | null>(null);
  const parts = Array.from(text.matchAll(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*|[^\p{L}\p{N}]+/gu));
  const marked = (from: number, to: number) => marks.some(m => m.sourceId === sourceId && m.active && m.start < to && m.end > from);
  if (mode === "sentence") return <button type="button" className={`v2-inline-sentence ${marked(0, text.length) ? "v2-marked" : ""}`} aria-pressed={marks.some(m => m.sourceId === sourceId && m.active && m.kind === "sentence")} onClick={() => onMark(sourceId, { start: 0, end: text.length }, "sentence")}>{text}</button>;
  return <span>{parts.map((part, i) => {
    const from = part.index!, to = from + part[0].length;
    const className = `${marked(from, to) ? "v2-marked" : ""} ${start === from && mode === "range" ? "v2-range-start" : ""}`;
    return mode === "range" && /^[\p{L}\p{N}]/u.test(part[0]) ? <button type="button" key={i} className={`v2-inline-word ${className}`} aria-label={`${part[0]}，${start === null ? "选择起点" : "选择终点"}`} onClick={() => {
      if (start === null) setStart(from);
      else { const begin = Math.min(start, from), end = Math.max(start + (text.slice(start).match(/^[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/u)?.[0].length ?? 0), to); onMark(sourceId, { start: begin, end }, begin === from && end === to ? "word" : "phrase"); setStart(null); }
    }}>{part[0]}</button> : <span className={className} key={i}>{part[0]}</span>;
  })}{mode === "range" && start !== null && <button className="v2-selection-cancel" type="button" onClick={() => setStart(null)}>取消起点</button>}</span>;
}

/** This component receives source/answers/marks only; never renders teaching content. */
export function ExamPage({ article, data, onUpdate }: { article: ArticleContent; data: V2StudySnapshot; onUpdate: (update: V2Update) => void }) {
  const [mode, setMode] = useState<MarkMode>("read"), [now, setNow] = useState(Date.now);
  const progress = progressFor(data, article.id);
  useEffect(() => { if (progress.timerStartedAt === undefined) return; const interval = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(interval); }, [progress.timerStartedAt]);
  const seconds = Math.floor(elapsed(progress, now) / 1000);
  const marks = Object.values(data.articleV2Marks ?? {}).filter(m => m.articleId === article.id && m.active);
  const mark = (sourceId: string, range: TextRange, kind: ArticleV2Mark["kind"]) => onUpdate(current => toggleSourceMark(current, { articleId: article.id, sourceId, kind, ...range }, Date.now()));
  const complete = article.questions.every(q => q.options.some(o => o.key === data.answers[q.id]));
  const submitted = data.submittedSections?.[article.id];
  return <div className="v2-exam">
    <div className="v2-toolbar"><label>正文标记<select aria-label="正文标记方式" value={mode} onChange={e => setMode(e.target.value as MarkMode)}><option value="read">连续阅读</option><option value="sentence">点句子标难句</option><option value="range">点首尾标词或词组</option></select></label>
      <span aria-label="用时">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</span>
      <button type="button" onClick={() => { const time = Date.now(); setNow(time); onUpdate(current => { const previous = progressFor(current, article.id); return { ...current, articleV2Progress: { ...current.articleV2Progress, [article.id]: previous.timerStartedAt === undefined ? { ...previous, timerStartedAt: time, updatedAt: time } : pauseTimer(previous, time) } }; }); }}>{progress.timerStartedAt === undefined ? "开始计时（可选）" : "暂停计时"}</button></div>
    {mode !== "read" && <p className="v2-hint">{mode === "sentence" ? "直接点正文中的句子标记难句，再点一次取消。" : "先点第一个词，再点最后一个词；标单词时点同一个词两次。已标范围再选一次即可取消。"}</p>}
    <article aria-label="原卷连续正文" className="v2-original" lang="en">{article.paragraphs?.map(p => <p key={p.id} data-paragraph-id={p.id}>{p.sentenceIds.map((id, i) => { const sentence = article.sentences.find(s => s.id === id)!; return <Fragment key={id}>{i > 0 ? " " : ""}<span id={`v2-exam-${id}`} data-source-id={id}><SourceText key={mode} text={sentence.text} sourceId={id} mode={mode} marks={marks} onMark={mark} /></span></Fragment>; })}</p>)}</article>
    <section aria-label="原卷题目">{article.questions.map(q => <fieldset key={q.id} id={`v2-exam-question-${q.id}-prompt`} className="v2-question">
      <legend><span>{q.number}. </span><SourceText key={mode} text={q.prompt} sourceId={`question-${q.id}-prompt`} mode={mode === "sentence" ? "read" : mode} marks={marks} onMark={mark} /></legend>
      {q.options.map(o => { const sourceId = questionOptionSourceId(q, o.key); return <div className="v2-option" id={`v2-exam-${sourceId}`} key={o.key}>
        <label><input type="radio" name={`v2-q-${q.id}`} aria-label={`第${q.number}题 ${o.key}`} checked={data.answers[q.id] === o.key} disabled={submitted} onChange={() => onUpdate(current => ({ ...current, answers: { ...current.answers, [q.id]: o.key } }))} /><strong>{o.key}</strong></label>
        <span lang="en"><SourceText key={mode} text={o.text} sourceId={sourceId} mode={mode === "sentence" ? "read" : mode} marks={marks} onMark={mark} /></span>
        <button type="button" className="v2-small" aria-pressed={marks.some(m => m.sourceId === sourceId && m.kind === "option")} onClick={() => mark(sourceId, { start: 0, end: o.text.length }, "option")}>读不懂此项</button>
      </div>; })}
    </fieldset>)}</section>
    <button className="v2-primary" type="button" disabled={!complete} onClick={() => onUpdate(current => ({ ...changePage(current, article.id, "analysis", Date.now()), submittedSections: { ...current.submittedSections, [article.id]: true } }))}>{submitted ? "查看本次解析" : "提交答案"}</button>
    {!complete && <p>请完成所有题目后提交。</p>}
  </div>;
}
