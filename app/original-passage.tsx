import type { ArticleContent } from "./data";

/** 只读取原句与原卷分段；不读取讲解、词条或全文主旨。 */
export function OriginalPassage({ article, marked, onMark }: {
  article: ArticleContent;
  marked: Set<string>;
  onMark: (id: string) => void;
}) {
  const byId = new Map(article.sentences.map(sentence => [sentence.id, sentence]));
  return <section className="original-reading" aria-label="原卷连续段落">
    {article.paragraphs?.map(paragraph => <p key={paragraph.id} className="original-paragraph" data-paragraph={paragraph.id}>
      {paragraph.sentenceIds.map((id, index) => <span key={id} id={`reading-${id}`} className={marked.has(id) ? "reading-marked" : undefined}>
        {index > 0 ? " " : ""}{byId.get(id)?.text}
      </span>)}
    </p>)}
    <details className="reading-mark-picker">
      <summary>标记读不懂的句子（{article.sentences.filter(sentence => marked.has(sentence.id)).length}）</summary>
      <div>{article.sentences.map(sentence => <button key={sentence.id} type="button" aria-pressed={marked.has(sentence.id)} onClick={() => onMark(sentence.id)}>
        <span>第{sentence.number}句 {marked.has(sentence.id) ? "· 已标记" : ""}</span><span>{sentence.text}</span>
      </button>)}</div>
    </details>
  </section>;
}
