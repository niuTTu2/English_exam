import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", root, configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());
const model = await vite.ssrLoadModule("/app/vocabulary-learning/model.ts");
const scheduler = await vite.ssrLoadModule("/app/vocabulary-learning/scheduler.ts");
const queue = await vite.ssrLoadModule("/app/vocabulary-learning/queue.ts");
const sessions = await vite.ssrLoadModule("/app/vocabulary-learning/session.ts");
const spelling = await vite.ssrLoadModule("/app/vocabulary-learning/spelling.ts");
const bridge = await vite.ssrLoadModule("/app/vocabulary-learning/study-bridge.ts");
const study = await vite.ssrLoadModule("/app/study-app.tsx");
const { vocabularyPriority } = await vite.ssrLoadModule("/app/vocabulary-priority.ts");
const { getVocabularySenseGuide } = await vite.ssrLoadModule("/app/vocabulary-senses.ts");
const now = new Date(2026, 8, 19, 10).getTime();
const day = 86_400_000;

function candidate(label, sourceId, phrase = false, manual = false) {
  const entry = study.resolveEntry(label, phrase, sourceId);
  const source = study.sourceDestination(sourceId);
  return { entry, manual, priority: vocabularyPriority(entry, sourceId, source.articleId), context: {
    id: `${sourceId}:${label.toLowerCase()}`, sourceId, articleId: source.articleId, year: source.year,
    sourceType: sourceId.includes("-option-") ? "option" : sourceId.startsWith("question-") ? "prompt" : "sentence",
    expression: label,
  } };
}
function add(memories, item) { const memory = model.mergeCandidate(memories, item, now); memories[memory.id] = memory; return memory; }
function synthetic(key, meaning, pos, sourceId, occurrences = []) {
  return { entry: { key, headword: key, display: key, kind: "word", partOfSpeech: pos, contextualMeaning: meaning, use: "当前用途",
    collocations: [], otherMeanings: [], wordFamily: [], confusions: [], counts: { form: 1, lemma: 1, family: 1 }, occurrences },
  context: { id: `${sourceId}:${key}`, sourceId, articleId: "2010-p1", year: 2010, sourceType: "sentence", expression: key }, manual: true };
}

test("reviewed note senses merge tone sources and separate annotation/notice without losing shared corpus counts", () => {
  const memories = {};
  const tone = add(memories, candidate("note", "2010-p1-s1"));
  const same = add(memories, candidate("note", "p5-s5"));
  const annotation = add(memories, candidate("notes", "p3-s10"));
  const notice = add(memories, candidate("noted", "2010-cloze-s5"));
  assert.equal(tone.id, same.id);
  assert.equal(same.contexts.length, 2);
  assert.equal(same.primaryContextId, tone.primaryContextId);
  assert.equal(Object.keys(memories).length, 3);
  assert.notEqual(annotation.id, notice.id);
  const noteEntry = candidate("note", "2010-p1-s1").entry;
  assert.equal(noteEntry.counts.lemma, 5);
  assert.deepEqual(noteEntry.occurrences.map(item => item.sourceId).sort(),
    ["2010-cloze-s5", "2010-p1-s1", "2013-p1-s11", "p3-s10", "p5-s5"].sort());
  assert.equal(candidate("notes", "2013-p1-s11").entry.headword, "note");
  assert.match(noteEntry.occurrences.find(item => item.sourceId === "2013-p1-s11").excerpt, /As Davidson notes/);
  assert.equal(queue.nextContextId(same, { last: { memoryId: same.id, kind: "reading", contextId: tone.primaryContextId, createdAt: now } }), same.contexts[1].id);
});

