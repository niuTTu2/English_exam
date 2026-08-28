export type PassageLexiconEntry = {
  partOfSpeech: string;
  contextualMeaning: string;
  use: string;
  specialForms?: string[];
  examSynonyms?: string[];
  collocations?: string[];
  otherMeanings?: string[];
  wordFamily?: string[];
  confusions?: string[];
};

const structureForms = ["结构词：无普通词形变化，重点看句法位置"];

const entry = (
  partOfSpeech: string,
  contextualMeaning: string,
  use: string,
  options: Omit<PassageLexiconEntry, "partOfSpeech" | "contextualMeaning" | "use"> = {},
): PassageLexiconEntry => ({
  partOfSpeech,
  contextualMeaning,
  use,
  specialForms: options.specialForms ?? (/^(art|prep|conj|pron|det|modal)/.test(partOfSpeech)
    ? structureForms
    : [`${partOfSpeech}：按本文语境理解`]),
  examSynonyms: options.examSynonyms ?? (/^(art|prep|conj|pron|det|modal)/.test(partOfSpeech)
    ? ["结构词不能脱离句型直接替换"]
    : ["近义词需结合本句语境辨析，不能机械替换"]),
  ...options,
});

const word = (
  partOfSpeech: string,
  meaning: string,
  use: string,
  options: Omit<PassageLexiconEntry, "partOfSpeech" | "contextualMeaning" | "use"> = {},
) => entry(partOfSpeech, meaning, use, options);

