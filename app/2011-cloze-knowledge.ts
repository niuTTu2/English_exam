import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";
import { cloze2011CollocationGlosses, cloze2011Lexicon, cloze2011SentenceContexts } from "./2011-cloze-lexicon";

const seeds = [
  ["afford-something-to", "affords anonymity to its users", "afford something to somebody", "动词及双宾对象结构", "向用户提供匿名条件", "afford直接接所提供的事物，再用to引接受者；与afford to do的有能力做区分。", "The rule affords protection to consumers.", "这项规则为消费者提供保护。", "此处afford不表示买得起，to后为接受者名词。"],
  ["freedom-of-speech", "freedom of speech", "freedom of speech", "名词及of补足语", "言论自由", "of speech限定freedom的领域，整体为抽象权利名称。", "The law protects freedom of speech.", "法律保护言论自由。", "speech在这里不是某一次演讲稿。"],
  ["that-very-noun", "that very anonymity", "that very + noun", "强调性名词结构", "恰恰这种匿名性", "very位于限定词之后、名词之前，作为强调性形容词指正是那一个。", "That very decision caused the dispute.", "恰恰是那个决定引起了争议。", "不能按副词非常去修饰抽象名词。"],
  ["sweep-across", "swept across the Web", "sweep across + area", "动词介词搭配", "席卷整个网络", "sweep比喻事件迅猛传播；across引范围，swept是过去式和过去分词。", "The news swept across the country.", "消息迅速传遍全国。", "本句不是打扫网络，也不是骑行。"],
  ["preserve-passive", "be preserved", "be preserved", "被动语态", "得到保护；被维持", "be后接preserve的过去分词；本句与前置Can组成被动疑问句。", "Privacy can be preserved.", "隐私可以得到保护。", "主语privacy是受保护对象，不是主动保护别人的主体。"],
  ["safety-and-security", "safety and security", "safety and security", "并列名词搭配", "安全与防护保障", "safety偏免于危险，security突出防攻击与侵入；两者并列为bringing的宾语。", "The design improves safety and security.", "这项设计改善了安全与防护保障。", "两个名词共同表达安全目标，不是两个不同世界。"],
  ["increasingly-adjective", "increasingly lawless", "increasingly + adjective", "程度副词结构", "越来越失序的", "increasingly修饰形容词，表达状态随时间增强，整体作seems的表语。", "The problem seems increasingly serious.", "问题似乎越来越严重。", "increasingly不是现在分词，不能独立作谓语。"],
  ["offer-double-object", "offered the federal government a proposal", "offer somebody something", "双宾语结构", "向联邦政府提出方案", "offer后先接接收者，后接所提供内容；也可改为offer something to somebody。", "She offered the committee a proposal.", "她向委员会提出了一项建议。", "政府是接受者，而非提出方案的人。"],
  ["make-object-noun", "make the Web a safer place", "make + object + noun complement", "宾语补足语结构", "使网络成为更安全的地方", "the Web为宾语，a safer place是说明其结果身份的名词补足语。", "The project made the park a safer place.", "这个项目使公园变得更安全。", "两个名词不是彼此独立的双宾语，而是同一对象的变化前后描述。"],
  ["voluntary-trusted-identity", 'a "voluntary trusted identity" system', "a voluntary trusted identity system", "复合名词短语", "自愿参与的可信身份认证系统", "voluntary修饰参与原则，trusted identity说明认证目的，system为中心名词。", "Users can join a voluntary identity system.", "用户可自愿加入身份认证系统。", "自愿参加不等于参加后无需身份核验。"],
  ["equivalent-of", "the high-tech equivalent of", "the equivalent of + noun", "名词补足结构", "相当于……的高科技对应物", "equivalent作名词，of后说明功能对应的对象，三种凭证并列。", "This device is the equivalent of a key.", "这个设备相当于一把钥匙。", "对应的是功能，不必外观或材质相同。"],
  ["rolled-into-one", "all rolled into one", "all rolled into one", "分词习语", "全部合为一体", "all概括多个功能或身份，rolled为被动分词，into引合并结果。", "The device is a camera and phone rolled into one.", "这个设备集相机和电话于一体。", "介词用into，不用表示来源的from。"],
  ["linked-to", "linked to a specific computer", "be linked to + object", "过去分词后置限定", "与特定计算机关联的", "linked to修饰digital credential，凭证是被关联对象，to引绑定目标。", "The account is linked to one device.", "该账户与一台设备关联。", "这里是技术关联，不是chained to所强调的束缚。"],
  ["range-of-services", "a range of online services", "a range of + plural noun", "数量范围名词结构", "一系列在线服务", "range表示多样的覆盖范围，of后接服务的复数形式。", "The website offers a range of services.", "这个网站提供多种服务。", "range在这里不是航程或射程。"],
  ["federation-of", "a federation of private online identity systems", "a federation of + plural noun", "名词及组成补足语", "私营在线身份系统的联盟", "of后指联合体中的成员，federation强调多个独立系统之间合作。", "A federation of local groups was created.", "一个地方团体联盟成立了。", "不是一个由政府统一颁发的个人上网证件。"],
  ["which-noun-to-do", "which system to join", "which + noun + to do", "疑问词不定式结构", "选择加入哪个系统", "整体作select的宾语，which限定system，不定式逻辑主语与Users相同。", "They chose which course to take.", "他们选择了要修哪门课。", "这是非限定结构，不应标为有完整时态的宾语从句。"],
  ["authenticated-perfect-passive", "have been authenticated", "have / has been authenticated", "现在完成时被动", "已经通过身份认证", "have been加过去分词，说明身份在访问系统前已经验证。", "Their identities have been authenticated.", "他们的身份已经得到核验。", "identities为复数用have，不能把been误认成实义动词拥有。"],
  ["contrast-with", "contrasts with", "contrast with + object", "动词介词搭配", "与……形成对照", "比较两个不同方案，with后接代词one，one再由定语从句限定。", "This approach contrasts with the earlier plan.", "这一做法与先前的计划形成对照。", "contrast强调差别，不表示支持或融入。"],
  ["issue-license-passive", "issued by the government", "a license issued by + authority", "过去分词后置定语", "由政府签发的", "issued说明license的被动关系，by引官方签发者。", "They need a license issued by the agency.", "他们需要该机构签发的许可证。", "issue突出正式许可，不只是递送文件。"],
  ["single-sign-on", '"single sign-on" systems', "single sign-on", "技术名词", "单点登录", "一次身份认证后访问多项服务；single限定认证次数，而非服务数。", "Single sign-on gives access to several services.", "单点登录让人能够访问多项服务。", "不等于只允许一个用户登录。"],
  ["make-it-possible-for", "make it possible for users", "make it possible for somebody to do", "形式宾语结构", "使用户有可能做某事", "it占形式宾语位置，possible为宾补，for引不定式动作执行者。", "The system makes it possible for users to share files.", "该系统使用户能够共享文件。", "it不能译为那个系统；真正内容是不定式短语。"],
  ["log-in-once", "log in just once", "log in + frequency", "短语动词及频次状语", "只登录一次", "log in整体表示登录，just once说明次数；无需把in译成进入某实物。", "You only need to log in once.", "你只需登录一次。", "登录不等于首次注册账户。"],
  ["in-effect", "In effect", "in effect", "衔接短语", "实际上；实质上", "用来归纳技术方案产生的实际作用，不表示回报或相反。", "In effect, the two plans have the same result.", "实际上，两个计划产生相同结果。", "区别in vain徒劳地、in return作为回报。"],
  ["walled-garden", 'a "walled garden"', "a walled garden", "比喻性名词短语", "有准入边界的封闭网络环境", "用有围墙的花园比喻只有特定成员可进入的受控环境。", "The service operates as a walled garden.", "这项服务按封闭受控环境运行。", "这是技术生态的隐喻，不是真实植物园。"],
  ["sense-of-community", "a sense of a trusted community", "a sense of + noun", "名词及内容补足语", "可信社区感", "sense指感受，of后说明感受内容；trusted限定community。", "Shared activities create a sense of community.", "共同活动营造社群归属感。", "sense不是此处某个词的字典释义。"],
  ["describe-as", 'described it as a "voluntary ecosystem"', "describe A as B", "动词与身份补足", "将其称为自愿生态系统", "A为被描述的对象，as B为性质或身份说明，A与B同指。", "They described the plan as a useful experiment.", "他们把计划描述为一次有益的试验。", "as不能换成表示原因的because。"],
  ["with-confidence", "with confidence", "with confidence", "方式介词短语", "有信心地；放心地", "修饰complete transactions，trusting短语解释信心来自身份可信。", "Customers can trade with confidence.", "顾客可以放心交易。", "不是强调喜悦delight或耐心patience。"],
  ["each-other", "each other", "each other", "相互代词", "彼此；互相", "指交易参与者之间的相互关系；本句位于of之后说明身份所属。", "The participants trust each other.", "参与者互相信任。", "不要把each和other拆成两名不同参与者。"],
  ["run-on-infrastructure", "on which the transaction runs", "infrastructure on which + clause", "介词前置关系从句", "交易赖以运行的基础设施", "恢复为the transaction runs on the infrastructure，on随which前置。", "The platform on which the service runs is reliable.", "该服务运行所依托的平台很可靠。", "which指基础设施而非交易者；介词取决于run on搭配。"],
  ["privacy-rights-activists", "privacy rights activists", "privacy rights activists", "多重名词定语", "隐私权倡导者", "activists为中心，privacy rights限定倡导领域，不能把rights当形容词正确的。", "Privacy rights activists questioned the plan.", "隐私权倡导者质疑了该计划。", "维护隐私者不是全部一致反对，原文说有分歧。"],
  ["some-others-attitudes", "Some applaud the approach", "some ...; others ...", "不定代词对照结构", "一些人赞同这种做法", "some与后句others共同把同一群体分成不同态度，applaud表示赞同。", "Some support the plan; others oppose it.", "一些人支持计划，另一些人反对。", "不能把这两部分误解为前后同一群体改变观点。"],
  ["others-concerned", "others are concerned", "be concerned", "系表搭配", "另一些人感到担忧", "concerned在are后表示担忧状态；与applaud对照。", "Residents are concerned about safety.", "居民担心安全问题。", "不是be concerned with所表示的涉及。"],
  ["seem-clear-that", "It seems clear that", "It seems clear that + clause", "形式主语结构", "看来……是清楚的", "it作形式主语，that从句为真正主语，seems保留推断语气。", "It seems clear that the rules need revision.", "看来这些规则需要修改。", "that从句完整，that本身不作其主语或宾语。"],
  ["license-mentality", '"driver\'s license" mentality', "a licensing mentality", "比喻性名词搭配", "持证准入的制度思维", "把上网资格类比驾驶许可，mentality是中心名词，前面执照表达作限定。", "The debate reflects a licensing mentality.", "这场争论反映了一种许可制思维。", "这里讨论制度思路，不是某个驾驶员的心理状态。"],
  ["greeted-with", "has also been greeted with skepticism", "be greeted with + reaction", "被动回应搭配", "也遭到质疑", "with引态度，by引作出回应的人；has been表示这种反应已经出现。", "The proposal was greeted with skepticism.", "提案遭到了质疑。", "greet不总是欢迎，所接态度决定褒贬。"],
  ["envisioned-by", "envisioned by Mr. Schmidt", "something envisioned by somebody", "分词后置定语", "施密特先生设想的", "envisioned与ecosystem为被动关系，by指出构想者。", "The future envisioned by the author is different.", "作者设想的未来有所不同。", "设想不等于系统已经部署完毕。"],
  ["leave-object-adjective", "leave much of the Internet vulnerable", "leave + object + adjective", "宾语补足语结构", "使互联网很大一部分仍易受攻击", "宾语为much of the Internet，形容词vulnerable说明留下的状态。", "Weak passwords leave accounts vulnerable.", "弱密码使账户易受攻击。", "leave不取离开义；宾语后不是另一个独立宾语。"],
  ["identify-oneself", "identify themselves", "identify oneself", "动词反身宾语", "表明自己的身份", "反身代词与主语users同指；identify与register并列，共用前面的to。", "Visitors must identify themselves.", "访客必须表明身份。", "themselves不可随意换成指其他人的them。"],
  ["in-the-same-way", "in the same way", "in the same way that + clause", "方式类比结构", "以相同方式；正如", "the same way后由that从句说明具体类比：公共道路驾驶要求许可。", "The rule works in the same way that a permit does.", "该规则的运作方式与许可证相同。", "that不指代驾驶员，而是连接对方式的具体说明。"],
  ["licensed-to-do", "be licensed to drive", "be licensed to do", "被动许可结构", "获得驾驶许可", "be licensed为被动，to do说明许可的行为；本句前有must表示法定义务。", "Operators must be licensed to provide the service.", "经营者必须取得许可才能提供这项服务。", "此处license是动词，而第8句driver's license中的license是名词。"],
] as const;

