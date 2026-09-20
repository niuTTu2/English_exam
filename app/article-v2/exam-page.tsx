import { Fragment, useEffect, useState } from "react";
import { questionOptionSourceId, type ArticleContent } from "../data";
import { changePage, elapsed, pauseTimer, progressFor, type V2StudySnapshot, type V2Update } from "./state";
import { SourceText, useSourceMarking } from "./source-marking";
import type { MarkMode } from "./source-selection";

/** This component receives source/answers/marks only; never renders teaching content. */
export function ExamPage({ article, data, onUpdate }: { article: ArticleContent; data: V2StudySnapshot; onUpdate: (update: V2Update) => void }) {
  const [now, setNow] = useState(Date.now);
  const marking = useSourceMarking(article, data, onUpdate);
  const { mode, marks, selection, pick } = marking;
  const progress = progressFor(data, article.id);
  useEffect(() => { if (progress.timerStartedAt === undefined) return; const interval = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(interval); }, [progress.timerStartedAt]);
  const seconds = Math.floor(elapsed(progress, now) / 1000);
  const complete = article.questions.every(q => q.options.some(o => o.key === data.answers[q.id]));
  const submitted = data.submittedSections?.[article.id];
  return <div className={`v2-exam ${marking.hasEditor ? "v2-has-mark-editor" : ""}`}>
    <div className="v2-toolbar"><label>正文标记<select aria-label="正文标记方式" value={mode} onChange={e => marking.changeMode(e.target.value as MarkMode)}><option value="read">连续阅读</option><option value="word">标单词</option><option value="phrase">标词组</option><option value="sentence">标句子</option></select></label>
      <span aria-label="用时">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</span>
      <button type="button" onClick={() => { const time = Date.now(); setNow(time); onUpdate(current => { const previous = progressFor(current, article.id); return { ...current, articleV2Progress: { ...current.articleV2Progress, [article.id]: previous.timerStartedAt === undefined ? { ...previous, timerStartedAt: time, updatedAt: time } : pauseTimer(previous, time) } }; }); }}>{progress.timerStartedAt === undefined ? "开始计时（可选）" : "暂停计时"}</button></div>
    {mode !== "read" && <p className="v2-hint">{mode === "word" ? "点一个词，确认标记。误点只需取消选择，不会保存。" : mode === "phrase" ? "点起点词和终点词，核对范围后确认标记。可重新选择起点或取消选择。" : "点一句话，确认后才标记。取消已有标记请使用明确的取消按钮。"}</p>}
    {marking.editor}
    <article aria-label="原卷连续正文" className="v2-original" lang="en">{article.paragraphs?.map(p => <p key={p.id} data-paragraph-id={p.id}>{p.sentenceIds.map((id, i) => { const sentence = article.sentences.find(s => s.id === id)!; return <Fragment key={id}>{i > 0 ? " " : ""}<span id={`v2-exam-${id}`} data-source-id={id}><SourceText key={mode} text={sentence.text} sourceId={id} mode={mode} marks={marks} selection={selection} onPick={pick} /></span></Fragment>; })}</p>)}</article>
    <section aria-label="原卷题目">{article.questions.map(q => <fieldset key={q.id} id={`v2-exam-question-${q.id}-prompt`} className="v2-question">
      <legend><span>{q.number}. </span><SourceText key={mode} text={q.prompt} sourceId={`question-${q.id}-prompt`} mode={mode === "sentence" ? "read" : mode} marks={marks} selection={selection} onPick={pick} /></legend>
      {q.options.map(o => { const sourceId = questionOptionSourceId(q, o.key); return <div className="v2-option" id={`v2-exam-${sourceId}`} key={o.key}>
        <label><input type="radio" name={`v2-q-${q.id}`} aria-label={`第${q.number}题 ${o.key}`} checked={data.answers[q.id] === o.key} disabled={submitted} onChange={() => onUpdate(current => ({ ...current, answers: { ...current.answers, [q.id]: o.key } }))} /><strong>{o.key}</strong></label>
        <span lang="en"><SourceText key={mode} text={o.text} sourceId={sourceId} mode={mode === "sentence" ? "read" : mode} marks={marks} selection={selection} onPick={pick} /></span>
        <button type="button" className="v2-small" aria-pressed={marks.some(m => m.sourceId === sourceId && m.kind === "option")} onClick={() => marking.pickOption(sourceId, o.text)}>{marks.some(m => m.sourceId === sourceId && m.kind === "option") ? "查看此项标记" : "标记整个选项"}</button>
      </div>; })}
    </fieldset>)}</section>
    <button className="v2-primary" type="button" disabled={!complete} onClick={() => onUpdate(current => ({ ...changePage(current, article.id, "analysis", Date.now()), submittedSections: { ...current.submittedSections, [article.id]: true } }))}>{submitted ? "查看本次解析" : "提交答案"}</button>
    {!complete && <p>请完成所有题目后提交。</p>}
  </div>;
}
