import { useEffect, useState } from "react";
import { questionOptionSourceId, type ArticleContent } from "../data";
import type { ArticleV2Mark, TextRange } from "./model";
import { articleSources } from "./content";
import { selectMark, type MarkMode, type MarkSelection } from "./source-selection";
import { markId, setSourceMark, undoSourceMark, type SourceMarkInput, type V2StudySnapshot, type V2Update } from "./state";

const kindNames = { word: "单词", phrase: "词组", sentence: "句子", option: "选项" };
type Undo = { input: SourceMarkInput; before: boolean; after: boolean; at: number };

export function SourceText({ text, sourceId, mode, marks, selection, onPick }: {
  text: string; sourceId: string; mode: MarkMode; marks: ArticleV2Mark[]; selection: MarkSelection | null;
  onPick: (sourceId: string, range: TextRange) => void;
}) {
  const marked = (start: number, end: number) => marks.some(m => m.sourceId === sourceId && m.active && m.start < end && m.end > start);
  const pending = (start: number, end: number) => selection?.sourceId === sourceId && selection.start < end && selection.end > start;
  if (mode === "sentence") return <button type="button" className={`v2-inline-sentence ${marks.some(m => m.sourceId === sourceId && m.kind === "sentence" && m.active) ? "v2-marked" : ""} ${pending(0, text.length) ? "v2-pending-mark" : ""}`} aria-label={`选择句子：${text}`} onClick={() => onPick(sourceId, { start: 0, end: text.length })}><SourceText text={text} sourceId={sourceId} mode="read" marks={marks} selection={null} onPick={onPick} /></button>;
  return <span>{Array.from(text.matchAll(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*|[^\p{L}\p{N}]+/gu), (part, i) => {
    const start = part.index!, end = start + part[0].length;
    const className = `${marked(start, end) ? "v2-marked" : ""} ${pending(start, end) ? "v2-pending-mark" : ""}`;
    return mode !== "read" && /^[\p{L}\p{N}]/u.test(part[0])
      ? <button type="button" key={i} className={`v2-inline-word ${className}`} aria-label={`${mode === "word" ? "选择单词" : selection?.sourceId === sourceId && (selection.kind === "word" || selection.kind === "phrase") ? "选择词组终点" : "选择词组起点"} ${part[0]}`} onClick={() => onPick(sourceId, { start, end })}>{part[0]}</button>
      : <span className={className} key={i}>{part[0]}</span>;
  })}</span>;
}

export function useSourceMarking(article: ArticleContent, data: V2StudySnapshot, onUpdate: (update: V2Update) => void) {
  const [mode, setMode] = useState<MarkMode>("read");
  const [selection, setSelection] = useState<MarkSelection | null>(null);
  const [undo, setUndo] = useState<Undo | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const sources = articleSources(article);
  const locations = new Map(article.sentences.map(sentence => [sentence.id, `第${sentence.number}句`]));
  for (const question of article.questions) {
    locations.set(`question-${question.id}-prompt`, `第${question.number}题题干`);
    for (const option of question.options) locations.set(questionOptionSourceId(question, option.key), `第${question.number}题${option.key}项`);
  }
  const marks = Object.values(data.articleV2Marks ?? {}).filter(m => m.articleId === article.id && m.active);
  const changeMode = (next: MarkMode) => { setMode(next); setSelection(null); setError(""); };
  const pick = (sourceId: string, range: TextRange) => { if (mode !== "read") { setSelection(current => selectMark(current, mode, sourceId, range)); setError(""); } };
  const pickOption = (sourceId: string, text: string) => { setSelection({ sourceId, start: 0, end: text.length, anchor: { start: 0, end: text.length }, kind: "option", ready: true }); setError(""); };
  const apply = (input: SourceMarkInput, active: boolean) => {
    let change: Undo | null = null;
    try {
      onUpdate(current => {
        const previous = current.articleV2Marks?.[markId(input)];
        if (Boolean(previous?.active) === active) return current;
        const at = Math.max(Date.now(), (previous?.updatedAt ?? 0) + 1);
        change = { input, before: Boolean(previous?.active), after: active, at };
        return setSourceMark(current, input, active, at);
      });
      if (change) setUndo(change);
      setSelection(null); setError("");
      setNotice(`${active ? "已标记" : "已取消标记"}：${sources.get(input.sourceId)?.slice(input.start, input.end) ?? ""}`);
    } catch { setError("标记未能保存，请重试；当前选择仍保留。"); }
  };
  const undoLast = () => {
    if (!undo) return;
    try {
      onUpdate(current => undoSourceMark(current, undo.input, { updatedAt: undo.at, active: undo.after }, undo.before, Date.now()));
      setUndo(null); setNotice("已撤销上次标记操作。"); setError("");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "撤销未保存，请重试。"); }
  };
  useEffect(() => {
    if (!selection) return;
    const cancel = (event: KeyboardEvent) => { if (event.key === "Escape") setSelection(null); };
    window.addEventListener("keydown", cancel);
    return () => window.removeEventListener("keydown", cancel);
  }, [selection]);
  const input: SourceMarkInput | null = selection ? { articleId: article.id, sourceId: selection.sourceId, start: selection.start, end: selection.end, kind: selection.kind } : null;
  const existing = input && data.articleV2Marks?.[markId(input)]?.active;
  const editor = <>
    <details className="v2-mark-list"><summary>已标记 {marks.length} 处 · 查看与取消</summary>
      {marks.length === 0 ? <p>还没有标记。先选择标记方式，再点击原文。</p> : marks.map(mark => <div key={mark.id} className="v2-saved-mark"><span><small>{locations.get(mark.sourceId)} · {kindNames[mark.kind]}</small> <span lang="en">{sources.get(mark.sourceId)?.slice(mark.start, mark.end)}</span></span><button type="button" onClick={() => apply(mark, false)}>取消此标记</button></div>)}
    </details>
    {(selection || notice || error) && <aside className="v2-mark-editor" aria-label="标记操作">
      {selection ? <>
        <p role="status"><strong>{selection.ready ? existing ? "已标记的范围" : `待确认${kindNames[selection.kind]}` : "已选起点，请点词组最后一个词"}</strong></p>
        <p className="v2-selection-preview" lang="en">{sources.get(selection.sourceId)?.slice(selection.start, selection.end)}</p>
        <div className="v2-actions">
          {selection.ready && input && <button type="button" className="v2-primary" onClick={() => apply(input, !existing)}>{existing ? "取消此标记" : "确认标记"}</button>}
          {mode === "phrase" && <button type="button" onClick={() => setSelection(null)}>重新选择起点</button>}
          <button type="button" onClick={() => { setSelection(null); setError(""); }}>{existing ? "保留标记" : "取消选择"}</button>
        </div>
      </> : <><p role="status" className="v2-selection-preview">{notice}</p><div className="v2-actions">{undo && <button type="button" onClick={undoLast}>撤销上次操作</button>}<button type="button" onClick={() => { setNotice(""); setError(""); }}>收起提示</button></div></>}
      {error && <p role="alert">{error}</p>}
    </aside>}
  </>;
  return { mode, changeMode, marks, selection, pick, pickOption, editor, hasEditor: Boolean(selection || notice || error) };
}