// The entries below add Passage 5 contexts to the shared vocabulary. Forms in
// the article are aliased to these lemmas below instead of creating parallel
// cards for each inflection.
export const passage5Lexicon: Record<string, PassageLexiconEntry> = {
  ambition: word("n.", "抱负；雄心；追求成功的愿望", "ambition 可作抽象概念名词；本文把它与 wealth、distinction 和 sacrifices 放在同一价值判断中。", {
    examSynonyms: ["aspiration（抱负；较正式）", "drive（驱动力；强调行动动力）"],
    collocations: ["ambition to do", "on behalf of ambition"],
  }),
  reward: word("n./v.", "回报；奖励；报偿", "the rewards of ambition 中 reward 指抱负带来的财富、声望和控制力；作动词时表示奖励。", {
    specialForms: ["reward（单数/原形）", "rewards（复数/第三人称单数）", "rewarded（过去式/过去分词）", "rewarding（-ing）"],
    examSynonyms: ["return（回报；收益）", "benefit（益处）"],
    collocations: ["the rewards of", "reward sb with sth"],
  }),
  distinction: word("n.", "声望；卓越；区别", "wealth、distinction、control 构成 rewards 的同位列举；本文取‘声望、成就地位’义。", {
    examSynonyms: ["prestige（声望）", "difference（区别；另一常见义）"],
  }),
  control: word("n./v.", "控制；掌控", "control over one's destiny 表示对自己命运的掌控，over 引出控制对象。", {
    examSynonyms: ["command（控制权）", "regulation（规制；正式语境）"],
    collocations: ["control over", "take control of"],
  }),
  destiny: word("n.", "命运；人生走向", "one's destiny 指个人命运；control over one's destiny 强调自主决定人生方向。", {
    examSynonyms: ["fate（命运；宿命色彩更强）", "future（未来；不一定含宿命）"],
  }),
  deem: word("v.", "认为；视为", "deem A worthy of B 表示认为 A 值得 B；原文用被动 must be deemed。", {
    specialForms: ["deem（原形）", "deems（第三人称单数）", "deemed（过去式/过去分词）", "deeming（-ing）"],
    examSynonyms: ["consider（认为）", "regard（看作；常接 as）"],
    collocations: ["deem A worthy of B", "be deemed"],
  }),
  worthy: word("adj.", "值得的；配得上的", "worthy of 后接值得的对象或代价；worthy of the sacrifices 表示值得这些牺牲。", {
    examSynonyms: ["deserving（值得的）", "worthwhile（值得做的；结构不同）"],
    collocations: ["worthy of", "worthy of doing"],
  }),
  behalf: word("n.", "代表；利益一方", "on behalf of 表示代表某人或为了某事；原文 ambition's 是 of ambition 的所有格替代。", {
    examSynonyms: ["interest（利益；一方）"],
    collocations: ["on behalf of"],
  }),
  tradition: word("n.", "传统；惯例", "the tradition of ambition 指社会中延续的抱负观念；tradition of 后接内容。", {
    examSynonyms: ["custom（习俗；具体惯例）", "heritage（文化遗产）"],
    collocations: ["tradition of", "a long tradition"],
  }),
  vitality: word("n.", "活力；生命力", "have vitality 表示具有持续发展的生命力；is to have vitality 是条件从句中的预期状态。", {
    examSynonyms: ["energy（活力）", "liveliness（生气）"],
  }),
  wide: word("adj./adv.", "宽的；广泛的；程度大的", "widely shared 中 wide 构成副词，表示范围广；a wide range 是常见扩展。", {
    specialForms: ["wide（原级）", "wider（比较级）", "widest（最高级）", "widely（副词形式）"],
    examSynonyms: ["broad（宽广的）", "extensive（广泛的）"],
    collocations: ["widely shared", "wide range"],
  }),
  share: word("v./n.", "分享；共同拥有；份额", "must be widely shared 中 shared 是被动分词，主语 tradition 表示被公众共同接受。", {
    specialForms: ["share（原形/单数）", "shares（第三人称单数/复数）", "shared（过去式/过去分词）", "sharing（-ing）"],
    examSynonyms: ["participate in（参与；结构不同）", "divide（分配；强调分开）"],
    collocations: ["share an ideal", "widely shared"],
  }),
  especially: word("adv.", "尤其；特别", "especially must be highly regarded 加强 must be regarded，突出受教育者群体。", {
    examSynonyms: ["particularly（尤其）", "notably（显著地）"],
  }),
  high: word("adj./adv.", "高的；高度地", "highly regarded 中 highly 修饰 regarded，表示评价程度很高；不是空间高度。", {
    specialForms: ["high（原级）", "higher（比较级）", "highest（最高级）", "highly（副词形式）"],
    examSynonyms: ["greatly（很大程度地）", "strongly（强烈地）"],
    collocations: ["highly regarded", "highly valued"],
  }),
  admire: word("v.", "钦佩；赞赏", "people who are themselves admired 中 admired 是被动分词，说明这些人受到他人尊敬。", {
    specialForms: ["admire（原形）", "admires（第三人称单数）", "admired（过去式/过去分词）", "admiring（-ing）"],
    examSynonyms: ["respect（尊敬）", "appreciate（欣赏；理解价值）"],
    collocations: ["be admired by", "admire sb for sth"],
  }),
  educate: word("v.", "教育；培养", "the educated 是形容词名词化，指受过教育的人群；educated 不是普通主动动作。", {
    specialForms: ["educate（原形）", "educates（第三人称单数）", "educated（过去式/过去分词）", "educating（-ing）"],
    examSynonyms: ["teach（教授）", "train（训练；职业技能）"],
    collocations: ["the educated", "educated people"],
  }),
  least: word("det./adv./n.", "最少；至少；尤其（not least）", "not least among them 是插入强调语，表示受教育者尤其包括在内，而非‘最不重要’。", {
    specialForms: structureForms,
    examSynonyms: ["especially（尤其）", "minimum（最低限度；名词）"],
    collocations: ["not least", "at least"],
  }),
  odd: word("adj.", "奇怪的；反常的", "in an odd way 提示后文现象出人意料；odd 在此不是‘奇数’。", {
    examSynonyms: ["strange（奇怪的）", "unusual（不寻常的）"],
    collocations: ["in an odd way", "oddly enough"],
  }),
  claim: word("v./n.", "声称；主张；要求权", "claimed to have given up 使用完成不定式，表示声称发生在放弃之后。", {
    specialForms: ["claim（原形/单数）", "claims（第三人称单数/复数）", "claimed（过去式/过去分词）", "claiming（-ing）"],
    examSynonyms: ["assert（断言；语气强）", "maintain（坚持主张）"],
    collocations: ["claim to do", "claim that"],
  }),
  ideal: word("n./adj.", "理想；理想的", "ambition as an ideal 中 as 后接名词，说明把抱负看作一种理想。", {
    examSynonyms: ["principle（原则；理想准则）", "perfect（理想的；形容词）"],
    collocations: ["as an ideal", "ideal for"],
  }),
  perhaps: word("adv.", "或许；可能", "perhaps most benefited 修饰现在完成时，表示作者的谨慎推断。", {
    examSynonyms: ["maybe（也许；较口语）", "possibly（可能）"],
  }),
  benefit: word("v./n.", "受益；益处", "benefit from ambition 表示从抱负及其成果中受益；benefits from ambition 中 benefits 是名词复数。", {
    specialForms: ["benefit（原形/单数）", "benefits（第三人称单数/复数）", "benefited（过去式/过去分词）", "benefiting（-ing）"],
    examSynonyms: ["gain（获得益处）", "profit（获利；偏经济）"],
    collocations: ["benefit from", "benefit sb"],
  }),
  own: word("adj./pron./v.", "自己的；拥有", "if not always their own 中 own 代替前文 ambition，作物主代词补语。", {
    specialForms: ["own（原级）", "owned（过去式/过去分词；动词义）", "owning（-ing；动词义）"],
    examSynonyms: ["personal（个人的）", "possess（拥有；动词）"],
    collocations: ["one's own", "on one's own"],
  }),
  grandparent: word("n.", "祖父或祖母", "parents and grandparents 并列表示上一代家庭成员；复数 grandparents 指祖父母。", {
    specialForms: ["grandparent（单数）", "grandparents（复数）"],
    examSynonyms: ["ancestor（祖先；范围更广）", "elder（长辈；泛称）"],
  }),
  hypocrisy: word("n.", "虚伪；伪善", "a heavy note of hypocrisy 评价口头否认抱负、实际享受其成果的矛盾。", {
    examSynonyms: ["insincerity（不真诚）", "double standard（双重标准；短语）"],
    collocations: ["a note of hypocrisy", "accuse sb of hypocrisy"],
  }),
  close: word("v./adj.", "关闭；接近的；结束", "closing the barn door 中 closing 是动名词；该习语比喻事后补救。", {
    specialForms: ["close（原形）", "closes（第三人称单数）", "closed（过去式/过去分词）", "closing（-ing）"],
    examSynonyms: ["shut（关闭）", "near（接近；形容词）"],
    collocations: ["close the door", "close after"],
  }),
  barn: word("n.", "谷仓；牲口棚", "close the barn door 是习语比喻，不能只按真实农场动作理解。", {
    specialForms: ["barn（单数）", "barns（复数）"],
    examSynonyms: ["shed（棚屋；范围较宽）"],
  }),
  door: word("n.", "门；（谷仓）门", "close the barn door 中 door 是谷仓的门；整句与 after the horses have escaped 构成‘事后补救’的比喻。", {
    specialForms: ["door（单数）", "doors（复数）"],
    examSynonyms: ["entrance（入口；强调进入处）", "gate（大门；常用于院落或围栏）"],
    collocations: ["close the door", "at the door"],
  }),
  horse: word("n.", "马", "the horses have escaped 与 riding on them 构成谷仓比喻；them 回指 horses。", {
    specialForms: ["horse（单数）", "horses（复数）"],
    examSynonyms: ["steed（马；文学用语）"],
  }),
  escape: word("v./n.", "逃脱；逃离", "after the horses have escaped 使用现在完成时，突出马先跑掉、关门后发生。", {
    specialForms: ["escape（原形/单数）", "escapes（第三人称单数）", "escaped（过去式/过去分词）", "escaping（-ing）"],
    examSynonyms: ["get away（逃走；短语）", "flee（逃离；较正式）"],
    collocations: ["escape from", "escape notice"],
  }),
  ride: word("v./n.", "骑；乘坐；依靠", "with the educated themselves riding on them 中 riding 是伴随结构；比喻受教育者正在享用抱负成果。", {
    specialForms: ["ride（原形）", "rides（第三人称单数）", "rode（过去式）", "ridden（过去分词）", "riding（-ing）"],
    examSynonyms: ["travel on（乘坐）", "depend on（依靠；比喻义）"],
    collocations: ["ride on", "go for a ride"],
  }),
  interest: word("n./v.", "兴趣；关注", "be interested in success 表示对成功感兴趣；此处 interest 不是利息。", {
    examSynonyms: ["concern（关注）", "curiosity（好奇心）"],
    collocations: ["interested in", "take an interest in"],
  }),
  sign: word("n./v.", "标志；迹象；签名", "its signs 指成功的外在象征；signs 是复数名词。", {
    specialForms: ["sign（单数/原形）", "signs（复数/第三人称单数）", "signed（过去式/过去分词）", "signing（-ing）"],
    examSynonyms: ["symbol（象征）", "indication（迹象）"],
    collocations: ["signs of", "a sign of success"],
  }),
  summer: word("n./adj.", "夏天；夏季的", "summer homes 指夏季住宅或避暑屋；summer 作前置修饰语。", {
    specialForms: ["summer（单数）", "summers（复数）"],
    examSynonyms: ["summertime（夏季；名词）"],
  }),
  home: word("n./adv./adj.", "家；住宅；在家", "Southampton summer home 指在南安普敦的避暑住宅；home 在此是名词。", {
    specialForms: ["home（单数）", "homes（复数）"],
    examSynonyms: ["house（房屋；强调建筑）", "residence（住所；正式）"],
    collocations: ["summer home", "at home"],
  }),
  bmw: word("n.（品牌名）", "宝马汽车；宝马品牌", "BMWs 是品牌名的复数写法，列为物质成功的象征；专有名称保持大写显示。", {
    specialForms: ["BMW（品牌名）", "BMWs（品牌名复数）"],
    examSynonyms: ["car（汽车；普通类别词）"],
  }),
  location: word("n.", "地点；位置", "locations、place names and name brands 指消费符号可能变化的地点、名称和品牌。", {
    specialForms: ["location（单数）", "locations（复数）"],
    examSynonyms: ["site（地点；具体场所）", "position（位置；也可抽象）"],
  }),
  name: word("n./v.", "名称；名声；命名", "name brands 中 name 作前置修饰语，表示知名品牌而非‘品牌的名字’。", {
    specialForms: ["name（单数/原形）", "names（复数/第三人称单数）", "named（过去式/过去分词）", "naming（-ing）"],
    examSynonyms: ["title（名称；标题）", "reputation（名声；语境不同）"],
    collocations: ["name brand", "by name"],
  }),
  brand: word("n./v.", "品牌；品牌化", "name brands 是复数名词短语，代表消费和社会身份的外在符号。", {
    specialForms: ["brand（单数/原形）", "brands（复数/第三人称单数）", "branded（过去式/过去分词）", "branding（-ing）"],
    examSynonyms: ["make（品牌；名词）", "label（品牌/标签）"],
    collocations: ["name brand", "brand image"],
  }),
  item: word("n.", "物品；项目", "such items 指前文列举的住宅、旅行和汽车等消费物品。", {
    specialForms: ["item（单数）", "items（复数）"],
    examSynonyms: ["object（物体；泛称）", "article（物品；正式）"],
  }),
  demand: word("n./v.", "需求；需要；要求", "in demand 表示受欢迎、需求旺盛；less in demand 是比较级结构。", {
    specialForms: ["demand（单数/原形）", "demands（复数/第三人称单数）", "demanded（过去式/过去分词）", "demanding（-ing/adj.）"],
    examSynonyms: ["need（需要）", "requirement（需求；要求）"],
    collocations: ["in demand", "demand for"],
  }),
  happen: word("v.", "发生", "What has happened is that... 用现在完成时主语从句概括社会变化。", {
    specialForms: ["happen（原形）", "happens（第三人称单数）", "happened（过去式/过去分词）", "happening（-ing）"],
    examSynonyms: ["occur（发生；正式）", "take place（发生；短语）"],
  }),
  confess: word("v.", "承认；坦白", "confess to dreams / confess to doing 中 to 是介词，后接名词或动名词。", {
    specialForms: ["confess（原形）", "confesses（第三人称单数）", "confessed（过去式/过去分词）", "confessing（-ing）"],
    examSynonyms: ["admit（承认）", "acknowledge（承认；正式）"],
    collocations: ["confess to", "confess fully to"],
  }),
  easily: word("adv.", "容易地；轻易地", "as easily and openly as once they could 中 easily 与 openly 并列修饰 confess。", {
    examSynonyms: ["readily（容易地；乐意地）", "effortlessly（毫不费力地）"],
  }),
  openly: word("adv.", "公开地；坦率地", "openly professed / openly honored 与 secretly、underground 形成对照。", {
    examSynonyms: ["publicly（公开地）", "frankly（坦率地）"],
    collocations: ["openly admit", "openly profess"],
  }),
  once: word("adv./conj.", "曾经；一旦；从前", "as once they could 中 once 引出过去情况；once it has been... 可表示‘一旦’。", {
    specialForms: structureForms,
    examSynonyms: ["formerly（从前）", "as soon as（一旦；时间关系不同）"],
    collocations: ["once again", "once + clause"],
  }),
  lest: word("conj.", "唯恐；以免", "lest they be thought 使用正式虚拟结构，lest 本身已含否定意味。", {
    specialForms: structureForms,
    examSynonyms: ["for fear that（唯恐）", "so that ... not（以免；结构不同）"],
    collocations: ["lest + clause"],
  }),
  push: word("v.", "推；咄咄逼人地要求", "pushing、acquisitive and vulgar 是 thought 的并列宾语补足语；pushing 在此指咄咄逼人。", {
    specialForms: ["push（原形）", "pushes（第三人称单数）", "pushed（过去式/过去分词）", "pushing（-ing）"],
    examSynonyms: ["aggressive（咄咄逼人的）", "press（催促；动词）"],
  }),
  acquisitive: word("adj.", "贪得无厌的；强烈想占有的", "与 pushing、vulgar 并列，说明社会对公开抱负者的负面评价。", {
    examSynonyms: ["greedy（贪婪的）", "materialistic（物质主义的）"],
  }),
  vulgar: word("adj.", "庸俗的；粗俗的", "lest they be thought ... vulgar 表示人们害怕被评价为庸俗。", {
    examSynonyms: ["coarse（粗俗的）", "common（普通的；语境不同）"],
  }),
  treat: word("v.", "对待；款待；使体验", "be treated to spectacles 是被动短语，表示被安排看到某种场面，不是‘被虐待’。", {
    specialForms: ["treat（原形）", "treats（第三人称单数）", "treated（过去式/过去分词）", "treating（-ing）"],
    examSynonyms: ["present（呈现）", "entertain（款待；使娱乐）"],
    collocations: ["be treated to", "treat A as B"],
  }),
  fine: word("adj./adv./n./v.", "精致的；美好的；罚款", "fine hypocritical spectacles 中 fine 带反讽色彩，表示场面被包装得很‘漂亮’。", {
    examSynonyms: ["excellent（优秀的）", "delicate（精细的）"],
  }),
  hypocritical: word("adj.", "虚伪的；伪善的", "hypocritical spectacles 指公开立场与私人生活相矛盾的场面。", {
    examSynonyms: ["insincere（不真诚的）", "dishonest（不诚实的）"],
  }),
  spectacle: word("n.", "场面； spectacle（复数 spectacles）", "fine hypocritical spectacles 用复数列举社会上反复出现的虚伪场面。", {
    specialForms: ["spectacle（单数）", "spectacles（复数）"],
    examSynonyms: ["display（展示场面）", "show（表演；泛称）"],
  }),
  ample: word("adj.", "充足的；丰富的", "in ample supply 表示供应充足，修饰 supply 的数量程度。", {
    examSynonyms: ["abundant（丰富的）", "sufficient（足够的）"],
    collocations: ["in ample supply", "ample evidence"],
  }),
  supply: word("n./v.", "供应；供给量；提供", "in ample supply 是介词短语作表语；supply 在此指虚伪场面的数量充足。", {
    specialForms: ["supply（单数/原形）", "supplies（复数/第三人称单数）", "supplied（过去式/过去分词）", "supplying（-ing）"],
    examSynonyms: ["provision（供应；正式）", "provide（提供；动词）"],
    collocations: ["in supply", "supply sb with sth"],
  }),
  critic: word("n.", "批评者；评论家", "the critic of American materialism 中 critic of 后接批评对象；critics 在结尾指攻击抱负者。", {
    specialForms: ["critic（单数）", "critics（复数）"],
    examSynonyms: ["reviewer（评论者）", "opponent（反对者；范围更广）"],
    collocations: ["critic of", "harsh critic"],
  }),
  materialism: word("n.", "物质主义；物质至上观", "American materialism 是 critic 的 of 短语宾语，指把物质成功置于首位的观念。", {
    examSynonyms: ["consumerism（消费主义）", "material culture（物质文化；短语）"],
  }),
  southampton: word("n.（专有名词）", "南安普敦（英国地名）", "Southampton summer home 是地点专名加名词短语；专有名词首字母大写。", {
    specialForms: ["Southampton（专有地名，通常无词形变化）"],
    examSynonyms: ["city（城市；普通类别词）"],
  }),
  publisher: word("n.", "出版商；出版人", "the publisher of radical books 中 publisher of 后接出版内容；who 从句说明其用餐习惯。", {
    specialForms: ["publisher（单数）", "publishers（复数）"],
    examSynonyms: ["press（出版社；机构义）", "editor（编辑；职能不同）"],
  }),
  radical: word("adj./n.", "激进的；根本的；激进分子", "radical books 指观点激进的书籍；radical 作定语修饰 books。", {
    examSynonyms: ["extreme（极端的）", "fundamental（根本的；义项不同）"],
  }),
  book: word("n./v.", "书；预订；记录", "radical books 是复数名词，指出版商发行的激进书籍。", {
    specialForms: ["book（单数/原形）", "books（复数/第三人称单数）", "booked（过去式/过去分词）", "booking（-ing）"],
    examSynonyms: ["volume（书卷；正式）", "reserve（预订；动词义）"],
  }),
  take: word("v.", "拿；采取；吃（饭）", "takes his meals 是 take + 名词结构，表示吃饭；第三人称单数 takes。", {
    specialForms: ["take（原形）", "takes（第三人称单数）", "took（过去式）", "taken（过去分词）", "taking（-ing）"],
    examSynonyms: ["have（吃饭；语境义）", "adopt（采取；抽象义）"],
    collocations: ["take one's meals", "take action"],
  }),
  his: word("possessive det./pron.", "他的；属于他的", "his meals、his own children 中 his 是物主限定词；不要与 he's 混淆。", {
    specialForms: ["he—his—him—himself；his 无普通复数变化"],
    examSynonyms: ["belonging to him（属于他的；结构表达）"],
  }),
  meal: word("n.", "一餐；饭", "takes his meals in restaurants 中 meals 用复数泛指日常用餐。", {
    specialForms: ["meal（单数）", "meals（复数）"],
    examSynonyms: ["dish（一道菜；范围更小）", "food（食物；不可数泛称）"],
  }),
  "three-star": word("adj.", "三星级的", "three-star restaurants 是复合形容词，连接符号保持在名词前。", {
    specialForms: ["three-star（复合形容词，不随名词复数变化）"],
    examSynonyms: ["high-end（高档的；语境近似）"],
  }),
  restaurant: word("n.", "餐馆；饭店", "three-star restaurants 中 restaurant 是可数名词复数，说明出版商的消费场所。", {
    specialForms: ["restaurant（单数）", "restaurants（复数）"],
    examSynonyms: ["dining place（用餐场所）", "eatery（餐馆；较口语）"],
  }),
  journalist: word("n.", "记者；新闻工作者", "the journalist advocating... 中 journalist 是分词短语的逻辑主语；whose 引出其子女。", {
    specialForms: ["journalist（单数）", "journalists（复数）"],
    examSynonyms: ["reporter（记者；偏报道）", "correspondent（通讯记者）"],
  }),
  advocate: word("v./n.", "提倡；拥护者", "advocating participatory democracy 是现在分词短语，修饰 journalist；advocate 还可作名词。", {
    specialForms: ["advocate（原形/单数）", "advocates（第三人称单数/复数）", "advocated（过去式/过去分词）", "advocating（-ing）"],
    examSynonyms: ["support（支持）", "promote（促进；提倡）"],
    collocations: ["advocate doing", "advocate for"],
  }),
  participatory: word("adj.", "参与式的；鼓励参与的", "participatory democracy 指让公众参与决策的民主形式；participatory 修饰 democracy。", {
    examSynonyms: ["involving（参与性的）", "interactive（互动的；近似但不完全同义）"],
  }),
  democracy: word("n.", "民主；民主制度", "participatory democracy 是 journalist 公开倡导的政治理念。", {
    examSynonyms: ["self-government（自治）", "democratic system（民主制度；短语）"],
  }),
  phase: word("n./v.", "阶段；时期；分阶段进行", "in all phases of life 表示生活的各个阶段；phases 是复数。", {
    specialForms: ["phase（单数/原形）", "phases（复数/第三人称单数）", "phased（过去式/过去分词）", "phasing（-ing）"],
    examSynonyms: ["stage（阶段）", "period（时期）"],
    collocations: ["phase of life", "in phases"],
  }),
  enroll: word("v.", "登记；入学；注册", "be enrolled in private schools 是被动状态，表示孩子就读于私立学校。", {
    specialForms: ["enroll（原形）", "enrolls（第三人称单数）", "enrolled（过去式/过去分词）", "enrolling（-ing，双写 l 的英式写法亦可）"],
    examSynonyms: ["register（登记）", "enter（进入学校；语境义）"],
    collocations: ["enroll in", "be enrolled in"],
  }),
  private: word("adj.", "私人的；私立的", "private schools 与 public schools 对比，说明教育选择；private 在此作定语。", {
    examSynonyms: ["personal（个人的）", "independent（独立的；私立学校义）"],
    collocations: ["private school", "private life"],
  }),
  exceptional: word("adj.", "例外的；非同寻常的", "many more perhaps not so exceptional 表示这类人并非少数特例。", {
    examSynonyms: ["unusual（不寻常的）", "outstanding（杰出的；语义侧重不同）"],
  }),
  proper: word("adj.", "恰当的；适当的；正确的", "the proper formulation 指概括前述矛盾的恰当说法。", {
    examSynonyms: ["appropriate（恰当的）", "correct（正确的）"],
  }),
  formulation: word("n.", "表述；措辞；公式化表达", "the proper formulation is 后接直接引语，概括‘行动上成功、形象上隐藏抱负’。", {
    specialForms: ["formulation（单数）", "formulations（复数）"],
    examSynonyms: ["wording（措辞）", "expression（表达）"],
  }),
  succeed: word("v.", "成功；取得进展", "Succeed at all costs 是祈使句，表示不惜代价取得成功。", {
    specialForms: ["succeed（原形）", "succeeds（第三人称单数）", "succeeded（过去式/过去分词）", "succeeding（-ing）"],
    examSynonyms: ["achieve（达到目标；及物）", "prosper（兴旺）"],
    collocations: ["succeed at", "succeed in doing"],
  }),
  cost: word("n./v.", "代价；费用；使花费", "at all costs 表示不惜任何代价；costs 是固定短语中的复数名词。", {
    specialForms: ["cost（单数/原形）", "costs（复数/第三人称单数）", "cost（过去式/过去分词）", "costing（-ing）"],
    examSynonyms: ["expense（费用）", "price（代价；价格）"],
    collocations: ["at all costs", "the cost of"],
  }),
  appear: word("v.", "出现；显得；似乎", "avoid appearing ambitious 中 appearing 是动名词；appear 后可接形容词作表语。", {
    specialForms: ["appear（原形）", "appears（第三人称单数）", "appeared（过去式/过去分词）", "appearing（-ing）"],
    examSynonyms: ["seem（似乎）", "look（看起来；系动词）"],
    collocations: ["appear ambitious", "appear to do"],
  }),
  ambitious: word("adj.", "有抱负的；野心勃勃的", "avoid appearing ambitious 表示避免在他人眼中显得有抱负；ambitious 修饰人或计划。", {
    examSynonyms: ["aspiring（有志向的）", "driven（有进取心的）"],
    collocations: ["ambitious plan", "appear ambitious"],
  }),
  attack: word("n./v.", "攻击；抨击", "the attacks on ambition 中 on 引出攻击对象；attacks 是复数名词。", {
    specialForms: ["attack（单数/原形）", "attacks（复数/第三人称单数）", "attacked（过去式/过去分词）", "attacking（-ing）"],
    examSynonyms: ["criticism（批评）", "assault（攻击；语气更强）"],
    collocations: ["attack on", "come under attack"],
  }),
  various: word("adj.", "各种各样的；不同的", "from various angles 表示批评来自不同方面；various 后接复数名词。", {
    examSynonyms: ["different（不同的）", "numerous（众多的；数量侧重）"],
  }),
  angle: word("n.", "角度；方面", "from various angles 是抽象用法，表示从多个立场或方面发起批评。", {
    specialForms: ["angle（单数/原形）", "angles（复数/第三人称单数）", "angled（过去式/过去分词）", "angling（-ing）"],
    examSynonyms: ["aspect（方面）", "viewpoint（观点角度）"],
    collocations: ["from an angle", "from various angles"],
  }),
  public: word("adj./n.", "公开的；公众的", "public defenders 指公开为抱负辩护的人；public 与 openly 形成语义呼应。", {
    examSynonyms: ["open（公开的）", "communal（公共的；语境不同）"],
    collocations: ["public defender", "public support"],
  }),
  defender: word("n.", "辩护者；支持者", "its public defenders are few 中 defender 是为 ambition 公开辩护的人。", {
    specialForms: ["defender（单数）", "defenders（复数）"],
    examSynonyms: ["supporter（支持者）", "advocate（拥护者）"],
    collocations: ["defender of", "public defender"],
  }),
  unimpressive: word("adj.", "不起眼的；缺乏说服力的", "few and unimpressive 评价公开辩护者数量少且影响力弱。", {
    examSynonyms: ["weak（薄弱的）", "unconvincing（缺乏说服力的）"],
  }),
  extremely: word("adv.", "极其；非常", "extremely unattractive 中 extremely 修饰形容词，强化负面评价程度。", {
    examSynonyms: ["very（非常；普通）", "highly（高度地；搭配限制不同）"],
  }),
  unattractive: word("adj.", "不吸引人的；令人反感的", "where they are not extremely unattractive 是让步补充，即使不极其令人反感也仍不出色。", {
    examSynonyms: ["unappealing（无吸引力的）", "repellent（令人厌恶的；语气更强）"],
  }),
  result: word("n./v.", "结果；后果；导致", "As a result 引出舆论失衡造成的后果；result 作名词。", {
    specialForms: ["result（单数/原形）", "results（复数/第三人称单数）", "resulted（过去式/过去分词）", "resulting（-ing）"],
    examSynonyms: ["consequence（后果）", "outcome（结果）"],
    collocations: ["as a result", "result from"],
  }),
  support: word("v./n.", "支持；支撑；拥护", "support for ambition 表示对抱负的支持；supporters 则是支持者。", {
    examSynonyms: ["back（支持；口语）", "uphold（维护；正式）"],
    collocations: ["support for", "support an ambition"],
  }),
  healthy: word("adj.", "健康的；有益的", "a healthy impulse 把 ambition 定性为有益的内在冲动，而不是病态欲望。", {
    examSynonyms: ["sound（健全的）", "beneficial（有益的）"],
  }),
  impulse: word("n.", "冲动；推动力", "ambition as a healthy impulse 中 impulse 是促进行动的内在推动力。", {
    specialForms: ["impulse（单数）", "impulses（复数）"],
    examSynonyms: ["urge（冲动；欲望）", "instinct（本能）"],
  }),
  quality: word("n.", "品质；质量", "a quality to be admired and fixed in the mind of the young 中 quality 指应被年轻人记住的品格。", {
    specialForms: ["quality（单数）", "qualities（复数，y→ies）"],
    examSynonyms: ["trait（特征；品质）", "merit（优点）"],
    collocations: ["a quality to be admired", "quality of life"],
  }),
  fix: word("v./n.", "固定；确定；修理", "fixed in the mind of the young 中 fixed 是被动不定式的一部分，表示牢牢记住或树立。", {
    specialForms: ["fix（原形/单数）", "fixes（第三人称单数/复数）", "fixed（过去式/过去分词）", "fixing（-ing）"],
    examSynonyms: ["establish（确立）", "repair（修理；另一常见义）"],
    collocations: ["fix in one's mind", "fix a date"],
  }),
  mind: word("n./v.", "头脑；思想；介意", "in the mind of the young 表示把某种品质植入年轻人的思想；mind 在此为名词。", {
    specialForms: ["mind（单数/原形）", "minds（复数/第三人称单数）", "minded（过去式/过去分词）", "minding（-ing）"],
    examSynonyms: ["mental state（心理状态；短语）", "thought（思想）"],
    collocations: ["in the mind of", "keep in mind"],
  }),
  long: word("adj./adv.", "长久的；更久的", "no longer openly honored 中 longer 与 no longer 构成‘不再’；不是长度比较。", {
    specialForms: ["long（原级）", "longer（比较级）", "longest（最高级）"],
    examSynonyms: ["any more（再；用于否定）", "extended（延长的）"],
  }),
  formerly: word("adv.", "从前；以前", "than formerly 是省略比较结构，formerly 作为正式副词把现在的状态与过去相比。", {
    specialForms: ["formerly（副词；无词形变化）"],
    examSynonyms: ["previously（以前）", "in the past（过去；短语）"],
    collocations: ["than formerly", "formerly known as"],
  }),
  two: word("num.", "二；两个", "a decade or two years ago 中 two 修饰复数 years，表示第二种时间估计。", {
    specialForms: ["two（基数词）", "second（序数词）"],
    examSynonyms: ["a pair of（两个；成对）", "both（两者都；限定范围不同）"],
  }),
  feel: word("v.", "感觉；感受", "people no longer feel its stirrings and promptings 中 feel 后接两个并列宾语。", {
    specialForms: ["feel（原形）", "feels（第三人称单数）", "felt（过去式/过去分词）", "feeling（-ing）"],
    examSynonyms: ["sense（感觉到）", "experience（经历；感受到）"],
    collocations: ["feel a need", "feel that"],
  }),
  stirring: word("n./v.-ing", "萌动；激发；搅动", "stirrings and promptings 是并列名词，指抱负在心中的萌动和推动。", {
    specialForms: ["stir（原形）", "stirs（第三人称单数）", "stirred（过去式/过去分词）", "stirring（-ing/名词）", "stirrings（复数）"],
    examSynonyms: ["awakening（觉醒）", "movement（动向；语境不同）"],
  }),
  prompting: word("n./v.-ing", "推动；提示；促使", "promptings 与 stirrings 并列，强调抱负促使人行动的内在力量。", {
    specialForms: ["prompt（原形/形容词）", "prompts（第三人称单数/复数）", "prompted（过去式/过去分词）", "prompting（-ing/名词）", "promptings（复数）"],
    examSynonyms: ["stimulus（刺激；推动因素）", "encouragement（鼓励）"],
  }),
  honor: word("v./n.", "尊敬；荣誉；给予荣誉", "no longer openly honored 中 honored 是被动分词，表示抱负不再受到公开尊重。", {
    specialForms: ["honor（原形/单数）", "honors（第三人称单数/复数）", "honored（过去式/过去分词）", "honoring（-ing）"],
    examSynonyms: ["respect（尊重）", "esteem（尊敬；正式）"],
    collocations: ["be honored", "honor a tradition"],
  }),
  profess: word("v.", "公开宣称；自称", "less openly professed 表示抱负仍存在，但人们较少公开承认或宣称它。", {
    specialForms: ["profess（原形）", "professes（第三人称单数）", "professed（过去式/过去分词）", "professing（-ing）"],
    examSynonyms: ["declare（宣称）", "avow（公开承认；正式）"],
    collocations: ["profess a belief", "openly profess"],
  }),
  consequence: word("n.", "后果；结果", "Consequences follow from this 中 consequences 指不公开表达抱负带来的后果。", {
    specialForms: ["consequence（单数）", "consequences（复数）"],
    examSynonyms: ["result（结果）", "effect（影响；结果）"],
    collocations: ["consequence of", "as a consequence"],
  }),
  course: word("n.", "过程；课程；当然（of course）", "of course 是插入语，表示‘当然’；course 在此不是课程内容。", {
    specialForms: ["course（单数）", "courses（复数）"],
    examSynonyms: ["path（道路；过程）", "class（课程；语境不同）"],
  }),
  some: word("det./pron./adv.", "一些；其中一部分", "some of which 指 consequences 中的一些；some 后可接复数名词或 of 短语。", {
    specialForms: structureForms,
    examSynonyms: ["a few（少数；可数）", "part of（其中一部分；结构不同）"],
    collocations: ["some of which", "some people"],
  }),
  drive: word("v./n.", "驱使；驾驶；驱动力", "ambition is driven underground 中 driven 是 drive 的过去分词，underground 是结果补语。", {
    specialForms: ["drive（原形）", "drives（第三人称单数）", "drove（过去式）", "driven（过去分词）", "driving（-ing）"],
    examSynonyms: ["force（迫使）", "motivate（激励；驱动）"],
    collocations: ["drive A underground", "drive sb to do"],
  }),
  underground: word("adv./adj./n.", "地下；隐秘地；地下的", "driven underground 表示抱负被迫转入不公开状态，underground 作结果补语。", {
    specialForms: structureForms,
    examSynonyms: ["secret（秘密的）", "hidden（隐藏的）"],
    collocations: ["go underground", "drive underground"],
  }),
  sly: word("adj./adv.", "狡猾的；鬼祟的", "made sly 中 sly 是 make 的形容词补语，表示表达方式变得隐秘而狡黠。", {
    examSynonyms: ["cunning（狡猾的）", "secretive（不公开的）"],
  }),
  stand: word("v./n.", "站立；处于某种状况", "the way things stand 表示事情目前的状况；stand 不表示单纯站立。", {
    specialForms: ["stand（原形）", "stands（第三人称单数）", "stood（过去式/过去分词）", "standing（-ing）"],
    examSynonyms: ["remain（处于）", "situation（状况；名词）"],
    collocations: ["the way things stand", "stand for"],
  }),
  angry: word("adj.", "愤怒的；生气的", "angry critics 是左侧的一方，表示对抱负持强烈抨击态度的人。", {
    examSynonyms: ["furious（暴怒的）", "hostile（敌对的）"],
  }),
  stupid: word("adj.", "愚蠢的；欠考虑的", "stupid supporters 与 angry critics 对举，作者对两端立场都带批评色彩。", {
    examSynonyms: ["foolish（愚蠢的）", "silly（傻的；较口语）"],
  }),
  supporter: word("n.", "支持者；拥护者", "stupid supporters 指盲目或缺乏说服力的抱负支持者；supporters 是复数。", {
    specialForms: ["supporter（单数）", "supporters（复数）"],
    examSynonyms: ["advocate（拥护者）", "backer（支持者；较口语）"],
  }),
  usual: word("adj.", "通常的；惯常的", "as usual 是插入语，表示中间的大多数认真生活者仍是常态。", {
    examSynonyms: ["customary（惯常的）", "normal（正常的）"],
    collocations: ["as usual", "the usual"],
  }),
  majority: word("n.", "大多数；多数", "the majority of earnest people 指认真生活的大多数人；majority of 后接复数名词。", {
    specialForms: ["majority（单数）", "majorities（复数）"],
    examSynonyms: ["most（大多数；限定词）", "bulk（大部分；名词）"],
    collocations: ["the majority of", "majority opinion"],
  }),
  earnest: word("adj./n.", "认真的；诚挚的", "earnest people 指认真谋求生活发展而不张扬的普通人。", {
    examSynonyms: ["serious（认真的）", "sincere（真诚的）"],
  }),
  try: word("v./n.", "尝试；努力", "trying to get on in life 中 trying 是现在分词，修饰 earnest people。", {
    specialForms: ["try（原形）", "tries（第三人称单数，y→ies）", "tried（过去式/过去分词）", "trying（-ing，去 y）"],
    examSynonyms: ["attempt（尝试；名词/动词）", "endeavor（努力；正式）"],
    collocations: ["try to do", "try doing"],
  }),
  get: word("v.", "获得；变得；进展", "get on in life 是短语动词，表示在生活中取得进展；get 不能按‘得到’直译。", {
    specialForms: ["get（原形）", "gets（第三人称单数）", "got（过去式）", "got/gotten（过去分词）", "getting（-ing，双写 t）"],
    examSynonyms: ["progress（进展；动词/名词）", "advance（取得进步）"],
    collocations: ["get on", "get on in life"],
  }),
  generally: word("adv.", "通常地；普遍地", "It is generally believed that... 是无人称被动结构，generally 表示这种看法具有普遍性。", {
    examSynonyms: ["usually（通常）", "commonly（普遍地）"],
  }),
  probably: word("adv.", "很可能；大概", "is probably lower than... 中 probably 修饰系动词结构，表示作者对比较结论的谨慎判断，而不是确定断言。", {
    examSynonyms: ["likely（可能的；常作表语或后接不定式）", "possibly（可能；把握度通常更低）"],
    collocations: ["probably + verb", "be probably + adjective"],
    otherMeanings: ["probably 用于推测，通常置于实义动词前、be 后或助动词后。"],
    wordFamily: ["probable（adj. 很可能的）", "probability（n. 可能性）"],
  }),
  believe: word("v.", "相信；认为", "It is generally believed that... 是无人称被动结构，that 从句说明普遍看法。", {
    specialForms: ["believe（原形）", "believes（第三人称单数）", "believed（过去式/过去分词）", "believing（-ing）"],
    examSynonyms: ["think（认为；普通）", "hold（持有观点；正式）"],
    collocations: ["be believed to", "believe that"],
  }),
  return: word("n./v.", "回报；返回；归还", "returns 对应第1句的 rewards，题目选项用 return 概括投入抱负后的回报。", {
    specialForms: ["return（单数/原形）", "returns（复数/第三人称单数）", "returned（过去式/过去分词）", "returning（-ing）"],
    examSynonyms: ["reward（回报）", "come back（返回；动词短语）"],
    collocations: ["returns on", "return to"],
  }),
  compensate: word("v.", "补偿；弥补", "compensate for the sacrifices 表示回报足以弥补付出的牺牲；for 后接被弥补对象。", {
    specialForms: ["compensate（原形）", "compensates（第三人称单数）", "compensated（过去式/过去分词）", "compensating（-ing）"],
    examSynonyms: ["make up for（弥补；短语）", "offset（抵消）"],
    collocations: ["compensate for", "compensate sb for sth"],
  }),
  money: word("n.", "钱；金钱", "money 在选项中是 reward 的一种形式，通常作不可数名词。", {
    specialForms: ["money（通常不可数）", "monies（不同笔款项；正式少见）"],
    examSynonyms: ["cash（现金）", "funds（资金）"],
  }),
  fame: word("n.", "名望；名声", "money, fame and power 是选项列举的成功回报；fame 通常不可数。", {
    examSynonyms: ["reputation（名声）", "renown（声誉；正式）"],
  }),
  goal: word("n.", "目标；目的", "goals are spiritual rather than material 中 goals 是 ambition 的追求目标。", {
    specialForms: ["goal（单数）", "goals（复数）"],
    examSynonyms: ["aim（目标）", "objective（目标；正式）"],
    collocations: ["achieve a goal", "goal of"],
  }),
  spiritual: word("adj.", "精神的；心灵的", "spiritual rather than material 形成对比，原文并未把 ambition 限定为精神目标。", {
    examSynonyms: ["non-material（非物质的）", "religious（宗教的；范围更窄）"],
  }),
  material: word("adj./n.", "物质的；材料", "material benefits 与 spiritual goals 对比；material 在选项中作形容词。", {
    examSynonyms: ["physical（物质的）", "tangible（有形的）"],
  }),
  famous: word("adj.", "著名的；出名的", "the famous 是形容词名词化，指名人群体；与 the rich 平行。", {
    examSynonyms: ["well-known（著名的）", "notable（显著的；著名的）"],
  }),
  sentence: word("n./v.", "句子；判决；宣判", "The last sentence of the first paragraph 指第一段最后一句；sentence 是可数名词。", {
    specialForms: ["sentence（单数/原形）", "sentences（复数/第三人称单数）", "sentenced（过去式/过去分词）", "sentencing（-ing）"],
    examSynonyms: ["statement（陈述）", "phrase（短语；范围更小）"],
  }),
  imply: word("v.", "暗示；意味着", "implies that 引导宾语从句，说明最后一句寓意；implies 是第三人称单数。", {
    specialForms: ["imply（原形）", "implies（第三人称单数，y→ies）", "implied（过去式/过去分词）", "implying（-ing）"],
    examSynonyms: ["suggest（暗示）", "indicate（表明）"],
    collocations: ["imply that", "imply a meaning"],
  }),
  customary: word("adj.", "惯常的；习惯性的", "customary of the educated to discard ambition in words 是选项 A 的形容词结构，描述习惯而非核心评价。", {
    examSynonyms: ["usual（通常的）", "traditional（传统的）"],
  }),
  discard: word("v./n.", "丢弃；抛弃", "discard ambition in words 指口头上抛弃抱负；题目认为该项没有揭示受益后的虚伪。", {
    specialForms: ["discard（原形/单数）", "discards（第三人称单数/复数）", "discarded（过去式/过去分词）", "discarding（-ing）"],
    examSynonyms: ["abandon（放弃）", "reject（拒绝）"],
  }),
  late: word("adj./adv.", "迟的；晚的", "too late to check ambition 是 too...to... 结果结构；late 在此表示时机太晚。", {
    examSynonyms: ["belated（迟来的）", "tardy（迟到的；正式）"],
  }),
  check: word("v./n.", "检查；阻止；核对", "check ambition once it has been let out 是选项 B 的比喻解释，check 表控制或遏制。", {
    specialForms: ["check（原形/单数）", "checks（第三人称单数/复数）", "checked（过去式/过去分词）", "checking（-ing）"],
    examSynonyms: ["control（控制）", "verify（核实）"],
    collocations: ["check on", "keep in check"],
  }),
  let: word("v.", "让；允许；出租", "once it has been let out 中 let 的过去分词与原形同形，let out 表示放出或泄露。", {
    specialForms: ["let（原形/过去式/过去分词）", "letting（-ing）"],
    examSynonyms: ["allow（允许）", "release（释放；泄露）"],
    collocations: ["let out", "let sb do"],
  }),
  dishonest: word("adj.", "不诚实的；不正直的", "It is dishonest to deny ambition after... 用形容词评价目标实现后再否认抱负的行为。", {
    examSynonyms: ["insincere（不真诚的）", "deceitful（欺骗性的）"],
  }),
  immoral: word("adj.", "不道德的；违背道德规范的", "immoral to deny ambition after enjoying its benefits 是选项中的评价结构，immoral 描述行为本身违反道德。", {
    examSynonyms: ["unethical（不合伦理的；正式）", "wrong（错误的；范围更宽）"],
    collocations: ["immoral to do", "immoral behavior"],
  }),
  deny: word("v.", "否认；拒绝承认", "deny ambition / deny doing 直接接被否认事实，不接 to do 表同义。", {
    specialForms: ["deny（原形）", "denies（第三人称单数，y→ies）", "denied（过去式/过去分词）", "denying（-ing）"],
    examSynonyms: ["refute（驳斥）", "reject（拒绝接受）"],
    collocations: ["deny doing", "deny that"],
  }),
  fulfillment: word("n.", "实现；完成；满足", "after the fulfillment of the goal 是名词化时间结构，也可改写为 after the goal is fulfilled。", {
    specialForms: ["fulfillment（单数）", "fulfill（动词原形）", "fulfilled（过去式/过去分词）"],
    examSynonyms: ["achievement（实现；成就）", "completion（完成）"],
    collocations: ["fulfillment of", "a sense of fulfillment"],
  }),
  impractical: word("adj.", "不切实际的；不可行的", "impractical for the educated to enjoy benefits from ambition 与原文事实相反，impractical 作表语评价。", {
    examSynonyms: ["unrealistic（不现实的）", "unworkable（不可行的）"],
  }),
  pursuit: word("n.", "追求；从事的活动", "their pursuits are not fame or wealth 中 pursuits 指人们实际追求的目标。", {
    specialForms: ["pursuit（单数）", "pursuits（复数）"],
    examSynonyms: ["endeavor（努力追求）", "activity（活动；泛称）"],
    collocations: ["pursuit of", "pursue a goal"],
  }),
  closely: word("adv.", "紧密地；密切地", "closely related to 是固定搭配，表示 ambition 与 material benefits 的联系密切。", {
    examSynonyms: ["tightly（紧密地）", "carefully（仔细地；语义不同）"],
  }),
  relate: word("v.", "关联；联系；讲述", "be closely related to 是被动/形容词结构，to 后接关联对象。", {
    specialForms: ["relate（原形）", "relates（第三人称单数）", "related（过去式/过去分词）", "relating（-ing）"],
    examSynonyms: ["connect（联系）", "associate（联系；联想到）"],
    collocations: ["be related to", "relate A to B"],
  }),
  greedy: word("adj.", "贪婪的；贪得无厌的", "appear greedy 与 contemptible 并列，概括 acquisitive、vulgar 所表达的负面社会评价。", {
    examSynonyms: ["acquisitive（贪得无厌的）", "avaricious（贪财的；正式）"],
  }),
  contemptible: word("adj.", "可鄙的；令人鄙视的", "appear greedy and contemptible 中 contemptible 是 appear 的并列表语形容词。", {
    examSynonyms: ["despicable（卑鄙的）", "disgraceful（可耻的）"],
  }),
  conclusion: word("n.", "结论；结束", "the conclusion can be drawn that... 是被动推论结构，that 从句说明结论内容。", {
    specialForms: ["conclusion（单数）", "conclusions（复数）"],
    examSynonyms: ["inference（推论）", "judgment（判断）"],
    collocations: ["draw a conclusion", "in conclusion"],
  }),
  draw: word("v./n.", "得出；画；拉", "can be drawn from the last paragraph 中 draw a conclusion 的被动形式，from 引出依据。", {
    specialForms: ["draw（原形）", "draws（第三人称单数）", "drew（过去式）", "drawn（过去分词）", "drawing（-ing）"],
    examSynonyms: ["infer（推断）", "derive（得出；源自）"],
    collocations: ["draw a conclusion", "draw from"],
  }),
  maintain: word("v.", "维持；保持；坚持", "ambition should be maintained 是情态动词被动，表示抱负应当继续得到维护。", {
    specialForms: ["maintain（原形）", "maintains（第三人称单数）", "maintained（过去式/过去分词）", "maintaining（-ing）"],
    examSynonyms: ["preserve（保持）", "sustain（维持）"],
    collocations: ["maintain an ambition", "be maintained"],
  }),
  secretly: word("adv.", "秘密地；暗中", "secretly and vigorously 是选项 A 的并列方式状语；secretly 与作者主张的 openly 相反。", {
    examSynonyms: ["privately（私下地）", "covertly（秘密地；正式）"],
  }),
  vigorously: word("adv.", "有力地；积极地", "vigorously 修饰 maintained，表示行动力度；它本身不能抵消 secretly 的问题。", {
    examSynonyms: ["energetically（精力充沛地）", "forcefully（有力地）"],
  }),
  enthusiastically: word("adv.", "热情地；积极地", "openly and enthusiastically 是作者推断的正面维护方式，两个副词并列修饰 maintained。", {
    examSynonyms: ["eagerly（热切地）", "zealously（热心地；语气更强）"],
  }),
  momentarily: word("adv.", "片刻地；短暂地", "easily and momentarily 表示短暂方式，与文章强调抱负传统的持续性不符。", {
    examSynonyms: ["briefly（短暂地）", "temporarily（暂时地）"],
  }),
  verbally: word("adv.", "口头上；用言语", "verbally and spiritually 是选项 D 的并列方式，但只说口头层面不足以回应作者批评。", {
    examSynonyms: ["orally（口头地）", "in words（用言语；短语）"],
  }),
  spiritually: word("adv.", "在精神上；心灵上", "spiritually 与 verbally 并列，说明精神层面；原文重点是公开社会表达而非单纯精神状态。", {
    examSynonyms: ["mentally（心理上）", "religiously（宗教上；范围更窄）"],
  }),
  "b": word("n./letter.", "字母 B；选项标签", "B 在题目结构中是选项标签，不承担正文词义；保留入口以便分析文本可追溯。", {
    specialForms: ["B（大写字母）"],
    examSynonyms: ["option B（B 选项；结构表达）"],
  }),
};

