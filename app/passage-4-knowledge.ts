import type { VocabEntry } from "./data";

type Structure = NonNullable<VocabEntry["structures"]>[number];

type Definition = {
  key: string;
  source: string;
  canonical: string;
  type: string;
  meaning: string;
  grammarRole: string;
  rule: string;
  english: string;
  chinese: string;
  pitfalls: string[];
};

const s = (pattern: string, meaning: string, rule: string, english: string, chinese: string): Structure => ({
  pattern,
  meaning,
  rule,
  examples: [{ english, chinese }],
});

const d = (
  key: string,
  source: string,
  canonical: string,
  type: string,
  meaning: string,
  grammarRole: string,
  rule: string,
  english: string,
  chinese: string,
  pitfalls: string[],
): Definition => ({ key, source, canonical, type, meaning, grammarRole, rule, english, chinese, pitfalls });

const definitions: Definition[] = [
  d("has-hardly-been-typical-of", "has hardly been typical of", "be typical of + noun", "系表结构", "几乎不是……的典型", "现在完成时系表结构", "typical 是表语形容词，of 后接被描述的对象；hardly 表示接近否定。", "This pattern has hardly been typical of the industry.", "这种模式几乎不是该行业的典型。", ["hardly 不是 hard 的比较级；不要把 be typical of 改成 *be typical for。"]),
  d("the-envy-of", "the envy of", "be the envy of + person/group", "名词搭配", "成为……羡慕的对象", "名词短语中的 of 补足语", "envy 在这里是名词，the envy of 后接羡慕者；主语是被羡慕的对象。", "Her research became the envy of other teams.", "她的研究成了其他团队羡慕的对象。", ["the envy of 不等于动词 envy somebody；不要把羡慕者和被羡慕对象倒置。"]),
  d("postwar-japan", "postwar Japan", "postwar + place/name", "复合形容词短语", "战后的日本", "复合形容词作前置定语", "postwar 直接修饰专名 Japan，表示战争结束后的时期；通常不写成 *post-war Japan 在本题中混用。", "Postwar Japan rebuilt its economy rapidly.", "战后日本迅速重建了经济。", ["postwar 修饰时期，不表示‘战后发生的某一次日本’；Japan 是专名。"]),
  d("seeing-a-decline-of", "seeing a decline of", "see a decline in/of + noun", "动词 + 名词搭配", "看到……的衰退", "see 的现在分词作谓语", "decline 是变化名词，of/in 后接衰退对象；see a decline in 更常用于正式报道。", "Researchers are seeing a decline in enrollment.", "研究人员看到入学人数在下降。", ["decline 作名词时不能直接省掉介词；不要写 *see decline students。"]),
  d("traditional-work-moral-values", "traditional work-moral values", "traditional + work-ethic values", "复合名词短语", "传统的工作道德价值观", "多重前置修饰语", "work-moral 是原文复合修饰语，和 values 一起表示工作伦理方面的价值观。", "Traditional work-ethic values shaped the workplace.", "传统的工作伦理价值观塑造了职场。", ["work-moral 是修饰语，不要把 moral 当作另一个并列名词。"]),
  d("ten-years-ago", "Ten years ago", "数词 + years ago", "时间状语", "十年前", "一般过去时的时间定位", "ago 表示距现在的过去时长，通常与一般过去时连用。", "Ten years ago, the town was much smaller.", "十年前，这座城镇小得多。", ["ago 不能与现在完成时直接搭配表示同一时间点；不要写 *has happened ten years ago。"]),
  d("saw-their-jobs-as", "saw their jobs as", "see A as B", "动词 + 宾语补足语", "把工作看作……", "see 的过去式及 as 补足语", "A 是被看待对象，as B 是身份或性质补足语；时态由 saw 表示。", "They saw the project as a public duty.", "他们把这个项目看作公共责任。", ["see A as B 不能写成 *see A for B；as 后接名词或形容词补足语。"]),
  d("primary-reason-for-being", "primary reason for being", "the reason for being + complement", "名词 + 介词短语", "存在的首要理由", "reason 的后置修饰", "for being 中 being 是介词 for 的动名词，说明理由所针对的存在状态。", "Service was his primary reason for being.", "服务他人是他存在的首要理由。", ["being 在此是动名词，不是 be 的进行时；不要漏掉 for。"]),
  d("fulfilled-its-economic-needs", "fulfilled its economic needs", "fulfill + one's needs", "动词搭配", "满足了经济需要", "及物动词 + 宾语", "fulfill 直接接 needs，表示达到需要的程度；its 指 Japan。", "The program fulfilled the community's needs.", "这个项目满足了社区的需要。", ["fulfill needs 表满足需求，不等于 fill in a form；不要把 need 用成介词宾语。"]),
  d("where-they-should-go-next", "where they should go next", "know/decide where + subject + should do", "间接疑问从句", "不知道下一步该往哪里走", "know 的宾语从句", "where 在从句中作地点副词，should 表合理的下一步；从句使用陈述语序。", "We are unsure where we should go next.", "我们不确定下一步该往哪里走。", ["间接疑问句不用倒装；不要写 *where should we go next 作 know 的宾语。"]),
  d("coming-of-age", "coming of age", "come of age", "名词化短语", "成年；达到成熟阶段", "of 短语作后置修饰", "coming 是动名词名词化形式，of age 说明达到年龄阶段；作主语时谓语按整体处理。", "The coming of age of a new generation changed the culture.", "新一代人的成年改变了文化。", ["coming of age 不是‘年龄到来’的字面地点表达；不要与 age coming 混序。"]),
  d("entry-of-women-into", "entry of women into", "the entry of A into B", "名词 + 介词搭配", "女性进入……", "entry 的 of 所属与 into 方向补足", "entry 是中心名词，of women 说明进入者，into 后接进入的领域或场所。", "The entry of women into science broadened research.", "女性进入科学领域拓宽了研究。", ["entry of A into B 中 into 表进入领域，不能用 *entry of A to B 表同一结构。"]),
  d("male-dominated-job-market", "male-dominated job market", "male-dominated + workplace/market", "过去分词复合形容词", "男性占主导的就业市场", "复合形容词作定语", "male-dominated 中 dominated 是过去分词，表示市场被男性主导。", "A male-dominated market can exclude qualified applicants.", "男性主导的市场可能排斥合格申请者。", ["dominated 需要过去分词形式；不要把 male 与 dominated 拆成两个并列谓语。"]),
  d("limited-the-opportunities-of", "have limited the opportunities of", "limit the opportunities of + group", "动词 + 名词搭配", "限制了……的机会", "现在完成时及物结构", "limit 直接接 opportunities，of 后说明机会属于谁；have 与并列主语保持一致。", "High costs have limited the opportunities of rural students.", "高成本限制了农村学生的机会。", ["limit 是及物动词，不说 *limit to opportunities；机会的所属者放在 of 后。"]),
  d("questioning-heavy-sacrifices", "questioning the heavy personal sacrifices involved in", "question the sacrifices involved in doing", "动词 + 分词后置修饰", "质疑做某事所涉及的巨大个人牺牲", "question 的宾语带过去分词短语", "involved in 后接名词或动名词，说明牺牲与某行动的关联；questioning 是现在分词。", "They questioned the sacrifices involved in moving abroad.", "他们质疑移居国外所涉及的牺牲。", ["involved in 后用 doing 或名词；不要写 *involved to climb。"]),
  d("climbing-rigid-social-ladder", "climbing Japan's rigid social ladder", "climb the social ladder", "比喻性动词短语", "攀登日本僵化的社会阶梯", "动名词短语作介词宾语", "climb 在此是逐步提升社会地位的比喻，Japan's 修饰 social ladder。", "Education helped her climb the social ladder.", "教育帮助她提升了社会地位。", ["social ladder 是比喻，不是实际梯子；climb 后可直接接 ladder，不要加 *to。"]),
  d("in-a-recent-survey", "In a recent survey", "in a survey", "介词时间/来源短语", "在最近的一项调查中", "句首背景状语", "in 后接 survey 表信息来源或调查范围，recent 修饰 survey。", "In a recent survey, most users preferred the simpler design.", "最近一项调查显示，大多数用户偏好更简单的设计。", ["survey 是调查名词；不要把 in a survey 误解成‘进入调查’的动作。"]),
  d("in-westerners-eyes", "In the Westerners' eyes", "in one's eyes", "观点介词短语", "在西方人看来", "句首观点来源状语", "in one's eyes 表示某人的看法；所有格代词或名词所有格放在 eyes 前，eyes 通常用复数。", "In her eyes, the decision was reasonable.", "在她看来，这个决定是合理的。", ["不能写成 *in the Westerners eye；表示某人的看法时 eyes 要用复数并保留所有格。"]),
  d("it-was-found-that", "it was found that", "it is/was found that + clause", "被动报告结构", "据发现；调查发现……", "形式主语 it + that 从句", "it 是形式主语，that 从句是真正内容；时态由 was 决定。", "It was found that the two groups differed.", "研究发现两组存在差异。", ["that 从句不可省略为孤立 it was found；不要把 it 当作具体事物。"]),
  d("fully-satisfied-with", "were fully satisfied with", "be satisfied with + noun", "形容词 + 介词", "对……完全满意", "系动词 + 形容词表语", "satisfied 后固定接 with，fully 修饰满意程度。", "The participants were satisfied with the results.", "参与者对结果感到满意。", ["satisfied with 表满意对象；不要与 satisfying（令人满意的）混淆。"]),
  d("cultivate-creativity", "cultivate creativity", "cultivate + abstract noun", "动词 + 名词搭配", "培养创造力", "及物动词 + 抽象名词", "cultivate 直接接需要长期培养的能力或品质；creativity 通常作不可数抽象名词。", "Good teaching can cultivate creativity.", "良好的教学能够培养创造力。", ["cultivate 直接接宾语，不说 *cultivate to creativity；creativity 在一般意义下不加复数。"]),
  d("compared-with", "compared with", "compared with + noun", "过去分词比较状语", "与……相比", "省略主语的比较状语", "compared with 引出比较基准，逻辑主语通常是前面的比例或事实。", "Compared with last year, sales are higher.", "与去年相比，销售额更高。", ["compared with 不是 compare to 的任意替换；比较两项时要保持基准清楚。"]),
  d("in-addition", "In addition", "in addition (to + noun)", "连接副词", "此外；另外", "句间递进连接", "单独作连接副词时后常接逗号；若接名词要用 in addition to。", "In addition, the policy reduced costs.", "此外，这项政策降低了成本。", ["in addition 与 in addition to 句法不同；不要写 *in addition the survey。"]),
  d("far-more", "far more", "far + comparative/more + noun", "程度比较结构", "多得多；远远更多", "程度副词修饰比较级", "far 加强 more 的比较程度，比较对象由 than 短语引出或省略。", "Far more students chose the evening class.", "多得多的学生选择了晚课。", ["far more 不是单纯的 very many；比较语境中要能找到隐含或明示的基准。"]),
  d("expressed-dissatisfaction-with", "expressed dissatisfaction with", "express dissatisfaction with + noun", "动词 + 名词搭配", "表达对……的不满", "及物动词 + 抽象名词 + 介词", "dissatisfaction 是不可数抽象名词，with 引出不满对象。", "Workers expressed dissatisfaction with the schedule.", "工人表达了对日程安排的不满。", ["不能写 *dissatisfaction to the schedule；express 与 say 的句法也不同。"]),
  d("than-did", "than did", "more ... than did + subject", "比较结构倒装", "比……做得更多/程度更高", "than 从句部分倒装", "did 代替前面重复的实义动词，主语置于 did 后以避免重复。", "More people attended than did last year.", "到场的人比去年多。", ["than did 不是固定动词短语；did 后必须有比较从句主语或可恢复的主语。"]),
  d("counterparts-in-surveyed-countries", "their counterparts in the 10 other countries surveyed", "one's counterpart(s) in + place", "名词短语", "在其他受调查国家中与之对应的人", "counterpart 的后置地点修饰", "counterparts 指同类对应者，surveyed 是 countries 的过去分词后置修饰。", "The researchers compared nurses with their counterparts abroad.", "研究人员把护士与国外的对应群体进行了比较。", ["counterpart 不是竞争对手；surveyed 修饰 countries，不是修饰 people。"]),
  d("praised-by-foreigners", "praised by foreigners", "be praised by + person", "被动语态", "受到外国人的称赞", "过去分词被动结构", "by 引出赞扬者，praised 的对象是主语；for 可另引出赞扬原因。", "The method was praised by reviewers.", "这种方法受到评审者称赞。", ["by 后接施动者，不能写 *praised from foreigners；赞扬原因用 for。"]),
  d("emphasis-on-the-basics", "emphasis on the basics", "emphasis on + noun", "名词搭配", "对基础知识的强调", "名词 + 介词后置修饰", "emphasis 是中心名词，on 引出被强调内容；the basics 指基础事项。", "The course puts emphasis on the basics.", "这门课程强调基础知识。", ["emphasis 后用 on，不用 *emphasis to；basics 是名词复数，不是 basic 的谓语。"]),
  d("tends-to-stress", "tends to stress", "tend to do", "动词不定式搭配", "往往强调；倾向于强调", "谓语 + 不定式", "tend 后接 to do，主语为第三人称单数时用 tends。", "The policy tends to stress short-term gains.", "这项政策往往强调短期收益。", ["tend to 后接动词原形；不要写 *tends stressing 表本结构。"]),
  d("test-taking", "test taking", "test-taking", "动名词化复合名词", "应试；参加考试", "并列名词短语", "test taking 把动作名词化，和 mechanical learning 并列作 stress 的宾语。", "Test taking requires careful time management.", "应试需要仔细管理时间。", ["test taking 在此不是 test 正在拿东西；作为活动名词可写 test-taking。"]),
  d("over-creativity-and-self-expression", "over creativity and self-expression", "stress A over B", "比较取舍结构", "把 A 置于 B 之上", "介词 over 引出的比较对象", "over 表示偏重或优先，A、B 应保持平行；self-expression 是复合名词。", "The system rewards speed over creativity.", "这个体系重速度而轻创造力。", ["over 在此不是空间‘在……上方’；不能把 A over B 译成简单并列。"]),
  d("show-up-in", "show up in", "show up in + place/record", "短语动词 + 介词", "在……中显现", "不及物短语动词", "show up 表示显现，in 后接记录、数据或场所；主语是显现的内容。", "The error showed up in the final report.", "错误在最终报告中显现出来。", ["show up 不等于 show somebody；in 后接显现载体，不是施动者。"]),
  d("test-scores", "test scores", "test score(s)", "名词复合结构", "考试分数", "名词作前置修饰语", "test 修饰 scores，说明分数的来源；scores 用复数表示多项成绩。", "Her test scores improved this term.", "她这学期的考试分数提高了。", ["score 是分数，test scores 不是‘测试分数们’的逐词硬译；注意 score 与 grade 的语境差别。"]),
  d("completely-ignored", "are completely ignored", "be ignored", "被动语态", "被完全忽视", "be + 过去分词", "ignored 表示承受忽视，completely 修饰程度；主语是被忽视的品质。", "Important warnings were completely ignored.", "重要警告被完全忽视了。", ["ignored 不是‘无知的’形容词；被动结构需要 be。"]),
  d("chairman-of", "chairman of", "chairman of + organization", "职务名词搭配", "……的主席", "名词 + of 所属结构", "of 后接所领导的委员会或机构，chairman 是身份名词。", "She is chairman of the review committee.", "她是评审委员会主席。", ["chairman of 后接机构，不是主席正在做的动作；性别中性称呼可用 chairperson。"]),
  d("ruling-party-education-committee", "the ruling Liberal Democratic Party's", "the ruling + party's + noun", "所有格名词短语", "执政自民党的……", "复合定语与所有格", "ruling 修饰 party，Party's 再以所有格限定后面的 committee；专名首字母大写。", "The ruling party's education committee issued a statement.", "执政党的教育委员会发表了声明。", ["party's 是 party 的所有格，不是 party is；不要漏掉撇号。"]),
  d("this-kind-of-thing", "this kind of thing", "this kind of + singular noun", "指示限定结构", "这种事情", "kind of 名词短语", "this 限定 kind，of 后接类别内容；thing 用单数表示一类事。", "This kind of thing needs careful discussion.", "这种事情需要仔细讨论。", ["this kind of 后通常接单数名词；复数泛指可用 these kinds of things。"]),
  d("leads-kids-to", "leads kids to", "lead sb to do sth", "使役结果结构", "导致孩子做……", "lead + 宾语 + 不定式", "kids 是 to do 的逻辑主语，lead 的第三人称单数形式为 leads。", "Stress can lead children to withdraw.", "压力可能导致孩子退缩。", ["lead sb to do 不能省略 to；不要与 lead to + 名词的结构混淆。"]),
  d("drop-out", "drop out", "drop out (of school)", "短语动词", "辍学；退出", "不及物短语动词", "drop out 可单独使用，说明退出某项活动；明确对象时用 drop out of。", "Some students drop out of school early.", "一些学生很早就辍学了。", ["drop out 后不能直接接宾语；应说 drop out of school，而不是 *drop out school。"]),
  d("run-wild", "run wild", "run wild", "习语", "失去控制；放任胡闹", "系动词式短语", "wild 作补语描述行为状态，run 在此表示变得或处于某状态。", "Without guidance, rumors can run wild.", "没有引导，谣言可能失控扩散。", ["run wild 不只是‘在野外跑’；抽象主语时表示失控。"]),
  d("last-year", "Last year", "last + time noun", "时间状语", "去年", "句首时间定位", "last 直接修饰 year，通常与一般过去时连用。", "Last year, the school changed its policy.", "去年，学校改变了政策。", ["last year 不需要介词 in；不要写 *in last year。"]),
  d("incidents-of", "incidents of", "incidents of + event", "数量名词搭配", "……事件（的若干起）", "名词 + of 内容说明", "incidents 是可数事件，of 后说明事件类别。", "The report lists incidents of fraud.", "报告列出了多起欺诈事件。", ["incident of 表单起事件，数量多时用 incidents；不要把 of 当作施动关系。"]),
  d("school-violence", "school violence", "school + uncountable event noun", "名词复合搭配", "校园暴力", "名词作前置修饰语", "school 修饰 violence，violence 在此为不可数类别名词。", "Schools need plans to prevent school violence.", "学校需要制定防止校园暴力的计划。", ["violence 通常不可数；不要写 *school violences 表示一般校园暴力。"]),
  d("including-assaults-on-teachers", "including 929 assaults on teachers", "including + number + noun", "分词介词结构", "其中包括 929 起袭击教师事件", "including 引出的补充说明", "including 后接被包含的数量，assaults on teachers 中 on 引出受害者。", "The total includes five assaults on staff.", "总数包括五起袭击工作人员的事件。", ["including 不是完整谓语；assault on 后用 on，不要写 *assault at teachers。"]),
  d("assaults-on-teachers", "assaults on teachers", "assault on + victim", "名词 + 介词搭配", "对教师的袭击", "名词短语", "assault 是攻击事件名词，on 后接受害者；复数表示多起事件。", "Assaults on teachers caused public concern.", "袭击教师的事件引起了公众关注。", ["assaults on teachers 不是教师发动袭击；on 后的名词是受害对象。"]),
  d("amid-the-outcry", "Amid the outcry", "amid + noun", "介词背景短语", "在强烈抗议声中", "句首背景状语", "amid 后接名词短语，表示某行动发生时的环境或舆论背景。", "Amid the outcry, officials promised an inquiry.", "在舆论哗然中，官员承诺展开调查。", ["amid 是介词，不能单独作谓语；outcry 表强烈抗议，不是普通声音。"]),
  d("seeking-a-return-to", "are seeking a return to", "seek a return to + noun", "动词 + 名词搭配", "寻求回归……", "进行时谓语 + 名词宾语", "seek 可直接接 a return to，to 后接要恢复的状态或传统。", "The group is seeking a return to local control.", "该团体寻求恢复地方控制。", ["return to 后接名词时表示回归对象；不要误写成 *return doing。"]),
  d("prewar-emphasis-on", "prewar emphasis on", "prewar emphasis on + topic", "复合定语 + 名词搭配", "战前对……的重视", "emphasis 的后置介词补足", "prewar 修饰 emphasis，on 后接被重视的领域；两层修饰不能拆散。", "The book describes the prewar emphasis on discipline.", "这本书描述了战前对纪律的重视。", ["prewar 修饰时期，emphasis on 才引出内容；不要把 on 改成 *of。"]),
  d("moral-education", "moral education", "moral + education", "名词复合搭配", "道德教育", "形容词作前置定语", "moral 修饰 education，表示培养道德观念的教育领域。", "Moral education was part of the curriculum.", "道德教育是课程的一部分。", ["moral education 是领域名称，不等于 moral lessons 的单次课程。"]),
  d("raised-eyebrows", "raised eyebrows", "raise eyebrows", "习语", "引起惊讶、质疑或非议", "动词 + 宾语习语", "eyebrows 用复数，raise 的过去式 raised 表示引发反应。", "The sudden decision raised eyebrows.", "这个突然的决定引起了质疑。", ["raise eyebrows 通常是比喻，不是字面抬眉；不能写成 *raise eyebrow 表一般反应。"]),
  d("he-argued-that", "he argued that", "argue that + clause", "动词 + 宾语从句", "他主张/认为……", "引述观点的谓语", "argue 后接 that 从句陈述论点；过去式 argued 与叙述时态一致。", "He argued that the rule needed revision.", "他认为这条规则需要修改。", ["argue that 表提出论点，不必然表示争吵；that 从句使用陈述语序。"]),
  d("introduced-by", "introduced by", "be introduced by + agent", "过去分词后置修饰", "由……引入的", "reforms 的被动修饰语", "introduced 是过去分词，by 后接引入者；可还原为 which were introduced by。", "The method introduced by the team spread quickly.", "团队引入的方法迅速推广。", ["introduced by 修饰名词，不是独立谓语；注意 by 后是施动者。"]),
  d("introduce-a-into-b", "introduce A into B", "introduce A into B", "动词 + 宾语 + 介词", "把 A 引入 B", "及物动词带方向补语", "introduce 直接接被引入对象，into 引出进入的体系、领域或场所；A、B 是可替换的语法变量。", "The reform introduced new methods into schools.", "这项改革把新方法引入了学校。", ["introduce A into B 中 into 表进入范围，不能把 introduce 与 *to do 混成同一结构；A、B 只是占位变量。"]),
  d("after-world-war-ii", "after World War II", "after + historical event", "时间介词短语", "第二次世界大战之后", "时间状语", "after 后接历史事件名词，World War II 是专名，首字母大写。", "Many institutions changed after World War II.", "许多机构在二战后发生了变化。", ["World War II 前通常不加普通冠词；after 表时间先后，不是原因介词。"]),
  d("respect-for-parents", "respect for parents", "respect for + person/group", "名词 + 介词搭配", "对父母的尊重", "名词短语中的 for 补足语", "respect 是抽象名词，for 后接尊重对象；parents 用复数泛指父母。", "Respect for parents was strongly encouraged.", "人们强烈倡导尊重父母。", ["respect for 表尊重对象；不要与 respectful to 的形容词结构混用。"]),
  d("more-to-do-with", "have more to do with", "have to do with + noun", "固定短语", "更多与……有关", "have 的实义动词短语", "to do with 表关联，more 表比较程度；have 在此不是完成时助动词。", "The outcome has more to do with timing than luck.", "结果更多取决于时机而非运气。", ["have to do with 不表示‘必须做’；不要把 have 误判为完成时助动词。"]),
  d("japanese-life-styles", "Japanese life-styles", "Japanese + lifestyle(s)", "复合名词", "日本人的生活方式", "专有形容词作定语", "Japanese 修饰 life-styles，复合名词可写 lifestyle；复数表示多种生活方式。", "Japanese lifestyles vary between regions.", "日本各地区的生活方式各不相同。", ["life-style/lifestyle 是同一词的两种写法；不要把 Japanese 当普通可数名词加 s。"]),
  d("question-of-whether", "a question of whether", "a question of whether + clause", "名词 + 从句结构", "是否……的问题", "question 的 of 补足语", "of 后可接 whether 引导的名词性从句，说明问题的具体内容。", "It is a question of whether the plan is affordable.", "问题在于该计划是否负担得起。", ["whether 从句要保留完整主语和谓语；不要写 *question whether of。"]),
  d("enjoy-job-and-life", "enjoy your job and your life", "enjoy + noun", "动词并列宾语", "享受工作和生活", "及物动词连接两个并列宾语", "enjoy 直接接名词或动名词，your job 与 your life 保持并列。", "Try to enjoy your work and your life.", "尽量享受你的工作和生活。", ["enjoy 后不能接不定式 *enjoy to do；并列宾语前后结构要一致。"]),
  d("how-much-you-can-endure", "how much you can endure", "how much + subject + can + verb", "how 引导名词性从句", "你能忍受多少", "question 的从句宾语", "how much 在从句中作程度/数量成分，can 后接动词原形 endure。", "We tested how much the material could endure.", "我们测试了这种材料能承受多大程度。", ["间接疑问句用陈述语序；不要写 *how much can you endure 作从句。"]),
  d("only-how-much-you-can-endure", "but only how much you can endure", "not whether A but (only) how much B", "not...but... 对照结构", "而只是能忍受多少", "并列名词性从句", "but only 与前面的 never a question of whether 构成排他性对照，两个从句保持平行。", "The issue is not whether we start, but only how much we can sustain.", "问题不在于是否开始，而只在于我们能维持多久。", ["not...but... 两侧应保持同类结构；only 修饰后面的 how much 从句。"]),
  d("with-economic-growth", "With economic growth", "with + noun", "伴随背景介词短语", "随着经济增长", "句首伴随状语", "with 引出伴随发生的背景，后面可接倒装主句说明随之出现的结果。", "With economic growth came new pressures.", "随着经济增长，新的压力出现了。", ["with 在此不是‘和某人一起’；后接抽象名词表示伴随背景。"]),
  d("has-come-centralization", "has come centralization", "with X has come Y", "倒装结构", "集中化随之而来", "介词短语引导的部分倒装", "正常语序是 centralization has come with economic growth；地点/背景短语前置后主语置于 come 之后。", "With reform has come greater transparency.", "随着改革，更高的透明度出现了。", ["倒装后 has come 仍与 centralization 一致；不要把 has 当作 centralization 的后置修饰。"]),
  d("percent-of", "percent of", "percent of + plural noun", "数量结构", "……的百分之……", "百分比名词短语", "percent of 后接整体范围；谓语数通常由 of 后名词决定。", "Seventy percent of the members agreed.", "百分之七十的成员同意了。", ["percent of 后的谓语不总是单数；看后面的名词是可数复数还是不可数。"]),
  d("live-in-cities", "live in cities", "live in + place", "动词 + 地点介词", "居住在城市", "不及物动词地点补足", "live 表居住，in 引出地点；cities 用复数表示城市这一类地点。", "Many families live in cities.", "许多家庭住在城市。", ["live in 表静态居住，不能用 into；运动进入才用 move into。"]),
  d("in-favor-of", "in favor of", "in favor of + noun", "介词短语", "支持；选择而不是", "方式/取舍状语", "favor 是名词，of 后接支持或替代的对象；in favor of A 可与 against B 对照。", "The committee voted in favor of the proposal.", "委员会投票支持该提案。", ["in favor of 不是 favor 的动词结构；英式拼写可见 in favour of。"]),
  d("two-generation-households", "two-generation households", "two-generation + plural noun", "复合形容词", "两代人的家庭", "复合形容词作前置定语", "two-generation 用连字符连接数量和名词，修饰 households；households 用复数。", "Two-generation households are common in the region.", "两代家庭在该地区很常见。", ["复合形容词中的 generation 通常用单数；不要写 *two-generations household。"]),
  d("long-endured", "have long endured", "have long + past participle", "完成时 + 程度副词", "长期忍受", "现在完成时谓语", "long 修饰完成时动作的持续时间，endure 是及物动词，后接负担。", "Residents have long endured heavy traffic.", "居民长期忍受严重交通拥堵。", ["have long endured 强调延续到现在，不是单纯过去；不要漏掉 have。"]),
  d("to-and-from-work", "to and from work", "to and from + place", "方向介词并列", "往返工作地点", "commutes 的后置说明", "to and from 成对表示往返方向，work 在此为地点/活动名词。", "She travels to and from work by train.", "她乘火车往返上下班。", ["to and from 不能只保留一个方向表示往返；work 在此通常不加冠词。"]),
  d("living-conditions", "living conditions", "living + conditions", "名词复合搭配", "居住条件；生活条件", "现在分词/名词作前置修饰", "living 修饰 conditions，说明与生活相关的条件；conditions 通常用复数。", "The survey examined living conditions.", "调查考察了生活条件。", ["living conditions 不是‘正在居住的条件’；living 在此是名词修饰语。"]),
  d("as-values-weaken", "as the old group and family values weaken", "as + subject + verb", "时间兼原因从句", "随着旧有群体和家庭价值观削弱", "as 引导状语从句", "as 可表示随着或由于，主语是并列的 values，谓语用 weaken。", "As social ties weaken, isolation grows.", "随着社会纽带减弱，孤立感加重。", ["as 从句需有完整主语和谓语；不要把 weaken 当及物动词漏掉主语。"]),
  d("beginning-to-tell", "is beginning to tell", "begin to tell", "习语性结果表达", "开始产生明显影响", "进行时 + 不定式", "tell 在此表示影响显现，begin to do 表动作刚开始；主语通常是压力或后果。", "The long delay is beginning to tell on morale.", "长时间的延误开始影响士气。", ["begin to tell 不是开始讲故事；表达‘产生影响’时常与 on/upon 连用。"]),
  d("in-the-past-decade", "In the past decade", "in/during the past + period", "时间范围短语", "在过去十年中", "现在完成时的时间状语", "past decade 从过去延续到现在，常与现在完成时搭配。", "In the past decade, online learning has expanded.", "过去十年，在线学习扩大了。", ["in the past decade 与 ten years ago 不同；前者通常包含截至现在的变化。"]),
  d("well-below-that-of", "well below that of", "be below that of + comparator", "比较结构", "远低于……的（同类指标）", "below + that 替代名词", "that 代替前面重复的 rate，of 后接比较对象；well 加强程度。", "The cost is well below that of the alternative.", "成本远低于另一方案的成本。", ["that of 不能省略 of；that 指同类名词，不是指示某个具体物件。"]),
  d("increased-by", "has increased by", "increase by + amount/percentage", "变化幅度结构", "增加了……幅度", "现在完成时 + by 介词短语", "by 后接增加的幅度，不能与 increase to（增加到某数值）混淆。", "The rate has increased by 12 percent.", "该比率增加了百分之十二。", ["increase by 表增量，increase to 表终值；两者不能机械互换。"]),
  d("more-than-fifty-percent", "more than 50 percent", "more than + number + percent", "数量比较结构", "超过百分之五十", "数量短语作幅度补语", "more than 修饰具体百分比，表示超过该基准；percent 后可省略重复名词。", "Costs rose by more than 50 percent.", "成本上涨了百分之五十以上。", ["more than 50 percent 是超过一半，不等于‘多于百分之五十个百分点’；注意增幅和比例的区别。"]),
  d("by-nearly-one-quarter", "by nearly one-quarter", "increase by nearly + fraction", "变化幅度结构", "增加了将近四分之一", "by 引出的分数幅度", "nearly 修饰 one-quarter，by 表示变化量；one-quarter 可写 a quarter。", "The population fell by nearly one-quarter.", "人口减少了近四分之一。", ["by nearly one-quarter 表增幅，不是增加到四分之一；不要漏掉 by。"]),
  d("express-dissatisfaction-with", "express dissatisfaction with", "express dissatisfaction with + noun", "动词 + 名词 + 介词", "表达对……的不满", "及物动词带抽象名词宾语", "express 直接接 dissatisfaction，with 引出不满的对象；dissatisfaction 通常不可数。", "Employees express dissatisfaction with the schedule.", "员工表达了对日程安排的不满。", ["不要写 *dissatisfaction to；with 后接不满对象，不能把 dissatisfaction 当作可数个体随意加 a。"]),
];

