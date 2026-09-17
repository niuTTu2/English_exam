import type { MatchingQuestion, SentenceAnalysis } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2011-p5");
export const passage2011P5Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("Leading doctors today ", "subject", "名词短语与时间副词", "主语及时间", "weigh的主体", "leading为有影响力的，today定位报道当天。"),
    segment("weigh in on the debate over the government's role in promoting public health ", "predicate", "动词习语与介词层级", "谓语及参与议题", "weigh in on整体表示参与讨论", "over引争论议题，in promoting说明政府在哪方面的作用。"),
    segment('by demanding that ministers impose "fat taxes" on unhealthy food ', "modifier", "by动名词与宾语从句", "方式状语第一项", "说明医生参与辩论的具体要求", "demand that后impose为原形，fat taxes为不健康食品征税。"),
    segment("and introduce cigarette-style warnings to children about the dangers of a poor diet.", "modifier", "并列动词及介词宾语", "要求内容第二项", "与impose共用ministers主语", "introduce警告给儿童，about引饮食风险；不是向儿童提供香烟。"),
  ], "Leading doctors weigh in on the debate by demanding that ministers impose taxes and introduce warnings.", "权威医生今天通过要求部长对不健康食品征收‘脂肪税’、并向儿童引入类似香烟警示的劣质饮食危险警告，参与关于政府促进公共健康作用的辩论。", "权威医生今天加入政府应如何促进公共健康的讨论，要求对不健康食品征收‘脂肪税’，并像警示吸烟危害那样，提醒儿童不良饮食的风险。", "概述医疗界干预主张，后文逐一对应人物，不把集体主张随意归给某个人。", ["weigh in on the debate", 'impose "fat taxes" on unhealthy food', "cigarette-style warnings"], [
    clause('that ministers impose "fat taxes" on unhealthy food and introduce cigarette-style warnings to children about the dangers of a poor diet', "宾语从句", "that", "作demanding宾语", "ministers", "impose；introduce（要求式原形）", "fat taxes；cigarette-style warnings", "先译要求部长，再译征税和警告两项要求。"),
  ]),
  sentence(2, [
    segment("The demands follow comments ", "predicate", "主语加及物谓语及宾语", "主句主谓宾", "follow说明时间先后", "要求是在评论之后出现，不表示支持那些评论。"),
    segment("made last week by the health secretary, Andrew Lansley, ", "modifier", "过去分词定语及同位姓名", "修饰comments", "made的施事是卫生大臣", "last week为发表评论时间，Andrew Lansley说明其姓名。"),
    segment("who insisted the government could not force people to make healthy choices ", "modifier", "关系从句内嵌宾语从句", "人物言论第一项", "who指Lansley", "insisted后的could not是他坚持认为的事实判断，不是虚拟原形要求。"),
    segment("and promised to free businesses from public health regulations.", "modifier", "关系从句并列谓语", "人物言论第二项", "who同时作promised的主语", "free A from B使企业免受公共卫生法规约束。"),
  ], "The demands follow comments made by the health secretary.", "这些要求出现在卫生大臣安德鲁·兰斯利上周的评论之后；他坚持说政府不能强迫人作健康选择，并承诺让企业摆脱公共卫生法规约束。", "此前，卫生大臣安德鲁·兰斯利上周曾表示，政府不能强迫民众作出健康选择，并承诺解除企业所受的公共卫生监管；医疗界随后提出了上述要求。", "确立兰斯利反对强制监管的立场，与医疗界主张对照。", ["force people to make healthy choices", "free businesses from public health regulations"], [
    clause("who insisted the government could not force people to make healthy choices and promised to free businesses from public health regulations", "非限制性定语从句", "who", "补充Andrew Lansley言论", "who", "insisted；promised", "the government could not...；to free businesses...", "先认清人物，再译他认为与承诺的两项内容。"),
    clause("the government could not force people to make healthy choices", "宾语从句", "省略that", "作insisted宾语", "the government", "could not force", "people（宾语）；to make healthy choices（宾补）", "译为政府不能强迫民众作健康选择，保留cannot方向。"),
  ]),
  sentence(3, [
    segment("But senior medical figures want ", "predicate", "转折词与主谓", "主句主谓", "figures指医学界权威人士", "But对照卫生大臣放松监管的意见。"),
    segment("to stop fast-food outlets opening near schools, ", "object", "不定式及stop宾语分词补足", "want的目标第一项", "阻止快餐门店在学校附近开业", "stop somebody/something doing省略from，outlets为店铺。"),
    segment("restrict advertising of products high in fat, salt or sugar, ", "object", "并列不定式省略to", "目标第二项", "限制高脂高盐高糖产品广告", "high in后置修饰products，不是修饰广告的高度。"),
    segment("and limit sponsorship of sports events by fast-food producers such as McDonald's.", "object", "并列不定式及名词介词层级", "目标第三项", "限制快餐商赞助体育赛事", "by引赞助者，such as给出麦当劳例子。"),
  ], "senior medical figures want to stop outlets opening, restrict advertising, and limit sponsorship.", "但医学界资深人士希望阻止快餐店在学校附近开业，限制高脂高盐高糖产品广告，并限制麦当劳等快餐生产商赞助体育赛事。", "但医学界权威希望禁止快餐店在校园附近开设，限制高脂、高盐、高糖食品广告，并限制麦当劳等快餐企业赞助体育赛事。", "三项监管行动并列，不把广告、营业地点和赞助混为一项。", ["stop fast-food outlets opening near schools", "high in fat, salt or sugar", "such as McDonald's"]),
  sentence(4, [
    segment("They argue ", "predicate", "代词主语加观点动词", "主句主谓", "They指医学界权威", "argue此处是主张，不一定争吵。"),
    segment("that government action is necessary ", "predicate", "that宾语从句主谓", "argue的内容", "necessary评价政府干预必要性", "后面两个不定式说明所要达到的目的。"),
    segment("to curb Britain's addiction to unhealthy food ", "modifier", "目的不定式", "必要行动的目的第一项", "curb抑制不健康饮食依赖", "addiction to中to为介词，Britain's为人群整体转喻。"),
    segment("and help halt spiraling rates of obesity, diabetes and heart disease.", "modifier", "并列不定式省略to", "目的第二项", "help后halt省略to", "spiraling修饰rates，三类健康问题的患病比例不断上升。"),
  ], "They argue that government action is necessary to curb addiction and help halt rates.", "他们认为，政府行动有必要用来遏制英国人对不健康食品的依赖，并帮助阻止肥胖、糖尿病和心脏病患病率不断攀升。", "他们主张政府采取行动，抑制英国人对不健康食品的依赖，遏止肥胖、糖尿病和心脏病患病率持续上升。", "解释医疗界干预理由，医学描述属于原文观点而非新增诊疗建议。", ["addiction to unhealthy food", "help halt spiraling rates"], [
    clause("that government action is necessary to curb Britain's addiction to unhealthy food and help halt spiraling rates of obesity, diabetes and heart disease", "宾语从句", "that", "作argue宾语", "government action", "is", "necessary；to curb...and help halt...说明目的", "先译政府行动必要，再译遏制饮食依赖和患病率两项目的。"),
  ]),
  sentence(5, [
    segment("Professor Terence Stephenson, president of the Royal College of Paediatrics and Child Health, ", "subject", "姓名加职务同位语", "主语", "said的说话者", "同位职务用于识别儿科组织负责人，不是另一名说话人。"),
    segment("said ", "predicate", "过去时报告动词", "谓语", "引出Stephenson的判断", "that从句为他说的内容。"),
    segment("that the consumption of unhealthy food should be seen ", "predicate", "宾语从句主语加情态被动", "从句主谓", "consumption为真正主语", "should be seen表示应被看作，不是实际被目视。"),
    segment("to be just as damaging as smoking or excessive drinking.", "object", "不定式补足与同级比较", "被评价的性质", "比较不健康饮食与吸烟过饮危害", "just强调同样程度，damaging为形容词；不把饮酒一律等同酗酒。"),
  ], "Professor Terence Stephenson said that the consumption of unhealthy food should be seen to be just as damaging as smoking or excessive drinking.", "特伦斯·斯蒂芬森教授、皇家儿科与儿童健康学院院长说，不健康食品的食用应被看作与吸烟或过量饮酒同样有害。", "皇家儿科与儿童健康学院院长特伦斯·斯蒂芬森教授表示，应像看待吸烟或过量饮酒一样，认识不健康饮食的危害。", "为42题把饮食风险按香烟危害警示的类比建立依据。", ["just as damaging as smoking or excessive drinking"], [
    clause("that the consumption of unhealthy food should be seen to be just as damaging as smoking or excessive drinking", "宾语从句", "that", "作said宾语", "the consumption of unhealthy food", "should be seen", "to be just as damaging...（补足）", "先译不健康饮食应被认为，再译与吸烟过饮同样有害。"),
    clause("as smoking or excessive drinking", "比较省略结构", "as", "说明damaging的比较标准", "smoking or excessive drinking", "省略is damaging", "危害程度", "译为与吸烟或过量饮酒一样有害，or表示两个可比对象。"),
  ]),
  sentence(6, [
    segment('"Thirty years ago, ', "modifier", "直接引语开始与时间短语", "时间状语", "限定假想的认知时点", "三十年前相对原文报道时间，不用当前年倒推。"),
    segment("it would have been inconceivable ", "predicate", "形式主语加情态完成式系表", "引语第一分句主谓", "评价当年设想禁烟的难度", "真正评价动作在to have imagined中。"),
    segment("to have imagined a ban on smoking in the workplace or in pubs, ", "object", "完成不定式与介词定语", "真正主语", "说明何事当年难以想象", "ban on smoking指工作场所或酒吧禁烟。"),
    segment("and yet that is what we have now.", "predicate", "转折并列与表语从句", "引语第二分句", "that指工作场所与酒吧禁烟", "what we have now说明如今确实存在这种政策。"),
  ], "it would have been inconceivable to have imagined a ban, and yet that is what we have now.", "‘三十年前，设想工作场所或酒吧会禁烟本是难以想象的，但这正是我们现在拥有的。", "‘三十年前，谁能想象工作场所或酒吧会禁烟？可如今这已是现实。", "借禁烟政策变化说明大胆公共健康措施有可能成为现实。", ["a ban on smoking", "and yet"], [
    clause("what we have now", "表语从句", "what", "作is表语", "we", "have", "what（现有的禁烟政策）", "译为我们如今已有的现实；what在从句中作宾语。"),
  ]),
  sentence(7, [
    segment("Are we willing ", "predicate", "系动词倒装加主语与表语", "一般疑问主干", "we为社会与决策者", "willing说明意愿，不是预测必然执行。"),
    segment("to be just as courageous in respect of obesity?", "object", "不定式补足及比较省略", "willing的内容", "询问能否同样勇于应对肥胖", "just as courageous的比较对象承接禁烟，in respect of表示在……方面。"),
  ], "Are we willing to be just as courageous?", "我们愿意在应对肥胖方面同样勇敢吗？", "面对肥胖问题，我们愿不愿拿出同样的勇气？", "将禁烟经验迁移到不健康饮食监管，下一句肯定作答。", ["in respect of obesity"], [
    clause("just as courageous", "语境省略比较结构", "as", "补足courageous的比较程度", "语境省略：we", "语境省略：were in confronting smoking", "courageous", "原文只保留as courageous，比较标准从上一句禁烟取回，不伪造英文原句。"),
  ]),
  sentence(8, [
    segment('I would suggest that we should be," ', "predicate", "报告动词内嵌宾语从句", "直接引语结尾", "I为Stephenson，we为社会", "be后省略上一句courageous，不能译为我们应存在。"),
    segment("said the leader of the UK's children's doctors.", "predicate", "引语后报告倒装", "说话者说明", "the leader为said主语", "英国儿童医生领袖指前述Stephenson。"),
  ], "I would suggest that we should be, said the leader.", "我会建议我们应如此，’英国儿童医生的领袖说。", "‘我认为，我们应该这样做。’这位英国儿科界负责人说。", "肯定应像禁烟一样勇于应对肥胖，而非主张放松监管。", ["we should be"], [
    clause("that we should be", "宾语从句", "that", "作suggest宾语", "we", "should be", "省略just as courageous", "译为我们应该同样勇敢，从前句补足性质但不改英文。"),
  ]),
  sentence(9, [
    segment("Lansley has alarmed health campaigners ", "predicate", "主谓宾与现在完成时", "主句主干", "Lansley引发健康倡导者担忧", "alarmed强调使担心，不是提醒闹钟。"),
    segment("by suggesting he wants industry rather than government ", "modifier", "by动名词与省略that的宾语", "原因方式状语", "说明什么言论使人担忧", "industry而非government是希望发挥带头作用的主体。"),
    segment("to take the lead.", "object", "不定式宾语补足", "补足wants的对象动作", "以企业而非政府为逻辑主语", "take the lead为带头，不是取得铅。"),
  ], "Lansley has alarmed health campaigners by suggesting he wants industry to take the lead.", "兰斯利表示希望行业而非政府带头，这使健康倡导者感到担忧。", "兰斯利希望由行业而不是政府主导，这番表态令公共健康倡导者不安。", "41题须从兰斯利支持行业参与而非行政强制的立场入手。", ["industry rather than government", "take the lead"], [
    clause("he wants industry rather than government to take the lead", "宾语从句", "省略that", "作suggesting宾语", "he（Lansley）", "wants", "industry rather than government（宾语）；to take the lead（宾补）", "先译他希望，再译谁带头，对比不能反转。"),
  ]),
];