export const passage5LemmaAliases: Record<string, string> = {
  "ambition's": "ambition",
  fixed: "fix",
  longer: "long",
  stirrings: "stirring",
  promptings: "prompting",
  rewards: "reward",
  rewarded: "reward",
  distinction: "distinction",
  deemed: "deem",
  worthy: "worthy",
  behalf: "behalf",
  traditions: "tradition",
  widely: "wide",
  shared: "share",
  highly: "high",
  admired: "admire",
  educated: "educate",
  claimed: "claim",
  benefited: "benefit",
  benefits: "benefit",
  grandparents: "grandparent",
  closing: "close",
  horses: "horse",
  escaped: "escape",
  riding: "ride",
  interested: "interest",
  signs: "sign",
  summer: "summer",
  homes: "home",
  bmws: "bmw",
  locations: "location",
  names: "name",
  brands: "brand",
  items: "item",
  happened: "happen",
  could: "can",
  pushing: "push",
  treated: "treat",
  spectacles: "spectacle",
  critics: "critic",
  books: "book",
  takes: "take",
  meals: "meal",
  restaurants: "restaurant",
  advocating: "advocate",
  phases: "phase",
  enrolled: "enroll",
  costs: "cost",
  appearing: "appear",
  attacks: "attack",
  angles: "angle",
  defenders: "defender",
  extremely: "extremely",
  consequences: "consequence",
  driven: "drive",
  supporters: "supporter",
  trying: "try",
  believed: "believe",
  returns: "return",
  goals: "goal",
  implies: "imply",
  words: "word",
  drawn: "draw",
  maintained: "maintain",
  honored: "honor",
  professed: "profess",
  pursuits: "pursuit",
  related: "relate",
  door: "door",
  formerly: "formerly",
  two: "two",
  immoral: "immoral",
  "three-stars": "three-star",
  secretly: "secretly",
  vigorously: "vigorously",
  enthusiastically: "enthusiastically",
  momentarily: "momentarily",
  verbally: "verbally",
  spiritually: "spiritually",
  "united": "united",
  "states": "state",
  "one's": "one",
};