test("work art/occupation are separate while plural and singular artworks use one independent memory", () => {
  const memories = {};
  const first = add(memories, candidate("works", "2010-p1-s1"));
  const related = add(memories, candidate("work", "2010-p1-s17"));
  const occupation = add(memories, candidate("work", "2010-p2-s8"));
  assert.equal(first.id, related.id);
  assert.equal(related.partOfSpeech, "n");
  assert.notEqual(first.id, occupation.id);
  const reviewed = scheduler.scheduleReview(first, "known", now);
  assert.equal(occupation.consecutiveKnown, 0);
  assert.equal(reviewed.consecutiveKnown, 1);
});

test("company business synonyms merge while companionship remains distinct", () => {
  const memories = {};
  const business = add(memories, candidate("companies", "2010-p3-s1"));
  assert.equal(add(memories, candidate("company", "2011-p1-s12")).id, business.id);
  assert.notEqual(add(memories, candidate("company", "2010-p5-s15")).id, business.id);
});

test("existing reviewed sense guides merge exact synonym variants without broad substring guesses", () => {
  const state = meaning => ({ ...synthetic("state", meaning, "n.", `source-${meaning}`), entry: { ...synthetic("state", meaning, "n.", "source").entry, senseGuide: getVocabularySenseGuide("state") } });
  const region = model.createMemory(state("州"), now);
  assert.equal(region.id, model.createMemory(state("邦"), now).id);
  assert.notEqual(region.id, model.createMemory(state("国家"), now).id);
  assert.match(region.senseId, /reviewed:region/);
});

test("unregistered exact core sense is order-independent, source anchored, and survives wording updates", () => {
  const occurrences = ["source-b", "source-a"].map(sourceId => ({ sourceId, year: 2010, section: "Text 1", excerpt: "Demand rose.",
    contexts: [{ expression: "demand", partOfSpeech: "n.", meaning: "需求；需要", use: "主语" }] }));
  const a = synthetic("demand", "需求；需要", "n.", "source-a", occurrences);
  const b = synthetic("demand", "需要；需求", "n.（不可数）", "source-b", occurrences);
  assert.equal(model.createMemory(a, now).id, model.createMemory(b, now).id);
  const memories = {}; const first = add(memories, b); add(memories, a);
  assert.equal(Object.keys(memories).length, 1);
  const revised = structuredClone(b); revised.entry.contextualMeaning = "市场需求";
  assert.equal(model.mergeCandidate(memories, revised, now).id, first.id);
  assert.doesNotMatch(first.id, /需求|需要/);
  assert.notEqual(model.createMemory(synthetic("demand", "要求", "v.", "source-c"), now).id, first.id);
});

test("filed for bankruptcy and all but two keep their existing phrase keys and real cloze", () => {
  const filed = candidate("filed for bankruptcy", "2010-p1-s4", true);
  const allBut = candidate("all but two", "2010-p1-s2", true);
  assert.equal(filed.entry.kind, "phrase");
  assert.equal(filed.entry.canonicalForm, "file for + legal status");
  const memory = model.createMemory(filed, now);
  assert.equal(memory.termKey, filed.entry.key);
  assert.equal(memory.kind, "phrase");
  assert.match(allBut.entry.contextualMeaning, /除|两|二/);
  const source = filed.entry.occurrences.find(item => item.sourceId === filed.context.sourceId).excerpt;
  const cloze = spelling.makePhraseCloze(source, "filed for bankruptcy", "for");
  assert.equal(cloze.answer, "for");
  assert.match(cloze.text, /filed ____ bankruptcy/);
  assert.equal(spelling.makePhraseCloze(source, "imaginary collocation"), undefined);
});

test("momentum uses current meaning and defaults to core; names/functions/recognition require opt-in", () => {
  const momentum = candidate("momentum", "2010-p1-s5");
  assert.equal(momentum.priority.id, "core");
  assert.match(momentum.entry.contextualMeaning, /势头/);
  assert.equal(model.isCandidateEligible(momentum, model.DEFAULT_SETTINGS), true);
  const name = candidate("Damien", "2010-p1-s1");
  assert.equal(name.priority.id, "name");
  assert.equal(model.isCandidateEligible(name, model.DEFAULT_SETTINGS), false);
  assert.equal(model.isCandidateEligible({ ...name, manual: true }, model.DEFAULT_SETTINGS), true);
  assert.equal(model.isCandidateEligible(candidate("but", "2010-p1-s2"), model.DEFAULT_SETTINGS), false);
});

