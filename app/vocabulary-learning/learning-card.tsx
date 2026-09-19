"use client";

import { useState, type ReactNode } from "react";
import type { VocabEntry } from "../data";
import type { VocabularyCandidate, VocabularyRating } from "./model";

export const feedbackOptions: Array<{ value: VocabularyRating; label: string; hint: string }> = [
  { value: "forgot", label: "忘了", hint: "本轮再见" },
  { value: "fuzzy", label: "模糊", hint: "稍后巩固" },
  { value: "known", label: "认识", hint: "正常间隔" },
  { value: "easy", label: "太简单", hint: "更长间隔" },
];

/** Only match the original expression. No guessed phrase or rewritten source. */
export function expressionRanges(text: string, expression: string): Array<{ start: number; end: number }> {
  const escaped = expression.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  if (!escaped) return [];
  return Array.from(text.matchAll(new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")), match => ({ start: match.index, end: match.index + match[0].length }));
}

export function HighlightedContext({ text, expression, blank = false }: { text: string; expression: string; blank?: boolean }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const range of expressionRanges(text, expression)) {
    nodes.push(text.slice(cursor, range.start));
    nodes.push(blank ? <span className="vl-blank" key={range.start} aria-label="回忆此处表达">________</span>
      : <mark key={range.start}>{text.slice(range.start, range.end)}</mark>);
    cursor = range.end;
  }
  nodes.push(text.slice(cursor));
  return <blockquote className="vl-context" lang="en">{nodes}</blockquote>;
}

export type LearningCardProps = {
  candidate: VocabularyCandidate & { canonicalInstance?: string };
  revealed: boolean;
  sourceLabel: string;
  note?: string;
  onSource: (sourceId: string) => void;
  onReveal: () => void;
  onRate: (rating: VocabularyRating) => void;
  onSpeak?: (text: string) => void;
  onNote?: (note: string) => void;
  contextControls?: ReactNode;
  memoryControls?: ReactNode;
};

function ReferenceList({ entries }: { entries: NonNullable<VocabEntry["collocationDetails"]> }) {
  return <ul className="vl-reference-list">{entries.map((item, index) => <li key={`${item.label}-${index}`}><b lang="en">{item.label}</b><span>{item.meaning}</span>{item.note && <small>{item.note}</small>}</li>)}</ul>;
}

function ExtraKnowledge({ entry, note, onNote, onSource }: Pick<LearningCardProps, "note" | "onNote" | "onSource"> & { entry: VocabEntry }) {
  const [showOccurrences, setShowOccurrences] = useState(false);
  return <div className="vl-extras" aria-label="按需查看完整资料">
    {(entry.otherMeanings.length > 0 || entry.senseGuide) && <details><summary>其他义项</summary>
      {entry.senseGuide?.senses.map(sense => <p key={sense.id}><b>{sense.partOfSpeech} · {sense.meaning}</b><br />{sense.use}</p>)}
      {entry.otherMeanings.map((meaning, index) => <p key={index}>{meaning}</p>)}
    </details>}
    {!!entry.contextualSubstitutions?.length && <details><summary>本句同义替换</summary>{entry.contextualSubstitutions.map(item => <div key={item.rewrittenSentence} className="vl-reference-item"><b lang="en">{item.label}</b><p>{item.chinese}</p><blockquote lang="en">{item.rewrittenSentence}</blockquote><p>{item.nuance}</p>{item.adjustment && <p>{item.adjustment}</p>}</div>)}</details>}
    {!!entry.synonymDetails?.length && <details><summary>近义词与辨析</summary><ReferenceList entries={entry.synonymDetails} /></details>}
    {!!entry.confusions.length && <details><summary>易混词与区别</summary>{entry.confusions.map((item, index) => <p key={index}>{item}</p>)}</details>}
    {!!entry.specialForms?.length && <details><summary>特殊词形</summary>{entry.specialForms.map((item, index) => <p key={index}>{item}</p>)}</details>}
    {!!entry.familyDetails?.length && <details><summary>派生词与词族</summary><ReferenceList entries={entry.familyDetails} /></details>}
    {!!entry.structures?.length && <details><summary>全部规范结构</summary>{entry.structures.map((item, index) => <div className="vl-reference-item" key={index}><b lang="en">{item.pattern}</b><p>{item.meaning}</p><p>{item.rule}</p></div>)}</details>}
    {!!entry.collocationDetails?.length && <details><summary>全部搭配</summary><ReferenceList entries={entry.collocationDetails} /></details>}
    <details onToggle={event => setShowOccurrences(event.currentTarget.open)}><summary>在其他真题中的出现</summary><p>原文表达 {entry.counts.form} 次 · {entry.kind === "phrase" ? "同一结构" : "原形"} {entry.counts.lemma} 次 · 词族 {entry.counts.family} 次</p>
      {showOccurrences && <div className="vl-source-list">{entry.occurrences.map((item, index) => <div key={item.sourceId ?? index}><p><b>{item.year} · {item.section}</b></p><p lang="en">{item.excerpt}</p>{item.contexts?.map(context => <p key={context.expression}>{context.expression} · {context.partOfSpeech} · {context.meaning}</p>)}{item.sourceId && <button type="button" className="vl-text-button" onClick={() => onSource(item.sourceId!)}>回到此出处</button>}</div>)}</div>}
    </details>
    <details><summary>我的笔记{note ? " · 已记录" : ""}</summary><label className="vl-note-label">记录这次容易混淆的地方<textarea rows={3} value={note ?? ""} onChange={event => onNote?.(event.target.value)} readOnly={!onNote} /></label></details>
  </div>;
}

export function RatingButtons({ onRate }: { onRate: LearningCardProps["onRate"] }) {
  return <div className="vl-rating-grid" role="group" aria-label="回忆后自评">{feedbackOptions.map((item, index) => <button type="button" className={`vl-rating vl-rating-${item.value}`} key={item.value} onClick={() => onRate(item.value)}><span>{item.label}</span><small>{item.hint}</small><kbd>{index + 1}</kbd></button>)}</div>;
}

function LearningCard({ candidate, revealed, sourceLabel, note, onSource, onReveal, onRate, onSpeak, onNote, contextControls, memoryControls, phrase = false, initialCloze = false }: LearningCardProps & { phrase?: boolean; initialCloze?: boolean }) {
  const [cloze, setCloze] = useState(initialCloze);
  const entry = candidate.entry;
  const expression = candidate.context.expression || entry.sourceExpression || entry.display;
  const text = candidate.text ?? "";
  const keyStructure = entry.structures?.[0];
  const keyCollocation = entry.collocationDetails?.[0];
  const canCloze = phrase && expressionRanges(text, expression).length > 0;
  return <article className={`vl-learning-card ${phrase ? "vl-phrase-card" : "vl-word-card"}`} data-card-kind={phrase ? "phrase" : "word"} data-card-face={revealed ? "answer" : "front"}>
    <div className="vl-card-core">
      <div className="vl-card-kicker"><span>{phrase ? "词组 · 整体记忆" : "单词 · 语境识别"}</span>{candidate.priority && <span>{candidate.priority.label}</span>}</div>
      <div className="vl-term-heading"><h3 lang={cloze && !revealed ? undefined : "en"}>{cloze && !revealed ? "回忆整组表达" : expression}</h3>{onSpeak && !(cloze && !revealed) && <button type="button" className="vl-speak" onClick={() => onSpeak(expression)} aria-label="使用浏览器朗读">朗读</button>}</div>
      <p className="vl-source-caption">{sourceLabel}</p>
      {text && <HighlightedContext text={text} expression={expression} blank={canCloze && cloze && !revealed} />}
      {!revealed && <p className="vl-recall-prompt">{candidate.context.mark === "容易混淆" ? "想一想：在这里是哪一种意思？" : phrase ? "把整组表达连起来，回忆它在句中的意思。" : "先在心中回忆：这个词在本句中是什么意思？"}</p>}
      {revealed && <section className="vl-answer" aria-label="本句答案">
        <p className="vl-answer-label">本句义 <span>{entry.partOfSpeech}</span></p>
        <p className="vl-meaning">{entry.contextualMeaning}</p>
        {phrase && <dl className="vl-phrase-forms"><div><dt>原文表达</dt><dd lang="en">{expression}</dd></div><div><dt>规范形式</dt><dd lang="en">{candidate.canonicalInstance ?? entry.canonicalForm ?? entry.headword}</dd></div>{candidate.canonicalInstance && entry.canonicalForm !== candidate.canonicalInstance && <div><dt>可替换结构</dt><dd lang="en">{entry.canonicalForm}</dd></div>}</dl>}
        {candidate.translation && <p className="vl-translation">{candidate.translation}</p>}
        {entry.use && <p className="vl-use"><b>本句作用：</b>{entry.use}</p>}
        {phrase && keyStructure ? <div className="vl-key-structure"><b>搭配规则</b><p lang="en">{keyStructure.pattern}</p><p>{keyStructure.rule}</p></div>
          : keyCollocation ? <div className="vl-key-structure"><b>先记一个搭配</b><p><span lang="en">{keyCollocation.label}</span> · {keyCollocation.meaning}</p></div>
            : keyStructure && <div className="vl-key-structure"><b>关键结构</b><p><span lang="en">{keyStructure.pattern}</span> · {keyStructure.meaning}</p></div>}
        {phrase && (entry.pitfalls?.[0] || entry.confusions[0]) && <p className="vl-pitfall"><b>易错提醒：</b>{entry.pitfalls?.[0] ?? entry.confusions[0]}</p>}
        <button type="button" className="vl-text-button" onClick={() => onSource(candidate.context.sourceId)}>{candidate.context.sourceType === "sentence" ? "回到原句" : "回到题目"}</button>
      </section>}
      <div className="vl-context-controls">{canCloze && !revealed && <button type="button" className="vl-text-button" aria-pressed={cloze} onClick={() => setCloze(!cloze)}>{cloze ? "显示原文表达" : "试试原句挖空"}</button>}{contextControls}</div>
    </div>
    <footer className="vl-card-actions">{revealed ? <RatingButtons onRate={onRate} /> : <button type="button" className="vl-primary vl-reveal" onClick={onReveal}>显示释义 <kbd>空格</kbd></button>}</footer>
    {revealed && <ExtraKnowledge entry={entry} note={note} onNote={onNote} onSource={onSource} />}
    {revealed && memoryControls && <details className="vl-memory-controls"><summary>这个词的复习设置</summary>{memoryControls}</details>}
  </article>;
}

export function WordLearningCard(props: LearningCardProps) { return <LearningCard {...props} />; }
export function PhraseLearningCard(props: LearningCardProps & { initialCloze?: boolean }) { return <LearningCard {...props} phrase />; }
