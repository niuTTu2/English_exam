import type { AnyQuestion, SentenceAnalysis } from "./data";
import { scopeLabels } from "./article-teaching";
import type { QuestionWork } from "./learning-model";
import { assessLocation, type LocationAttempt } from "./location-model";

export function QuestionLocationPractice({ question, sentences, work, submitted, editing = false, history = [], onChange, onSelect, onRetry, onSave }: {
  question: AnyQuestion; sentences: SentenceAnalysis[]; work: QuestionWork; submitted: boolean; editing?: boolean; history?: LocationAttempt[];
  onChange: (work: QuestionWork) => void; onSelect?: () => void; onRetry?: () => void; onSave?: () => void;
}) {
  const guide = question.reasoning;
  if (!guide?.locationPolicy) return null;
  const attempted = Boolean(work.scope || work.sentenceIds.length);
  const canEdit = !submitted || editing;
  const latest = history.at(-1);
  const result = latest?.result ?? (attempted ? assessLocation(guide, work, sentences.map(s => s.id)) : undefined);
  const feedback = (r: NonNullable<typeof result>) => <div className="location-feedback">
    <p>{r.passed ? "关键覆盖、选句精确度和范围判断均符合参考路径。" : r.tooBroad ? "定位范围过宽，请保留真正支持判断的句子；全选全文不能通过。" : "请重新核对范围和选句；这次尚未匹配参考路径。"}</p>
    <p>关键覆盖 {Math.round(r.coverage * 100)}% · 选句精确度 {Math.round(r.precision * 100)}% · 范围{r.scopeMatch ? "相符" : "需调整"}</p>
    <small>参考：{r.pathLabel}。自动检查只核对参考证据，不能证明推理正确；其他合理路径仍需对照原文解释。本项不影响原题得分。</small>
  </div>;
  return <section className="question-location-practice" aria-label={`第${question.number ?? question.id}题定位训练`}>
    <h4>{editing ? "重新定位 · 新的一次练习" : "记录我的定位（可选）"}</h4>
    {canEdit ? <>
      <label>我认为应当看多大范围<select value={work.scope} onChange={event => onChange({ ...work, scope: event.target.value })}><option value="">先选范围</option>{Object.entries(scopeLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <button type="button" className="practice-action" onClick={onSelect}>在连续原文中选择证据（已选{work.sentenceIds.length}句）</button>
      {!!work.sentenceIds.length && <p>已选：{sentences.filter(s => work.sentenceIds.includes(s.id)).map(s => `第${s.number}句`).join("、")}</p>}
      {editing && <><p>本轮先收起参考解析；提交后与历史比较。已经看过解析的复盘不记作首次独立定位。</p><button type="button" className="practice-action" disabled={!work.scope || !work.sentenceIds.length} onClick={onSave}>提交本次定位</button></>}
    </> : <>
      {result ? feedback(result) : <p>本题未记录定位，不计作错误。</p>}
      <button type="button" className="practice-action" onClick={onRetry}>重新定位一次</button>
    </>}
    {submitted && history.length > 0 && <details><summary>定位历史（{history.length}次，保留原记录）</summary>{history.map((attempt, index) => <div key={attempt.id}><p>第{index + 1}次 · {attempt.stage === "legacy" ? "保留旧定位（原提交时间未知，以下为保存时间）" : attempt.stage === "initial" ? "初次提交" : "看过解析后的复盘"} · {new Date(attempt.at).toLocaleString("zh-CN")}</p><p>{scopeLabels[attempt.work.scope as keyof typeof scopeLabels] ?? "未选范围"} · {sentences.filter(s => attempt.work.sentenceIds.includes(s.id)).map(s => `第${s.number}句`).join("、")}</p>{!editing && feedback(attempt.result)}</div>)}</details>}
  </section>;
}
