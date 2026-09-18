import { useState } from "react";
import { practiceOptions, rangeTokens, selectedRange, type PracticeTask } from "./learning-model";

export function PracticeTaskInput({ task, text, attemptNumber, onAnswer }: { task: PracticeTask; text: string; attemptNumber: number; onAnswer: (answer: string) => void }) {
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [ordered, setOrdered] = useState<string[]>([]);
  const [links, setLinks] = useState<Record<number, string>>({});
  const options = practiceOptions(task.options, `${text}/${task.id}`, attemptNumber);
  if (task.kind === "token") return <p className="predicate-picker">{text.split(/([A-Za-z]+(?:['’\-][A-Za-z]+)*)/).map((token, i) => /[A-Za-z]/.test(token) ? <button key={i} type="button" aria-label={`选 ${token} 为谓语`} onClick={() => onAnswer(token)}>{token}</button> : <span key={i}>{token}</span>)}</p>;
  if (task.kind === "choice") return <div className="practice-choices">{options.map(option => <button type="button" key={option} onClick={() => onAnswer(option)}>{option}</button>)}</div>;
  if (task.kind === "range") {
    const source = task.rangeText ?? text, tokens = rangeTokens(source);
    const selection = start !== null && end !== null ? selectedRange(source, start, end) : "";
    return <div className="range-task"><p>先点起点，再点终点，选择连续范围。范围选定后再点可重新开始。</p><div className="range-tokens">{tokens.map((token, i) => <span key={i}><button type="button" aria-pressed={start !== null && i >= Math.min(start, end ?? start) && i <= Math.max(start, end ?? start)} onClick={() => { if (start === null || end !== null) { setStart(i); setEnd(null); } else setEnd(i); }}>{token.text}</button>{source.slice(token.end, tokens[i + 1]?.start ?? source.length)}</span>)}</div><p aria-live="polite">{selection || (start !== null ? "再点一个词作为终点" : "尚未选择范围")}</p><button type="button" className="practice-action" disabled={!selection} onClick={() => onAnswer(selection)}>提交所选范围</button></div>;
  }
  if (task.kind === "link") return <div className="link-task"><p>为左侧每一项连接它真正说明的对象。</p>{task.links?.map((link, i) => <label key={link.source}><strong>{link.source}</strong><span aria-hidden="true">→</span><select aria-label={`${link.source} 连接到`} value={links[i] ?? ""} onChange={event => setLinks(current => ({ ...current, [i]: event.target.value }))}><option value="">选择对象</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>)}<button type="button" className="practice-action" disabled={!task.links?.every((_, i) => links[i])} onClick={() => onAnswer(JSON.stringify(task.links!.map((_, i) => links[i])))}>提交连接</button></div>;
  return <div className="order-task"><p>依次点选词块组成答案；点已选词块可以移除并重新排列。</p><div className="ordered-blocks" aria-live="polite">{ordered.length ? ordered.map((block, index) => <button type="button" key={block} onClick={() => setOrdered(current => current.filter(value => value !== block))}>{index + 1}. {block} ×</button>) : <span>从下方选取第一块</span>}</div><div className="block-bank">{options.map(block => <button type="button" key={block} disabled={ordered.includes(block)} onClick={() => setOrdered(current => [...current, block])}>{block}</button>)}</div><button type="button" className="practice-action" disabled={!ordered.length} onClick={() => onAnswer(JSON.stringify(ordered))}>提交组合</button><button type="button" className="practice-action" onClick={() => setOrdered([])}>重新排列</button></div>;
}
