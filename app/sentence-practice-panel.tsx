import { useState } from "react";
import type { SentenceAnalysis } from "./data";
import { errorCategories, latestTaskAttempt, type PracticeAttempts, type PracticeTask, type LearningReflection, type ErrorCategory } from "./learning-model";

export function SentencePracticePanel({ sentence, attempts, reflection, revealed, onAttempt, onReveal, onRetry, onReflection }: {
  sentence: SentenceAnalysis; attempts: PracticeAttempts; reflection: LearningReflection; revealed: boolean;
  onAttempt: (task: PracticeTask, answer: string) => void; onReveal: () => void; onRetry: () => void;
  onReflection: (value: LearningReflection) => void;
}) {
  const [retry, setRetry] = useState<Set<string>>(new Set());
  const [taskIndex, setTaskIndex] = useState(0);
  const tasks = sentence.practice ?? [];
  const hasAttempt = tasks.some(task => latestTaskAttempt(attempts, task, sentence.id));
  function answer(task: PracticeTask, value: string) {
    onAttempt(task, value);
    setRetry(current => { const next = new Set(current); next.delete(task.id); return next; });
  }
  return <details className="sentence-practice" open={!revealed}>
    <summary>先试一试 · {tasks.filter(task => latestTaskAttempt(attempts, task, sentence.id)).length}/{tasks.length}项已作答</summary>
    <p>先尝试，再查看讲解。不会时也可以记录卡点；答错不影响继续学习。</p>
    <div className="practice-step-picker" aria-label="选择小任务">{tasks.map((task, index) => <button key={task.id} type="button" aria-pressed={taskIndex === index} onClick={() => setTaskIndex(index)}>任务{index + 1}{latestTaskAttempt(attempts, task, sentence.id) ? " · 已答" : ""}</button>)}</div>
    {tasks.map((task, index) => {
      if (index !== taskIndex) return null;
      const result = retry.has(task.id) ? undefined : latestTaskAttempt(attempts, task, sentence.id);
      return <section key={task.id} className="practice-task" aria-label={task.prompt}>
        <h4>{task.prompt}</h4>
        {task.kind === "token" ? <p className="predicate-picker">{sentence.text.split(/([A-Za-z]+(?:['’\-][A-Za-z]+)*)/).map((token, i) => /[A-Za-z]/.test(token) ? <button key={i} type="button" disabled={Boolean(result)} aria-label={`选 ${token} 为谓语`} onClick={() => answer(task, token)}>{token}</button> : <span key={i}>{token}</span>)}</p>
          : <div className="practice-choices">{task.options.map(option => <button type="button" key={option} disabled={Boolean(result)} aria-pressed={result?.answer === option} onClick={() => answer(task, option)}>{option}</button>)}</div>}
        {!result && <button type="button" className="practice-unsure" onClick={() => answer(task, "__unsure__")}>我还没找到，记录为需复习</button>}
        {result && <div className={`practice-feedback ${result.correct ? "is-correct" : "is-wrong"}`} role="status">
          <strong>{result.correct ? result.assisted ? "复习答对（已接触提示）" : "首次作答正确" : "这项需要再练"}</strong>
          <p>参考：{task.answer}</p><p>{task.feedback}</p>
          <button type="button" onClick={() => { setRetry(current => new Set(current).add(task.id)); onRetry(); }}>重新尝试（保留历史）</button>
          {index + 1 < tasks.length && <button type="button" onClick={() => setTaskIndex(index + 1)}>下一小题</button>}
        </div>}
      </section>;
    })}
    <details><summary>翻译自测（可选）</summary><label className="translation-trial" htmlFor={`translation-trial-${sentence.id}`}>试着口头翻译，也可以先记下自己的译文
      <textarea id={`translation-trial-${sentence.id}`} value={reflection.translation} onChange={event => onReflection({ ...reflection, translation: event.target.value })} placeholder="先写自己的理解，再与译文对照" />
    </label></details>
    <details className="learning-obstacles"><summary>我卡在哪里</summary><div>{Object.entries(errorCategories).map(([key, label]) => <label key={key}><input type="checkbox" checked={reflection.errors.includes(key as ErrorCategory)} onChange={event => onReflection({ ...reflection, errors: event.target.checked ? [...reflection.errors, key as ErrorCategory] : reflection.errors.filter(value => value !== key) })} />{label}</label>)}</div></details>
    {revealed && <div className="translation-self-rating"><span>对照讲解后，我的翻译：</span>{([["correct", "基本正确"], ["unclear", "模糊"], ["wrong", "需重译"]] as const).map(([rating, label]) => <button key={rating} type="button" aria-pressed={reflection.translationRating === rating} onClick={() => onReflection({ ...reflection, translationRating: rating })}>{label}</button>)}<small>自评单独保存，不自动计入语法练习通过数。</small></div>}
    {!revealed && <button type="button" className="show-teaching" disabled={!hasAttempt} onClick={onReveal}>{hasAttempt ? "查看主干与讲解" : "先完成至少一项尝试"}</button>}
  </details>;
}
