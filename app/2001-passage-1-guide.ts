import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `2001-p1-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });
export const passage2001P1Guide: ArticleGuide = {
  practice: [
    { id: "standard-shift", revision: 1, kind: "choice", prompt: "地方地质研究跨世纪变化的重点是什么？", options: ["从自身即可成立，变为须联系更广阔的全局", "从来没有研究价值", "所有期刊同一年停止接稿"], answer: "从自身即可成立，变为须联系更广阔的全局", evidence: "only if they incorporate, and reflect on, the wider geological picture", feedback: "第10句的in their own right与only if对照认可条件；第11句业余者延续旧方式，才引出准入更难。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(10), taskId: "condition-strength" }, { sentenceId: s(11), taskId: "contrast-target" }] },
    { id: "time-scope", revision: 1, kind: "link", prompt: "按讨论范围和事件，给结尾两种历史评价找到归属。", links: [{ source: "完整后果延至二十世纪", target: "英国地质学" }, { source: "十九世纪是结构转变关键期", target: "科学总体" }], options: ["英国地质学", "科学总体"], answer: JSON.stringify(["英国地质学", "科学总体"]), evidence: "In science generally", feedback: "第15句区分过程与完整后果，第16句再扩大到整个科学。事件与范围都不同，不是一个日期前后自相矛盾。", conceptId: "time-reference", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(15), taskId: "process-consequence-time" }, { sentenceId: s(16), taskId: "general-scope" }] },
    { id: "paragraph-route", revision: 1, kind: "order", prompt: "按原卷四段排列文章的论证路线。", options: ["知识积累催生专业化，并引出职业化", "说明业余参与门槛并引入地质学", "以论文、期刊、学会展示分化", "区分个案后果与科学整体关键期"], answer: JSON.stringify(["知识积累催生专业化，并引出职业化", "说明业余参与门槛并引入地质学", "以论文、期刊、学会展示分化", "区分个案后果与科学整体关键期"]), evidence: "can be illustrated in terms of the development of geology", feedback: "地质学是两种相关过程的例证；业余者困难和出版标准都是例证中的环节，不能拿局部后果代替全篇目的。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTasks: [{ sentenceId: s(4), taskId: "another-reference" }, { sentenceId: s(8), taskId: "training-example" }] },
  ],
  route: ["知识积累催生专业化，并引出职业化", "说明业余参与门槛并引入地质学", "以论文、期刊、学会展示分化", "区分个案后果与科学整体关键期"],
  mainIdea: "科学知识积累推动专业化，职业化是与之相关的另一过程。文章用英国地质学的训练要求、论文标准、期刊与学会分化展示两者如何改变科学结构；业余者的参与困难是过程中的后果，不等于作者断言他们处处被排斥。",
  paragraphs: [
    { paragraphId: "2001-p1-paragraph-1", title: "专业化的起因与相关过程", summary: "知识积累带来信息处理问题，拆分研究内容使个人仍能研究；专业化只是相关发展之一，另一项是职业化。", relation: "先给原因和应对办法，再扩大到两种相关过程，为全文定题。" },
    { paragraphId: "2001-p1-paragraph-2", title: "参与门槛与地质学例证", summary: "专业与业余界线并非绝对，但业余者可能未完全融入共同体。更长、更复杂训练增加参与困难，尤其在数学或实验室训练领域。", relation: "从概念转到参与后果；末句明确以英国地质学说明趋势，衔接第三段。" },
    { paragraphId: "2001-p1-paragraph-3", title: "认可标准推动制度分化", summary: "合格论文逐渐需要联系全局，业余者仍沿用旧方式；审稿制度强化准入困难，读者群不同的期刊与组织方式随之分化。", relation: "地质学实例由研究标准推进到发表制度和社团结构，展示专业化与职业化，而非仅列业余者不幸。" },
    { paragraphId: "2001-p1-paragraph-4", title: "个案与整体的历史时间", summary: "英国地质学十九世纪过程已展开，完整后果延至二十世纪；科学整体的结构变化仍以十九世纪为关键期。", relation: "Although区分过程和后果，however再从个案回到科学总体，收束论旨。" },
  ],
  sentenceRoles: Object.fromEntries(["给出知识积累与专业化之间的应对关系。", "说明划分研究对象如何使个人继续处理并利用信息。", "限制专业化只是相关发展之一。", "引出另一项相关过程：职业化。", "承认专业与业余之间存在例外，避免绝对化界线。", "解释amateur一般隐含的融入和价值认同程度。", "由更高训练要求推到业余参与的困难。", "限定困难最明显的领域，并转入英国地质学例证。", "概括研究地位与合格论文定义的变化。", "跨世纪对照地方研究的认可标准。", "指出业余者仍延续旧方法，衔接困难后果。", "说明发表准入更难，并以审稿制度说明强化机制。", "由准入和群体分化推到不同读者群的期刊。", "类比期刊分化，展示专业与业余者组织方式差异。", "区分地质学过程较早展开和完整后果较晚显现。", "扩大范围，确认科学整体十九世纪的结构性转变。"].map((role, i) => [s(i + 1), role])),
  references: [
    { expression: "it", sentenceId: s(2), referent: "the information", targetSentenceIds: [s(2)], explanation: "handle的信息也是use的对象，as说明把它作为基础。" },
    { expression: "Another", sentenceId: s(4), referent: "另一项related development", targetSentenceIds: [s(3)], explanation: "不是另一个人；与specialisation并列引出professionalisation。" },
    { expression: "its values", sentenceId: s(6), referent: "科学共同体的价值观", targetSentenceIds: [s(6)], explanation: "its承接scientific community，不是person的个人财产。" },
    { expression: "its consequent requirement", sentenceId: s(7), referent: "专业化发展随之产生的要求", targetSentenceIds: [s(7)], explanation: "its承接growth of specialisation，consequent明确结果关系。" },
    { expression: "The trend", sentenceId: s(8), referent: "专业化发展及更高训练要求增加业余参与困难", targetSentenceIds: [s(7)], explanation: "不是对某门学科简单贴上排斥业余者的动机标签。" },
    { expression: "their own right", sentenceId: s(10), referent: "地方地质研究自身的资格", targetSentenceIds: [s(10)], explanation: "their指local geological studies，表达不必额外联系全局也算有价值。" },
    { expression: "they", sentenceId: s(10), referent: "local studies", targetSentenceIds: [s(10)], explanation: "执行incorporate和reflect on的语法主语是研究，不是距离更近的professionals。" },
    { expression: "The overall result", sentenceId: s(12), referent: "专业认可标准改变而业余研究仍沿旧方式所产生的结果", targetSentenceIds: [s(10), s(11)], explanation: "概括前面关系；第二个a result同位复述准入更难。" },
    { expression: "this development", sentenceId: s(13), referent: "发表门槛上升及专业与业余群体分化的发展", targetSentenceIds: [s(12)], explanation: "期刊读者群分流是前述发展结果，不是知识积累的唯一直接原因。" },
    { expression: "A rather similar process", sentenceId: s(14), referent: "与期刊分流类似的分化过程", targetSentenceIds: [s(13)], explanation: "从期刊分化类推学会组织方式分化。" },
    { expression: "its full consequences", sentenceId: s(15), referent: "专业化与职业化过程的完整后果", targetSentenceIds: [s(15)], explanation: "不是直到二十世纪这个过程才开始。" },
    { expression: "this change", sentenceId: s(16), referent: "专业化与职业化引起的科学结构变化", targetSentenceIds: [s(3), s(4), s(15)], explanation: "结尾回到科学总体，而非单独一份期刊的制度。" },
  ],
  timeline: [
    { label: "十九世纪的专业化", event: "训练更长、更复杂，业余者参与困难增加；地方地质研究仍可凭自身成立。", evidence: [e(7, "The growth of specialisation in the nineteenth century", "过程发展"), e(10, "in the nineteenth century", "旧认可标准")] },
    { label: "审稿制度的先后", event: "全国性期刊先在十九世纪引入，若干地方地质学期刊后在二十世纪引入。", evidence: [e(12, "first by national journals in the nineteenth century", "先行机构"), e(12, "then by several local geological journals in the twentieth century", "后续机构")] },
    { label: "二十世纪的地质学", event: "地方研究须联系更广阔全局才被认可，专业化与职业化的完整后果在此时显现。", evidence: [e(10, "only if they incorporate, and reflect on, the wider geological picture", "新的必要条件"), e(15, "until the twentieth century", "完整后果时间")] },
    { label: "写作时的回顾范围", event: "过去一个半世纪以原文写作时为参照，不能从2001考试年份倒推精确起点；现在完成时说明变化延续到叙述时。", evidence: [e(9, "over the last century and a half", "相对时间"), e(13, "have now appeared", "叙述时已出现")] },
  ],
  voices: [
    { speaker: "作者的历史分析", claim: "知识积累推动专业化，专业化与职业化改变科学结构，十九世纪对科学总体是关键期。", boundary: "全文为作者说明，没有可独立归给受访者的直接引语；不把专业与业余的结构分化改写为专业者有意歧视。", evidence: [e(1, "as a response to the problem", "原因分析"), e(16, "must be reckoned as the crucial period", "历史评价")] },
    { speaker: "作者对术语和趋势的限定", claim: "业余者的共同体融入及价值认同可能不完整，界线仍有例外。", boundary: "may、not fully、No clear-cut及several都保留限制；不是所有业余者均不认同科学价值，也不是所有领域都无法竞争。", evidence: [e(5, "exceptions can be found to any rule", "界线例外"), e(6, "may not fully share its values", "可能性与程度限制")] },
  ],
};
