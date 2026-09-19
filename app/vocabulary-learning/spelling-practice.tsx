"use client";

import { useRef, useState } from "react";
import type { VocabularyCandidate } from "./model";
import { HighlightedContext } from "./learning-card";
import { makePhraseCloze } from "./spelling";

export function reviewedSpellingForms(candidate: VocabularyCandidate) {
  if (candidate.entry.kind !== "word") return [];
  const forms = (candidate.entry.specialForms ?? []).flatMap(item => {
    const prefix = item.match(/^([A-Za-z]+(?:['’][A-Za-z]+)?(?:\s*\/\s*[A-Za-z]+(?:['’][A-Za-z]+)?)*)\s*[（(]/)?.[1];
    return prefix ? prefix.split(/\s*\/\s*/) : [];
  });
  const unique = Array.from(new Set(forms.map(form => form.toLowerCase())));
  return unique.length >= 2 && unique.includes(candidate.context.expression.toLowerCase()) ? unique.sort((a, b) => a.localeCompare(b, "en")) : [];
}

export function phraseKeyPart(candidate: VocabularyCandidate) {
  if (candidate.entry.kind !== "phrase") return undefined;
  const pattern = candidate.entry.canonicalForm ?? candidate.entry.structures?.[0]?.pattern;
  if (!pattern) return undefined;
  return pattern.match(/\b(?:for|to|of|with|in|on|at|from|by|between|and|but|as|than)\b/gi)?.find(part => makePhraseCloze(candidate.text ?? "", candidate.context.expression, part));
}

export function SpellingPractice({ candidate, sourceLabel, onSubmit, onSkip, onSpeak }: { candidate: VocabularyCandidate; sourceLabel: string; onSubmit: (answer: string, expected: string) => void; onSkip: () => void; onSpeak?: (text: string) => void }) {
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"context" | "meaning" | "key-part" | "form">("context");
  const field = useRef<HTMLInputElement>(null);
  const expression = candidate.context.expression;
  const keyPart = phraseKeyPart(candidate);
  const cloze = mode === "key-part" && keyPart ? makePhraseCloze(candidate.text ?? "", expression, keyPart) : undefined;
  const forms = reviewedSpellingForms(candidate);
  const expected = cloze?.answer ?? expression;
  return <article className="vl-spelling" data-card-kind="spelling"><header><span className="vl-eyebrow">可选拼写巩固</span><h3>{candidate.entry.kind === "phrase" ? "把整组表达补回原句" : "把这个词补回原句"}</h3><p>拼写单独记录，不会抹去阅读识别的掌握情况。</p></header><label className="vl-spelling-mode">练习形式<select value={mode} onChange={event => { setMode(event.target.value as typeof mode); setAnswer(""); }}><option value="context">原句挖空</option><option value="meaning">看中文／听音拼写</option>{keyPart && <option value="key-part">词组关键成分补全</option>}{forms.length > 1 && <option value="form">选择原句中的正确词形</option>}</select></label><p className="vl-source-caption">{sourceLabel}</p>{mode !== "meaning" && candidate.text && (cloze ? <blockquote className="vl-context" lang="en">{cloze.before}<span className="vl-blank" aria-label="补全结构关键成分">____</span>{cloze.after}</blockquote> : <HighlightedContext text={candidate.text} expression={expression} blank />)}
    <p className="vl-spelling-meaning">{candidate.entry.contextualMeaning}</p>{onSpeak && <button type="button" className="vl-text-button" onClick={() => onSpeak(expression)}>听浏览器朗读</button>}
    {mode === "form" ? <div className="vl-form-options" role="group" aria-label="选择原句中的词形">{forms.map(form => <button type="button" className="vl-secondary" key={form} onClick={() => onSubmit(form, expression)} lang="en">{form}</button>)}</div> : <form onSubmit={event => { event.preventDefault(); if (answer.trim()) onSubmit(answer, expected); }} className="vl-spelling-form"><label htmlFor="vl-spelling-answer">{mode === "key-part" ? "补全结构中缺少的关键成分" : "输入原句中的词形或完整表达"}</label><input id="vl-spelling-answer" ref={field} value={answer} onChange={event => setAnswer(event.target.value)} onFocus={() => window.setTimeout(() => field.current?.scrollIntoView({ block: "center", behavior: "smooth" }), 250)} autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="done" lang="en" /><button type="submit" className="vl-primary" disabled={!answer.trim()}>提交拼写 <kbd>Enter</kbd></button></form>}
    <button type="button" className="vl-text-button" onClick={onSkip}>跳过这一项拼写</button>
  </article>;
}
