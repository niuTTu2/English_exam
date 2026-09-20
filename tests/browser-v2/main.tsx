/** Browser-only engineering harness. No production entry imports this file. */
import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ArticleV2 from "../../app/article-v2/article-v2";
import { syntheticArticle, syntheticCorpus, emptyV2State } from "../fixtures/article-v2-synthetic";
import { readLocalStudyState, saveLocalStudyState, prepareLocalSnapshot } from "../../app/study-sync";
import { vocabularyDataFrom } from "../../app/vocabulary-learning/study-bridge";
import type { V2StudySnapshot, V2Update } from "../../app/article-v2/state";
import { questionExplanation } from "../../app/data";
import "../../app/globals.css";

function Harness() {
  const owner = `synthetic-${new URLSearchParams(location.search).get("width") ?? "desktop"}@example.test`;
  const [data, setData] = useState<V2StudySnapshot & { version: number; updatedAt: number }>(() => readLocalStudyState<V2StudySnapshot & { version: number; updatedAt: number }>(localStorage, owner)?.state ?? emptyV2State);
  const current = useRef(data);
  const [term, setTerm] = useState("");
  const onUpdate = (update: V2Update) => {
    const next = prepareLocalSnapshot({ ...current.current, ...update(current.current) }, current.current);
    saveLocalStudyState(localStorage, owner, { state: next, base: null });
    current.current = next; setData(next);
  };
  return <main style={{ padding: 12, width: "100%", boxSizing: "border-box" }}>
    <ArticleV2 article={syntheticArticle} corpus={syntheticCorpus} data={data} ready onUpdate={onUpdate} onTerm={(label, sourceId, phrase) => { const candidate = syntheticCorpus.resolveCandidate(label, phrase ?? false, sourceId); setTerm(`${label} · ${candidate?.entry.contextualMeaning} · ${sourceId}`); }} onExternalSource={() => {}} renderQuestionDetails={q => <section><p>{q.prompt}</p>{q.options.map(o => <p key={o.key}>{o.key} · {o.text} · {questionExplanation(q, o.key)}</p>)}</section>} />
    {term && <p role="status">词条接口：{term}</p>}
    <details><summary>测试记录（只含合成数据）</summary><pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{JSON.stringify({ answers: data.answers, submittedSections: data.submittedSections, marks: data.articleV2Marks, progress: data.articleV2Progress, notes: data.articleV2FollowUps, vocabulary: vocabularyDataFrom(data) }, null, 2)}</pre></details>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Harness />);
