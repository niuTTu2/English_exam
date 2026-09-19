import type { WordKnowledge } from "./knowledge-base";
const k = (pattern: string, meaning: string, grammarRole: string, rule: string): WordKnowledge => ({ grammarRole, grammarSummary: rule, structures: [{ pattern, meaning, rule }] });
// 每项按真实来源复核；同一个词在题干、选项和正文中可以承担不同关系。
const sources: Record<string, Record<string, WordKnowledge>> = {
  "p3-s1": {
    it: k("it is advisable to ...; it is possible that ...", "做某事可取；某事可能发生", "形式主语", "两处it均预占后置真正主语的位置：先是不定式to find out，后是that内容从句。"),
    what: k("find out what ... are aiming at", "查明其目标", "内容从句内的介词宾语", "what引出find out的宾语从句，并作末尾at的宾语；主语是its advocates。"),
    however: k("however + adjectives + subject + may seem", "无论显得多么……", "让步程度副词", "however修饰farfetched and unreasonable，整组从句是让步状语；不能按然而这一句间连接义读。"),
    for: k("statement, for + reason", "提出判断，再说明理由", "原因并列连词", "for连接建议和理由；后面不是一个名词性的介词宾语。"),
    come: k("in years to come", "在未来岁月里", "后置定语中的不定式", "to come修饰years，表示将来，不是come的过去分词作定语。"),
  },
  "p3-s2": {
    however: k("With regard to ..., however, ...", "谈到……，不过……", "句间转折副词", "however独立插入，转到未来主义诗歌的难题；没有however+形容词的让步程度结构。"),
    whatever: k("whatever Futurist poetry may be", "无论未来主义诗歌是什么", "外层让步，内层表语", "整组修饰主句判断而作让步状语；whatever在内部作be的表语。"),
    which: k("the theory on which it is based", "诗歌所依据的理论", "关系代词作介词宾语", "which回指theory并作on的宾语；it回指Futurist poetry，诗歌以理论为基础。"),
    it: k("it is based; it can hardly be classed", "诗歌以……为基础；诗歌几乎不能归类为……", "有具体先行对象的代词", "两处it均指Futurist poetry，后面没有后置真正主语。"),
    class: k("can hardly be classed as Literature", "几乎不能归入文学", "情态被动与类别补足", "classed为过去分词，hardly把肯定判断弱化到近乎否定；as引出类别。"),
  },
  "p3-s3": {
    what: k("This is what the Futurist says", "这就是未来主义者所说的", "表语从句内的宾语", "what从句作is的表语，内部what作says的宾语，the Futurist是主语。"),
    till: k("till now we live ...", "直到如今我们生活在……", "时间从句连接词", "till引出含we live完整主谓的从句，now是从句时间状语；不要在now后截断范围。"),
    speed: k("have been speeding up; a world of ... speed", "一直在加速；充满速度的世界", "动词词形与名词同句对照", "speeding与have been构成完成进行时，speed在句尾与noise和violence并列为名词。"),
    for: k("for a century", "持续一个世纪", "时间长度介词", "for加一段时间，配合have been speeding up表示持续范围；不是原因连词。"),
  },
  "p3-s5": { speed: k("This speeding up of life requires ...", "这种生活加速要求……", "动名词化的主语中心", "speeding up及of life整体作主语，requires用单数；插入语says the Futurist说明观点来源。") },
  "p3-s6": { interpret: k("want to interpret modern stress", "想表现现代压力", "不定式中的及物动词", "interpret以modern stress为对象，谈文学如何表现现代感受；relieve则是减轻压力，语义不同。") },
  "p3-s7": { unhampered: k("unhampered by stops, or qualifying adjectives, or finite verbs", "不受标点、修饰性形容词或限定动词束缚", "补充状态的分词形容词", "by后有三个并列成分。qualifying和finite各有限定范围，不能删去后说完全不用形容词和动词。") },
  "p3-s8": {
    will: k("at will", "随意地", "固定介词短语中的名词", "will意为意愿，整个at will修饰shorten or lengthen，不表示将来时。"),
    type: k("many sizes of type", "多种印刷字号", "不可数名词", "type在此是印刷字体，of type限定sizes，不是键入文字这一动词。"),
    they: k("words that imitate them", "模仿这些声音的词", "宾格代词的回指", "实际词形them作imitate宾语并指sounds；that作从句主语并指words。"),
  },
  "p3-s9": { confuse: k("descriptions are confused", "描述混乱", "形容词表语", "confused说明descriptions的混乱状态；不补入使作者困惑这一原文没有的施事结构。") },
  "p3-s10": {
    it: k("it is upsetting to read ... and then to find ...", "读到……再发现……令人不适", "两个并列真正主语的形式占位", "to read和to find并列，it为形式主语；第二项不属于read后that从句内部。"),
    which: k("a bridge, off which they both fall into the river", "他们从那座桥落入河中", "关系代词作off宾语", "which回指bridge，off标起点，into标终点；they both指两名军官。"),
    fall: k("they both fall; the noise of their falling", "两人坠落；他们坠落的声音", "有限谓语与动名词对照", "fall是关系从句谓语，falling在their falling中名词化为动作；their说明动作执行者。"),
    consist: k("the line consists of A and B", "诗行由A和B组成", "不及物动词与of补足", "of后为the noise of their falling及the weights of the officers两项；consist不接直接宾语，不用被动。"),
    note: k("in the explanatory notes", "在解释性的注释中", "名词及其前置修饰", "notes是复数名词，explanatory说明注释用途；整个介词短语修饰read。"),
  },
  "p3-s11": { it: k("though it fulfills ...", "尽管它符合……", "有具体所指的代词", "it指This所回指的诗行写法，是fulfills的主语；与第10句形式it不同。") },
  "p3-s12": {
    that: k("the proposition that a great change ... calls for ...", "变化需要相应表达变化这一主张", "同位语内容连接词", "that解释proposition的内容，不代proposition作内部主语；内部主语是a great change。"),
    call: k("a great change ... calls for a change of expression", "巨大变化需要表达变化", "动词介词搭配", "calls for表示要求、需要；作者认可这一原则，但尚未确认人本质变化的前提。"),
  },
  "p3-s13": { have: k("have we essentially changed?", "我们是否已经从根本上改变？", "直接疑问句中的完成时助动词", "have前置到主语we之前，与changed构成现在完成时；不是实义动词拥有。") },
  "question-19-option-A": { approach: k("approaches to art", "艺术方面的方法", "名词及其介词补足", "approaches是复数名词，to后接art名词；不是approach作动词直接接近某物。") },
  "question-19-option-B": { review: k("a review of Futurist poetry", "对未来主义诗歌的评论", "名词与评论对象", "a表明review是可数名词，of poetry指定评述对象；这里不表示复习。") },
  "question-20-prompt": { novel: k("a novel literary idea", "新颖的文学观念", "形容词前置修饰", "novel和literary分别限定idea的新颖性与所属领域；novel不是小说名词。") },
  "question-21-option-B": { to: k("use poetry to relieve modern stress", "用诗歌缓解现代压力", "目的不定式标记", "use poetry构成主动作，to relieve说明目的；relieve支配modern stress。") },
  "question-21-option-D": { use: k("avoid using adjectives and verbs", "避免使用形容词和动词", "动名词作宾语", "avoid直接接using动名词；using内部接两个并列名词宾语，不改成avoid to use。") },
  "question-22-option-C": { indicative: k("indicative of a basic change in human nature", "表明人性根本变化的", "形容词与of补足", "indicative是形容词，of后是所表明的内容；in human nature限定change的范围。") },
  "question-22-option-D": { more: k("more of a transient phenomenon than literature", "与其说是文学，不如说更像短暂现象", "类别比较的程度成分", "more of A than B比较类别归属，不比较数量；transient是选项用词，原文没有给具体寿命。") },
};
export function getPassage3WordKnowledge(headword: string, sourceId?: string) { return sourceId ? sources[sourceId]?.[headword] : undefined; }