passage2011P5Sentences.push(
  sentence(10, [
    segment("He said ", "predicate", "代词主语加报告动词", "主句主谓", "He指Lansley", "下一从句解释他赞成的行业作用。"),
    segment("that manufacturers of crisps and candies could play a central role in the Change4Life campaign, ", "predicate", "宾语从句及角色搭配", "said的内容", "manufacturers为could play主语", "of引制造产品，in引发挥核心作用的活动。"),
    segment("the centrepiece of government efforts to boost healthy eating and fitness.", "modifier", "同位名词加目的不定式", "补充campaign的地位", "centrepiece说明其是政府努力的重点", "boost的宾语healthy eating与fitness并列，不能漏一项。"),
  ], "He said that manufacturers could play a central role in the Change4Life campaign.", "他说，薯片和糖果制造商可以在Change4Life活动中发挥核心作用；该活动是政府促进健康饮食和身体健康努力的重点。", "他表示，薯片和糖果生产商可在‘Change4Life’健康生活倡议中发挥重要作用；这正是政府推广健康饮食与健身工作的重点。", "41题E直接对应制造商对Change4Life活动的重要贡献。", ["play a central role in the Change4Life campaign"], [
    clause("that manufacturers of crisps and candies could play a central role in the Change4Life campaign, the centrepiece of government efforts to boost healthy eating and fitness", "宾语从句", "that", "作said宾语", "manufacturers of crisps and candies", "could play", "a central role；in the Change4Life campaign为领域", "先译制造商可发挥核心作用，再说明活动目标。"),
  ]),
  sentence(11, [
    segment("He has also criticised ", "predicate", "代词主语与现在完成时", "主句主谓", "He仍是Lansley", "also引出他对另一健康干预方法的批评。"),
    segment("the celebrity chef Jamie Oliver's high-profile attempt to improve school lunches in England ", "object", "所有格长名词短语", "criticised宾语", "被批评的是Jamie Oliver改善午餐的努力", "to improve解释attempt内容；high-profile指广受关注。"),
    segment('as an example of how "lecturing" people was not the best way to change their behaviour.', "modifier", "as评价补足内嵌how从句", "解释批评角度", "how从句作of宾语", "not the best是Lansley的评价，不是Oliver对自己努力的否定。"),
  ], "He has also criticised Jamie Oliver's attempt as an example.", "他还批评名厨杰米·奥利弗在英国改善学校午餐的高调尝试，认为这例证了‘说教’并非改变人们行为的最佳方法。", "他还批评名厨杰米·奥利弗备受关注的英国校园午餐改革，借此说明‘说教’不是改变行为的最佳办法。", "43题C问Oliver似乎相信什么：他的尝试支持有效性判断；不要把Lansley的否定安到Oliver头上。", ['"lecturing" people', "the best way to change their behaviour"], [
    clause('how "lecturing" people was not the best way to change their behaviour', "介词宾语从句", "how", "作of宾语，说明例证内容", '"lecturing" people（动名词主语）', "was not", "the best way to change their behaviour", "把这是Lansley的批评立场译清，再对照Oliver的实践。"),
  ]),
  sentence(12, [
    segment("Stephenson suggested ", "predicate", "人名加报告动词", "主句主谓", "医生Stephenson提出限制方案", "后接省略that的宾语从句。"),
    segment("potential restrictions could include ", "predicate", "从句主语加情态动词", "宾语从句主谓", "could表示拟议可能措施", "不是政府已经颁布禁令。"),
    segment("banning TV advertisements for foods high in fat, salt or sugar before 9 p.m. ", "object", "动名词宾语", "限制措施第一项", "晚九点前禁播这些食品广告", "before 9 p.m.限定广告禁播时段，high in限定foods。"),
    segment("and limiting them on billboards or in cinemas.", "object", "并列动名词宾语", "限制措施第二项", "them回指广告", "on billboards和in cinemas为展示场所，不是限制食品进入电影院。"),
  ], "Stephenson suggested restrictions could include banning advertisements and limiting them.", "斯蒂芬森建议，可能的限制包括晚上九点以前禁止播放高脂高盐高糖食品电视广告，并限制这些广告出现在广告牌或电影院中。", "斯蒂芬森提议，可在晚九点前禁播高脂、高盐、高糖食品的电视广告，并限制其在户外广告牌和影院投放。", "详列以控烟方式控制快餐宣传的建议。", ["before 9 p.m.", "limiting them on billboards or in cinemas"], [
    clause("potential restrictions could include banning TV advertisements for foods high in fat, salt or sugar before 9 p.m. and limiting them on billboards or in cinemas", "宾语从句", "省略that", "作suggested宾语", "potential restrictions", "could include", "banning...；limiting...两个并列动名词", "先译拟议限制，再分时段和场所译两种广告限制。"),
  ]),
  sentence(13, [
    segment('"If we were really bold, ', "condition", "if虚拟条件从句", "条件状语", "限定后面可能采取的态度", "were与might配合表达假设，并非过去实际勇敢过。"),
    segment("we might even begin to think of high-calorie fast food ", "predicate", "主语与情态谓语层级", "引语主句", "think of对象为高热量快餐", "might even为甚至可能，begin to为开始形成这种看法。"),
    segment("in the same way as cigarettes ", "modifier", "同样方式比较", "方式状语", "比较对快餐与香烟的监管", "省略看待香烟的重复认知动作。"),
    segment('– by setting strict limits on advertising, product placement and sponsorship of sports events," ', "modifier", "by动名词方式短语", "破折号后具体解释", "三项限制说明怎样同样看待", "product placement为植入广告，不是摆货物位置。"),
    segment("he said.", "predicate", "引语报告分句", "说话者说明", "he为Stephenson", "整段引语属于医生立场，不属于部长。"),
  ], "we might begin to think of high-calorie fast food in the same way as cigarettes, he said.", "他说：‘如果我们真够大胆，甚至可能开始像看待香烟一样看待高热量快餐——严格限制广告、产品植入以及体育赛事赞助。’", "他说：‘如果我们有足够勇气，甚至可以像管控香烟那样对待高热量快餐，严格限制其广告、商业植入和体育赛事赞助。’", "42题D香烟式风险警示是对其同等监管理念的归纳，非支持企业自律取代政府。", ["in the same way as cigarettes", "setting strict limits on advertising"], [
    clause("If we were really bold", "虚拟条件状语从句", "If", "为might begin提供假设", "we", "were", "really bold", "先译如果真有勇气，再接可以采取的监管办法。"),
    clause("as cigarettes", "省略比较结构", "as", "同样方式的比较对象", "省略we", "省略think of", "cigarettes", "还原理解为像看待香烟那样，但不补写进原句。"),
  ]),
  sentence(14, [
    segment("Such a move could affect firms such as McDonald's, ", "predicate", "主谓宾与举例", "主句", "move回指限制广告和赞助", "could为可能影响，firms是公司不是坚定。"),
    segment("which sponsors the youth coaching scheme ", "modifier", "非限制性定语从句", "补充公司活动", "which指McDonald's", "sponsors为赞助，coaching说明青少年训练。"),
    segment("run by the Football Association.", "modifier", "过去分词短语", "修饰scheme", "说明计划由谁实施", "run在此是开展、组织，不是青少年奔跑。"),
  ], "Such a move could affect firms.", "这种举措可能影响麦当劳等企业，麦当劳赞助了由足球协会开展的青少年训练计划。", "这些措施可能影响麦当劳等企业——麦当劳就赞助了英足总组织的青少年培训计划。", "说明监管赞助可能影响的现实商业关联。", ["the youth coaching scheme", "run by the Football Association"], [
    clause("which sponsors the youth coaching scheme run by the Football Association", "非限制性定语从句", "which", "补充McDonald's", "which", "sponsors", "the youth coaching scheme", "先译企业赞助，再译计划由足协组织。"),
  ]),
  sentence(15, [
    segment('Fast-food chains should also stop offering "inducements" ', "predicate", "主语与情态动词加动名词", "被转述主张", "chain为连锁企业", "stop offering表示停止提供，不是停下来开始提供。"),
    segment("such as toys, cute animals and mobile phone credit ", "modifier", "举例名词串", "补充inducements", "列吸引儿童的赠品及话费", "credit此处为手机话费额度，不是信用或学分。"),
    segment("to lure young customers, ", "modifier", "目的不定式", "说明提供诱因的目的", "不是停止的目的", "to lure依附offering，说明诱惑年轻顾客。"),
    segment("Stephenson said.", "predicate", "后置报告分句", "观点来源", "说话者为Stephenson", "应停止促销诱惑为建议而不是已执行事实。"),
  ], "Fast-food chains should stop offering inducements, Stephenson said.", "斯蒂芬森说，快餐连锁店还应停止提供玩具、可爱动物和手机话费等‘诱因’来吸引年轻顾客。", "斯蒂芬森还说，快餐连锁企业应停止用玩具、可爱动物或手机话费等‘甜头’诱惑年轻消费者。", "将烟草式严格监管从广告延伸至促销诱导。", ['stop offering "inducements"', "mobile phone credit"]),
  sentence(16, [
    segment("Professor Dinesh Bhugra, president of the Royal College of Psychiatrists, said: ", "predicate", "主语、职务同位语与报告动词", "报告主句", "介绍另一位医生Bhugra", "与儿科的Stephenson是不同人物，后续He回指Bhugra。"),
    segment('"If children are taught about the impact ', "condition", "if条件与被动主谓", "引语条件从句", "说明提前健康教育的条件", "about引所教内容，impact后接定语从句。"),
    segment("that food has on their growth, ", "modifier", "定语从句", "修饰impact", "that在从句中作has宾语", "have an impact on指对成长的影响。"),
    segment("and that some things can harm, ", "object", "并列内容从句", "are taught的第二项内容", "that引完整命题，与前面about内容并列", "此that不是修饰impact的关系代词。"),
    segment('at least information is available up front."', "predicate", "程度范围与引语主句", "条件成立的结果", "up front表示事先", "available为可获得，不声称有信息一定能改变行为。"),
  ], "Professor Dinesh Bhugra said: If children are taught, information is available.", "皇家精神科医师学院院长迪内什·布格拉教授说：‘如果教给儿童食物对成长的影响，以及有些东西可能造成伤害，至少信息是事先可获得的。’", "皇家精神科医师学院院长迪内什·布格拉教授说：‘如果孩子知道食物如何影响成长，以及某些食物可能有害，至少他们能提前掌握这些信息。’", "区分两种that作用；人物匹配还需看下一句他的明确禁店建议。", ["the impact that food has on their growth", "available up front"], [
    clause("If children are taught about the impact that food has on their growth, and that some things can harm", "条件状语从句", "If", "限定信息提前可得的条件", "children", "are taught", "about the impact...；that some things can harm", "先译孩子被告知两项内容，再接至少有信息的结果。"),
    clause("that food has on their growth", "定语从句", "that", "修饰impact", "food", "has", "that（impact）；on their growth为影响对象", "译为食物对成长产生的影响，that作has宾语。"),
    clause("that some things can harm", "内容从句", "that", "作taught的并列内容", "some things", "can harm", "未明说的受影响者由children语境理解", "译为某些东西可能有害，can不译成一定。"),
  ]),
  sentence(17, [
    segment("He also urged councils ", "predicate", "代词主语与动宾", "主句主谓宾", "He指Bhugra", "councils为地方议会，不是2011Text4部长理事会。"),
    segment('to impose "fast-food-free zones" around schools and hospitals ', "object", "不定式宾补", "说明要求地方政府做什么", "free后缀为不含、禁止快餐，不是免费快餐", "around引学校和医院周边区域。"),
    segment("– areas within which takeaways cannot open.", "modifier", "同位区域名词加定语从句", "解释zones", "within which=within areas", "cannot open为不得开业，takeaways指外卖快餐店。"),
  ], "He urged councils to impose fast-food-free zones.", "他还敦促地方议会在学校和医院周围设立‘无快餐区’——外卖快餐店不能开业的区域。", "他还敦促地方政府在学校和医院周边划定‘快餐禁入区’，禁止外卖快餐店在那里营业。", "44题B直接对应Bhugra禁止学校周边快餐店的主张。", ['"fast-food-free zones"', "within which takeaways cannot open"], [
    clause("within which takeaways cannot open", "定语从句", "within which", "修饰areas", "takeaways", "cannot open", "within which为地点状语，无宾语", "译为快餐店不得开业的区域，within which不作主语。"),
  ]),
  sentence(18, [
    segment('A Department of Health spokesperson said: "We need ', "predicate", "机构身份与直接引语主谓", "报告句与引语起点", "We为卫生部门方面", "新增官方发言人立场，不能继续归给Bhugra。"),
    segment("to create a new vision for public health ", "object", "不定式宾语与名词定语", "need的内容", "vision为愿景不是视力", "for public health说明愿景所属领域。"),
    segment("where all of society works together to get healthy and live longer.", "modifier", "where定语从句与目的不定式", "说明愿景情境", "where对应愿景中的公共健康格局", "society为集合整体，works单数；get和live共用to。"),
  ], "We need to create a new vision for public health.", "卫生部发言人说：‘我们需要创造一种公共健康新愿景，在其中全社会共同努力变得健康、活得更久。", "卫生部一位发言人说：‘我们需要建立新的公共健康愿景，让全社会携手促进健康、延长寿命。", "45题政府主张社会合作，下一句明确企业责任而非政府监管。", ["all of society works together"], [
    clause("where all of society works together to get healthy and live longer", "定语从句", "where", "补充public health新愿景的情境", "all of society", "works", "together；to get healthy and live longer为目的", "按在这一愿景中社会携手行动来译，where不一定物理地点。"),
  ]),
  sentence(19, [
    segment("This includes creating a new 'responsibility deal' with business, ", "predicate", "指示主语、动词与动名词宾语", "主句主干", "This指共同改善健康的新愿景", "business此处为工商界，与其建立责任协议。"),
    segment("built on social responsibility, not state regulation.", "modifier", "过去分词定语与否定对照", "说明协议基础", "built on修饰deal", "以社会责任为基础，而非国家强制监管；两个名词结构平行。"),
  ], "This includes creating a new responsibility deal with business.", "这包括与企业建立新的‘责任协议’，其基础是社会责任，而不是国家监管。", "这包括与企业达成新的‘责任协议’，以社会责任而非国家监管为基础。", "45题G企业责任最直接；A/B/D行政限制不是发言人强调的路线。", ["built on social responsibility, not state regulation"]),
  sentence(20, [
    segment("Later this year, ", "modifier", "时间副词短语", "时间状语", "限定will publish", "指原文报道当年稍晚，不擅定今日时间。"),
    segment("we will publish a white paper ", "predicate", "主语与将来动宾", "引语主干", "we仍是卫生部", "white paper为政府白皮书，不是白纸。"),
    segment('setting out exactly how we will achieve this."', "modifier", "现在分词定语与how从句", "修饰white paper", "说明白皮书将详述的内容", "this回指新愿景和企业责任安排，how作实现方式状语。"),
  ], "we will publish a white paper.", "今年稍晚，我们将发布一份白皮书，准确阐明我们将怎样实现这一目标。’", "今年晚些时候，我们将发布白皮书，详细说明如何实现这个目标。’", "发言人引语结束，政策计划不当作已经实施。", ["a white paper", "setting out exactly how we will achieve this"], [
    clause("how we will achieve this", "宾语从句", "how", "作setting out的宾语", "we", "will achieve", "this", "先译详述，再译我们怎样实现这个目标。"),
  ]),
  sentence(21, [
    segment("The food industry will be alarmed ", "predicate", "名词主语加将来状态", "主句主干", "食品行业将感到不安", "作者对行业反应作预判。"),
    segment("that such senior doctors back such radical moves, ", "object", "that内容从句", "解释不安所针对的事实", "back在此为支持动词", "senior doctors支持激进措施，不是企业支持。"),
    segment("especially the call to use some of the tough tactics ", "modifier", "强调名词加不定式", "具体聚焦radical moves", "the call为呼吁非电话", "some保留仅部分控烟策略的限定。"),
    segment("that have been deployed against smoking over the last decade.", "modifier", "定语从句与完成时被动", "修饰tactics", "that作have been deployed主语", "against smoking为应对对象，over the last decade为延续时段。"),
  ], "The food industry will be alarmed that doctors back moves.", "食品行业将因如此资深的医生支持这样激进的措施而不安，尤其是要求使用过去十年中已用于控烟的一些强硬策略的呼吁。", "这些权威医生支持如此强硬的措施，会让食品行业紧张，尤其是他们呼吁借用过去十年控烟中的部分强硬办法。", "收束医疗界与行业、政府立场的张力，不据此捏造原文未提的家长示范。", ["back such radical moves", "over the last decade"], [
    clause("that such senior doctors back such radical moves", "形容词补足内容从句", "that", "解释alarmed的缘由", "such senior doctors", "back", "such radical moves", "译为因权威医生支持强硬举措而担忧，主宾不可倒置。"),
    clause("that have been deployed against smoking over the last decade", "定语从句", "that", "限定tactics", "that（tactics）", "have been deployed", "against smoking为对象；over the last decade为时间", "译为过去十年来用于控烟的那些策略，保留完成时。"),
  ]),
);