export const passage5FamilyAliases: Record<string, string> = {
  ambitious: "ambition",
  rewarding: "reward",
  distinction: "distinction",
  distinguished: "distinction",
  worthy: "worth",
  vitality: "vital",
  widely: "wide",
  admired: "admire",
  educated: "educate",
  hypocrisy: "hypocrisy",
  hypocritical: "hypocrisy",
  beneficial: "benefit",
  benefits: "benefit",
  materialism: "material",
  materialistic: "material",
  maintain: "maintain",
  maintained: "maintain",
  professed: "profess",
  supporter: "support",
  supporters: "support",
  defender: "defend",
  defenders: "defend",
};

export const passage5FormPartOfSpeech: Record<string, string> = {
  "ambition's": "possessive noun form",
  fixed: "v.-ed（fix 的过去分词）",
  longer: "adj./adv.（比较级）",
  stirrings: "n.（复数）",
  promptings: "n.（复数）",
  rewards: "n.（复数）",
  rewarded: "v.-ed/adj.",
  deemed: "v.-ed（deem 的过去分词）",
  shared: "v.-ed/adj.",
  widely: "adv.",
  highly: "adv.",
  admired: "v.-ed/adj.",
  educated: "adj./v.-ed（形容词名词化语境）",
  claimed: "v.-ed",
  benefited: "v.-ed",
  benefits: "n.（复数）/v.（第三人称单数）",
  grandparents: "n.（复数）",
  closing: "v.-ing/gerund",
  horses: "n.（复数）",
  escaped: "v.-ed",
  riding: "v.-ing",
  interested: "adj./v.-ed",
  signs: "n.（复数）/v.（第三人称单数）",
  homes: "n.（复数）",
  bmws: "n.（品牌名复数）",
  locations: "n.（复数）",
  names: "n.（复数）/v.（第三人称单数）",
  brands: "n.（复数）/v.（第三人称单数）",
  items: "n.（复数）",
  happened: "v.-ed",
  could: "modal v.（can 的过去式/委婉形式）",
  pushing: "v.-ing/adj.",
  treated: "v.-ed",
  spectacles: "n.（复数）",
  critics: "n.（复数）",
  books: "n.（复数）/v.（第三人称单数）",
  takes: "v.（第三人称单数）",
  meals: "n.（复数）",
  "three-star": "复合形容词",
  restaurants: "n.（复数）",
  advocating: "v.-ing",
  phases: "n.（复数）/v.（第三人称单数）",
  enrolled: "v.-ed/adj.",
  costs: "n.（复数）/v.（第三人称单数）",
  appearing: "v.-ing",
  attacks: "n.（复数）/v.（第三人称单数）",
  angles: "n.（复数）/v.（第三人称单数）",
  defenders: "n.（复数）",
  consequences: "n.（复数）",
  driven: "v.-en（drive 的过去分词）",
  supporters: "n.（复数）",
  trying: "v.-ing",
  believed: "v.-ed/adj.",
  returns: "n.（复数）/v.（第三人称单数）",
  goals: "n.（复数）",
  implies: "v.（第三人称单数，y→ies）",
  words: "n.（复数）",
  drawn: "v.-en（draw 的过去分词）",
  maintained: "v.-ed/adj.",
  honored: "v.-ed/adj.",
  professed: "v.-ed/adj.",
  pursuits: "n.（复数）",
  related: "v.-ed/adj.",
  door: "n.",
  formerly: "adv.",
  two: "num.",
  immoral: "adj.",
  secretly: "adv.",
  vigorously: "adv.",
  enthusiastically: "adv.",
  momentarily: "adv.",
  verbally: "adv.",
  spiritually: "adv.",
  "one's": "possessive determiner form",
};
