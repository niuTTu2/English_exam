/**
 * Corpus-wide A–F editorial review. Exact source wording remains unchanged.
 * Forms link equivalent core senses; ambiguous old labels require a checked
 * source (and, where necessary, expression). Composite dictionary paragraphs
 * remain available as notes and never invent frequency for their component senses.
 */
import type { ReviewedSenseTable, ReviewedSenseAnnotations } from "./reviewed-sense-types";

export const reviewedSensesAF: ReviewedSenseTable = {
  "abandon": [
    {"id": "abandon", "pos": "v", "meaning": "放弃；舍弃", "forms": [["v.", ["放弃", "放弃；舍弃"]], ["v.（过去分词）", ["舍弃"]]]},
  ],
  "able": [
    {"id": "able", "pos": "adj", "meaning": "能够的；有能力的", "forms": [["adj.", ["有能力的", "能够的", "能够的；有能力的"]]]},
  ],
  "above": [
    {"id": "prior-text", "pos": "adv", "meaning": "在上文", "forms": [["adv.", ["在上文"]]], "fromNotes": [["adv./prep.", "在上面；上文"]]},
    {"id": "higher", "pos": "prep", "meaning": "在……上面", "forms": [], "fromNotes": [["adv./prep.", "在上面；上文"]]},
    {"id": "higher", "pos": "adv", "meaning": "在上面", "forms": [], "fromNotes": [["adv./prep.", "在上面；上文"]]},
  ],
  "abstract": [
    {"id": "summary", "pos": "n", "meaning": "摘要", "forms": [], "fromNotes": [["n. / v.", "摘要； 提取、抽象概括。本文为抽象艺术的形容词。"]]},
    {"id": "extract", "pos": "v", "meaning": "提取；抽象概括", "forms": [], "fromNotes": [["n. / v.", "摘要； 提取、抽象概括。本文为抽象艺术的形容词。"]]},
  ],
  "academic": [
    {"id": "academic", "pos": "adj", "meaning": "学术的；学业的", "forms": [["adj.", ["学业的；学术的", "学术的；学业的"]], ["adj.", ["学业的；学术的"]]], "sources": [["question-200122-option-D", "adj./n.", "学术的；学术人员"], ["question-200124-option-D", "adj./n.", "学术的；学术人员"]], "fromNotes": [["adj./n.", "学术的；学术人员"]]},
    {"id": "academic-person", "pos": "n", "meaning": "学术人员", "forms": [], "fromNotes": [["adj./n.", "学术的；学术人员"]]},
  ],
  "accept": [
    {"id": "accept", "pos": "v", "meaning": "接受", "forms": [["v.", ["接受", "接受；接纳"]]]},
  ],
  "acceptable": [
    {"id": "acceptable", "pos": "adj", "meaning": "可接受的；合意的", "forms": [["adj.", ["可接受的", "可接受的；合意的"]]]},
  ],
  "access": [
    {"id": "access", "pos": "n", "meaning": "获得或使用的机会；使用权", "forms": [["n.", ["获得或使用的机会", "获得或使用的机会；使用权"]]], "sources": [["2001-p2-s7", "n./v.", "接入机会；使用权"], ["2001-p2-s8", "n./v.", "接入机会；使用权"]], "fromNotes": [["n./v.", "接入机会；使用权"]]},
  ],
  "according": [
    {"id": "according-to", "pos": "prep", "meaning": "按照；根据", "forms": [["prep.", ["按照；根据"]], ["prep. phrase component", ["按照；根据", "根据；按照"]], ["prep. phrase part", ["根据；据……所示"]], ["prep.短语组成成分", ["根据"]]], "sources": [["question-15-prompt", "复合介词组成", "根据"], ["question-201031-prompt", "复合介词组成部分", "根据"], ["question-201121-prompt", "fixed-expression component", "根据"], ["question-201123-prompt", "fixed-expression component", "根据"]]},
  ],
  "account": [
    {"id": "explain", "pos": "短语（account for）", "meaning": "解释；说明原因", "forms": [], "fromNotes": [["", "account for：解释；占某比例"]]},
    {"id": "proportion", "pos": "短语（account for）", "meaning": "占（数量或比例）", "forms": [], "fromNotes": [["", "account for：解释；占某比例"]]},
    {"id": "bank", "pos": "n", "meaning": "账户；账号", "forms": [["n.", ["账户；账号"]]], "fromNotes": [["", "银行账户；账目"]]},
    {"id": "finance", "pos": "n", "meaning": "账目；财务记录", "forms": [["n.", ["账目；财务记录"]]], "fromNotes": [["", "银行账户；账目"]]},
    {"id": "description", "pos": "n", "meaning": "叙述；描述；报道", "forms": [["n.", ["叙述；描述；报道", "叙述；说明"]]]},
  ],
  "accumulation": [
    {"id": "accumulation", "pos": "n", "meaning": "积累；累积", "forms": [["n.", ["积累；累积", "积累；累积量"]]]},
  ],
  "achieve": [
    {"id": "achieve", "pos": "v", "meaning": "取得；实现", "forms": [["v.", ["取得；实现"]], ["v.（过去式achieved）", ["取得"]]]},
  ],
  "acquisitive": [
    {"id": "acquisitive", "pos": "adj", "meaning": "贪得的；强烈想占有的", "forms": [["adj.", ["贪得无厌的；强烈想占有的", "贪得的；强烈想占有的", "贪得的；热衷占有的"]]]},
  ],
  "action": [
    {"id": "action", "pos": "n", "meaning": "行动；行为", "forms": [["n.", ["行动；实际作为", "行动；行为"]], ["n.（复数）", ["行动；行为"]]]},
  ],
  "actively": [
    {"id": "actively", "pos": "adv", "meaning": "积极地；主动地", "forms": [["adv.", ["积极地；主动地", "积极地；活跃地"]]]},
  ],
  "address": [
    {"id": "location", "pos": "n", "meaning": "地址；通信地址", "forms": [["n.", ["地址；通信地址"]], ["n.", ["地址"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"], ["n.", "地址；演说"], ["n.", "演说；网络地址。address a problem处理问题。"]]},
    {"id": "speech", "pos": "n", "meaning": "正式讲话；演说", "forms": [["n.", ["正式讲话；演说"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"], ["n.", "地址；演说"], ["n.", "演说；网络地址。address a problem处理问题。"], ["v. / n.", "处理：address a problem处理问题；向……讲话：address an audience向听众讲话； 演说：give an address发表演说。"]]},
    {"id": "speak", "pos": "v", "meaning": "向……讲话；致辞", "forms": [["v.", ["向……讲话；致辞"]], ["v.", ["向……讲话"]], ["v.", ["向……讲话；致辞", "向聚会者讲话"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"], ["v.", "处理问题；向听众讲话；在信封上写地址。"], ["v. / n.", "处理：address a problem处理问题；向……讲话：address an audience向听众讲话； 演说：give an address发表演说。"]]},
    {"id": "write-address", "pos": "v", "meaning": "在……上写地址；寄给", "forms": [["v.", ["在……上写地址；寄给"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"], ["v.", "处理问题；向听众讲话；在信封上写地址。"]]},
    {"id": "call", "pos": "v", "meaning": "称呼", "forms": [["v.", ["称呼"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"]]},
    {"id": "deal-with", "pos": "v", "meaning": "处理；着手解决", "forms": [["v.", ["处理；着手解决"]]], "fromNotes": [["n. / v.", "地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"], ["n.", "演说；网络地址。address a problem处理问题。"], ["v.", "处理问题；向听众讲话；在信封上写地址。"], ["v. / n.", "处理：address a problem处理问题；向……讲话：address an audience向听众讲话； 演说：give an address发表演说。"]]},
  ],
  "admire": [
    {"id": "admire", "pos": "v", "meaning": "钦佩；赞赏", "forms": [["v.", ["钦佩；赞赏"]]], "sources": [["p5-s12", "v.-ed/adj.", "钦佩；赞赏"], ["p5-s2", "v.-ed/adj.", "钦佩；赞赏"], ["question-201217-option-D", "v.-ed/adj.", "钦佩；赞赏"]]},
  ],
  "admit": [
    {"id": "acknowledge", "pos": "v", "meaning": "承认", "forms": [["v.（现在分词）", ["承认"]], ["v.", ["承认"]]], "fromNotes": [["", "承认事实或过错：admit doing/that...；准许进入：admit somebody to a place；收治住院：be admitted to hospital。"], ["v.", "承认；允许进入"]], "sources": [["p3-s2", "v.（现在分词）", "承认"]]},
    {"id": "allow-entry", "pos": "v", "meaning": "准许进入；录取；收治", "forms": [], "fromNotes": [["", "承认事实或过错：admit doing/that...；准许进入：admit somebody to a place；收治住院：be admitted to hospital。"], ["v.", "承认；允许进入"]], "sources": [["2011-writing-a-s1", "v.-ed（被动分词）", "准许进入；录取"]]},
  ],
  "adopt": [
    {"id": "adopt", "pos": "v", "meaning": "采用", "forms": [["v.", ["采用", "采用；采纳"]]]},
  ],
  "adult": [
    {"id": "adult", "pos": "n", "meaning": "成年人", "forms": [["n.", ["成年人"]], ["n.（复数）", ["成年人"]]], "sources": [["2010-cloze-s5", "n./adj.（adult 的本句变形）", "成年人；成年的"], ["question-201008-prompt", "n./adj.（adult 的本句变形）", "成年人；成年的"]], "fromNotes": [["n./adj.", "成年人；成年的"]]},
    {"id": "adult", "pos": "adj", "meaning": "成年的", "forms": [["adj.", ["成年的"]]], "fromNotes": [["n./adj.", "成年人；成年的"]]},
  ],
  "advance": [
    {"id": "progress", "pos": "n", "meaning": "进步；发展", "forms": [["n.", ["进步；发展"]], ["n.", ["进步"]]], "fromNotes": [["n./v.", "进步；推进"]]},
    {"id": "advance", "pos": "v", "meaning": "向前推进；发展", "forms": [["v.", ["发展；向前推进"]]], "fromNotes": [["n./v.", "进步；推进"]]},
  ],
  "advanced": [
    {"id": "advanced", "pos": "adj", "meaning": "高级的；先进的", "forms": [["adj.", ["高级的；先进的", "高级的；程度较深的"]]]},
  ],
  "advantage": [
    {"id": "advantage", "pos": "n", "meaning": "优势；有利条件", "forms": [["n.", ["优势；有利条件"]]], "sources": [["2001-p2-s15", "n./v.", "优势；有利条件；利用"], ["2001-p2-s27", "n./v.", "优势；有利条件；利用"]], "fromNotes": [["n./v.", "优势；有利条件；利用"]]},
    {"id": "use", "pos": "v", "meaning": "利用", "forms": [], "fromNotes": [["n./v.", "优势；有利条件；利用"]]},
  ],
  "advertising": [
    {"id": "advertising", "pos": "n", "meaning": "广告宣传；广告业务", "forms": [["n.", ["广告业务；广告收入来源", "广告宣传", "广告宣传；广告业务"]]]},
  ],
  "adviser": [
    {"id": "adviser", "pos": "n", "meaning": "顾问", "forms": [["n.", ["顾问", "顾问；提供建议的人"]], ["n.（复数）", ["顾问"]]]},
  ],
  "advocate": [
    {"id": "supporter", "pos": "n", "meaning": "倡导者；拥护者", "forms": [["n.（复数）", ["倡导者；拥护者"]]], "fromNotes": [["n./v.", "拥护者；倡导"]]},
    {"id": "advocate", "pos": "v", "meaning": "倡导", "forms": [["v.（现在分词）", ["倡导"]]], "fromNotes": [["n./v.", "拥护者；倡导"]]},
  ],
  "afford": [
    {"id": "afford-do", "pos": "v", "meaning": "负担得起；有条件做", "forms": [], "fromNotes": [["", "afford to do负担得起或有条件做某事。afford a view则是提供视野。"], ["", "afford to do：有能力或经济条件做某事，常与can或cannot连用。"]]},
    {"id": "provide", "pos": "v", "meaning": "提供；给予", "forms": [["v.", ["提供；给予"]]], "fromNotes": [["", "afford to do负担得起或有条件做某事。afford a view则是提供视野。"]], "sources": [["2011-cloze-s1", "v.", "提供；给予"], ["2011-p3-s12", "v.", "提供；给予"]]},
  ],
  "again": [
    {"id": "again", "pos": "adv", "meaning": "再次；又一次", "forms": [["adv.", ["再度", "再次；又一次", "同样；又一次"]], ["adv.", ["再次；又一次", "再次；重新"]]]},
  ],
  "age": [
    {"id": "era", "pos": "n", "meaning": "时代", "forms": [["n.", ["时代"]]], "sources": [["2012-p4-s14", "n./v.", "时代；年龄"], ["p1-s13", "n./v.", "时代；年龄"], ["p1-s25", "n./v.", "时代；年龄"]], "fromNotes": [["n./v.", "时代；年龄"]]},
    {"id": "age", "pos": "n", "meaning": "年龄", "forms": [["n.", ["年龄"]]], "sources": [["2010-p4-s1", "n.", "年龄"], ["2011-p1-s11", "n.", "年龄"], ["2012-p1-s16", "n.", "年龄"], ["2012-p2-s10", "n.", "年龄"], ["2012-translation-s4", "n.", "年龄"], ["p2-s14", "n.", "年龄"], ["p2-s2", "n.", "年龄"], ["p4-s4", "n./v.", "年龄；时代；变老"], ["question-201036-option-C", "n.", "年龄"]], "fromNotes": [["n./v.", "时代；年龄"]]},
  ],
  "agency": [
    {"id": "agency", "pos": "n", "meaning": "机构；代理机构", "forms": [["n.", ["代理机构", "机构；代理机构", "机构；局"]]]},
  ],
  "agent": [
    {"id": "factor", "pos": "n", "meaning": "作用因素", "forms": [["n.", ["作用因素"]]], "fromNotes": [["n.（因素；代理人）", "作用因素；代理人"]], "sources": [["p2-s10", "n.", "作用因素"]]},
    {"id": "representative", "pos": "n", "meaning": "代理人", "forms": [], "fromNotes": [["n.（因素；代理人）", "作用因素；代理人"]]},
  ],
  "ago": [
    {"id": "ago", "pos": "adv", "meaning": "……以前", "forms": [["adv.", ["……以前", "以前", "以前；之前"]], ["adv.（以前；距今……前）", ["……以前"]]]},
  ],
  "agreement": [
    {"id": "agreement", "pos": "n", "meaning": "赞同；意见一致", "forms": [["n.", ["赞同；一致", "赞同；意见一致"]]]},
    {"id": "accord", "pos": "n", "meaning": "协议；协定", "forms": [], "fromNotes": [["", "可数名词：协议、协定，如 reach an agreement（达成协议）"]]},
  ],
  "aim": [
    {"id": "aim", "pos": "v", "meaning": "以……为目标", "forms": [["v.", ["以……为目标"]], ["v.（aim 的过去分词，构成后置定语）", ["面向；以……为目标"]], ["v.（现在分词）", ["以……为目标"]]], "fromNotes": [["v./n.", "面向；以……为目标"]]},
  ],
  "aimless": [
    {"id": "aimless", "pos": "adj", "meaning": "无目标的；漫无目的的", "forms": [["adj.", ["无目标的", "无目标的；漫无目的的"]]]},
  ],
  "air-conditioned": [
    {"id": "air-conditioned", "pos": "adj", "meaning": "经空调制冷的", "forms": [["adj.", ["经空调制冷的"]], ["adj. / past participle", ["由空调制冷的"]]], "sources": [["2011-translation-s5", "v.-ed（复合过去分词）", "经空调制冷的"]]},
  ],
  "alarm": [
    {"id": "alarm", "pos": "v", "meaning": "使担忧；使惊慌", "forms": [["v.", ["使担忧；使惊慌", "因政策主张感到不安"]]]},
  ],
  "alike": [
    {"id": "alike", "pos": "adv", "meaning": "同样地；两者都", "forms": [["adv.", ["同样地；两者都", "同样地；都"]]]},
  ],
  "allow": [
    {"id": "allow", "pos": "v", "meaning": "允许；使能够", "forms": [["v.", ["使能够；允许", "允许", "允许；使能够"]], ["v.-ed（被动）", ["允许"]]]},
  ],
  "always": [
    {"id": "always", "pos": "adv", "meaning": "总是；一直", "forms": [["adv.", ["始终", "总是", "总是；一直"]]]},
  ],
  "amateur": [
    {"id": "amateur-person", "pos": "n", "meaning": "业余研究者", "forms": [["n.", ["业余研究者"]], ["n.（amateur 的复数）", ["业余研究者；非职业的"]]], "sources": [["2001-p1-s6", "n./adj.", "业余研究者；非职业的"]], "fromNotes": [["n./adj.", "业余研究者；非职业的"]]},
    {"id": "amateur", "pos": "adj", "meaning": "业余的；非职业的", "forms": [["adj.", ["业余的；非职业的"]], ["adj.（名词作定语）", ["业余的；业余者的"]]], "sources": [["2001-p1-s7", "n./adj.", "业余研究者；非职业的"]], "fromNotes": [["n./adj.", "业余研究者；非职业的"]]},
  ],
  "ambition": [
    {"id": "ambition", "pos": "n", "meaning": "抱负；雄心；追求成功的愿望", "forms": [["n.", ["抱负；雄心；追求成功的愿望"]]], "sources": [["p5-s1", "possessive noun form", "抱负；雄心；追求成功的愿望"]]},
  ],
  "american": [
    {"id": "american-person", "pos": "n", "meaning": "美国人", "forms": [["n.", ["美国人", "美国人；美国的"]], ["n.（American 的复数）", ["美国人", "美国人；美国的"]], ["n.（复数Americans）", ["美国人"]], ["n.（复数）", ["美国人"]], ["n.（American 的复数）", ["美国人"]], ["n.", ["美国人"]]], "fromNotes": [["n./adj.", "美国人；美国的"]]},
    {"id": "american", "pos": "adj", "meaning": "美国的", "forms": [["adj.", ["美国人；美国的", "美国的"]], ["adj.（专名组成）", ["美国的"]], ["adj.", ["美国的"]]], "sources": [["2012-p4-s14", "n./adj.", "美国人；美国的"], ["p4-s12", "proper adj./n.", "美国的；美国人"], ["p5-s9", "n./adj.", "美国人；美国的"], ["question-201131-prompt", "adj. / possessive n.（Americans'）", "美国的；美国人的", "american"]], "fromNotes": [["n./adj.", "美国人；美国的"]]},
  ],
  "amid": [
    {"id": "amid", "pos": "prep", "meaning": "在……之中", "forms": [["prep.", ["在……之中", "在……之中；伴随着"]]]},
  ],
  "amount": [
    {"id": "quantity", "pos": "n", "meaning": "数量；总量", "forms": [["n.", ["数量；总量"]]], "sources": [["2001-cloze-s2", "n.", "数量；总量"], ["question-200105-prompt", "n.", "数量；总量"], ["question-201003-option-C", "n./v.（amount 的本句变形）", "数量；总计"]]},
  ],
  "andrew": [
    {"id": "andrew", "pos": "n", "meaning": "安德鲁（人名）", "forms": [["n.", ["安德鲁（人名）"]], ["n.（人名）", ["安德鲁"]], ["proper n.", ["安德鲁（人名）"]]]},
  ],
  "angeles": [
    {"id": "angeles", "pos": "proper-name part", "meaning": "安吉利斯（洛杉矶地名组成部分）", "forms": [["proper-name part", ["安吉利斯（地名组成部分）"]], ["proper-name part.", ["安吉利斯（洛杉矶地名组成部分）"]]], "sources": [["2012-p1-s2", "proper n. component", "洛杉矶（地名组成部分）"]]},
  ],
  "angle": [
    {"id": "angle", "pos": "n", "meaning": "角度；方面", "forms": [["n.", ["角度；方面"]]], "sources": [["p5-s11", "n.（复数）/v.（第三人称单数）", "角度；方面"]]},
  ],
  "answer": [
    {"id": "answer", "pos": "n", "meaning": "答案；解决办法", "forms": [["n.", ["答案", "答案；解决办法"]], ["n. used attributively", ["答题；答案"]], ["n.（作定语）", ["答题；答案"]], ["n.", ["答案；解决办法", "答案；应对办法"]]]},
  ],
  "appeal": [
    {"id": "legal-appeal", "pos": "n", "meaning": "上诉", "forms": [["n.", ["上诉"]], ["n.（复数定语）", ["上诉"]]], "sources": [["2012-p3-s15", "n. / v.", "上诉"]]},
    {"id": "request", "pos": "v", "meaning": "呼吁", "forms": [], "fromNotes": [["v.", "呼吁（appeal for help）；吸引力（have wide appeal）； appeal to有吸引力。"]]},
    {"id": "attraction", "pos": "n", "meaning": "吸引力", "forms": [["n.", ["吸引力"]]], "fromNotes": [["v.", "呼吁（appeal for help）；吸引力（have wide appeal）； appeal to有吸引力。"], ["n./v.", "吸引力；吸引"]]},
    {"id": "attract", "pos": "v", "meaning": "有吸引力", "forms": [], "fromNotes": [["v.", "呼吁（appeal for help）；吸引力（have wide appeal）； appeal to有吸引力。"], ["n./v.", "吸引力；吸引"]]},
  ],
  "apply": [
    {"id": "apply", "pos": "v", "meaning": "应用；适用", "forms": [["v.", ["应用；适用", "适用；应用"]], ["v.（过去分词）", ["应用"]]]},
  ],
  "appoint": [
    {"id": "appoint-person", "pos": "v", "meaning": "任命；指定", "forms": [["v.", ["任命；指定"]]], "sources": [["question-201001-option-B", "v.（appoint 的本句变形）", "任命；指定时间"], ["question-201120-option-B", "v.（appoint 的本句变形）", "任命；指定时间"], ["question-201213-option-B", "v.", "任命；指定"]], "fromNotes": [["v.", "任命；指定时间"]]},
    {"id": "appoint-time", "pos": "v", "meaning": "指定时间", "forms": [], "fromNotes": [["v.", "任命；指定时间"]]},
  ],
  "appreciate": [
    {"id": "value", "pos": "v", "meaning": "欣赏；珍视", "forms": [["v.", ["欣赏；珍视"]]], "fromNotes": [["v.", "欣赏；理解；意识到"]]},
    {"id": "understand", "pos": "v", "meaning": "理解；意识到", "forms": [["v.", ["理解；意识到", "充分理解；考察"]]], "fromNotes": [["v.", "欣赏；理解；意识到"]]},
  ],
  "appreciation": [
    {"id": "understanding", "pos": "n", "meaning": "理解；认识", "forms": [["n.", ["理解；认识"]]], "fromNotes": [["n.", "欣赏；理解；感激"]]},
    {"id": "admiration", "pos": "n", "meaning": "欣赏", "forms": [], "fromNotes": [["n.", "欣赏；理解；感激"]]},
    {"id": "gratitude", "pos": "n", "meaning": "感激", "forms": [], "fromNotes": [["n.", "欣赏；理解；感激"]]},
  ],
  "approach": [
    {"id": "method", "pos": "n", "meaning": "方法；途径", "forms": [["n.", ["方法；途径"]], ["n.", ["做法；方案"]], ["n.（复数）", ["方法；途径"]], ["n.", ["办法；处理方式"]]], "fromNotes": [["n./v.", "方法；接近；处理"]]},
    {"id": "near", "pos": "v", "meaning": "接近", "forms": [], "fromNotes": [["n./v.", "方法；接近；处理"]]},
    {"id": "deal", "pos": "v", "meaning": "看待；处理", "forms": [["v.", ["看待；处理"]]], "fromNotes": [["n./v.", "方法；接近；处理"]]},
  ],
  "appropriate": [
    {"id": "appropriate", "pos": "adj", "meaning": "恰当的；合适的", "forms": [["adj.", ["合适的；恰当的", "合适的；适当的", "恰当的；合适的"]]]},
  ],
  "area": [
    {"id": "field", "pos": "n", "meaning": "领域；范围", "forms": [["n.", ["领域；研究问题", "领域；范围"]], ["n.（area 的复数）", ["领域；范围"]]], "sources": [["2011-p2-s25", "n.", "领域；区域"]]},
    {"id": "region", "pos": "n", "meaning": "地区；区域", "forms": [["n.", ["地区；区域"]]], "sources": [["2011-p4-s16", "n.", "领域；范围"], ["2011-p5-s17", "n.（area 的复数）", "领域；范围"], ["question-201127-option-C", "n.（复数）", "地区"]]},
  ],
  "argue": [
    {"id": "argue", "pos": "v", "meaning": "论证；主张", "forms": [["v.", ["论证；主张"]], ["v.-ing（分词）", ["主张；论证"]], ["v.（第三人称单数）", ["论证；主张"]], ["v.（过去式）", ["主张；声称"]]]},
  ],
  "arise": [
    {"id": "arise", "pos": "v", "meaning": "产生；出现；起因于", "forms": [["v.", ["产生；出现；起因于"]], ["v.（现在分词）", ["产生；起因于"]]]},
  ],
  "arrive": [
    {"id": "arrive", "pos": "v", "meaning": "到来；抵达", "forms": [["v.", ["到来；抵达"]], ["v.（arrive 的本句变形）", ["到来；抵达", "到达；到来"]]]},
  ],
  "article": [
    {"id": "grammar-article", "pos": "n", "meaning": "冠词", "forms": [], "fromNotes": [["", "冠词，如the definite article定冠词。"]]},
    {"id": "clause", "pos": "n", "meaning": "条款", "forms": [], "fromNotes": [["", "协议或法律中的条款，如Article 1第一条。"]]},
    {"id": "text", "pos": "n", "meaning": "文章；论文", "forms": [], "fromNotes": [["", "文章；论文，如a newspaper article报纸文章。"]]},
  ],
  "artwork": [
    {"id": "artwork", "pos": "n", "meaning": "艺术作品；艺术品", "forms": [["n.", ["艺术作品；艺术品", "艺术品"]], ["n.（作名词修饰语）", ["艺术作品"]]]},
  ],
  "asian": [
    {"id": "asian-person", "pos": "n", "meaning": "亚洲人", "forms": [["n.（复数）", ["亚洲人"]]], "fromNotes": [["n./adj.", "亚洲人；亚洲的"]]},
    {"id": "asian", "pos": "adj", "meaning": "亚洲的", "forms": [], "fromNotes": [["n./adj.", "亚洲人；亚洲的"]]},
  ],
  "ask": [
    {"id": "ask", "pos": "v", "meaning": "要求；请求", "forms": [["v.", ["要求；请求", "请求"]], ["v.-ed（完成时分词）", ["要求；请求"]]], "fromNotes": [["v.", "询问；请求"]]},
    {"id": "inquire", "pos": "v", "meaning": "询问", "forms": [], "fromNotes": [["v.", "询问；请求"]]},
  ],
  "assault": [
    {"id": "assault", "pos": "n", "meaning": "袭击", "forms": [["n.（复数）", ["袭击"]]], "fromNotes": [["n./v.", "攻击；袭击；殴打"]]},
    {"id": "assault", "pos": "v", "meaning": "攻击；袭击", "forms": [], "fromNotes": [["n./v.", "攻击；袭击；殴打"]]},
  ],
  "assemble": [
    {"id": "assemble", "pos": "v", "meaning": "集合；召集", "forms": [["v.", ["集合；会合", "集合；召集"]], ["v.（assemble 的本句变形）", ["集合；召集"]]]},
  ],
  "associate": [
    {"id": "connect", "pos": "v", "meaning": "联系；关联", "forms": [["v.", ["联系；关联"]], ["v.-ed（分词定语）", ["联系；使有关联"]], ["v.-ed（被动分词）", ["联系；关联"]]], "sources": [["question-201132-option-C", "past participle（状态表达）", "有关联"], ["question-201133-option-D", "past participle（状态表达）", "有关联"]]},
  ],
  "assume": [
    {"id": "take-form", "pos": "v", "meaning": "呈现；采取形态", "forms": [["v.", ["呈现；采取形态", "呈现；组成", "采取；呈现"]]]},
  ],
  "assure": [
    {"id": "assure", "pos": "v", "meaning": "向……保证；使放心", "forms": [["v.", ["向……保证", "向……保证；使放心"]], ["v.", ["向……保证；使放心", "向某人保证"]]]},
  ],
  "attach": [
    {"id": "attach-importance", "pos": "v", "meaning": "给予；赋予（重要性等）", "forms": [["v.", ["给予；赋予", "给予；赋予（重要性等）", "赋予；给予", "重视（attach importance to）"]]]},
  ],
  "attack": [
    {"id": "attack", "pos": "n", "meaning": "攻击；抨击", "forms": [["n.（复数）", ["攻击；抨击"]]], "fromNotes": [["n./v.", "攻击；抨击"]]},
    {"id": "attack", "pos": "v", "meaning": "攻击；抨击", "forms": [], "fromNotes": [["n./v.", "攻击；抨击"]]},
  ],
  "attempt": [
    {"id": "attempt", "pos": "n", "meaning": "尝试；努力", "forms": [["n.", ["尝试；努力"]], ["n.（复数）", ["尝试"]]]},
  ],
  "attitude": [
    {"id": "attitude", "pos": "n", "meaning": "态度；立场", "forms": [["n.", ["态度", "态度；立场"]]]},
  ],
  "attract": [
    {"id": "attract", "pos": "v", "meaning": "吸引；招引", "forms": [["v.", ["吸引；招引", "吸引；招揽", "招致；引来"]]]},
  ],
  "attraction": [
    {"id": "attraction", "pos": "n", "meaning": "吸引；喜爱", "forms": [["n.", ["吸引；喜爱", "喜爱；偏好"]]]},
  ],
  "attribute": [
    {"id": "attribute-cause", "pos": "v", "meaning": "把……归因于", "forms": [["v.", ["把……归因于"]], ["v.（过去分词）", ["归因"]]], "sources": [["p1-s21", "v./n.", "把……归因于"]], "fromNotes": [["v./n.", "把……归因于"]]},
  ],
  "auction": [
    {"id": "auction", "pos": "n", "meaning": "拍卖；拍卖活动", "forms": [["n.", ["拍卖；拍卖活动"]], ["n.（复数）", ["拍卖活动"]]], "sources": [["2010-p1-s12", "n./v.", "拍卖；拍卖出售"], ["question-201022-option-A", "n./v.（auction 的本句变形）", "拍卖；拍卖出售"], ["question-201024-option-A", "n./v.", "拍卖；拍卖出售"]], "fromNotes": [["n./v.", "拍卖；拍卖出售"]]},
    {"id": "auction", "pos": "v", "meaning": "拍卖出售", "forms": [], "fromNotes": [["n./v.", "拍卖；拍卖出售"]]},
  ],
  "author": [
    {"id": "author", "pos": "n", "meaning": "作者", "forms": [["n.", ["作者"]], ["n.（所有格）", ["作者"]]], "sources": [["question-14-prompt", "n./v.", "作者"]]},
  ],
  "authority": [
    {"id": "officials", "pos": "n", "meaning": "当局", "forms": [["n.", ["当局"]], ["n.（复数）", ["当局"]]], "sources": [["2010-cloze-s5", "n.（复数）", "当局；权威"]], "fromNotes": [["n.", "当局；权威；权限"]]},
    {"id": "authority", "pos": "n", "meaning": "权威；公信力", "forms": [["n.", ["权威；公信力"]], ["n.", ["权威；号召力"]]], "fromNotes": [["n.", "当局；权威；权限"]]},
    {"id": "power", "pos": "n", "meaning": "权限", "forms": [], "fromNotes": [["n.", "当局；权威；权限"]]},
  ],
  "automatic": [
    {"id": "automatic", "pos": "adj", "meaning": "自动的；不假思索的", "forms": [["adj.", ["自动的", "自动的；不假思索的"]]]},
  ],
  "available": [
    {"id": "available", "pos": "adj", "meaning": "可获得的；可使用的", "forms": [["adj.", ["可获得的；可使用的", "可获得；可供应"]]]},
  ],
  "average": [
    {"id": "mean", "pos": "n", "meaning": "平均数；平均水平", "forms": [["n.", ["平均数；平均水平"]]], "sources": [["2010-p1-s14", "n./adj./v.", "平均；平均的"]], "fromNotes": [["adj./n./v.", "平均的；平均数；使平均"]]},
    {"id": "average", "pos": "adj", "meaning": "平均的", "forms": [["adj.", ["平均的", "平均的；趋同的"]]], "fromNotes": [["adj./n./v.", "平均的；平均数；使平均"]]},
    {"id": "average", "pos": "v", "meaning": "使平均", "forms": [], "fromNotes": [["adj./n./v.", "平均的；平均数；使平均"]]},
  ],
  "avoid": [
    {"id": "avoid", "pos": "v", "meaning": "避免", "forms": [["v.", ["避免", "避免；回避", "避免；躲开", "避免；避开"]], ["v.（祈使）", ["避免"]]]},
  ],
  "away": [
    {"id": "away", "pos": "adv", "meaning": "离开；不在场", "forms": [["adv.", ["离开；不参与", "离开；不在场", "远离；不在场"]]]},
  ],
  "baby": [
    {"id": "baby", "pos": "n", "meaning": "婴儿", "forms": [["n.", ["婴儿"]], ["n.（复数babies）", ["婴儿"]], ["n.（复数）", ["婴儿"]]], "sources": [["p4-s4", "n./adj.", "婴儿；婴儿的"]]},
  ],
  "back": [
    {"id": "back", "pos": "adv", "meaning": "向后；回顾", "forms": [["adv.", ["向后；回顾"]]], "sources": [["2012-cloze-s2", "adv./n./adj./v.", "向后；回顾"], ["p1-s20", "adv./n./adj./v.", "向后；回顾"], ["p1-s25", "adv./n./adj./v.", "向后；回顾"], ["question-201208-option-C", "adv./n./adj./v.", "向后；回顾"]], "fromNotes": [["adv./n./adj./v.", "向后；回顾"]]},
  ],
  "badly": [
    {"id": "badly", "pos": "adv", "meaning": "差地；不佳地", "forms": [["adv.", ["差地；不佳地"]], ["adv.（badly的比较级）", ["差地；不佳地"]], ["adv.（worse）", ["更差地"]]]},
  ],
  "balance": [
    {"id": "balance", "pos": "n", "meaning": "平衡", "forms": [["n.", ["平衡"]]], "fromNotes": [["n./v.", "平衡；使平衡"]]},
    {"id": "balance", "pos": "v", "meaning": "使平衡", "forms": [], "fromNotes": [["n./v.", "平衡；使平衡"]]},
  ],
  "balanced": [
    {"id": "balanced", "pos": "adj", "meaning": "均衡的", "forms": [["adj.", ["均衡的", "配置更均衡的"]]]},
  ],
  "ban": [
    {"id": "ban", "pos": "v", "meaning": "禁止", "forms": [["v.", ["禁止"]]], "sources": [["2001-cloze-s1", "v./n.", "禁止"], ["2011-p5-s12", "gerund", "禁止；禁令"], ["question-201141-option-B", "n. / v.", "禁止；禁令"]], "fromNotes": [["v./n.", "禁止；禁令"]]},
    {"id": "prohibition", "pos": "n", "meaning": "禁令", "forms": [["n.", ["禁令"]]], "sources": [["2011-p5-s6", "n. / v.", "禁止；禁令"]], "fromNotes": [["v./n.", "禁止；禁令"]]},
  ],
  "base": [
    {"id": "basis", "pos": "v", "meaning": "以……为基础", "forms": [["v.", ["以……为基础"]], ["v.-ed（past participle）", ["以……为依据"]], ["v.-ed（分词定语）", ["以……为依据", "以……为基础；基础"]], ["v.-ed（后置分词定语）", ["以……为依据"]], ["v.（过去分词）", ["以……为基础"]], ["v.（过去分词，后置定语）", ["以……为基础"]], ["v.-ed（分词定语）", ["以……为基础；基础"]], ["v.-ed（分词定语）", ["以……为依据"]]], "sources": [["p3-s2", "v.-ed/adj.（过去分词；有基础的）", "以……为基础；基础"]], "fromNotes": [["n. / v.", "基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"], ["v./n.", "以……为基础；基础"]]},
    {"id": "foundation", "pos": "n", "meaning": "基础", "forms": [], "fromNotes": [["n. / v.", "基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"], ["n. / v.", "基础：a knowledge base知识库；基地：a military base军事基地； 以某地为基地：be based in a city。"], ["v./n.", "以……为基础；基础"]]},
    {"id": "bottom", "pos": "n", "meaning": "底部", "forms": [], "fromNotes": [["n. / v.", "基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"]]},
    {"id": "headquarters", "pos": "n", "meaning": "基地", "forms": [], "fromNotes": [["n. / v.", "基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"], ["n. / v.", "基础：a knowledge base知识库；基地：a military base军事基地； 以某地为基地：be based in a city。"]]},
    {"id": "locate", "pos": "v", "meaning": "以某地为基地", "forms": [], "fromNotes": [["n. / v.", "基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"], ["n. / v.", "基础：a knowledge base知识库；基地：a military base军事基地； 以某地为基地：be based in a city。"]]},
  ],
  "basic": [
    {"id": "fundamentals", "pos": "n", "meaning": "基础知识；基本事项", "forms": [["n.", ["基础知识；基本事项"]], ["n.（复数basics）", ["基础知识"]], ["n.（复数）", ["基本的；基础事项"]]]},
    {"id": "basic", "pos": "adj", "meaning": "基本的；根本的", "forms": [["adj.", ["基本的；根本的"]]], "sources": [["2001-p2-s16", "adj./n.", "基本的；基础的"]], "fromNotes": [["adj./n.", "基本的；基础的"]]},
  ],
  "battle": [
    {"id": "battle", "pos": "n", "meaning": "战斗；较量", "forms": [["n.", ["战斗；战争", "战斗；较量"]], ["n.（复数）", ["战斗；交战"]], ["n.（比喻）", ["较量；斗争"]]], "fromNotes": [["n./v.", "战斗；交战"]]},
    {"id": "battle", "pos": "v", "meaning": "战斗；交战", "forms": [], "fromNotes": [["n./v.", "战斗；交战"]]},
  ],
  "bear": [
    {"id": "animal", "pos": "n", "meaning": "熊", "forms": [], "fromNotes": [["n.", "熊；此义与承担负担无关。"]]},
    {"id": "tolerate", "pos": "v", "meaning": "承受；承担", "forms": [["v.", ["承受；承担"]]], "fromNotes": [["", "忍受（bear pain）；承担费用（bear the cost）；具有、带有（bear a name）；结果实（bear fruit）。"]]},
    {"id": "carry", "pos": "v", "meaning": "具有；带有", "forms": [], "fromNotes": [["", "忍受（bear pain）；承担费用（bear the cost）；具有、带有（bear a name）；结果实（bear fruit）。"]]},
    {"id": "produce", "pos": "v", "meaning": "结果实", "forms": [], "fromNotes": [["", "忍受（bear pain）；承担费用（bear the cost）；具有、带有（bear a name）；结果实（bear fruit）。"]]},
  ],
  "begin": [
    {"id": "begin", "pos": "v", "meaning": "开始", "forms": [["v.", ["开始"]], ["v.-ed", ["开始"]], ["v.（begin 的第三人称单数）", ["开始"]], ["v.（begin 的过去式）", ["开始"]], ["v.（现在分词）", ["开始"]]], "sources": [["2012-p4-s1", "v.-ing/n.", "开始"]]},
  ],
  "behavior": [
    {"id": "behavior", "pos": "n", "meaning": "行为；举止", "forms": [["n.", ["行为；举止"]], ["n.作定语", ["行为"]]]},
  ],
  "behind": [
    {"id": "position", "pos": "prep", "meaning": "在……后方", "forms": [["prep.", ["在……后方"]]], "fromNotes": [["adv./prep.", "落后；在后面"]]},
    {"id": "lag", "pos": "adv", "meaning": "落后；在后面", "forms": [], "fromNotes": [["adv./prep.", "落后；在后面"]], "sources": [["2001-p2-s8", "adv./prep.", "落后；在后面"], ["2012-p4-s13", "adv./prep.", "落后；在后面"]]},
    {"id": "lag", "pos": "prep", "meaning": "落后于", "forms": [["prep.", ["落后于"]]], "sources": [["question-201239-option-A", "adv./prep.", "落后；在后面"]]},
  ],
  "being": [
    {"id": "linking", "pos": "v", "meaning": "是；处于", "forms": [["v.", ["是；处于"]], ["v.-ing（系动词的动名词形式）", ["处于；是"]]], "sources": [["p2-s1", "gerund（be的动名词）", "是；作为"], ["p2-s19", "participle（非谓语系动词）", "是；处于"], ["question-15-prompt", "gerund", "是；作为"]]},
    {"id": "passive", "pos": "aux", "meaning": "被动结构中的 be 形式", "forms": [["aux.", ["被动结构中的 be 形式"]], ["aux.（现在分词形式）", ["构成进行时被动"]]], "sources": [["2001-p2-s1", "v.-ing（be 的现在分词）", "正在被……；be 的 -ing 形式"], ["p2-s3", "participle（be的现在分词）", "被动结构中的be形式"]], "fromNotes": [["v.-ing（be 的现在分词）", "正在被……；be 的 -ing 形式"]]},
  ],
  "belief": [
    {"id": "belief", "pos": "n", "meaning": "信念；看法", "forms": [["n.", ["信念；看法"]], ["n.（复数）", ["信念；信仰"]]]},
  ],
  "believe": [
    {"id": "believe", "pos": "v", "meaning": "相信；认为", "forms": [["v.", ["相信；认为", "认为", "认为；相信"]], ["v.（believes）", ["相信；认为"]], ["v.（第三人称单数）", ["相信；认为", "认为"]]], "sources": [["question-27-prompt", "v.-ed/adj.", "相信；认为"]]},
  ],
  "below": [
    {"id": "below", "pos": "prep", "meaning": "在……以下；低于", "forms": [], "fromNotes": [["prep./adv.", "在……以下；低于"]], "sources": [["p4-s17", "prep./adv.", "在……以下；低于"]]},
    {"id": "below", "pos": "adv", "meaning": "在下面", "forms": [], "fromNotes": [["prep./adv.", "在……以下；低于"]]},
    {"id": "social-view", "pos": "adv", "meaning": "社会下层视角", "forms": [["adv.", ["社会下层视角"]]], "sources": [["2012-p5-s26", "prep./adv.", "社会下层；民众视角"]]},
  ],
  "benefit": [
    {"id": "benefit", "pos": "n", "meaning": "好处；益处", "forms": [["n.", ["好处；益处"]], ["n.（复数）", ["好处；收益"]]], "sources": [["question-29-option-C", "n.（复数）/v.（第三人称单数）", "受益；益处"]], "fromNotes": [["v./n.", "使受益；利益"]]},
    {"id": "benefit", "pos": "v", "meaning": "使受益；获益", "forms": [["v.", ["使受益；获益", "获益"]]], "fromNotes": [["v./n.", "使受益；利益"]]},
  ],
  "best": [
    {"id": "best", "pos": "adj", "meaning": "最好的；最优秀的", "forms": [["adj.", ["最好的；最优秀的"]], ["adj. used as noun", ["最优秀的"]], ["adj.（最高级）", ["最优秀的"]], ["superlative adj.", ["最佳的"]]], "sources": [["2011-p5-s11", "adj./adv./n.（最高级）", "最优秀的"]], "fromNotes": [["adj./adv./n.（最高级）", "最优秀的"]]},
    {"id": "best", "pos": "adv", "meaning": "最好地", "forms": [["adv.", ["最好地"]], ["adv.（最高级）", ["最优秀的", "最准确地；最好地", "最有效地；最好地", "最贴切地"]]], "fromNotes": [["adj./adv./n.（最高级）", "最优秀的"]]},
    {"id": "best-person", "pos": "n", "meaning": "最优秀的人", "forms": [["n.", ["最优秀的人"]]], "sources": [["p1-s3", "adj./adv./n.（最高级）", "最优秀的"]], "fromNotes": [["adj./adv./n.（最高级）", "最优秀的"]]},
  ],
  "bid": [
    {"id": "bid", "pos": "n", "meaning": "出价；竞价金额", "forms": [["n.", ["出价；竞价金额"]], ["n.（复数）", ["出价；竞价金额"]]], "sources": [["2010-p1-s4", "n./v.（bid 的本句变形）", "竞价；出价"]], "fromNotes": [["n./v.", "竞价；出价"]]},
    {"id": "bid", "pos": "v", "meaning": "竞价；出价", "forms": [], "fromNotes": [["n./v.", "竞价；出价"]]},
  ],
  "big": [
    {"id": "large", "pos": "adj", "meaning": "大的", "forms": [["adj.", ["大的"]], ["adj.", ["大的；宽大的"]], ["adj.", ["大型的"]], ["adj.", ["大型的；规模大的"]]], "sources": [["2010-p1-s12", "adj.（big 的本句变形）", "大的；重要的"]], "fromNotes": [["adj.", "大的；重要的"]]},
    {"id": "important", "pos": "adj", "meaning": "重大的；重要的", "forms": [["adj.", ["重大的；重要的"]]], "sources": [["2010-p1-s17", "adj.（big 的本句变形）", "大的；重要的"], ["2012-p3-s15", "adj.", "大的；重要的"]], "fromNotes": [["adj.", "大的；重要的"]]},
  ],
  "bill": [
    {"id": "legislation", "pos": "n", "meaning": "法案；议案", "forms": [["n.", ["法案；议案"]], ["n.（法案名称组成）", ["法案"]]]},
  ],
  "billion": [
    {"id": "billion", "pos": "num", "meaning": "十亿", "forms": [["num.", ["十亿"]]], "sources": [["2001-p2-s9", "number/n.", "十亿"], ["2010-p1-s6", "number/n.", "十亿"], ["2010-p1-s7", "number/n.", "十亿"], ["2010-p3-s13", "num./n.", "十亿"], ["2010-p3-s2", "num./n.", "十亿"]], "fromNotes": [["number/n.", "十亿"]]},
  ],
  "bind": [
    {"id": "bind", "pos": "v", "meaning": "捆绑", "forms": [], "fromNotes": [["v.", "捆绑；使紧密联系"]]},
    {"id": "connect", "pos": "v", "meaning": "使紧密联系", "forms": [], "fromNotes": [["v.", "捆绑；使紧密联系"]], "sources": [["translation-s32", "v.（过去分词）", "紧密联系"]]},
  ],
  "birth": [
    {"id": "birth", "pos": "n", "meaning": "出生；生育", "forms": [["n.", ["出生；生育"]], ["n.（名词修饰语）", ["出生"]], ["n.（复数births）", ["生育；出生事件"]], ["n.", ["出生；生育", "出生；出生事件"]]]},
  ],
  "blessing": [
    {"id": "blessing", "pos": "n", "meaning": "有益的事；福祉", "forms": [["n.", ["有利的事；福祉", "有益的事；福祉", "福音；有益的事"]]]},
  ],
  "blue": [
    {"id": "blue", "pos": "n", "meaning": "蓝色", "forms": [["n.", ["蓝色"]]], "sources": [["question-201227-option-B", "n./adj.", "蓝色；蓝色的"]], "fromNotes": [["n./adj.", "蓝色；蓝色的"]]},
    {"id": "blue", "pos": "adj", "meaning": "蓝色的", "forms": [], "fromNotes": [["n./adj.", "蓝色；蓝色的"]]},
  ],
  "board": [
    {"id": "board-vehicle", "pos": "v", "meaning": "登上车辆或船只", "forms": [], "fromNotes": [["v.", "登上车辆或船只，如board a plane登机。"]]},
    {"id": "plank", "pos": "n", "meaning": "木板", "forms": [], "fromNotes": [["", "木板；公告板；食宿，如room and board。"]]},
    {"id": "notice-board", "pos": "n", "meaning": "公告板", "forms": [], "fromNotes": [["", "木板；公告板；食宿，如room and board。"]]},
    {"id": "meals", "pos": "n", "meaning": "食宿", "forms": [], "fromNotes": [["", "木板；公告板；食宿，如room and board。"]]},
  ],
  "body": [
    {"id": "body", "pos": "n", "meaning": "身体", "forms": [["n.（复数bodies）", ["身体"]]], "fromNotes": [["n.", "身体；主体"]]},
    {"id": "main-part", "pos": "n", "meaning": "主体", "forms": [], "fromNotes": [["n.", "身体；主体"]]},
  ],
  "book": [
    {"id": "book", "pos": "n", "meaning": "书；著作", "forms": [["n.", ["书；著作"]]], "sources": [["p5-s9", "n.（复数）/v.（第三人称单数）", "书；预订；记录"]], "fromNotes": [["n./v.", "书；预订；记录"]]},
    {"id": "reserve", "pos": "v", "meaning": "预订", "forms": [], "fromNotes": [["n./v.", "书；预订；记录"]]},
    {"id": "record", "pos": "v", "meaning": "记录", "forms": [], "fromNotes": [["n./v.", "书；预订；记录"]]},
  ],
  "boom": [
    {"id": "boom", "pos": "n", "meaning": "繁荣；迅速增长", "forms": [["n.", ["繁荣；蓬勃发展", "繁荣；迅速增长"]]], "sources": [["p4-s4", "n./v.", "繁荣；激增；迅速发展"]], "fromNotes": [["n./v.", "繁荣；激增；迅速发展"]]},
    {"id": "boom", "pos": "v", "meaning": "迅速发展；激增", "forms": [], "fromNotes": [["n./v.", "繁荣；激增；迅速发展"]]},
  ],
  "bottom": [
    {"id": "bottom", "pos": "n", "meaning": "底部；最低点", "forms": [["n.", ["底部；最低点"]]], "sources": [["2010-p1-s15", "n./adj.", "底部；最低点"]], "fromNotes": [["n./adj.", "底部；最低点"]]},
    {"id": "essence", "pos": "n", "meaning": "根本；实质（at bottom）", "forms": [["n.", ["根本；实质（at bottom）"]]], "sources": [["2012-p5-s1", "n./adj.", "根本；实质"]]},
    {"id": "lowest", "pos": "adj", "meaning": "最低的", "forms": [], "fromNotes": [["n./adj.", "底部；最低点"]]},
  ],
  "brain": [
    {"id": "brain", "pos": "n", "meaning": "头脑；人才", "forms": [["n.", ["头脑；人才"]], ["n.（借喻）", ["头脑；智力人才"]]]},
  ],
  "brand": [
    {"id": "brand", "pos": "n", "meaning": "品牌", "forms": [["n.", ["品牌"]]], "sources": [["p5-s7", "n.（复数）/v.（第三人称单数）", "品牌；品牌化"]], "fromNotes": [["n./v.", "品牌；品牌化"]]},
    {"id": "brand", "pos": "v", "meaning": "品牌化", "forms": [], "fromNotes": [["n./v.", "品牌；品牌化"]]},
  ],
  "break": [
    {"id": "rest", "pos": "n", "meaning": "休息间歇", "forms": [], "fromNotes": [["n.", "休息间歇；机会；裂口。"]]},
    {"id": "opportunity", "pos": "n", "meaning": "机会", "forms": [], "fromNotes": [["n.", "休息间歇；机会；裂口。"]]},
    {"id": "gap", "pos": "n", "meaning": "裂口", "forms": [], "fromNotes": [["n.", "休息间歇；机会；裂口。"]]},
    {"id": "shatter", "pos": "v", "meaning": "打破", "forms": [], "fromNotes": [["", "打破；中断；违反，如break a rule违反规则。"]]},
    {"id": "interrupt", "pos": "v", "meaning": "中断", "forms": [], "fromNotes": [["", "打破；中断；违反，如break a rule违反规则。"]]},
    {"id": "violate", "pos": "v", "meaning": "违反", "forms": [], "fromNotes": [["", "打破；中断；违反，如break a rule违反规则。"]]},
  ],
  "brief": [
    {"id": "brief", "pos": "adj", "meaning": "简短的；短暂的", "forms": [], "fromNotes": [["adj. / v. / n.", "简短的；短暂的。 向……介绍基本情况。 任务说明。in brief简言之。"], ["adj./adv.", "简短的；简言之"]], "sources": [["question-201030-option-D", "adj.", "简要的；简短的"]]},
    {"id": "instruct", "pos": "v", "meaning": "向……介绍基本情况", "forms": [], "fromNotes": [["adj. / v. / n.", "简短的；短暂的。 向……介绍基本情况。 任务说明。in brief简言之。"]]},
    {"id": "instructions", "pos": "n", "meaning": "任务说明", "forms": [], "fromNotes": [["adj. / v. / n.", "简短的；短暂的。 向……介绍基本情况。 任务说明。in brief简言之。"]]},
    {"id": "summary", "pos": "n", "meaning": "简要说明", "forms": [["n.（固定结构成分）", ["简要说明"]]], "fromNotes": [["adj. / v. / n.", "简短的；短暂的。 向……介绍基本情况。 任务说明。in brief简言之。"]]},
    {"id": "briefly", "pos": "adv", "meaning": "简言之（in brief）", "forms": [], "fromNotes": [["adj./adv.", "简短的；简言之"]]},
  ],
  "bright": [
    {"id": "light", "pos": "adj", "meaning": "明亮的", "forms": [["adj.", ["明亮的"]]], "fromNotes": [["", "明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"]], "sources": [["2011-cloze-s10", "adj.", "明亮的"]]},
    {"id": "vivid", "pos": "adj", "meaning": "鲜艳的", "forms": [], "fromNotes": [["", "明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"]]},
    {"id": "cheerful", "pos": "adj", "meaning": "欢快的", "forms": [], "fromNotes": [["", "明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"]]},
    {"id": "hopeful", "pos": "adj", "meaning": "有希望的；光明的", "forms": [], "fromNotes": [["", "明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"]], "sources": [["question-201236-option-D", "adj.", "光明的；积极的"]]},
  ],
  "bring": [
    {"id": "bring", "pos": "v", "meaning": "带来", "forms": [["v.", ["带来", "带来；此处bring back为带回"]], ["v.（bring 的本句变形）", ["带来；使聚集"]], ["v.（bring 的过去式/过去分词）", ["带来；使出现"]]]},
  ],
  "build": [
    {"id": "build", "pos": "v", "meaning": "建设；建造", "forms": [["v.", ["建设；建造"]], ["v.-ing（build 的动名词/现在分词）", ["建设；建造"]], ["v.-ing（动名词）", ["建造"]], ["v.（build 的过去式/过去分词）", ["建设；建造", "建造；修建"]], ["v.（动名词）", ["建造"]], ["v.（过去分词built）", ["建造"]], ["v.（过去式built）", ["建造"]], ["v.（build 的过去式/过去分词）", ["建设；建造"]], ["v.（build 的过去式/过去分词）", ["建造；修建"]]], "sources": [["2001-p2-s25", "v./n.", "建设；建造"]], "fromNotes": [["v./n.", "建设；建造"]]},
  ],
  "burden": [
    {"id": "burden", "pos": "n", "meaning": "重担；负担", "forms": [["n.", ["负担", "重担；负担"]]]},
  ],
  "bureau": [
    {"id": "bureau", "pos": "n", "meaning": "机构；办事处", "forms": [["n.", ["办事机构；登记处", "新闻机构；办事处", "机构；办事处"]], ["n.（复数）", ["新闻机构；办事处"]]]},
  ],
  "business": [
    {"id": "commerce", "pos": "n", "meaning": "商业；经营活动", "forms": [["n.", ["商业；经营活动"]], ["n.（前置定语）", ["商业新闻"]]], "sources": [["p1-s16", "不可数名词", "经营活动；生意"], ["p1-s21", "名词作定语", "商业；经济活动"], ["p1-s25", "名词作定语", "商业；企业经营"], ["question-14-option-A", "名词作定语", "商业；经济活动"], ["question-14-option-C", "名词作定语", "企业经营"]]},
    {"id": "enterprise", "pos": "n", "meaning": "企业；工商界", "forms": [["n.", ["企业；工商界", "商业界；企业利益"]], ["n. collective", ["工商界；企业"]], ["n.（复数businesses）", ["企业"]], ["n.（复数，企业）", ["商业界；企业利益"]]], "sources": [["2011-p2-s20", "n.", "企业；经营行业"]]},
    {"id": "industry", "pos": "n", "meaning": "行业", "forms": [["n.", ["报业；报纸经营行业", "行业"]]], "sources": [["question-201129-option-C", "n.", "企业；经营行业"], ["question-201129-prompt", "n.", "企业；经营行业"]]},
  ],
  "buy": [
    {"id": "buy", "pos": "v", "meaning": "购买；收购", "forms": [["v.", ["购买", "购买；收购"]], ["v.-ed（过去式）", ["购买"]], ["v.-ing作定语", ["购买"]], ["v.（-ing形式）", ["购买"]], ["v.（buy 的过去式/过去分词）", ["收购；购买"]], ["v.（过去分词）", ["购买"]]], "sources": [["2001-cloze-s1", "v./n.", "收购；购买"], ["2010-p1-s13", "v./n.（buy 的本句变形）", "购买"]], "fromNotes": [["v./n.", "收购；购买"]]},
  ],
  "call": [
    {"id": "call-out", "pos": "v", "meaning": "高声报出；呼叫", "forms": [["v.", ["高声报出；呼叫"]]], "sources": [["2010-p1-s4", "v./n.（call 的本句变形）", "高声报出；呼叫"]], "fromNotes": [["v./n.", "要求；呼叫；称呼"]]},
    {"id": "call-for", "pos": "v", "meaning": "要求；需要", "forms": [["v.（第三人称单数）", ["要求；需要"]]], "fromNotes": [["v./n.", "要求；呼叫；称呼"]]},
    {"id": "name", "pos": "v", "meaning": "称呼", "forms": [], "fromNotes": [["v./n.", "要求；呼叫；称呼"]]},
  ],
  "capital": [
    {"id": "capital", "pos": "n", "meaning": "资金；资本", "forms": [["n.", ["资金；资本"]], ["n.（所有格）", ["资本；资金"]]], "sources": [["2011-p4-s16", "n./adj.", "资本；建设资金"]], "fromNotes": [["n./adj.", "资本；建设资金"]]},
  ],
  "card": [
    {"id": "card", "pos": "n", "meaning": "卡片；证卡", "forms": [["n.", ["卡片；证卡", "卡；单据"]]]},
  ],
  "care": [
    {"id": "care", "pos": "v", "meaning": "照料；护理", "forms": [["v.", ["照料；护理"]]], "sources": [["question-201020-option-B", "v./n.（care 的本句变形）", "照料；护理"], ["2010-cloze-s13", "v./n.（care 的本句变形）", "照料；照顾", "caring"]], "fromNotes": [["v./n.", "照料；护理"]]},
    {"id": "care", "pos": "n", "meaning": "照料；护理", "forms": [["n.", ["照料；护理"]]], "sources": [["2010-cloze-s13", "v./n.", "照料；照顾", "care"]], "fromNotes": [["v./n.", "照料；护理"]]},
  ],
  "career": [
    {"id": "career", "pos": "n", "meaning": "生涯；职业发展", "forms": [["n.", ["事业；职业发展", "生涯；军旅经历", "生涯；职业发展"]], ["n.（复数）", ["事业；职业发展"]]]},
  ],
  "case": [
    {"id": "situation", "pos": "n", "meaning": "情况；事例", "forms": [["n.", ["个案；情况", "事例；案例", "待研究的事情", "情况；事例", "案例；事例"]], ["n.（项目名称组成）", ["案例"]], ["n.", ["情况；事例"]]], "fromNotes": [["", "案件；情况；箱子"]]},
    {"id": "legal-case", "pos": "n", "meaning": "案件；诉讼案", "forms": [["n.", ["案件；诉讼案"]]], "sources": [["2001-cloze-s1", "n.（case 的本句变形）", "案件；案例"], ["2001-cloze-s2", "n.", "案件；案例"], ["2010-p4-s6", "n.", "案件"], ["question-200101-prompt", "n.（case 的本句变形）", "案件；案例"], ["question-200105-prompt", "n.", "案件；案例"], ["question-200106-prompt", "n.", "案件；案例"]], "fromNotes": [["", "案件；情况；箱子"], ["n.", "案件；病例"]]},
    {"id": "medical-case", "pos": "n", "meaning": "病例", "forms": [["n.", ["病例"]]], "sources": [["2010-cloze-s3", "n.（case 的本句变形）", "病例；情况"], ["2010-cloze-s6", "n.（case 的本句变形）", "病例；情况"], ["2010-cloze-s7", "n.（case 的本句变形）", "病例；情况"], ["question-201009-prompt", "n.（case 的本句变形）", "病例；情况"], ["question-201010-prompt", "n.（case 的本句变形）", "病例；情况"]], "fromNotes": [["n.", "案件；病例"]]},
    {"id": "container", "pos": "n", "meaning": "箱；盒；套", "forms": [["n.", ["箱；盒；套"]]], "fromNotes": [["", "案件；情况；箱子"]]},
  ],
  "category": [
    {"id": "category", "pos": "n", "meaning": "类别；分类", "forms": [["n.", ["类别；分类"]], ["n.（category 的本句变形）", ["类别"]], ["n.（复数）", ["类别；分类"]]]},
  ],
  "cause": [
    {"id": "cause", "pos": "v", "meaning": "造成；导致", "forms": [["v.", ["造成；导致"]], ["v./n.（cause 的本句变形）", ["造成；引起"]], ["v.（过去式caused）", ["导致"]], ["v.（动名词形式）", ["造成；导致"]], ["v.（过去分词）", ["导致；造成"]]], "sources": [["2001-cloze-s4", "v./n.（cause 的本句变形）", "原因；导致"], ["question-200110-prompt", "v./n.（cause 的本句变形）", "原因；导致"]], "fromNotes": [["n./v.", "原因；导致"]]},
    {"id": "cause", "pos": "n", "meaning": "原因", "forms": [["n.", ["原因"]], ["n.（复数）", ["病因；原因"]], ["n.（复数causes）", ["原因"]], ["n.（复数）", ["原因"]]], "fromNotes": [["n./v.", "原因；导致"]]},
  ],
  "celebrate": [
    {"id": "praise", "pos": "v", "meaning": "赞颂；颂扬", "forms": [["v.", ["赞颂；颂扬"]]], "sources": [["2012-p2-s2", "v.", "赞美；颂扬；庆祝"], ["2012-p5-s8", "v.", "赞颂；颂扬"]], "fromNotes": [["v.", "赞美；颂扬；庆祝"]]},
    {"id": "celebrate", "pos": "v", "meaning": "庆祝", "forms": [], "fromNotes": [["v.", "赞美；颂扬；庆祝"]]},
  ],
  "centralization": [
    {"id": "centralization", "pos": "n", "meaning": "集中化", "forms": [["n.", ["集中化", "集中化；集权化"]]]},
  ],
  "century": [
    {"id": "century", "pos": "n", "meaning": "世纪；一百年", "forms": [["n.", ["一百年；世纪", "世纪", "世纪；一百年"]]]},
  ],
  "certain": [
    {"id": "particular", "pos": "adj", "meaning": "某一；某些特定的", "forms": [["adj.", ["某一；某些特定的"]]], "sources": [["2010-p3-s15", "det./adj.", "某些特定的"], ["p3-s1", "adj.", "某一；确定的"], ["p3-s10", "adj.", "某一；确定的"], ["question-201037-option-B", "det./adj.", "某些"]], "fromNotes": [["adj.（确定的）", "某一；确定的"]]},
    {"id": "certain", "pos": "adj", "meaning": "确定的；必然的", "forms": [["adj.（确定的）", ["确定的；必然的"]]], "fromNotes": [["adj.（确定的）", "某一；确定的"]]},
  ],
  "certainly": [
    {"id": "certainly", "pos": "adv", "meaning": "当然；确实", "forms": [["adv.", ["当然；确实", "确实；无疑"]]]},
  ],
  "chairman": [
    {"id": "chairman", "pos": "n", "meaning": "主席；负责人", "forms": [["n.", ["主席", "主席；负责人"]]]},
  ],
  "champion": [
    {"id": "winner", "pos": "n", "meaning": "冠军", "forms": [], "fromNotes": [["n.", "冠军；斗士、捍卫者。a champion of reform改革的支持者。"]]},
    {"id": "supporter", "pos": "n", "meaning": "斗士；捍卫者；支持者", "forms": [], "fromNotes": [["n.", "冠军；斗士、捍卫者。a champion of reform改革的支持者。"]]},
  ],
  "chance": [
    {"id": "opportunity", "pos": "n", "meaning": "机会", "forms": [["n.", ["机会"]], ["n.（chance 的本句变形）", ["人生机会；发展前景"]], ["n.（复数）", ["机会；时机"]]], "sources": [["question-201239-option-C", "n.（chance 的本句变形）", "机会；可能性"]], "fromNotes": [["n./v.", "机会；可能性"]]},
    {"id": "probability", "pos": "n", "meaning": "可能性", "forms": [["n.", ["可能性"]]], "fromNotes": [["n./v.", "机会；可能性"]]},
  ],
  "change": [
    {"id": "change", "pos": "v", "meaning": "改变；变化", "forms": [["v.", ["改变", "改变；变化"]], ["v.（第三人称单数）", ["改变"]], ["v.（过去分词）", ["改变", "改变；变化"]], ["v.（过去分词）", ["改变；变化"]]], "sources": [["2010-p3-s3", "v./n.", "改变"], ["2011-p5-s11", "v./n.", "变化中的；改变"], ["2012-p4-s2", "v./n.", "变化中的；改变"], ["p2-s3", "past participle（changed）", "改变"]], "fromNotes": [["v./n.", "变化中的；改变"]]},
    {"id": "change", "pos": "n", "meaning": "变化", "forms": [["n.", ["变化"]]], "sources": [["2001-p1-s16", "v./n.", "变化中的；改变"], ["question-200123-option-C", "v./n.", "变化中的；改变"]]},
    {"id": "changing", "pos": "adj", "meaning": "变化中的", "forms": [["adj.", ["变化中的"]]], "sources": [["2001-p1-s9", "v.-ing/adj.（change 的现在分词，修饰 definition）", "变化中的；改变"]], "fromNotes": [["v./n.", "变化中的；改变"]]},
    {"id": "exchange", "pos": "v", "meaning": "交换；互换", "forms": [["v.", ["交换；互换"]]], "sources": [["2010-p5-s10", "v.", "交换；改变"]]},
  ],
  "character": [
    {"id": "nature", "pos": "n", "meaning": "性格；特性", "forms": [["n.", ["性格；特性"]]], "fromNotes": [["", "性格；品格；特点；文字或符号，如Chinese characters汉字。"]]},
    {"id": "morality", "pos": "n", "meaning": "品格", "forms": [["n.", ["品格"]]], "fromNotes": [["", "性格；品格；特点；文字或符号，如Chinese characters汉字。"], ["", "（小说电影）角色；品格；文字字符。Chinese characters汉字。"]]},
    {"id": "symbol", "pos": "n", "meaning": "文字；字符", "forms": [], "fromNotes": [["", "性格；品格；特点；文字或符号，如Chinese characters汉字。"], ["", "（小说电影）角色；品格；文字字符。Chinese characters汉字。"]]},
    {"id": "role", "pos": "n", "meaning": "角色；人物形象", "forms": [["n.", ["角色；人物形象"]]], "fromNotes": [["", "（小说电影）角色；品格；文字字符。Chinese characters汉字。"]]},
  ],
  "characterize": [
    {"id": "characterize", "pos": "v", "meaning": "使具有某种特征；描述特点", "forms": [["v.", ["以……为特征；描述特点", "使具有某种特征；描述特点"]], ["v.（过去分词）", ["使具有某种特征"]]]},
  ],
  "chart": [
    {"id": "nautical-map", "pos": "n", "meaning": "海图", "forms": [], "fromNotes": [["n. / v.", "海图：a nautical chart航海图；排行榜：the music charts音乐排行榜； 绘制或记录：chart changes记录变化。"]]},
    {"id": "ranking", "pos": "n", "meaning": "排行榜", "forms": [], "fromNotes": [["n. / v.", "海图：a nautical chart航海图；排行榜：the music charts音乐排行榜； 绘制或记录：chart changes记录变化。"]]},
    {"id": "record", "pos": "v", "meaning": "绘制；记录", "forms": [], "fromNotes": [["n. / v.", "海图：a nautical chart航海图；排行榜：the music charts音乐排行榜； 绘制或记录：chart changes记录变化。"]]},
  ],
  "check": [
    {"id": "inspect", "pos": "v", "meaning": "核查；对照检查", "forms": [["v.", ["核查；对照检查"]]], "fromNotes": [["v./n.", "检查；阻止；核对"]]},
    {"id": "restrain", "pos": "v", "meaning": "遏制；阻止", "forms": [["v.（不定式）", ["遏制；阻止"]]], "fromNotes": [["v./n.", "检查；阻止；核对"]]},
  ],
  "chief": [
    {"id": "chief", "pos": "adj", "meaning": "首席的；最高的", "forms": [["adj.", ["首席的", "首席的；最高的"]], ["adj.", ["首席的；最高的"]]], "sources": [["2010-p1-s15", "adj./n.", "首席的；负责人"]], "fromNotes": [["adj./n.", "首席的；负责人"]]},
    {"id": "leader", "pos": "n", "meaning": "负责人", "forms": [], "fromNotes": [["adj./n.", "首席的；负责人"]]},
  ],
  "choice": [
    {"id": "choice", "pos": "n", "meaning": "选择", "forms": [["n.", ["选择"]]], "sources": [["2010-translation-s2", "n.", "选择"], ["2011-p5-s2", "n.", "选择；被选者"]], "fromNotes": [["n.", "选择；被选者"]]},
    {"id": "chosen", "pos": "n", "meaning": "被选者", "forms": [], "fromNotes": [["n.", "选择；被选者"]]},
  ],
  "chronicle": [
    {"id": "chronicle", "pos": "v", "meaning": "记述；报道", "forms": [["v.-ing（进行时分词）", ["记述；报道"]]], "fromNotes": [["v. / proper n.", "记述；《纪事报》名的组成部分"]]},
    {"id": "newspaper", "pos": "n", "meaning": "《纪事报》（报纸名组成）", "forms": [["proper n.（报纸名称）", ["《纪事报》（报纸名组成）"]]], "fromNotes": [["v. / proper n.", "记述；《纪事报》名的组成部分"]]},
  ],
  "circulation": [
    {"id": "circulation", "pos": "n", "meaning": "流通；循环", "forms": [["n.", ["流通", "流通；循环"]]]},
  ],
  "circumstance": [
    {"id": "circumstance", "pos": "n", "meaning": "情况；条件；环境", "forms": [["n.", ["情况；条件", "情况；条件；环境", "条件；环境"]]]},
  ],
  "citizen": [
    {"id": "citizen", "pos": "n", "meaning": "公民；市民", "forms": [["n.", ["公民", "公民；市民"]], ["n.（复数）", ["公民；市民"]]]},
  ],
  "claim": [
    {"id": "assert", "pos": "v", "meaning": "声称；宣称", "forms": [["v.", ["声称；宣称"]], ["v.（过去分词）", ["声称"]], ["v.", ["主张；声称"]]], "fromNotes": [["v./n.", "声称；主张"]]},
    {"id": "claim", "pos": "n", "meaning": "说法；主张", "forms": [["n.", ["说法；主张"]]], "fromNotes": [["v./n.", "声称；主张"]]},
  ],
  "class": [
    {"id": "classify", "pos": "v", "meaning": "归类", "forms": [["v.", ["归类"]], ["v.-ed（过去分词；被动语态）", ["归类；类别；阶层"]], ["v.（过去分词）", ["归类"]]], "fromNotes": [["v./n.", "归类；类别；阶层"]]},
    {"id": "category", "pos": "n", "meaning": "类别", "forms": [], "fromNotes": [["v./n.", "归类；类别；阶层"]]},
    {"id": "social-class", "pos": "n", "meaning": "阶级；阶层", "forms": [["n.", ["阶级；阶层"]], ["n.", ["阶层；阶级"]], ["n.", ["阶级"]], ["n.（复合定语组成）", ["阶层"]], ["n.（复合修饰组成）", ["阶层"]]], "fromNotes": [["v./n.", "归类；类别；阶层"]]},
  ],
  "classify": [
    {"id": "classify", "pos": "v", "meaning": "分类；归类", "forms": [["v.", ["分类", "分类；归类"]]]},
  ],
  "clean": [
    {"id": "clean", "pos": "adj", "meaning": "干净的", "forms": [["adj.", ["干净的"]]], "fromNotes": [["adj.", "干净的；清白的"]]},
    {"id": "innocent", "pos": "adj", "meaning": "清白的", "forms": [], "fromNotes": [["adj.", "干净的；清白的"]]},
  ],
  "clear": [
    {"id": "clear", "pos": "adj", "meaning": "清楚的；明确的", "forms": [["adj.", ["清楚的；明确的"]]], "sources": [["2010-translation-s2", "adj.", "清楚的；明确的"], ["2011-cloze-s14", "adj./adv./v.", "清楚地；明显地"]]},
    {"id": "clearly", "pos": "adv", "meaning": "清楚地；明显地", "forms": [["adv.", ["清楚地；明显地"]]], "fromNotes": [["adj./adv./v.", "清楚地；明显地"]]},
  ],
  "clearly": [
    {"id": "clearly", "pos": "adv", "meaning": "清楚地；明显地", "forms": [["adv.", ["清楚地；明显地", "清楚地；明确地"]]]},
  ],
  "clever": [
    {"id": "ingenious", "pos": "adj", "meaning": "巧妙的", "forms": [["adj.", ["巧妙的"]]], "fromNotes": [["adj.", "聪明的；巧妙的"]]},
    {"id": "intelligent", "pos": "adj", "meaning": "聪明的", "forms": [], "fromNotes": [["adj.", "聪明的；巧妙的"]]},
  ],
  "climb": [
    {"id": "climb", "pos": "v", "meaning": "攀登；逐步晋升", "forms": [["v.", ["攀登；逐步晋升", "攀登"]]], "fromNotes": [["v./n.", "攀登；逐步晋升"]]},
  ],
  "close": [
    {"id": "close", "pos": "v", "meaning": "关闭；结束", "forms": [["v.", ["关闭；结束", "关闭"]]], "fromNotes": [["v./adj.", "关闭；接近的；结束"]]},
    {"id": "near", "pos": "adj", "meaning": "接近的", "forms": [], "fromNotes": [["v./adj.", "关闭；接近的；结束"]]},
  ],
  "closely": [
    {"id": "closely", "pos": "adv", "meaning": "紧密地；密切地", "forms": [["adv.", ["密切地", "紧密地；密切地"]]]},
  ],
  "coach": [
    {"id": "coach", "pos": "v", "meaning": "训练；指导", "forms": [["v.", ["培训；指导", "训练；指导"]], ["v.", ["训练；指导"]]], "fromNotes": [["n. / v.", "教练；长途客车；旅客车厢。 辅导、训练，不限运动领域。"]]},
    {"id": "trainer", "pos": "n", "meaning": "教练", "forms": [], "fromNotes": [["n. / v.", "教练；长途客车；旅客车厢。 辅导、训练，不限运动领域。"]]},
    {"id": "vehicle", "pos": "n", "meaning": "长途客车；旅客车厢", "forms": [], "fromNotes": [["n. / v.", "教练；长途客车；旅客车厢。 辅导、训练，不限运动领域。"]]},
  ],
  "colgate": [
    {"id": "colgate", "pos": "n", "meaning": "高露洁", "forms": [["n.", ["高露洁"]], ["n.（专名）", ["高露洁"]]], "sources": [["question-201033-option-C", "专名", "高露洁"]]},
  ],
  "collapse": [
    {"id": "collapse", "pos": "v", "meaning": "倒闭；崩溃", "forms": [["v.（过去分词）", ["倒闭；崩溃"]]], "fromNotes": [["v./n.", "倒闭；崩溃"]]},
    {"id": "collapse", "pos": "n", "meaning": "倒闭；崩溃", "forms": [], "fromNotes": [["v./n.", "倒闭；崩溃"]]},
  ],
  "collection": [
    {"id": "collecting", "pos": "n", "meaning": "收藏活动", "forms": [["n.", ["收藏活动"]]], "fromNotes": [["n.", "收藏；藏品"]]},
    {"id": "collected-objects", "pos": "n", "meaning": "藏品", "forms": [], "fromNotes": [["n.", "收藏；藏品"]]},
  ],
  "college": [
    {"id": "college", "pos": "n", "meaning": "大学；高等院校", "forms": [["n.", ["大学；高等院校"]], ["n.（作定语）", ["大学；学院"]]]},
  ],
  "colony": [
    {"id": "colony", "pos": "n", "meaning": "殖民地", "forms": [["n.", ["殖民地"]]], "fromNotes": [["n.", "殖民地；群落"]]},
    {"id": "organism-group", "pos": "n", "meaning": "群落", "forms": [], "fromNotes": [["n.", "殖民地；群落"]]},
  ],
  "color": [
    {"id": "color", "pos": "n", "meaning": "颜色", "forms": [], "fromNotes": [["n./v.", "颜色；给……着色"]]},
    {"id": "color", "pos": "v", "meaning": "给……着色", "forms": [], "fromNotes": [["n./v.", "颜色；给……着色"]]},
  ],
  "colour-code": [
    {"id": "colour-code", "pos": "v", "meaning": "按颜色标记；用颜色分类", "forms": [["v.", ["按颜色标记；用颜色分类", "按颜色编码；用颜色分类"]], ["v.-ed（被动）", ["按颜色标记；按颜色区分性别"]]]},
  ],
  "combat": [
    {"id": "combat", "pos": "v", "meaning": "抗击；与……斗争", "forms": [["v.-ing（combat 的动名词/现在分词）", ["抗击；与……斗争"]]], "fromNotes": [["v./n.", "抗击；与……斗争"]]},
  ],
  "come": [
    {"id": "arrive", "pos": "v", "meaning": "来；到来", "forms": [["v.", ["来；到来"]]], "sources": [["2010-p2-s8", "v.", "来；返回"], ["p3-s1", "v.（不定式）", "到来"], ["p4-s15", "v.（过去分词）", "到来；出现"], ["question-201023-option-D", "v.（不定式）", "到来；出现"]], "fromNotes": [["v.", "到来；出现"]]},
    {"id": "source", "pos": "v", "meaning": "来自", "forms": [["v.", ["来自"]]], "sources": [["2011-p2-s22", "v.", "来自"], ["2011-p3-s16", "v.（过去式）", "来自"], ["p5-s11", "v.", "到来；出现"]]},
    {"id": "assemble", "pos": "v", "meaning": "聚集（come together）", "forms": [["v.", ["聚集（come together）"]]], "sources": [["2001-p1-s14", "v.", "到来；出现"], ["2001-p1-s14", "v.-ing/adj.", "到来；出现"]]},
    {"id": "decrease", "pos": "v", "meaning": "下降（come down）", "forms": [["v.", ["下降（come down）"]]], "sources": [["2010-p1-s7", "v.", "到来；出现"]]},
    {"id": "notice", "pos": "v", "meaning": "引起注意（come to notice）", "forms": [["v.", ["引起注意（come to notice）"]]], "sources": [["2010-cloze-s5", "v.（come 的过去式）", "到来；出现"], ["question-201007-prompt", "v.（come 的过去式）", "到来；出现"]]},
  ],
  "comment": [
    {"id": "comment", "pos": "v", "meaning": "评论；谈到", "forms": [["v.", ["评论；谈到"]]], "sources": [["2010-p2-s3", "v.", "评论道；谈到"], ["question-201001-option-C", "v./n.（comment 的本句变形）", "评论"]], "fromNotes": [["v./n.", "评论"]]},
    {"id": "comment", "pos": "n", "meaning": "评论；意见", "forms": [["n.", ["评论；意见"]], ["n.", ["评论；发言"]]], "fromNotes": [["v./n.", "评论"]]},
  ],
  "commercial": [
    {"id": "advertisement", "pos": "n", "meaning": "广告片", "forms": [["n.", ["广告片"]]], "fromNotes": [["n./adj.", "商业广告；商业的"]]},
    {"id": "commercial", "pos": "adj", "meaning": "商业的", "forms": [["adj.", ["商业的"]]], "fromNotes": [["n./adj.", "商业广告；商业的"]]},
  ],
  "commercialize": [
    {"id": "commercialize", "pos": "v", "meaning": "使商业化", "forms": [["v.", ["使商业化"]]], "sources": [["2001-p2-s7", "v./adj.（commercialize 的过去分词）", "使商业化"]]},
  ],
  "commission": [
    {"id": "committee", "pos": "n", "meaning": "委员会", "forms": [["n.", ["委员会"]]], "fromNotes": [["n.", "委员会；佣金；委托任务。本文为委托设计的动词。"]]},
    {"id": "fee", "pos": "n", "meaning": "佣金", "forms": [], "fromNotes": [["n.", "委员会；佣金；委托任务。本文为委托设计的动词。"], ["v.", "佣金；委托任务； 委托制作或开展某事。"]]},
    {"id": "assignment", "pos": "n", "meaning": "委托任务", "forms": [], "fromNotes": [["n.", "委员会；佣金；委托任务。本文为委托设计的动词。"], ["v.", "佣金；委托任务； 委托制作或开展某事。"]]},
    {"id": "commission", "pos": "v", "meaning": "委托制作或开展某事", "forms": [], "fromNotes": [["v.", "佣金；委托任务； 委托制作或开展某事。"]], "sources": [["2011-p3-s15", "v.-ed（分词定语）", "委托设计或制作"]]},
  ],
  "communication": [
    {"id": "communication", "pos": "n", "meaning": "沟通；交流", "forms": [["n.", ["交流；信息传播", "交流；沟通", "沟通；交流"]]]},
  ],
  "community": [
    {"id": "community", "pos": "n", "meaning": "社群；社区", "forms": [["n.", ["社会群体；社区", "社区；共同体", "社群；社区"]], ["n.（复数）", ["社群；社区"]]]},
  ],
  "commute": [
    {"id": "commute", "pos": "n", "meaning": "通勤", "forms": [["n.（复数）", ["通勤"]]], "fromNotes": [["n./v.", "通勤；往返上下班"]]},
    {"id": "commute", "pos": "v", "meaning": "通勤；往返上下班", "forms": [], "fromNotes": [["n./v.", "通勤；往返上下班"], ["v.", "通勤；减轻刑罚"]]},
    {"id": "reduce-sentence", "pos": "v", "meaning": "减轻刑罚", "forms": [], "fromNotes": [["v.", "通勤；减轻刑罚"]]},
  ],
  "compare": [
    {"id": "compare", "pos": "v", "meaning": "比较；相比", "forms": [["v.", ["比较；相比"]], ["v.-ed（过去分词compared）", ["比较；相比"]], ["v.-ed（过去分词）", ["比较"]], ["v.（过去分词）", ["比较", "相比"]]], "sources": [["p2-s19", "past participle（compared）", "比较"]]},
  ],
  "compensate": [
    {"id": "compensate", "pos": "v", "meaning": "补偿；弥补", "forms": [["v.", ["补偿；弥补", "补偿；抵偿"]]]},
  ],
  "compensation": [
    {"id": "compensation", "pos": "n", "meaning": "补偿；赔偿", "forms": [], "fromNotes": [["", "补偿；赔偿，如compensation for damage损害赔偿。"]]},
  ],
  "compete": [
    {"id": "compete", "pos": "v", "meaning": "竞争；争夺", "forms": [["v.", ["争夺；竞争", "竞争；争夺", "竞争；比肩"]]]},
  ],
  "competitor": [
    {"id": "competitor", "pos": "n", "meaning": "竞争者；竞争对手", "forms": [["n.", ["竞争者；竞争对手"]], ["n.（复数）", ["竞争者"]]]},
  ],
  "complain": [
    {"id": "complain", "pos": "v", "meaning": "抱怨；投诉", "forms": [["v.", ["抱怨", "抱怨；投诉"]]]},
  ],
  "complaint": [
    {"id": "complaint", "pos": "n", "meaning": "投诉；抱怨", "forms": [["n.", ["投诉；抱怨", "抱怨；不满意见", "抱怨；投诉"]]]},
  ],
  "complete": [
    {"id": "complete", "pos": "adj", "meaning": "全面的；完整的", "forms": [["adj.", ["全面的；完整的", "完全的；直接的"]]]},
  ],
  "comply": [
    {"id": "comply", "pos": "v", "meaning": "遵守；依从", "forms": [["v.", ["遵守；依从"]], ["v.（过去式）", ["遵守"]]]},
  ],
  "comprehension": [
    {"id": "comprehension", "pos": "n", "meaning": "理解；理解力", "forms": [["n.", ["理解", "理解；理解力"]]]},
  ],
  "compromise": [
    {"id": "compromise", "pos": "n", "meaning": "妥协；折中", "forms": [["n.", ["妥协；折中"]]], "fromNotes": [["n. / v.", "妥协；折中方案；损害"]]},
    {"id": "compromise", "pos": "v", "meaning": "妥协", "forms": [], "fromNotes": [["n. / v.", "妥协；折中方案；损害"]]},
    {"id": "impair", "pos": "v", "meaning": "损害", "forms": [], "fromNotes": [["n. / v.", "妥协；折中方案；损害"]]},
  ],
  "computer": [
    {"id": "computer", "pos": "n", "meaning": "计算机；电脑", "forms": [["n.", ["计算机；电脑"]], ["n.（复数）", ["计算机"]]]},
  ],
  "concentrate": [
    {"id": "concentrate", "pos": "v", "meaning": "集中", "forms": [["v.", ["集中", "集中注意；重点研究", "集中；主要落在"]], ["v.", ["集中", "集中注意力"]]]},
  ],
  "concept": [
    {"id": "concept", "pos": "n", "meaning": "概念；观念", "forms": [["n.", ["概念", "概念；观念", "理念；概念"]]]},
  ],
  "concern": [
    {"id": "involve", "pos": "v", "meaning": "涉及；与……有关", "forms": [], "fromNotes": [["v./n.", "涉及；与……有关"]]},
  ],
  "condition": [
    {"id": "condition", "pos": "n", "meaning": "状况；条件", "forms": [["n.", ["条件；状况", "状况；条件"]], ["n.（复数）", ["条件；状况", "状况；条件"]], ["n.", ["条件；状况"]], ["n.（复数）", ["状况；条件"]], ["n.（复数）", ["条件；状况"]]], "sources": [["p4-s16", "n.（复数）", "状况；条件；使适应"]], "fromNotes": [["n./v.", "状况；条件；使适应"]]},
    {"id": "condition", "pos": "v", "meaning": "使适应", "forms": [], "fromNotes": [["n./v.", "状况；条件；使适应"]]},
  ],
  "conditionally": [
    {"id": "conditionally", "pos": "adv", "meaning": "有条件地；附带条件地", "forms": [["adv.", ["有条件地", "有条件地；附带条件地"]]]},
  ],
  "confess": [
    {"id": "confess", "pos": "v", "meaning": "承认；坦白", "forms": [["v.", ["坦承", "承认；坦白"]]]},
  ],
  "confide": [
    {"id": "confide", "pos": "v", "meaning": "吐露；信任", "forms": [["v.", ["吐露秘密；信赖", "吐露；信任"]]]},
  ],
  "confidence": [
    {"id": "confidence", "pos": "n", "meaning": "信心；信任", "forms": [["n.", ["信心", "信心；信任"]]]},
  ],
  "conflict": [
    {"id": "conflict", "pos": "v", "meaning": "冲突；抵触", "forms": [["v.", ["冲突；抵触"]], ["v.-ing（定语）", ["相冲突"]]]},
  ],
  "connect": [
    {"id": "connect", "pos": "v", "meaning": "连接；联系", "forms": [["v.", ["把……联系起来", "连接；联系"]], ["v.（connect 的第三人称单数）", ["连接；使互联"]]]},
  ],
  "connection": [
    {"id": "connection", "pos": "n", "meaning": "联系；关联", "forms": [["n.", ["联系；关联", "联系；连接"]]]},
  ],
  "connotation": [
    {"id": "connotation", "pos": "n", "meaning": "隐含义；联想色彩", "forms": [["n.", ["言外之意；附加含义", "隐含义；联想色彩"]]]},
  ],
  "consequence": [
    {"id": "consequence", "pos": "n", "meaning": "后果；结果", "forms": [["n.", ["后果；结果"]], ["n.（复数）", ["后果；影响", "后果；结果"]]]},
  ],
  "consider": [
    {"id": "consider-as", "pos": "v", "meaning": "认为；视为", "forms": [["v.", ["认为；视为"]], ["v.-ed（被动分词）", ["被认为；被视为"]], ["v.（过去分词）", ["被认为"]]], "fromNotes": [["v.", "认为；考虑；把……看作"]]},
    {"id": "consider", "pos": "v", "meaning": "考虑", "forms": [["v.", ["考虑"]]], "sources": [["question-201036-option-D", "v.", "认为；考虑；把……看作"]], "fromNotes": [["v.", "认为；考虑；把……看作"]]},
  ],
  "consume": [
    {"id": "consume", "pos": "v", "meaning": "消耗；消费；摄入", "forms": [["v.", ["消耗", "消耗；消费；摄入"]], ["v.（-ing/动名词形式）", ["消费；消耗；摄入"]]]},
  ],
  "consumer": [
    {"id": "consumer", "pos": "n", "meaning": "消费者", "forms": [["n.", ["消费者"]], ["n.（复数）", ["消费者"]]], "sources": [["p1-s8", "n./adj. component", "消费者；消费类的"]], "fromNotes": [["n./adj. component", "消费者；消费类的"]]},
    {"id": "consumer", "pos": "adj", "meaning": "消费类的", "forms": [], "fromNotes": [["n./adj. component", "消费者；消费类的"]]},
  ],
  "consumption": [
    {"id": "food", "pos": "n", "meaning": "食用；摄入", "forms": [["n.", ["食用；摄入", "食用"]], ["", ["食用"]]]},
  ],
  "contain": [
    {"id": "contain", "pos": "v", "meaning": "包含；容纳", "forms": [["v.", ["包含；容纳"]], ["v.（过去分词）", ["载于；包含于"]]]},
  ],
  "contemporary": [
    {"id": "contemporary", "pos": "adj", "meaning": "当代的", "forms": [["adj.", ["当代的"]]], "sources": [["2010-p1-s11", "adj./n.", "当代的；同代人"]], "fromNotes": [["adj./n.", "当代的；同代人"]]},
    {"id": "contemporary-person", "pos": "n", "meaning": "同代人", "forms": [], "fromNotes": [["adj./n.", "当代的；同代人"]]},
  ],
  "contemptible": [
    {"id": "contemptible", "pos": "adj", "meaning": "可鄙的；令人鄙视的", "forms": [["adj.", ["可鄙的", "可鄙的；令人鄙视的"]]]},
  ],
  "continue": [
    {"id": "continue", "pos": "v", "meaning": "继续", "forms": [["v.", ["继续"]], ["v.（continue 的过去分词）", ["继续"]]], "sources": [["question-18-option-B", "gerund（Continuing）", "继续"]]},
  ],
  "contrast": [
    {"id": "contrast", "pos": "n", "meaning": "对比；对照", "forms": [["n.", ["对比；对照"]]], "sources": [["2012-p5-s13", "n./v.", "对照；反差"], ["question-201112-option-D", "v.", "与……形成对照"]], "fromNotes": [["n./v.", "对照；反差"]]},
    {"id": "contrast", "pos": "v", "meaning": "与……形成对照", "forms": [["v.", ["与……形成对照"]]], "fromNotes": [["n./v.", "对照；反差"]]},
  ],
  "controversy": [
    {"id": "controversy", "pos": "n", "meaning": "争议；公开分歧", "forms": [["n.", ["争议", "争议；公开分歧"]]]},
  ],
  "convention": [
    {"id": "custom", "pos": "n", "meaning": "惯例；习俗", "forms": [], "fromNotes": [["", "惯例、习俗（social conventions社会习俗）；公约、协定（an international convention国际公约）。"], ["n.", "公约；惯例"]]},
    {"id": "treaty", "pos": "n", "meaning": "公约；协定", "forms": [], "fromNotes": [["", "惯例、习俗（social conventions社会习俗）；公约、协定（an international convention国际公约）。"], ["n.", "公约；惯例"]], "sources": [["2001-cloze-s5", "n.", "公约；惯例"], ["question-200113-prompt", "n.", "公约；惯例"], ["question-200114-prompt", "n.", "公约；惯例"]]},
  ],
  "conversation": [
    {"id": "conversation", "pos": "n", "meaning": "交谈；交流", "forms": [["n.", ["交谈；交流", "交谈；交流过程", "交谈；沟通"]]]},
  ],
  "conversational": [
    {"id": "conversational", "pos": "adj", "meaning": "交谈的；交谈方面的", "forms": [["adj.", ["交谈方面的", "交谈的；交谈方面的", "交谈的；适于交谈的"]]]},
  ],
  "core": [
    {"id": "core", "pos": "n", "meaning": "核心；根本", "forms": [["n.", ["核心", "核心；根本"]]]},
  ],
  "corporation": [
    {"id": "corporation", "pos": "n", "meaning": "公司；法人机构", "forms": [["n.", ["公司；企业", "公司；法人机构", "法人机构；公司"]], ["n.（corporation 的复数）", ["公司；大型企业"]]]},
  ],
  "correct": [
    {"id": "correct", "pos": "adj", "meaning": "正确的", "forms": [], "fromNotes": [["adj. / v.", "正确的；纠正"]]},
    {"id": "correct", "pos": "v", "meaning": "批改；纠正", "forms": [["v.", ["批改；纠正"]]], "fromNotes": [["adj. / v.", "正确的；纠正"]]},
  ],
  "correlation": [
    {"id": "correlation", "pos": "n", "meaning": "相关性；关联", "forms": [["n.", ["相关关系；关联", "相关性；关联"]]]},
  ],
  "corresponding": [
    {"id": "corresponding", "pos": "adj", "meaning": "相应的；对应的", "forms": [["adj.", ["相应的", "相应的；对应的"]]]},
  ],
  "cost": [
    {"id": "expense", "pos": "n", "meaning": "成本；费用", "forms": [["n.", ["成本；费用"]]], "sources": [["2011-p4-s13", "n.（复数）/v.（第三人称单数）", "代价；费用；使花费"]], "fromNotes": [["n./v.", "代价；费用；使花费"]]},
    {"id": "sacrifice", "pos": "n", "meaning": "代价", "forms": [["n.（复数）", ["代价"]]], "fromNotes": [["n./v.", "代价；费用；使花费"]]},
    {"id": "cost", "pos": "v", "meaning": "使花费", "forms": [], "fromNotes": [["n./v.", "代价；费用；使花费"]]},
  ],
  "counsel": [
    {"id": "counsel", "pos": "v", "meaning": "建议；劝告", "forms": [["v.-ed", ["建议；劝告"]]], "fromNotes": [["v./n.", "劝告；建议"]], "sources": [["2012-p2-s15", "v.-ed", "建议；劝告"]]},
    {"id": "counsel", "pos": "n", "meaning": "劝告；建议", "forms": [], "fromNotes": [["v./n.", "劝告；建议"]]},
  ],
  "count": [
    {"id": "contribution", "pos": "v", "meaning": "计入；占比重", "forms": [["v.", ["计入；占比重"]]], "sources": [["2012-p1-s14", "v.", "计入；占比重；具有重要性"], ["2012-p1-s3", "v.", "占（成绩）比重"], ["2012-p1-s9", "v.-ing", "计入；占比重；具有重要性"]], "fromNotes": [["v.", "计入；占比重；具有重要性"]]},
    {"id": "number", "pos": "v", "meaning": "数数；计数", "forms": [], "fromNotes": [["n.", "数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"]]},
    {"id": "include", "pos": "v", "meaning": "把……算在内", "forms": [], "fromNotes": [["n.", "数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"]]},
    {"id": "rely", "pos": "v", "meaning": "依靠（count on）", "forms": [], "fromNotes": [["n.", "数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"]]},
    {"id": "importance", "pos": "v", "meaning": "重要；有价值", "forms": [["v.（第三人称单数）", ["重要；有价值"]]], "fromNotes": [["n.", "数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"], ["v.", "计入；占比重；具有重要性"]]},
    {"id": "total", "pos": "n", "meaning": "计数；总数", "forms": [], "fromNotes": [["n.", "数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"]]},
  ],
  "counterpart": [
    {"id": "counterpart", "pos": "n", "meaning": "对应的人或同类事物", "forms": [["n.", ["对应的人或同类事物", "对应的同类事物"]], ["n.（复数）", ["对应的人；同行"]], ["n.", ["对应的人或同类事物", "对应的人或物"]]]},
  ],
  "couple": [
    {"id": "couple", "pos": "n", "meaning": "夫妻；伴侣", "forms": [["n.", ["夫妻；伴侣", "夫妻；一对伴侣"]]]},
  ],
  "course": [
    {"id": "of-course", "pos": "n", "meaning": "当然（of course 的组成部分）", "forms": [["n.", ["当然（of course 的组成部分）"]]], "sources": [["2001-p2-s12", "n.", "过程；课程；当然（of course）"], ["2010-p5-s13", "n.（固定短语中）", "当然（of course中）"], ["p5-s14", "n.", "过程；课程；当然（of course）"]], "fromNotes": [["", "课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"], ["", "课程；路线；一道菜；of course当然。本文为建筑发展的进程。"], ["n.", "过程；课程；当然（of course）"]]},
    {"id": "lessons", "pos": "n", "meaning": "课程", "forms": [["n.", ["课程"]]], "fromNotes": [["", "课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"], ["", "课程；路线；一道菜；of course当然。本文为建筑发展的进程。"], ["n.", "过程；课程；当然（of course）"]]},
    {"id": "route", "pos": "n", "meaning": "路线；航线", "forms": [], "fromNotes": [["", "课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"], ["", "课程；路线；一道菜；of course当然。本文为建筑发展的进程。"]]},
    {"id": "dish", "pos": "n", "meaning": "一道菜", "forms": [], "fromNotes": [["", "课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"], ["", "课程；路线；一道菜；of course当然。本文为建筑发展的进程。"]]},
    {"id": "course", "pos": "n", "meaning": "发展进程；走向", "forms": [["n.", ["发展进程；走向"]], ["n.", ["轨迹；进程"]]], "fromNotes": [["", "课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"], ["", "课程；路线；一道菜；of course当然。本文为建筑发展的进程。"], ["n.", "过程；课程；当然（of course）"]]},
  ],
  "court": [
    {"id": "court", "pos": "n", "meaning": "法院；法庭", "forms": [["n.", ["法院", "法院；法庭"]]]},
  ],
  "cover": [
    {"id": "conceal", "pos": "v", "meaning": "掩盖（cover up）", "forms": [["v.", ["掩盖（cover up）"]]], "sources": [["question-201009-option-D", "v./n.", "覆盖；掩盖"]], "fromNotes": [["v./n.", "覆盖；掩盖"]]},
    {"id": "front-cover", "pos": "n", "meaning": "封面", "forms": [], "fromNotes": [["n.", "封面；掩护。cover costs支付费用，cover a topic涉及话题，take cover寻找掩护。"]]},
    {"id": "shelter", "pos": "n", "meaning": "掩护", "forms": [], "fromNotes": [["n.", "封面；掩护。cover costs支付费用，cover a topic涉及话题，take cover寻找掩护。"]]},
    {"id": "pay", "pos": "v", "meaning": "足以支付", "forms": [], "fromNotes": [["n.", "封面；掩护。cover costs支付费用，cover a topic涉及话题，take cover寻找掩护。"], ["", "覆盖；遮盖；包含、涉及；支付足够费用；走完一段路程。"]]},
    {"id": "include", "pos": "v", "meaning": "涵盖；涉及", "forms": [], "fromNotes": [["n.", "封面；掩护。cover costs支付费用，cover a topic涉及话题，take cover寻找掩护。"], ["", "覆盖；遮盖；包含、涉及；支付足够费用；走完一段路程。"]], "sources": [["2011-p1-s9", "v.", "涵盖；收录"]]},
    {"id": "cover", "pos": "v", "meaning": "覆盖；遮盖", "forms": [], "fromNotes": [["", "覆盖；遮盖；包含、涉及；支付足够费用；走完一段路程。"], ["v./n.", "覆盖；掩盖"]]},
    {"id": "travel", "pos": "v", "meaning": "走完一段路程", "forms": [], "fromNotes": [["", "覆盖；遮盖；包含、涉及；支付足够费用；走完一段路程。"]]},
  ],
  "credit": [
    {"id": "trust", "pos": "n", "meaning": "信用", "forms": [], "fromNotes": [["", "信用；赊购；学分；功劳；认可。本文mobile phone credit为话费额度。"], ["v./n.", "认为有；归功于；信用"]]},
    {"id": "deferred-payment", "pos": "n", "meaning": "赊购", "forms": [], "fromNotes": [["", "信用；赊购；学分；功劳；认可。本文mobile phone credit为话费额度。"]]},
    {"id": "academic-credit", "pos": "n", "meaning": "学分", "forms": [], "fromNotes": [["", "信用；赊购；学分；功劳；认可。本文mobile phone credit为话费额度。"]]},
    {"id": "recognition", "pos": "n", "meaning": "功劳；认可", "forms": [], "fromNotes": [["", "信用；赊购；学分；功劳；认可。本文mobile phone credit为话费额度。"]]},
    {"id": "attribute", "pos": "v", "meaning": "归功于；认为具有", "forms": [["v.", ["归功于；认为具有", "归功于；被认为具有"]]], "fromNotes": [["v./n.", "认为有；归功于；信用"]]},
  ],
  "crest": [
    {"id": "crest", "pos": "n", "meaning": "佳洁士", "forms": [["n.", ["佳洁士"]], ["n.（专名）", ["佳洁士"]]], "sources": [["question-201033-option-B", "专名", "佳洁士"]]},
  ],
  "critic": [
    {"id": "critic", "pos": "n", "meaning": "批评者；反对者", "forms": [["n.", ["批评者；反对者"]]], "sources": [["2012-p3-s11", "n.", "批评者；反对者"], ["p5-s15", "n.（复数）", "批评者；评论家"], ["p5-s9", "n.", "批评者；评论家"]], "fromNotes": [["n.", "批评者；评论家"]]},
    {"id": "reviewer", "pos": "n", "meaning": "评论家", "forms": [], "fromNotes": [["n.", "批评者；评论家"]]},
  ],
  "critical": [
    {"id": "critical", "pos": "adj", "meaning": "批评的", "forms": [["adj.", ["批评的"]]], "fromNotes": [["adj.", "批评的；关键的"]]},
    {"id": "crucial", "pos": "adj", "meaning": "关键的", "forms": [["adj.", ["关键的"]]], "fromNotes": [["adj.", "批评的；关键的"]]},
  ],
  "criticism": [
    {"id": "criticism", "pos": "n", "meaning": "批评；非议", "forms": [["n.", ["批评", "批评；非议"]]]},
  ],
  "crop": [
    {"id": "crop-up", "pos": "v", "meaning": "突然出现（crop up）", "forms": [["v.", ["突然出现（crop up）"]]], "sources": [["2010-cloze-s6", "v./n.", "突然出现（crop up 中的动词）"], ["question-201009-option-B", "v./n.", "突然出现（crop up）"]], "fromNotes": [["v./n.", "突然出现（crop up）"]]},
  ],
  "cross": [
    {"id": "cross", "pos": "v", "meaning": "跨越", "forms": [["v.", ["跨越"]]], "sources": [["2012-p4-s12", "adj.", "跨越"]]},
  ],
  "crucial": [
    {"id": "crucial", "pos": "adj", "meaning": "关键的；至关重要的", "forms": [["adj.", ["关键的", "关键的；至关重要的", "至关重要的"]]]},
  ],
  "cultivate": [
    {"id": "cultivate", "pos": "v", "meaning": "培养；培育", "forms": [["v.", ["培养", "培养；培育"]]]},
  ],
  "cultivation": [
    {"id": "development", "pos": "n", "meaning": "培养", "forms": [["n.", ["培养"]]], "fromNotes": [["n.", "培养；耕作"]]},
    {"id": "farming", "pos": "n", "meaning": "耕作", "forms": [], "fromNotes": [["n.", "培养；耕作"]]},
  ],
  "currency": [
    {"id": "circulation", "pos": "n", "meaning": "流通；通行", "forms": [], "fromNotes": [["", "流通；通行，如gain currency获得传播或接受。"]]},
  ],
  "current": [
    {"id": "current", "pos": "adj", "meaning": "当前的；当时的", "forms": [["adj.", ["当前的", "当前的；当时的", "当时的；当前的"]], ["adj.", ["当时的；当前的"]]], "sources": [["2010-p1-s13", "adj./n.", "当前的；水流"]], "fromNotes": [["adj./n.", "当前的；水流"]]},
    {"id": "flow", "pos": "n", "meaning": "水流", "forms": [], "fromNotes": [["adj./n.", "当前的；水流"]]},
  ],
  "customer": [
    {"id": "customer", "pos": "n", "meaning": "顾客；客户", "forms": [["n.", ["顾客", "顾客；客户"]], ["n.（customer 的复数）", ["顾客；客户"]], ["n.（作前置修饰）", ["顾客；客户"]]]},
  ],
  "customs": [
    {"id": "customs", "pos": "n", "meaning": "风俗；习俗", "forms": [["n.", ["习俗", "风俗；习俗"]], ["n.（复数）", ["风俗；习俗"]]]},
  ],
  "cut": [
    {"id": "reduce", "pos": "v", "meaning": "降低；削减", "forms": [["v.", ["降低；削减"]], ["v.-ing（动名词）", ["降低"]], ["v.（过去分词）", ["削减；裁撤"]], ["v.", ["降低；削减", "减少；削减"]]]},
  ],
  "cycle": [
    {"id": "cycle", "pos": "n", "meaning": "周期；循环", "forms": [["n.", ["周期", "周期；循环"]]], "sources": [["p1-s21", "n./v.", "周期；循环"]], "fromNotes": [["n./v.", "周期；循环"]]},
  ],
  "daily": [
    {"id": "daily", "pos": "adj", "meaning": "日常的；每天的", "forms": [["adj.", ["日常的", "日常的；每天的", "每天的"]]]},
  ],
  "damage": [
    {"id": "damage", "pos": "n", "meaning": "损害；损失", "forms": [["n.", ["损害；损失"]], ["n. uncountable", ["损害；裁撤带来的损失"]], ["n.（不可数）", ["损害；破坏"]]], "fromNotes": [["n./v.", "损害；破坏"]]},
    {"id": "damage", "pos": "v", "meaning": "损害；破坏", "forms": [], "fromNotes": [["n./v.", "损害；破坏"]]},
  ],
  "date": [
    {"id": "date", "pos": "n", "meaning": "日期；时点", "forms": [["n.", ["日期；时点", "时效；日期"]], ["n.（复合形容词组成部分）", ["日期；当前时点"]]], "fromNotes": [["n./v.", "日期；约会"]]},
    {"id": "appointment", "pos": "n", "meaning": "约会", "forms": [], "fromNotes": [["n./v.", "日期；约会"]]},
    {"id": "date", "pos": "v", "meaning": "约会", "forms": [], "fromNotes": [["n./v.", "日期；约会"]]},
  ],
  "deal": [
    {"id": "quantity", "pos": "n", "meaning": "量；程度", "forms": [["n.", ["量；程度"]], ["n.（数量用法）", ["量"]]], "sources": [["2001-p2-s1", "n./v.", "数量；程度"]], "fromNotes": [["n./v.", "数量；程度"]]},
    {"id": "agreement", "pos": "n", "meaning": "协议；约定", "forms": [["n.", ["协议；约定"]], ["n.", ["协议；约定", "交易；协议"]], ["", ["交易；协议"]]], "sources": [["2011-p5-s19", "n./v.", "数量；程度"]]},
    {"id": "handle", "pos": "v", "meaning": "处理（deal with）", "forms": [], "fromNotes": [["", "处理，deal with"]]},
  ],
  "dealer": [
    {"id": "dealer", "pos": "n", "meaning": "经销商；交易商", "forms": [["n.", ["交易商；艺术品经销商", "经销商；交易商"]], ["n.（复数）", ["经营者；交易商"]]]},
  ],
  "death": [
    {"id": "death", "pos": "n", "meaning": "死亡；消亡", "forms": [["n.", ["死亡", "死亡；消亡", "消亡；终结"]], ["n.（death 的本句变形）", ["死亡", "死亡；死亡人数"]]]},
  ],
  "decade": [
    {"id": "decade", "pos": "n", "meaning": "十年；十年时期", "forms": [["n.", ["十年", "十年；十年时期"]]]},
  ],
  "decay": [
    {"id": "decay", "pos": "n", "meaning": "衰败；败坏", "forms": [["n.", ["衰败；败坏", "衰退；败坏"]]]},
  ],
  "declare": [
    {"id": "declare", "pos": "v", "meaning": "宣布；宣告", "forms": [["v.", ["宣布；宣告", "宣布；认定"]], ["v.（declare 的本句变形）", ["宣布；宣告"]]]},
  ],
  "decline": [
    {"id": "decrease", "pos": "n", "meaning": "衰退；下降", "forms": [["n.", ["衰退", "衰退；下降"]], ["n.", ["衰退；下降"]], ["n.", ["衰退"]]], "sources": [["2011-p4-s3", "n./v.", "衰退；下降"], ["2012-p4-s9", "n./v.", "衰退；下降"], ["p1-s17", "n./v.", "衰退；下降"], ["question-24-prompt", "n./v.", "下降；衰退；减少"]], "fromNotes": [["v. / n.", "下降；衰退； 下降或衰落。接offer作宾语时常表示婉拒。"], ["n./v.", "衰退；下降"]]},
    {"id": "decrease", "pos": "v", "meaning": "下降；减少", "forms": [["v.", ["下降；减少"]]], "sources": [["question-17-option-B", "present participle（declining）", "下降"]], "fromNotes": [["v. / n.", "下降；衰退； 下降或衰落。接offer作宾语时常表示婉拒。"], ["n./v.", "衰退；下降"]]},
    {"id": "refuse", "pos": "v", "meaning": "拒绝；婉拒", "forms": [["v.", ["拒绝；婉拒", "拒绝"]]], "fromNotes": [["v. / n.", "下降；衰退； 下降或衰落。接offer作宾语时常表示婉拒。"]]},
  ],
  "decrease": [
    {"id": "decrease", "pos": "v", "meaning": "减少；降低", "forms": [["v.", ["减少；降低", "减少；降低；下降"]], ["v.-ed（分词定语）", ["减少；降低"]]]},
  ],
  "deem": [
    {"id": "deem", "pos": "v", "meaning": "认为；视为", "forms": [["v.", ["认为；视为"]], ["v.（过去分词）", ["认为"]]]},
  ],
  "deeply": [
    {"id": "deeply", "pos": "adv", "meaning": "深深地；程度很深地", "forms": [["adv.", ["极其；深深地", "极其；程度很深地", "深深地", "深深地；程度很深地"]]]},
  ],
  "defeat": [
    {"id": "defeat", "pos": "v", "meaning": "战胜；克服", "forms": [["v.", ["战胜；克服"]]], "sources": [["2001-p2-s12", "v./n.", "战胜；克服"]], "fromNotes": [["v./n.", "战胜；击败"]]},
  ],
  "define": [
    {"id": "define", "pos": "v", "meaning": "界定；定义", "forms": [["v.", ["界定；定义", "界定；明确说明"]]]},
  ],
  "delay": [
    {"id": "delay", "pos": "v", "meaning": "推迟；较晚出现", "forms": [["v.", ["推迟；较晚出现"]], ["v.（delay 的过去分词，被动语态）", ["推迟；较晚出现"]]], "fromNotes": [["v./n.", "推迟；较晚出现"]]},
  ],
  "deliver": [
    {"id": "speak", "pos": "v", "meaning": "发表演讲", "forms": [], "fromNotes": [["", "发表演讲"], ["v.（deliver 的本句变形）", "递送；发表"]]},
    {"id": "fulfill", "pos": "v", "meaning": "履行承诺", "forms": [], "fromNotes": [["", "履行承诺"]]},
    {"id": "convey", "pos": "v", "meaning": "送达；输送", "forms": [["v.", ["送达；输送"]], ["v.（deliver 的本句变形）", ["送达；输送"]], ["v.", ["提供；传递"]], ["v.", ["递送；交付"]]], "fromNotes": [["", "递送包裹"], ["v.（deliver 的本句变形）", "递送；发表"]]},
  ],
  "delivery": [
    {"id": "speech-delivery", "pos": "n", "meaning": "演讲的表达方式", "forms": [], "fromNotes": [["", "演讲的表达方式；交付；分娩。本文为送报配送。"]]},
    {"id": "delivery", "pos": "n", "meaning": "配送；交付", "forms": [["n.", ["配送；交付", "配送；送达"]]], "fromNotes": [["", "演讲的表达方式；交付；分娩。本文为送报配送。"]], "sources": [["2011-p2-s18", "n.", "配送；送达"], ["question-201127-prompt", "n.", "配送；送达"]]},
    {"id": "childbirth", "pos": "n", "meaning": "分娩", "forms": [], "fromNotes": [["", "演讲的表达方式；交付；分娩。本文为送报配送。"]]},
  ],
  "demand": [
    {"id": "market-demand", "pos": "n", "meaning": "需求", "forms": [["n.", ["需求"]]], "sources": [["2010-p1-s17", "n./v.", "需求；要求"]], "fromNotes": [["n./v.", "需求；需要；要求"]]},
    {"id": "request", "pos": "n", "meaning": "要求", "forms": [["n.", ["要求", "这些要求"]]], "fromNotes": [["n./v.", "需求；需要；要求"]]},
    {"id": "demand", "pos": "v", "meaning": "要求", "forms": [["v.-ing", ["要求"]], ["v.", ["要求"]]], "fromNotes": [["n./v.", "需求；需要；要求"]]},
  ],
  "deny": [
    {"id": "deny", "pos": "v", "meaning": "否认", "forms": [["v.", ["否认", "否认；拒绝承认"]]]},
  ],
  "depart": [
    {"id": "depart", "pos": "v", "meaning": "离开；出发", "forms": [["v.", ["离开；出发"]], ["v.-ing（分词）", ["出发"]], ["v.", ["离开；出发", "出发；起飞离开"]]], "sources": [["2011-p1-s11", "gerund", "离任；离开"]]},
  ],
  "department": [
    {"id": "department", "pos": "n", "meaning": "部；部门", "forms": [["n.", ["部门；部", "部；部门"]], ["n.（复合名词成分）", ["部门；商品部类"]]]},
  ],
  "departure": [
    {"id": "departure", "pos": "n", "meaning": "离开；出发", "forms": [["n.", ["出发；起飞", "离开；出发", "离开；离去"]]], "fromNotes": [["", "出发、启程；偏离惯例。a departure from tradition对传统的偏离。"]]},
    {"id": "deviation", "pos": "n", "meaning": "偏离惯例", "forms": [], "fromNotes": [["", "出发、启程；偏离惯例。a departure from tradition对传统的偏离。"]]},
  ],
  "depend": [
    {"id": "depend", "pos": "v", "meaning": "依赖；取决于", "forms": [["v.", ["依赖；取决于", "取决于；依赖"]], ["v.-ing（现在分词）", ["取决于"]], ["v.（depend 的第三人称单数）", ["依赖；取决于", "取决于；依赖"]], ["v.（过去式depended）", ["取决于"]]]},
  ],
  "depression": [
    {"id": "low-mood", "pos": "n", "meaning": "抑郁；低落", "forms": [], "fromNotes": [["", "抑郁；低落；凹陷处。本文the Depression为经济大萧条。"]]},
    {"id": "hollow", "pos": "n", "meaning": "凹陷处", "forms": [], "fromNotes": [["", "抑郁；低落；凹陷处。本文the Depression为经济大萧条。"]]},
  ],
  "deserve": [
    {"id": "deserve", "pos": "v", "meaning": "值得；应得到", "forms": [["v.", ["值得；应得到"]], ["v.（第三人称单数）", ["值得；应受到"]]]},
  ],
  "design": [
    {"id": "design", "pos": "v", "meaning": "设计", "forms": [["v.", ["设计"]], ["v.-ing（名词性定语）", ["设计（活动）"]], ["v.（过去分词）", ["设计"]], ["v.（过去式）", ["设计"]]]},
  ],
  "designate": [
    {"id": "designate", "pos": "v", "meaning": "指定；认定", "forms": [["v.", ["指定；认定"]], ["v.（designate 的本句变形）", ["指定；认定", "正式指定；认定"]]]},
  ],
  "detect": [
    {"id": "detect", "pos": "v", "meaning": "发现；检测到", "forms": [["v.", ["发现；检测出", "发现；检测到"]], ["v.（detect 的本句变形）", ["发现；检测到"]]]},
  ],
  "determine": [
    {"id": "determine", "pos": "v", "meaning": "查明；确定", "forms": [["v.", ["查明；确定", "确定；查明"]]]},
  ],
  "develop": [
    {"id": "develop", "pos": "v", "meaning": "发展；形成", "forms": [["v.", ["发展；形成", "形成；养成"]], ["v.-ed", ["发展；开发"]], ["v.（现在分词作定语）", ["发展"]]]},
    {"id": "developing", "pos": "adj", "meaning": "发展中的", "forms": [["adj.", ["发展中的"]]], "sources": [["2012-translation-s1", "adj.（分词形式developing / developed）", "发展中的（developing）；发达的（developed）", "developing"], ["2012-translation-s3", "adj.（分词developing）", "发展中的"]]},
    {"id": "developed", "pos": "adj", "meaning": "发达的", "forms": [["adj.", ["发达的"]]], "sources": [["2012-translation-s1", "adj.（分词形式developing / developed）", "发展中的（developing）；发达的（developed）", "developed"]]},
  ],
  "development": [
    {"id": "new-event", "pos": "n", "meaning": "新变化；新事态", "forms": [["n.", ["新变化；新事态"]]], "sources": [["2001-p1-s3", "n.（development 的复数）", "发展；新变化"]]},
  ],
  "difference": [
    {"id": "effect", "pos": "n", "meaning": "作用；影响", "forms": [["n.", ["作用；影响"]]], "sources": [["2010-p5-s2", "n.", "作用；差别"], ["p2-s9", "n.", "影响"]]},
  ],
  "different": [
    {"id": "different", "pos": "adj", "meaning": "不同的", "forms": [["adj.", ["不同的", "不同的；各种的"]]]},
  ],
  "difficulty": [
    {"id": "difficulty", "pos": "n", "meaning": "困难；障碍", "forms": [["n.", ["困难", "困难；障碍"]], ["n.（difficulty 的本句变形）", ["困难；障碍"]]]},
  ],
  "diminish": [
    {"id": "diminish", "pos": "v", "meaning": "减少；减弱", "forms": [["v.", ["减少；减弱", "减弱"]], ["v.-ed（过去式或过去分词）", ["减少；减弱"]]]},
  ],
  "direct": [
    {"id": "direct", "pos": "adj", "meaning": "直接的", "forms": [["adj.", ["直接的"]], ["adj.（直接的）", ["直接的"]]], "sources": [["question-200124-prompt", "adj./v.", "直接的"]], "fromNotes": [["adj./v.", "直接的"]]},
  ],
  "director": [
    {"id": "director", "pos": "n", "meaning": "负责人；主管", "forms": [["n.", ["主任", "负责人；主管"]]]},
  ],
  "discard": [
    {"id": "discard", "pos": "v", "meaning": "丢弃；抛弃", "forms": [["v.", ["丢弃；抛弃"]], ["v.（不定式）", ["抛弃"]]], "fromNotes": [["v./n.", "丢弃；抛弃"]]},
  ],
  "discern": [
    {"id": "discern", "pos": "v", "meaning": "辨明；识别", "forms": [["v.", ["辨明；识别"]]], "sources": [["2012-p4-s15", "gerund", "辨明；识别"]]},
  ],
  "discrimination": [
    {"id": "discrimination", "pos": "n", "meaning": "歧视；区别对待", "forms": [["n.", ["歧视", "歧视；区别对待"]]]},
  ],
  "dismiss": [
    {"id": "sack", "pos": "v", "meaning": "解雇", "forms": [], "fromNotes": [["", "解雇；让某人离开、解散；驳回诉讼或请求；不予理会。"]]},
    {"id": "send-away", "pos": "v", "meaning": "让离开；解散", "forms": [], "fromNotes": [["", "解雇；让某人离开、解散；驳回诉讼或请求；不予理会。"], ["v.", "解散；驳回；不予考虑"]]},
    {"id": "reject", "pos": "v", "meaning": "驳回", "forms": [], "fromNotes": [["", "解雇；让某人离开、解散；驳回诉讼或请求；不予理会。"], ["v.", "解散；驳回；不予考虑"]]},
    {"id": "disregard", "pos": "v", "meaning": "不予考虑；不予理会", "forms": [], "fromNotes": [["", "解雇；让某人离开、解散；驳回诉讼或请求；不予理会。"], ["v.", "解散；驳回；不予考虑"]], "sources": [["question-201241-option-F", "v.", "不予考虑；摒弃"]]},
  ],
  "dissatisfied": [
    {"id": "dissatisfied", "pos": "adj", "meaning": "不满意的；感到不满的", "forms": [["adj.", ["不满意的", "不满意的；感到不满的"]]], "fromNotes": [["adj./v.-ed", "不满意的；感到不满的"]]},
  ],
  "distant": [
    {"id": "distant", "pos": "adj", "meaning": "遥远的", "forms": [["adj.", ["距离较远的", "遥远的"]]]},
  ],
  "distinction": [
    {"id": "distinction", "pos": "n", "meaning": "区别；区分", "forms": [["n.", ["区别；区分"]]], "sources": [["2001-p1-s5", "n.", "区别；区分"], ["question-200122-option-A", "n.", "声望；卓越；区别"]], "fromNotes": [["n.", "声望；卓越；区别"]]},
    {"id": "eminence", "pos": "n", "meaning": "声望；卓越", "forms": [["n.", ["声望；卓越"]]], "sources": [["p5-s1", "n.", "声望；卓越；区别"]], "fromNotes": [["n.", "声望；卓越；区别"]]},
  ],
  "divide": [
    {"id": "gap", "pos": "n", "meaning": "鸿沟；分野", "forms": [["n.", ["分野；鸿沟", "鸿沟；分野"]], ["n.", ["分野；鸿沟"]]], "sources": [["2001-p2-s1", "n./v.", "鸿沟；分界"], ["2001-p2-s10", "n./v.", "鸿沟；分界"], ["2001-p2-s2", "n./v.", "鸿沟；分界"], ["2001-p2-s4", "n./v.", "鸿沟；分界"], ["2001-p2-s6", "n./v.", "鸿沟；分界"], ["question-200125-prompt", "n./v.", "鸿沟；分界"]], "fromNotes": [["n./v.", "鸿沟；分界"]]},
  ],
  "divorce": [
    {"id": "divorce", "pos": "n", "meaning": "离婚", "forms": [["n.", ["离婚"]], ["n.（书名成分）", ["离婚"]], ["n.（复数）", ["离婚；离婚案例"]]], "sources": [["2010-p1-s18", "n./v.（divorce 的本句变形）", "离婚"], ["p4-s17", "n./v.", "离婚；离婚率"], ["question-26-option-B", "n./v.", "离婚；离婚率"]], "fromNotes": [["n./v.（divorce 的本句变形）", "离婚；离婚率"]]},
  ],
  "domestic": [
    {"id": "national", "pos": "adj", "meaning": "国内的；本国的", "forms": [["adj.", ["国内的", "国内的；本国的"]]], "sources": [["question-11-option-B", "adj./n.", "国内的；本国的"], ["question-12-option-A", "adj./n.", "国内的；本国的"], ["question-12-option-D", "adj./n.", "国内的；本国的"]], "fromNotes": [["adj./n.", "国内的；本国的"]]},
  ],
  "dominant": [
    {"id": "dominant", "pos": "adj", "meaning": "占主导地位的", "forms": [["adj.", ["主导的", "占主导地位的"]]]},
  ],
  "doubt": [
    {"id": "doubt", "pos": "n", "meaning": "怀疑；疑问", "forms": [], "fromNotes": [["n./v.", "怀疑；疑问"]], "sources": [["p2-s26", "n.", "怀疑"]]},
    {"id": "doubt", "pos": "v", "meaning": "怀疑", "forms": [], "fromNotes": [["n./v.", "怀疑；疑问"]]},
  ],
  "downturn": [
    {"id": "downturn", "pos": "n", "meaning": "低迷；衰退", "forms": [["n.", ["低迷；下行期", "低迷；衰退"]]]},
  ],
  "downward": [
    {"id": "downward", "pos": "adv", "meaning": "向下", "forms": [["adv.", ["向下"]]], "fromNotes": [["adv./adj.", "向下；下降的"]]},
    {"id": "downward", "pos": "adj", "meaning": "下降的", "forms": [], "fromNotes": [["adv./adj.", "向下；下降的"]]},
  ],
  "draft": [
    {"id": "draft", "pos": "n", "meaning": "草案", "forms": [["n.", ["草案"]], ["n.（名词定语）", ["草案"]]], "sources": [["2001-cloze-s2", "adj./n./v.", "草拟的；草案"], ["question-200103-option-D", "n.（名词定语）", "草案"]], "fromNotes": [["adj./n./v.", "草拟的；草案"]]},
    {"id": "draft", "pos": "adj", "meaning": "草拟的", "forms": [], "fromNotes": [["adj./n./v.", "草拟的；草案"]]},
  ],
  "drain": [
    {"id": "channel", "pos": "n", "meaning": "排水沟", "forms": [], "fromNotes": [["n.", "排水沟；持续的消耗，如a drain on resources资源消耗。"]]},
    {"id": "depletion", "pos": "n", "meaning": "持续的消耗", "forms": [], "fromNotes": [["n.", "排水沟；持续的消耗，如a drain on resources资源消耗。"]]},
    {"id": "empty", "pos": "v", "meaning": "排干；耗尽", "forms": [], "fromNotes": [["v.", "排干；耗尽精力或资金。drain away逐渐流失。"]]},
    {"id": "flow-away", "pos": "v", "meaning": "逐渐流失", "forms": [], "fromNotes": [["v.", "排干；耗尽精力或资金。drain away逐渐流失。"], ["n. / v.", "流失；外流"]]},
    {"id": "outflow", "pos": "n", "meaning": "流失；外流", "forms": [["n.", ["流失；外流"]]], "fromNotes": [["n. / v.", "流失；外流"]]},
  ],
  "dramatically": [
    {"id": "degree", "pos": "adv", "meaning": "大幅地；显著地", "forms": [["adv.", ["大幅地；显著地"]]], "fromNotes": [["adv.", "剧烈地；戏剧性地"]]},
    {"id": "theatrical", "pos": "adv", "meaning": "戏剧性地", "forms": [], "fromNotes": [["adv.", "剧烈地；戏剧性地"]]},
  ],
  "draw": [
    {"id": "conclude", "pos": "v", "meaning": "得出", "forms": [["v.（过去分词）", ["得出"]]], "fromNotes": [["v./n.", "得出；画；拉"]]},
    {"id": "draw", "pos": "v", "meaning": "画；绘制", "forms": [["v.-ing（动名词）", ["画；绘制"]]], "fromNotes": [["v./n.", "得出；画；拉"]]},
    {"id": "pull", "pos": "v", "meaning": "拉", "forms": [], "fromNotes": [["v./n.", "得出；画；拉"]]},
  ],
  "dream": [
    {"id": "dream", "pos": "n", "meaning": "梦想；想象", "forms": [["n.", ["梦想；想象"]], ["n.（复数）", ["梦想；想象"]]], "sources": [["2012-p4-s7", "n./v.", "梦想；想象"], ["question-201237-option-B", "n./v.", "梦想；想象"]], "fromNotes": [["n./v.", "梦想；想象"]]},
    {"id": "dream", "pos": "v", "meaning": "梦想；想象", "forms": [], "fromNotes": [["n./v.", "梦想；想象"]]},
  ],
  "dress": [
    {"id": "dress", "pos": "n", "meaning": "连衣裙；衣服", "forms": [["n.（复数）", ["连衣裙；衣服"]]], "fromNotes": [["n./v.", "连衣裙；衣服"]]},
  ],
  "drive": [
    {"id": "compel", "pos": "v", "meaning": "迫使；驱使", "forms": [["v.（过去分词）", ["迫使；驱使"]]], "fromNotes": [["v./n.", "驱使；驾驶；驱动力"]]},
    {"id": "drive", "pos": "v", "meaning": "驾驶；开车", "forms": [["v.", ["驾驶；开车"]]], "fromNotes": [["v./n.", "驱使；驾驶；驱动力"]]},
    {"id": "motivation", "pos": "n", "meaning": "驱动力", "forms": [], "fromNotes": [["v./n.", "驱使；驾驶；驱动力"]]},
  ],
  "drop": [
    {"id": "decrease", "pos": "v", "meaning": "下降", "forms": [["v.（drops）", ["下降"]]], "fromNotes": [["v./n.", "下降；下降幅度"]]},
    {"id": "decrease", "pos": "n", "meaning": "下降幅度", "forms": [], "fromNotes": [["v./n.", "下降；下降幅度"]]},
  ],
  "due": [
    {"id": "due-to", "pos": "adj", "meaning": "由……引起的", "forms": [["adj.", ["由……引起的"]]], "sources": [["question-201034-prompt", "复合介词组成部分", "引出原因"], ["question-201239-option-A", "adj.", "由于；预定的"]], "fromNotes": [["adj.", "由于；预定的"]]},
    {"id": "scheduled", "pos": "adj", "meaning": "预定的", "forms": [], "fromNotes": [["adj.", "由于；预定的"]]},
  ],
  "duty": [
    {"id": "duty", "pos": "n", "meaning": "职责；义务", "forms": [["n.", ["职责", "职责；义务"]]]},
  ],
  "eager": [
    {"id": "eager", "pos": "adj", "meaning": "渴望的；急切的", "forms": [["adj.", ["渴望的；急切的", "热切的；渴望的"]]]},
  ],
  "early": [
    {"id": "early", "pos": "adv", "meaning": "较早地", "forms": [["adv.", ["较早地"]]], "sources": [["2010-p1-s6", "adj./adv.", "早期的；较早地"]]},
    {"id": "early", "pos": "adj", "meaning": "早期的；初期的", "forms": [["adj.", ["早期的；初期的"]]], "sources": [["2012-p5-s6", "adj./adv.", "早期的；较早地"]]},
  ],
  "easily": [
    {"id": "easily", "pos": "adv", "meaning": "轻易地；容易地", "forms": [["adv.", ["容易地；轻易地", "轻易地", "轻易地；容易地"]]]},
  ],
  "economic": [
    {"id": "economic", "pos": "adj", "meaning": "经济的", "forms": [["adj.", ["经济的"]]], "sources": [["2011-p2-s22", "adj.", "经济的"], ["2011-p3-s4", "adj.", "经济的"], ["2011-p4-s10", "adj.", "经济上的；有经济价值的"], ["2011-p4-s11", "adj.", "经济上的；有经济价值的"], ["2011-p4-s4", "adj.", "经济上的；有经济价值的"], ["2012-p4-s12", "adj.", "经济上的；有经济价值的"], ["2012-p4-s4", "adj.", "经济上的；有经济价值的"], ["2012-p4-s9", "adj.", "经济上的；有经济价值的"], ["2012-p5-s22", "adj.", "经济上的；有经济价值的"], ["p4-s15", "adj.", "经济的"], ["p4-s3", "adj.", "经济的"], ["question-13-option-B", "adj.", "经济的"], ["question-200126-option-A", "adj.", "经济上的；有经济价值的"], ["question-201138-option-C", "adj.", "经济上的；有经济价值的"], ["question-201238-prompt", "adj.", "经济上的；有经济价值的"]], "fromNotes": [["adj.", "经济上的；有经济价值的"]]},
    {"id": "valuable", "pos": "adj", "meaning": "有经济价值的", "forms": [], "fromNotes": [["adj.", "经济上的；有经济价值的"]]},
  ],
  "educate": [
    {"id": "educated-people", "pos": "adj", "meaning": "受教育者（the educated）", "forms": [["adj.", ["受教育者（the educated）"]], ["adj.（名词化）", ["受教育者"]]], "sources": [["question-28-option-D", "adj./v.-ed（形容词名词化语境）", "教育；培养"]]},
  ],
  "educational": [
    {"id": "educational", "pos": "adj", "meaning": "教育的", "forms": [["adj.", ["教育方面的", "教育的"]]]},
  ],
  "efficient": [
    {"id": "efficient", "pos": "adj", "meaning": "高效的", "forms": [["adj.", ["高效的", "高效的；利用合理的"]]]},
  ],
  "efforts": [
    {"id": "effort", "pos": "n", "meaning": "努力；付出", "forms": [["n.", ["努力；付出"]], ["n.（复数）", ["努力", "努力；付出"]]]},
  ],
  "electronic": [
    {"id": "electronic", "pos": "adj", "meaning": "电子的；信息技术的", "forms": [["adj.", ["电子的", "电子的；信息技术的"]]]},
  ],
  "electronically": [
    {"id": "electronically", "pos": "adv", "meaning": "在电子信息技术方面", "forms": [["adv.", ["在电子信息技术方面", "在电子信息方面"]]]},
  ],
  "elite": [
    {"id": "elite", "pos": "adj", "meaning": "精英的；一流的", "forms": [["adj.", ["精英的；一流的"]]], "sources": [["2010-p4-s6", "adj./n.", "精英的；精英"], ["question-201037-prompt", "adj./n.", "精英的；精英"]], "fromNotes": [["adj./n.", "精英的；精英"]]},
    {"id": "elite-person", "pos": "n", "meaning": "精英", "forms": [], "fromNotes": [["adj./n.", "精英的；精英"]]},
  ],
  "else": [
    {"id": "else", "pos": "adv", "meaning": "其他；另外", "forms": [["adv.", ["其他；另外"]], ["adv.（后置修饰）", ["其他；别的"]]]},
  ],
  "elsewhere": [
    {"id": "elsewhere", "pos": "adv", "meaning": "在别处；其他地方", "forms": [["adv.", ["在别处", "在别处；其他地方"]]]},
  ],
  "emerge": [
    {"id": "emerge", "pos": "v", "meaning": "出现；兴起", "forms": [["v.", ["出现；兴起", "出现；逐渐形成"]]]},
  ],
  "emigrate": [
    {"id": "emigrate", "pos": "v", "meaning": "移居国外", "forms": [["v.", ["移居国外", "移居国外；移出"]]]},
  ],
  "emission": [
    {"id": "emission", "pos": "n", "meaning": "排放；排放物", "forms": [["n.", ["排放；排放物"]], ["n.（复数）", ["排放；排放量"]]]},
  ],
  "emphasize": [
    {"id": "emphasize", "pos": "v", "meaning": "强调；突出呈现", "forms": [["v.", ["强调", "强调；突出呈现"]]]},
  ],
  "employ": [
    {"id": "hire", "pos": "v", "meaning": "雇用", "forms": [], "fromNotes": [["", "雇用人员；运用方法。employ a method采用一种方法。"], ["v.", "雇用；使用"]]},
    {"id": "use", "pos": "v", "meaning": "采用；使用", "forms": [["v.", ["采用；使用"]], ["v.（过去分词employed）", ["采用；使用"]]], "fromNotes": [["", "雇用人员；运用方法。employ a method采用一种方法。"], ["v.", "雇用；使用"]]},
  ],
  "encourage": [
    {"id": "encourage", "pos": "v", "meaning": "鼓励；促使", "forms": [["v.", ["鼓励；促使"]], ["v.（过去分词）", ["鼓励；诱导"]]]},
  ],
  "end": [
    {"id": "end", "pos": "n", "meaning": "末尾；终结", "forms": [["n.", ["末尾", "末尾；终结", "末尾；结尾", "末尾；结束时", "终结；消亡"]]], "sources": [["2010-p1-s13", "v./n.", "结束；落幕"], ["2012-p4-s7", "v. / n.", "结束；终结"], ["p1-s2", "n./v.", "结束；末尾"], ["p5-s13", "n./v.", "结束；末尾"]], "fromNotes": [["n./v.", "结束；末尾"]]},
    {"id": "end", "pos": "v", "meaning": "结束；终结", "forms": [["v.", ["结束；终结"]]], "sources": [["2010-p1-s1", "v./n.（end 的本句变形）", "结束；落幕"], ["2012-p4-s2", "v. / n.", "结束；终结"]], "fromNotes": [["n./v.", "结束；末尾"]]},
  ],
  "endure": [
    {"id": "tolerate", "pos": "v", "meaning": "承受；忍受", "forms": [["v.", ["承受；忍受"]], ["v.", ["经历并忍受"]], ["v.", ["忍受"]]], "sources": [["p4-s16", "v.-ed", "忍受；持续存在"]], "fromNotes": [["v.", "忍受；持续存在"]]},
    {"id": "persist", "pos": "v", "meaning": "持续存在", "forms": [], "fromNotes": [["v.", "忍受；持续存在"]]},
  ],
  "energy": [
    {"id": "energy", "pos": "n", "meaning": "能量；能源", "forms": [["n.", ["能源；能量", "能量", "能量；能源"]], ["n.（不可数）", ["能源"]]]},
  ],
  "enjoy": [
    {"id": "enjoy", "pos": "v", "meaning": "享有；享受", "forms": [["v.", ["享受", "享受；喜欢", "享有；享受", "获得"]]]},
  ],
  "enroll": [
    {"id": "enroll", "pos": "v", "meaning": "登记；入学；注册", "forms": [["v.", ["登记；入学；注册"]], ["v.（过去分词）", ["注册入学"]]]},
  ],
  "ensure": [
    {"id": "ensure", "pos": "v", "meaning": "确保", "forms": [["v.", ["确保", "确保；促成"]], ["v.", ["确保", "确保；保证结果"]]]},
  ],
  "enter": [
    {"id": "enter", "pos": "v", "meaning": "进入；步入", "forms": [["v.", ["进入；步入"]], ["v.-ing（时间状语）", ["进入"]], ["v.（过去式）", ["进入；步入"]]]},
  ],
  "entire": [
    {"id": "entire", "pos": "adj", "meaning": "整个的；全部的", "forms": [["adj.", ["整个的", "整个的；全部的"]]]},
  ],
  "entirely": [
    {"id": "entirely", "pos": "adv", "meaning": "完全地", "forms": [["adv.", ["完全地", "完全地（在否定范围内）"]]]},
  ],
  "entitle": [
    {"id": "right", "pos": "v", "meaning": "使有权", "forms": [["v.", ["使有权"]]], "sources": [["2001-cloze-s5", "v./adj.（entitle 的过去分词）", "使有权；给……题名"]], "fromNotes": [["v.", "使有权；给……题名"]]},
    {"id": "title", "pos": "v", "meaning": "给……题名", "forms": [], "fromNotes": [["v.", "使有权；给……题名"]]},
  ],
  "entry": [
    {"id": "entry", "pos": "n", "meaning": "进入；加入", "forms": [["n.", ["进入", "进入；入场；加入", "进入；加入"]]]},
  ],
  "environment": [
    {"id": "environment", "pos": "n", "meaning": "环境；自然环境", "forms": [["n.", ["环境；自然环境", "自然环境"]]]},
  ],
  "envy": [
    {"id": "envy", "pos": "n", "meaning": "羡慕；嫉妒", "forms": [], "fromNotes": [["n./v.", "羡慕；嫉妒"]]},
    {"id": "envy", "pos": "v", "meaning": "羡慕；嫉妒", "forms": [], "fromNotes": [["n./v.", "羡慕；嫉妒"]]},
  ],
  "epidemic": [
    {"id": "epidemic", "pos": "n", "meaning": "流行病", "forms": [["n.", ["流行病"]]], "sources": [["2010-cloze-s1", "n./adj.", "流行病；流行性的"], ["2010-cloze-s2", "n./adj.", "流行病；流行性的"], ["2010-cloze-s4", "n./adj.", "流行病；流行性的"], ["question-201001-prompt", "n./adj.", "流行病；流行性的"], ["question-201004-prompt", "n./adj.", "流行病；流行性的"]], "fromNotes": [["n./adj.", "流行病；流行性的"]]},
    {"id": "epidemic", "pos": "adj", "meaning": "流行性的", "forms": [], "fromNotes": [["n./adj.", "流行病；流行性的"]]},
  ],
  "equal": [
    {"id": "equal-person", "pos": "n", "meaning": "地位平等者", "forms": [], "fromNotes": [["n./adj.", "地位平等者；平等的"]]},
    {"id": "equal", "pos": "adj", "meaning": "平等的；同等的", "forms": [], "fromNotes": [["n./adj.", "地位平等者；平等的"]], "sources": [["question-201229-option-B", "adj.", "同等的"]]},
  ],
  "equivalent": [
    {"id": "equivalent", "pos": "n", "meaning": "等效物；对应物", "forms": [["n.", ["对应物；相应表现", "等效物；对应物"]]]},
  ],
  "escape": [
    {"id": "escape", "pos": "n", "meaning": "逃脱；逃离", "forms": [], "fromNotes": [["v./n.", "逃脱；逃离"]]},
    {"id": "escape", "pos": "v", "meaning": "逃脱；逃离", "forms": [["v.-ed", ["逃脱；逃离"]]], "fromNotes": [["v./n.", "逃脱；逃离"]], "sources": [["p5-s5", "v.-ed", "逃脱；逃离"]]},
  ],
  "essential": [
    {"id": "essential", "pos": "adj", "meaning": "必不可少的", "forms": [["adj.", ["必不可少的"]], ["adj.", ["必不可少的；重要的"]]], "sources": [["p3-s7", "adj./n.", "必要的；核心的"]], "fromNotes": [["adj./n.", "必要的；核心的"]]},
  ],
  "essentially": [
    {"id": "essentially", "pos": "adv", "meaning": "本质上；基本上", "forms": [["adv.", ["实质上；基本上", "本质上；基本上"]]]},
  ],
  "ethical": [
    {"id": "ethical", "pos": "adj", "meaning": "伦理的；道德的", "forms": [["adj.", ["伦理的；合乎道德的", "伦理的；道德的"]]]},
  ],
  "european": [
    {"id": "european", "pos": "adj", "meaning": "欧洲的", "forms": [["adj.", ["欧洲人；欧洲的", "欧洲的"]]], "sources": [["2001-cloze-s4", "n./adj.", "欧洲人；欧洲的"], ["2001-cloze-s5", "n./adj.", "欧洲人；欧洲的"], ["p5-s7", "n./adj.", "欧洲人；欧洲的"], ["question-200111-prompt", "n./adj.", "欧洲人；欧洲的"], ["question-200113-prompt", "n./adj.", "欧洲人；欧洲的"], ["question-200114-prompt", "n./adj.", "欧洲人；欧洲的"]], "fromNotes": [["n./adj.", "欧洲人；欧洲的"]]},
    {"id": "european-person", "pos": "n", "meaning": "欧洲人", "forms": [["n.（复数）", ["欧洲人"]]], "fromNotes": [["n./adj.", "欧洲人；欧洲的"]]},
  ],
  "eventually": [
    {"id": "eventually", "pos": "adv", "meaning": "最终；到头来", "forms": [["adv.", ["最终", "最终；到头来"]]]},
  ],
  "ever-tinier": [
    {"id": "ever-tinier", "pos": "adj", "meaning": "越来越小的；越来越细的", "forms": [["adj.", ["越来越小的；越来越细的", "越来越细小的"]]]},
  ],
  "everybody": [
    {"id": "everybody", "pos": "pron", "meaning": "每个人；人人", "forms": [["indefinite pron.", ["所有相关从业者", "每个人；人人"]], ["pron.", ["每个人；人人"]]]},
  ],
  "everyone": [
    {"id": "everyone", "pos": "pron", "meaning": "每个人；人人", "forms": [["pron.", ["大家；每个人", "每个人；人人"]], ["pron.（每个人）", ["每个人；人人"]]]},
  ],
  "evolve": [
    {"id": "evolve", "pos": "v", "meaning": "进化；逐渐演变", "forms": [["v.", ["进化；逐渐演变"]], ["v.-ed", ["逐渐演变"]], ["v.（原形）", ["进化"]], ["v.", ["进化；逐渐演变", "进化；逐渐发展"]]], "sources": [["question-17-prompt", "gerund（evolving）", "进化"]]},
  ],
  "exceed": [
    {"id": "exceed", "pos": "v", "meaning": "超过；高于", "forms": [["v.", ["超过；高于"]], ["v.（第三人称单数）", ["超过"]]]},
  ],
  "except": [
    {"id": "except", "pos": "prep", "meaning": "除……之外", "forms": [["prep.", ["除……之外"]]], "sources": [["p2-s13", "prep./conj.（除……之外）", "除……之外"]], "fromNotes": [["prep./conj.（除……之外）", "除……之外"]]},
  ],
  "excess": [
    {"id": "excess", "pos": "adj", "meaning": "超额的；额外的", "forms": [], "fromNotes": [["adj.", "超额的；额外的，如 excess baggage"]]},
    {"id": "quantity", "pos": "n", "meaning": "超过（in excess of 的组成部分）", "forms": [], "fromNotes": [["", "in excess of：超过……"]]},
    {"id": "excess", "pos": "n", "meaning": "过量；过剩", "forms": [["n.", ["过量；过剩", "过剩"]]], "fromNotes": [["n./adj.", "过量；过剩；超出所需的部分"]]},
  ],
  "excessive": [
    {"id": "excessive", "pos": "adj", "meaning": "过度的；过多的", "forms": [["adj.", ["过多的；过度的", "过度的", "过度的；过多的"]]]},
  ],
  "executive": [
    {"id": "manager", "pos": "n", "meaning": "企业高管", "forms": [["n.", ["企业高管"]], ["n.", ["经营管理人员；执行主管"]], ["n.（复数）", ["经营管理人员"]]], "sources": [["2010-p1-s15", "n./adj.", "高管；执行的"]], "fromNotes": [["adj./n.", "行政的；执行院长"]]},
    {"id": "executive", "pos": "adj", "meaning": "执行的；行政的", "forms": [["adj.", ["执行的；行政的"]]], "fromNotes": [["adj./n.", "行政的；执行院长"]]},
  ],
  "exert": [
    {"id": "exert", "pos": "v", "meaning": "施加；运用", "forms": [["v.", ["产生；施加", "施加；运用"]], ["v.（动名词形式）", ["施加；运用"]]]},
  ],
  "exist": [
    {"id": "exist", "pos": "v", "meaning": "存在", "forms": [["v.", ["存在", "现存的"]]]},
  ],
  "expectation": [
    {"id": "expectation", "pos": "n", "meaning": "期待；预期", "forms": [["n.", ["期待", "期待；预期", "期望"]], ["n.（expectation 的本句变形）", ["预期；期待"]], ["n.（复数）", ["期待"]]]},
  ],
  "experience": [
    {"id": "experience", "pos": "v", "meaning": "经历；体验", "forms": [["v.", ["经历；体验"]]], "sources": [["2010-cloze-s4", "v./n.（experience 的本句变形）", "经历；体验"], ["question-201005-prompt", "v./n.（experience 的本句变形）", "经历；体验"]], "fromNotes": [["n./v.", "经验；经历；体验"]]},
    {"id": "experience", "pos": "n", "meaning": "经历；体验", "forms": [["n.", ["经历；体验"]]], "sources": [["2012-p5-s12", "n./v.", "经验；经历；体验"], ["question-201042-prompt", "n.", "体验；利用"]], "fromNotes": [["n./v.", "经验；经历；体验"]]},
    {"id": "expertise", "pos": "n", "meaning": "经验", "forms": [], "fromNotes": [["n./v.", "经验；经历；体验"]]},
  ],
  "expert": [
    {"id": "expert", "pos": "n", "meaning": "专家", "forms": [["n.", ["专家"]]], "sources": [["2010-cloze-s3", "n./adj.（expert 的本句变形）", "专家；熟练的"], ["2010-p1-s14", "n./adj.（expert 的本句变形）", "专家；熟练的"], ["2011-cloze-s15", "n./adj.（expert 的本句变形）", "专家；专业的"], ["2012-p2-s13", "n.（复数）", "专家；专业的"], ["question-201118-prompt", "n./adj.（expert 的本句变形）", "专家；专业的"], ["question-201230-option-D", "n.（复数）", "专家；专业的"]], "fromNotes": [["n./adj.", "专家；专业的"]]},
    {"id": "expert", "pos": "adj", "meaning": "专业的", "forms": [], "fromNotes": [["n./adj.", "专家；专业的"]]},
  ],
  "explain": [
    {"id": "explain", "pos": "v", "meaning": "解释；说明", "forms": [["v.", ["解释", "解释；说明"]], ["v.-ed（被动分词）", ["解释"]], ["v.（第三人称单数）", ["解释；说明"]]]},
  ],
  "expose": [
    {"id": "expose", "pos": "v", "meaning": "使接触；使暴露", "forms": [["v.", ["使接触；使暴露"]], ["v.（过去分词）", ["使接触"]]]},
  ],
  "express": [
    {"id": "express", "pos": "v", "meaning": "表达；体现", "forms": [["v.", ["表达；体现"]], ["v.（过去式）", ["表达"]]], "fromNotes": [["v./adj.", "表达；明确的"]]},
    {"id": "explicit", "pos": "adj", "meaning": "明确的", "forms": [], "fromNotes": [["v./adj.", "表达；明确的"]]},
  ],
  "expression": [
    {"id": "expression", "pos": "n", "meaning": "表达；体现", "forms": [["n.", ["体现；表达", "表达；体现", "表达；表达方式"]]]},
  ],
  "extend": [
    {"id": "extend", "pos": "v", "meaning": "延伸；延续", "forms": [["v.", ["延伸；延续", "延续；持续", "扩展；延伸"]], ["v.", ["延伸；延续", "延长；扩大；扩展"]]]},
  ],
  "extent": [
    {"id": "degree", "pos": "n", "meaning": "程度", "forms": [["n.", ["程度"]]], "fromNotes": [["n.", "程度；范围"]]},
    {"id": "scope", "pos": "n", "meaning": "范围", "forms": [], "fromNotes": [["n.", "程度；范围"]]},
  ],
  "eye": [
    {"id": "eye", "pos": "n", "meaning": "眼睛", "forms": [], "fromNotes": [["n.", "眼睛；看法"]]},
    {"id": "opinion", "pos": "n", "meaning": "眼光；看法", "forms": [["n.（复数）", ["眼光；看法"]]], "fromNotes": [["n.", "眼睛；看法"]]},
  ],
  "eyebrow": [
    {"id": "eyebrow", "pos": "n", "meaning": "眉毛", "forms": [], "fromNotes": [["n.", "眉毛；（常用复数）引起惊讶或质疑的反应"]], "sources": [["p4-s12", "n.（复数）", "眉毛（习语成分）"]]},
    {"id": "surprise", "pos": "n", "meaning": "惊讶或质疑（raise eyebrows 的组成）", "forms": [], "fromNotes": [["n.", "眉毛；（常用复数）引起惊讶或质疑的反应"]]},
  ],
  "fabric": [
    {"id": "cloth", "pos": "n", "meaning": "织物；布料", "forms": [["n.", ["织物；布料"]]], "fromNotes": [["", "布料；织物；构造、基本框架，如the fabric of a building建筑结构。"]]},
    {"id": "structure", "pos": "n", "meaning": "结构；组织体系", "forms": [["n.", ["结构；组织体系"]]], "fromNotes": [["", "布料；织物；构造、基本框架，如the fabric of a building建筑结构。"]]},
  ],
  "face": [
    {"id": "face", "pos": "v", "meaning": "面对；面临", "forms": [["v.", ["面对；面临", "面临"]]], "fromNotes": [["n./v.", "面对；面前"]]},
    {"id": "front", "pos": "n", "meaning": "面前", "forms": [["n.（习语成分）", ["面前"]]], "fromNotes": [["n./v.", "面对；面前"]]},
  ],
  "fade": [
    {"id": "fade", "pos": "v", "meaning": "逐渐减弱", "forms": [["v.", ["逐渐减弱", "逐渐减弱；褪去"]]], "sources": [["p1-s7", "现在分词作定语", "逐渐减弱的"]]},
  ],
  "fail": [
    {"id": "not-achieve", "pos": "v", "meaning": "未能；没有做到", "forms": [["v.", ["未能；没有做到"]]], "sources": [["question-201137-option-C", "v.", "失败；失灵"]]},
  ],
  "failure": [
    {"id": "failure", "pos": "n", "meaning": "失败；未能做到", "forms": [["n.", ["失败", "失败；未能做到"]]]},
  ],
  "faithfulness": [
    {"id": "faithfulness", "pos": "n", "meaning": "忠诚；忠实", "forms": [["n.", ["忠诚；忠实", "忠贞；忠实"]]]},
  ],
  "fall": [
    {"id": "drop", "pos": "v", "meaning": "掉落；坠落", "forms": [["v.", ["掉落；坠落"]], ["v.（动名词）", ["坠落"]]], "fromNotes": [["v./n.", "掉落；下降；坠落"], ["v.-ing（present participle）", "下跌；坠落"]]},
    {"id": "decrease", "pos": "v", "meaning": "下降；下跌", "forms": [["v.", ["下降；下跌"]], ["v./n.（fall 的本句变形）", ["下降"]], ["v.", ["下降"]], ["v./n.", ["下降；缩小"]], ["v./n.", ["下降；下跌"]], ["v.（过去式）", ["下降；下跌"]]], "fromNotes": [["v./n.", "掉落；下降；坠落"], ["v.-ing（present participle）", "下跌；坠落"]]},
    {"id": "fall-out", "pos": "v", "meaning": "闹翻；不再青睐（fall out with）", "forms": [["v.", ["闹翻；不再青睐（fall out with）"]]], "sources": [["2012-p5-s3", "v./n.", "与……闹翻；不再青睐"]]},
  ],
  "false": [
    {"id": "false", "pos": "adj", "meaning": "不正确的；不符合原文的", "forms": [["adj.", ["不正确的；不符合原文的"]], ["adj.（判断标签）", ["不符合原文的"]]]},
  ],
  "fame": [
    {"id": "fame", "pos": "n", "meaning": "名望；名声", "forms": [["n.", ["名声", "名望；名声"]]]},
  ],
  "far": [
    {"id": "degree", "pos": "adv", "meaning": "远远地；大大地", "forms": [["adv.", ["大大地；远为", "远远", "远远地；大大地"]], ["adv.", ["远远地；大大地"]]], "sources": [["2010-p1-s14", "adv./adj.（远；遥远的）", "远；远非"], ["2010-p1-s8", "adv./adj.（远；遥远的）", "远；远非"], ["2011-p4-s16", "adv./adj.（远；遥远的）", "远远；大得多"]], "fromNotes": [["adv./adj.（远；遥远的）", "远；远非"]]},
    {"id": "distance", "pos": "adv", "meaning": "遥远地", "forms": [["adv.", ["遥远地"]]], "sources": [["2012-p4-s8", "adv./adj.（远；遥远的）", "远；远非"], ["p2-s27", "adv.", "遥远地"]], "fromNotes": [["adv./adj.（远；遥远的）", "远；远非"]]},
  ],
  "fashion": [
    {"id": "fashion", "pos": "n", "meaning": "时尚；潮流", "forms": [["n.", ["时尚；潮流"]], ["n.", ["风尚；流行"]], ["n.（复数）", ["风尚；潮流"]], ["n.", ["时尚；风尚"]]], "fromNotes": [["n./v.", "风尚；流行形式；塑造"]]},
    {"id": "shape", "pos": "v", "meaning": "塑造", "forms": [], "fromNotes": [["n./v.", "风尚；流行形式；塑造"]]},
  ],
  "fastening": [
    {"id": "fastening", "pos": "n", "meaning": "扣紧；固定（动作）", "forms": [], "fromNotes": [["n./v.-ing", "扣紧；扣件"]], "sources": [["question-200102-option-D", "v.-ing/n.", "扣紧；固定"]]},
    {"id": "fastener", "pos": "n", "meaning": "扣件", "forms": [], "fromNotes": [["n./v.-ing", "扣紧；扣件"]]},
  ],
  "favor": [
    {"id": "favor", "pos": "n", "meaning": "赞成；支持；偏爱", "forms": [], "fromNotes": [["n./v.", "赞成；支持；偏爱"], ["n./v.", "支持；赞同；偏爱"]], "sources": [["p4-s15", "n.（固定结构成分）", "偏向；赞成"]]},
    {"id": "favor", "pos": "v", "meaning": "赞成；支持；偏爱", "forms": [], "fromNotes": [["n./v.", "赞成；支持；偏爱"], ["n./v.", "支持；赞同；偏爱"]]},
  ],
  "favorite": [
    {"id": "favorite", "pos": "adj", "meaning": "最喜欢的；偏爱的", "forms": [["adj.", ["最喜欢的；偏爱的"]]], "sources": [["2012-p5-s3", "n./adj.", "最喜欢的人或事；偏爱的"]], "fromNotes": [["n./adj.", "最喜欢的人或事；偏爱的"]]},
    {"id": "favorite", "pos": "n", "meaning": "偏爱的事物", "forms": [["n.（复数）", ["偏爱的事物"]]], "fromNotes": [["n./adj.", "最喜欢的人或事；偏爱的"]]},
  ],
  "favour": [
    {"id": "prefer", "pos": "v", "meaning": "偏爱", "forms": [["v.", ["偏爱", "偏爱；倾向采用"]]]},
  ],
  "fear": [
    {"id": "fear", "pos": "v", "meaning": "担忧；害怕", "forms": [["v.", ["担心；害怕", "担忧", "担忧；害怕"]]], "fromNotes": [["n./v.", "担忧；害怕"]]},
    {"id": "fear", "pos": "n", "meaning": "担忧；害怕", "forms": [], "fromNotes": [["n./v.", "担忧；害怕"]]},
  ],
  "female": [
    {"id": "female", "pos": "adj", "meaning": "女性的；雌性的", "forms": [["adj.", ["女性的", "女性的；雌性的", "女性；雌性的"]]], "fromNotes": [["n./adj.", "女性；雌性的"]]},
    {"id": "female", "pos": "n", "meaning": "女性", "forms": [["n.（复数females）", ["女性"]], ["n.", ["女性"]]], "fromNotes": [["n./adj.", "女性；雌性的"]]},
  ],
  "fertile": [
    {"id": "fertility", "pos": "adj", "meaning": "有生育力的；多产的", "forms": [], "fromNotes": [["adj.", "有生育力的；肥沃的"]], "sources": [["p2-s12", "adj.", "生育力强的；多产的"]]},
    {"id": "rich-soil", "pos": "adj", "meaning": "肥沃的", "forms": [], "fromNotes": [["adj.", "有生育力的；肥沃的"]]},
  ],
  "fetch": [
    {"id": "fetch", "pos": "v", "meaning": "售得；卖得", "forms": [["v.", ["售得；卖得", "（拍卖品）卖得某个价钱"]], ["v.（fetch 的本句变形）", ["售得；卖得"]]]},
  ],
  "fewer": [
    {"id": "fewer", "pos": "det", "meaning": "更少的（修饰可数名词复数）", "forms": [["comparative det.", ["更少的"]], ["det.", ["更少的（修饰可数名词复数）"]]], "sources": [["question-16-option-A", "det./pron.（较少的，修饰可数名词复数）", "较少的（修饰可数名词复数）"]], "fromNotes": [["det./pron.（较少的，修饰可数名词复数）", "较少的（修饰可数名词复数）"]]},
  ],
  "fierce": [
    {"id": "fierce", "pos": "adj", "meaning": "凶猛的；激烈的", "forms": [["adj.", ["凶猛的；激烈的", "凶猛的；猛烈的", "激烈的"]]]},
  ],
  "fifty": [
    {"id": "fifty", "pos": "num", "meaning": "五十", "forms": [["num.", ["五十"]]], "sources": [["p2-s7", "numeral", "五十"]], "fromNotes": [["numeral/adj.（五十；五十的）", "五十；五十的"]]},
  ],
  "fight": [
    {"id": "fight", "pos": "n", "meaning": "打斗；交战", "forms": [["n.", ["打斗；交战"]]], "fromNotes": [["n./v.", "打斗；战斗；斗争"]]},
    {"id": "fight", "pos": "v", "meaning": "作战；与……战斗", "forms": [["v.", ["作战；与……战斗"]]], "fromNotes": [["n./v.", "打斗；战斗；斗争"]]},
  ],
  "figure": [
    {"id": "person", "pos": "n", "meaning": "人物", "forms": [["n.", ["人物"]], ["n.（复数）", ["人物"]], ["n.", ["人士；人物"]], ["n.（figure 的复数）", ["人士；人物"]], ["n.（figure 的复数）", ["人物"]]], "sources": [["question-201241-option-C", "n.（figure 的复数）", "公众人物；数字；人物"]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"], ["n./v.", "公众人物；数字；人物"]]},
    {"id": "number", "pos": "n", "meaning": "数字；数量", "forms": [["n.", ["数字；数量"]], ["n./v.", ["数字；统计数值"]]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"], ["n./v.", "公众人物；数字；人物"]]},
    {"id": "shape", "pos": "n", "meaning": "身影；体形；轮廓", "forms": [["n.", ["身影；体形；轮廓"]]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"]]},
    {"id": "diagram", "pos": "n", "meaning": "图；图表", "forms": [["n.", ["图；图表"]]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"]]},
    {"id": "think", "pos": "v", "meaning": "认为；估计", "forms": [["v.", ["认为；估计"]]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"]]},
    {"id": "figure-out", "pos": "v", "meaning": "弄清；想出", "forms": [["v.", ["弄清；想出"]]], "fromNotes": [["v.", "数字；人物；体形；图表； 认为、估计；figure out弄清。"]], "sources": [["2010-p3-s3", "v.", "弄清；想出"]]},
  ],
  "file": [
    {"id": "file", "pos": "v", "meaning": "提交；提出申请", "forms": [["v.", ["提交；提出申请", "提出申请"]], ["v.（过去式）", ["提交"]]], "sources": [["2010-p1-s4", "v./n.（file 的本句变形）", "提出；提交（申请）"]], "fromNotes": [["v./n.", "正式申请；提交文件"]]},
    {"id": "documents", "pos": "n", "meaning": "文件；卷宗；档案", "forms": [], "fromNotes": [["n. / v.", "文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]},
    {"id": "tool", "pos": "n", "meaning": "锉刀", "forms": [], "fromNotes": [["n. / v.", "文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]},
    {"id": "archive", "pos": "v", "meaning": "归档", "forms": [], "fromNotes": [["n. / v.", "文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]},
    {"id": "walk-in-line", "pos": "v", "meaning": "排成纵队行进", "forms": [], "fromNotes": [["n. / v.", "文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]},
    {"id": "smooth", "pos": "v", "meaning": "锉平", "forms": [], "fromNotes": [["n. / v.", "文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]},
  ],
  "fill": [
    {"id": "fill", "pos": "v", "meaning": "填满；使充满", "forms": [["v.", ["填满；使充满"]], ["v.（第三人称单数）", ["填满；占据"]]], "sources": [["p1-s18", "v./n.", "使充满"], ["question-201009-option-C", "v./n.", "填满"]], "fromNotes": [["v./n.", "使充满"]]},
  ],
  "finance": [
    {"id": "finance", "pos": "v", "meaning": "为……提供资金；融资", "forms": [["v.", ["为……提供资金；融资"]], ["v.（过去式）", ["为……提供资金"]]], "fromNotes": [["v./n.", "为……提供资金；融资"]]},
  ],
  "finding": [
    {"id": "finding", "pos": "n", "meaning": "调查结论；研究发现", "forms": [["n.", ["调查结论；研究发现"]], ["n.（复数）", ["研究发现"]], ["n.（复数，调查结论）", ["调查结论；研究发现"]]]},
  ],
  "fine": [
    {"id": "good", "pos": "adj", "meaning": "精致的；美好的", "forms": [], "fromNotes": [["adj./adv./n./v.", "精致的；美好的；罚款"]], "sources": [["p5-s9", "adj.（反讽）", "精彩的；精心上演的"]]},
    {"id": "fine", "pos": "n", "meaning": "罚款", "forms": [], "fromNotes": [["adj./adv./n./v.", "精致的；美好的；罚款"]]},
    {"id": "fine", "pos": "v", "meaning": "罚款", "forms": [], "fromNotes": [["adj./adv./n./v.", "精致的；美好的；罚款"]]},
  ],
  "finite": [
    {"id": "grammatical", "pos": "adj", "meaning": "限定的；有时态等限定形式的", "forms": [["adj.", ["限定的；有时态等限定形式的"]]], "fromNotes": [["adj.", "限定的；有界限的"]]},
    {"id": "limited", "pos": "adj", "meaning": "有限的；有界限的", "forms": [], "fromNotes": [["adj.", "限定的；有界限的"]]},
  ],
  "firm": [
    {"id": "firm", "pos": "n", "meaning": "公司；企业", "forms": [["n.", ["企业；公司", "公司；企业"]], ["n.", ["公司；企业"]], ["n.", ["企业；公司"]]], "sources": [["2010-p1-s6", "n./adj.", "公司；牢固的"]], "fromNotes": [["n./adj.", "公司；牢固的"]]},
    {"id": "firm", "pos": "adj", "meaning": "坚定的；牢固的", "forms": [], "fromNotes": [["adj.", "坚定的；牢固的，如a firm decision坚定的决定。"], ["n./adj.", "公司；牢固的"]]},
  ],
  "first": [
    {"id": "first", "pos": "adj", "meaning": "第一的", "forms": [["adj.", ["第一的"]], ["ordinal adj.", ["第一的"]]], "sources": [["2010-cloze-s2", "ordinal/adj./adv.", "第一的；最先"], ["2012-p2-s10", "adj./adv./n.", "第一的；首先"], ["p2-s5", "adj./adv./n.", "第一的；首次"], ["p3-s12", "adj./adv./n.", "第一的；首先"], ["question-201001-prompt", "ordinal/adj./adv.", "第一的；最先"], ["question-201021-prompt", "adj./adv./n.", "第一的；首先"], ["question-28-prompt", "adj./adv./n.", "第一的；首先"]], "fromNotes": [["adj./adv./n.", "第一的；首先"]]},
    {"id": "first", "pos": "adv", "meaning": "首先；最先", "forms": [["adv.", ["首先；最先", "首先；最早", "首先；最重要地", "首次"]]], "sources": [["2001-p1-s12", "adj./adv./n.", "第一的；首先"], ["2010-cloze-s1", "ordinal/adj./adv.", "第一的；最先"]], "fromNotes": [["adj./adv./n.", "第一的；首先"]]},
  ],
  "fix": [
    {"id": "fix", "pos": "v", "meaning": "固定；牢牢置于", "forms": [["v.", ["固定；牢牢置于", "牢牢置于；植入"]]], "fromNotes": [["v./n.", "固定；确定；修理"]]},
    {"id": "determine", "pos": "v", "meaning": "确定", "forms": [], "fromNotes": [["v./n.", "固定；确定；修理"]]},
    {"id": "repair", "pos": "v", "meaning": "修理", "forms": [], "fromNotes": [["v./n.", "固定；确定；修理"]]},
  ],
  "flare": [
    {"id": "flare", "pos": "n", "meaning": "火光；突发闪耀", "forms": [["n.", ["火光；突发闪耀"]]], "fromNotes": [["n./v.", "闪光；突然燃烧"]], "sources": [["question-200110-option-C", "n.", "火光；突发闪耀"]]},
    {"id": "flare", "pos": "v", "meaning": "突然燃烧", "forms": [], "fromNotes": [["n./v.", "闪光；突然燃烧"]]},
  ],
  "flash": [
    {"id": "flash", "pos": "n", "meaning": "闪光；一瞬", "forms": [["n.", ["闪光；一瞬"]]], "fromNotes": [["n./v.", "闪光；快速闪现"]], "sources": [["question-200110-option-D", "n.", "闪光；一瞬"]]},
    {"id": "flash", "pos": "v", "meaning": "快速闪现", "forms": [], "fromNotes": [["n./v.", "闪光；快速闪现"]]},
  ],
  "flat": [
    {"id": "level", "pos": "adj", "meaning": "平坦的；扁平的", "forms": [], "fromNotes": [["", "平坦的；扁平的；固定的（flat fee固定费用）；乏味的；英式名词公寓。"]]},
    {"id": "fixed", "pos": "adj", "meaning": "固定的", "forms": [], "fromNotes": [["", "平坦的；扁平的；固定的（flat fee固定费用）；乏味的；英式名词公寓。"]]},
    {"id": "dull", "pos": "adj", "meaning": "乏味的", "forms": [], "fromNotes": [["", "平坦的；扁平的；固定的（flat fee固定费用）；乏味的；英式名词公寓。"]]},
    {"id": "apartment", "pos": "n", "meaning": "公寓", "forms": [], "fromNotes": [["", "平坦的；扁平的；固定的（flat fee固定费用）；乏味的；英式名词公寓。"]]},
  ],
  "flaw": [
    {"id": "flaw", "pos": "n", "meaning": "缺点；瑕疵", "forms": [["n.", ["缺点；瑕疵"]], ["n.（复数）", ["缺陷"]]]},
  ],
  "flow": [
    {"id": "airflow", "pos": "n", "meaning": "气流", "forms": [["n.（复数）", ["气流"]]], "fromNotes": [["n./v.", "气流；流动"]]},
    {"id": "flow", "pos": "v", "meaning": "流动；流过", "forms": [["v.", ["流动；流过", "流过"]]], "fromNotes": [["n./v.", "气流；流动"]]},
  ],
  "fluctuant": [
    {"id": "fluctuant", "pos": "adj", "meaning": "波动的；起伏不定的", "forms": [["adj.", ["波动的；变化不定的", "波动的；起伏不定的"]]]},
  ],
  "focus": [
    {"id": "focus", "pos": "v", "meaning": "集中；聚焦", "forms": [["v.", ["集中；聚焦"]], ["v.", ["把关注重点放在"]], ["v.", ["着重于；集中于"]], ["v.", ["集中关注；焦点"]]], "sources": [["2012-p5-s16", "v./n.", "集中关注；焦点"], ["question-201241-option-C", "v./n.", "集中关注；焦点"]], "fromNotes": [["v./n.", "集中关注；焦点"]]},
    {"id": "focus", "pos": "n", "meaning": "焦点", "forms": [], "fromNotes": [["v./n.", "集中关注；焦点"]]},
  ],
  "focusing": [
    {"id": "focusing", "pos": "v", "meaning": "聚焦；集中", "forms": [["v.", ["聚焦；集中"]]], "sources": [["question-200102-option-C", "v.-ing/n.", "聚焦"]], "fromNotes": [["n./v.-ing", "聚焦；集中"]]},
  ],
  "follow": [
    {"id": "listed", "pos": "adj", "meaning": "下列的；下面列出的", "forms": [["adj.", ["下列的；下面列出的"]], ["adj.（following名词化使用）", ["下列的（各项）"]], ["adj.（following）", ["下面的"]], ["adj.（分词形式）", ["下列的"]], ["adj.（分词性）", ["下面的；随后列出的"]], ["nominalized adj.", ["下列各项"]]], "sources": [["question-18-prompt", "名词化分词（following）", "下列内容"], ["question-201033-prompt", "名词化形容词", "下列各项"]]},
    {"id": "subsequent", "pos": "v", "meaning": "随后发生；接在……之后", "forms": [["v.", ["随之产生", "随后发生", "随后发生；接在……之后"]], ["v.-ing（后置定语）", ["接在……之后"]], ["v.（follow 的本句变形）", ["发生在……之后", "紧随……之后发生"]]], "sources": [["2011-p5-s2", "v./n.", "在……之后出现"]], "fromNotes": [["v./n.", "跟随；接着"]]},
    {"id": "imitate", "pos": "v", "meaning": "仿效；追随", "forms": [["v.", ["仿效；效法", "仿效；追随", "追随"]]]},
    {"id": "follow", "pos": "v", "meaning": "跟随", "forms": [], "fromNotes": [["v./n.", "跟随；接着"]]},
  ],
  "following": [
    {"id": "listed", "pos": "adj", "meaning": "下面的；下列的", "forms": [["adj.", ["下列的；随后给出的", "下面的；下列的"]]]},
    {"id": "after", "pos": "prep", "meaning": "在……之后", "forms": [], "fromNotes": [["prep. / n.", "在……之后：following the meeting会后； 追随者群体：a large following众多拥护者。"]]},
    {"id": "followers", "pos": "n", "meaning": "追随者群体", "forms": [], "fromNotes": [["prep. / n.", "在……之后：following the meeting会后； 追随者群体：a large following众多拥护者。"]]},
  ],
  "fool": [
    {"id": "fool", "pos": "v", "meaning": "欺骗；使受骗", "forms": [["v.", ["欺骗；使受骗"]]], "sources": [["2001-p2-s26", "v./adj.（fool 的过去分词）", "欺骗；使受骗"]], "fromNotes": [["v./n.", "欺骗；使受骗"]]},
  ],
  "force": [
    {"id": "force", "pos": "v", "meaning": "强迫；迫使", "forms": [["v.", ["强迫；强制", "强迫；迫使"]], ["v.（过去分词）", ["迫使"]]], "sources": [["2011-p5-s2", "n./v.", "力量；推动因素"]], "fromNotes": [["", "武力；强迫"]]},
    {"id": "power", "pos": "n", "meaning": "力量；推动因素", "forms": [["n.", ["力量；动力", "力量；推动因素"]], ["n.（force 的复数）", ["力量；推动因素"]]], "fromNotes": [["", "武力；强迫"], ["n./v.", "力量；推动因素"]]},
    {"id": "military", "pos": "n", "meaning": "部队；军队", "forms": [["n.", ["部队；军队"]]], "sources": [["2010-p5-s24", "n.", "部队；力量"], ["question-201045-prompt", "n.", "部队；力量"]]},
  ],
  "form": [
    {"id": "form", "pos": "n", "meaning": "形式；形态", "forms": [["n.", ["形式", "形式；形态"]]], "sources": [["2012-p5-s3", "n./v.", "形式；形态；形成"], ["cloze-s7", "n./v.", "形式；形态；形成"], ["question-8-prompt", "n./v.", "形式；形态；形成"]], "fromNotes": [["n./v.", "形式；形态；形成"]]},
    {"id": "form", "pos": "v", "meaning": "形成", "forms": [], "fromNotes": [["n./v.", "形式；形态；形成"]]},
  ],
  "formerly": [
    {"id": "formerly", "pos": "adv", "meaning": "以前；从前", "forms": [["adv.", ["以前", "以前；从前"]]]},
  ],
  "fortune": [
    {"id": "wealth", "pos": "n", "meaning": "巨额财富", "forms": [], "fromNotes": [["", "巨额财富：make a fortune发财；cost a fortune花费很多钱。"]]},
    {"id": "fortune", "pos": "n", "meaning": "运气；命运", "forms": [["n.", ["运气；命运", "命运；际遇"]]], "fromNotes": [["", "运气、命运：good fortune好运。"]], "sources": [["2012-p5-s8", "n.", "命运；际遇"]]},
  ],
  "francisco": [
    {"id": "francisco", "pos": "proper-name part", "meaning": "弗朗西斯科（旧金山地名组成部分）", "forms": [["proper-name part", ["弗朗西斯科（地名组成部分）", "旧金山名称的组成部分"]], ["proper-name part.", ["弗朗西斯科（旧金山地名组成部分）"]]]},
  ],
  "freedom": [
    {"id": "freedom", "pos": "n", "meaning": "自由；自由权", "forms": [["n.", ["自由；各种自由权利", "自由；自由权"]], ["n.（freedom 的复数）", ["自由；自由权"]]]},
  ],
  "french": [
    {"id": "french-person", "pos": "n", "meaning": "法国人", "forms": [["n.", ["法国人"]]], "sources": [["2001-p2-s19", "n./adj.", "法国人；法国的"]], "fromNotes": [["n./adj.", "法国人；法国的"]]},
    {"id": "french", "pos": "adj", "meaning": "法国的", "forms": [["adj.", ["法国人；法国的", "法国的"]]], "fromNotes": [["n./adj.", "法国人；法国的"]]},
  ],
  "frequently": [
    {"id": "frequently", "pos": "adv", "meaning": "频繁地；经常", "forms": [["adv.", ["经常地", "频繁地；经常"]]]},
  ],
  "fulfill": [
    {"id": "fulfill", "pos": "v", "meaning": "履行；实现；满足", "forms": [["v.", ["履行", "履行；实现；满足"]], ["v.（第三人称单数）", ["履行；符合；实现"]]], "sources": [["p4-s3", "v.-ed/adj.", "履行；实现；满足"]]},
  ],
  "fulfillment": [
    {"id": "fulfillment", "pos": "n", "meaning": "实现；完成；满足", "forms": [["n.", ["实现", "实现；完成；满足"]]]},
  ],
  "fully": [
    {"id": "quantity", "pos": "adv", "meaning": "足足；高达", "forms": [["adv.", ["整整；高达", "足足；高达"]], ["adv.（强调数量）", ["足足；高达"]]]},
  ],
  "fund": [
    {"id": "funds", "pos": "n", "meaning": "资金", "forms": [["n.", ["资金"]], ["n.（复数）", ["资金"]]], "sources": [["2011-p4-s9", "n.（fund 的复数，资金）", "资金；为……提供资金"], ["cloze-s7", "n.（fund 的复数，资金）", "资金；为……提供资金"], ["question-201138-option-A", "n.（fund 的复数，资金）", "资金；为……提供资金"], ["question-201139-option-A", "n.（fund 的复数，资金）", "资金；为……提供资金"], ["question-8-prompt", "n.（fund 的复数，资金）", "资金；为……提供资金"]], "fromNotes": [["n./v.", "资金；为……提供资金"]]},
    {"id": "fund", "pos": "v", "meaning": "为……提供资金", "forms": [["v.", ["为……提供资金", "资助"]]], "fromNotes": [["n./v.", "资金；为……提供资金"]]},
  ],
  "furnish": [
    {"id": "furniture", "pos": "v", "meaning": "为房屋配备家具", "forms": [], "fromNotes": [["", "为房屋配备家具；furnish somebody with something向某人提供某物。"]]},
    {"id": "provide", "pos": "v", "meaning": "提供", "forms": [["v.", ["提供"]]], "fromNotes": [["", "为房屋配备家具；furnish somebody with something向某人提供某物。"]]},
  ],
  "further": [
    {"id": "further", "pos": "adj", "meaning": "进一步的", "forms": [["adj.", ["进一步的"]], ["adj.（比较级形式）", ["进一步的"]]], "sources": [["2001-p1-s2", "adj./adv./v.", "进一步的；更远地"], ["question-13-option-D", "adj./adv./v.", "进一步的；更远地"], ["translation-s33", "adj.（比较级形式）", "进一步的"]], "fromNotes": [["adj./adv./v.", "进一步的；更远地"]]},
    {"id": "further", "pos": "adv", "meaning": "进一步；更远地", "forms": [["adv.", ["进一步；更远地", "进一步"]]], "fromNotes": [["adj./adv./v.", "进一步的；更远地"]]},
  ],
  "future": [
    {"id": "future", "pos": "n", "meaning": "未来", "forms": [["n.", ["未来"]]], "sources": [["question-201140-prompt", "n./adj.", "未来；未来的"]], "fromNotes": [["n./adj.", "未来；未来的"]]},
    {"id": "future", "pos": "adj", "meaning": "未来的", "forms": [], "fromNotes": [["n./adj.", "未来；未来的"]]},
  ],
  "futurist": [
    {"id": "futurist", "pos": "adj", "meaning": "未来主义的", "forms": [["adj.", ["未来主义的"]]], "sources": [["p3-s11", "n./adj.", "未来主义者；未来主义的"], ["p3-s2", "n./adj.", "未来主义者；未来主义的"], ["question-19-option-C", "n./adj.", "未来主义者；未来主义的"], ["question-22-prompt", "n./adj.", "未来主义者；未来主义的"]], "fromNotes": [["n./adj.", "未来主义者；未来主义的"]]},
    {"id": "futurist-person", "pos": "n", "meaning": "未来主义者", "forms": [["n.", ["未来主义者"]], ["n.（复数）", ["未来主义者"]]], "sources": [["p3-s3", "n./adj.", "未来主义者；未来主义的"], ["p3-s5", "n./adj.", "未来主义者；未来主义的"]], "fromNotes": [["n./adj.", "未来主义者；未来主义的"]]},
  ],
};

export const reviewedAnnotationsAF: ReviewedSenseAnnotations = {
  "above": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv./prep.", ["在上面；上文"]]]},
  ],
  "abstract": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["摘要； 提取、抽象概括。本文为抽象艺术的形容词。"]]]},
  ],
  "academic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["学术的；学术人员"]]]},
  ],
  "access": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["接入机会；使用权"]]]},
  ],
  "account": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["account for：解释；占某比例"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["银行账户；账目"]]]},
  ],
  "address": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["地址；演讲。 向……讲话；写地址；称呼。address a problem处理问题，address an audience向听众讲话。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["地址；演说"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["演说；网络地址。address a problem处理问题。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["处理问题；向听众讲话；在信封上写地址。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v. / n.", ["处理：address a problem处理问题；向……讲话：address an audience向听众讲话； 演说：give an address发表演说。"]]]},
  ],
  "admit": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["承认事实或过错：admit doing/that...；准许进入：admit somebody to a place；收治住院：be admitted to hospital。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["承认；允许进入"]]]},
  ],
  "adult": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["成年人；成年的"]]]},
  ],
  "advance": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["进步；推进"]]]},
  ],
  "advantage": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["优势；有利条件；利用"]]]},
  ],
  "advocate": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["拥护者；倡导"]]]},
  ],
  "afford": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["afford to do负担得起或有条件做某事。afford a view则是提供视野。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["afford to do：有能力或经济条件做某事，常与can或cannot连用。"]]]},
  ],
  "age": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["时代；年龄"]]]},
  ],
  "agent": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.（因素；代理人）", ["作用因素；代理人"]]]},
  ],
  "agreement": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["可数名词：协议、协定，如 reach an agreement（达成协议）"]]]},
  ],
  "aim": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["面向；以……为目标"]]]},
  ],
  "amateur": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["业余研究者；非职业的"]]]},
  ],
  "american": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["美国人；美国的"]]]},
  ],
  "appeal": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["呼吁（appeal for help）；吸引力（have wide appeal）； appeal to有吸引力。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["吸引力；吸引"]]]},
  ],
  "appoint": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["任命；指定时间"]]]},
  ],
  "appreciate": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["欣赏；理解；意识到"]]]},
  ],
  "appreciation": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["欣赏；理解；感激"]]]},
  ],
  "approach": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["方法；接近；处理"]]]},
  ],
  "article": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["冠词，如the definite article定冠词。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["协议或法律中的条款，如Article 1第一条。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["文章；论文，如a newspaper article报纸文章。"]]]},
  ],
  "asian": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["亚洲人；亚洲的"]]]},
  ],
  "ask": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["询问；请求"]]]},
  ],
  "assault": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["攻击；袭击；殴打"]]]},
  ],
  "attack": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["攻击；抨击"]]]},
  ],
  "attribute": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["把……归因于"]]]},
  ],
  "auction": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["拍卖；拍卖出售"]]]},
  ],
  "authority": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["当局；权威；权限"]]]},
  ],
  "average": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n./v.", ["平均的；平均数；使平均"]]]},
  ],
  "back": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv./n./adj./v.", ["向后；回顾"]]]},
  ],
  "balance": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["平衡；使平衡"]]]},
  ],
  "ban": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["禁止；禁令"]]]},
  ],
  "base": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["基础、底部、基地； 以……为据、把总部设于。base A on B把A建立在B之上。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["基础：a knowledge base知识库；基地：a military base军事基地； 以某地为基地：be based in a city。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["以……为基础；基础"]]]},
  ],
  "basic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["基本的；基础的"]]]},
  ],
  "battle": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["战斗；交战"]]]},
  ],
  "bear": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["熊；此义与承担负担无关。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["忍受（bear pain）；承担费用（bear the cost）；具有、带有（bear a name）；结果实（bear fruit）。"]]]},
  ],
  "behind": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv./prep.", ["落后；在后面"]]]},
  ],
  "being": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.-ing（be 的现在分词）", ["正在被……；be 的 -ing 形式"]]]},
  ],
  "below": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["prep./adv.", ["在……以下；低于"]]]},
  ],
  "benefit": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["使受益；利益"]]]},
  ],
  "best": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv./n.（最高级）", ["最优秀的"]]]},
  ],
  "bid": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["竞价；出价"]]]},
  ],
  "big": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["大的；重要的"]]]},
  ],
  "billion": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["number/n.", ["十亿"]]]},
  ],
  "bind": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["捆绑；使紧密联系"]]]},
  ],
  "blue": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["蓝色；蓝色的"]]]},
  ],
  "board": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["登上车辆或船只，如board a plane登机。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["木板；公告板；食宿，如room and board。"]]]},
  ],
  "body": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["身体；主体"]]]},
  ],
  "book": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["书；预订；记录"]]]},
  ],
  "boom": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["繁荣；激增；迅速发展"]]]},
  ],
  "bottom": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["底部；最低点"]]]},
  ],
  "brand": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["品牌；品牌化"]]]},
  ],
  "break": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["休息间歇；机会；裂口。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["打破；中断；违反，如break a rule违反规则。"]]]},
  ],
  "brief": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["adj. / v. / n.", ["简短的；短暂的。 向……介绍基本情况。 任务说明。in brief简言之。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv.", ["简短的；简言之"]]]},
  ],
  "bright": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["明亮的；鲜艳的；欢快的；有希望的。a bright future光明前途。"]]]},
  ],
  "build": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["建设；建造"]]]},
  ],
  "buy": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["收购；购买"]]]},
  ],
  "call": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["要求；呼叫；称呼"]]]},
  ],
  "capital": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["资本；建设资金"]]]},
  ],
  "care": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["照料；护理"]]]},
  ],
  "case": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["案件；情况；箱子"]]]},
    {"reason": "旧指南把案件和病例合写；两种核心义已分开，原总括语句保留。", "forms": [["n.", ["案件；病例"]]]},
  ],
  "cause": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["原因；导致"]]]},
  ],
  "celebrate": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["赞美；颂扬；庆祝"]]]},
  ],
  "certain": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.（确定的）", ["某一；确定的"]]]},
  ],
  "champion": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["冠军；斗士、捍卫者。a champion of reform改革的支持者。"]]]},
  ],
  "chance": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["机会；可能性"]]]},
  ],
  "change": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["变化中的；改变"]]]},
  ],
  "character": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["性格；品格；特点；文字或符号，如Chinese characters汉字。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["（小说电影）角色；品格；文字字符。Chinese characters汉字。"]]]},
  ],
  "characteristic": [
    {"reason": "默认词性为 n. 却解释形容词，作为原记录附注；真实名词特点/特征保留。", "sources": [["current", "n.", "典型的；具有某种特征的"]]},
  ],
  "chart": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["海图：a nautical chart航海图；排行榜：the music charts音乐排行榜； 绘制或记录：chart changes记录变化。"]]]},
  ],
  "check": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["检查；阻止；核对"]]]},
  ],
  "chief": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["首席的；负责人"]]]},
  ],
  "choice": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["选择；被选者"]]]},
  ],
  "chronicle": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v. / proper n.", ["记述；《纪事报》名的组成部分"]]]},
  ],
  "claim": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["声称；主张"]]]},
  ],
  "class": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["归类；类别；阶层"]]]},
  ],
  "clean": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["adj.", ["干净的；清白的"]]]},
  ],
  "clear": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv./v.", ["清楚地；明显地"]]]},
  ],
  "clever": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["聪明的；巧妙的"]]]},
  ],
  "climb": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["攀登；逐步晋升"]]]},
  ],
  "close": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./adj.", ["关闭；接近的；结束"]]]},
  ],
  "coach": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["教练；长途客车；旅客车厢。 辅导、训练，不限运动领域。"]]]},
  ],
  "collapse": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["倒闭；崩溃"]]]},
  ],
  "collection": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["收藏；藏品"]]]},
  ],
  "colony": [
    {"reason": "孤立干扰项的旧释义同时列殖民地/群落；不把其次数假分给其中一义。", "forms": [["n.", ["殖民地；群落"]]]},
  ],
  "color": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["颜色；给……着色"]]]},
  ],
  "combat": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["抗击；与……斗争"]]]},
  ],
  "come": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["到来；出现"]]]},
  ],
  "comment": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["评论"]]]},
  ],
  "commercial": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["商业广告；商业的"]]]},
  ],
  "commission": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["委员会；佣金；委托任务。本文为委托设计的动词。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["佣金；委托任务； 委托制作或开展某事。"]]]},
  ],
  "commute": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["通勤；往返上下班"]]]},
    {"reason": "旧动词说明合写通勤和减刑；完整原文保留，核心义分别列出。", "forms": [["v.", ["通勤；减轻刑罚"]]]},
  ],
  "compensation": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["补偿；赔偿，如compensation for damage损害赔偿。"]]]},
  ],
  "compromise": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n. / v.", ["妥协；折中方案；损害"]]]},
  ],
  "concern": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["涉及；与……有关"]]]},
  ],
  "condition": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["状况；条件；使适应"]]]},
  ],
  "consider": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["认为；考虑；把……看作"]]]},
  ],
  "consumer": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj. component", ["消费者；消费类的"]]]},
  ],
  "contemporary": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["当代的；同代人"]]]},
  ],
  "contrast": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["对照；反差"]]]},
  ],
  "convention": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["惯例、习俗（social conventions社会习俗）；公约、协定（an international convention国际公约）。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["公约；惯例"]]]},
  ],
  "correct": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj. / v.", ["正确的；纠正"]]]},
  ],
  "cost": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["代价；费用；使花费"]]]},
  ],
  "counsel": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["劝告；建议"]]]},
  ],
  "count": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["数数；计数；把……算在内；依靠（count on）； 计数、总数。Every minute counts每分钟都重要。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["计入；占比重；具有重要性"]]]},
  ],
  "course": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["课程；航线；一道菜；过程。of course当然，in the course of在……过程中。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["课程；路线；一道菜；of course当然。本文为建筑发展的进程。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["过程；课程；当然（of course）"]]]},
  ],
  "cover": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["封面；掩护。cover costs支付费用，cover a topic涉及话题，take cover寻找掩护。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["覆盖；遮盖；包含、涉及；支付足够费用；走完一段路程。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["覆盖；掩盖"]]]},
  ],
  "credit": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["信用；赊购；学分；功劳；认可。本文mobile phone credit为话费额度。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["认为有；归功于；信用"]]]},
  ],
  "critic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["批评者；评论家"]]]},
  ],
  "critical": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["批评的；关键的"]]]},
  ],
  "crop": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["突然出现（crop up）"]]]},
  ],
  "cultivation": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["培养；耕作"]]]},
  ],
  "currency": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["流通；通行，如gain currency获得传播或接受。"]]]},
  ],
  "current": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["当前的；水流"]]]},
  ],
  "cycle": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["周期；循环"]]]},
  ],
  "damage": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["损害；破坏"]]]},
  ],
  "date": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["日期；约会"]]]},
  ],
  "deal": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["处理，deal with"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["数量；程度"]]]},
  ],
  "decline": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v. / n.", ["下降；衰退； 下降或衰落。接offer作宾语时常表示婉拒。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["衰退；下降"]]]},
  ],
  "defeat": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["战胜；击败"]]]},
  ],
  "delay": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["推迟；较晚出现"]]]},
  ],
  "deliver": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["发表演讲"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["履行承诺"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["递送包裹"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.（deliver 的本句变形）", ["递送；发表"]]]},
  ],
  "delivery": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["演讲的表达方式；交付；分娩。本文为送报配送。"]]]},
  ],
  "demand": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["需求；需要；要求"]]]},
  ],
  "departure": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["出发、启程；偏离惯例。a departure from tradition对传统的偏离。"]]]},
  ],
  "depression": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["抑郁；低落；凹陷处。本文the Depression为经济大萧条。"]]]},
  ],
  "direct": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./v.", ["直接的"]]]},
  ],
  "discard": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["丢弃；抛弃"]]]},
  ],
  "dismiss": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["解雇；让某人离开、解散；驳回诉讼或请求；不予理会。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["解散；驳回；不予考虑"]]]},
  ],
  "dissatisfied": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./v.-ed", ["不满意的；感到不满的"]]]},
  ],
  "distinction": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["声望；卓越；区别"]]]},
  ],
  "divide": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["鸿沟；分界"]]]},
  ],
  "divorce": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.（divorce 的本句变形）", ["离婚；离婚率"]]]},
  ],
  "domestic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["国内的；本国的"]]]},
  ],
  "doubt": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["怀疑；疑问"]]]},
  ],
  "downward": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv./adj.", ["向下；下降的"]]]},
  ],
  "draft": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n./v.", ["草拟的；草案"]]]},
  ],
  "drain": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n.", ["排水沟；持续的消耗，如a drain on resources资源消耗。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["排干；耗尽精力或资金。drain away逐渐流失。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n. / v.", ["流失；外流"]]]},
  ],
  "dramatically": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv.", ["剧烈地；戏剧性地"]]]},
  ],
  "draw": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["得出；画；拉"]]]},
  ],
  "dream": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["梦想；想象"]]]},
  ],
  "dress": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["连衣裙；衣服"]]]},
  ],
  "drive": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["驱使；驾驶；驱动力"]]]},
  ],
  "drop": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["下降；下降幅度"]]]},
  ],
  "due": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["由于；预定的"]]]},
  ],
  "economic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["经济上的；有经济价值的"]]]},
  ],
  "elite": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["精英的；精英"]]]},
  ],
  "employ": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["雇用人员；运用方法。employ a method采用一种方法。"]]]},
    {"reason": "孤立干扰项旧释义同时列雇用和使用；两义分开而不分摊其出现次数。", "forms": [["v.", ["雇用；使用"]]]},
  ],
  "end": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["结束；末尾"]]]},
  ],
  "endure": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["忍受；持续存在"]]]},
  ],
  "entitle": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v.", ["使有权；给……题名"]]]},
  ],
  "envy": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["羡慕；嫉妒"]]]},
  ],
  "epidemic": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["流行病；流行性的"]]]},
  ],
  "equal": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["地位平等者；平等的"]]]},
  ],
  "escape": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["逃脱；逃离"]]]},
  ],
  "essential": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["必要的；核心的"]]]},
  ],
  "european": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["欧洲人；欧洲的"]]]},
  ],
  "except": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["prep./conj.（除……之外）", ["除……之外"]]]},
  ],
  "excess": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["adj.", ["超额的；额外的，如 excess baggage"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["in excess of：超过……"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["过量；过剩；超出所需的部分"]]]},
  ],
  "executive": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./n.", ["行政的；执行院长"]]]},
  ],
  "experience": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["经验；经历；体验"]]]},
  ],
  "expert": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["专家；专业的"]]]},
  ],
  "express": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./adj.", ["表达；明确的"]]]},
  ],
  "extent": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["程度；范围"]]]},
  ],
  "eye": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["眼睛；看法"]]]},
  ],
  "eyebrow": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n.", ["眉毛；（常用复数）引起惊讶或质疑的反应"]]]},
  ],
  "fabric": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["布料；织物；构造、基本框架，如the fabric of a building建筑结构。"]]]},
  ],
  "face": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["面对；面前"]]]},
  ],
  "fall": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["掉落；下降；坠落"]]]},
    {"reason": "同句以 sky 和 share price 共用 falling，同时含坠落比喻与价格下降；原句保留，次数不强分给单一义。", "forms": [["v.-ing（present participle）", ["下跌；坠落"]]]},
  ],
  "far": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adv./adj.（远；遥远的）", ["远；远非"]]]},
  ],
  "fashion": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["风尚；流行形式；塑造"]]]},
  ],
  "fastening": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.-ing", ["扣紧；扣件"]]]},
  ],
  "favor": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["赞成；支持；偏爱"]]]},
    {"reason": "孤立选项旧名动混合释义不能单定词性；名词和动词独立，原标注保留。", "forms": [["n./v.", ["支持；赞同；偏爱"]]]},
  ],
  "favorite": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["最喜欢的人或事；偏爱的"]]]},
  ],
  "fear": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["担忧；害怕"]]]},
  ],
  "female": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["女性；雌性的"]]]},
  ],
  "fertile": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["有生育力的；肥沃的"]]]},
  ],
  "fewer": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["det./pron.（较少的，修饰可数名词复数）", ["较少的（修饰可数名词复数）"]]]},
  ],
  "fifty": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["numeral/adj.（五十；五十的）", ["五十；五十的"]]]},
  ],
  "fight": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["打斗；战斗；斗争"]]]},
  ],
  "figure": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["v.", ["数字；人物；体形；图表； 认为、估计；figure out弄清。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["公众人物；数字；人物"]]]},
  ],
  "file": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["n. / v.", ["文件、卷宗、档案；锉刀。 归档；排成纵队行进；锉平。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["正式申请；提交文件"]]]},
  ],
  "fill": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["使充满"]]]},
  ],
  "finance": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["为……提供资金；融资"]]]},
  ],
  "fine": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv./n./v.", ["精致的；美好的；罚款"]]]},
  ],
  "finite": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj.", ["限定的；有界限的"]]]},
  ],
  "firm": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["adj.", ["坚定的；牢固的，如a firm decision坚定的决定。"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["公司；牢固的"]]]},
  ],
  "first": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv./n.", ["第一的；首先"]]]},
  ],
  "fix": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["固定；确定；修理"]]]},
  ],
  "flare": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["闪光；突然燃烧"]]]},
  ],
  "flash": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["闪光；快速闪现"]]]},
  ],
  "flat": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["平坦的；扁平的；固定的（flat fee固定费用）；乏味的；英式名词公寓。"]]]},
  ],
  "flow": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["气流；流动"]]]},
  ],
  "focus": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["集中关注；焦点"]]]},
  ],
  "focusing": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.-ing", ["聚焦；集中"]]]},
  ],
  "follow": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["跟随；接着"]]]},
  ],
  "following": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["prep. / n.", ["在……之后：following the meeting会后； 追随者群体：a large following众多拥护者。"]]]},
  ],
  "fool": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["v./n.", ["欺骗；使受骗"]]]},
  ],
  "force": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["武力；强迫"]]]},
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["力量；推动因素"]]]},
  ],
  "form": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["形式；形态；形成"]]]},
  ],
  "fortune": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["巨额财富：make a fortune发财；cost a fortune花费很多钱。"]]]},
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["运气、命运：good fortune好运。"]]]},
  ],
  "french": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["法国人；法国的"]]]},
  ],
  "fund": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./v.", ["资金；为……提供资金"]]]},
  ],
  "furnish": [
    {"reason": "原词典说明含多个义项或例句；各核心义单列，原说明保留查阅。", "forms": [["", ["为房屋配备家具；furnish somebody with something向某人提供某物。"]]]},
  ],
  "further": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["adj./adv./v.", ["进一步的；更远地"]]]},
  ],
  "future": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["未来；未来的"]]]},
  ],
  "futurist": [
    {"reason": "旧词典默认释义混合词性或多个意思；核心义分别展示，原文保留查阅。", "forms": [["n./adj.", ["未来主义者；未来主义的"]]]},
  ],
};
