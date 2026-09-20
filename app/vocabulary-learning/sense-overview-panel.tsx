"use client";

import { useState } from "react";
import type { VocabEntry } from "../data";
import { buildSenseOverview } from "./sense-overview";

type SenseOverviewRow = ReturnType<typeof buildSenseOverview>[number];

function SenseDetails({ row, onSource }: { row: SenseOverviewRow; onSource?: (sourceId: string) => void }) {
  const [showSources, setShowSources] = useState(false);
  if (!row.use && !row.example && !row.sources.length) return null;
  return <details className="vl-sense-details" onToggle={event => setShowSources(event.currentTarget.open)}>
    <summary>查看用法{row.example ? "、例句" : ""}{row.sources.length ? "与真题出处" : ""}</summary>
    <div className="vl-sense-detail-body">
      {row.use && <p>{row.use}</p>}
      {row.example && <div className="structure-example vl-sense-teaching-example">
        <small>教学例句（非真题，不计次数）</small>
        <b lang="en">{row.example.english}</b>
        <span>{row.example.chinese}</span>
      </div>}
      {showSources && row.sources.length > 0 && <div className="vl-sense-sources" aria-label="此义项的真题出处">{row.sources.map(source => <div key={`${source.sourceId}:${source.expression}:${source.meaning}`}>
        <p className="vl-sense-source-caption">{source.year} · {source.section}</p>
        <p lang="en">{source.excerpt}</p>
        <p><b lang="en">{source.expression}</b>{source.partOfSpeech ? ` · ${source.partOfSpeech}` : ""} · {source.meaning}</p>
        {source.use && <p>{source.use}</p>}
        {onSource && <button type="button" className="sense-source-link" onClick={() => onSource(source.sourceId)}>回到此出处 →</button>}
      </div>)}</div>}
    </div>
  </details>;
}

/** Meanings are always visible after reveal; only explanations and source lists fold. */
export function SenseOverviewPanel({ entry, currentSourceId, onSource }: { entry: VocabEntry; currentSourceId?: string; onSource?: (sourceId: string) => void }) {
  if (entry.kind !== "word") return null;
  const rows = buildSenseOverview(entry, currentSourceId);
  if (!rows.length) return null;
  return <section className="vl-sense-overview" aria-label="全部义项与真题次数">
    <h3>全部义项</h3>
    <p className="vl-sense-scope">按已导入真题的已归类出现次数排序；没有已归类真题语境的义项列在后面。教学例句不计次数。</p>
    <ol className="vl-sense-rows">{rows.map(row => <li className="vl-sense-row" key={row.id} data-sense-id={row.id} data-sense-count={row.count ?? "unclassified"} data-current-sense={row.current || undefined}>
      <div className="vl-sense-heading">
        <p className="vl-sense-meaning">{row.partOfSpeech && <span className="vl-sense-pos">{row.partOfSpeech}</span>}<strong>{row.meaning}</strong>{row.current && <span className="vl-sense-current">本句义</span>}</p>
        <span className="vl-sense-count">{row.count === null ? "尚无已归类真题" : `真题 ${row.count} 次`}</span>
      </div>
      <SenseDetails row={row} onSource={onSource} />
    </li>)}</ol>
  </section>;
}
