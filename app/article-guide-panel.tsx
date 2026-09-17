import type { ArticleContent } from "./data";

export function ArticleGuidePanel({ article, onSentence, onOpen }: { article: ArticleContent; onSentence: (id: string) => void; onOpen?: () => void }) {
  const guide = article.guide;
  if (!guide) return null;
  const link = (id: string) => <button type="button" className="guide-source-link" onClick={() => onSentence(id)}>第{article.sentences.find(s => s.id === id)?.number}句</button>;
  return <details className="article-guide" onToggle={event => { if (event.target === event.currentTarget && event.currentTarget.open) onOpen?.(); }}><summary>文章地图 · 把句子放回全文</summary>
    <p className="article-main-idea">{guide.mainIdea}</p>
    <ol className="article-route">{guide.route.map(step => <li key={step}>{step}</li>)}</ol>
    <ol className="paragraph-map">{guide.paragraphs.map((part, index) => <li key={part.paragraphId}><h3>第{index + 1}段 · {part.title}</h3><p>{part.summary}</p><p><b>段落作用：</b>{part.relation}</p><div>{article.paragraphs?.find(p => p.id === part.paragraphId)?.sentenceIds.map(id => <span key={id}>{link(id)}</span>)}</div></li>)}</ol>
    <details><summary>指代：这个词接回哪里</summary><dl className="reference-chain">{guide.references.map(item => <div key={`${item.sentenceId}-${item.expression}`}><dt>{link(item.sentenceId)} <b>{item.expression}</b> → {item.referent}</dt><dd>{item.explanation}<div>接回：{item.targetSentenceIds.map(id => <span key={id}>{link(id)}</span>)}</div></dd></div>)}</dl></details>
    <details><summary>时间线：事件与统计区间</summary><ol className="syntax-timeline">{guide.timeline.map(event => <li key={event.label}><h4>{event.label}</h4><p>{event.event}</p>{event.evidence.map((e, i) => <p className="passage-evidence" key={i}>{link(e.sentenceId)} {e.quote}<small>{e.role}</small></p>)}</li>)}</ol></details>
    <details><summary>是谁在作判断</summary>{guide.voices.map(voice => <section className="article-voice" key={voice.speaker}><h4>{voice.speaker}</h4><p>{voice.claim}</p><p>{voice.boundary}</p>{voice.evidence.map((e, i) => <p className="passage-evidence" key={i}>{link(e.sentenceId)} {e.quote}</p>)}</section>)}</details>
  </details>;
}
