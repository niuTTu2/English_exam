import type { ArticleContent } from "./data";
import { errorCategories, grammarConcepts, latestTaskAttempt, taskAttempts, practiceDueAt, type PracticeAttempts, type LearningReflection, type QuestionWork } from "./learning-model";
import { scopeLabels } from "./article-teaching";

export function TrainingReview({ articles, attempts, reflections, questionWork, submitted, onSentence, onQuestion, now }: {
  articles: ArticleContent[]; attempts: PracticeAttempts; reflections: Record<string, LearningReflection>; questionWork: Record<string, QuestionWork>; submitted: Record<string, boolean>;
  onSentence: (id: string) => void; onQuestion: (id: number) => void; now: number;
}) {
  const tasks = articles.flatMap(article => article.sentences.flatMap(sentence => (sentence.practice ?? []).map(task => ({ article, sentence, task, result: latestTaskAttempt(attempts, task, sentence.id) }))));
  const due = tasks.filter(item => item.result && (!item.result.correct || practiceDueAt(item.result) <= now));
  const concepts = Object.entries(grammarConcepts).map(([id, label]) => {
    const relevant = tasks.filter(item => item.task.conceptId === id && item.result);
    return { id, label, total: relevant.length, independent: relevant.filter(item => { const first = taskAttempts(attempts, item.task, item.sentence.id)[0]; return first?.correct && !first.assisted; }).length, wrong: relevant.filter(item => !item.result?.correct).length };
  }).filter(item => item.total > 0);
  const marked = articles.flatMap(article => article.sentences).filter(sentence => reflections[sentence.id]?.errors.length || ["unclear", "wrong"].includes(reflections[sentence.id]?.translationRating ?? ""));
  const locations = articles.flatMap(article => submitted[article.id] ? article.questions.filter(question => {
    const work = questionWork[String(question.id)];
    if (!question.reasoning || !work || (!work.scope && !work.sentenceIds.length)) return false;
    return (work.scope && work.scope !== question.reasoning.scope) || !(question.reasoning.locatingGroups ?? []).every(group => group.some(id => work.sentenceIds.includes(id)));
  }) : []);
  return <section className="training-review">
    <h3>拆句与定位复盘</h3><p>按实际作答生成任务；答错立即复习，提示后答对次日复习，首次作答正确三日后复习。自报卡点与翻译自评单独保留。</p>
    {!concepts.length && !marked.length && !locations.length && <p>还没有训练记录。先到精读完成一句的小任务。</p>}
    <details><summary>语法概念记录（{concepts.length}项）</summary>{concepts.map(item => <p key={item.id}><b>{item.label}</b> · 首次正确{item.independent}/{item.total}项 · 最近仍错{item.wrong}项</p>)}</details>
    <div className="training-review-list">{due.map(({ sentence, task, result }) => <button key={`${sentence.id}-${task.id}`} type="button" onClick={() => onSentence(sentence.id)}><strong>第{sentence.number}句 · {grammarConcepts[task.conceptId]}</strong><span>{task.prompt}</span><small>{result?.correct ? "到期巩固" : errorCategories[task.errorType]}</small></button>)}</div>
    {concepts.length > 0 && !due.length && <p>本次没有到期的语法任务。</p>}
    {marked.length > 0 && <details><summary>我标记的卡点与译文（{marked.length}句）</summary>{marked.map(sentence => <button className="reflection-review" key={sentence.id} type="button" onClick={() => onSentence(sentence.id)}>第{sentence.number}句 · {reflections[sentence.id].errors.map(key => errorCategories[key]).join("、") || "译文需要复看"}</button>)}</details>}
    {locations.length > 0 && <details open><summary>定位需要复盘（{locations.length}题）</summary>{locations.map(question => <button className="reflection-review" key={question.id} type="button" onClick={() => onQuestion(question.id)}>第{question.number ?? question.id}题 · 对照{scopeLabels[question.reasoning!.scope]}的参考证据</button>)}</details>}
  </section>;
}
