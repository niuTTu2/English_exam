import type { AnyQuestion, SentenceAnalysis } from "./data";
import { scopeLabels } from "./article-teaching";
import type { QuestionWork } from "./learning-model";

export function QuestionLocationPractice({ question, sentences, work, submitted, onChange }: {
  question: AnyQuestion; sentences: SentenceAnalysis[]; work: QuestionWork; submitted: boolean; onChange: (work: QuestionWork) => void;
}) {
  const guide = question.reasoning;
  if (!guide) return null;
  const attempted = Boolean(work.scope || work.sentenceIds.length);
  const groupsCovered = (guide.locatingGroups ?? []).every(group => group.some(id => work.sentenceIds.includes(id)));
  return <details className="question-location-practice"><summary>记录我的定位（可选）</summary>
    <label>我认为应当看多大范围<select disabled={submitted} value={work.scope} onChange={event => onChange({ ...work, scope: event.target.value })}><option value="">先选范围</option>{Object.entries(scopeLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
    <p>勾选你实际用到的句子；题号只用于定位，不是初读原文的额外编号。</p>
    <div className="location-choices">{sentences.map(sentence => <label key={sentence.id}><input type="checkbox" disabled={submitted} checked={work.sentenceIds.includes(sentence.id)} onChange={event => onChange({ ...work, sentenceIds: event.target.checked ? [...work.sentenceIds, sentence.id] : work.sentenceIds.filter(id => id !== sentence.id) })} />第{sentence.number}句<span>{sentence.text.slice(0, 48)}…</span></label>)}</div>
    {submitted && <p className="location-feedback">{!attempted ? "本题未记录定位，不计作错误。" : work.scope === guide.scope && groupsCovered ? "已覆盖参考定位的关键位置。请继续核对你使用的理由；勾对句号不等于推理一定正确。" : `可回到证据链核对：参考范围是${scopeLabels[guide.scope]}，并查看是否漏掉关键位置。该项已列入定位复盘，不影响原题得分。`}</p>}
  </details>;
}
