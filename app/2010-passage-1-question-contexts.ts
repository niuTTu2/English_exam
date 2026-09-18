import type { SentenceWordContext } from "./contextual-vocabulary";

const w = (partOfSpeech: string, contextualMeaning: string, use: string): SentenceWordContext => ({ partOfSpeech, contextualMeaning, use });

// 题干、选项分别保存语境；错误选项也按它实际说的意思释词，不用正确答案覆盖。
export const passage2010P1QuestionContexts: Record<string, Record<string, SentenceWordContext>> = {
  "question-201021-prompt": {
    sale: w("n.", "拍卖", "Damien Hirst's sale指第一段的赫斯特专场拍卖；不是商店降价促销。"),
    refer: w("v.（过去分词）", "称作；提及", "referred用在was referred to as中。refer to A as B表示把A称为B；改为被动后保留to和as，不能把to当不定式标记。"),
    as: w("prep.", "作为；称为", "as后接a last victory，补充这次拍卖被称作什么；不是引出‘当……时’的从句。"),
    last: w("adj.", "最后的", "last修饰victory，要求结合紧接着的危机背景解释‘最后’；不是动词‘持续’或表示前一次的‘上一个’。"),
    because: w("conj.", "因为", "because要求后面补出原因；选项应解释为什么成功被称为最后的胜利，不能只证明拍卖很成功。"),
  },
  "question-201021-option-A": {
    witness: w("v.（过去分词）", "经历；见证", "had witnessed是过去完成时，主语是the art market；不是名词‘证人’，也不是说市场真的有视觉。"),
    succession: w("n.", "接连；连续的一系列", "a succession of victories表示一连串胜利；of说明这一系列由什么组成。这里不是王位或职位的继承。"),
    victory: w("n.（复数）", "胜利", "victories把胜利说成多次事件，辅音字母加y结尾变为-ies；原文一轮长期牛市不等于已经证明一连串胜利。"),
  },
  "question-201021-option-B": {
    auctioneer: w("n.", "拍卖师", "auctioneer是执行got动作的主语；拍卖师、拍卖行和竞拍买家是不同对象。"),
    get: w("v.（过去式）", "得到；取得", "got是get的过去式，后接the two pieces；选项写的是拍卖师取得作品，不能自行把got改译成‘售出’。"),
    piece: w("n.（复数）", "件（作品）", "pieces指艺术作品，the two pieces特指那两件；这里不是两片碎片。"),
    highest: w("adj.（最高级）", "最高的", "highest是high的最高级，修饰bids；at the highest bids整体说明取得作品的出价，而不是修饰pieces的高度。"),
    bid: w("n.（复数）", "出价；竞价金额", "bids位于at the highest bids中，是名词；不是主句中的动词‘投标’。at引出价格。"),
  },
  "question-201021-option-C": {
    win: w("v.（过去式）", "赢；取胜", "won是win的过去式。选项试图说拍卖会胜过所有杰作；常见win over somebody则是说服某人、赢得支持，不能据此把杰作当成人。"),
    over: w("prep.", "超过（选项所设的比较关系）", "over后是all masterpieces，选项意图设定胜过全部杰作的比较。这种措辞生硬，也没有原文证据，不宜作为通用win over搭配的范例。"),
    masterpiece: w("n.（复数）", "杰作", "all masterpieces把比较对象扩大为所有杰作；原文没有以这些作品为参照来评价这场拍卖。"),
  },
  "question-201021-option-D": {
    make: w("v.（过去分词）", "完成；办成", "made处在was successfully made的被动结构中，it回指拍卖；这里不是make A different中‘使得’的使役义，也不是制造一件艺术品。"),
    successfully: w("adv.", "成功地", "successfully修饰was made，回应题干victory中的成功这一点；词性是副词，不是successful这个形容词。"),
    just: w("adv.", "恰好；就在", "just修饰before，把时间关系说得更接近；不是形容词‘公正的’，也不是在说仅仅一次。"),
    before: w("prep.", "在……之前", "before后接the world financial crisis这个名词短语；没有另起一个带主谓的时间从句，也没有给出具体相隔多久。"),
  },
  "question-201022-prompt": {
    by: w("prep.", "通过；借助", "By saying说明作者通过哪句话表达意思；by后接-ing形式saying，不是被动句中引出施事者。"),
    spend: w("n.（动词-ing形式名词化）", "花费；支出", "spending在引文中作主语，后接of any sort；不是正在进行时的谓语。引文评价花钱的行为。"),
    sort: w("n.", "种类", "of any sort修饰spending，表示不论哪类消费；sort不是‘整理分类’这个动词。"),
    become: w("linking v.（过去式）", "变得", "became把spending与unfashionable连接，构成主系表；unfashionable是状态，不是动作宾语。"),
    deeply: w("adv.", "极其；程度很深地", "deeply修饰unfashionable，强调不受推崇的程度；不是说明某个空间位置很深。"),
    unfashionable: w("adj.", "不合时尚的；不受推崇的", "unfashionable评价spending这种消费行为；并没有把艺术作品本身判成过时或不值得购买。"),
    suggest: w("v.（第三人称单数）", "暗示；表明", "the author suggests that接作者暗示的内容；这里不是‘建议某人做某事’，也不能机械套suggest doing。"),
  },
  "question-201022-option-A": {
    collector: w("n.（复数）", "收藏家", "collectors是were involved的主语，指参与艺术市场的收藏者；不是collect这个动词。"),
    involve: w("adj.（过去分词形容词化）", "参与的；有关联的", "involved处在be involved in中，表示参与拍卖的状态。no longer actively involved是‘不再积极参与’，不能只按及物动词‘涉及、包含’来解释这个状态结构。"),
    long: w("adv.（比较级）", "更久地（用于no longer）", "longer与no构成no longer，整体表示‘不再’；这里修饰参与状态，不是形容词‘更长的’，也不是long for中的‘渴望’。"),
    actively: w("adv.", "积极地；主动地", "actively修饰involved。no longer actively involved只说不再积极参与，不能扩大成从此绝无任何交易。"),
  },
  "question-201022-option-B": {
    stop: w("v.（过去式）", "停止", "stopped后接名词短语every kind of spending；这是停止某项行为，不是stop to do（停下原来的事去做另一件事）。"),
    spend: w("n.（动词-ing形式名词化）", "花费；消费", "spending在of后说明每一类支出，整个every kind of spending才是stopped的宾语；不是主句谓语。"),
    kind: w("n.", "种类", "every kind of spending指每一类消费；kind不是形容词‘善良的’。every令选项的范围非常绝对。"),
    stay: w("v.（过去式）", "保持（某种状态）；停留", "stayed与away from组合，表示持续远离、不参与；与stopped并列，共用主语people，不是‘停留在画廊里’。"),
    away: w("adv.", "远离；不在场", "away与stayed、from galleries共同表示远离画廊。from引出远离的场所；away不是新的谓语。"),
  },
  "question-201022-option-C": {
    collection: w("n.", "收藏活动", "art collection在这里是收藏艺术品这种活动，作had lost的主语；不是某一套藏品，也不是付款时的收款。"),
    fashion: w("n.", "时尚；风尚", "as a fashion把art collection当作一种时尚来评价；原文评价的spending与这个对象并不相同。"),
    lose: w("v.（过去分词）", "失去", "lost与had组成过去完成时，宾语是its appeal；不是形容词‘迷路的’，也不是lose momentum那一整个短语的翻译。"),
    appeal: w("n.", "吸引力", "appeal作had lost的宾语，its回指art collection；这里不是‘上诉’或‘呼吁’，lose its appeal整体表示失去吸引力。"),
    extent: w("n.", "程度", "to a great extent整体作程度状语，说明had lost its appeal达到多大程度；to是介词，不是接动词的不定式标记。"),
  },
  "question-201022-option-D": {
    work: w("n.（复数）", "作品", "works of art指艺术作品，整个名词组作had gone的主语；不是劳动，也不是第三人称单数动词‘运作’。"),
    general: w("adj.", "总体的；一般的", "general与in组成in general，整体表示‘总体上’；这里不是名词‘将军’。"),
    go: w("v.（过去分词）", "变得；进入某种状态", "gone与had组成过去完成时；go out of fashion整体表示变得过时。不能把gone单独释成整句的‘艺术品不值得买’。"),
    fashion: w("n.", "时尚；潮流", "out of fashion整体表示不再流行；选项把作品本身说成过时，而原文说的是消费不受推崇。"),
    worth: w("adj.", "值得的", "not worth buying作were后的表语。be worth doing表示值得做，-ing形式虽主动，作品在意义上是被购买的对象；不是worth加金额的‘价值多少’。"),
    buy: w("v.（-ing形式）", "购买", "buying接在worth后；买的人是泛指的买家，作品是被买的对象，不能误读成作品自己购买东西。"),
    so: w("conj.", "所以；因此", "so把‘作品过时’与‘不值得买’连接为因果，这是选项新加的判断；不是so…that中的程度副词。"),
  },
  "question-201023-prompt": {
    follow: w("adj.（分词形式）", "下列的", "following在the following statements中修饰statements；不是谓语‘跟随’。"),
    statement: w("n.（复数）", "陈述；说法", "statements指下面四个备选说法，of短语限定Which的选择范围；不是财务报表。"),
    true: w("adj.", "真实的；符合事实的", "NOT true作is后的表语；题目要求选择不符合原文的一项，不能漏掉NOT。"),
  },
  "question-201023-option-A": {
    sale: w("n.（复数）", "销售；销售额", "Sales作fell的主语，of contemporary art限定销售对象；这里不是第一段中的一场专场拍卖，也不是促销。"),
    contemporary: w("adj.", "当代的", "contemporary修饰art，限定所讨论的是当代艺术；该单词本身不包含‘艺术品’的意思。"),
    fall: w("v.（过去式）", "下降；下跌", "fell是fall的过去式，描述Sales变化；不是feel的过去式felt，dramatically说明降幅很大。"),
    dramatically: w("adv.", "大幅地；显著地", "dramatically修饰fell，强调销售下降的程度；不是讲演员戏剧化地表演。"),
  },
  "question-201023-option-B": {
    surpass: w("v.（过去式）", "超过；胜过", "surpassed直接接many other industries作宾语，in momentum限定比较方面；不再加than。"),
    industry: w("n.（复数）", "行业", "industries是被比较的其他行业；这里不是不可数名词‘勤奋’。"),
    momentum: w("n.", "发展势头；动力", "in momentum把超过其他行业的维度限定为发展势头；原文的关注度interest不能自动替换成momentum。"),
  },
  "question-201023-option-C": {
    generally: w("adv.", "总体上；大体上", "generally限定整项市场走低的判断，不要求每件作品、每项交易都毫无例外地下跌。"),
    go: w("v.（过去式）", "发展；呈现某种走势", "went是go的过去式，后接downward说明走低方向；不是前往某个地点，也不是go out of fashion。"),
    downward: w("adv.", "向下", "downward补充went的变化方向；在这里是副词，不是被影响的动作宾语。"),
    way: w("n.（复数）", "方面；表现形式", "in various ways指在多个方面呈现下滑，结合势头、规模、销量和价格理解；不是多条道路。"),
  },
  "question-201023-option-D": {
    dealer: w("n.（复数）", "经营者；交易商", "art dealers指经营艺术品买卖的人；Some限定部分人，不能扩大为全部市场参与者。"),
    await: w("v.（现在分词）", "等待", "awaiting与were组成过去进行时，直接接better chances作宾语；await something不加for，区别于wait for something。"),
    good: w("adj.（比较级）", "更好的", "better是good的比较级，修饰chances，说明更有利的机会；不是副词修饰awaiting，也不是动词‘改善’。"),
    chance: w("n.（复数）", "机会；时机", "chances是awaiting的宾语中心；这里不是‘偶然性’，to come说明这些机会将会到来。"),
    come: w("v.（不定式）", "到来；出现", "to come后置修饰better chances；来临的是机会，逻辑主语是chances，不是经营者来到某地。"),
  },
  "question-201024-prompt": {
    mention: w("v.（过去分词）", "提到；提及", "mentioned in the last paragraph后置修饰The three Ds；它不是主句谓语，真正承担时态的动词是are。"),
    last: w("adj.", "最后的", "last修饰paragraph，指文章最后一段；这里不是在说前一个段落，也不是动词‘持续’。"),
  },
  "question-201024-option-A": {
    house: w("n.（复数所有格中的名词）", "机构；营业机构", "houses与auction组成auction houses，整体是拍卖行；houses'是以s结尾的复数所有格，说明favorites是谁偏爱的。不是住宅。"),
    favorite: w("n.（复数）", "偏爱的事物", "favorites是名词短语中心，auction houses'说明是谁的偏好；不是放在其他名词前的形容词‘最喜爱的’。"),
  },
  "question-201024-option-B": {
    contemporary: w("adj.", "当代的", "contemporary作前置定语修饰trends；这里不是名词‘同时代的人’，也不单独等于‘当代艺术潮流’。"),
    trend: w("n.（复数）", "潮流；趋势", "trends是名词短语中心；整个选项填进are后才在题干中作表语，本身没有谓语或时态。"),
  },
  "question-201024-option-C": {
    factor: w("n.（复数）", "因素", "factors是选项中心名词，也是promoting的逻辑主语；后面的分词短语说明这些因素产生什么作用。"),
    promote: w("v.（现在分词）", "促进；推动", "promoting后接artwork circulation，修饰factors，表示这些因素促进流通；没有be，不能判为进行时，也不是‘晋升’或‘促销’。"),
    artwork: w("n.（作名词修饰语）", "艺术作品", "artwork放在circulation前，说明流通的对象；artwork circulation整体才是‘艺术品流通’，不能把‘流通’算进artwork的词义。"),
    circulation: w("n.", "流通", "circulation是promoting宾语中的中心词；这里指作品进入市场交易，不是报刊发行量或血液循环。"),
  },
  "question-201024-option-D": {
    style: w("n.（复数）", "风格", "styles是选项的名词中心，representing短语说明代表哪些人的风格；不是动词‘设计造型’。"),
    represent: w("v.（现在分词）", "代表；体现", "representing后接Impressionists作宾语，后置修饰styles；逻辑主语是styles，不是具有独立时态的主句谓语。"),
    impressionist: w("n.（复数）", "印象派画家", "Impressionists作representing的宾语，指人；不是Impressionism（印象主义）或impression（印象）。"),
  },
  "question-201025-prompt": {
    appropriate: w("adj.", "恰当的；合适的", "most appropriate构成最高级，修饰title；这里不是动词‘拨用、侵占’，需要选择最能覆盖全文的标题。"),
    title: w("n.", "标题", "title是题干主语中心，for this text限定它属于哪篇文章；不是头衔或所有权。"),
    can: w("modal v.（could形式）", "可能；可以", "could与be共同构成题干谓语，表示候选标题的可能性；这里不是叙述过去具有什么能力。"),
  },
  "question-201025-option-A": {
    fluctuation: w("n.", "波动；起伏", "Fluctuation是标题的中心名词，of Art Prices说明波动的对象；它是名词派生词，不是动词fluctuate的时态变化。"),
    price: w("n.（复数）", "价格", "Prices与Art组成Art Prices，表示艺术品价格；这里不是动词‘给……定价’。价格只是全文涉及的一个方面。"),
  },
  "question-201025-option-B": {
    "up-to": w("复合形容词片段", "up-to-date的前半部分", "这里的up-to与后面的date、连字符共同组成up-to-date，整体表示‘最新的’并修饰Art Auctions；不能独立译成‘多达’。"),
    date: w("n.（复合形容词组成部分）", "日期；当前时点", "date是up-to-date的组成部分，整体表示‘最新的、及时更新的’；这里不是约会，也不是动词‘确定年代’。"),
    auction: w("n.（复数）", "拍卖活动", "Auctions是标题名词中心，Art说明拍卖的是艺术作品；标题意图介绍最新艺术品拍卖，不等于全文的市场衰退主线。"),
  },
  "question-201025-option-C": {
    market: w("n.", "市场", "Market是标题中心，Art说明市场类别；不是动词‘推销’，in Decline说明市场的状态。"),
    decline: w("n.", "衰退；下降", "Decline在介词in后作名词；in Decline整体后置修饰Art Market，表示处于衰退中。这里不是动词‘婉拒’。"),
  },
  "question-201025-option-D": {
    shift: w("v.（过去分词作定语）", "转移；改变", "Shifted前置修饰Interest，表示兴趣已发生转移；不是这个标题的限定谓语，也不是名词‘轮班’。标题没有说明转向哪里。"),
    interest: w("n.", "兴趣", "Interest是标题中心，in Arts说明兴趣所涉及的领域；不是利息或利益，也不能把它直接改译成成交量下降。"),
    art: w("n.（复数）", "艺术（各门类）", "Arts处在Interest in Arts中，表示产生兴趣的领域；不是具体几件works of art，也不是动词。"),
  },
};
