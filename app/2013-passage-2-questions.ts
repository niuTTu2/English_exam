import type { QuestionReasoning } from "./article-teaching";
import { reviewedReadingQuestion as make } from "./2013-reading-helpers";
import { passage2013P2RawQuestions as raw } from "./2013-passage-2-source";
const e=(id:string,n:number,quote:string,role:string):QuestionReasoning["evidence"][number]=>({id:`2013-p2-${id}`,sentenceId:`2013-p2-s${n}`,quote,role,strength:"直接证据"});
export const passage2013P2Questions=[
 make("2013-p2",raw[0],{answer:"A",sentence:2,type:"词语指代",scope:"paragraph",instruction:"先用第一段的定居/暂居对照解释比喻，再用赚钱回家验证暂时停留；不要只看跨大西洋这一共同背景。",
 evidence:[e("q26-return",2,"who had no intention to stay, and who would make some money and then go home","无意永久定居，赚钱后返回。"),e("q26-name",5,'"uccelli di passaggio," birds of passage',"该绰号指前述往返者。"),e("q26-good",4,"returned to Italy for good","永久的是回到意大利后的定居，不是离开祖国。")],minimal:["2013-p2-q26-return"],paraphrase:"no intention to stay + make money and then go home → 暂时在国外停留 → stay in a foreign country temporarily",limit:"定义在停留方式，不由出发地、职业或每次停留的确切时长决定。",right:"A抓住先暂住赚钱、随后回国的共同特点。",
 wrong:[
 ["B","与原文相反","B说永久离开祖国；原文说的是最后永久回到意大利，方向相反。",["for good在第一段修饰回国，还是离开祖国？",["回国","离开祖国"],"回国","returned to Italy for good","returned明确动作方向，不能只看到for good就选。"]],
 ["C","范围扩大","C把全部跨大西洋移民都算作候鸟；其中也有永久定居的settlers。",["第一段跨大西洋移民只有暂居者吗？",["还有定居者","只有暂居者"],"还有定居者","settlers and sojourners","跨洋是共同背景，暂居并回流才是候鸟的区分点。"]],
 ["D","无中生有","D增加了永久工作这一条件；原文强调无意长住，没说必须找到永久职位。",["这些人的计划是赚些钱回家，还是必须取得永久职位？",["赚些钱回家","永久职位"],"赚些钱回家","make some money and then go home","不要把工作机会偷换为永久工作。"]],
 ],confirm:["候鸟比喻主要强调哪种停留方式？",["暂住往返","永久定居"],"暂住往返","had no intention to stay","暂时在外国生活，与随后回家相连。"],paths:[[2,5],[2,4]],language:[
 ["“候鸟”指的是哪些人？","refers to问比喻对象，要找区别于普通移民的特点。"],
 ["暂时住在外国","temporarily限定stay，是本题核心。"],["永久离开自己的祖国","for good表示永久，leave与原文returned方向相反。",["for good"]],["跨越大西洋移民","只说明迁移路线，未区分定居和暂居。"],["在海外找到长期职位","permanent修饰jobs，不等于暂时工作。"],
 ]}),
 make("2013-p2",raw[1],{answer:"C",sentence:10,type:"段落推断",scope:"paragraph",instruction:"将broken/paralysis的问题、change the way的建议和solve challenges的目标相连，判断制度应调整而非已经修好。",
 evidence:[e("q27-broken",9,"our broken immigration system and the long political paralysis over how to fix it","制度失灵且政治上陷于僵局。"),e("q27-change",10,"we need to change the way we think about categories","作者要求改变分类思维。"),e("q27-goal",13,"We might then begin to solve our immigration challenges.","改变观念后才可能开始解决挑战。")],minimal:["2013-p2-q27-broken","2013-p2-q27-change","2013-p2-q27-goal"],paraphrase:"broken system + change our thinking + solve challenges → 现行制度应调整以应对挑战 → should be adapted to meet challenges",limit:"这是规范性建议，不是宣布制度已经修好，也不等于简单增加移民类别。",right:"C概括问题与建议的关系：调整制度以适应流动现实。",
 wrong:[
 ["A","与原文相反","A要求新分类；作者明确说don't need more categories，重点是改变思维。",["作者要求增加类别吗？",["不要求","要求"],"不要求","We don't need more categories","否定范围正好落在more categories。"]],
 ["B","无中生有","B说已经放松管控；原文批评much more rigid，并没有报告放松措施。",["第二段形容当前态度为哪一种？",["更僵化","已放松"],"更僵化","much more rigid","rigid是僵硬严格，不是loosened。"]],
 ["D","时间错位","D说已经经由政治手段修复；原文仍是broken和political paralysis，解决还只是一种可能。",["might then begin表达已完成还是未来可能开始？",["未来可能开始","已经完成"],"未来可能开始","might then begin to solve","might和begin都不支持has been fixed。"]],
 ],confirm:["C的should be adapted属于哪一种？",["针对问题的改进建议","已经完成的改革报道"],"针对问题的改进建议","we need to change","need说明需要改变，而非改变已经完成。"],paths:[[9,10,13]],language:[
 ["第二段暗示美国现行移民制度怎样？","implied要求综合段落，current限定现行制度。"],["需要新的移民类别","与don't need more categories直接冲突。"],["已放松对移民的控制","has loosened表示已经发生的变化，原文没有此事实。"],["应作调整以应对挑战","be adapted是被调整，to meet说明目的。"],["已通过政治手段得到修复","has been fixed是完成时被动；via表示通过。"],
 ]}),
 make("2013-p2",raw[2],{answer:"C",sentence:16,type:"细节理解",scope:"adjacent-sentences",instruction:"定位第三段prefer，保留come和go两个方向；工作与家庭分处两地是这种往返生活的补充。",
 evidence:[e("q28-want",16,"They prefer to come and go as opportunity calls them.","直接表达随机会来去的偏好。"),e("q28-family",17,"a job in one place and a family in another","工作家庭可以在不同地方，支持流动生活。")],minimal:["2013-p2-q28-want"],paraphrase:"prefer to come and go → 希望自由决定去留 → the freedom to stay and leave",limit:"原文随机会流动，不主张免除所有法律义务，也没要求财政优惠。",right:"C保留他们的核心偏好：可停留，也可离开。",
 wrong:[
 ["A","无中生有","A把经济机会改成财政激励或金钱优惠；文中没说他们要求资助。",["opportunity calls them说明追随机会，还是政府必须给钱？",["追随机会","政府必须给钱"],"追随机会","as opportunity calls them","机会不等于financial incentives。"]],
 ["B","偷换对象","B把参与全球经济改成寻求全球认可；global在原文修饰economy。",["原文global修饰什么？",["economy","recognition"],"economy","a global economy","经济参与和获得全球认可不是同一目标。"]],
 ["D","范围过窄","D将随机会自由往返缩成取得固定工作的机会；原文没有regular这一限定。",["prefer后同时包含哪两个方向？",["come and go","只留下工作"],"come and go","prefer to come and go","只抓job会漏掉自由离开的核心特点。"]],
 ],confirm:["come and go与stay and leave是否都保留去留两面？",["是","否"],"是","come and go","措辞变化，往返选择这个命题保留。"],paths:[[16],[16,17]],language:[
 ["作者认为当今候鸟式移民想要什么？","want定位表达愿望的prefer。"],["经济激励","financial incentives指金钱方面的鼓励措施。"],["全球认可","recognition是认可，不能被global economy替代。"],["停留和离开的自由","to stay and leave共同限定freedom。"],["获得固定工作的机会","regular限定jobs，正文没有这个条件。"],
 ]}),
 make("2013-p2",raw[3],{answer:"B",sentence:22,type:"作者建议",scope:"whole-passage",instruction:"联读第四段的暂住/双重归属和末段多种路径。legal tolerance是制度包容，不是纵容一切违法。",
 evidence:[e("q29-stay",19,"without committing themselves to staying forever","不把永久定居承诺设为参与条件。"),e("q29-two",20,"they can belong to two nations honorably","接纳双重归属。"),e("q29-paths",22,"requires multiple paths and multiple outcomes, including some that are not easy to accomplish legally in the existing system","现有制度应更能容纳多种路径。")],minimal:["2013-p2-q29-two","2013-p2-q29-paths"],paraphrase:"接纳双重归属 + 扩展现有制度难以容纳的路径 → 对流动移民采取法律制度上的包容态度 → with legal tolerance",limit:"tolerance不是不受法律约束；作者要求调整僵化框架，没有主张财政优待。",right:"B对应超越僵硬法律二分、容纳现实流动的整体建议。",
 wrong:[
 ["A","无中生有","A把honorably的正当双重归属扩大为忠诚伙伴的身份；作者没有提出忠诚考核或伙伴关系。",["两国归属表达的是合法正当的归属，还是对某方的绝对忠诚？",["正当的双重归属","绝对忠诚"],"正当的双重归属","belong to two nations honorably","honorably不能直接替换为faithful partners。"]],
 ["C","偷换对象","C把制度和态度上的包容换成经济优待； productive不等于要求额外补贴。",["末段要求改变的是态度与路径，还是增加补贴？",["态度与路径","增加补贴"],"态度与路径","multiple paths and multiple outcomes","不要把参与经济推成给予经济优惠。"]],
 ["D","与原文相反","D将作者希望容纳的人当成强大对手，方向与接纳暂住、双重归属相反。",["作者希望他们能光明正大属于两国，这更接近接纳还是敌视？",["接纳","敌视"],"接纳","belong to two nations honorably","mighty rivals会强化对立，违背中间地带的主张。"]],
 ],confirm:["legal tolerance在本文是否等于一切违法都不用管？",["不等于","等于"],"不等于","in the existing system","作者针对现行框架难以容纳的情况主张调整，不是取消法律。"],paths:[[19,20,22],[11,22]],language:[
 ["作者建议如何对待今天的候鸟式移民？","should be treated问应有态度，非描述既成政策。"],["当成忠诚伙伴","faithful强调忠诚；文章没有这种身份要求。"],["给予法律上的包容","tolerance为容纳现实多样性，结合末段制度背景理解。"],["给予经济优待","favors在此为好处、优待，不是喜欢。"],["当成强劲对手","mighty为强大的，rivals为竞争对手。"],
 ]}),
 make("2013-p2",raw[4],{answer:"D",sentence:7,type:"全文标题",scope:"whole-passage",instruction:"标题要覆盖历史流动、当代制度问题和包容建议；被批评的是非黑即白的框架，不是来去、生活或发展本身。",
 evidence:[e("q30-binary",7,"legal or illegal, good or bad","核心批评对象是僵硬二分。"),e("q30-change",10,"we need to change the way we think about categories","作者明确要求改变分类观念。"),e("q30-middle",22,"Looking beyond the culture war logic of right or wrong means opening up the middle ground","结尾再次要求超越对错二分。")],minimal:["2013-p2-q30-binary","2013-p2-q30-change","2013-p2-q30-middle"],paraphrase:"legal or illegal的僵化二分 → 导致制度问题、需超越 → Legal or Illegal: Big Mistake",limit:"错误是只用这两个标签处理复杂移民现实，不是说合法本身错误或所有非法行为正确。",right:"D同时概括作者批评的框架和贯穿全文的调整方向。",
 wrong:[
 ["A","偷换对象","A把来去流动说成大错；作者正是主张接纳往返者，批评对象是僵化分类。",["作者把come and go当成应承认的现实，还是要禁止的错误？",["应承认的现实","要禁止的错误"],"应承认的现实","They prefer to come and go","不能把被接纳者的特点当作作者批评的对象。"]],
 ["B","偷换对象","B把生活与发展说成巨大风险；those living and thriving是在说明候鸟移民，而非风险论断。",["living and thriving在文中说明谁？",["候鸟式移民","被证实的巨大风险"],"候鸟式移民","those living and thriving in the gray areas","词语出现不等于标题给出的评价成立。"]],
 ["C","把局部当全文","C截取是否有许可的局部状况并加上巨大风险评价，漏掉全文对二分框架的批评。",["结尾强调的是多路径还是证明流动风险巨大？",["多路径","流动风险巨大"],"多路径","multiple paths and multiple outcomes","标题必须覆盖结论，不能只取一处短语。"]],
 ],confirm:["标题D中的Mistake批评的是哪一项？",["僵硬的合法/非法二分思维","移民所有往返行为"],"僵硬的合法/非法二分思维","change the way we think about categories","标题概括思维框架的问题，并不否认所有法律区分的必要性。"],paths:[[7,10,22]],language:[
 ["本文最合适的标题是什么？","most appropriate要求全文覆盖和评价方向都一致。"],["来来去去：大错","将流动本身当成错误，与作者态度相反。"],["生活与发展：巨大风险","增加原文没有给出的风险判断。"],["有无许可：巨大风险","With or Without须由正文补出permission，但仍不是全文主旨。"],["合法还是非法：大错","批评将复杂现实硬套进两类的思维。"],
 ]}),
];
