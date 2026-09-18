import { useState } from "react";
import { SentencePracticePanel } from "./sentence-practice-panel";
import { emptyReflection, latestTaskAttempt, type PracticeAttempts, type PracticeTask, type PracticeSession } from "./learning-model";
import { articleMapSource } from "./training-sources";
import type { ArticleContent } from "./data";

export function ArticleGuidePanel({ article, onSentence, onOpen, attempts = {}, session, onBegin, onAttempt, onPreviousAnswer, initialTaskId }: { article: ArticleContent; onSentence: (id: string, at: number) => void; onOpen?: (at: number) => void;
  attempts?: PracticeAttempts; session?: PracticeSession; onBegin?: (at: number) => void; onAttempt?: (task: PracticeTask, answer: string, at: number) => void; onPreviousAnswer?: (task: PracticeTask, at: number) => void; initialTaskId?: string;
}) {
  const [revealedSession, setRevealedSession] = useState<string | null>(null);
  const guide = article.guide;
  const source = articleMapSource(article);
  const ready = !source.practice?.length || (session && revealedSession === session.id && source.practice.every(task => latestTaskAttempt(attempts, task, source.id)?.sessionId === session.id));
  if (!guide) return null;
  const link = (id: string) => <button type="button" className="guide-source-link" onClick={() => onSentence(id, Date.now())}>第{article.sentences.find(s => s.id === id)?.number}句</button>;
  return <details id={`source-${source.id}`} className="article-guide" onToggle={event => { if (event.target === event.currentTarget && event.currentTarget.open) onBegin?.(Date.now()); }}><summary>文章地图 · 把句子放回全文</summary>
    {!!source.practice?.length && <SentencePracticePanel sentence={source} attempts={attempts} session={session} reflection={emptyReflection()} allowReflection={false} minAttempts={source.practice.length} revealed={Boolean(ready)} revealLabel="查看完整文章地图" initialTaskId={initialTaskId}
      onBegin={() => onBegin?.(Date.now())} onAttempt={(task, answer) => onAttempt?.(task, answer, Date.now())} onPreviousAnswer={task => onPreviousAnswer?.(task, Date.now())}
      onReflection={() => {}} onRetry={() => setRevealedSession(null)} onReveal={() => { setRevealedSession(session?.id ?? null); onOpen?.(Date.now()); }} />}
    {ready && <><p className="article-main-idea">{guide.mainIdea}</p>
    <ol className="article-route">{guide.route.map(step => <li key={step}>{step}</li>)}</ol>
    <ol className="paragraph-map">{guide.paragraphs.map((part, index) => <li key={part.paragraphId}><h3>第{index + 1}段 · {part.title}</h3><p>{part.summary}</p><p><b>段落作用：</b>{part.relation}</p><div>{article.paragraphs?.find(p => p.id === part.paragraphId)?.sentenceIds.map(id => <span key={id}>{link(id)}</span>)}</div></li>)}</ol>
    <details><summary>指代：这个词接回哪里</summary><dl className="reference-chain">{guide.references.map(item => <div key={`${item.sentenceId}-${item.expression}`}><dt>{link(item.sentenceId)} <b>{item.expression}</b> → {item.referent}</dt><dd>{item.explanation}<div>接回：{item.targetSentenceIds.map(id => <span key={id}>{link(id)}</span>)}</div></dd></div>)}</dl></details>
    <details><summary>时间线：事件与统计区间</summary><ol className="syntax-timeline">{guide.timeline.map(event => <li key={event.label}><h4>{event.label}</h4><p>{event.event}</p>{event.evidence.map((e, i) => <p className="passage-evidence" key={i}>{link(e.sentenceId)} {e.quote}<small>{e.role}</small></p>)}</li>)}</ol></details>
    <details><summary>是谁在作判断</summary>{guide.voices.map(voice => <section className="article-voice" key={voice.speaker}><h4>{voice.speaker}</h4><p>{voice.claim}</p><p>{voice.boundary}</p>{voice.evidence.map((e, i) => <p className="passage-evidence" key={i}>{link(e.sentenceId)} {e.quote}</p>)}</section>)}</details>
    </>}
  </details>;
}
