"use client";

import type { VocabularySettings } from "./model";

export type LearningScope = { kind: "article" | "year" | "all" | "marked" | "list"; list?: string };
export type HomeMetrics = { dueWords: number; duePhrases: number; overdue: number; completed: number; newWords: number; newPhrases: number; remainingNew: number; estimatedMinutes: number };
export type VocabularyHomeProps = {
  metrics: HomeMetrics; settings: VocabularySettings; scope: LearningScope;
  articleLabel: string; year: number; lists: string[];
  resumable?: { completed: number; total: number };
  busy?: boolean; message?: string;
  onScope: (scope: LearningScope) => void;
  onSettings: (settings: VocabularySettings) => void;
  onStart: (mode: "new" | "review", limit?: "ten-cards" | "ten-minutes") => void;
  onResume: () => void;
};

export function VocabularyHome({ metrics, settings, scope, articleLabel, year, lists, resumable, busy, message, onScope, onSettings, onStart, onResume }: VocabularyHomeProps) {
  function changeNumber(key: "dailyWords" | "dailyPhrases" | "sessionSize", value: string) {
    const number = Math.max(key === "sessionSize" ? 1 : 0, Math.min(300, Math.floor(Number(value) || 0)));
    onSettings({ ...settings, [key]: number, updatedAt: Date.now() });
  }
  const due = metrics.dueWords + metrics.duePhrases;
  return <section className="vl-home" aria-label="词汇学习首页">
    <header className="vl-home-heading"><span className="vl-eyebrow">在真题里记住它</span><h2>词汇学习</h2><p>先回忆本句义，再看解释。每次只学一张卡。</p></header>
    <div className="vl-primary-actions">
      <button type="button" className={`vl-action ${resumable ? "vl-action-accent" : ""}`} disabled={!resumable || busy} onClick={onResume}><strong>继续上次学习</strong><span>{resumable ? `已完成 ${resumable.completed} 张 · 从第 ${resumable.completed + 1} 张继续` : "开始一组后，可随时暂停续学"}</span></button>
      <button type="button" className="vl-action vl-action-accent" disabled={!due || busy} onClick={() => onStart("review")}><strong>今日复习 <b>{due}</b></strong><span>{due ? `单词 ${metrics.dueWords} · 词组 ${metrics.duePhrases}，每组分批完成` : "今天还没有到期项目"}</span></button>
      <button type="button" className="vl-action" disabled={busy} onClick={() => onStart("new")}><strong>学习新词</strong><span>{settings.reviewFirst && due ? "先处理到期项，再开始新词" : `今日目标 ${settings.dailyWords} 个单词 + ${settings.dailyPhrases} 个词组`}</span></button>
    </div>
    {message && <p className="vl-message" role="status">{message}</p>}
    <dl className="vl-home-metrics"><div><dt>到期单词</dt><dd>{metrics.dueWords}</dd></div><div><dt>到期词组</dt><dd>{metrics.duePhrases}</dd></div><div><dt>今日新词目标</dt><dd>{settings.dailyWords + settings.dailyPhrases}<small>{settings.dailyWords} 词 / {settings.dailyPhrases} 词组</small></dd></div><div><dt>今日已完成</dt><dd>{metrics.completed}<small>按独立记忆项计</small></dd></div><div><dt>当前逾期积压</dt><dd>{metrics.overdue}</dd></div><div><dt>本组预计</dt><dd>{metrics.estimatedMinutes}<small>分钟，按每卡约半分钟</small></dd></div></dl>
    <div className="vl-scope-row"><label htmlFor="vl-learning-scope">学习范围</label><select id="vl-learning-scope" value={scope.kind} onChange={event => onScope({ kind: event.target.value as LearningScope["kind"], list: scope.list ?? lists[0] })}><option value="article">当前文章 · {articleLabel}</option><option value="year">当前年份 · {year}</option><option value="all">全部已导入真题</option><option value="marked">我标记的词</option><option value="list">自定义清单</option></select>{scope.kind === "list" && <label className="vl-list-select">选择清单<select aria-label="选择词汇清单" value={scope.list ?? lists[0] ?? ""} onChange={event => onScope({ ...scope, list: event.target.value })}>{lists.length ? lists.map(list => <option key={list} value={list}>{list}</option>) : <option value="">尚未创建清单</option>}</select></label>}</div>
    <div className="vl-short-session"><span>时间不多也可以继续</span><button type="button" className="vl-text-button" disabled={busy} onClick={() => onStart(due ? "review" : "new", "ten-cards")}>只学 10 个</button><button type="button" className="vl-text-button" disabled={busy} onClick={() => onStart(due ? "review" : "new", "ten-minutes")}>只学 10 分钟</button></div>
    <details className="vl-plan"><summary>每日计划与学习偏好</summary><div className="vl-settings-numbers"><label>每日新单词<input type="number" inputMode="numeric" min={0} max={300} value={settings.dailyWords} onChange={event => changeNumber("dailyWords", event.target.value)} /></label><label>每日新词组<input type="number" inputMode="numeric" min={0} max={300} value={settings.dailyPhrases} onChange={event => changeNumber("dailyPhrases", event.target.value)} /></label><label>单次学习数量<input type="number" inputMode="numeric" min={1} max={300} value={settings.sessionSize} onChange={event => changeNumber("sessionSize", event.target.value)} /></label></div>
      <div className="vl-settings-checks">{([
        ["reviewFirst", "先清到期复习，再学新词"], ["spellingEnabled", "每组结束后提供拼写巩固"], ["includeRecognition", "包含“本句识别即可”的词"], ["includeFunctionWords", "包含功能词（通常在句法中理解）"], ["includeNames", "包含背景专有名词"],
      ] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={settings[key]} onChange={event => onSettings({ ...settings, [key]: event.target.checked, updatedAt: Date.now() })} /><span>{label}</span></label>)}</div>
      <p>核心迁移词、熟词生义、必会结构优先；你主动标记的词会保留。拼写与阅读识别分别记录。</p>
      <p>当前已学新词：{metrics.newWords} 个单词、{metrics.newPhrases} 个词组。今天还可新学 {metrics.remainingNew} 项。</p>
    </details>
  </section>;
}