export const cloze2011PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, , canonical, type, meaning, rule, english, chinese, pitfall]) => [key, {
  key, canonical, type, meaning, summary: rule, grammarRole: type,
  structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall],
}]));
export const cloze2011PhraseAliases: Record<string, string> = {
  ...Object.fromEntries(seeds.flatMap(([key, source, canonical]) => [source, canonical].map(expression => [expression.toLowerCase(), key]))),
  "should be forced to register": "be-forced-to-do",
};
export const cloze2011PhraseGlosses = {
  ...cloze2011CollocationGlosses,
  ...Object.fromEntries(seeds.map(([, source, , , meaning, note]) => [source.toLowerCase(), { meaning, note }])),
  "should be forced to register": { meaning: "应被强制注册", note: "复用be forced to do；should给出建议或要求，to register说明被强制进行的动作。" },
  "in contrast": { meaning: "相反；相比之下", note: "第12题干扰项；需要前后事实有对照关系，本句实际是概括效果。" },
};

export function getCloze2011WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = cloze2011Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? cloze2011SentenceContexts[sentenceId]?.[headword] : undefined;
  const pattern = entry.collocations[0];
  const meaning = cloze2011CollocationGlosses[pattern.toLowerCase()].meaning;
  const rule = context?.use ?? entry.use;
  return { grammarRole: context?.partOfSpeech ?? entry.partOfSpeech, grammarSummary: rule, structures: [{ pattern, meaning, rule }], pitfalls: entry.examSynonyms };
}
