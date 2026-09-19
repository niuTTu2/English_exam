import type { ErrorCategory, GrammarConceptId, PracticeTask } from "./learning-model";

const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, hintWords: string[]): PracticeTask =>
  ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType: "clause-boundary", hintWords, mapRevealsAnswer: false });
const link = (id: string, prompt: string, pairs: Array<[string, string]>, evidence: string, feedback: string, conceptId: GrammarConceptId, hintWords: string[], errorType: ErrorCategory = "attachment"): PracticeTask =>
  ({ id, revision: 1, kind: "link", prompt, links: pairs.map(([source, target]) => ({ source, target })), options: [...new Set(pairs.map(([, target]) => target))], answer: JSON.stringify(pairs.map(([, target]) => target)), evidence, feedback, conceptId, errorType, hintWords, mapRevealsAnswer: false });

export const translation2012Practice: Record<number, PracticeTask[]> = {
  1: [
    range("time-background", "划出When引导的完整背景从句，不包括主句they。", "When people in developing countries worry about migration", "从When读到migration；people作主语，worry作谓语，逗号之后they重新开启主句。", "clause-time", ["When", "people", "worry", "about", "they", "worry about migration"]),
    link("source-and-direction", "将原文片段连接到可靠解释，不把瑕疵当作规范范例。", [
      ["migration", "泛指人口迁移，本词未限定移入或移出"],
      ["their best and brightest departure", "连接不规范；依workers和brain drain语境理解人才离开"],
      ["to Silicon Valley", "离开后的目的地之一，不是出发地"],
    ], "migration, they are usually concerned at the prospect of their best and brightest departure to Silicon Valley", "方向来自departure与to目的地；人才离开的语境可解释，但原本拟用的规范英文不能由此唯一恢复。", "lexical-context", ["migration", "best", "brightest", "departure", "prospect", "their", "to", "silicon", "valley", "concerned at the prospect", "their best and brightest departure", "Silicon Valley"], "vocabulary"),
  ],
  2: [
    { ...range("outer-relative", "划出修饰workers的完整that从句，保留其中的方式短语和内层从句。", "that countries like Britain, Canada and Australia try to attract by using immigration rules that privilege college graduates", "外层从句从第一个that到graduates；by短语说明吸引方式，内部that privilege college graduates修饰rules，仍属于外层范围。", "clause-relative", ["that", "workers", "kind", "try", "attract", "by", "using", "rules", "privilege", "try to attract", "by using immigration rules", "privilege college graduates"]), leaksToTaskIds: ["relative-jobs"] },
    { ...link("relative-jobs", "将两层关系和移民方向分别接准。", [
      ["that countries like Britain, Canada and Australia try to attract", "that回指workers，在attract处作宾语"],
      ["that privilege college graduates", "that回指rules，作privilege的主语"],
      ["immigration", "接收国视角：人口移入本国"],
    ], "that countries like Britain, Canada and Australia try to attract by using immigration rules that privilege college graduates", "第一层已有countries作主语；内层规则优待毕业生，因此内层that作主语。内层从句位于by方式短语中，外层须将它一起包含。", "clause-relative", ["that", "workers", "rules", "privilege", "attract", "immigration", "by using immigration rules", "privilege college graduates"]), leaksToTaskIds: ["outer-relative"] },
  ],
  3: [
    link("finding-and-probability", "把研究的发现、概率程度和迁移方向分层连接。", [
      ["have found", "主句现在完成时：研究已有发现"],
      ["particularly likely", "尤其可能，并非所有人已经或必然出国"],
      ["to emigrate", "likely的不定式补足语：从本国移居国外"],
    ], "have found that well-educated people from developing countries are particularly likely to emigrate", "完成时属于研究的发现；are likely表达可能性，to emigrate不是新有限从句。emigrate从来源国看向外移居。", "nonfinite-infinitive", ["have", "found", "are", "particularly", "likely", "to", "emigrate", "particularly likely to emigrate"]),
  ],
  4: [
    { ...link("percentage-denominators", "将两项比例和时间各自接到正确口径。", [
      ["nearly 40% of emigrants", "移居国外者为分母，受教育程度超过高中者占近40%"],
      ["around 3.3% of all Indians over the age 25", "全部超过25岁的印度人为分母，达到同一教育水平者约占3.3%"],
      ["in 2004", "调查时间，不是所有移民的离境年份"],
    ], "A big survey of Indian households in 2004 found that nearly 40% of emigrants had more than a high-school education, compared with around 3.3% of all Indians over the age 25", "两项分子都受超过高中教育这一条件约束，分母不同。over the age 25保留原文瑕疵；规范写法另列over the age of 25，不将of补入原文。", "comparison-scope", ["survey", "households", "in", "nearly", "emigrants", "had", "more", "than", "education", "compared", "with", "around", "all", "Indians", "over", "age", "of", "more than a high-school education", "compared with around 3.3%", "over the age 25"], "translation"), leaksToTaskIds: ["comparison-order"] },
    { id: "comparison-order", revision: 1, kind: "order", prompt: "按先调查、后发现、再比较的路线排列中文意群，保留各自分母。", options: ["2004年一项针对印度家庭的大型调查发现", "移居国外者中近40%的人", "受教育程度超过高中", "相比之下，全部超过25岁的印度人中达到这一水平的约占3.3%"], answer: JSON.stringify(["2004年一项针对印度家庭的大型调查发现", "移居国外者中近40%的人", "受教育程度超过高中", "相比之下，全部超过25岁的印度人中达到这一水平的约占3.3%"]), evidence: "nearly 40% of emigrants had more than a high-school education, compared with around 3.3% of all Indians over the age 25", feedback: "先建立调查，再给移民群体中的教育比例，最后补比较群体。‘达到这一水平的’为中文补出的共享教育条件，不另造英文有限从句。", conceptId: "comparison-scope", errorType: "translation", hintWords: ["found", "nearly", "emigrants", "had", "more", "than", "education", "compared", "with", "around", "Indians", "over", "of", "more than a high-school education", "compared with around 3.3%", "over the age 25"], mapRevealsAnswer: false, leaksToTaskIds: ["percentage-denominators"] },
  ],
  5: [
    link("trunk-and-duration", "把主干三部分接准，再理解持续时间。", [
      ['This "brain drain"', "主语：前文所说的人才外流现象"],
      ["has long bothered", "谓语：长期以来一直困扰，long修饰持续时间"],
      ["policymakers in poor countries", "宾语：贫穷国家的政策制定者"],
    ], 'This "brain drain" has long bothered policymakers in poor countries', "主语是人才外流，受困扰的是政策制定者。has与bothered构成完成时，long为时间副词，句中没有有限从句。", "basic-svo", ["This", "brain", "drain", "has", "long", "bothered", "policymakers", '"brain drain"', "has long bothered"]),
  ],
  6: [
    { ...range("whole-contribution", "划出修饰workers的整个who从句，包含最后供工厂生产的结构。", "who could have taught at their universities, worked in their hospitals and come up with clever new products for their factories to make", "who直到make都是人才本可提供的贡献；could have统领三项，最后for不定式限定products，并未开启新有限从句。", "clause-relative", ["workers", "who", "could", "have", "taught", "worked", "come", "for", "factories", "to", "make", "could have taught", "for their factories to make"]), leaksToTaskIds: ["shared-modal", "referents-and-maker"] },
    { ...link("shared-modal", "为三个并列动作确认共同的情态完成式范围。", [
      ["taught at their universities", "could have taught：本可以在本国大学任教"],
      ["worked in their hospitals", "could have worked：本可以在本国医院工作"],
      ["come up with clever new products", "could have come up with：本可以构想新产品"],
    ], "could have taught at their universities, worked in their hospitals and come up with clever new products", "共同的could have覆盖taught、worked、come三个过去分词；失去的是来源国的潜在贡献，不是断言这些人在任何国家都没做过这些工作。", "parallel-structure", ["could", "have", "taught", "worked", "come", "and", "up", "with", "could have taught", "come up with clever new products"], "tense"), leaksToTaskIds: ["whole-contribution"] },
    { ...link("referents-and-maker", "分别连接代词所指和制造结构的逻辑角色。", [
      ["They", "政策制定者：担忧的主体"],
      ["it", "人才外流：hurts的主语"],
      ["them", "贫穷国家：失去人才的一方"],
      ["their factories", "make的逻辑主语：生产产品的工厂"],
      ["products", "make的逻辑宾语：供工厂生产的东西"],
    ], "They fear that it hurts their economies, depriving them of much-needed skilled workers who could have taught at their universities, worked in their hospitals and come up with clever new products for their factories to make", "They与them在此不能机械同指；for their factories to make是位于who从句末尾的非有限不定式结构，factories制造products，不是因为工厂要制造。", "nonfinite-subject", ["They", "it", "them", "their", "depriving", "of", "products", "for", "factories", "to", "make", "depriving them of much-needed skilled workers", "for their factories to make"], "reference"), leaksToTaskIds: ["whole-contribution"] },
  ],
};