const extraCollocations: Definition[] = [
  d("the-envy-of-us-europe", "the envy of the United States and Europe", "be the envy of + group", "名词搭配", "成为美国和欧洲羡慕的对象", "系表结构中的名词补足", "the envy of 后接羡慕者，完整主语是被羡慕的成就或对象。", "The laboratory became the envy of the United States and Europe.", "这座实验室成了美国和欧洲羡慕的对象。", ["不要把 United States and Europe 当成 envy 的宾语；它们是羡慕者。"]),
  d("place-emphasis-on", "place emphasis on", "place emphasis on + noun", "动词搭配", "把重点放在……上", "及物动词 + 名词 + 介词", "place 与 emphasis 固定搭配，on 后接重视对象。", "Schools should place emphasis on reading.", "学校应把重点放在阅读上。", ["place emphasis on 不能改成 *place emphasis to；也可说 put emphasis on。"]),
  d("lead-kids-to-drop-out", "lead kids to drop out", "lead sb to do", "使役结果结构", "导致孩子辍学", "lead + 宾语 + 不定式", "kids 是 drop out 的逻辑主语，to 后接短语动词原形。", "Neglect may lead kids to drop out.", "忽视可能导致孩子辍学。", ["lead 后的宾语和不定式逻辑主语不能错位；drop out 不直接带宾语。"]),
  d("a-return-to", "a return to", "a return to + noun", "名词搭配", "回归……", "return 的 to 补足语", "a return 是名词，to 后接要恢复的制度、地点或状态。", "The reform marked a return to simplicity.", "这项改革标志着回归简洁。", ["名词 return to 后接名词；动词 return to 则表示返回动作，注意词性。"]),
  d("place-stress-on", "place stress on", "place stress on + noun", "动词搭配", "强调；把压力/重视放在……上", "place + 抽象名词 + 介词", "stress 作名词时需要 place 与 on 构成完整搭配，on 引出对象。", "The report places stress on prevention.", "报告强调预防。", ["place stress on 与 stress A over B 的结构不同；不要漏掉 on。"]),
  d("begin-to-tell", "begin to tell", "begin to tell on + noun", "习语搭配", "开始对……产生影响", "begin + 不定式", "tell on 后接受影响者，表示压力或疲劳开始显现后果。", "The workload began to tell on her health.", "工作量开始影响她的健康。", ["tell on 才表达‘产生影响’；单独 tell 通常不是这个意思。"]),
  d("tolerant-of", "tolerant of", "be tolerant of + noun", "形容词 + 介词", "能容忍……", "系表结构", "tolerant 后固定接 of，引出能够接受或忍受的对象。", "A good manager is tolerant of honest mistakes.", "好的管理者能容忍诚实的错误。", ["tolerant of 不等于 tolerant to；不要与 tolerate 直接接宾语混淆。"]),
  d("satisfied-with", "satisfied with", "be satisfied with + noun", "形容词 + 介词", "对……满意", "系表结构", "satisfied 描述人的感受，with 引出满意对象。", "The client is satisfied with the service.", "客户对服务感到满意。", ["satisfied with 描述人的感受，satisfying 描述令人满意的事物。"]),
  d("under-aimless-development", "under aimless development", "under + adjective + noun", "介词状态短语", "处于无明确目标的发展状态下", "be under + 名词短语的状态补语", "under 引出所处状态，aimless 修饰不可数名词 development；介词短语可作 be 的补语。", "The project remained under careful development.", "这个项目仍处于谨慎开发阶段。", ["under 在此表示处于某种状态，不是空间‘在……下面’；development 前的形容词要直接修饰名词。"]),
  d("positive-example", "positive example", "a positive example", "名词短语", "正面范例；值得肯定的例子", "系动词后的表语", "positive 修饰可数名词 example，单数形式通常需要 a；可用 for/of 引出借鉴对象。", "The program became a positive example for other schools.", "这个项目成了其他学校的正面范例。", ["positive example 不是‘积极的样本’的机械直译；单数可数名词前不要漏掉 a。"]),
  d("a-rival-to", "a rival to", "a rival to + noun", "名词 + 介词搭配", "……的竞争对手", "名词 rival 的 to 补足语", "rival 表示与某对象竞争的人或事物，to 后接竞争对象；也可见 rival of，但本结构用 to。", "The new service became a rival to the market leader.", "这项新服务成了市场领导者的竞争对手。", ["rival to 表竞争关系，不是 rival 的动作宾语；不要把 to 后的对象误当成被帮助者。"]),
  d("on-the-decline", "on the decline", "be on the decline", "介词状态短语", "处于衰退中；正在下降", "be + 状态介词短语", "on the decline 表示某趋势正在变弱，the 指该领域已知的下降过程。", "Small shops are on the decline in the city center.", "市中心的小商店正在减少。", ["on the decline 表持续趋势，不等于一次性 decline；不要写成 *in the decline 表同义状态。"]),
  d("according-to-the-author", "according to the author", "according to + source", "介词观点短语", "根据作者；按照作者的说法", "句首或句末观点来源状语", "according to 后接信息来源，author 是来源名词；它不表示作者本人必然同意被转述事实。", "According to the author, the reform had mixed results.", "根据作者的说法，这项改革结果喜忧参半。", ["according to 后接人或资料来源，不要写 *according with；判断题中需回到原文核对。"]),
  d("may-chiefly-be-responsible-for", "may chiefly be responsible for", "may be responsible for + noun", "情态动词 + 形容词搭配", "可能主要是……的原因；可能主要对……负责", "may + be + responsible for", "may 后接动词原形 be，chiefly 修饰 responsible，for 引出承担责任或造成结果的对象。", "Poor planning may chiefly be responsible for the delay.", "计划不周可能是延误的主要原因。", ["responsible for 可表示‘负责’或‘导致’，需由语境判断；may 后不能用 *is。"]),
  d("participation-in", "participation in", "participation in + activity", "名词 + 介词搭配", "参加；参与……", "名词 participation 的 in 补足语", "participation 是不可数活动名词时常与 in 连用，in 后接活动、领域或组织。", "Participation in community activities builds confidence.", "参加社区活动能增强信心。", ["participation 后固定用 in 引出参与对象；不要与 attend 后直接接宾语的结构混淆。"]),
  d("is-limited", "is limited", "be limited", "被动/系表结构", "受到限制；有限", "be + 过去分词或形容词", "limited 可表示被限制的状态，也可作形容词表示有限；具体含义由后续名词或上下文决定。", "Access is limited during the trial period.", "试用期间访问受到限制。", ["is limited 不能单独推出限制原因；不要把 limited 与 limitless 混淆。"]),
  d("are-dissatisfied-with", "are dissatisfied with", "be dissatisfied with + noun", "形容词 + 介词", "对……不满意", "系动词 + 形容词表语", "dissatisfied 描述人的不满状态，with 引出不满意的对象；复数主语用 are。", "Many users are dissatisfied with the update.", "许多用户对这次更新不满意。", ["dissatisfied with 表人的感受，dissatisfying 表事物令人不满；不要把 with 改成 *to。"]),
  d("emphasis-has-been-placed-on", "emphasis has been placed on", "emphasis has been placed on + noun", "现在完成时被动结构", "重点一直被放在……上", "名词主语 + 完成时被动", "place emphasis on 的被动形式是 emphasis is/has been placed on；has been 表示重视延续至今。", "Greater emphasis has been placed on practical skills.", "人们一直更加重视实践技能。", ["被动结构需要 placed，不能写 *emphasis has placed on；on 后接重视对象。"]),
  d("has-been-influenced-by", "has been influenced by", "be influenced by + source", "现在完成时被动结构", "一直受到……的影响", "has + been + 过去分词", "influenced by 表示影响来源，has been 表示影响从过去延续到现在。", "The policy has been influenced by public opinion.", "这项政策一直受到公众意见的影响。", ["by 后接影响来源，不是受影响对象；不要漏掉 been 构成完成时被动。"]),
  d("western-values", "Western values", "Western + plural noun", "形容词 + 名词复数", "西方价值观", "专有形容词作前置定语", "Western 修饰复数名词 values，表示与西方社会相关的一组价值观。", "Western values have shaped the debate.", "西方价值观影响了这场辩论。", ["Western 首字母大写时表示文化区域形容词；values 在此是价值观复数，不是动词‘重视’。"]),
  d("placed-on-the-basics", "placed on the basics", "be placed on + noun", "过去分词被动结构", "被放在基础知识上；重点放在基础上", "placed 的后置被动说明", "placed on 是 place ... on 的被动形式，the basics 指基础知识或基本技能。", "More attention was placed on the basics.", "更多注意力被放在基础知识上。", ["placed on 需要 be 或其他助动词组成完整被动；不要把 on the basics 当作地点。"]),
  d("is-praised-for", "is praised for", "be praised for + noun/doing", "被动评价结构", "因……受到称赞", "be + praised + for 原因补语", "for 引出受到称赞的原因，可接名词或动名词；by 若出现则另指称赞者。", "The teacher is praised for encouraging questions.", "这位老师因鼓励提问而受到称赞。", ["praised for 与 praised by 功能不同：for 说明原因，by 说明施动者；不要互换。"]),
  d("helping-the-young-climb-the-social-ladder", "helping the young climb the social ladder", "help sb (to) do sth", "使役/帮助结构", "帮助年轻人提升社会地位", "help + 宾语 + 不带 to 的不定式", "help 后可接宾语和动词原形，也可接 to do；the young 是群体名词，climb the social ladder 是比喻表达。", "Mentors are helping the young build useful skills.", "导师正在帮助年轻人培养实用技能。", ["help sb do 与 help sb to do 都可用；不要把 the young 当作单数具体人名。"]),
  d("is-characterized-by", "is characterized by", "be characterized by + feature", "被动特征结构", "以……为特征；其特点是……", "be + characterized + by", "by 后接体现特征的名词或动名词，characterized 是过去分词；主语是被描述的事物。", "The system is characterized by strict testing.", "这个体系的特点是严格考试。", ["characterized by 说明特征，不是‘被某人描述’的唯一含义；不要把 by 后对象当施动者。"]),
  d("should-be-placed-on", "should be placed on", "should be placed on + noun", "情态动词被动结构", "应该被放在……上；应该重视……", "should + be + 过去分词", "should 提出建议，be placed 构成被动，on 引出应增加重视的对象。", "More effort should be placed on creative work.", "应该把更多精力放在创造性工作上。", ["should 后用 be placed，不用 *should placed；place emphasis on 也可改写为 emphasis should be placed on。"]),
  d("cultivation-of-creativity", "cultivation of creativity", "the cultivation of + abstract noun", "名词 + of 短语", "创造力的培养", "抽象名词的 of 补足语", "cultivation 是培养过程名词，of 后接被培养的能力或品质；creativity 是不可数抽象名词。", "The cultivation of creativity requires time.", "创造力的培养需要时间。", ["cultivation of 后接培养对象，不是培养者；creativity 通常不可数，不写 *creativities 表一般概念。"]),
  d("leads-to", "leads to", "lead to + noun/doing", "动词 + 介词搭配", "导致；通向", "lead 的第三人称单数结构", "lead to 后接名词或动名词表示结果，主语为第三人称单数时用 leads。", "Stress often leads to poor decisions.", "压力常常导致糟糕的决定。", ["lead to + 名词/doing 与 lead sb to do 不同；不要漏掉 to 或误接动词原形。"]),
  d("is-revealed-in", "is revealed in", "be revealed in + evidence", "被动显示结构", "体现在……中；通过……显现", "be + revealed + in", "in 引出显示某事实的证据或载体，revealed 是过去分词；主语是被揭示的现象。", "The trend is revealed in the survey results.", "这一趋势体现在调查结果中。", ["revealed in 表示证据载体，不是 reveal 的地点宾语；不要与 revealed by（由某人揭示）混淆。"]),
  d("the-fact-that", "the fact that", "the fact that + clause", "同位语从句结构", "……这一事实", "名词 fact 后接 that 从句", "that 从句完整说明 fact 的内容，通常保留主语和谓语；the 限定已知事实。", "The fact that prices rose worried consumers.", "价格上涨这一事实让消费者担忧。", ["the fact that 后接完整陈述，不要写成疑问语序；that 在此引导同位语从句，不是指示代词。"]),
  d("less-tolerant-of", "less tolerant of", "be less tolerant of + noun", "比较级形容词 + 介词", "对……的容忍度更低", "系动词 + 比较级表语", "less 修饰 tolerant，of 引出不能容忍的对象；比较级暗含与过去或另一群体的基准。", "Young workers are less tolerant of unnecessary delays.", "年轻员工对不必要的延误更不能容忍。", ["tolerant 后固定用 of；less tolerant 是‘不那么能容忍’，不是完全 intolerant。"]),
  d("exceeds-that-in", "exceeds that in", "exceed that in + place", "比较动词结构", "超过某地的同类指标", "及物动词 + that 替代名词", "that 代替前面已出现的同类名词，in 后接比较地点；exceeds 是第三人称单数。", "The rate exceeds that in neighboring regions.", "该比率超过邻近地区的比率。", ["that in 后省略的是同类名词，不是人或物的泛指；exceed 直接接宾语，不加 *to。"]),
  d("more-than-ever-before", "more than ever before", "more than ever before", "比较程度状语", "比以往任何时候都更……", "动词或形容词后的程度修饰", "more than ever before 把当前程度与此前所有时期比较，ever before 表示此前任何时候。", "The issue matters more than ever before.", "这个问题比以往任何时候都更重要。", ["more than ever before 比较的是程度，不等于 more than before 的简单数量增加；需有可比较的状态。"]),
  d("present-life", "present life", "present + noun", "形容词 + 名词短语", "当前生活；现在的生活", "形容词作前置定语", "present 修饰 life，表示现阶段的生活；life 在此是不可数概念名词。", "People often compare present life with the past.", "人们常把当前生活与过去相比。", ["present life 指现在的生活，不是‘出席的生命’；present 作名词或动词时词性不同。"]),
];

