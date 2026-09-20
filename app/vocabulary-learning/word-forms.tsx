import type { VocabEntry } from "../data";
import { recordedWordForms } from "../lexicon";
import "./word-forms.css";

export function vocabularyTitle(entry: Pick<VocabEntry, "kind" | "headword" | "canonicalForm" | "display">) {
  return entry.kind === "word" ? entry.headword : entry.canonicalForm ?? entry.headword;
}

export function wordFormInfo(entry: Pick<VocabEntry, "headword" | "display" | "specialForms">) {
  const recorded = recordedWordForms(entry.headword);
  const seen = new Set<string>();
  const forms = [entry.headword, entry.display, ...recorded.forms].filter(form => {
    const key = form.toLowerCase().replace(/[‘’]/g, "'");
    if (!form || seen.has(key)) return false;
    seen.add(key); return true;
  });
  const notes = [...new Set([...(entry.specialForms ?? []), ...recorded.notes])].filter(note =>
    !/^(无需要|结构词：|规则变化)|特殊变形另行列出|按本句词性识别规则词形|无特殊变形/.test(note));
  return { forms, notes };
}

/** Uses declared forms, not suffix guesses; derivations remain in the separate word-family section. */
export function WordForms({ entry }: { entry: VocabEntry }) {
  if (entry.kind !== "word") return null;
  const { forms, notes } = wordFormInfo(entry);
  return <section className="word-forms" aria-label="词形变化">
    <h4>词形变化</h4>
    <p className="word-form-list">{forms.map(form => <span className="word-form" lang="en" key={form}>{form}{form === entry.headword ? <small>原形</small> : form === entry.display ? <small>本句</small> : null}</span>)}</p>
    {notes.length > 0 && <details><summary>词形用法说明</summary>{notes.map(note => <p key={note}>{note}</p>)}</details>}
    <p className="word-form-caption">列出已收录词形；不同词性按各自用法使用，派生词另见词族。</p>
  </section>;
}
