import type { BeginnerClauseDetail, BeginnerSyntaxComponent, Question, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";

const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const clause = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, details: Array<[string, string]>): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails: details.map(([fn, text]) => ({ function: fn, text })), translationOrder: "先理解本组主语和谓语，再把宾语或表语接回；题干空缺由选项补足，不改写题干原文。" });
const timeClause = clause("When a novel literary idea appears", "时间状语从句", "When", "限定人们应尝试了解目标的时间背景", "a novel literary idea", "appears", []);
const when = c("When a novel literary idea appears", "when时间从句", "时间状语从句", "people should try", "novel修饰idea，意为新颖的，不是小说。", [c("a novel literary idea", "名词短语", "从句主语", "appears", "中心idea，novel和literary分别说明新颖与文学领域。"), c("appears", "一般现在时动词", "从句谓语", "a novel literary idea", "出现，不带宾语。")]);
const make = (base: SentenceAnalysis, components: BeginnerSyntaxComponent[], colors: SyntaxVisualRole[], trunk: string, focus: string, clauses: BeginnerClauseDetail[] = [], phrase = false): SentenceAnalysis => withReviewedSyntax({ ...base, trunk, textKind: phrase ? "phrase" : "sentence", beginnerSyntax: { components, clauses }, layers: [{ label: "语言关键", text: focus }], grammar: [focus], logic: "先按本项实际文字理解含义，选入与排除另看题目证据。" }, colors);
const np = (text: string, center: string, explanation: string, children?: BeginnerSyntaxComponent[]) => c(text, "名词短语", "短语中心及限定", center, explanation, children);
const object = (text: string, verb: string, explanation: string, children?: BeginnerSyntaxComponent[]) => c(text, "名词短语", "宾语", verb, explanation, children);
const verb = (text: string, explanation: string) => c(text, "动词原形", "待接入题干的动作中心", "承接题干to或must", explanation);

