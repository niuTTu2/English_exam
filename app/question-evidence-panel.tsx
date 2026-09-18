import type { AnyQuestion } from "./data";
import { scopeLabels } from "./article-teaching";

export function QuestionEvidencePanel({ question, onSentence, openSections, onSectionToggle, showOptionDetails = true }: { question: AnyQuestion; onSentence: (id: string, option?: string) => void; openSections?: string[]; onSectionToggle?: (id: string, open: boolean) => void; showOptionDetails?: boolean }) {
  const reasoning = question.reasoning;
  if (!reasoning) return null;
  const detailProps = (id: string) => ({ open: openSections?.includes(id), onToggle: (event: React.SyntheticEvent<HTMLDetailsElement>) => { if (event.target === event.currentTarget) onSectionToggle?.(id, event.currentTarget.open); } });
  return <section className="question-evidence-panel" aria-label={`第${question.number ?? question.id}题推理过程`}>
    <p className="evidence-type"><b>{reasoning.questionType}</b> · {scopeLabels[reasoning.scope]}</p>
    <h4>1. 题干问什么</h4><p>{reasoning.restatement}</p><p>{reasoning.keyInstruction}</p>
    <details {...detailProps("evidence")}><summary>2. 到哪里找证据（{reasoning.evidence.length}处）</summary>
      {reasoning.evidence.map(e => <div key={e.id} className="question-evidence"><p>{e.role} · {e.strength}</p><blockquote>{e.quote}</blockquote><button type="button" className="guide-source-link" onClick={() => onSentence(e.sentenceId)}>回到第{e.sentenceId.split("-s").at(-1)}句</button></div>)}
    </details>
    <details {...detailProps("paraphrases")}><summary>3. 原文怎样走到选项</summary>{reasoning.paraphrases.map((chain, index) => <div key={index} className="paraphrase-chain"><b>{chain.relation}</b>{chain.evidenceIds.map(id => <blockquote key={id}>{reasoning.evidence.find(e => e.id === id)?.quote}</blockquote>)}<p>→ {chain.meaning}</p><strong>→ {chain.optionText}</strong><p>{chain.limit}</p></div>)}</details>
    {showOptionDetails && <details {...detailProps("options")}><summary>4. 逐项判断与干扰方式</summary>{question.options.map(option => {
      const judgment = reasoning.options[option.key];
      return <div key={option.key} className="option-reasoning"><h5>{option.key} · {judgment.judgment}{judgment.errorType ? ` · ${judgment.errorType}` : ""}</h5><p>{judgment.reasoning}</p><div>{judgment.evidenceIds.map(id => { const e = reasoning.evidence.find(item => item.id === id); return e && <button type="button" key={id} className="guide-source-link" onClick={() => onSentence(e.sentenceId, option.key)}>{e.role}</button>; })}</div></div>;
    })}</details>}
    {showOptionDetails && reasoning.wordingNotes && <details {...detailProps("wording")}><summary>难选项按需拆开读</summary>{reasoning.wordingNotes.map(note => <div key={note.sourceId}><strong>{note.text}</strong><p>{note.explanation}</p></div>)}</details>}
    <p className="question-transfer"><b>下次可以这样做：</b>{reasoning.transfer}</p>
  </section>;
}
