import { useState } from "react";
import { trainingSources, trainingArticleLabel } from "./training-sources";
import { assessLocation, locationHistory, type LocationAttempts } from "./location-model";
import type { ArticleContent } from "./data";
import { errorCategories, grammarConcepts, independentAttempt, taskAttempts, practiceSchedule, practiceAnswerLabel, type PracticeAttempts, type LearningReflection, type QuestionWork } from "./learning-model";
import { scopeLabels } from "./article-teaching";

export function TrainingReview({ articles, attempts, reflections, questionWork, locationAttempts = {}, submitted, onSentence, onQuestion, now }: {
  articles: ArticleContent[]; attempts: PracticeAttempts; reflections: Record<string, LearningReflection>; questionWork: Record<string, QuestionWork>; locationAttempts?: LocationAttempts; submitted: Record<string, boolean>;
  onSentence: (id: string, taskId?: string) => void; onQuestion: (id: number) => void; now: number;
}) {
  const [filter, setFilter] = useState("due"), [concept, setConcept] = useState("all"), [articleFilter, setArticleFilter] = useState("all");
  const tasks = articles.flatMap(article => trainingSources(article).flatMap(sentence => (sentence.practice ?? []).map(task => {
    const history = taskAttempts(attempts, task, sentence.id);
    return { article, sentence, task, history, result: history.at(-1), lastWrong: history.filter(attempt => !attempt.correct).at(-1), schedule: practiceSchedule(history) };
  })));
  const visible = tasks.filter(item => item.result && (articleFilter === "all" || item.article.id === articleFilter) && (concept === "all" || item.task.conceptId === concept)
    && (filter === "all" || (filter === "due" && item.schedule.dueAt <= now) || (filter === "wrong" && !item.result.correct) || (filter === "assisted" && item.history.some(result => result.assisted))));
  const concepts = Object.entries(grammarConcepts).map(([id, label]) => {
    const relevant = tasks.filter(item => item.task.conceptId === id && item.result && (articleFilter === "all" || item.article.id === articleFilter));
    return { id, label, total: relevant.length, independent: relevant.filter(item => independentAttempt(item.result)).length, wrong: relevant.filter(item => !item.result?.correct).length };
  }).filter(item => item.total > 0);
  const marked = articles.filter(article => articleFilter === "all" || article.id === articleFilter).flatMap(article => article.sentences.filter(sentence => reflections[sentence.id]?.errors.length || ["unclear", "wrong"].includes(reflections[sentence.id]?.translationRating ?? "")).map(sentence => ({ article, sentence })));
  const locations = articles.filter(article => articleFilter === "all" || article.id === articleFilter).flatMap(article => submitted[article.id] ? article.questions.filter(question => {
    const history = locationHistory(locationAttempts, question.id);
    if (history.length) return !history.at(-1)!.result.passed;
    const work = questionWork[String(question.id)];
    if (!question.reasoning || !work || (!work.scope && !work.sentenceIds.length)) return false;
    return assessLocation(question.reasoning, work, article.sentences.map(s => s.id))?.passed === false;
  }).map(question => ({ article, question })) : []);
  return <section className="training-review">
    <h3>拆句与定位复盘</h3><p>答错或借助提示答对：1天；连续独立答对按3、7、14、30天递进。可以在到期前主动再练，提前练习不加速晋级。</p>
    <div className="training-review-filters">
      <label>任务状态<select value={filter} onChange={e => setFilter(e.target.value)}><option value="due">今日到期</option><option value="wrong">最近仍然答错</option><option value="assisted">曾经借助提示</option><option value="all">全部已练任务</option></select></label>
      <label>文章<select value={articleFilter} onChange={e => setArticleFilter(e.target.value)}><option value="all">全部文章</option>{articles.filter(article => article.sentences.some(s => s.practice?.length)).map(article => <option key={article.id} value={article.id}>{trainingArticleLabel(article)}</option>)}</select></label>
      <label>语法或篇章概念<select value={concept} onChange={e => setConcept(e.target.value)}><option value="all">全部概念</option>{Object.entries(grammarConcepts).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
    </div>
    <details><summary>概念记录（{concepts.length}项）</summary>{concepts.map(item => <p key={item.id}><b>{item.label}</b> · 最近独立正确{item.independent}/{item.total}项 · 最近仍错{item.wrong}项</p>)}</details>
    <div className="training-review-list">{visible.map(({ article, sentence, task, result, lastWrong, schedule }) => <button key={`${sentence.id}-${task.id}`} type="button" onClick={() => onSentence(sentence.id, task.id)}>
      <strong>{trainingArticleLabel(article)} · {sentence.number ? `第${sentence.number}句` : "文章地图"}</strong><span>{grammarConcepts[task.conceptId]} · {task.prompt}</span>
      {sentence.number > 0 && <span className="review-excerpt">{sentence.text.slice(0, 95)}{sentence.text.length > 95 ? "…" : ""}</span>}
      <small>{result?.correct ? independentAttempt(result) ? "最近独立答对" : "最近借助提示答对" : errorCategories[task.errorType]} · {schedule.dueAt <= now ? "已到期" : `下次：${new Date(schedule.dueAt).toLocaleDateString("zh-CN")}`}</small>
      {lastWrong && <small>上次错误（{new Date(lastWrong.at).toLocaleString("zh-CN")}）：{practiceAnswerLabel(task, lastWrong.answer)}</small>}
    </button>)}</div>
    {!visible.length && <p>{filter === "due" ? "本次没有符合筛选条件的到期任务；可切换到仍然答错或全部已练任务。" : "没有符合筛选条件的训练记录。"}</p>}
    {marked.length > 0 && <details><summary>我标记的卡点与译文（{marked.length}句）</summary>{marked.map(({ article, sentence }) => <button className="reflection-review" key={sentence.id} type="button" onClick={() => onSentence(sentence.id)}>{trainingArticleLabel(article)} · 第{sentence.number}句 · {reflections[sentence.id].errors.map(key => errorCategories[key]).join("、") || "译文需要复看"}</button>)}</details>}
    {locations.length > 0 && <details open><summary>定位需要复盘（{locations.length}题）</summary>{locations.map(({ article, question }) => <button className="reflection-review" key={question.id} type="button" onClick={() => onQuestion(question.id)}>{trainingArticleLabel(article)} · 第{question.number ?? question.id}题 · 重新练习{scopeLabels[question.reasoning!.scope]}</button>)}</details>}
  </section>;
}
