import type { ArticleContent, BeginnerSyntaxComponent, SentenceAnalysis } from "../data";

const relationLabels = { trunk: "主干关系", modifier: "修饰关系", supplement: "补充说明", "clause-internal": "从句内部" } as const;
function Relation({ component }: { component: BeginnerSyntaxComponent }) {
  return <li><strong lang="en">{component.text}</strong><p>{component.explanation}</p><p>关系：{component.modifies}</p><small>{component.form} · {component.function}</small>
    {!!component.children?.length && <ul>{component.children.map((child, i) => <Relation key={i} component={child} />)}</ul>}
  </li>;
}
export function DeepReading({ sentence, article }: { sentence: SentenceAnalysis; article: ArticleContent }) {
  const syntax = sentence.beginnerSyntax;
  return <div className="v2-deep">
    {sentence.trunk && <section><h4>主干</h4><p lang="en">{sentence.trunk}</p></section>}
    {syntax && <section><h4>句子骨架与各部分关系</h4>{Object.entries(relationLabels).map(([kind, label]) => {
      const items = syntax.components.filter(c => c.relationKind === kind);
      return items.length > 0 && <section key={kind}><h5>{label}</h5><ul>{items.map((c, i) => <Relation key={i} component={c} />)}</ul></section>;
    })}{syntax.clauses.map((c, i) => <section key={i}><p lang="en">{c.text}</p><p>{c.role}</p><p>主语：{c.subject}；谓语：{c.predicate}</p>{c.predicateDetails?.map((d, j) => <p key={j}>{d.function}：{d.text}</p>)}<p>{c.translationOrder}</p><small>{c.type} · 引导词 {c.marker}</small></section>)}</section>}
    {article.guide?.references.filter(r => r.sentenceId === sentence.id).map((r, i) => <section key={i}><h4>指代：{r.expression}</h4><p>{r.referent}。{r.explanation}</p></section>)}
    {syntax?.reading?.timeline?.length ? <section><h4>时间关系</h4>{syntax.reading.timeline.map((t, i) => <p key={i}><b>{t.label}：</b>{t.explanation}</p>)}</section> : null}
    {sentence.literal && <section><h4>结构直译</h4><p>{sentence.literal}</p></section>}
    {sentence.translationAlignment?.map((b, i) => <p key={i}><span lang="en">{b.english}</span> → {b.chinese}</p>)}
    {sentence.translationNotes?.map((note, i) => <p key={i}>{note}</p>)}
    {sentence.grammarPatches?.map((patch, i) => <section className="v2-grammar-patch" key={i}><h4>为什么这样读</h4><p>{patch.explanation}</p><p>{patch.relation}</p><small>语法名称：{patch.term}</small><p>换一句也能用：{patch.transferRule}</p></section>)}
  </div>;
}
