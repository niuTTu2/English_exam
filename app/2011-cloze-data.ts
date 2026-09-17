import type { BeginnerClauseDetail, BeginnerSyntaxComponent, Question, SentenceAnalysis, SyntaxRole } from "./data";

type Segment = BeginnerSyntaxComponent & { role: SyntaxRole };
function segment(text: string, role: SyntaxRole, form: string, grammaticalFunction: string, modifies: string, explanation: string): Segment {
  return { text, role, form, function: grammaticalFunction, modifies, explanation };
}
function clause(text: string, type: string, marker: string, role: string, subject: string, predicate: string, objectOrComplement: string, translationOrder: string): BeginnerClauseDetail {
  return { text, type, marker, role, subject, predicate, objectOrComplement, translationOrder };
}
function sentence(number: number, parts: Segment[], trunk: string, literal: string, natural: string, logic: string, phrases: string[], clauses: BeginnerClauseDetail[] = [], testText?: string): SentenceAnalysis {
  return {
    id: `2011-cloze-s${number}`, number, text: parts.map(part => part.text).join(""), testText, trunk, literal, natural, logic, phrases,
    chunks: parts.map(({ text, role }) => ({ text, role })),
    layers: parts.map(part => ({ label: part.function, text: part.explanation })),
    grammar: parts.map(part => `${part.text.trim()}：${part.form}；${part.explanation}`),
    beginnerSyntax: { components: parts.map(({ text, form, function: grammaticalFunction, modifies, explanation }) => ({ text: text.trim(), form, function: grammaticalFunction, modifies, explanation })), clauses },
  };
}

