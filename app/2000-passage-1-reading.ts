import type { SentenceReadingGuide } from "./data";

export const passage2000P1Reading: Record<string, SentenceReadingGuide> = {
  "p1-s1": {
    focus: "不是说成功一定有害或一定有益：转成动力须保留if给出的处理条件。",
    questions: [
      { question: "两个判断为什么都不能译成肯定结论？", evidence: "can be a dreadful handicap, but, if properly handled, it may become a driving force", answer: "can和may都保留可能性；but转向另一种结果，而if properly handled是转成动力的条件。删掉条件，就会把有条件的判断误读成长久成功自然带来新成功。" },
      { question: "handled为什么没有自己的主语和be？", evidence: "if properly handled", answer: "这是省略的条件从句，可帮助理解为if it is properly handled；it承接成功经历。省略内容只用于讲解，不补回原文；properly修饰handled，说明处理方式。" },
    ],
  },
  "p1-s2": {
    focus: "主干是it had a market；比较的是市场规模，giving解释这一优势带来的结果。",
    questions: [
      { question: "时间从句到哪里结束？", evidence: "When the United States entered just such a glowing period after the end of the Second World War", answer: "从When一直到War：内部主语the United States、谓语entered、宾语period；after短语限定进入这个时期的时间。逗号后的it had才是外层主句。" },
      { question: "larger比较美国的现在与过去吗？", evidence: "a market eight times larger than any competitor", answer: "不是。larger后置说明market的规模，than引出其他竞争者，按语义比较的是各自的市场；没有把美国战前市场设为比较基准。" },
      { question: "giving能接到最近的competitor上吗？", evidence: "giving its industries unparalleled economies of scale", answer: "不能。它补充前面巨大市场带来的结果：its industries是得到好处的对象，economies of scale是带来的好处；不是竞争对手给美国提供优势，也不是另一个有独立时态的谓语。" },
    ],
  },
  "p1-s3": {
    focus: "分号后省略了重复的were，workers仍与most skilled构成主系表关系。",
    questions: [
      { question: "后半句没有动词，为什么仍读得通？", evidence: "its workers the most skilled", answer: "它与前半句scientists were the world's best平行，省去重复的系动词were。the most skilled描述工人的技能，不是workers的宾语；理解时补出关系，原文与主干不补造英文。" },
    ],
  },
  "p1-s4": {
    focus: "whose economies被提前的是宾语；摧毁经济的主语是the war。",
    questions: [
      { question: "whose在从句里独自作主语吗？", evidence: "whose economies the war had destroyed", answer: "不是。whose限定economies，整个whose economies是destroyed的前置宾语；the war才是主语。所属关系回到Europeans and Asians，不能理解成欧亚人民摧毁战争。" },
      { question: "beyond说明富裕发生在哪里吗？", evidence: "prosperous beyond the dreams of the Europeans and Asians", answer: "它说明繁荣达到什么程度：超出欧亚人民想象。这里是程度，不是物理地点；其内部of短语说明谁的想象，后面的whose从句再限定这些人。" },
    ],
  },
  "p1-s5": {
    focus: "It先占主语位置，真正被评价为不可避免的是美国优势随别国富裕而缩小。",
    questions: [
      { question: "It指美国，还是先占位置？", evidence: "It was inevitable that this primacy should have narrowed as other countries grew richer", answer: "It是形式主语；that后整件事才是真正主语。as从句位于这一内容内部，修饰narrowed，说明优势缩小时别国同步变富的进程。" },
      { question: "grew richer为什么不叫动词加宾语？", evidence: "as other countries grew richer", answer: "grow在此是系动词‘变得’，richer是形容词比较级表语。其他国家变富后，美国相对领先幅度缩小；不是说美国经济必然绝对缩水。" },
    ],
  },
  "p1-s6": {
    focus: "proved接painful说明结果的性质，from predominance限定退却的是哪种地位。",
    questions: [
      { question: "proved是不是证明了painful这个东西？", evidence: "the retreat from predominance proved painful", answer: "不是。proved作系动词，painful是表语，说明从主导地位退下来的过程令人痛苦。from predominance接retreat，并非证明动作的来源。" },
    ],
  },
  "p1-s7": {
    focus: "Americans不是找到别人：themselves与at a loss一起说明他们发现自己处于何种状态。",
    questions: [
      { question: "at a loss在find后起什么作用？", evidence: "Americans had found themselves at a loss over their fading industrial competitiveness", answer: "themselves是found的宾语并与Americans同指，at a loss是宾补‘不知所措’。over短语说明令他们茫然的问题，不是说这些人发生了财务亏损。" },
      { question: "By给的是什么时间边界？", evidence: "By the mid-1980s", answer: "它为had found提供过去截止点：到20世纪80年代中期，他们已经处于这种认识或感受之中。原文没有说这一状态从何日开始，也没有说到此立刻结束。" },
    ],
  },
  "p1-s8": {
    focus: "两个过去分词共用had；consumer electronics只是产业例子，不是新主语。",
    questions: [
      { question: "shrunk与vanished属于两套时态吗？", evidence: "had shrunk or vanished", answer: "它们由or连接并共用had，均为过去完成时的谓语部分。shrunk是shrink的过去分词；or保留‘萎缩或消失’两种结果，不把所有产业说成全部消失。" },
      { question: "foreign competition与哪些变化关联？", evidence: "in the face of foreign competition", answer: "这组短语修饰had shrunk or vanished，交代受到外国竞争压力时的变化；前面的such as则只举consumer electronics作为industries的实例。" },
    ],
  },
  "p1-s9": {
    focus: "there引出存在，真正剩下的是one maker；Zenith给这唯一厂商补名字。",
    questions: [
      { question: "left表示去世或向左吗？", evidence: "only one American television maker left, Zenith", answer: "这里left是后置过去分词‘剩下的’，修饰maker。only限定只剩一家，Zenith与这家maker同指，不是第二家。By 1987只给当时的截止点。" },
    ],
  },
  "p1-s10": {
    focus: "冒号用收购解释none：没有的是美国电视制造商，不能译成世界上已没有电视。",
    questions: [
      { question: "none省掉了什么，by后是谁？", evidence: "there is none: Zenith was bought by South Korea's LG Electronics", answer: "none承接前句的American television maker。Zenith是被收购者，was bought为被动谓语，by引出收购者LG Electronics。不要把卖方买方倒置。" },
      { question: "Now和in July能直接写成今天与某个确定年份吗？", evidence: "Now there is none: Zenith was bought by South Korea's LG Electronics in July", answer: "Now是作者写作当时，in July只写7月，句中没有年份。可联系文章观察时点理解先后，但不能按今天的日期更新旧文，也不擅自给这次收购补出精确年份。" },
    ],
  },
  "p1-s11": {
    focus: "sweeping into把外国商品写成大量涌入；市场仍是美国的国内市场。",
    questions: [
      { question: "谁进入谁的市场？", evidence: "Foreign-made cars and textiles were sweeping into the domestic market", answer: "主语是外国制造的汽车和纺织品，were sweeping是过去进行时，into指出进入美国国内市场的方向。不能反过来说美国汽车出口，也没有说本土市场全部消失。" },
    ],
  },
  "p1-s12": {
    focus: "on the ropes是危险处境的比喻，不能加强成行业已经彻底倒闭。",
    questions: [
      { question: "was后面的短语说明位置还是处境？", evidence: "was on the ropes", answer: "字面来自拳击选手被逼到围绳，文中用作表语说明机床行业岌岌可危。它没有叙述行业已经崩溃，更没有给出‘自杀式行为’这一原因。" },
    ],
  },
  "p1-s13": {
    focus: "先读当时看起来会受害的是半导体制造业，再分别接回两个which说明半导体。",
    questions: [
      { question: "两个which都作主语吗？", evidence: "which America had invented and which sat at the heart of the new computer age", answer: "第一项内部主语是America，which代semiconductors作invented的宾语；第二项which直接作sat的主语。and连接两个定语从句，不能合成一个含两个相同主语的结构。" },
      { question: "哪个名词控制was going to be？", evidence: "the making of semiconductors", answer: "中心是名词化的making，指制造业，因此后面用单数was。跳过插入的两个which后，接the next casualty这一表语；不是说computer age成为受害者。" },
      { question: "一度看起来要受害等于已被外资接管吗？", evidence: "For a while it looked as though", answer: "不等于。For a while限定当时一段时间的观感，looked as though和was going to be保留当时的预测。原句没有声称预测已发生，也没写外国企业接管。" },
    ],
  },
  "p1-s14": {
    focus: "All of this把上段产业受挫概括成一个原因，结果是信心危机。",
    questions: [
      { question: "this只指最后一个半导体预测吗？", evidence: "All of this caused a crisis of confidence", answer: "All把前面竞争力减弱、产业萎缩、进口冲击等情况合起来，不只回指最后一件事。a crisis是caused的宾语，of confidence说明何种危机。" },
    ],
  },
  "p1-s15": {
    focus: "stop doing是停止原来那种看法；taking prosperity for granted要整体理解。",
    questions: [
      { question: "美国人停止的是繁荣本身吗？", evidence: "stopped taking prosperity for granted", answer: "不是。停止的是‘把繁荣视为理所当然’这一态度。stopped后接-ing内容；taking的宾语是prosperity，for granted说明把它看作不必怀疑的事。" },
    ],
  },
  "p1-s16": {
    focus: "believe后有两个并列that内容，经营方式出问题与收入将下降都属于他们当时的判断。",
    questions: [
      { question: "第二个that从句是否改由别的动词支配？", evidence: "that their way of doing business was failing, and that their incomes would therefore shortly begin to fall as well", answer: "两项都接believe，and连接的是两项相信的内容。第一项was failing，第二项would begin to fall；不能把第二项直接升级成作者确认收入已经下降。" },
      { question: "doing、therefore、shortly分别放回哪层？", evidence: "their way of doing business", answer: "of doing business修饰way，business是doing的宾语。第二项中therefore连接原因与推测结果，shortly限定begin to fall的时间，as well表示也会下降；这些都不改变第二项仍为当时预测。" },
    ],
  },
  "p1-s17": {
    focus: "年代作拟人化主语，brought带来的宾语是接连出现的调查。",
    questions: [
      { question: "one inquiry after another和into各说明什么？", evidence: "one inquiry after another into the causes of America's industrial decline", answer: "one inquiry after another表示一项接一项的调查，整组作brought的宾语。into说明调查对象是工业衰退原因，不是进入某个物理空间；America's修饰industrial decline。" },
    ],
  },
  "p1-s18": {
    focus: "Their回指调查；sometimes修饰结论的耸动程度，不能误放到调查频率上。",
    questions: [
      { question: "findings的两个修饰方向是什么？", evidence: "Their sometimes sensational findings", answer: "Their指前句的inquiries，说明是谁的结论；sometimes修饰sensational，表示这些结论有时颇为耸动，而不是说只有有时才有结论。" },
      { question: "两层介词短语怎样往回接？", evidence: "warnings about the growing competition from overseas", answer: "about引出warnings所警告的内容，from overseas再限定competition来自何处。growing说明竞争加剧，不是警告在海外生长。" },
    ],
  },
  "p1-s19": {
    focus: "How开头的是感叹，不是在提问事情怎样改变。",
    questions: [
      { question: "How后为什么不是疑问倒装？", evidence: "How things have changed", answer: "主语things仍在have changed前，句末感叹号表变化很大。它从前段衰退与疑虑转向下段复苏与自负，没有要求读者回答一个how问题。" },
    ],
  },
  "p1-s20": {
    focus: "1995年是回顾时点；five years限定美国增长时长，while另起日本处境的对照。",
    questions: [
      { question: "五年修饰look back的动作持续多久吗？", evidence: "can look back on five years of solid growth", answer: "不是。five years of solid growth是on所接的回顾内容，表示五年的稳健增长，不是一直回头看了五年。时间参照来自句首In 1995。" },
      { question: "while一定要译成当……时吗？", evidence: "while Japan has been struggling", answer: "这里突出美国增长与日本艰难的对照。has been struggling是现在完成进行时，表示在文中观察时点仍持续的困境，不保证其下一刻结束。" },
    ],
  },
  "p1-s21": {
    focus: "Few是否定倾向，solely只限制单一归因；列出的客观因素不因此被作者否定。",
    questions: [
      { question: "few和solely叠在一起说的是什么？", evidence: "Few Americans attribute this solely to such obvious causes", answer: "很少有美国人把这次增长仅仅归于这些原因，并非他们完全不承认这些因素。this回指复苏，solely修饰归因的排他程度；原文仍称这些原因obvious。" },
      { question: "such…as在这里给了什么？", evidence: "such obvious causes as a devalued dollar or the turning of the business cycle", answer: "as后给出两个obvious causes的实例：美元贬值、经济周期转向。它不是包含主谓的as从句，or连接的是两个名词性原因。" },
    ],
  },
  "p1-s22": {
    focus: "yielded to说明旧态度被新态度取代，blind让pride带上作者的批评色彩。",
    questions: [
      { question: "被取代的是谁，作者是否赞扬这种pride？", evidence: "Self-doubt has yielded to blind pride", answer: "Self-doubt退去，blind pride占上风；不能反过来。blind是盲目的，说明作者与这种自负保持距离，为下一组受访者赞美的观点划定边界。" },
    ],
  },
  "p1-s23": {
    focus: "三个has结构并列描述产业变化；according to给出的是Cavanaugh的看法。",
    questions: [
      { question: "三个has后面的结构是否相同？", evidence: "has changed its structure, has gone on a diet, has learnt to be more quick-witted", answer: "都为现在完成时，但内部不同：changed带宾语structure，gone on a diet用比喻讲精简，learnt后接to be结构；quick-witted是be后的表语。不能把三段全当作一个及物动词带三个宾语。" },
      { question: "后面的人名和职位分别管什么？", evidence: "according to Richard Cavanaugh, executive dean of Harvard's Kennedy School of Government", answer: "according to标明引语观点来自Richard Cavanaugh；executive dean及其后所属机构是同位身份说明，不是第二个发言者。作者引用不等于作者无保留赞同。" },
    ],
  },
  "p1-s24": {
    focus: "真正令人自豪的是看到企业提高生产率；to be an American补足proud，不能和to see混成同一功能。",
    questions: [
      { question: "两个to不定式各说明什么？", evidence: "It makes me proud to be an American just to see how our businesses are improving their productivity", answer: "It先占主语位置，后置to see…说明使人自豪的事情；me是makes的宾语，proud是宾补。to be an American接proud，说明身为美国人的自豪，不是makes的第二个宾语。" },
      { question: "how中的主语和宾语怎样分？", evidence: "how our businesses are improving their productivity", answer: "how引出see的宾语从句，our businesses是主语，are improving是谓语，their productivity是宾语。our/their都在Moore的引语立场中理解，不能换成作者亲自作出的保证。" },
      { question: "says之后的倒装和同位说明怎样还原关系？", evidence: "says Stephen Moore of the Cato Institute, a think-tank in Washington, DC", answer: "报道语为says在前、说话者Stephen Moore在后；of the Cato Institute说明任职机构。a think-tank解释Institute，不是说Moore这个人是一所智库。" },
    ],
  },
  "p1-s25": {
    focus: "未来的黄金时代评价仍受believes统领，是Sahlman的预期而非作者认证。",
    questions: [
      { question: "will表示作者已经证实这个称号吗？", evidence: "believes that people will look back on this period as", answer: "不表示。believes先限定为Sahlman的判断；people是that从句主语，will look back讲未来回顾，this period指当前复苏阶段。as后说明回顾时赋予它什么评价。" },
      { question: "两个of分别接在哪里？", evidence: "a golden age of business management in the United States", answer: "这里of business management修饰age，说明哪个领域的黄金时代；句首的of the Harvard Business School则修饰William Sahlman，说明其所属机构。它们不能合成美国大学教育导致复苏的证据。" },
    ],
  },
};