const options: MatchingQuestion["options"] = [
  { key: "A", text: '"fat taxes" should be imposed on fast-food producers such as McDonald\'s.' },
  { key: "B", text: "the government should ban fast-food outlets in the neighborhood of schools." },
  { key: "C", text: '"lecturing" was an effective way to improve school lunches in England.' },
  { key: "D", text: "cigarette-style warnings should be introduced to children about the dangers of a poor diet." },
  { key: "E", text: "the producers of crisps and candies could contribute significantly to the Change4Life campaign." },
  { key: "F", text: "parents should set good examples for their children by keeping a healthy diet at home." },
  { key: "G", text: "the government should strengthen the sense of responsibility among businesses." },
];
function question(number: number, sentenceNumber: number, prompt: string, answer: MatchingQuestion["answer"], locating: string, explanations: MatchingQuestion["explanations"]): MatchingQuestion {
  return { id: 201100 + number, number, sentenceId: `2011-p5-s${sentenceNumber}`, format: "matching", sharedOptionsId: 201141, prompt, options, answer, locating, explanations };
}
export const passage2011P5Questions: MatchingQuestion[] = [
  question(41, 10, "Andrew Lansley held that", "E", "第10句He指Lansley：薯片糖果制造商could play a central role in Change4Life，与E同义。", { A: "征税属开头医生群体主张，Lansley强调解除监管。", B: "学校周边禁快餐店属医生建议，不是Lansley的行业带头路线。", C: "Lansley明确批评lecturing不是最佳办法，正好相反。", D: "香烟式警示属医疗界严格监管理念，非他的主张。", E: "生产商发挥central role与contribute significantly同义，人物与活动均对应。", F: "全文未给Lansley提出家长在家饮食示范的说法。", G: "责任协议由卫生部发言人明确提出；41题有更直接的Change4Life对应。" }),
  question(42, 13, "Terence Stephenson agreed that", "D", "第5—8句将不健康饮食与吸烟危害同等看待，第13句主张按香烟方式严格管控；对应D儿童风险警示。", { A: "征fat taxes为开篇群体倡议，未直接归于Stephenson；不能据职业身份代替发言定位。", B: "他谈广告、赞助与促销限制；明确学校周边禁入区发言来自Bhugra。", C: "他未评价Oliver的说教方法，人物证据不对应。", D: "把饮食危害与吸烟相提并论并要求同等勇气监管，与香烟式儿童警示相符。", E: "生产商在Change4Life发挥作用是Lansley的主张。", F: "没有他的家长家庭示范发言，属于无依据选项。", G: "强调企业责任而非国家监管是发言人的方案，不是医生的严格限制路线。" }),
  question(43, 11, "Jamie Oliver seemed to believe that", "C", "第11句Oliver尝试改善午餐，Lansley将其批为lecturing。题干seemed to believe问实践者所持信念，不能把批评者的not移给Oliver。", { A: "原文未说Oliver主张给快餐商征税。", B: "原文只介绍他的学校午餐改革，未归给他学校周边禁店建议。", C: "他以被称为lecturing的方法推动午餐改革，可推断他认为这种方法有效；seemed保留推断程度。", D: "香烟式警示是医疗界主张，非本句名厨行动。", E: "Change4Life企业作用来自Lansley，不是Oliver。", F: "未给出Oliver劝家长在家示范的原文证据。", G: "企业责任协议是卫生部发言人的具体主张。" }),
  question(44, 17, "Dinesh Bhugra suggested that", "B", "第17句He承接Bhugra，主张学校和医院周边fast-food-free zones，区域内takeaways cannot open。", { A: "Bhugra这两句未提出fat taxes，不能将开篇总述自动归给他。", B: "学校周边禁止快餐店营业与fast-food-free zones直接同义。", C: "他谈儿童提前了解影响及禁入区，不是评Oliver说教成效。", D: "他的明确配对建议是禁入区；按控烟模式警示的理念对应Stephenson。", E: "薯片糖果生产商贡献活动是Lansley的发言。", F: "他的教育对象是儿童，不等于要求家长在家饮食示范。", G: "他要求地方议会强制设区，不是发言人的企业责任自律方案。" }),
  question(45, 19, "A Department of Health spokesperson proposed that", "G", "第18—20句为发言人完整引语，responsibility deal with business以social responsibility而非state regulation为基础。", { A: "征税不是发言人以企业责任为基础的具体提案。", B: "周边禁店是Bhugra要求地方政府强制设区的意见。", C: "发言人没有评价Oliver的lecturing效果。", D: "发言人未提出香烟式儿童警示，不能拼接医生总述。", E: "活动中生产商作用是Lansley的直接发言，而本题定位企业责任协议。", F: "原文没有家庭饮食示范提案，不能靠常识添加。", G: "与business达成社会责任协议，正对应增强企业责任感。" }),
];
