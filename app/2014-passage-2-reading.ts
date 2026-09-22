import type {ArticleGuide} from './article-teaching';
import {createV2Sentence,type QuickReading} from './article-v2/model';
import {reviewedBlocks} from './2013-reading-helpers';
import {texts,paragraphNumbers} from './2014-passage-2-source';
const rows:Array<[string,string,string,string[],QuickReading['keyReasons'],string[]]>=[
['《科学美国人》的一篇文章指出，实证研究表明：其实，你认为自己比实际更漂亮。','两个that逐层引出报道和研究内容；than you are省略了beautiful。','引出自我评价偏高的现象。',['that empirical','you think'],['main-line','reference-or-scope'],['pointed out']],
['我们内心深处都需要自我感觉良好，也会自然而然地运用多种自我美化策略来实现这一点。','this回指feel good about ourselves；self-enhancing是改善自我评价，不是提高实际能力。','解释自我美化的心理动机。',['and we naturally'],[],['a number of']],
['社会心理学家已积累了大量关于所谓“高于平均效应”或“虚幻优越感”的研究，并发现，例如，70%的人认为自己的领导能力高于平均水平，93%认为自己的驾驶能力高于平均水平，85%认为自己与他人相处的能力高于平均水平——这些在统计上显然都不可能成立。','have统领amassed和shown；93%、85%后省略重复的rate ourselves as above average，末尾评价这些自我估计。','用夸高自评的数据支持第一段结论。',['and shown that','93%','– all'],['answer-evidence','nested-clause'],['oceans of','getting on well with others']],
['我们会给记忆蒙上美好的色彩，并把自己置于能肯定自我的情境中。','rose-tint是动词，指把过去美化；不是记忆本身变成粉色。','列举自我肯定策略。',['and put'],[],[]],
['受到批评时，我们会自我防卫，还会把负面的刻板印象套在别人身上，以增强自己的自尊。','when criticised省略we are；to boost说明对别人贴标签的目的。','继续说明维护自我形象的方法。',['and apply','to boost'],['attachment'],['apply negative stereotypes to others']],
['我们趾高气扬地走来走去，觉得自己了不起。','stalk在此指昂首阔步地走；hot stuff是口语“了不起的人”，不是热东西。','以带调侃的语气概括自视甚高。',['thinking'],['misreading'],['hot stuff']],
['心理学家兼行为科学家尼古拉斯·埃普利主持了一项研究自我美化与吸引力的重要研究。','Psychologist and behavioural scientist共同说明Epley的身份；oversaw是oversee的过去式。','引入具体实验。',[],[],[]],
['他没有仅让人们拿自己的美貌与别人比较打分，而是让他们从一排照片中找出自己的原始照片；这排照片还包括经过修改、显得更有吸引力或更缺乏吸引力的版本。','Rather than对比两种研究方法；including后的versions是改过的照片，不是不同受试者。','介绍用辨认照片检验自我美化的实验设计。',['he asked them','including versions'],['main-line','attachment'],['Rather than','compared with others']],
['研究报告写道，视觉辨认是“一种自动发生的心理过程，迅速而凭直觉完成，几乎没有、或完全没有明显的有意识思考”。','reads the study是插入语，意思是研究报告这样写；occurring说明过程如何发生。','直接界定第27题所问的视觉辨认。',[ 'is "an automatic','occurring rapidly'],['answer-evidence'],[]],
['如果受试者迅速选中了一张把自己美化得不真实的照片——多数人确实如此——他们是真心相信自己看起来就那样。','which most did回指选择美化照片；genuinely说明真信，不是明知有假还装作相信。','说明实验反映真实自我认知偏差。',['– which most did','they genuinely'],['inference-context','reference-or-scope'],[]],
['埃普利发现，回应中没有显著的性别差异。','significant在研究语境中指显著的；no否定存在明显性别差别。','先排除性别差异。',[],[],[]],
['也没有任何证据表明，那些自我美化最严重的人——即把美化程度最高的照片当成真实照片的受试者——是为了弥补内心深深的不安全感才这样做。','Nor引起倒装；that引出的内容受any evidence及否定统领，不能读成研究证实他们在补偿不安。','排除用深层不安全感解释自我美化。',['that those','(that is,','were doing so'],['answer-evidence','nested-clause','reference-or-scope'],['that is','make up for']],
['事实上，那些把吸引力等级更高的照片当成真实照片的人，恰好也是在其他指标上表现出较高自尊的人。','两处those都指人；higher up the attractiveness scale修饰images，corresponded连接两组受试者。','指出较高自尊与相信自身吸引力相联系。',['directly corresponded','with those'],['answer-evidence','main-line'],[]],
['埃普利说：“我不认为我们获得的这些发现是个人妄想的任何证据。”','I don\'t think将否定前移，理解为不认为发现能证明个人妄想。','避免把一般自我肯定直接说成精神错乱。',['says Epley'],['reference-or-scope'],[]],
['“这只是人们通常对自己评价较好的反映。”','of后面people是thinking的逻辑主体；think well of是评价好。','给实验发现一个日常心理解释。',[],[],['thinking well of themselves']],
['如果你情绪低落，你就不会这样美化自己。','depressed描述低落情绪；不能由此推出人们在掩盖抑郁。','补充情绪状态这一限制。',['you won\'t'],['reference-or-scope'],[]],
['了解埃普利的研究结果后，许多人本能地讨厌自己的照片就不难理解了——从某个层面上说，他们甚至认不出照片里的人就是自己。','viscerally说明讨厌是本能反应；破折号以认不出自己解释原因。','把实验结论用于解释日常看照片的反应。',['it makes sense','– on one level,'],['answer-evidence'],['makes sense','recognise the person in the picture as themselves']],
['因此，脸书成了自我美化者的天堂：人们可以只分享最能美化自己的照片，展示自己的机智、风格、美貌、才智和生活方式中最出色的部分。','only是关键限定；cream在此是精华、最佳部分，不是奶油。','说明社交平台允许选择性展示最美好的一面。',['where people','the cream'],['answer-evidence','misreading'],[]],
['威斯康星大学麦迪逊分校的卡塔利娜·托马说，这并不是说人们的个人资料不诚实，“而是它们描绘了人们理想化的自我版本”。','not that...but...否定造假解释，转而强调选择性理想化展示。','限定结论：美化呈现不等同于资料造假。',['says Catalina','"but they'],['answer-evidence','paragraph-turn'],[]],
];
export const sentences=texts.map((text,i)=>{const[natural,obstacle,logic,starts,keyReasons,phrases]=rows[i];return createV2Sentence({id:`2014-p2-s${i+1}`,number:i+1,text,natural,logic,phrases,quickReading:{blocks:reviewedBlocks(text,starts),obstacle,keyReasons}});});
sentences[11].grammarPatches=[{explanation:'先读“也没有证据”，再读它否定的整件事；括号只解释是哪类人。',relation:'Nor was there倒装；that引导evidence的内容从句，主语those后有who定语从句，谓语是were doing。',term:'否定词置首倒装与嵌套从句',transferRule:'否定词开头时先还原主句；插入说明结束后找回主语对应的谓语，保留否定范围。'}];
sentences[12].grammarPatches=[{explanation:'把两类人的限定分别读完整，才能看出他们是同一群人。',relation:'前一个those被who thought...限定，后一个those被who showed...限定；主干those corresponded with those。',term:'平行指代结构',transferRule:'those who...常指“那些……的人”；比较两组时不要把修饰照片的词误接到人身上。'}];
sentences[18].grammarPatches=[{explanation:'作者纠正的是对“天堂”的解释：可以只展示最好的一面，并不等于故意写假资料。',relation:'It\'s not that否定dishonest这一解释，but转到portray an idealised version。',term:'否定解释与转折',transferRule:'not that...but...先排除一个解释，再给出真正解释；不能只抓dishonest这个醒目的词。'}];
export const paragraphs=paragraphNumbers.map((ns,i)=>({id:`2014-p2-para${i+1}`,sentenceIds:ns.map(n=>`2014-p2-s${n}`)}));
export const guide:ArticleGuide={mainIdea:'人们往往对自己评价偏高；照片辨认实验显示这可以出于真诚的自我认知，社交平台则便利了理想化的自我呈现。',route:['提出自评偏高','列举自我肯定方法','用照片实验检验','解释实验与自尊关系','联系照片反感与社交平台'],paragraphs:[['自我评价高于现实','研究与比例说明虚幻优越感。','引出论题。'],['日常自我维护','美化记忆、贬低别人、觉得自己了不起。','列举现象。'],['照片辨认实验','迅速选中美化照片者真心相信那是自己。','用具体研究解释机制。'],['不是补偿不安全感','自我美化与较高自尊相联系。','排除误解并限定解释。'],['现实生活中的表现','讨厌真实照片，在社交平台挑选最好的形象。','将研究用于日常行为。']].map(([title,summary,relation],i)=>({paragraphId:paragraphs[i].id,title,summary,relation})),references:[{sentenceId:'2014-p2-s2',expression:'this',referent:'feel good about ourselves，即自我感觉良好',targetSentenceIds:['2014-p2-s2'],explanation:'achieve this指实现这种心理状态。'},{sentenceId:'2014-p2-s10',expression:'which most did',referent:'多数受试者迅速选择了不真实地美化自己的照片',targetSentenceIds:['2014-p2-s10'],explanation:'did代替前面的chose动作，不表示多数人故意撒谎。'},{sentenceId:'2014-p2-s19',expression:'they',referent:'people\'s profiles，即个人资料',targetSentenceIds:['2014-p2-s19'],explanation:'是个人资料描绘理想化形象。'}],timeline:[],sentenceRoles:Object.fromEntries(sentences.map(s=>[s.id,s.logic]))};