test("due queue excludes future/paused items, keeps overdue first, and new items cannot displace due reviews", () => {
  const memories = {};
  const a = add(memories, candidate("momentum", "2010-p1-s5"));
  const b = add(memories, candidate("note", "2010-p1-s1"));
  const c = add(memories, candidate("filed for bankruptcy", "2010-p1-s4", true));
  memories[a.id] = { ...a, status: "review", dueAt: now - 2 * day };
  memories[b.id] = { ...b, status: "review", dueAt: now + day };
  memories[c.id] = { ...c, status: "review", dueAt: now };
  const result = queue.createLearningQueue(memories, [candidate("debt", "2010-p1-s18")], model.DEFAULT_SETTINGS, now, "mixed", { size: 2 });
  assert.deepEqual(result.queue.map(item => item.memoryId), [a.id, c.id]);
  assert.equal(memories[a.id].dueAt, now - 2 * day, "queue construction cannot silently reschedule an overdue memory");
  assert.equal(queue.createLearningQueue(memories, [], model.DEFAULT_SETTINGS, now, "review").queue.some(item => item.memoryId === b.id), false);
});

test("known interval advances only when due on a new day, and early repeated known preserves due date", () => {
  const initial = model.createMemory(candidate("momentum", "2010-p1-s5"), now);
  const first = scheduler.scheduleReview(initial, "known", now);
  assert.equal(first.intervalDays, 1);
  let clicked = first;
  for (let count = 0; count < 30; count++) clicked = scheduler.scheduleReview(clicked, "known", now + count);
  assert.equal(clicked.intervalDays, 1); assert.equal(clicked.dueAt, first.dueAt);
  const second = scheduler.scheduleReview(clicked, "known", first.dueAt);
  assert.equal(second.intervalDays, 3);
  const early = scheduler.scheduleReview(second, "easy", first.dueAt + day);
  assert.equal(early.dueAt, second.dueAt); assert.equal(early.intervalDays, 3);
  const third = scheduler.scheduleReview(second, "known", second.dueAt);
  assert.equal(third.intervalDays, 7);
});

