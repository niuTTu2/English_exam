"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_SETTINGS, createMemory, mergeCandidate, setMemoryPaused, type VocabularyCandidate, type VocabularyLearningData, type VocabularyMemory, type VocabularyRating, type VocabularySession } from "./model";
import type { VocabularyCorpus } from "./corpus";
import { createLearningQueue, vocabularyTodayStats } from "./queue";
import { appendSpelling, createSession, pauseSession, rateSession, recordSpellingResult, resumeSession, revealSession, sessionElapsedMs, sessionSummary, skipPausedSessionItems, skipSessionSpelling, switchSessionContext } from "./session";
import { gradeSpelling } from "./spelling";
import { VocabularyHome, type LearningScope } from "./vocabulary-home";
import { PhraseLearningCard, WordLearningCard } from "./learning-card";
import { SpellingPractice } from "./spelling-practice";
import { DifficultMemories, LearningSummary } from "./learning-summary";
import "./vocabulary-learning.css";

export type VocabularyLearningProps = {
  data: VocabularyLearningData;
  onUpdate: (update: (current: VocabularyLearningData) => VocabularyLearningData) => void;
  corpus: VocabularyCorpus;
  articleId: string; articleLabel: string; year: number;
  lists: string[]; listItems: Record<string, string[]>; marks: Record<string, string[]>; notes: Record<string, string>;
  onNote?: (termKey: string, note: string) => void;
  onSource: (sourceId: string) => void;
  onLegacyContext?: (termKey: string) => void;
};

const emptyMemories: Record<string, VocabularyMemory> = {};
const emptyAttempts: NonNullable<VocabularyLearningData["vocabularyAttempts"]> = {};
const emptySessions: NonNullable<VocabularyLearningData["vocabularySessions"]> = {};
const cardKinds = { "new-word": "新单词", "new-phrase": "新词组", review: "到期复习", retry: "本轮再认", spelling: "拼写巩固" };

function withSession(data: VocabularyLearningData, session: VocabularySession): VocabularyLearningData {
  return { ...data, vocabularySessions: { ...data.vocabularySessions, [session.id]: session }, vocabularyQueueState: { ...data.vocabularyQueueState, activeSessionId: session.id, updatedAt: session.updatedAt } };
}

function resumeBatch(session: VocabularySession, memories: Record<string, VocabularyMemory>, now: number) {
  const paused = session.status === "active" ? pauseSession(session, session.updatedAt) : session;
  const clean = skipPausedSessionItems(paused, memories, now);
  const extended = clean.timeLimitMinutes && sessionElapsedMs(clean, now) >= clean.timeLimitMinutes * 60_000
    ? { ...clean, timeLimitMinutes: clean.timeLimitMinutes + 10 } : clean;
  return resumeSession(extended, now);
}

