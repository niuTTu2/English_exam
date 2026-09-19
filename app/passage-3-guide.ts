import type { ArticleGuide, PassageEvidence } from "./article-teaching";
const s = (n: number) => `p3-s${n}`;
const e = (n: number, quote: string, role: string): PassageEvidence => ({ sentenceId: s(n), quote, role });

export const passage3Paragraphs = [[1, 2], [3, 4, 5, 6, 7, 8], [9, 10], [11, 12, 13]].map((numbers, index) => ({ id: `p3-paragraph-${index + 1}`, sentenceIds: numbers.map(s) }));
export const passage3Guide: ArticleGuide = {
  practice: [
    { id: "paragraph-route", revision: 1, kind: "order", prompt: "把四段作用排回原卷顺序。", options: ["先提评价原则，再点明诗歌难题", "转述未来主义者的理论和写法", "用注释与诗行的落差作批评", "区分作品与原则，追问变化前提"], answer: JSON.stringify(["先提评价原则，再点明诗歌难题", "转述未来主义者的理论和写法", "用注释与诗行的落差作批评", "区分作品与原则，追问变化前提"]), evidence: "The whole question is really this: have we essentially changed?", feedback: "不是一篇只赞扬新诗的文章：先提出评价问题，再转述观点、举例批评，最后承认一般原则并追问前提。", conceptId: "passage-route", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["principle-boundary", "example-function"] },
    { id: "principle-boundary", revision: 1, kind: "choice", prompt: "末段保留的是哪一种认可？", options: ["情感若发生大变化，应有相应表达变化", "未来主义诗歌已证明人性本质改变", "所有实验作品都已经属于文学"], answer: "情感若发生大变化，应有相应表达变化", evidence: "a great change in our emotional life calls for a change of expression", feedback: "第12句接受原则；第13句仍问have we essentially changed，说明前提未被作者直接确认为事实。第11句对作品文学性的保留仍然成立。", conceptId: "author-voice", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["paragraph-route"], leaksToTasks: [{ sentenceId: s(12), taskId: "principle-not-premise" }, { sentenceId: s(13), taskId: "direct-question" }] },
    { id: "example-function", revision: 1, kind: "choice", prompt: "第三段的军官落水例子主要说明什么？", options: ["注释故事与诗行实际内容形成落差", "军官的国籍决定文学流派", "数字证明现代人体重已根本改变"], answer: "注释故事与诗行实际内容形成落差", evidence: "the line consists of the noise of their falling and the weights of the officers", feedback: "读注释才知道完整故事，看到诗行却只有拟声和数字；这个例子支撑作者对文学性的质疑，不是军事史或体重统计。", conceptId: "paragraph-role", errorType: "passage-logic", mapRevealsAnswer: true, leaksToTaskIds: ["paragraph-route"], leaksToTasks: [{ sentenceId: s(10), taskId: "story-versus-line" }] },
  ],
  route: ["评价新艺术先了解目标", "转述生活加速与写法更新主张", "以作品实例检验文学性", "保留一般原则，追问本质变化"],
  mainIdea: "全文评述未来主义诗歌：介绍其理论和形式实验，批评作品难以理解、难称文学，同时承认情感大变应要求表达变化这一一般原则；最后追问人的本质是否真的发生变化。作者与被转述者的主张必须分开。",
  paragraphs: [
    { paragraphId: "p3-paragraph-1", title: "一般原则与具体难题", summary: "新艺术出现时应先了解目标，因为今天看来不合理的原则将来可能获认可；但未来主义诗歌即便理论可能合理，也很难算文学。", relation: "从开放地理解新艺术转到对具体作品的保留，提出全文要评述的问题。" },
    { paragraphId: "p3-paragraph-2", title: "未来主义者自己的理论", summary: "未来主义者把生活加速连到情感变化，再要求新的表达形式；列出语词、拟声、字号、墨水和词长方面的实验。", relation: "先公平转述被评论者的理由和方法；这些并非作者已经认可的事实。" },
    { paragraphId: "p3-paragraph-3", title: "用诗行与注释作检验", summary: "作者先说战斗描写混乱，再用军官落水例子对比注释里的完整故事和诗行里的拟声、数字。", relation: "用作品实例检验上段方法的效果，为难以称作文学的判断提供依据。" },
    { paragraphId: "p3-paragraph-4", title: "分开原则与作品", summary: "符合流派规则不保证成为文学；作者仍接受情感大变需要表达变化的原则，却追问我们是否已有本质变化。", relation: "回到首段的评价难题，以保留和追问结束，没有全盘肯定也没有否认所有新表达的必要。" },
  ],
  sentenceRoles: Object.fromEntries([
    "提出理解新艺术应先了解目标的原则，并用未来认可的可能作理由。", "聚焦未来主义诗歌，区分理论可能正确与作品文学性。", "标出转述来源，交代未来主义者所说的生活加速。", "在转述中从外部加速推出感受的相应变化。", "概括生活加速要求新表达形式的主张。", "将更新要求联系到表现现代压力的目的。", "列出倾吐语词时摆脱传统形式限制的主张。", "继续列出拟声、印刷视觉和词长实验。", "作者开始明确评价战斗描写混乱。", "以注释故事和实际诗行的落差展示表达实验的问题。", "重申符合流派规则仍很难称为文学。", "转而保留情感变化需要表达变化这一一般原则。", "追问人的本质是否已经改变，审视上述主张的前提。",
  ].map((role, index) => [s(index + 1), role])),
  references: [
    { expression: "its", sentenceId: s(1), referent: "a new movement in art", targetSentenceIds: [s(1)], explanation: "its advocates是新艺术运动的倡导者，不是艺术本身有人的动作。" },
    { expression: "they", sentenceId: s(1), referent: "their principles", targetSentenceIds: [s(1)], explanation: "将来被视作正常的是原则，不是倡导者本人。" },
    { expression: "it", sentenceId: s(2), referent: "Futurist poetry", targetSentenceIds: [s(2)], explanation: "on which it is based中的which是theory，it是以该理论为基础的诗歌。" },
    { expression: "This", sentenceId: s(3), referent: "冒号后未来主义者的说法", targetSentenceIds: [s(3), s(4), s(5), s(6), s(7), s(8)], explanation: "向后预告，不机械只寻找上一句名词。" },
    { expression: "This speeding up of life", sentenceId: s(5), referent: "前面被转述的生活状况加速", targetSentenceIds: [s(3)], explanation: "把先前过程名词化为本句主语。" },
    { expression: "them", sentenceId: s(8), referent: "sounds", targetSentenceIds: [s(8)], explanation: "words模仿sounds；them是被模仿对象。" },
    { expression: "they both", sentenceId: s(10), referent: "一名土耳其军官和一名保加利亚军官", targetSentenceIds: [s(10)], explanation: "both将两名军官一起作为fall的主语。" },
    { expression: "This", sentenceId: s(11), referent: "上句所示诗行与写法", targetSentenceIds: [s(10)], explanation: "把具体例子接到作者的文学性评价。" },
    { expression: "their", sentenceId: s(12), referent: "未来主义者", targetSentenceIds: [s(3), s(5)], explanation: "their first proposition是他们的一般理论原则，并非作者赞同全部形式规则。" },
    { expression: "this", sentenceId: s(13), referent: "冒号后的直接问题", targetSentenceIds: [s(13)], explanation: "向后指我们是否本质上改变，不把问题改成已确认的事实。" },
  ],
  timeline: [
    { label: "今天与未来的评价", event: "第1句区分今天看来不合理和若干年后可能获认可，两者不是确定发展规律。", evidence: [e(1, "their principles may seem today", "当前观感"), e(1, "in years to come they may be regarded as normal", "未来可能性")] },
    { label: "转述中的过去一世纪与如今", event: "第3句从一个世纪的加速过程说到如今的生活状态；这是未来主义者的说法，未提供可换算的具体起止年份。", evidence: [e(3, "for a century", "持续时段"), e(3, "till now we live in a world of noise and violence and speed", "当前状态")] },
  ],
  voices: [
    { speaker: "未来主义者", claim: "生活和情感改变，需要新的表达方式，并据此提出语词与印刷实验。", boundary: "says明确是转述；作者后来追问人是否真的本质改变，不能把全部前提视作作者已认可。", evidence: [e(3, "what the Futurist says", "来源标志"), e(5, "says the Futurist", "再次注明观点归属")] },
    { speaker: "注释中的故事与被引诗行", claim: "注释讲两名军官在桥上战斗并坠河；诗行展示拟声和体重数字。", boundary: "注释内容与实际诗行是不同层；文章用其落差作评论，不作为真实战斗记录。", evidence: [e(10, "to read in the explanatory notes", "注释来源"), e(10, "the line consists of the noise of their falling and the weights of the officers", "诗行实际内容")] },
    { speaker: "作者", claim: "先了解新艺术的目标，但未来主义作品仍很难称作文学；保留一般表达原则并追问前提。", boundary: "不把may be right改成明确肯定，也不把质疑前提改成否认一切艺术革新。", evidence: [e(2, "it can hardly be classed as Literature", "作品评价"), e(12, "no thinking man can refuse to accept their first proposition", "认可范围"), e(13, "have we essentially changed?", "未决追问")] },
  ],
};