test("same-day re-marked items clear on successful recall without advancing or manufacturing attempts", () => {
  const item = candidate("momentum", "2010-p1-s5");
  const initial = model.createMemory(item, now);
  const originalSession = sessions.createSession([{ id: "initial", memoryId: initial.id, kind: "new-word", contextId: initial.primaryContextId }], now, { id: "remark-initial" });
  const first = sessions.rateSession(sessions.revealSession(originalSession, now), { [initial.id]: initial }, "known", now);
  const original = { vocabularyMemories: { [initial.id]: first.memory }, vocabularyAttempts: { [first.attempt.id]: first.attempt } };
  for (const rating of ["known", "easy"]) {
    const early = scheduler.scheduleReview(first.memory, rating, now + 30_000);
    assert.equal(early.dueAt, first.memory.dueAt, "unmarked future review must not move");
    assert.equal(early.consecutiveKnown, first.memory.consecutiveKnown);
    const marked = bridge.enrollVocabulary(original, item, now + 60_000, "有些陌生");
    assert.deepEqual(marked.vocabularyAttempts, original.vocabularyAttempts, "marking is not a recall attempt");
    assert.equal(scheduler.dueMemories(marked.vocabularyMemories, now + 60_000).length, 1);
    const reopened = marked.vocabularyMemories[initial.id];
    const reviewSession = sessions.createSession([{ id: "reopened", memoryId: initial.id, kind: "review", contextId: reopened.primaryContextId }], now + 120_000, { id: `remark-${rating}` });
    const recalled = sessions.rateSession(sessions.revealSession(reviewSession, now + 120_000), marked.vocabularyMemories, rating, now + 120_000);
    const nextDay = new Date(now); nextDay.setDate(nextDay.getDate() + 1); nextDay.setHours(0, 0, 0, 0);
    assert.equal(recalled.memory.dueAt, nextDay.getTime());
    assert.equal(recalled.memory.intervalDays, 1);
    assert.equal(recalled.memory.consecutiveKnown, first.memory.consecutiveKnown);
    assert.equal(recalled.memory.lastAdvancedDay, first.memory.lastAdvancedDay);
    assert.equal(scheduler.dueMemories({ [initial.id]: recalled.memory }, now + 120_000).length, 0);
    assert.equal(recalled.attempt.rating, rating, "only the actual recall creates its own attempt");
    assert.equal(Object.keys({ ...marked.vocabularyAttempts, [recalled.attempt.id]: recalled.attempt }).length, 2);
    let repeated = recalled.memory;
    for (let i = 0; i < 20; i++) repeated = scheduler.scheduleReview(repeated, i % 2 ? "known" : "easy", now + 180_000 + i);
    assert.equal(repeated.dueAt, recalled.memory.dueAt, "repeated successful clicks cannot postpone the short review");
    assert.equal(repeated.consecutiveKnown, first.memory.consecutiveKnown);
    assert.equal(repeated.lastAdvancedDay, first.memory.lastAdvancedDay);
    let mature = model.createMemory(item, now - 25 * day);
    for (let i = 0; i < 5; i++) mature = scheduler.scheduleReview(mature, "known", i === 0 ? now - 25 * day : mature.dueAt);
    assert.equal(mature.intervalDays, 30);
    assert.equal(mature.lastAdvancedDay, scheduler.localDay(now));
    const longPlan = bridge.enrollVocabulary({ vocabularyMemories: { [mature.id]: mature } }, item, now + 60_000, "有些陌生");
    const shortPlan = scheduler.scheduleReview(longPlan.vocabularyMemories[mature.id], rating, now + 120_000);
    assert.equal(shortPlan.dueAt, nextDay.getTime());
    assert.equal(shortPlan.intervalDays, 1);
    assert.equal(shortPlan.consecutiveKnown, mature.consecutiveKnown, "reopened 30-day memory must not gain another streak step");
    assert.equal(shortPlan.lastAdvancedDay, mature.lastAdvancedDay);
  }
});

test("forgot repeats after four intervening cards and at tail; failing a retry gets another recall", () => {
  const memories = {};
  for (let i = 0; i < 8; i++) add(memories, synthetic(`word${i}`, `义${i}`, "n.", `source${i}`));
  const prepared = queue.createLearningQueue(memories, [], { ...model.DEFAULT_SETTINGS, dailyWords: 8 }, now);
  let session = sessions.createSession(prepared.queue, now, { id: "retry-test" });
  const first = session.queue[0];
  const result = sessions.rateSession(sessions.revealSession(session, now), prepared.memories, "forgot", now);
  session = result.session;
  assert.equal(session.queue[5].memoryId, first.memoryId);
  assert.equal(session.queue[5].kind, "retry");
  assert.equal(result.memory.lapses, 1);
  const tail = sessions.createSession([first], now, { id: "tail" });
  const failed = sessions.rateSession(sessions.revealSession(tail, now), memories, "forgot", now);
  assert.equal(failed.session.status, "active"); assert.equal(failed.session.queue.length, 2);
  const retry = sessions.rateSession(sessions.revealSession(failed.session, now), { ...memories, [failed.memory.id]: failed.memory }, "forgot", now + 1);
  assert.equal(retry.session.queue.length, 3); assert.equal(retry.memory.status, "learning");
  assert.equal(retry.session.status, "active");
  const recovered = sessions.rateSession(sessions.revealSession(retry.session, now + 2), { ...memories, [retry.memory.id]: retry.memory }, "known", now + 2);
  assert.equal(recovered.session.status, "completed");
  assert.equal(recovered.memory.intervalDays, 1);
});

