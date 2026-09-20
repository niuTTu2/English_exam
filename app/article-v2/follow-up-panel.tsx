import { useState } from "react";
import { followUpIntents, type ArticleV2FollowUp } from "./model";
import type { V2StudySnapshot, V2Update } from "./state";

export function FollowUpPanel({ articleId, sourceId, data, onUpdate, option = false }: { articleId: string; sourceId: string; data: V2StudySnapshot; onUpdate: (update: V2Update) => void; option?: boolean }) {
  const [intent, setIntent] = useState<keyof typeof followUpIntents>(option ? "option" : "sentence");
  const [question, setQuestion] = useState(""), [note, setNote] = useState(""), [editing, setEditing] = useState<ArticleV2FollowUp>();
  const [notice, setNotice] = useState("");
  const saved = Object.values(data.articleV2FollowUps ?? {}).filter(n => n.articleId === articleId && n.sourceId === sourceId);
  return <details className="v2-follow-up"><summary>{option ? "为什么不是这个选项 · 个人追问" : "问这句话 · 个人追问"}</summary>
    <p>当前可保存个人追问和笔记，暂不提供在线回答。</p>
    <div className="v2-actions">{Object.entries(followUpIntents).filter(([key]) => option || key !== "option").map(([key, label]) => <button type="button" key={key} aria-pressed={intent === key} onClick={() => setIntent(key as keyof typeof followUpIntents)}>{label}</button>)}</div>
    <label>我想问<textarea value={question} placeholder={followUpIntents[intent]} onChange={e => setQuestion(e.target.value)} maxLength={10000} /></label>
    <label>个人笔记<textarea value={note} onChange={e => setNote(e.target.value)} maxLength={30000} /></label>
    <button type="button" onClick={() => { const at = Date.now(), id = editing?.id ?? crypto.randomUUID(); onUpdate(current => ({ ...current, articleV2FollowUps: { ...current.articleV2FollowUps, [id]: { id, articleId, sourceId, intent, question: question.trim() || followUpIntents[intent], note, createdAt: editing?.createdAt ?? at, updatedAt: at } } })); setEditing(undefined); setQuestion(""); setNote(""); setNotice("个人追问已保存。"); }}>{editing ? "保存修改" : "保存个人追问"}</button>
    {notice && <p role="status">{notice}</p>}
    {saved.map(item => <article key={item.id}><strong>{item.question}</strong><p>{item.note}</p><button type="button" onClick={() => { setEditing(item); setIntent(item.intent); setQuestion(item.question); setNote(item.note); setNotice(""); }}>编辑笔记</button></article>)}
  </details>;
}
