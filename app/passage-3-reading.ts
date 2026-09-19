import type { SentenceReadingGuide } from "./data";

// 人工核对：用户2000.pdf第3页；原卷异常措辞仍保留在正文与翻译说明中。
export const passage3Reading: Record<string, SentenceReadingGuide> = {
  "p3-s1": {
    focus: "两组it都先占主语位置；先弄清目标的建议，与原则未来可能获认可的理由要分开。",
    questions: [
      { question: "先弄清的是什么，为什么不是直接接受新原则？", evidence: "to find out what its advocates are aiming at", answer: "find out的对象是what引出的目标内容。作者建议了解倡导者想达到什么，并未在此要求接受他们的原则。" },
      { question: "however这组话是否推翻未来被认可的可能？", evidence: "however farfetched and unreasonable their principles may seem today", answer: "它承认今天可能显得牵强不合理，仍保留后面的未来可能性。however带两个表语提前；真正主语是their principles，谓语是may seem。" },
      { question: "they回指谁，may表达确定结果吗？", evidence: "that in years to come they may be regarded as normal", answer: "they回指principles，不是advocates；may只说这些原则将来可能被视为正常，不保证新运动一定成功。" },
    ],
    timeline: [{ label: "今天与将来", explanation: "today管may seem；in years to come管may be regarded。两个评价时点不同，未来结果只是可能。" }],
  },
  "p3-s2": {
    focus: "无论诗歌算什么、即使理论可能正确，这两层让步都不能消除作者对作品文学性的保留。",
    questions: [
      { question: "whatever这一组是说诗歌究竟是什么，还是让主句继续成立？", evidence: "whatever Futurist poetry may be", answer: "这里表示‘无论未来主义诗歌究竟是什么’，给后面的几乎不能算文学设置让步背景。whatever在从句内部作be的表语；整组在句外作让步状语，两种层次不能混为‘让步表语从句’。" },
      { question: "哪一层修饰theory，哪一层才是作者的主要判断？", evidence: "even admitting that the theory on which it is based may be right", answer: "on which it is based只修饰theory，it指Futurist poetry；that整组是admitting的内容。even admitting是在让步假设下退一步，主要判断仍在后面的it can hardly be classed as Literature。" },
    ],
  },
  "p3-s3": {
    focus: "冒号以后转述未来主义者的解释；它不是作者已经认可的事实结论。",
    questions: [
      { question: "This和what分别把读者带向哪里？", evidence: "This, in brief, is what the Futurist says", answer: "This预告冒号后的整段说法；what the Futurist says作is的表语，what又是says的宾语。先认清说话者，才不会把下一段主张都算成作者观点。" },
      { question: "持续多久、到什么状态，分别由哪两组话表达？", evidence: "for a century, past conditions of life have been conditionally speeding up, till now we live in a world of noise and violence and speed", answer: "for a century给加速过程一个世纪的持续范围；till引出的后半句写直到如今生活于什么环境。原卷确为past conditions和conditionally，不能静默改成其他英语；原文没有解释具体是哪一种条件。" },
    ],
    timeline: [{ label: "转述中的一个世纪到如今", explanation: "have been ... speeding up表示从过去延续到转述所称的现在；now属于原文语境，不换算成今天，也不虚构具体年份。" }],
  },
  "p3-s4": {
    focus: "Consequently继续未来主义者的推理：外部生活加快，所以内在感受也相应变化。",
    questions: [{ question: "corresponding为什么不能只孤立译成‘相应的’？", evidence: "our feelings, thoughts and emotions have undergone a corresponding change", answer: "它把这种变化接回上句生活条件的加速；have undergone是及物谓语，a corresponding change是宾语。整句仍承接未来主义者的说法，作者在结尾会追问变化是否真的到了本质层面。" }],
  },
  "p3-s5": {
    focus: "中间的says the Futurist只标出观点来源；主干动词是requires。",
    questions: [{ question: "删去哪一组后，可以直接看到要求与原因？", evidence: "This speeding up of life, says the Futurist, requires a new form of expression", answer: "暂时拿掉says the Futurist，便得到生活加速要求新表达形式。插入语用says在前、the Futurist在后的倒装，并不把Futurist改成requires的主语。" }],
  },
  "p3-s6": {
    focus: "if限定主张的适用条件；interpret说的是表现现代压力，并非消除压力。",
    questions: [
      { question: "文学为什么‘也’要加速？", evidence: "We must speed up our literature too", answer: "too接回前面生活加速与新表达形式的要求。must表示未来主义者认为必要；speed up后直接带our literature这个宾语，不能据此解释为增加文学作品的数量。" },
      { question: "to interpret是全句的独立谓语吗？", evidence: "if we want to interpret modern stress", answer: "从句的限定谓语是want；to interpret补足想做什么，modern stress是interpret的宾语。表达压力不等于用诗歌缓解或消除压力。" },
    ],
  },
  "p3-s7": {
    focus: "过去分词补充的是不受哪些表达形式束缚；三个并列项目须保持同级。",
    questions: [
      { question: "unhampered引出三个从句，还是三个阻碍来源？", evidence: "unhampered by stops, or qualifying adjectives, or finite verbs", answer: "by后并列的是stops、qualifying adjectives和finite verbs三个名词组；不是三个从句，也不是adjectives和verbs解释stops。qualifying是修饰性的，finite表示有时态等限定形式的动词。" },
      { question: "有限谓语在哪里，unhampered为什么不是另一项过去时？", evidence: "We must pour out a large stream of essential words, unhampered", answer: "限定谓语是must pour out。unhampered表示不受妨碍的状态，补充倾吐词语时不受这些形式限制；它没有另立主语和时态。" },
    ],
  },
  "p3-s8": {
    focus: "分号分开两组主干；后半句use与shorten or lengthen共用we must。",
    questions: [
      { question: "模仿声音的是谁，them又指谁？", evidence: "words that imitate them", answer: "that代words，在定语从句中作imitate的主语；them回指前面的sounds。创造的是能模仿声音的词，声音并不是模仿者。" },
      { question: "后半句为什么没有在shorten前再写must？", evidence: "we must use many sizes of type and different colored inks on the same page, and shorten or lengthen words at will", answer: "use与shorten or lengthen是同级动作，共用we和must；不能把shorten理解为inks后的定语。type在此是印刷字体，inks是墨水，两个宾语组都由use支配。" },
    ],
  },
  "p3-s9": {
    focus: "confused说明描写呈现混乱；它是表语，不是说作者感到困惑。",
    questions: [{ question: "是谁‘混乱’，为什么不是人被弄糊涂？", evidence: "their descriptions of battles are confused", answer: "主语中心是复数descriptions，of battles说明描写对象；are接confused说明这些文字的状态。their指未来主义者，不能把descriptions误解为正在描述的动作。" }],
  },
  "p3-s10": {
    focus: "先读注释、再看诗行的两项发现形成落差；长宾语从句和桥上的定语从句须逐层分开。",
    questions: [
      { question: "什么使人upsetting，it指前文哪件东西吗？", evidence: "it is a little upsetting to read", answer: "it先占形式主语位置，真正评价的是to read...和并列的to find...两个动作内容。a little限定upsetting程度，不能把it直接当作桥、战斗或某名军官。" },
      { question: "off which回到哪个名词，掉落的起点与终点怎样区分？", evidence: "on a bridge off which they both fall into the river", answer: "which回指bridge；off which说明从桥上离开、掉下的起点，into the river说明掉落终点。they both是前面两名军官，不是bridge与river。" },
      { question: "注释描述的故事与诗行实际内容为何要分开？", evidence: "the line consists of the noise of their falling and the weights of the officers", answer: "consists of后并列两个组成部分：坠落声和军官体重；冒号引出的拟声与数字是展示该诗行。作者利用注释中的完整打斗故事与诗行实际内容的落差评价作品，不能把注释误认为诗行原句。" },
    ],
  },
  "p3-s11": {
    focus: "符合流派自己的规则，与被作者认可为文学，是两个不同判断。",
    questions: [{ question: "though里的肯定是否让主句变成肯定评价？", evidence: "though it fulfills the laws and requirements of Futurist poetry", answer: "从句承认作品符合未来主义诗歌的规则；主句仍用hardly保留近否定判断。This回指刚举的诗行，laws在此是创作规则，不是国家法律。" }],
  },
  "p3-s12": {
    focus: "no与refuse组合表示不能拒绝这个原则；承认原则不等于确认它的前提已经发生。",
    questions: [
      { question: "no thinking man can refuse to accept是在否定还是认可主张？", evidence: "no thinking man can refuse to accept their first proposition", answer: "没有思考者能够拒绝接受，合起来是在认可这项原则。限定谓语can refuse后接to accept；proposition是accept的对象，不要把多个动作全部压成一个没有内部结构的谓语。" },
      { question: "冒号后的that从句是在限制哪一种主张吗？", evidence: "that a great change in our emotional life calls for a change of expression", answer: "它直接说出proposition的内容，属于同位说明；that不在从句内充当主语或宾语。从句只提出情感大变需要表达变化的关系，下一句仍可追问我们究竟有没有本质变化。" },
    ],
  },
  "p3-s13": {
    focus: "冒号后保留直接问句的倒装；作者在追问变化前提，未断言人性已经改变。",
    questions: [{ question: "为什么不能把have we直接改成we have写进主干？", evidence: "The whole question is really this: have we essentially changed?", answer: "this预告后面的具体问题；have we essentially changed是独立直接疑问句，have前置而changed仍在后面。解释时可译成‘我们是否改变’，原文和删减主干仍须保留原词序；essentially限定本质层面。" }],
  },
};