const uniqueDefinitions = Array.from(new Map([...definitions, ...extraCollocations].map((item) => [item.source.toLowerCase(), item])).values());

export const passage4PhraseGuides = Object.fromEntries(
  uniqueDefinitions.map((item) => [
    item.key,
    {
      key: item.key,
      sourceExpression: item.source,
      canonical: item.canonical,
      type: item.type,
      meaning: item.meaning,
      summary: `原文表达“${item.source}”；规范结构为“${item.canonical}”。${item.meaning}`,
      grammarRole: item.grammarRole,
      structures: [s(item.canonical, item.meaning, item.rule, item.english, item.chinese)],
      pitfalls: item.pitfalls,
    },
  ]),
);

export const passage4PhraseAliases: Record<string, string> = Object.fromEntries(
  uniqueDefinitions.map((item) => [item.source.toLowerCase(), item.key]),
);

Object.assign(passage4PhraseAliases, {
  "in one's eyes": "in-westerners-eyes",
  "in the westerners' eyes": "in-westerners-eyes",
  "a positive example": "positive-example",
  "climb the social ladder": "climbing-rigid-social-ladder",
  "be typical of": "has-hardly-been-typical-of",
  "typical of": "has-hardly-been-typical-of",
  "see a decline in": "seeing-a-decline-of",
  "see a decline of": "seeing-a-decline-of",
  "see a decline": "seeing-a-decline-of",
  "see a as b": "saw-their-jobs-as",
  "see a as": "saw-their-jobs-as",
  "lead sb to do sth": "leads-kids-to",
  "lead kids to drop out": "lead-kids-to-drop-out",
  "drop out of school": "drop-out",
  "seek a return to": "seeking-a-return-to",
  "return to": "a-return-to",
  "increase by": "increased-by",
  "below that of": "well-below-that-of",
  "in addition to": "in-addition",
  "raise eyebrows": "raised-eyebrows",
  "not ... but ...": "only-how-much-you-can-endure",
});

