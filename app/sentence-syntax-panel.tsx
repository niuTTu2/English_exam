import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BeginnerSyntaxComponent, SentenceAnalysis } from "./data";
import { buildBeginnerSyntaxGuide } from "./syntax-guide";

type RenderText = (text: string, key: string) => ReactNode;

function ComponentCard({ component, path, renderText }: {
  component: BeginnerSyntaxComponent;
  path: string;
  renderText: RenderText;
}) {
  return (
    <li className="syntax-relation-node" data-syntax-component={component.text}>
      <strong>{renderText(component.text, `${path}-source`)}</strong>
      <p className="syntax-attachment">→ {renderText(component.modifies, `${path}-attachment`)}</p>
      <p>{renderText(component.explanation, `${path}-explanation`)}</p>
      <small className="syntax-terminology">{component.form} · {component.function}</small>
      {component.children && component.children.length > 0 && (
        <ul className="syntax-relation-tree" aria-label={`${component.text} 的内部结构`}>
          {component.children.map((child, index) => <ComponentCard key={`${path}-${index}`} component={child} path={`${path}-${index}`} renderText={renderText} />)}
        </ul>
      )}
    </li>
  );
}

export function SentenceSyntaxPanel({ analysis, renderText, compact = false }: {
  analysis: SentenceAnalysis;
  renderText: RenderText;
  compact?: boolean;
}) {
  const guide = buildBeginnerSyntaxGuide(analysis);
  return (
    <section className={`beginner-syntax-panel ${compact ? "is-compact" : ""}`} data-syntax-panel={analysis.id}>
      <header className="beginner-syntax-heading">
        <div><span>读懂这句话</span><strong>先读主干，再看修饰关系和本句难点</strong></div>
      </header>
      <div className="beginner-step">
        <div className="beginner-step-title"><div><strong>主干</strong><small>按原文保留核心关系，暂时放下次要说明</small></div></div>
        <p className="beginner-trunk">{renderText(analysis.trunk, `${analysis.id}-trunk`)}</p>
        {guide.reading && <p className="syntax-reading-focus"><b>本句关键</b>{renderText(guide.reading.focus, `${analysis.id}-focus`)}</p>}
      </div>

      <details className="beginner-step beginner-step-disclosure">
        <summary className="beginner-step-summary">
          <div className="beginner-step-title"><div><strong>谁修饰谁</strong><small>沿缩进同时看清完整关系；先理解作用，再看术语</small></div></div>
          <Badge variant="outline">{guide.components.length} 组</Badge><ChevronDown />
        </summary>
        <div className="beginner-step-content">
          <ul className="syntax-relation-tree">
            {guide.components.map((component, index) => (
              <ComponentCard key={`${analysis.id}-${index}`} component={component} path={`${analysis.id}-${index}`} renderText={renderText} />
            ))}
          </ul>
        </div>
      </details>

      {guide.reading && (
        <details className="beginner-step beginner-step-disclosure">
          <summary className="beginner-step-summary">
            <div className="beginner-step-title"><div><strong>本句难在哪里</strong><small>{guide.reading.questions[0]?.question}</small></div></div>
            <Badge variant="outline">{guide.reading.questions.length} 个要点</Badge><ChevronDown />
          </summary>
          <div className="beginner-step-content syntax-teaching-points">
            {guide.reading.questions.map((point, index) => (
              <section key={`${analysis.id}-point-${index}`}>
                <h4>{point.question}</h4>
                <p className="syntax-evidence">{renderText(point.evidence, `${analysis.id}-evidence-${index}`)}</p>
                <p>{renderText(point.answer, `${analysis.id}-answer-${index}`)}</p>
              </section>
            ))}
            {guide.reading.timeline && (
              <section>
                <h4>先后顺序（结合上下文）</h4>
                <ol className="syntax-timeline">
                  {guide.reading.timeline.map((event, index) => (
                    <li key={`${analysis.id}-event-${index}`}><b>{event.label}</b><p>{renderText(event.explanation, `${analysis.id}-event-text-${index}`)}</p></li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </details>
      )}

      {guide.clauses.length > 0 && (
        <details className="beginner-step beginner-step-disclosure">
          <summary className="beginner-step-summary">
            <div className="beginner-step-title"><div><strong>从句内部</strong><small>回到每个从句，分别找主语、谓语与补足成分</small></div></div>
            <Badge variant="outline">{guide.clauses.length} 个</Badge><ChevronDown />
          </summary>
          <div className="beginner-step-content">
            <div className="beginner-clause-list">
              {guide.clauses.map((clause, index) => (
                <details key={`${analysis.id}-clause-${index}`} className="beginner-clause-card">
                  <summary className="beginner-item-summary">
                    <div>
                      <strong>{renderText(clause.text, `${analysis.id}-clause-${index}`)}</strong>
                      <p className="syntax-attachment">{renderText(clause.role, `${analysis.id}-clause-role-${index}`)}</p>
                      <div className="beginner-clause-heading"><Badge>{clause.type}</Badge><span>引导词：{clause.marker}</span></div>
                    </div><ChevronDown />
                  </summary>
                  <div className="beginner-clause-detail">
                    <div className="beginner-clause-skeleton">
                      <p><span>从句主语</span>{renderText(clause.subject, `${analysis.id}-clause-subject-${index}`)}</p>
                      <p><span>从句谓语</span>{renderText(clause.predicate, `${analysis.id}-clause-predicate-${index}`)}</p>
                      {clause.predicateDetails
                        ? clause.predicateDetails.map((detail, detailIndex) => <p key={`${index}-${detailIndex}`}><span>{detail.function}</span>{renderText(detail.text, `${analysis.id}-clause-detail-${index}-${detailIndex}`)}</p>)
                        : clause.objectOrComplement && <p><span>谓语后的成分</span>{renderText(clause.objectOrComplement, `${analysis.id}-clause-complement-${index}`)}</p>}
                    </div>
                    <p><b>理解顺序：</b>{renderText(clause.translationOrder, `${analysis.id}-clause-order-${index}`)}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </details>
      )}
      <details className="syntax-glossary"><summary>遇到术语看不懂？</summary><dl>
        <dt>表语</dt><dd>放在 be、become 等系动词后，说明主语是什么或怎么样。</dd>
        <dt>宾语补足语</dt><dd>跟在宾语后，补充这个宾语的状态或动作，例如 make it different 中的 different。</dd>
        <dt>后置定语</dt><dd>放在名词后面，回答“哪一个、什么样的”。先找到它说明的名词。</dd>
        <dt>逻辑主语</dt><dd>真正做非谓语动作的人或事物；不一定就是整句的主语。</dd>
        <dt>从句</dt><dd>有自己的主语和谓语，又在更大的句子里承担一种作用的一组词。</dd>
      </dl></details>
    </section>
  );
}
