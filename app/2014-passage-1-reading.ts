import type { ArticleGuide } from './article-teaching';
import { createV2Sentence, type QuickReading } from './article-v2/model';
import { reviewedBlocks } from './2013-reading-helpers';
import { texts, paragraphNumbers } from './2014-passage-1-source';
const rows: Array<[string,string,string,string[],QuickReading['keyReasons'],string[]]> = [
['如果有5.9亿美元，你会怎么花？','would表示假设；$590m是5.9亿美元。','用巨额财富的问题引入如何花钱。',[],[],[]],
['这成了84岁的寡妇格洛丽亚·麦肯齐眼下要考虑的问题；她最近从佛罗里达州那间小小的铁皮屋顶房子走出来，领取了史上最大的一笔由一人独得的彩票头奖。','an 84-year-old widow补充她的身份；who引出的经历说明问题为何真实发生。','用中奖者的经历把抽象问题具体化。',['an 84-year-old widow','who recently','to collect'],['attachment'],['in history']],
['如果她希望这笔新得来的财富带来持久的满足感，那么读一读伊丽莎白·邓恩和迈克尔·诺顿合著的《快乐金钱》，会是个不错的选择。','could do worse than不是劝她做得更糟，而是委婉推荐；by引出作者。','由中奖故事转入对一本书的介绍。',['she could','by Elizabeth'],['misreading','main-line'],['could do worse than']],
['这两位学者运用一系列行为研究表明：最能让人获得满足的花钱方式，可能与直觉相反。','rewarding强调带来心理满足；counterintuitive是与直觉相反，并非没有价值。','点明全篇论题：花钱方式影响幸福回报。',['to show that','the most rewarding'],['main-line'],['an array of']],
['人们幻想巨额财富时，脑海里常浮现豪车和奢华住宅。','visions在这里是想象中的景象，不是视力。','交代常见的物质消费想象。',[],[],[]],
['然而，这些物质消费带来的满足感消退得相当快。','Yet转折；wears off表示满足感逐渐消失。','指出单靠物质购买难以获得持久满足。',['wears off'],['answer-evidence','paragraph-turn'],['wears off']],
['曾经令人兴奋的新鲜东西变得陈旧乏味，后悔之情悄悄滋生。','What引出整体主语“曾经令人兴奋的新东西”；old-hat表示不新鲜，不是旧帽子。','进一步描述物质满足消退的过程。',['becomes old-hat;','regret'],['misreading'],['creeps in']],
['邓恩和诺顿说，把钱花在体验上要好得多，例如有趣的旅行、独特的用餐体验，甚至看场电影。','say...是插入的说话人；like列举体验，unique meals强调独特体验而非昂贵丰盛。','给出第21题所需的体验型消费原则。',['say Ms Dunn','like interesting'],['answer-evidence','attachment'],['spend money on']],
['这些消费常常随着时间推移而愈发珍贵，成为故事或回忆；尤其是当它们让人感觉与他人联系更紧密时。','as stories or memories解释价值如何留存；if说明人际联系进一步增强收益的条件。','解释体验型消费为何能产生持久价值。',['with time','particularly if'],['answer-evidence'],[]],
['这本薄薄的书满是建议，能帮助工薪族和彩民赢家让每一分钱换来更多幸福。','volume是书；wage slaves略带调侃地指靠工资生活的人；bang for your buck指花钱得到的回报。','从核心原则转向书中的实用建议。',['to help','as well as'],['misreading'],['is packed with','as well as','bang for your buck']],
['看来，如果人们能缩短上班通勤时间、多陪朋友和家人、少看电视，往往会过得更幸福；普通美国人一年看电视竟耗去两个月，却几乎没有因此更快乐。','less of it里的it指时间；括号评价用whopping和hardly，显出作者对大量看电视的批评。','举出时间分配建议，并提供第22题的态度证据。',['if they could','spend more time','(something'],['answer-evidence','reference-or-scope'],['better off']],
['买礼物或捐款行善，往往比为自己买东西更令人愉快；而奢侈品适度、偶尔享用时，最能让人快乐。','than比较为他人和为自己消费；sparingly是少量、有节制，不能译成尽情大量消费。','补充利他消费与稀缺享用两条原则。',['than purchasing','and luxuries','when they'],['answer-evidence'],[]],
['这显然也是麦当劳限制其热门麦肋猪排堡供应的原因：这种营销手法让这个猪肉三明治成了人们痴迷追逐的对象。','This回指前句适度、稀少享用更愉快；破折号解释限量供应的营销效果。','用McRib例子说明稀缺性增加愉悦，而非泛谈营销。',['McDonald\'s restricts','a marketing trick'],['answer-evidence','reference-or-scope'],['turned the pork sandwich into']],
['《快乐金钱》的读者显然是一群生活优裕的人，操心的是满足感，而不是能否填饱肚子。','lot指一群人；not hunger限定受众，提醒基本生活需求与更高满足不同。','承认这本书的受众和讨论范围。',['anxious about'],['reference-or-scope'],[]],
['钱也许不能完全买来幸福，但富裕国家的人总体上比贫穷国家的人更幸福。','may not quite保留余地；those代指people，不是国家。','承认财富水平与幸福感的总体联系。',['but people'],[],[]],
['不过，在世界各地的富人与穷人中，都能看到为他人花钱与心情愉快之间的联系；对多数人来说，稀缺也能增强多数事物带来的愉悦。','Yet把讨论从富裕受众扩展到跨贫富规律；most是多数，不能扩大成一切人和事。','说明利他与稀缺两条原则的广泛适用性。',['can be seen','and scarcity'],['answer-evidence'],['between feeling good and spending money on others']],
['并非每个人都会赞同两位作者的政策主张，这些主张从强制增加休假时间，到减少美国购房者的税收优惠，不一而足。','Not everyone是并非所有人；which修饰policy ideas，政策分歧不等于整本书没有价值。','承认对具体政策可能有保留。',['which range'],['reference-or-scope'],['range from mandating more holiday time to reducing tax incentives']],
['但多数人读完这本书后，仍会觉得这笔钱花得很值。','But给出最终评价；money well spent指买书的钱花得值得，不是宣称所有政策正确。','以积极书评收束全文，直接支持第24题。',['believing'],['answer-evidence','main-line'],[]],
];
export const sentences = texts.map((text,i) => {const [natural,obstacle,logic,starts,keyReasons,phrases]=rows[i];return createV2Sentence({id:`2014-p1-s${i+1}`,number:i+1,text,natural,logic,phrases,quickReading:{blocks:reviewedBlocks(text,starts),obstacle,keyReasons}});});
sentences[2].grammarPatches=[{explanation:'这是一种委婉推荐：读这本书至少不失为好选择。',relation:'could do worse than连接read，不能按字面理解成“读书更糟”。',term:'情态表达与习语',transferRule:'could do worse than + 动词原形，常用于提出温和建议；须结合语气判断。'}];
sentences[10].grammarPatches=[{explanation:'先抓三项建议，再看括号里对美国人看电视习惯的评论。',relation:'shorten、spend more和省略spend的less并列；something指看电视，it在括号末回指这项活动。',term:'并列省略与补充说明',transferRule:'并列结构缺少重复动词时，补回共同动词再判断宾语；括号内容往往携带作者态度。'}];
sentences[16].grammarPatches=[{explanation:'有人不赞同，不等于大家都不赞同。',relation:'not否定everyone所表达的全体，后面But仍给出总体肯定。',term:'部分否定',transferRule:'not everyone / not all通常译为“并非所有”，不能与no one互换。'}];
export const paragraphs=paragraphNumbers.map((ns,i)=>({id:`2014-p1-para${i+1}`,sentenceIds:ns.map(n=>`2014-p1-s${n}`)}));
export const guide:ArticleGuide={mainIdea:'本文评介《快乐金钱》，说明通过体验、与他人联结、利他消费和适度享用，让花出去的钱带来更持久的幸福。',route:['中奖引入书评','比较物质购买与体验','列举提高幸福回报的方法','承认限制后肯定书的价值'],paragraphs:[{paragraphId:paragraphs[0].id,title:'用巨奖引入',summary:'中奖者如何花钱，引出《快乐金钱》。',relation:'设置问题并推荐阅读。'},{paragraphId:paragraphs[1].id,title:'体验比物质更持久',summary:'物质满足易消退；体验会转为记忆与人际联系。',relation:'提出核心对比。'},{paragraphId:paragraphs[2].id,title:'花钱与用时间的建议',summary:'少通勤和看电视、多陪亲友，利他消费并适度享用奢侈品。',relation:'展开可操作的具体原则。'},{paragraphId:paragraphs[3].id,title:'有保留的肯定',summary:'承认受众和政策限制，但认为书值得买。',relation:'补充适用范围并给出书评结论。'}],references:[{sentenceId:'2014-p1-s13',expression:'This',referent:'奢侈品适度、稀少享用时更愉快这一规律',targetSentenceIds:['2014-p1-s12'],explanation:'限量供应例子服务于稀缺提升快乐的论点。'},{sentenceId:'2014-p1-s15',expression:'those',referent:'people',targetSentenceIds:['2014-p1-s15'],explanation:'比较的是两类国家中的人，而不是把人与国家比较。'}],timeline:[],sentenceRoles:Object.fromEntries(sentences.map(s=>[s.id,s.logic]))};
