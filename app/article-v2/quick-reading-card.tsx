import type { ArticleContent, SentenceAnalysis } from "../data";
import { DeepReading } from "./deep-reading";
import { hasDeepReading } from "./content";
import { FollowUpPanel } from "./follow-up-panel";
import { OptionalPractice } from "./optional-practice";
import { recordV2Check, toggleSourceMark, type V2StudySnapshot, type V2Update } from "./state";
import { Fragment } from "react";
import { readingWords } from "./source-selection";
import type { ArticleV2Mark } from "./model";

export type OnTerm = (expression: string, sourceId: string, isPhrase?: boolean) => void;
export function ReadingWords({ text, sourceId, onTerm, marks = [] }: { text: string; sourceId: string; onTerm: OnTerm; marks?: ArticleV2Mark[] }) {
  const words = readingWords(text);
  return <>{words.map((word, i) => <Fragment key={word.start}>{text.slice(i ? words[i - 1].end : 0, word.start)}<button type="button" className={`v2-inline-word v2-lookup-word ${marks.some(m => m.active && m.sourceId === sourceId && (m.kind === "word" || m.kind === "phrase") && m.start < word.end && m.end > word.start) ? "v2-marked" : ""}`} aria-label={`查看单词 ${word.text}`} onClick={() => onTerm(word.text, sourceId, false)}>{word.text}</button></Fragment>)}{text.slice(words.at(-1)?.end ?? 0)}</>;
}
export function QuickReadingCard({ article, sentence, data, onUpdate, onTerm }: { article: ArticleContent; sentence: SentenceAnalysis; data: V2StudySnapshot; onUpdate: (update: V2Update) => void; onTerm: OnTerm }) {
  const quick = sentence.quickReading!;
  const focus = article.vocabularyFocus?.filter(f => f.sourceId === sentence.id) ?? [];
  const marked = Object.values(data.articleV2Marks ?? {}).some(m => m.articleId === article.id && m.sourceId === sentence.id && m.active && m.kind === "sentence");
  return <article className="v2-reading-card" id={`v2-read-${sentence.id}`}>
    <div className="v2-card-meta"><span>第 {sentence.number} 句{quick.keyReasons.length ? " · 关键句" : ""}</span><button className="v2-small" type="button" aria-pressed={marked} onClick={() => onUpdate(current => toggleSourceMark(current, { articleId: article.id, sourceId: sentence.id, kind: "sentence", start: 0, end: sentence.text.length }, Date.now()))}>{marked ? "取消难句标记" : "标为难句"}</button></div>
    <p lang="en" className="v2-source"><ReadingWords text={sentence.text} sourceId={sentence.id} onTerm={onTerm} marks={Object.values(data.articleV2Marks ?? {}).filter(m => m.articleId === article.id)} /></p><p className="v2-meaning">{sentence.natural}</p>
    <h4>先这样读</h4><p lang="en">{quick.blocks.map((range, i) => <span key={i}>{i ? <b className="v2-divider"> / </b> : null}{sentence.text.slice(range.start, range.end)}</span>)}</p>
    <p><strong>本句关键：</strong>{quick.obstacle}</p><p><strong>段落作用：</strong>{sentence.logic}</p>
    {focus.length > 0 && <div className="v2-actions" aria-label="本句高价值词汇搭配">{focus.map((f, i) => <button type="button" key={i} onClick={() => onTerm(f.expression, f.sourceId, f.kind === "phrase")}>{f.expression}</button>)}</div>}
    {hasDeepReading(sentence) && <details className="v2-deep-disclosure"><summary>我还是没读懂 · 展开完整结构</summary><DeepReading sentence={sentence} article={article} /></details>}
    {!!sentence.practice?.length && <details><summary>自己试一下（可选）</summary>{sentence.practice.map(task => <OptionalPractice key={task.id} task={task} text={sentence.text} sourceId={sentence.id} attempts={data.practiceAttempts} onAnswer={(t, answer) => onUpdate(current => recordV2Check(current, article.id, sentence.id, t, answer, crypto.randomUUID(), Date.now()))} />)}</details>}
    <FollowUpPanel articleId={article.id} sourceId={sentence.id} data={data} onUpdate={onUpdate} />
  </article>;
}

export function QuickReadingPage(props: Omit<Parameters<typeof QuickReadingCard>[0], "sentence">) {
  const { article } = props;
  return <section aria-label="快速读懂">
    <p>点原句里的单词查看本句义，再按需加入待学或复习；句子结构看不懂时再展开。</p>
    {article.paragraphs?.map((paragraph, i) => <section key={paragraph.id}><h3>第 {i + 1} 段</h3>{paragraph.sentenceIds.map(id => <QuickReadingCard {...props} key={id} sentence={article.sentences.find(s => s.id === id)!} />)}</section>)}
    {article.guide && <details><summary>把全文串起来</summary><p>{article.guide.mainIdea}</p><ol>{article.guide.route.map((step, i) => <li key={i}>{step}</li>)}</ol>{article.guide.paragraphs.map(p => <p key={p.paragraphId}><strong>{p.title}：</strong>{p.summary} {p.relation}</p>)}</details>}
  </section>;
}