export const cloze2011Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("The Internet ", "subject", "定冠词加名词", "主语", "affords的施事", "Internet为整句讨论对象，谓语按单数使用affords。"),
    segment("affords ", "predicate", "一般现在时及物动词", "谓语", "说明Internet带来的条件", "afford在这里是提供，不是afford to do中‘负担得起’。"),
    segment("anonymity ", "object", "不可数抽象名词", "直接宾语", "affords所提供的状态", "anonymity指身份不为人所知，不等于姓名本身。"),
    segment("to its users, ", "modifier", "to加受益者名词短语", "对象状语", "限定affords的接受者", "its指Internet；users是得到匿名条件的人。"),
    segment("a blessing to privacy and freedom of speech.", "modifier", "名词性同位补充", "补充评价", "概括前面提供匿名性的事实", "a blessing说明匿名性给隐私与言论自由带来的好处；to连接受益领域，of speech限定freedom。"),
  ], "The Internet affords anonymity to its users.", "互联网向它的用户提供匿名性，这对隐私和言论自由是一种福祉。", "互联网让用户能够匿名，这有利于保护隐私和言论自由。", "先承认匿名性的益处，为下句转向网络犯罪的代价建立让步背景。", ["affords anonymity to its users", "freedom of speech"]),
  sentence(2, [
    segment("But ", "connector", "转折连词", "篇章衔接", "转折上句的正面评价", "But引出匿名性的另一面，不能把前句益处理解为作者无条件支持。"),
    segment("that very anonymity ", "subject", "指示限定词、强调形容词和抽象名词", "主语", "is的主语", "that回指前句，very在名词前强调‘恰恰就是这种’，不是副词‘非常’。"),
    segment("is also ", "predicate", "系动词加添加副词", "谓语", "把anonymity与原因位置联系", "also表匿名性除了保护隐私，还会造成另一后果。"),
    segment("behind the explosion of cyber-crime ", "object", "behind加名词短语", "表语", "说明anonymity与犯罪激增的因果关系", "behind比喻背后原因；explosion是数量激增而不是炸弹爆炸，of cyber-crime限定激增的对象。"),
    segment("that has swept across the Web.", "modifier", "that引导的定语从句", "后置限定", "修饰the explosion of cyber-crime", "that作主语；has swept是现在完成时，across the Web为蔓延范围。sweep的过去分词是swept。"),
  ], "that very anonymity is behind the explosion of cyber-crime.", "但恰恰这种匿名性，也是席卷网络的网络犯罪激增背后的原因。", "但也正是这种匿名性，助长了席卷整个网络的犯罪浪潮。", "把便利与风险并列起来，引出兼顾隐私和安全的核心问题。", ["that very anonymity", "swept across the Web"], [clause("that has swept across the Web", "限制性定语从句", "that", "限定网络犯罪的激增", "that", "has swept", "across the Web（范围状语）", "先理解网络犯罪激增，再补充‘已席卷整个网络’。")], "But that very anonymity is also behind the explosion of cyber-crime that has ___(1) across the Web."),
  sentence(3, [
    segment("Can ", "predicate", "情态助动词提前", "一般疑问句标记", "与be preserved共同构成谓语", "Can提前到主语前，询问可能性，不是请求某个人许可。"),
    segment("privacy ", "subject", "不可数抽象名词", "主语", "被preserve保护的对象", "privacy是隐私而不是具体秘密；被动句不必说出保护者。"),
    segment("be preserved ", "predicate", "be加过去分词", "被动谓语主体", "与Can表示能否得到保护", "can be preserved即能否被保护；不能把preserved按主动过去时翻译。"),
    segment("while bringing safety and security to a world ", "condition", "while加现在分词短语", "同时发生的时间兼伴随状语", "限定保护隐私时所追求的安全目标", "while bringing用非谓语形式表达同时实现另一目标；safety and security为宾语，to a world为目标，逻辑实施者为采取措施的人而非privacy。"),
    segment("that seems increasingly lawless?", "modifier", "that引导的定语从句", "后置限定", "修饰world", "that作主语，seems为系动词，lawless作表语，increasingly表示越来越。"),
  ], "Can privacy be preserved?", "在给一个似乎越来越无法无天的世界带来安全保障的同时，隐私能够得到保护吗？", "能否既保护隐私，又让这个似乎日益失序的网络世界变得安全？", "以疑问提出全文的两难：安全不能简单以牺牲隐私为代价。", ["be preserved", "safety and security", "increasingly lawless"], [clause("that seems increasingly lawless", "限制性定语从句", "that", "限定world的状态", "that", "seems", "increasingly lawless（表语）", "先译‘世界’，再将从句放到名词前或补述其越来越失序。")], "Can privacy be preserved ___(2) bringing safety and security to a world that seems increasingly ___(3)?"),
  sentence(4, [
    segment("Last month, ", "modifier", "时间名词短语", "时间状语", "限定offered", "Last month不加介词，交代提出方案的时间。"),
    segment("Howard Schmidt, the nation's cyber-czar, ", "subject", "专名加同位名词短语", "主语及身份补充", "offered的施事", "the nation's cyber-czar解释Howard Schmidt的网络事务主管身份，不是另一名并列人物。"),
    segment("offered ", "predicate", "一般过去时动词", "谓语", "联系提议者、接受者和方案", "offer somebody something为双宾语结构，接收者在前，所提供内容在后。"),
    segment("the federal government ", "object", "限定名词短语", "间接宾语", "offered的接受方", "联邦政府是收到方案的一方，不是提出方案的主语。"),
    segment("a proposal to make the Web a safer place – ", "object", "名词加不定式后置说明", "直接宾语", "offered所提供的内容", "to make说明proposal的内容；make the Web a safer place是动词、宾语、宾语补足语，safer是safe的比较级。"),
    segment('a "voluntary trusted identity" system ', "modifier", "破折号后同位语", "方案的具体名称", "解释a proposal", "system指自愿参与、可信身份认证系统；voluntary与下文compulsory形成关键对照。"),
    segment("that would be the high-tech equivalent of a physical key, a fingerprint and a photo ID card, ", "modifier", "that引导的定语从句", "系统功能说明", "修饰system", "that作主语，would be为谓语，equivalent是表语中心；of后列出三种物理身份凭证。"),
    segment("all rolled into one.", "modifier", "all加过去分词短语", "补充状态说明", "概括三种凭证功能", "all指前面钥匙、指纹和照片身份证的功能；rolled into one表示合为一体，省略了被动式中的being。"),
  ], "Howard Schmidt offered the federal government a proposal.", "上个月，国家网络事务主管霍华德·施密特向联邦政府提出了一项让网络更安全的方案——一种自愿可信身份系统，它将是把实体钥匙、指纹和照片身份证合为一体的高科技对应物。", "上个月，网络事务主管霍华德·施密特向联邦政府建议建立一种“自愿可信身份”系统，让上网更安全。这个高科技系统相当于把实体钥匙、指纹和带照片的身份证集于一身。", "给出处理两难的具体政策提案，并用三类日常凭证解释其功能。", ["offered the federal government a proposal", "make the Web a safer place", 'a "voluntary trusted identity" system', "the high-tech equivalent of", "all rolled into one"], [clause("that would be the high-tech equivalent of a physical key, a fingerprint and a photo ID card", "限制性定语从句", "that", "解释system的功能", "that（指system）", "would be", "the high-tech equivalent of a physical key, a fingerprint and a photo ID card（表语）", "先译系统，再用‘它将相当于……’解释三项并列功能。")], 'Last month, Howard Schmidt, the nation\'s cyber-czar, offered the federal government a ___(4) to make the Web a safer place – a "voluntary trusted identity" system that would be the high-tech ___(5) of a physical key, a fingerprint and a photo ID card, all rolled ___(6) one.'),
  sentence(5, [
    segment("The system ", "subject", "定冠词加名词", "主语", "共用两个并列谓语", "system回指前句提出的自愿身份系统。"),
    segment("might use ", "predicate", "情态动词加动词原形", "第一谓语", "描述系统可能采用的凭证", "might表示设想和可能性，不能译成已经实施。"),
    segment("a smart identity card, or a digital credential ", "object", "or连接的两组名词短语", "并列选择宾语", "use的对象", "智能身份卡与数字凭证是两种可能方案；or不是说两者必须同时存在。"),
    segment("linked to a specific computer, ", "modifier", "过去分词加to介词短语", "后置定语", "修饰digital credential", "credential与link为被动关系，to引关联目标；specific说明与特定计算机绑定。"),
    segment("and would authenticate ", "predicate", "连词加情态动词短语", "第二并列谓语", "共用主语The system", "and连接use与authenticate两个功能，would仍属于政策设想。"),
    segment("users ", "object", "复数名词", "宾语", "authenticate的核验对象", "authenticate users指核验用户身份，不是给人创造新身份。"),
    segment("at a range of online services.", "modifier", "at加范围名词短语", "使用场景状语", "限定authenticate", "a range of表示多种服务，online修饰services。"),
  ], "The system might use a smart identity card, and would authenticate users.", "该系统可能使用智能身份卡，或与特定计算机关联的数字凭证，并将在一系列在线服务中验证用户身份。", "系统可以采用智能身份卡，也可以采用绑定特定电脑的数字凭证，用于多种在线服务的身份认证。", "从类比转入实现方式，为后续联合多个认证系统作铺垫。", ["linked to a specific computer", "a range of online services"], [], "The system might use a smart identity card, or a digital credential ___(7) to a specific computer, and would authenticate users at a range of online services."),
  sentence(6, [
    segment("The idea ", "subject", "定冠词加名词", "主语", "is的主语", "idea回指政策方案的核心构想。"),
    segment("is ", "predicate", "系动词", "谓语", "连接idea与具体内容", "is后不是普通名词宾语，而是说明主语内容的表语。"),
    segment("to create a federation of private online identity systems.", "object", "不定式短语", "表语", "解释idea的内容", "create的宾语是a federation；of后说明联盟的组成成员是私营在线身份系统，private不是用户的私人密码。"),
  ], "The idea is to create a federation.", "这个构想是创建一个私营在线身份系统的联盟。", "核心想法是把各家私营在线身份认证系统联合起来。", "明确系统不是一个统一政府数据库，而是多个私营系统组成的联盟。", ["a federation of private online identity systems"], [], "The idea is to ___(8) a federation of private online identity systems."),
  sentence(7, [
    segment("Users ", "subject", "复数名词", "第一分句主语", "could select的施事", "用户可以自行选择，呼应自愿原则。"),
    segment("could select ", "predicate", "情态动词加动词原形", "第一分句谓语", "说明用户的选择权", "select表示从多个系统中作出选择，不是仅意识到或建议。"),
    segment("which system to join, ", "object", "疑问限定词、名词和不定式", "间接疑问结构作宾语", "select的内容", "which修饰system，system同时是join的对象；to join省略的逻辑主语为Users，不是一个有时态的完整从句。"),
    segment("and ", "connector", "并列连词", "分句连接", "连接选择权与准入限制", "前后都是独立分句，后句换为only registered users作主语。"),
    segment("only registered users ", "subject", "限制副词、分词定语和名词", "第二分句主语", "could navigate的施事", "only限定注册用户群体，registered说明已注册状态。"),
    segment("whose identities have been authenticated ", "modifier", "whose引导的定语从句", "后置限定", "修饰registered users", "whose表示这些用户的；identities为从句主语，have been authenticated为现在完成时被动。"),
    segment("could navigate those systems.", "predicate", "情态谓语加宾语", "第二分句谓语及宾语", "说明认证后的访问权限", "navigate在网络语境指访问和使用，不是实际航海；those systems回指被选择的联盟系统。"),
  ], "Users could select which system to join, and registered users could navigate those systems.", "用户可以选择加入哪个系统，而只有身份已经得到验证的注册用户才能访问这些系统。", "用户可自主选择系统，但只有完成身份认证的注册用户才能在其中访问服务。", "同时说明自愿选择与实名认证两项限制，避免将自愿参与误读为免认证。", ["which system to join", "have been authenticated"], [clause("whose identities have been authenticated", "限制性定语从句", "whose", "限定可访问系统的注册用户", "identities（whose表示所属关系）", "have been authenticated", "被动谓语，无额外宾语", "先译‘用户的身份已经认证’，再还原为‘身份已获认证的用户’。")], "Users could ___(9) which system to join, and only registered users whose identities have been authenticated could navigate those systems."),
  sentence(8, [
    segment("The approach ", "subject", "限定名词短语", "主语", "contrasts的主语", "approach指联合私营系统的方案。"),
    segment("contrasts with ", "predicate", "动词加固定介词", "谓语及比较连接", "对比两种方案", "contrast with表示与另一做法形成对照，不是把两者合并。"),
    segment("one ", "object", "替代性代词", "with的宾语", "替代另一个approach", "one为避免重复而代指另一种方案，不是数量一名用户。"),
    segment('that would require an Internet driver\'s license issued by the government.', "modifier", "that引导的定语从句", "后置限定", "修饰one所指的方案", "that作主语，would require为谓语；issued by the government是过去分词短语，修饰license并说明签发机关。"),
  ], "The approach contrasts with one.", "这一做法与另一种要求由政府签发互联网‘驾驶执照’的方案形成对照。", "这与要求网民持有政府签发的上网‘驾照’是不同的做法。", "把自愿私营认证与政府强制许可区分，预埋后文担忧。", ["contrasts with", "issued by the government"], [clause("that would require an Internet driver's license issued by the government", "限制性定语从句", "that", "解释另一种approach", "that", "would require", "an Internet driver's license issued by the government", "先说明另一做法要求持证，再把政府签发的定语放在执照之前。")], "The approach contrasts with one that would require an Internet driver's license ___(10) by the government."),
  sentence(9, [
    segment("Google and Microsoft ", "subject", "and连接的两个专名", "并列主语", "are的主语", "两家公司共同构成复数主语，因此用are。"),
    segment("are ", "predicate", "系动词", "谓语", "说明主语所属群体", "are后接among介词短语，表示属于所列企业中的一部分。"),
    segment("among companies ", "object", "among加复数名词", "表语", "说明两家公司在企业群体中", "among表示在多个成员之中，不是between的两方对应。"),
    segment('that already have these "single sign-on" systems ', "modifier", "that引导的定语从句", "第一级限定", "修饰companies", "that指公司，在从句中作主语；have为谓语，systems为宾语，already强调已有而非拟建。"),
    segment("that make it possible for users to log in just once but use many different services.", "modifier", "that定语从句加形式宾语结构", "第二级限定", "修饰systems", "that指系统，make是谓语；it是形式宾语，possible是宾补，for users是不定式逻辑主语，to后并列log in与use，but表示只登录一次却能用多种服务。"),
  ], "Google and Microsoft are among companies.", "谷歌和微软是已经拥有这种单点登录系统的公司中的成员，这些系统使用户只登录一次却使用许多不同服务成为可能。", "谷歌、微软等公司已经提供单点登录：用户只需登录一次，就能使用多种服务。", "用现成企业实践说明提案并非从零开始，再转入安全社区的类比。", ['"single sign-on" systems', "make it possible for users", "log in just once"], [
    clause('that already have these "single sign-on" systems that make it possible for users to log in just once but use many different services', "限制性定语从句", "that", "限定companies", "that（companies）", "already have", 'these "single sign-on" systems及其后置定语', "先译‘公司已经有单点登录系统’，再补系统给用户带来的便利。"),
    clause("that make it possible for users to log in just once but use many different services", "嵌套限制性定语从句", "that", "限定systems", "that（systems）", "make", "it（形式宾语）+ possible（宾补）；for users to...为真正内容", "先恢复‘系统使用户能够……’，再把两项不定式动作译成‘只登录一次却使用多种服务’。"),
  ], 'Google and Microsoft are among companies that already have these "single sign-on" systems that make it possible for users to ___(11) just once but use many different services.'),
  sentence(10, [
    segment("In effect, ", "connector", "固定介词短语", "概括性衔接语", "评价整个方案效果", "in effect表示实际上、实质上，用于把前述技术解释换成直观类比；不是徒劳或回报。"),
    segment("the approach ", "subject", "限定名词短语", "主语", "would create的主语", "approach指联盟式认证方案。"),
    segment("would create ", "predicate", "情态动词加原形", "谓语", "描述方案预期效果", "would表政策设想结果，不能说现在已完全实现。"),
    segment('a "walled garden" in cyberspace, ', "object", "带后置介词短语的名词短语", "宾语", "create的产物", "walled garden比喻有边界和准入限制的封闭网络环境；in cyberspace说明它是网络概念而非实体公园。"),
    segment('with safe "neighborhoods" and bright "streetlights" ', "modifier", "with加两个并列名词短语", "伴随特征状语", "补充walled garden的特征", "社区和路灯延续安全空间类比，分别暗指可信用户群与清晰可追踪的身份环境。"),
    segment("to establish a sense of a trusted community.", "condition", "to不定式", "目的状语", "解释安全环境所要达成的体验", "establish的宾语是a sense，of后说明是一种可信社区感；trusted是被信任的，非竞争或现代化。"),
  ], 'the approach would create a "walled garden".', "实际上，该方案会在网络空间建立一座‘有围墙的花园’，配有安全的‘邻里’和明亮的‘路灯’，以建立一种可信社区的感觉。", "实质上，这个方案要建起一片有边界的安全网络空间，让用户像置身安全、照明良好的社区一样感到可信。", "用空间隐喻总结安全效益；围墙也暗示其覆盖范围有限，为后文专家质疑铺垫。", ["In effect", 'a "walled garden"', "a sense of a trusted community"], [], '___(12), the approach would create a "walled garden" in cyberspace, with safe "neighborhoods" and bright "streetlights" to establish a sense of a ___(13) community.'),
  sentence(11, [
    segment("Mr. Schmidt ", "subject", "称谓加专名", "主语", "described的施事", "Schmidt是提出方案的人，因此下文是对提案的官方描述，而非作者无保留的事实判断。"),
    segment("described ", "predicate", "一般过去时动词", "谓语", "引出对方案的定性", "describe A as B表示把A描述为B，as不表示因为。"),
    segment("it ", "object", "代词", "宾语", "指前述身份认证方案", "it是实义回指，不是形式宾语。"),
    segment('as a "voluntary ecosystem" ', "modifier", "as加名词短语", "宾语补足说明", "描述it是什么", "自愿生态系统是将多个参与主体组合起来的比喻，voluntary再次强调参加自由。"),
    segment('in which "individuals and organizations can complete online transactions with confidence, ', "modifier", "介词前置的定语从句", "后置限定", "修饰ecosystem", "in which相当于in the ecosystem；individuals and organizations为主语，can complete为谓语，transactions为宾语，with confidence为方式状语。"),
    segment('trusting the identities of each other and the identities of the infrastructure on which the transaction runs."', "modifier", "现在分词短语含嵌套定语从句", "从句内伴随状语", "说明交易者的信任依据", "trusting与individuals and organizations是主动关系，后接双方身份与基础设施身份两个宾语；on which修饰infrastructure，表示交易依托该基础设施运行。"),
  ], 'Mr. Schmidt described it as a "voluntary ecosystem".', "施密特先生把它描述为一个‘自愿生态系统’，在其中‘个人和组织可以信心十足地完成在线交易，相信彼此的身份，以及交易赖以运行的基础设施的身份’。", "施密特称之为‘自愿生态系统’：个人和组织能够确认彼此及所用基础设施的身份，从而放心地在线交易。", "引用提案者对信任机制的承诺，强调交易双方与技术设施都需有可信身份。", ['described it as a "voluntary ecosystem"', "with confidence", "each other", "on which the transaction runs"], [
    clause('in which "individuals and organizations can complete online transactions with confidence, trusting the identities of each other and the identities of the infrastructure on which the transaction runs', "限制性定语从句", "in which", "限定voluntary ecosystem", "individuals and organizations", "can complete", "online transactions；with confidence和trusting短语为方式与伴随说明", "先译‘在这个系统中’，再译个人和组织能完成交易，最后解释为何可信。"),
    clause("on which the transaction runs", "嵌套限制性定语从句", "on which", "限定infrastructure", "the transaction", "runs", "on which（依托平台状语）", "按‘交易在该基础设施上运行’理解，再前置为‘交易赖以运行的基础设施’。"),
  ], 'Mr. Schmidt described it as a "voluntary ecosystem" in which "individuals and organizations can complete online transactions with ___(14), trusting the identities of each other and the identities of the infrastructure ___(15) which the transaction runs."'),
  sentence(12, [
    segment("Still, ", "connector", "转折副词", "篇章衔接", "转折前述方案优势", "Still在句首是尽管如此，不是仍处于某地点；引出有分歧的反应。"),
    segment("the administration's plan ", "subject", "所有格加名词", "主语", "has divided的主语", "administration是政府当局，plan指其网络认证方案。"),
    segment("has divided ", "predicate", "现在完成时主动", "谓语", "说明方案造成的现有后果", "divide在这里使意见分裂，不是数学除法或把人分组做实验。"),
    segment("privacy rights activists.", "object", "名词作定语的复数名词短语", "宾语", "产生分歧的人群", "activists指隐私权倡导者；privacy rights限定所倡导的权利。"),
  ], "the administration's plan has divided privacy rights activists.", "尽管如此，政府的方案已经使隐私权倡导者产生了分歧。", "然而，隐私权倡导者对政府方案意见不一。", "转入公众回应；下一句明确一方赞成、一方担忧，锁定divided。", ["privacy rights activists"], [], "Still, the administration's plan has ___(16) privacy rights activists."),
  sentence(13, [
    segment("Some ", "subject", "不定代词", "第一分句主语", "代指部分隐私权倡导者", "Some承接activists，不能当作修饰缺失名词的不完整主语。"),
    segment("applaud ", "predicate", "一般现在时动词", "第一分句谓语", "表示赞同态度", "applaud在此是赞成方案，不一定真的鼓掌。"),
    segment("the approach; ", "object", "限定名词短语", "宾语", "applaud的对象", "approach指自愿认证做法；分号连接两种对照态度。"),
    segment("others ", "subject", "复数不定代词", "第二分句主语", "代指另外一些倡导者", "others本身为代词；区别于需带名词的other。"),
    segment("are concerned.", "predicate", "系动词加形容词", "第二分句谓语和表语", "说明others的态度", "concerned表示担忧，不是be concerned with的涉及；与applaud构成分歧。"),
  ], "Some applaud the approach; others are concerned.", "有些人赞同该方案；另一些人感到担忧。", "一些人支持这种做法，另一些人则心存忧虑。", "用两个并列分句具体解释divided的含义，而非一致失望或一致支持。", ["Some applaud the approach", "others are concerned"]),
  sentence(14, [
    segment("It ", "subject", "形式主语", "占据主语位置", "指向后置that主语从句", "It不指某个物体，真正被判断为clear的是后面的整项判断。"),
    segment("seems clear ", "predicate", "系动词加形容词", "主句谓语和表语", "评价后置命题", "seems保留‘看来’的判断语气，不能抹掉为绝对必然。"),
    segment("that such a scheme is an initiative push toward ", "object", "that引导的后置主语从句", "真正主语", "解释什么看来清楚", "such a scheme为从句主语，is为系动词，an initiative push为表语；附件用initiative，保留原词，不擅改为initial。toward说明推动方向。"),
    segment('what would eventually be a compulsory Internet "driver\'s license" mentality.', "modifier", "what融合关系结构", "toward的宾语从句", "说明方案可能走向的思维", "what兼作从句主语，would be为谓语，mentality为表语中心；eventually表最终走向，compulsory与voluntary相反。"),
  ], "It seems clear that such a scheme is an initiative push.", "看来清楚的是，这种方案是一项朝着最终可能成为强制性互联网‘驾驶执照’思维的倡议性推动。", "这种方案看来是在推动一种思路，而这套思路最终可能演变为强制实行上网‘驾照’。", "提出隐私方的制度滑坡担忧：自愿认证可能逐渐导向强制许可，eventually说明终点而非发生频率。", ["It seems clear that", '"driver\'s license" mentality'], [
    clause('that such a scheme is an initiative push toward what would eventually be a compulsory Internet "driver\'s license" mentality', "后置主语从句", "that", "充当It所占位置的真正主语", "such a scheme", "is", "an initiative push toward what...（表语）", "先译‘这种方案是朝……的推动’，再加‘看来’。"),
    clause('what would eventually be a compulsory Internet "driver\'s license" mentality', "名词性融合关系从句", "what", "充当toward的宾语", "what", "would eventually be", 'a compulsory Internet "driver\'s license" mentality（表语）', "将what理解为所走向的那种事物或思路，译成‘最终可能成为……的思维’。"),
  ], 'It seems clear that such a scheme is an initiative push toward what would ___(17) be a compulsory Internet "driver\'s license" mentality.'),
  sentence(15, [
    segment("The plan ", "subject", "限定名词短语", "主语", "has been greeted的受事", "plan仍指同一自愿认证方案，also引出另一类人的回应。"),
    segment("has also been greeted ", "predicate", "现在完成时被动", "谓语", "说明方案受到怎样的回应", "greeted在这里是对方案作出反应，不是向人打招呼。"),
    segment("with skepticism ", "modifier", "with加抽象名词", "方式状语", "说明greeted的态度", "skepticism是怀疑，后面担忧语义支持它，不是热情欢迎。"),
    segment("by some computer security experts, ", "modifier", "by加人物名词短语", "被动句施事", "指出持怀疑态度者", "这些人是计算机安全专家，与上一段的隐私权倡导者关注重点不同。"),
    segment('who worry that the "voluntary ecosystem" envisioned by Mr. Schmidt would still leave much of the Internet vulnerable.', "modifier", "who从句内嵌that宾语从句", "补充专家的担忧", "修饰experts", "who作worry主语；that从句中ecosystem作主语，envisioned by...为被动分词定语，would leave为谓语，much of the Internet为宾语，vulnerable为宾补。"),
  ], "The plan has been greeted with skepticism by some computer security experts.", "该方案也受到一些计算机安全专家的怀疑，他们担心施密特设想的‘自愿生态系统’仍会使互联网的很大部分易受攻击。", "一些计算机安全专家同样质疑这个方案，认为自愿参与会让相当大一部分网络仍暴露在风险之中。", "专家的反对并非认为过度监管，而是认为自愿方案保护不足；为末句要求强制注册给出原因。", ["has also been greeted with skepticism", "envisioned by Mr. Schmidt", "leave much of the Internet vulnerable"], [
    clause('who worry that the "voluntary ecosystem" envisioned by Mr. Schmidt would still leave much of the Internet vulnerable', "非限制性定语从句", "who", "补充computer security experts的观点", "who（experts）", "worry", 'that the "voluntary ecosystem"...would...leave...vulnerable（宾语从句）', "先译专家持怀疑态度，再用‘他们担心……’补充原因。"),
    clause('that the "voluntary ecosystem" envisioned by Mr. Schmidt would still leave much of the Internet vulnerable', "宾语从句", "that", "作worry的宾语", 'the "voluntary ecosystem" envisioned by Mr. Schmidt', "would still leave", "much of the Internet（宾语）+ vulnerable（宾补）", "先译方案会让大片网络仍易受攻击，再补方案是施密特设想的。"),
  ], 'The plan has also been greeted with ___(18) by some computer security experts, who worry that the "voluntary ecosystem" envisioned by Mr. Schmidt would still leave much of the Internet ___(19).'),
  sentence(16, [
    segment("They ", "subject", "人称代词", "主句主语", "回指计算机安全专家", "不能把They误指前段所有隐私权倡导者，最近且同一论证主体是experts。"),
    segment("argue ", "predicate", "一般现在时动词", "主句谓语", "引出专家主张", "argue that在此是主张、论证，不是与人争吵。"),
    segment("that all Internet users should be forced to register and identify themselves, ", "object", "that引导的宾语从句", "观点内容", "作argue的宾语", "all Internet users为从句主语；should be forced为情态被动，to后并列register和identify，themselves回指users。"),
    segment("in the same way ", "modifier", "介词加名词短语", "方式类比状语", "类比强制注册做法", "the same强调相同制度逻辑：上公共网络如同开车上公共道路。"),
    segment("that drivers must be licensed to drive on public roads.", "modifier", "that引导的方式限定从句", "说明way的具体内容", "修饰the same way", "drivers为主语，must be licensed为情态被动，to drive说明获许可的行为，on public roads为地点状语。"),
  ], "They argue that all Internet users should be forced to register and identify themselves.", "他们主张，所有网民都应被要求注册并表明自己的身份，正如驾驶者必须获准才能在公共道路上开车一样。", "他们认为，所有网民都应强制注册并表明身份，就像司机必须持证才能上公共道路行驶。", "以公共道路驾照类比结束，明确安全专家倾向强制许可，与隐私方担忧形成张力。", ["should be forced to register", "identify themselves", "in the same way", "be licensed to drive"], [
    clause("that all Internet users should be forced to register and identify themselves", "宾语从句", "that", "作argue的宾语", "all Internet users", "should be forced", "to register and identify themselves（被强制进行的行为）", "先译所有网民应被强制，再译注册和表明身份两项行为。"),
    clause("that drivers must be licensed to drive on public roads", "方式限定从句", "that", "说明the same way所指的制度", "drivers", "must be licensed", "to drive on public roads（获许可的行为）", "按‘司机须获许可才能上路’理解，与网民应注册作类比。"),
  ], "They argue that all Internet users should be ___(20) to register and identify themselves, in the same way that drivers must be licensed to drive on public roads."),
];