export const passage4CollocationGlosses: Record<string, { meaning: string; note?: string }> = Object.fromEntries(
  uniqueDefinitions.map((item) => [item.source.toLowerCase(), { meaning: item.meaning, note: item.rule }]),
);

export const passage4FamilyGlosses: Record<string, string> = {
  aim: "目标；旨在",
  economy: "经济；节约",
  increase: "增加；增长",
  produce: "生产；产品",
  harmony: "和谐；协调",
  work: "工作；劳动",
  prime: "首要的；主要的",
  fulfill: "实现；满足",
  educate: "教育；培养",
  create: "创造；创作",
  cultivate: "培养；耕作",
  person: "人；个人",
  moral: "道德的；道德观",
  centralize: "集中；使集权化",
  conserve: "保存；节约",
  satisfy: "使满意；满足",
  tolerate: "容忍；耐受",
  comfort: "安慰；舒适",
  divorce: "离婚；使离异",
};

export const passage4WordKnowledge = {
  aimlessness: {
    grammarRole: "抽象名词作主语",
    grammarSummary: "aimlessness 表示无目标状态；可置于 be typical of 结构中作主语。",
    structures: [s("be typical of + abstract noun", "是某种状态的典型", "of 后接被描述对象。", "Aimlessness is not typical of effective teams.", "无目标并不是高效团队的典型。")],
  },
  typical: {
    grammarRole: "形容词表语",
    grammarSummary: "be typical of 表示‘是……的典型’，hardly 可修饰整个系表判断。",
    structures: [s("be typical of + noun", "是……的典型", "typical 后固定接 of。", "This result is typical of the period.", "这一结果是该时期的典型。")],
  },
  satisfy: {
    grammarRole: "动词及物结构",
    grammarSummary: "satisfy sb 与 be satisfied with sth 的主客体方向不同。",
    structures: [s("satisfy sb", "使某人满意", "satisfy 直接接感受者；形容词 satisfied 后接 with。", "The explanation satisfied the students.", "这个解释使学生满意。")],
  },
  endure: {
    grammarRole: "及物动词",
    grammarSummary: "endure 直接接需要承受的困难、条件或压力。",
    structures: [s("endure + difficulty", "忍受困难", "endure 不需要介词宾语。", "Workers endure long hours.", "工人忍受长时间工作。")],
  },
  increase: {
    grammarRole: "变化动词",
    grammarSummary: "increase by 表变化幅度，increase to 表变化后的终值。",
    structures: [s("increase by + amount", "增加了某幅度", "by 后接增量或百分比。", "The rate increased by ten percent.", "比率增加了百分之十。")],
  },
} satisfies Record<string, { grammarRole: string; grammarSummary: string; structures: Structure[] }>;
