import { useState } from "react";
import { PracticeTaskInput } from "./practice-task-input";
import type { SentenceAnalysis } from "./data";
import { errorCategories, latestTaskAttempt, taskAttempts, practiceAnswerLabel, type PracticeAttempts, type PracticeTask, type PracticeSession, type LearningReflection, type ErrorCategory } from "./learning-model";

export function SentencePracticePanel({ sentence, attempts, session, reflection, revealed, onAttempt, onReveal, onRetry, onReflection, onBegin = () => {}, onPreviousAnswer = () => {}, minAttempts = 1, allowReflection = true, revealLabel = "查看主干与讲解", initialTaskId }: {
  sentence: Pick<SentenceAnalysis, "id" | "text" | "practice">; attempts: PracticeAttempts; reflection: LearningReflection; revealed: boolean;
  minAttempts?: number; allowReflection?: boolean; revealLabel?: string; initialTaskId?: string;
  session?: PracticeSession; onBegin?: () => void; onPreviousAnswer?: (task: PracticeTask) => void;
  onAttempt: (task: PracticeTask, answer: string) => void; onReveal: () => void; onRetry: () => void;
  onReflection: (value: LearningReflection) => void;
}) {
  const [retry, setRetry] = useState<Set<string>>(new Set());
  const [taskIndex, setTaskIndex] = useState(() => Math.max(0, sentence.practice?.findIndex(task => task.id === initialTaskId) ?? 0));
  const [historyTask, setHistoryTask] = useState<string | null>(null);
  const tasks = sentence.practice ?? [];
  const hasAttempt = tasks.filter(task => session && latestTaskAttempt(attempts, task, sentence.id)?.sessionId === session.id).length >= minAttempts;
  function answer(task: PracticeTask, value: string) {
    onAttempt(task, value);
    setRetry(current => { const next = new Set(current); next.delete(task.id); return next; });
  }
  return <details className="sentence-practice" open={!revealed}>
    <summary>先试一试 · {tasks.filter(task => latestTaskAttempt(attempts, task, sentence.id)).length}/{tasks.length}项已作答</summary>
    <p>先尝试，再查看讲解。旧答案默认隐藏；本次只记录与这项任务有关的提示。</p>
    <div className="practice-step-picker" aria-label="选择小任务">{tasks.map((task, index) => <button key={task.id} type="button" aria-pressed={taskIndex === index} onClick={() => { onBegin(); setTaskIndex(index); setHistoryTask(null); }}>任务{index + 1}{latestTaskAttempt(attempts, task, sentence.id) ? " · 有记录" : ""}</button>)}</div>
    {tasks.map((task, index) => {
      if (index !== taskIndex) return null;
      const previous = latestTaskAttempt(attempts, task, sentence.id);
      const result = retry.has(task.id) || !session || previous?.sessionId !== session.id ? undefined : previous;
      return <section key={task.id} className="practice-task" aria-label={task.prompt}>
        <h4>{task.prompt}</h4>
        {!result && <PracticeTaskInput key={`${task.id}-${task.revision}-${session?.id ?? "new"}-${taskAttempts(attempts, task, sentence.id).length}`} task={task} text={sentence.text} attemptNumber={taskAttempts(attempts, task, sentence.id).length} onAnswer={value => answer(task, value)} />}
        {!result && <button type="button" className="practice-unsure" onClick={() => answer(task, "__unsure__")}>我还没找到，记录为需复习</button>}
        {result && <div className={`practice-feedback ${result.correct ? "is-correct" : "is-wrong"}`} role="status">
          <strong>{result.correct ? result.assisted ? "借助相关提示答对" : "本次独立答对" : "这项需要再练"}</strong>
          {!!result.hintTypes?.length && <small>本次相关提示：{result.hintTypes.map(type => ({ word: "题眼查词", syntax: "句法讲解", translation: "译文", "article-map": "篇章地图", "previous-answer": "相关题目反馈" })[type]).join("、")}</small>}
          <p>你的作答：{practiceAnswerLabel(task, result.answer)}</p><p>参考：{practiceAnswerLabel(task, task.answer)}</p><p>{task.feedback}</p>
          <button type="button" onClick={() => { setRetry(current => new Set(current).add(task.id)); setHistoryTask(null); onBegin(); onRetry(); }}>重新尝试（保留历史）</button>
          {index + 1 < tasks.length && <button type="button" onClick={() => setTaskIndex(index + 1)}>下一小题</button>}
        </div>}
        {!result && previous && <details onToggle={event => { if (event.currentTarget.open) { setHistoryTask(task.id); onPreviousAnswer(task); } }}><summary>查看上次作答（会用到答案提示）</summary>{historyTask === task.id && <p>上次：{practiceAnswerLabel(task, previous.answer)}；参考：{practiceAnswerLabel(task, task.answer)}。{task.feedback}</p>}</details>}
      </section>;
    })}
    {allowReflection && <><details><summary>翻译自测（可选）</summary><label className="translation-trial" htmlFor={`translation-trial-${sentence.id}`}>试着口头翻译，也可以先记下自己的译文
      <textarea id={`translation-trial-${sentence.id}`} value={reflection.translation} onChange={event => onReflection({ ...reflection, translation: event.target.value })} placeholder="先写自己的理解，再与译文对照" />
    </label></details>
    <details className="learning-obstacles"><summary>我卡在哪里</summary><div>{Object.entries(errorCategories).map(([key, label]) => <label key={key}><input type="checkbox" checked={reflection.errors.includes(key as ErrorCategory)} onChange={event => onReflection({ ...reflection, errors: event.target.checked ? [...reflection.errors, key as ErrorCategory] : reflection.errors.filter(value => value !== key) })} />{label}</label>)}</div></details>
    {revealed && <div className="translation-self-rating"><span>对照讲解后，我的翻译：</span>{([["correct", "基本正确"], ["unclear", "模糊"], ["wrong", "需重译"]] as const).map(([rating, label]) => <button key={rating} type="button" aria-pressed={reflection.translationRating === rating} onClick={() => onReflection({ ...reflection, translationRating: rating })}>{label}</button>)}<small>自评单独保存，不自动计入语法练习通过数。</small></div>}
    </>}
    {!revealed && <button type="button" className="show-teaching" disabled={!hasAttempt} onClick={onReveal}>{hasAttempt ? revealLabel : minAttempts === 1 ? "先完成至少一项尝试" : `先尝试全部${minAttempts}项（答错也可继续）`}</button>}
  </details>;
}