export function passage3QuestionAnalysis(question: Question): QuestionAnalysis {
  const old = question.analysis!;
  const p = old.prompt!, o = old.options!;
  let prompt: SentenceAnalysis;
  const options: Record<string, SentenceAnalysis> = {};
  let answer: SentenceAnalysis;
  if (question.id === 19) {
    const main = [c("This passage", "名词短语", "主语", "is", "this指全文。"), c("is", "系动词", "谓语", "This passage", "表语待选项补足。"), c("mainly", "副词", "范围限定状语", "is及待选内容", "问主要对象与性质，不能只看局部信息。")];
    prompt = make(p, main, ["subject", "predicate", "modifier"], "This passage is mainly", "题干是等待表语补全的主系表框架，保留原卷句末句号，不自行增添空格词。");
    options.A = make(o.A!, [np("a survey", "survey", "中心名词表示调查或概览。"), c("of new approaches to art", "介词短语", "调查对象限定", "survey", "approaches是多种方法，to art限定所涉及领域。", [c("to art", "介词短语", "后置补足语", "approaches", "approach to说明对某领域的方法。")])], ["complement", "modifier"], "a survey of new approaches to art", "a survey of是调查对象；new修饰approaches，不是某篇文章标题。", [], true);
    options.B = make(o.B!, [np("a review", "review", "名词review在此是评论、评述。"), c("of Futurist poetry", "介词短语", "评论对象限定", "review", "poetry为不可数名词，Futurist限定流派。")], ["complement", "modifier"], "a review of Futurist poetry", "a review说明文章性质，of说明评述对象。", [], true);
    options.C = make(o.C!, [c("about", "介词", "表语短语的介词中心", "题干is", "后接讨论对象。"), c("merits of the Futurist movement", "名词及of限定", "介词宾语", "about", "讨论有关优点的话题，没有独立谓语。", [c("of the Futurist movement", "介词短语", "所属限定", "merits", "优点属于未来主义运动。")])], ["complement", "object"], "about merits of the Futurist movement", "about支配merits，of短语修饰merits，不能把of短语当主语。", [], true);
    options.D = make(o.D!, [c("about", "介词", "表语短语的介词中心", "题干is", "后接讨论对象。"), c("laws and requirements of literature", "并列名词及of限定", "介词宾语", "about", "laws和requirements并列，of literature共同限定二者。", [c("of literature", "介词短语", "领域限定", "laws and requirements", "限定文学的一般规则和要求。")])], ["complement", "object"], "about laws and requirements of literature", "讨论对象是文学规则及要求；语法解释保持该范围。", [], true);
    answer = make(old.answer!, [...main, c("a review of Futurist poetry", "名词短语", "表语", "is", "说明全文是一篇诗歌评论。")], ["subject", "predicate", "modifier", "complement"], "This passage is a review of Futurist poetry", "本补全示例用名词短语作表语，mainly单独作为范围副词。");
  } else if (question.id === 20) {
    const main = [when, c("people", "复数名词", "主语", "should try", "泛指遇到新文学观念的人。"), c("should try", "情态动词加动词", "谓语", "people", "should表示建议，try表示尝试。")];
    prompt = make(p, [...main, c("to", "不定式标记", "待补不定式起点", "try", "动词原形由选项提供，不把单独to编成完整谓语。")], ["modifier", "subject", "predicate", "complement"], "people should try to", "When给时间背景；should try to后由选项接动词原形。", [timeClause]);
    for (const [key, action, content, meaning] of [["A", "determine", "its purposes", "查明目标；its指新文学观念。"], ["B", "ignore", "its flaws", "忽略缺陷；flaws是缺点，不是目标。"], ["C", "follow", "the new fashions", "追随新的潮流，fashions为复数。"], ["D", "accept", "the principles", "接受这些原则，the把对象指回有关观念。"]]) options[key] = make(o[key as "A"]!, [verb(action, meaning), object(content, action, meaning)], ["complement", "object"], `${action} ${content}`, `${action}直接带名词宾语，承接题干to后构成不定式，不是独立祈使命令。`, [], true);
    answer = make(old.answer!, [...main, c("to determine its purposes", "不定式短语", "不定式补足语", "try", "determine支配its purposes，说明尝试弄清什么。", [object("its purposes", "determine", "目标属于新观念。")])], ["modifier", "subject", "predicate", "complement"], "people should try to determine its purposes", "不定式整体补足try，内部又有determine及其宾语。", [timeClause]);
  } else if (question.id === 21) {
    const main = [c("Futurists", "复数名词", "主语", "claim", "指提出主张的未来主义者。"), c("claim", "一般现在时动词", "谓语", "Futurists", "引出他们的主张，不自动代表作者认可。")];
    const content = "that we must";
    prompt = make(p, [...main, c(content, "待补完整的that内容从句", "宾语从句", "claim", "we是从句主语，must后的实义动词由选项补足。")], ["subject", "predicate", "object"], "Futurists claim that we must", "claim引出宾语从句，must后接选项中的动词原形。", [clause(content, "宾语从句", "that", "claim的内容；原题省略must后的动作", "we", "must（实义动词待选项补足）", [])]);
    options.A = make(o.A!, [verb("increase", "提高、增加数量。"), object("the production of literature", "increase", "production强调产出量，of literature限定文学产品。")], ["complement", "object"], "increase the production of literature", "increase production指增加产量；production是名词，不能当作produce的屈折词形。", [], true);
    options.B = make(o.B!, [verb("use", "使用。"), object("poetry", "use", "作为工具的诗歌。"), c("to relieve modern stress", "不定式短语", "目的状语", "use poetry", "relieve意为缓解，不等于interpret表现。", [object("modern stress", "relieve", "被缓解的是现代压力。")])], ["complement", "object", "modifier"], "use poetry to relieve modern stress", "use poetry是动作和对象；to relieve说明目的。", [], true);
    options.C = make(o.C!, [verb("develop", "发展、形成。"), object("new modes of expression", "develop", "modes指方式，of expression说明表达方面。", [c("of expression", "介词短语", "领域限定", "modes", "表达方式。")])], ["complement", "object"], "develop new modes of expression", "new modes是新的方式，不是新的作品数量。", [], true);
    options.D = make(o.D!, [verb("avoid", "避免，后接名词或动名词。"), c("using adjectives and verbs", "动名词短语", "宾语", "avoid", "using支配两个并列名词；选项省去了原文的qualifying和finite限定。", [object("adjectives and verbs", "using", "两个词类并列，不额外补入限定范围。")])], ["complement", "object"], "avoid using adjectives and verbs", "avoid doing中using是动名词，不能改成avoid to use；按选项本身理解为形容词和动词。", [], true);
    const full = "that we must develop new modes of expression";
    answer = make(old.answer!, [...main, c(full, "that内容从句", "宾语从句", "claim", "主张我们必须发展表达方式。", [c("we", "代词", "从句主语", "must develop", "主张中的行动者。"), c("must develop", "情态动词及动词", "从句谓语", "we", "must后接原形。"), object("new modes of expression", "develop", "所发展的表达方式。")])], ["subject", "predicate", "object"], "Futurists claim that we must develop new modes of expression", "外层claim与内层must develop是两套主谓，不拆散完整内容从句。", [clause(full, "宾语从句", "that", "claim的内容", "we", "must develop", [["宾语", "new modes of expression"]])]);
  } else {
    const main = [c("The author", "名词短语", "主语", "believes", "询问作者自己的评价。"), c("believes", "一般现在时动词", "谓语", "The author", "第三人称单数，后接内容从句。")];
    const content = "that Futurist poetry is";
    prompt = make(p, [...main, c(content, "待补表语的that内容从句", "宾语从句", "believes", "Futurist poetry是从句主语，is后的表语由选项提供。")], ["subject", "predicate", "object"], "The author believes that Futurist poetry is", "宾语从句内是待补全的主系表，不能把poetry当believes的直接宾语。", [clause(content, "宾语从句", "that", "believes的内容；表语待选项补足", "Futurist poetry", "is", [])]);
    options.A = make(o.A!, [c("based", "过去分词", "待接is的被动成分", "题干Futurist poetry", "接is构成is based，单独选项没有完整时态。"), c("on reasonable principles", "介词短语", "依据补足语", "based", "on引出依据，reasonable修饰principles。")], ["complement", "modifier"], "based on reasonable principles", "be based on表示以某物为基础；reasonable是对原则的正面评价。", [], true);
    options.B = make(o.B!, [c("new and acceptable", "并列形容词", "待补表语", "题干is", "new与acceptable同级。"), c("to ordinary people", "介词短语", "接受者补足语", "acceptable", "表示对普通人而言可接受，to后不是动词。")], ["complement", "modifier"], "new and acceptable to ordinary people", "两个形容词共同说明诗歌性质，to短语不能修饰new。", [], true);
    options.C = make(o.C!, [c("indicative", "形容词", "待补表语", "题干is", "表示表明、显示某事的。"), c("of a basic change in human nature", "介词短语", "内容补足语", "indicative", "indicative of引出所表明的内容。", [c("in human nature", "介词短语", "变化领域限定", "a basic change", "范围是人性，不仅是写法变化。")])], ["complement", "modifier"], "indicative of a basic change in human nature", "indicative是形容词，不是indicate的限定动词；of后指称人性的根本变化。", [], true);
    options.D = make(o.D!, [c("more of a transient phenomenon", "比较性分类短语", "待补表语", "题干is", "more of表示更像某一类；transient修饰phenomenon，意为短暂的。"), c("than literature", "比较补充", "类别比较基准", "more of a transient phenomenon", "比较现象和文学两个类别，并非比较作品数量。")], ["complement", "modifier"], "more of a transient phenomenon than literature", "more of A than B表达与其说B不如说A的分类侧重；短暂性是选项的概括推断，原文没有给出持续年限。", [], true);
    const full = "that Futurist poetry is more of a transient phenomenon than literature";
    answer = make(old.answer!, [...main, c(full, "that内容从句", "宾语从句", "believes", "完整表达分类比较。", [c("Futurist poetry", "名词短语", "从句主语", "is", "被判断的对象。"), c("is", "系动词", "从句谓语", "Futurist poetry", "连接类别比较。"), c("more of a transient phenomenon than literature", "比较性分类短语", "表语", "is", "两种类别比较，不断言原文给了具体寿命。")])], ["subject", "predicate", "object"], "The author believes that Futurist poetry is more of a transient phenomenon than literature", "补全句展示该选项怎样进入题干，选项成立的证据及推断强度另见解析。", [clause(full, "宾语从句", "that", "believes的内容", "Futurist poetry", "is", [["表语", "more of a transient phenomenon than literature"]])]);
  }
  if (question.id === 22) {
    options.D = { ...options.D!, literal: "比起文学，更像一种短暂现象。", natural: "与其说是文学，不如说更像一种短暂现象。" };
    answer = { ...answer, literal: "作者认为未来主义诗歌比起文学更像一种短暂现象。", natural: "作者认为，未来主义诗歌与其说是文学，不如说更像一种短暂现象。" };
  }
  return { prompt, options, answer };
}
