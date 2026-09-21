import { GlobalMarkedText } from "./vocabulary-learning/global-marks";
import type { ArticleContent } from "./data";

/** 只读取原句与原卷分段；不读取讲解、词条或全文主旨。 */
export function OriginalPassage({ article, marked, onMark, selection }: {
  article: ArticleContent;
  marked: Set<string>;
  onMark: (id: string) => void;
  selection?: { questionNumber: number; ids: string[]; onToggle: (id: string) => void; onDone: () => void };
}) {
  const byId = new Map(article.sentences.map(sentence => [sentence.id, sentence]));
  return <section id="original-passage" className="original-reading" aria-label="原卷连续段落">
    {selection && <div className="location-selection-bar" role="status"><strong>正在定位第{selection.questionNumber}题 · 已选{selection.ids.length}句</strong><p>点整句选择，再点取消。选择完成后返回题目。</p><button type="button" className="practice-action" onClick={selection.onDone}>完成选择，返回原题</button></div>}
    {article.paragraphs?.map(paragraph => <p key={paragraph.id} className="original-paragraph" data-paragraph={paragraph.id}>
      {paragraph.sentenceIds.map((id, index) => <span key={id} id={`reading-${id}`} className={marked.has(id) ? "reading-marked" : undefined}>
        {index > 0 ? " " : ""}{selection ? <button type="button" className="location-sentence" aria-pressed={selection.ids.includes(id)} onClick={() => selection.onToggle(id)}><small>第{byId.get(id)?.number}句</small>{byId.get(id)?.text}</button> : <GlobalMarkedText text={byId.get(id)?.text ?? ""} sourceId={id} />}
      </span>)}
    </p>)}
    {!selection && <details className="reading-mark-picker">
      <summary>标记读不懂的句子（{article.sentences.filter(sentence => marked.has(sentence.id)).length}）</summary>
      <div>{article.sentences.map(sentence => <button key={sentence.id} type="button" aria-pressed={marked.has(sentence.id)} onClick={() => onMark(sentence.id)}>
        <span>第{sentence.number}句 {marked.has(sentence.id) ? "· 已标记" : ""}</span><span>{sentence.text}</span>
      </button>)}</div>
    </details>}
  </section>;
}
