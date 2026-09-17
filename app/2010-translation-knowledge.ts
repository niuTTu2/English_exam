import type { PhraseKnowledge, WordKnowledge } from "./knowledge-base";
import { translation2010CollocationNotes, translation2010Lexicon, translation2010SentenceContexts } from "./2010-translation-lexicon";

const seeds = [
  ["these-days", "these days", "these days", "时间名词短语", "如今；近来", "整体作时间状语；these与复数days配合，不指定确切天数。", "These days, many people work from home.", "如今，许多人居家工作。", "不要机械译成这些具体的日子。"],
  ["have-personal-meaning", "have personal meaning (to somebody)", "have personal meaning", "动宾搭配", "对个人有切身意义", "meaning为不可数的意义，personal作定语；to可说明对谁而言。", "The idea has personal meaning to her.", "这个想法对她有切身意义。", "不是姓名的含义，也不等于隐私。"],
  ["period-of-state", "a period of + state", "a painful period of unsustainability", "名词及后置限定", "一段处于某种状态的时期", "本句painful修饰period，of unsustainability指难以为继的状态。", "He endured a painful period of uncertainty.", "他熬过了一段充满不确定性的痛苦时期。", "of后说明时期性质，不能把unsustainability译成可持续性。"],
  ["make-it-clear-that", "make it clear (to somebody) that + clause", "made it clear to him", "形式宾语结构", "使某人清楚地认识到……", "it作形式宾语，clear作宾补；真正内容在后面的that从句，to him说明感受者。", "The experience made it clear to him that change was necessary.", "这段经历使他明白，改变是必要的。", "it不是代替前面那段经历；前面的经历是主语。"],
  ["sustainability-oriented-values", "sustainability-oriented values", "sustainability-oriented values", "复合形容词定语", "以可持续性为导向的价值观", "-oriented表示以某事为导向，整体修饰复数values。", "Her choices reflect sustainability-oriented values.", "她的选择体现了以可持续性为导向的价值观。", "values在此是价值观，不是数值或价格。"],
  ["through-action-and-choice", "through action and choice", "through everyday action and choice", "途径介词短语", "通过行动和选择", "through引实践途径，everyday同时限定日常行动与选择。", "Values are expressed through everyday action and choice.", "价值观通过日常行动和选择体现出来。", "everyday作定语，不等于every day的每天状语。"],
  ["recall-doing", "recall doing something", "recalls spending", "动词及动名词宾语", "回忆做过某事", "recall后接动名词，spending短语整体给出回忆内容。", "She recalls spending a year abroad.", "她回忆起在国外度过的一年。", "recall doing回忆已做的事，不用recall to do替代。"],
  ["spend-time-doing", "spend time doing something", "spending a confusing year in the late 1990s selling insurance", "时间宾语及活动补足", "花时间做某事", "spend后接所花时间，doing说明活动；本句时间状语插在year与selling之间。", "He spent a year selling insurance.", "他花了一年时间卖保险。", "selling不是与spending并列的独立谓语，不写spend time to do。"],
  ["in-late-decade", "in the late + decade", "in the late 1990s", "时间介词短语", "在某年代末期", "late限定十年中的后期；1990s指1990至1999这个年代。", "She started work in the late 1990s.", "她在20世纪90年代末开始工作。", "不能译成1990年年底；early为初期，mid为中期。"],
  ["sell-insurance", "sell insurance", "selling insurance", "动宾搭配", "销售保险", "insurance在此不可数，selling为spend time doing中的动名词。", "He earns a living selling insurance.", "他靠卖保险谋生。", "保险销售不是出售保险机构。"],
  ["be-through-experience", "be through something", "been through", "经历表达", "经历过某事", "本句had been through后接互联网行业的兴衰，been是be的过去分词。", "She had been through a difficult year.", "她曾经历过艰难的一年。", "be through在其他语境也可表示结束；这里通过后面的经历对象判义。"],
  ["dot-com-boom-and-burst", "the dot-com boom and burst", "dot-com boom and burst", "并列名词短语", "互联网行业的繁荣与泡沫破裂", "boom和burst平行，dot-com共同限定行业；忠实保留原卷burst。", "He lived through the dot-com boom and burst.", "他经历过互联网行业的繁荣与泡沫破裂。", "更常见的boom and bust不能据此替换原卷词形。"],
  ["desperate-for", "be desperate for something", "desperate for a job", "形容词补足结构", "急切需要某物", "for引急需对象；本句整组作为主语状态补充，兼说明签约原因。", "He was desperate for a job.", "他急需一份工作。", "形容词短语没有自己的限定动词，不是独立从句。"],
  ["sign-on-with", "sign on with an organization", "signed on with a Boulder agency", "短语动词及介词补足", "与某机构签约工作", "sign on表示签约加入，with引机构；Boulder是机构所在地。", "She signed on with an agency.", "她与一家代理机构签约工作。", "本句不是登录网站，不能与sign in的账号登录混淆。"],
  ["go-well", "go well", "go well", "动词与方式副词", "进展顺利", "go在此为进展；原句didn't go well是否定，表示不顺利。", "The interview did not go well.", "面试进展不顺利。", "顺利修饰动词要用well，不用形容词good。"],
  ["bad-move", "a bad move", "a really bad move", "评价性名词短语", "一个糟糕的决定或举措", "move为行动选择，bad作定语，really加强bad的程度；整组作was的表语。", "Taking that job was a bad move.", "接受那份工作是个糟糕的决定。", "不是身体动作难看，也不必指搬家。"],
  ["ones-passion", "one's passion", "my passion", "所属名词短语", "某人热爱的事情", "my限定passion，原文that's not my passion否定卖保险是兴趣所在。", "Teaching is her passion.", "教学是她热爱的事业。", "passion强于一般interest，此处不译为爱情激情。"],
  ["dilemma-about", "a dilemma about something", "dilemma about the job", "名词及介词补足", "关于某事的两难处境", "about限定两难涉及的事项；本文为不热爱工作但又需要它。", "He faced a dilemma about the job.", "他在这份工作上陷入两难。", "不是对职业名称的理解困难。"],
  ["translate-into-result", "translate into something", "translated, predictably, into a lack of sales", "动词及结果介词短语", "转化为；表现为某种结果", "into引结果，predictably插入评注；本句表现为销售业绩不足。", "Her effort translated into better results.", "她的努力转化为了更好的成绩。", "本句translate不是翻译；into不能换成表示起点的from。"],
  ["2010-p1-a-lack-of-demand", "a lack of + noun", "a lack of sales", "名词及of补足语", "缺乏；……不足", "lack为名词，of引所缺对象；可接demand需求、sales销售等，本句指销售不足。", "A lack of time limited the discussion.", "时间不足限制了讨论。", "名词lack常接of；动词lack可直接接宾语，不能据缺乏推出绝对为零。"],
  ["be-miserable", "be miserable", "was miserable", "主系表结构", "感到痛苦；处境难受", "miserable为形容词表语；本句先概括痛苦，再描写焦虑行为。", "He was miserable in that job.", "他做那份工作时很痛苦。", "不只指贫困，也不是感到身体疼痛的唯一表达。"],
  ["so-much-that", "so much + uncountable noun + that + clause", "so much anxiety that I would wake up in the middle of the night and stare at the ceiling", "程度与结果结构", "如此多或强烈……以至于……", "so修饰much，much限定不可数名词anxiety；that引结果状语从句。", "He had so much anxiety that he could not sleep.", "他焦虑得无法入睡。", "可数名词复数用so many；不能把结果从句误作anxiety的同位语。"],
  ["wake-up", "wake up", "wake up", "短语动词", "醒来", "本句不及物，与stare共用would，描述过去反复发生的行为。", "I would wake up at night.", "我过去常在夜里醒来。", "也可及物叫醒某人；代词须放中间，如wake him up。"],
  ["middle-of-night", "in the middle of the night", "in the middle of the night", "时间介词短语", "在半夜", "in引时间，of the night限定middle，整组修饰wake up。", "She woke up in the middle of the night.", "她半夜醒了过来。", "不是整个夜晚持续醒着；也不能擅自补具体钟点。"],
  ["stare-at", "stare at something", "stare at the ceiling", "动词与介词搭配", "盯着某物看", "at引注视对象，强调目光长时间停留；ceiling在此为天花板。", "He stared at the ceiling.", "他盯着天花板看。", "glance at只是瞥一眼，不能等同；不要漏掉at。"],
  ["have-no-money", "have no money", "had no money", "否定动宾结构", "没有钱", "no限定不可数money；had是实义动词过去式。", "I had no money for a ticket.", "我没有钱买票。", "不能因had就判定为过去完成时。"],
  ["need-a-job", "need a/the job", "needed the job", "实义动词及名词宾语", "需要一份或这份工作", "the job回指卖保险；needed为实义动词过去式，直接接名词。", "He needed the job to support himself.", "他需要这份工作养活自己。", "不是情态动词need后接动词原形的用法。"],
  ["just-wait", "just wait", "Just wait", "祈使建议", "且等一等；只要耐心等", "just缓和劝告，wait为原形，省略听话人you。", "Just wait; things may improve.", "再等等吧，情况可能会好转。", "just在此不是刚刚，祈使句不改成waits。"],
  ["turn-the-corner", "turn the corner", "turn the corner", "比喻习语", "渡过难关；开始好转", "用越过街角比喻处境迎来转机；原文是他人的鼓励，不是已实现的结果。", "The business is finally turning the corner.", "生意终于开始好转了。", "本句不能按真实路线译成拐弯，也不证明宁最终成功。"],
  ["give-something-time", "give somebody/something (some) time", "give it some time", "祈使句及双宾语结构", "给某人或某事一些时间", "it为间接宾语，指工作处境的发展；some time为直接宾语，劝耐心等待。", "Give the plan some time.", "给这个计划一些时间吧。", "time为不可数时长，不是times所表示的次数。"],
];

