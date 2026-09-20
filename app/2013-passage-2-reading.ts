import type { ArticleGuide } from "./article-teaching";
import type { SentenceAnalysis } from "./data";
import { createV2Sentence, type QuickReading } from "./article-v2/model";
import { reviewedBlocks } from "./2013-reading-helpers";
import { passage2013P2Texts as texts, passage2013P2ParagraphNumbers } from "./2013-passage-2-source";
import { passage2013P2Deep } from "./2013-passage-2-structure";
const quick: Array<[string, string, string, string[], QuickReading["keyReasons"], string[]]> = [
  ["一个世纪以前，从大西洋彼岸来的移民中，既有定居者，也有暂居者。", "included 后是两类人，settlers 与 sojourners 的区别在是否长期留下。", "先介绍历史上移民去留的多样性。", ["the immigrants", "included"], [], []],
  ["许多人来美国寻找永久的家，也有人一同到来，却无意长住，只想赚些钱就回家。", "came 后的 those 才是到来的人；句首 Along with 引出与他们同行的定居者。两个 who 都说明 those。", "通过定居与暂住的对照解释候鸟式移民。", ["came those", "who had", "and who would"], ["answer-evidence", "misreading", "nested-clause"], ["Along with", "had no intention to stay"]],
  ["1908至1915年间，约有七百万人到来，同时约有两百万人离开。", "while 对照流入和流出，不是说每个到来的人都会离开。", "用历史数字证明移民流动并非单向。", ["about 7 million", "while"], [], []],
  ["例如，所有意大利移民中约有四分之一最终回到意大利，永久定居下来。", "for good 是永久，不是为了好处；永久回国恰好说明此前在美国是暂住。", "进一步举例说明回流现象。", ["eventually returned"], ["reference-or-scope", "answer-evidence"], ["for good"]],
  ["他们甚至有一个亲切的绰号：uccelli di passaggio，也就是迁徙的候鸟。", "意大利语和 birds of passage 是同一个绰号；比喻会往返流动的人。", "引出贯穿全文的候鸟比喻。", ["an affectionate nickname"], [], ["birds of passage"]],
  ["今天，我们看待移民的方式僵化得多了。", "more rigid 对比的是上一段相对多样的去留情况。", "由历史转向今天的僵化观念。", ["we are"], ["paragraph-turn"], []],
  ["我们把新来者分成两类：合法或非法，好人或坏人。", "冒号展开两分法，把法律身份又等同于好坏判断。", "明确作者要批评的非黑即白框架。", ["into two categories"], ["main-line"], ["divide newcomers into two categories"]],
  ["我们要么称赞他们是未来的美国人，要么给他们贴上应被驱逐的外国人的标签。", "hail 和 brand 都是我们如何评价他们；in the making 表尚在形成，to be kicked out 表被驱逐。", "把二分框架具体化为接纳或排斥。", ["or brand"], ["misreading", "main-line"], ["in the making", "kicked out"]],
  ["这种思维框架极大地造成了移民制度的失灵，以及围绕如何修复它而长期存在的政治僵局。", "That framework 指刚才的二分法；contributed to 后并列制度问题和政治僵局，it 指制度。", "解释僵化观念带来的制度后果。", ["has contributed mightily", "and the long political paralysis"], ["answer-evidence", "reference-or-scope"], []],
  ["我们需要的不是更多分类，而是改变思考这些分类的方式。", "not...but...对照增加分类和改变思维方式，不能把作者主张倒过来。", "直接纠正以增加类别解决问题的想法。", ["but we need"], ["answer-evidence", "reference-or-scope"], []],
  ["我们需要超越合法与非法的严格定义来看待问题。", "look beyond 是不要只局限于此，不是要求完全取消法律。", "给出改变思考方式的方向。", ["to look beyond"], ["main-line"], ["look beyond"]],
  ["首先，我们可以承认新的候鸟式移民，也就是在灰色地带生活并发展的人。", "those 是对 birds of passage 的补充说明；gray areas 指无法简单二分的处境。", "提出先认识并接纳流动移民的现实。", ["we can recognize", "those living"], ["attachment"], ["birds of passage", "gray areas"]],
  ["这样，我们或许才能开始解决移民方面的挑战。", "might 和 begin 都有限定：是可能开始解决，并未说制度已经修好。", "说明改变观念有助于应对挑战。", [], ["answer-evidence"], []],
  ["今天的候鸟式移民包括农作物采摘工、小提琴手、建筑工人、企业家、工程师、居家护理员和物理学家。", "长清单是主语，are among 才是主干关系；职业跨越多种技能层次。", "用多样职业打破单一移民印象。", ["are among"], [], []],
  ["他们积极参与全球经济，而工作、资金和思想的流动推动着这种经济。", "driven by 跟着 economy，说明全球经济由什么推动；不是说参与者开车。", "解释流动移民与全球经济的联系。", ["in a global economy", "driven by"], ["attachment"], []],
  ["他们更愿意随着机会的召唤自由来去。", "as 说明随机会变化而行动；come and go 同时包括进入和离开。", "直接说明这些人的核心愿望。", ["as opportunity"], ["answer-evidence"], ["come and go"]],
  ["他们能够做到工作在一地、家庭在另一地。", "a family in another 与 a job in one place 并列，第二处省去 place。", "说明跨地生活可以成为常态。", ["and a family"], [], []],
  ["无论是否获得许可，他们都能自如地跨越法律、司法管辖区和身份边界。", "with ease 说跨越得自如，不等于作者宣布这些行为都已合法。", "交代流动现实与现行制度边界的不一致。", ["they straddle", "with ease."], ["reference-or-scope"], ["With or without", "with ease"]],
  ["我们需要让他们把美国想成这样一个地方：可以暂时在此发挥生产作用，而不必承诺永远留下。", "where 从句说明 place；without 后否定的是永远留下的承诺，不否定暂时作贡献。", "主张允许暂时参与，不把永久定居作为条件。", ["to imagine", "where they can", "without committing"], ["answer-evidence", "nested-clause"], ["for a while", "committing themselves to staying"]],
  ["我们需要让他们感到，家可以同时在这里和那里，他们也可以光明正大地归属于两个国家。", "两个 that 都跟着 feel；both here and there 接纳双重归属，不要求二选一。", "继续提出宽容双重归属的态度。", ["that home", "and that they"], ["answer-evidence", "reference-or-scope"], ["belong to"]],
  ["要适应这个人员流动的新世界，移民争论的双方都需要改变态度。", "Accommodating 整组作主语；both sides 指争论双方，作者不只要求移民改变。", "总结争论双方都需要调整观念。", ["will require", "on both sides"], ["main-line"], ["in motion"]],
  ["超越文化冲突中非对即错的逻辑，意味着开辟中间地带，并理解当今移民管理需要多种途径和多种结果，其中有些在现行制度下并不容易合法实现。", "主干是 Looking beyond...means...；opening 和 understanding 并列。some 指前面的途径或结果，并非宣布违法都合理。", "以多样途径和制度包容性收束全文。", ["means opening", "and understanding", "that managing", "including some", "that are not"], ["answer-evidence", "nested-clause", "main-line"], ["opening up", "middle ground"]],
];
export const passage2013P2Sentences: SentenceAnalysis[] = texts.map((text,i)=>{ const [natural,obstacle,logic,starts,keyReasons,phrases]=quick[i]; return createV2Sentence({id:`2013-p2-s${i+1}`,number:i+1,text,natural,logic,phrases,quickReading:{blocks:reviewedBlocks(text,starts),obstacle,keyReasons},...passage2013P2Deep[i+1]}); });
export const passage2013P2Paragraphs=passage2013P2ParagraphNumbers.map((ns,i)=>({id:`2013-p2-para${i+1}`,sentenceIds:ns.map(n=>`2013-p2-s${n}`)}));
export const passage2013P2Guide:ArticleGuide={
 mainIdea:"移民不应只按合法/非法、好/坏僵硬二分；应承认候鸟式往返流动，调整观念和制度以容纳多种路径。",
 route:["历史：定居与暂住并存","问题：当代僵化二分法","现实：职业多样、随机会往返","态度：容纳暂住与双重归属","结论：多种路径和结果"],
 paragraphs:[
  ["历史上的候鸟","移民既可定居，也可赚钱后回国。","以历史多样性反衬当代僵化。"],
  ["二分框架的代价","合法/非法被简单对应好坏，阻碍制度调整。","指出问题并提出改变观念。"],
  ["当代流动现实","各类职业随全球机会来去，工作家庭可以分处两地。","用事实说明旧框架不足。"],
  ["应有的包容","允许暂时参与和双重归属。","把认识现实推进为态度建议。"],
  ["制度与观念调整","双方需要理解多路径、多结果，而非非对即错。","总结全文并指向制度适应。"],
 ].map(([title,summary,relation],i)=>({paragraphId:passage2013P2Paragraphs[i].id,title,summary,relation})),
 sentenceRoles:Object.fromEntries(passage2013P2Sentences.map(s=>[s.id,s.logic])),
 references:[
  {sentenceId:"2013-p2-s9",expression:"That framework",referent:"合法/非法、好/坏的二分框架",targetSentenceIds:["2013-p2-s7","2013-p2-s8"],explanation:"That 回指前两句的分类和评价方式，不是作者提出的新方案。"},
  {sentenceId:"2013-p2-s12",expression:"those",referent:"新的候鸟式移民",targetSentenceIds:["2013-p2-s12"],explanation:"逗号后同位说明他们是在灰色地带生活和发展的人。"},
  {sentenceId:"2013-p2-s20",expression:"here and there",referent:"美国和移民的另一祖国",targetSentenceIds:["2013-p2-s19","2013-p2-s20"],explanation:"与 two nations 呼应，强调双重归属，不是无家可归。"},
 ],timeline:[],voices:[],
};