export function VocabularyLearning({ data, onUpdate, corpus, articleId, articleLabel, year, lists, listItems, marks, notes, onNote, onSource, onLegacyContext }: VocabularyLearningProps) {
  const [scope, setScope] = useState<LearningScope>({ kind: "article" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now);
  const [spellingFeedback, setSpellingFeedback] = useState<{ itemId: string; correct: boolean; expected: string; meaning: string } | null>(null);
  const memories = data.vocabularyMemories ?? emptyMemories;
  const attempts = data.vocabularyAttempts ?? emptyAttempts;
  const sessions = data.vocabularySessions ?? emptySessions;
  const settings = { ...DEFAULT_SETTINGS, ...data.vocabularySettings };
  const session = data.vocabularyQueueState?.activeSessionId ? sessions[data.vocabularyQueueState.activeSessionId] : undefined;
  const resumable = session && session.status !== "completed" ? session : Object.values(sessions).filter(item => item.status !== "completed").sort((a, b) => b.updatedAt - a.updatedAt)[0];
  const inSession = session?.status === "active";
  const currentItem = session?.queue[session.cursor];
  const currentMemory = currentItem ? memories[currentItem.memoryId] : undefined;
  const currentContext = currentMemory?.contexts.find(context => context.id === currentItem?.contextId) ?? currentMemory?.contexts[0];
  const candidate = currentMemory && currentContext ? corpus.getCandidate(currentContext, currentMemory.kind) : undefined;
  const stats = useMemo(() => vocabularyTodayStats(memories, attempts, now), [memories, attempts, now]);
  const scopedIds = useMemo(() => {
    const keys = scope.kind === "marked" ? Object.keys(marks).filter(key => marks[key]?.length) : scope.kind === "list" ? listItems[scope.list ?? lists[0]] ?? [] : undefined;
    const selected = keys ? new Set(keys) : undefined;
    return Object.values(memories).filter(memory => selected ? selected.has(memory.termKey) : scope.kind === "all" || memory.contexts.some(context => scope.kind === "year" ? context.year === year : context.articleId === articleId)).map(memory => memory.id);
  }, [memories, scope, marks, listItems, lists, year, articleId]);
  const scopedStats = useMemo(() => vocabularyTodayStats(Object.fromEntries(scopedIds.map(id => [id, memories[id]])), attempts, now), [scopedIds, memories, attempts, now]);

  const mutate = useCallback((update: (current: VocabularyLearningData) => VocabularyLearningData) => {
    try { onUpdate(update); return true; }
    catch (error) { setMessage(error instanceof Error ? error.message : "本次保存没有完成，当前卡已保留，请重试。"); return false; }
  }, [onUpdate]);

  const updateSession = useCallback((change: (current: VocabularySession, state: VocabularyLearningData) => VocabularySession) => {
    const id = session?.id;
    if (!id) return false;
    return mutate(current => {
      const existing = current.vocabularySessions?.[id];
      return existing ? withSession(current, change(existing, current)) : current;
    });
  }, [mutate, session?.id]);

  const reveal = useCallback(() => { updateSession(current => revealSession(current, Date.now())); }, [updateSession]);
  const rate = useCallback((rating: VocabularyRating) => {
    const id = session?.id;
    if (!id) return;
    const at = Date.now();
    mutate(current => {
      const existing = current.vocabularySessions?.[id];
      if (!existing) return current;
      const result = rateSession(existing, current.vocabularyMemories ?? {}, rating, at);
      if (!result) return current;
      const nextMemories = { ...current.vocabularyMemories, [result.memory.id]: result.memory };
      const nextSession = result.session.status === "completed" && current.vocabularySettings?.spellingEnabled ? appendSpelling(result.session, nextMemories, at) : result.session;
      return withSession({ ...current, vocabularyMemories: nextMemories, vocabularyAttempts: { ...current.vocabularyAttempts, [result.attempt.id]: result.attempt } }, nextSession);
    });
    setNow(at);
  }, [session?.id, mutate]);

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const interval = window.setInterval(refresh, 30_000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", refresh); };
  }, []);

  useEffect(() => {
    if (!inSession || !session || currentItem?.kind === "spelling") return;
    const keyboard = (event: KeyboardEvent) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches("input,textarea,select") || target.isContentEditable)) return;
      if (event.code === "Space" && session.phase === "front") { event.preventDefault(); reveal(); }
      else if (session.phase === "answer" && /^[1-4]$/.test(event.key)) { event.preventDefault(); rate((["forgot", "fuzzy", "known", "easy"] as const)[Number(event.key) - 1]); }
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [inSession, session, currentItem?.kind, reveal, rate]);

  useEffect(() => {
    if (!inSession) return;
    document.getElementById("vl-session-top")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [inSession, currentItem?.id]);

  useEffect(() => {
    if (!inSession) return;
    const saveOnLeave = () => { if (document.visibilityState === "hidden") updateSession(current => pauseSession(current, Date.now())); };
    const saveOnPageHide = () => { updateSession(current => pauseSession(current, Date.now())); };
    document.addEventListener("visibilitychange", saveOnLeave);
    window.addEventListener("pagehide", saveOnPageHide);
    return () => { document.removeEventListener("visibilitychange", saveOnLeave); window.removeEventListener("pagehide", saveOnPageHide); };
  }, [inSession, updateSession]);

  useEffect(() => {
    if (!inSession || !session?.timeLimitMinutes) return;
    const remaining = Math.max(0, session.timeLimitMinutes * 60_000 - sessionElapsedMs(session, Date.now()));
    const timeout = window.setTimeout(() => { updateSession(current => pauseSession(current, Date.now())); setMessage("10 分钟已到，当前卡和未完成的困难词已保存。继续学习会开始下一个 10 分钟时段。"); }, remaining);
    return () => window.clearTimeout(timeout);
  }, [inSession, session, updateSession]);

  function speak(text: string) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { setMessage("当前浏览器不支持朗读，可以继续语境学习。"); return; }
    try { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US"; utterance.rate = .85; window.speechSynthesis.speak(utterance); }
    catch { setMessage("浏览器朗读暂不可用，学习不受影响。"); }
  }

  function start(mode: "new" | "review", limit?: "ten-cards" | "ten-minutes") {
    if (busy) return;
    setBusy(true); setMessage("");
    // Give the loading label a frame before resolving the requested corpus slice.
    window.setTimeout(() => {
      try {
        const at = Date.now();
        const candidates: VocabularyCandidate[] = [];
        const remainingWords = Math.max(0, settings.dailyWords - stats.newWords);
        const remainingPhrases = Math.max(0, settings.dailyPhrases - stats.newPhrases);
        if (mode === "new" && !(settings.reviewFirst && scopedStats.dueWords + scopedStats.duePhrases >= (limit === "ten-cards" ? 10 : settings.sessionSize)) && scope.kind !== "marked" && scope.kind !== "list") {
          const original = Object.values(memories);
          const seen = new Set<string>();
          let words = 0, phrases = 0;
          const options = { includeRecognition: settings.includeRecognition, includeFunctionWords: settings.includeFunctionWords, includeProperNames: settings.includeNames,
            accept: (item: VocabularyCandidate) => {
              const memory = createMemory(item, at, original);
              if (seen.has(memory.id) || (memories[memory.id] && (memories[memory.id].paused || memories[memory.id].status !== "unseen"))) return false;
              seen.add(memory.id);
              if (memory.kind === "word") { if (words >= remainingWords) return false; words += 1; }
              else { if (phrases >= remainingPhrases) return false; phrases += 1; }
              return true;
            } };
          if (remainingWords || remainingPhrases) {
            for (const item of corpus.iterateCandidatesForScope({ kind: scope.kind, articleId, year }, options)) {
              candidates.push(item);
              if (words >= remainingWords && phrases >= remainingPhrases) break;
            }
          }
        }
        const sessionId = `session-${crypto.randomUUID()}`;
        let queued = 0;
        const saved = mutate(current => {
          const result = createLearningQueue(current.vocabularyMemories ?? {}, candidates, { ...DEFAULT_SETTINGS, ...current.vocabularySettings }, at, mode, { size: limit === "ten-cards" ? 10 : settings.sessionSize, attempts: current.vocabularyAttempts, memoryIds: scopedIds });
          queued = result.queue.length;
          if (!queued) return current;
          return withSession({ ...current, vocabularyMemories: result.memories }, createSession(result.queue, at, { id: sessionId, ...(limit === "ten-minutes" ? { timeLimitMinutes: 10 } : {}) }));
        });
        if (saved && !queued) setMessage(mode === "review" ? "这个范围没有已到期项目；未来的复习会按原计划保留。" : remainingWords + remainingPhrases === 0 ? "今天的新词目标已经完成，可以复习到期项或调整每日计划。" : scope.kind === "list" ? "这份清单暂时没有可学习的已定位词汇。请从原句加入词汇，或在下方补选旧记录的语境。" : "本范围暂时没有符合当前计划的新词。可以从原句标记词汇，或在学习偏好中包含“本句识别即可”的词。");
        setNow(at);
      } catch (error) { setMessage(error instanceof Error ? error.message : "学习队列暂时无法准备，原记录保持不变。"); }
      finally { setBusy(false); }
    }, 0);
  }

  function goHome() {
    mutate(current => ({ ...current, vocabularyQueueState: { ...current.vocabularyQueueState, activeSessionId: undefined, updatedAt: Date.now() } }));
  }
  function pause() { updateSession(current => pauseSession(current, Date.now())); }
  function visitSource(sourceId: string) { if (!session || updateSession(current => pauseSession(current, Date.now()))) onSource(sourceId); }
  function spelling() { updateSession((current, state) => appendSpelling(current, state.vocabularyMemories ?? {}, Date.now())); }
  function changeMemory(change: (memory: VocabularyMemory) => VocabularyMemory) {
    if (!currentMemory) return;
    mutate(current => { const memory = current.vocabularyMemories?.[currentMemory.id]; return memory ? { ...current, vocabularyMemories: { ...current.vocabularyMemories, [memory.id]: change(memory) } } : current; });
  }
  function pauseMemory() {
    if (!currentMemory || !session) return;
    const at = Date.now();
    mutate(current => {
      const memory = current.vocabularyMemories?.[currentMemory.id];
      const active = current.vocabularySessions?.[session.id];
      if (!memory || !active) return current;
      const next = { ...current.vocabularyMemories, [memory.id]: setMemoryPaused(memory, true, at) };
      return withSession({ ...current, vocabularyMemories: next }, skipPausedSessionItems(active, next, at));
    });
  }
  function findSameSenseContexts() {
    if (!currentMemory) return;
    try {
      const candidates = corpus.resolveLegacyCandidates(currentMemory.termKey);
      let added = 0;
      mutate(current => {
        let next = current.vocabularyMemories ?? {};
        const target = next[currentMemory.id];
        if (!target) return current;
        for (const context of candidates) {
          const result = mergeCandidate(next, context, Date.now());
          if (result.id !== target.id || result.contexts.length === next[target.id].contexts.length) continue;
          added += result.contexts.length - next[target.id].contexts.length;
          next = { ...next, [result.id]: result };
        }
        return { ...current, vocabularyMemories: next };
      });
      setMessage(added ? `已补入 ${added} 个同义真题语境，可在卡片中切换。原复习出处保持保留。` : "已收录的相同义项语境均已加入。其他含义可在完整资料中按出处查看。");
    } catch { setMessage("语境暂时无法读取，当前学习记录保持不变。"); }
  }
  function submitSpelling(answer: string, expected: string) {
    if (!session || !currentItem || !candidate) return;
    const submittedItemId = currentItem.id;
    const correct = gradeSpelling(answer, expected);
    let recorded = false;
    const saved = mutate(current => { const existing = current.vocabularySessions?.[session.id]; if (!existing) return current;
      if (existing.queue[existing.cursor]?.id !== submittedItemId) return current;
      const result = recordSpellingResult(existing, current.vocabularyMemories ?? {}, correct, Date.now());
      recorded = Boolean(result);
      return result ? withSession({ ...current, vocabularyMemories: { ...current.vocabularyMemories, [result.memory.id]: result.memory }, vocabularyAttempts: { ...current.vocabularyAttempts, [result.attempt.id]: result.attempt } }, result.session) : current;
    });
    if (saved && recorded) setSpellingFeedback({ itemId: submittedItemId, correct, expected, meaning: candidate.entry.contextualMeaning });
  }

  const metrics = { ...stats, dueWords: scopedStats.dueWords, duePhrases: scopedStats.duePhrases, overdue: scopedStats.overdue,
    remainingNew: Math.max(0, settings.dailyWords - stats.newWords) + Math.max(0, settings.dailyPhrases - stats.newPhrases),
    estimatedMinutes: Math.max(1, Math.ceil(Math.min(settings.sessionSize, scopedStats.dueWords + scopedStats.duePhrases || settings.dailyWords + settings.dailyPhrases) / 2)) };
  const unresolved = data.vocabularyMigration?.unresolvedKeys ?? [];
  return <div className="vl-root" aria-busy={busy}>
    {spellingFeedback && <section className="vl-spelling" aria-label="已保存的拼写结果"><h3>{spellingFeedback.correct ? "拼写一致" : "再看一次原文词形"}</h3><p lang="en">{spellingFeedback.expected}</p><p>{spellingFeedback.meaning}</p><p>拼写结果已保存。阅读识别记录保持不变。</p><button type="button" className="vl-primary" onClick={() => setSpellingFeedback(null)}>下一项</button></section>}
    {!spellingFeedback && !inSession && session?.status !== "completed" && <>
      <VocabularyHome metrics={metrics} settings={settings} scope={scope} articleLabel={articleLabel} year={year} lists={lists} busy={busy} message={busy ? "正在准备这一组真题词汇…" : message} resumable={resumable ? { completed: resumable.cursor, total: resumable.queue.length } : undefined} onScope={setScope} onSettings={value => { mutate(current => ({ ...current, vocabularySettings: value })); }} onStart={start} onResume={() => { if (resumable) mutate(current => withSession(current, resumeBatch(current.vocabularySessions?.[resumable.id] ?? resumable, current.vocabularyMemories ?? {}, Date.now()))); }} />
      {unresolved.length > 0 && <details className="vl-legacy"><summary>旧记录需要补选语境 · {unresolved.length} 项</summary><p>标签、计划、笔记和清单都已保留。下列词存在多个义项，需要确认你当时要复习的原句。</p><ul>{unresolved.map(key => <li key={key}><button type="button" className="vl-text-button" onClick={() => onLegacyContext?.(key)}>{key} · 选择出处</button></li>)}</ul></details>}
    </>}
    {!spellingFeedback && session?.status === "completed" && <><LearningSummary summary={sessionSummary(session, attempts, memories)} memories={memories} onHome={goHome} onSpelling={spelling} spellingAvailable={session.queue.some(item => item.kind !== "spelling" && !session.queue.some(other => other.kind === "spelling" && other.memoryId === item.memoryId) && (memories[item.memoryId]?.spelling.enabled || memories[item.memoryId]?.consecutiveKnown >= 2))} />{message && <p className="vl-message" role="status">{message}</p>}</>}
    {!spellingFeedback && inSession && session && <section className="vl-session" aria-label="连续单卡学习">
      <header className="vl-session-header" id="vl-session-top"><div><strong>第 {session.cursor + 1} 张 · {currentItem ? cardKinds[currentItem.kind] : "学习"}</strong><small>已完成 {session.cursor} 张 · 剩余 {session.queue.length - session.cursor} 张{session.timeLimitMinutes ? " · 本段 10 分钟" : ""}</small></div><button type="button" onClick={pause}>暂停并退出</button></header>
      <progress className="vl-session-progress" value={session.cursor} max={Math.max(1, session.queue.length)} aria-label="本轮学习进度" />
      {message && <p className="vl-message" role="status">{message}</p>}
      {session.timeLimitMinutes && sessionElapsedMs(session, now) >= session.timeLimitMinutes * 60_000 && <p className="vl-message" role="status">10 分钟到了，可以暂停并保留当前卡。{session.queue.slice(session.cursor).some(item => item.kind === "retry") ? "本轮还有困难词需要再次回忆；可以继续，也可以下次恢复。" : "剩余项目会在恢复时继续。"}</p>}
      {candidate && currentMemory && currentItem ? currentItem.kind === "spelling" ? <SpellingPractice key={currentItem.id} candidate={candidate} sourceLabel={`${candidate.context.year} · ${candidate.sourceLabel}`} onSpeak={speak} onSubmit={submitSpelling} onSkip={() => updateSession(current => skipSessionSpelling(current, Date.now()))} />
        : (() => { const Card = currentMemory.kind === "phrase" ? PhraseLearningCard : WordLearningCard; return <Card key={currentItem.id} candidate={candidate} revealed={session.phase === "answer"} sourceLabel={`${candidate.context.year} · ${candidate.sourceLabel}`} note={notes[currentMemory.termKey]} onNote={onNote ? note => onNote(currentMemory.termKey, note) : undefined} onSource={visitSource} onSpeak={speak} onReveal={reveal} onRate={rate}
          contextControls={<>{currentMemory.contexts.length > 1 && <label>切换同一义项的真题语境<select value={currentContext?.id} onChange={event => updateSession((current, state) => switchSessionContext(current, state.vocabularyMemories?.[currentMemory.id] ?? currentMemory, event.target.value, Date.now()))}>{currentMemory.contexts.map(context => <option key={context.id} value={context.id}>{context.year} · {corpus.getSource(context.sourceId)?.sourceLabel ?? context.sourceType} · {context.expression}</option>)}</select></label>}<button type="button" className="vl-text-button" onClick={findSameSenseContexts}>查找同义真题语境</button></>}
          memoryControls={<><label><input type="checkbox" checked={currentMemory.spelling.enabled} onChange={event => changeMemory(memory => ({ ...memory, spelling: { ...memory.spelling, enabled: event.target.checked }, updatedAt: Date.now() }))} />需要拼写巩固</label><button type="button" className="vl-text-button" onClick={pauseMemory}>暂停这个义项的复习</button><p>“太简单”会使用更长间隔。暂停后可在下方已暂停项目中恢复。</p></>}
        />; })() : <div className="vl-message" role="alert"><p>这张卡的原文出处暂时无法读取，学习记录已保留。</p><button type="button" onClick={pause}>保存并返回</button></div>}
      <DifficultMemories ids={session.difficultIds} memories={memories} />
      <p className="vl-keyboard-hint">空格显示释义 · 1 忘了 · 2 模糊 · 3 认识 · 4 太简单</p>
    </section>}
    {!inSession && Object.values(memories).some(memory => memory.paused) && <details className="vl-plan"><summary>已暂停的记忆项</summary>{Object.values(memories).filter(memory => memory.paused).map(memory => <p key={memory.id}>{memory.headword} · {memory.meaning} <button type="button" className="vl-text-button" onClick={() => mutate(current => { const existing = current.vocabularyMemories?.[memory.id]; return existing ? { ...current, vocabularyMemories: { ...current.vocabularyMemories, [memory.id]: setMemoryPaused(existing, false, Date.now()) } } : current; })}>恢复复习</button></p>)}</details>}
  </div>;
}