export const translation2010PhraseGuides: Record<string, PhraseKnowledge> = Object.fromEntries(seeds.map(([key, canonical, , type, meaning, rule, english, chinese, pitfall]) => [key, {
  key, canonical, type, meaning, summary: `${meaning}。${rule}`, grammarRole: rule,
  structures: [{ pattern: canonical, meaning, rule, examples: [{ english, chinese }] }], pitfalls: [pitfall],
}]));
export const translation2010PhraseAliases: Record<string, string> = Object.fromEntries(seeds.flatMap(([key, canonical, source]) => [source, canonical].map((text) => [text.toLowerCase(), key])));
export const translation2010CollocationGlosses = {
  ...translation2010CollocationNotes,
  ...Object.fromEntries(seeds.map(([, , source, , meaning, note]) => [source.toLowerCase(), { meaning, note }])),
};

const sentencePatterns: Record<string, Record<string, [string, string, string]>> = {
  "2010-translation-s1": {
    have: ["has become / will have personal meaning", "已经成为／将具有切身意义", "has是完成时助动词；have是实义动词"],
    to: ["to Ted Ning", "对特德·宁而言", "观点状语中的介词"],
    the: ["the concept", "这个概念", "回指可持续性的定冠词"],
  },
  "2010-translation-s2": {
    have: ["Having + past participle", "已经做过某事（动名词完成式）", "构成动名词完成式，整个短语作主语"],
    it: ["make it clear (to somebody) that + clause", "使某人清楚地认识到某事", "形式宾语，真正宾语为后置that从句"],
    that: ["make it clear that + clause", "使某个事实变得清楚", "引导后置的真正宾语从句"],
    be: ["must be expressed", "必须体现出来", "与过去分词一起构成被动式"],
    through: ["through everyday action and choice", "通过日常行动和选择", "方式或途径状语中的介词"],
    in: ["in his own life", "在他自己的生活中", "说明经历范围的介词"],
    to: ["clear to him", "对他来说清楚的", "引出感受者的介词"],
    of: ["a period of unsustainability", "一段生活难以为继的时期", "引出period后置限定的介词"],
  },
  "2010-translation-s3": {
    in: ["in the late 1990s", "在20世纪90年代末", "时间状语中的介词"],
    the: ["the late 1990s", "20世纪90年代末", "特定年代表达中的定冠词"],
  },
  "2010-translation-s4": {
    be: ["had been through something", "已经历过某事", "been为be的过去分词"],
    through: ["be through the boom and burst", "经历过繁荣与破裂", "引出经历对象的介词"],
    and: ["boom and burst / been through ... and signed on", "繁荣与破裂／经历过并签约", "分别并列名词和谓语部分"],
    the: ["the dot-com boom and burst", "互联网行业的那轮繁荣与破裂", "共同限定并列名词的冠词"],
    job: ["desperate for a job", "急需一份工作", "for的名词宾语"],
  },
  "2010-translation-s5": { it: ["It didn't go well", "这份工作进展不顺利", "回指工作情况的主语"] },
  "2010-translation-s6": {
    it: ["It was a really bad move", "这个决定实在很糟", "回指入职决定的主语"],
    be: ["was a really bad move", "是个很糟的决定", "系动词连接主语与名词表语"],
    job: ["dilemma about the job", "这份工作上的两难处境", "介词about的宾语中心词"],
    the: ["the job", "前述保险工作", "回指先前工作机会的冠词"],
    of: ["a lack of sales", "销售不足", "引出缺少对象的介词"],
  },
  "2010-translation-s7": { be: ["was miserable", "当时很痛苦", "过去时系动词，后接形容词表语"] },
  "2010-translation-s8": {
    have: ["had so much anxiety", "感到如此强烈的焦虑", "实义动词过去式，后接名词宾语"],
    that: ["so much anxiety that + clause", "如此焦虑以至于……", "与so呼应引导结果状语从句"],
    and: ["would wake up ... and stare", "过去常常醒来并凝视", "并列两个共用would的动词"],
    in: ["in the middle of the night", "在半夜", "时间状语中的介词"],
    of: ["the middle of the night", "夜晚的中间时段", "限定middle所属时间范围"],
    the: ["the middle of the night / the ceiling", "夜晚中段／那块天花板", "限定可辨认的时段或对象"],
  },
  "2010-translation-s9": {
    have: ["had no money", "没有钱", "实义动词过去式，不是完成式助动词"],
    and: ["had no money and needed the job", "没有钱又需要工作", "并列共用主语的两个谓语"],
    job: ["needed the job", "需要这份工作", "needed的名词宾语"],
    the: ["the job", "这份保险工作", "特指已提及工作的冠词"],
  },
  "2010-translation-s10": {
    it: ["give it some time", "给这份工作及处境的发展一些时间", "give的间接宾语，some time是直接宾语"],
    say: ["Everyone said, '...'", "大家都说……", "过去时报道动词，后接直接引语"],
    the: ["turn the corner", "迎来转机", "固定习语中的定冠词"],
  },
};

export function getTranslation2010WordKnowledge(headword: string, sentenceId?: string): WordKnowledge | undefined {
  const entry = translation2010Lexicon[headword];
  if (!entry) return undefined;
  const context = sentenceId ? translation2010SentenceContexts[sentenceId]?.[headword] : undefined;
  const syntax = sentenceId ? sentencePatterns[sentenceId]?.[headword] : undefined;
  const pattern = syntax?.[0] ?? entry.collocations[0];
  const meaning = syntax?.[1] ?? translation2010CollocationNotes[pattern.toLowerCase()].meaning;
  const rule = context?.use ?? entry.use;
  return {
    grammarRole: syntax?.[2] ?? `${entry.partOfSpeech} ${rule}`,
    grammarSummary: rule,
    structures: [{ pattern, meaning, rule }],
  };
}
