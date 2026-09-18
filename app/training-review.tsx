import { assessLocation, locationHistory, type LocationAttempts } from "./location-model";
import type { ArticleContent } from "./data";
import { errorCategories, grammarConcepts, independentAttempt, latestTaskAttempt, taskAttempts, practiceSchedule, type PracticeAttempts, type LearningReflection, type QuestionWork } from "./learning-model";
import { scopeLabels } from "./article-teaching";

export function TrainingReview({ articles, attempts, reflections, questionWork, locationAttempts = {}, submitted, onSentence, onQuestion, now }: {
  articles: ArticleContent[]; attempts: PracticeAttempts; reflections: Record<string, LearningReflection>; questionWork: Record<string, QuestionWork>; locationAttempts?: LocationAttempts; submitted: Record<string, boolean>;
  onSentence: (id: string) => void; onQuestion: (id: number) => void; now: number;
}) {
  const tasks = articles.flatMap(article => article.sentences.flatMap(sentence => (sentence.practice ?? []).map(task => ({ article, sentence, task, result: latestTaskAttempt(attempts, task, sentence.id) }))));
  const due = tasks.filter(item => item.result && practiceSchedule(taskAttempts(attempts, item.task, item.sentence.id)).dueAt <= now);
  const concepts = Object.entries(grammarConcepts).map(([id, label]) => {
    const relevant = tasks.filter(item => item.task.conceptId === id && item.result);
    return { id, label, total: relevant.length, independent: relevant.filter(item => independentAttempt(item.result)).length, wrong: relevant.filter(item => !item.result?.correct).length };
  }).filter(item => item.total > 0);
  const marked = articles.flatMap(article => article.sentences).filter(sentence => reflections[sentence.id]?.errors.length || ["unclear", "wrong"].includes(reflections[sentence.id]?.translationRating ?? ""));
  const locations = articles.flatMap(article => submitted[article.id] ? article.questions.filter(question => {
    const history = locationHistory(locationAttempts, question.id);
    if (history.length) return !history.at(-1)!.result.passed;
    const work = questionWork[String(question.id)];
    if (!question.reasoning || !work || (!work.scope && !work.sentenceIds.length)) return false;
    return assessLocation(question.reasoning, work, article.sentences.map(s => s.id))?.passed === false;
  }) : []);
  return <section className="training-review">
    <h3>拆句与定位复盘</h3><p>答错或借助提示答对：1天；连续独立答对按3、7、14、30天递进。提前重复练习不加速晋级，旧记录保留；独立表现按本次任务相关提示判断。</p>
    {!concepts.length && !marked.length && !locations.length && <p>还没有训练记录。先到精读完成一句的小任务。</p>}
    <details><summary>语法概念记录（{concepts.length}项）</summary>{concepts.map(item => <p key={item.id}><b>{item.label}</b> · 最近独立正确{item.independent}/{item.total}项 · 最近仍错{item.wrong}项</p>)}</details>
    <div className="training-review-list">{due.map(({ sentence, task, result }) => <button key={`${sentence.id}-${task.id}`} type="button" onClick={() => onSentence(sentence.id)}><strong>第{sentence.number}句 · {grammarConcepts[task.conceptId]}</strong><span>{task.prompt}</span><small>{result?.correct ? "到期巩固" : errorCategories[task.errorType]}</small></button>)}</div>
    {concepts.length > 0 && !due.length && <p>本次没有到期的语法任务。</p>}
    {marked.length > 0 && <details><summary>我标记的卡点与译文（{marked.length}句）</summary>{marked.map(sentence => <button className="reflection-review" key={sentence.id} type="button" onClick={() => onSentence(sentence.id)}>第{sentence.number}句 · {reflections[sentence.id].errors.map(key => errorCategories[key]).join("、") || "译文需要复看"}</button>)}</details>}
    {locations.length > 0 && <details open><summary>定位需要复盘（{locations.length}题）</summary>{locations.map(question => <button className="reflection-review" key={question.id} type="button" onClick={() => onQuestion(question.id)}>第{question.number ?? question.id}题 · 对照{scopeLabels[question.reasoning!.scope]}的参考证据</button>)}</details>}
  </section>;
}
