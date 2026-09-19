"use client";

import type { VocabularyMemory } from "./model";
import type { sessionSummary } from "./session";

export function DifficultMemories({ ids, memories }: { ids: string[]; memories: Record<string, VocabularyMemory> }) {
  if (!ids.length) return null;
  return <details className="vl-difficult"><summary>本轮困难词 · {ids.length} 项</summary><ul>{ids.map(id => memories[id] && <li key={id}><b lang="en">{memories[id].headword}</b> · {memories[id].meaning}<small>{memories[id].lastRating === "forgot" || memories[id].lastRating === "fuzzy" ? "仍需短间隔再认，不计为掌握" : "本轮曾遇到困难，继续按计划复习"}</small></li>)}</ul></details>;
}

export function LearningSummary({ summary, memories, onHome, onSpelling, spellingAvailable }: { summary: ReturnType<typeof sessionSummary>; memories: Record<string, VocabularyMemory>; onHome: () => void; onSpelling: () => void; spellingAvailable: boolean }) {
  return <section className="vl-summary" aria-label="本轮学习总结"><span className="vl-eyebrow">一组结束</span><h2>这次记住了哪些？</h2><p>本轮自评会用于安排复习；同一项的再次出现不重复计为新学。</p>
    <dl className="vl-summary-statistics">{[["新学单词", summary.newWords], ["新学词组", summary.newPhrases], ["复习项目", summary.reviews], ["忘了", summary.forgot], ["模糊", summary.fuzzy], ["认识", summary.known], ["太简单", summary.easy]].map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{count}</dd></div>)}</dl>
    <p>拼写：{summary.spellingAttempts ? `${summary.spellingCorrect} / ${summary.spellingAttempts} 项拼写正确` : "本轮未进行"}</p>
    {summary.nextDueAt && <p>下次待复习：{new Date(summary.nextDueAt).toLocaleString("zh-CN", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>}
    <DifficultMemories ids={summary.difficultIds} memories={memories} />
    <div className="vl-summary-actions"><button type="button" className="vl-primary" onClick={onHome}>返回词汇学习</button>{spellingAvailable && <button type="button" className="vl-secondary" onClick={onSpelling}>再做一组可选拼写巩固</button>}</div>
  </section>;
}