test("seventh card resumes without re-settling six prior attempts and front cannot be rated", () => {
  const memories = {}; for (let i = 0; i < 10; i++) add(memories, synthetic(`word${i}`, `义${i}`, "n.", `source${i}`));
  const result = queue.createLearningQueue(memories, [], model.DEFAULT_SETTINGS, now);
  let session = sessions.createSession(result.queue, now, { id: "restore" });
  assert.equal(sessions.rateSession(session, memories, "known", now), undefined);
  const attempts = {};
  for (let i = 0; i < 6; i++) {
    const rated = sessions.rateSession(sessions.revealSession(session, now + i), memories, "known", now + i);
    memories[rated.memory.id] = rated.memory; attempts[rated.attempt.id] = rated.attempt; session = rated.session;
  }
  session = JSON.parse(JSON.stringify(sessions.pauseSession(session, now + 10)));
  session = sessions.resumeSession(session, now + 11);
  assert.equal(session.cursor, 6); assert.equal(session.attemptIds.length, 6);
  assert.equal(session.queue[6].id, result.queue[6].id);
  assert.equal(Object.keys(attempts).length, 6);
});

test("spelling grading ignores typography but catches missing phrase parts; failures preserve reading mastery", () => {
  assert.equal(spelling.gradeSpelling(" Filed  for bankruptcy ", "filed for bankruptcy"), true);
  assert.equal(spelling.gradeSpelling("filed bankruptcy", "filed for bankruptcy"), false);
  let memory = model.createMemory(candidate("momentum", "2010-p1-s5"), now);
  memory = { ...scheduler.scheduleReview(memory, "easy", now), spelling: { enabled: true, attempts: 0, correct: 0 } };
  const memories = { [memory.id]: memory };
  const session = sessions.createSession([{ id: "spell", memoryId: memory.id, contextId: memory.primaryContextId, kind: "spelling" }], now, { id: "spell" });
  const result = sessions.recordSpellingResult(session, memories, false, now + 1);
  assert.equal(result.memory.dueAt, memory.dueAt);
  assert.equal(result.memory.status, memory.status);
  assert.equal(result.memory.consecutiveKnown, memory.consecutiveKnown);
  assert.equal(result.memory.spelling.attempts, 1);
});

test("saved records contain corpus references, not copied dictionary payloads", () => {
  const memory = model.createMemory(candidate("note", "2010-p1-s1"), now);
  assert.equal("entry" in memory, false);
  assert.equal("text" in memory.contexts[0], false);
  assert.equal("translation" in memory.contexts[0], false);
});

test("pausing an item removes remaining repetitions without erasing settled attempts", () => {
  const memories = {}; const first = add(memories, candidate("momentum", "2010-p1-s5")); const second = add(memories, candidate("note", "2010-p1-s1"));
  const queued = queue.createLearningQueue(memories, [], model.DEFAULT_SETTINGS, now).queue;
  const session = sessions.createSession(queued, now, { id: "pause-memory" });
  const rated = sessions.rateSession(sessions.revealSession(session, now), memories, "forgot", now);
  const paused = model.setMemoryPaused(rated.memory, true, now + 1);
  const filtered = sessions.skipPausedSessionItems(rated.session, { ...memories, [paused.id]: paused }, now + 1);
  assert.equal(filtered.attemptIds.length, 1);
  assert.equal(filtered.queue[0].memoryId, rated.memory.id, "settled prefix remains available for summaries");
  assert.equal(filtered.queue.slice(filtered.cursor).some(item => item.memoryId === paused.id), false);
  assert.ok(filtered.queue.slice(filtered.cursor).some(item => [first.id, second.id].includes(item.memoryId)));
});