function question(number: number, sentenceNumber: number, prompt: string, options: [string, string, string, string], answer: Question["answer"], locating: string, explanations: Question["explanations"]): Question {
  return { id: 201100 + number, number, sentenceId: `2011-cloze-s${sentenceNumber}`, prompt, options: options.map((text, index) => ({ key: (["A", "B", "C", "D"] as const)[index], text })), answer, locating, explanations };
}

export const cloze2011Questions: Question[] = [
  question(1, 2, "has ___(1) across the Web", ["swept", "skipped", "walked", "ridden"], "A", "网络犯罪激增蔓延到整个网络；sweep across表示席卷。has后用过去分词swept。", { A: "sweep across可比喻风潮或事件迅速席卷某范围，与犯罪激增搭配。", B: "skip是跳过或蹦跳，不能表达网络犯罪大范围蔓延。", C: "walk是步行，犯罪激增不是能行走的主体。", D: "ride是骑乘；即使ridden是过去分词，也不表达此处蔓延的含义。" }),
  question(2, 3, "be preserved ___(2) bringing safety and security", ["for", "within", "while", "though"], "C", "问题在于能否同时保护隐私并改善安全；while bringing表达同时兼顾。", { A: "for bringing更接近用途或理由，不能表达两项政策目标同时实现。", B: "within表示在范围或期限内，不能这样引出bringing的伴随行为。", C: "while加现在分词短语说明与此同时，准确呈现隐私与安全兼顾。", D: "though通常表让步‘尽管’，本句不是把带来安全视作已成立的反面条件。" }),
  question(3, 3, "a world that seems increasingly ___(3)", ["careless", "lawless", "pointless", "helpless"], "B", "前句写网络犯罪激增；这里需要指缺少秩序和法治约束。", { A: "careless表示粗心，不是犯罪蔓延所反映的法治问题。", B: "lawless表示无法无天、缺乏法律约束，承接cyber-crime。", C: "pointless表示无意义，不能解释为什么需要安全保障。", D: "helpless表示无助；重心应是世界失序，而非世界缺乏自救能力。" }),
  question(4, 4, "offered the federal government a ___(4) to make the Web a safer place", ["reason", "reminder", "compromise", "proposal"], "D", "破折号后的认证系统就是所提出的方案；offer somebody a proposal结构和语义均匹配。", { A: "reason是理由，而后文具体说明的是技术制度方案，不是原因论证。", B: "reminder是提醒，无法统摄后面的系统设计。", C: "compromise是妥协方案，但这里未给出双方让步的协商过程，proposal更准确。", D: "proposal是提案、建议，与后文系统内容对应。" }),
  question(5, 4, "the high-tech ___(5) of a physical key, a fingerprint and a photo ID card", ["information", "interference", "entertainment", "equivalent"], "D", "身份系统在功能上对应三种实体凭证；equivalent of表示对应物。", { A: "information是信息，不能作三种凭证的整体功能对应物。", B: "interference是干扰，与认证保障相反。", C: "entertainment是娱乐，与身份认证无关。", D: "equivalent是等效物、对应物，说明高科技系统具有相应功能。" }),
  question(6, 4, "all rolled ___(6) one", ["by", "into", "from", "over"], "B", "all指三种功能，rolled into one表示合为一体。", { A: "by引施事或手段，one在此是合并结果而非执行者。", B: "into强调从多个部分变成一个整体，是固定表达。", C: "from说明来源，方向与多个功能合一相反。", D: "over可表翻转，不表达合成一体。" }),
  question(7, 5, "a digital credential ___(7) to a specific computer", ["linked", "directed", "chained", "compared"], "A", "过去分词短语修饰credential，表示凭证与特定电脑关联。", { A: "linked to表示关联、绑定，符合数字凭证的技术说明。", B: "directed to表示被引向或寄往某处，不是凭证与设备的绑定。", C: "chained to强调用链子束缚；虽也可带to，但此处技术关联不含束缚意味。", D: "compared to表示拿来比较，不能完成身份绑定。" }),
  question(8, 6, "to ___(8) a federation of private online identity systems", ["dismiss", "discover", "create", "improve"], "C", "方案要把现有私营系统联合为新联盟，而非发现既有联盟。", { A: "dismiss表示解散或不予考虑，与提出方案相反。", B: "discover表示发现已有事物，联盟是政策要建立的目标。", C: "create表示创建，符合构建联盟的政策目标。", D: "improve预设联盟已存在，但文中只说一些公司已有各自系统。" }),
  question(9, 7, "Users could ___(9) which system to join", ["recall", "suggest", "select", "realize"], "C", "voluntary强调用户可选择参加哪个系统；which system to join是选择内容。", { A: "recall是回想，不能表达当下自主参加的决定。", B: "suggest是建议，并不保证用户有选择加入的权利。", C: "select是从多个系统中挑选，准确体现自愿。", D: "realize是意识到，不表示作出选择。" }),
  question(10, 8, "an Internet driver's license ___(10) by the government", ["released", "issued", "distributed", "delivered"], "B", "政府对执照的正式签发通常用issue；分词修饰license。", { A: "release常指发布消息、放出物资，不专指授予许可。", B: "issue a license指正式签发执照，制度性授权义准确。", C: "distribute强调分配给多个接收者，不突出法律效力的签发。", D: "deliver强调送达，而非授予许可本身。" }),
  question(11, 9, "users to ___(11) just once but use many different services", ["carry on", "linger on", "set in", "log in"], "D", "single sign-on意为单点登录，just once限定登录次数。", { A: "carry on表示继续做，不能与单点认证对应。", B: "linger on表示逗留或久久不散，不是认证操作。", C: "set in多指不良天气等开始，不以用户作这种主动操作主语。", D: "log in表示登录，与single sign-on直接同义呼应。" }),
  question(12, 10, "___(12), the approach would create a \"walled garden\"", ["In vain", "In effect", "In return", "In contrast"], "B", "本句用围墙花园类比概括前述系统的实际效果，没有转折或回报关系。", { A: "In vain意为徒劳，下文却在描述预期安全收益。", B: "In effect意为实际上、实质上，引出前述技术安排的概括。", C: "In return意为作为回报，此处没有交换关系。", D: "In contrast意为相反，本句延续正面效果而非否定前文。" }),
  question(13, 10, "a sense of a ___(13) community", ["trusted", "modernized", "thriving", "competing"], "A", "身份经认证、安全邻里与明亮路灯共同建立可信感。", { A: "trusted表示值得信任、获得信任的，承接trusted identity和安全环境。", B: "modernized表示现代化，技术新不等于用户信任。", C: "thriving表示繁荣，文中没有经济兴盛方面的论证。", D: "competing表示竞争，与安全社区感无关。" }),
  question(14, 11, "complete online transactions with ___(14)", ["caution", "delight", "confidence", "patience"], "C", "后面的trusting明确解释相信身份，因此能够放心交易。", { A: "caution强调谨慎戒备，与本段宣称的放心交易不是同一重心。", B: "delight是喜悦，身份可信不必产生强烈快乐。", C: "confidence是信心，与trusting直接对应。", D: "patience是耐心，文章未说等待或忍受困难。" }),
  question(15, 11, "the infrastructure ___(15) which the transaction runs", ["on", "after", "beyond", "across"], "A", "还原为the transaction runs on the infrastructure；介词随关系代词前置。", { A: "run on某技术基础设施，表示交易依托它运行。", B: "after表示时间先后或追赶，不是运行平台。", C: "beyond表示超出，不能说明交易依托的基础设施。", D: "across强调穿越范围，不能替代这里的承载平台关系。" }),
  question(16, 12, "the administration's plan has ___(16) privacy rights activists", ["divided", "disappointed", "protected", "united"], "A", "紧接着Some applaud; others are concerned，明确两派态度不同。", { A: "divided表示使意见分裂，准确概括支持与担忧并存。", B: "disappointed会把整个群体说成失望，与Some applaud矛盾。", C: "protected表示保护，但本段讨论的是各方评价而非已经获得保护。", D: "united表示团结一致，与后文分歧相反。" }),
  question(17, 14, "what would ___(17) be a compulsory Internet driver's license mentality", ["frequently", "incidentally", "occasionally", "eventually"], "D", "从自愿方案朝强制许可推进，强调可能的最终演变。", { A: "frequently表示经常，关注频率而非政策走向。", B: "incidentally表示偶然地或顺便，不契合toward的方向链条。", C: "occasionally表示偶尔，仍是频率而非终点。", D: "eventually表示最终，表明隐私方担心制度日后变为强制。" }),
  question(18, 15, "has also been greeted with ___(18) by some computer security experts", ["skepticism", "tolerance", "indifference", "enthusiasm"], "A", "who worry引出对保护不足的担忧，因此是质疑，而非冷漠或热情。", { A: "skepticism表示怀疑，能概括专家认为方案仍不够安全的态度。", B: "tolerance表示容忍，不充分反映下文担心其失效。", C: "indifference表示漠不关心，与专家明确提出担忧和替代主张相矛盾。", D: "enthusiasm表示热情，与who worry的负面评价不符。" }),
  question(19, 15, "leave much of the Internet ___(19)", ["manageable", "defendable", "vulnerable", "invisible"], "C", "专家主张所有人强制注册，是因为自愿方案使未参加区域仍缺乏保护。", { A: "manageable表示可管理，是积极结果而非专家的担忧。", B: "defendable表示可以防护或辩护，与保护不足的担忧不符。", C: "vulnerable表示易受攻击；leave加宾语加形容词表保留某种状态。", D: "invisible表示看不见，文中担心的是遭攻击风险而非网络无法显示。" }),
  question(20, 16, "all Internet users should be ___(20) to register", ["invited", "appointed", "allowed", "forced"], "D", "下文must be licensed类比法定准入，专家主张强制而非仅邀请。", { A: "invited是邀请，仍属自愿，不能克服专家指出的覆盖不足。", B: "appointed是任命，不适用于所有网民注册。", C: "allowed是允许，表达许可而非必须承担的义务。", D: "forced表示被强制，与all和must共同构成普遍强制注册。" }),
];


for (const sentence of cloze2011Sentences) {
  sentence.answerWords = [...(sentence.testText ?? "").matchAll(/___\((\d+)\)/g)].map(match => {
    const question = cloze2011Questions.find(item => item.number === Number(match[1]))!;
    return question.options.find(option => option.key === question.answer)!.text;
  });
}
