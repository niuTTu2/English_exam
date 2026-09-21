import { ReadingWords, type OnTerm } from "./quick-reading-card";
import type { ReactNode } from "react";
import { questionOptionSourceId, type ArticleContent, type AnyQuestion } from "../data";
import { OptionalPractice } from "./optional-practice";
import { FollowUpPanel } from "./follow-up-panel";
import { recordV2Check, type V2StudySnapshot, type V2Update } from "./state";

export function QuestionMistakeCard({ article, question: q, data, onUpdate, onSource, renderDetails, onTerm }: {
  article: ArticleContent; question: AnyQuestion; data: V2StudySnapshot; onUpdate: (update: V2Update) => void;
  onTerm: OnTerm;
  onSource: (sourceId: string, returnSource?: string) => void;
  renderDetails: (question: AnyQuestion, onSentence: (id: string) => void) => ReactNode;
}) {
  const choice = data.answers[q.id], wrong = choice !== q.answer;
  const reasoning = q.reasoning!, correction = reasoning.correction!;
  const selected = q.options.find(o => o.key === choice), correct = q.options.find(o => o.key === q.answer)!;
  const mistake = wrong && selected ? correction.byWrongOption[selected.key] : undefined;
  const sourceId = `question-${q.id}-prompt`;
  const recheck = mistake?.recheck ?? correction.correctCheck;
  return <article className="v2-mistake-card" id={`v2-analysis-${sourceId}`}>
    <h3>第 {q.number} 题 · {wrong ? "先看这次错在哪里" : "答对了，再确认依据"}</h3>
    <section aria-label="题干与选项查词"><p lang="en"><ReadingWords text={q.prompt} sourceId={sourceId} onTerm={onTerm} marks={Object.values(data.articleV2Marks ?? {})} /></p>
      {q.options.map(option => <p key={option.key} lang="en"><strong>{option.key}. </strong><ReadingWords text={option.text} sourceId={questionOptionSourceId(q, option.key)} onTerm={onTerm} marks={Object.values(data.articleV2Marks ?? {})} /></p>)}
    </section>
    <p>你选择：<strong>{choice || "未作答"}</strong>{selected ? ` · ${selected.text}` : ""}</p>
    <p>正确答案：<strong>{q.answer}</strong> · {correct.text}</p>
    <section className="v2-difference"><h4>{wrong ? "最关键的差别" : "判断关键"}</h4><p>{mistake?.difference ?? reasoning.options[q.answer].reasoning}</p></section>
    <section><h4>最小充分原文证据</h4>{correction.minimalEvidenceIds.map(id => { const evidence = reasoning.evidence.find(e => e.id === id)!; return <blockquote key={id}><p lang="en">{evidence.quote}</p><p>{evidence.role}</p><button type="button" onClick={() => onSource(evidence.sentenceId, sourceId)}>回到原句</button></blockquote>; })}</section>
    <section><h4>原文怎样换成正确选项</h4>{correction.paraphraseIndexes.map(i => { const p = reasoning.paraphrases[i]; return <div key={i}><p>{p.meaning} → <span lang="en">{p.optionText}</span></p><p>{p.limit}</p></div>; })}</section>
    {wrong && selected && <p><strong>本次干扰方式：</strong>{reasoning.options[selected.key].errorType}</p>}
    <OptionalPractice task={recheck} text={article.sentences.map(s => s.text).join(" ")} sourceId={sourceId} attempts={data.practiceAttempts} onAnswer={(task, answer) => onUpdate(current => recordV2Check(current, article.id, sourceId, task, answer, crypto.randomUUID(), Date.now()))} />
    <FollowUpPanel key={choice} articleId={article.id} sourceId={selected ? questionOptionSourceId(q, selected.key) : sourceId} data={data} onUpdate={onUpdate} option />
    <details><summary>完整解析：证据链、题干与四个选项</summary>{renderDetails(q, id => onSource(id, sourceId))}</details>
  </article>;
}
export function QuestionAnalysisPage(props: Omit<Parameters<typeof QuestionMistakeCard>[0], "question">) {
  const { article, data } = props;
  if (!data.submittedSections?.[article.id]) return <p role="status">先在“做题”页提交答案，再来看这次判断的依据。</p>;
  const questions = [...article.questions].sort((a, b) => Number(data.answers[a.id] === a.answer) - Number(data.answers[b.id] === b.answer));
  return <section aria-label="题目解析"><p>先看自己的错题，再核对答对题目的依据。</p>{questions.map(question => <QuestionMistakeCard {...props} key={question.id} question={question} />)}</section>;
}
