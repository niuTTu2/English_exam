import { useState } from "react";
import { PracticeTaskInput } from "../practice-task-input";
import { latestTaskAttempt, taskAttempts, practiceAnswerLabel, type PracticeAttempts, type PracticeTask } from "../learning-model";

export function OptionalPractice({ task, text, sourceId, attempts, onAnswer }: {
  task: PracticeTask; text: string; sourceId: string; attempts: PracticeAttempts; onAnswer: (task: PracticeTask, answer: string) => void;
}) {
  const [retry, setRetry] = useState(false);
  const previous = latestTaskAttempt(attempts, task, sourceId);
  const result = retry ? undefined : previous;
  return <section className="v2-check" aria-label="短再判断">
    <h4>{task.prompt}</h4>
    {!result && <PracticeTaskInput key={`${task.id}-${task.revision}-${taskAttempts(attempts, task, sourceId).length}`} task={task} text={text} attemptNumber={taskAttempts(attempts, task, sourceId).length} onAnswer={answer => { onAnswer(task, answer); setRetry(false); }} />}
    {result && <div role="status"><strong>{result.correct ? "这次判断正确" : "再对照一下原文"}</strong><p>你的判断：{practiceAnswerLabel(task, result.answer)}</p><p>{task.feedback}</p><small>讲解后的巩固，保留记录，不计作独立掌握。</small><button type="button" onClick={() => setRetry(true)}>再判断一次</button></div>}
  </section>;
}
