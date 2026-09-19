import type { SentenceWordContext } from './contextual-vocabulary';
import type { WordKnowledge } from './knowledge-base';
type Context=SentenceWordContext & {pattern:string;patternMeaning:string};
const w=(partOfSpeech:string,contextualMeaning:string,pattern:string,patternMeaning:string,use:string):Context=>({partOfSpeech,contextualMeaning,pattern,patternMeaning,use,preferredCollocations:[pattern]});
export const passage2011P3SourceContexts:Record<string,Record<string,Context>>={
'2011-p3-s1':{
 we:w('pron.','我们（一般读者）','We tend to think','我们往往认为','主句主语we引出普遍的战后印象，with中的soldiers另为三个分词的共同主体。'),
 to:w('infinitive marker / prep.','不定式标记；去向','to think / to college','认为／去上大学','to think补足tend；to college给going off的去向，两处按所接词区分。'),
 of:w('prep.','对……；……的','think of the decades / a time of prosperity','想到那些年代／繁荣时期','think of引思考对象；time of引时代特征，不能把两处都作所属。'),
 as:w('prep.','作为；看作','as a time of prosperity and growth','看作繁荣发展的时期','与think of合成think of A as B评价结构，B评价战后几十年。'),
 and:w('conj.','和；并且','prosperity and growth / going off ... and lining up','繁荣和发展／去上大学并排队','第一处并列时代特征；第二处连接going与lining，均以soldiers为逻辑主语。'),
 with:w('prep.','伴随着（引独立结构）','with soldiers returning home','伴随着士兵返乡','with后soldiers是returning、going、lining三个并列分词的共同逻辑主语。'),
 by:w('prep.','按……规模；成群地','by the millions','数以百万计地','by the加复数大数表示数量规模，修饰返乡，不是被动施事。'),
 off:w('particle','离开；前往（go off）','going off to college','离家去上大学','off与going构成出发前往的意思，to college给去向。'),
 on:w('prep.','借助……资助','on the G. I. Bill','借助退伍军人法案的资助','on引上大学所凭借的资助安排，不是空间在法案之上。'),
 up:w('particle','组成line up排队','lining up at the marriage bureaus','在婚姻登记处排队','up与lining整体作排队，at给地点；与returning、going并列。'),
 at:w('prep.','在','at the marriage bureaus','在婚姻登记处','at引lining up的地点，不是任职机构。'),
 i:w('abbreviation part','G. I.缩写中的字母','G. I. Bill','退伍军人法案','与G.和Bill组成法案名称，不是第一人称代词我。'),
},
'2011-p3-s2':{
 but:w('conj.','但是','But when it came to their houses','但是谈到他们的住宅','从繁荣增长的时代印象转向住宅方面的节制。'),
 when:w('conj.（话题习语）','当谈到；说起','when it came to their houses','说到他们的住宅','整组引话题范围，came保留过去时，不是具体到达住宅的时间。'),
 it:w('pron.','习语形式主语；那个战后时期','it came to their houses / it was a time','谈及住宅／那是一个时期','第一处it组成when it came to；第二处it回指战后时期，两者作用不同。'),
 come:w('v.（过去式）','谈及（when it comes to）','came to their houses','谈到他们的住宅','与when it和介词to组成话题习语，houses为话题对象。'),
 to:w('prep.','关于（when it comes to）','came to their houses','谈及他们的住宅','to后为名词houses，不能按不定式标记理解。'),
 their:w('possessive det.','他们的（美国人的）','their houses','他们的住宅','承接前文战后人们的生活，限定houses。'),
 be:w('linking v.','是；可呈现','it was a time / less could truly be more','那是一个时期／少确实可以胜过多','was连接时代与特征；be在信念内容中连接less与more，均为系表。'),
 of:w('prep.','以……为特征的','a time of common sense and a belief','常识与一种信念主导的时期','of后并列common sense与a belief，说明时代取向。'),
 and:w('conj.','和','common sense and a belief','常识与一种信念','连接of后的两个名词项，that从句只说明belief内容。'),
 that:w('conj.','引出信念内容','a belief that less could truly be more','少可以胜过多的信念','that后命题完整，不作从句主宾语。'),
 less:w('pron.（比较数量）','较少的投入或装饰','less could truly be more','少而精可以胜过多','less作信念从句主语，more指更强效果；具体装饰条件在后文说明。'),
 can:w('modal v.（could）','可以；可能','could truly be more','确实可以胜过多','could接be原形，表设计理念的可能效果，不表示数量逻辑相等。'),
 more:w('pron.（比较程度）','更强的效果','less could truly be more','少可以产生更强效果','more在be后作表语，与less形成设计理念的表达。'),
},
'2011-p3-s3':{
 during:w('prep.','在……期间','During the Depression and the war','在大萧条与战争期间','时间状语修饰had learned，先于战后的住宅风格。'),
 and:w('conj.','和；并且','the Depression and the war / and that restraint','大萧条与战争／而那种节制','第一处并列时期；第二处连接学习节制与形成住宅风格两个主谓分句。'),
 american:w('n.（复数）','美国人','Americans had learned','美国人已经学会','Americans为名词复数主语；这里不是修饰建筑的形容词。'),
 have:w('aux.（had）','过去完成时标记','had learned to live with less','已经学会用更少的资源生活','had与learned组成过去完成时，说明战前战时形成的经验。'),
 to:w('infinitive marker','不定式标记','to live with less','用更少资源生活','to live补足learned所学内容，逻辑主语Americans。'),
 with:w('prep.','依靠；与……结合','live with less / in combination with confidence','靠更少资源生活／与信心结合','前者引可支配资源，后者引与restraint共同起作用的confidence。'),
 less:w('pron.','较少的物质资源','live with less','靠更少的资源生活','less作with宾语，说明战时生活条件与学会节制的背景。'),
 that:w('det.','那种','that restraint','那种节制','限定restraint并回指live with less形成的生活取向，不引从句。'),
 in:w('prep.','在结合中；对','in combination with / confidence in the future','与……结合／对未来的信心','前者构成共同因素状语；后者限定confidence的对象。'),
 make:w('v.（过去式）','使……变得','made small, efficient housing positively stylish','使小而实用的住房十分时髦','housing作宾语，stylish作宾补；small与efficient先限定housing。'),
},
'2011-p3-s4':{
 be:w('linking v.（was）','是','was only a stimulus','只是一个促成因素','was接名词表语stimulus；only限定经济因素的解释力。'),
 only:w('adv.','仅仅；只是','only a stimulus','只是一个促成因素','不把经济条件扩为唯一来源，后文将补充设计理念。'),
 for:w('prep.','对……的','a stimulus for the trend','促成该趋势的因素','for引stimulus所推动的趋势，不表持续时间。'),
 toward:w('prep.','朝向；趋向','the trend toward efficient living','趋向高效生活的趋势','toward后为动名词living，给出趋势方向。'),
 live:w('v.-ing（动名词）','生活','efficient living','高效务实的生活','living在toward后作名词性中心，efficient修饰生活方式。'),
},
'2011-p3-s5':{
 less:w('pron.','较少的装饰','less is more','少即是多','引号内less作格言主语；格言整体同位说明phrase。'),
 be:w('linking v.（is） / aux.（was）','是；被动标记','less is more / was popularized','少即是多／得到推广','is是引述格言的系动词，was与popularized构成主句被动。'),
 more:w('pron.','更强的效果','less is more','少而精产生更强效果','引述格言的表语，后文以装饰量与表现力分别展开。'),
 first:w('adv.','首先；最早','first popularized by a German','最早由一位德国人推广','限定popularized发生次序，不能据此推断创办Bauhaus。'),
 by:w('prep.','由','popularized by a German','由一位德国人推广','by给被动popularized的施事；后面姓名同位说明此人。'),
 who:w('relative pron.','他（密斯）','who ... emigrated ... and took up posts','他移居并任职','who回指Mies，在同一关系从句中兼作emigrated和took up的主语。'),
 like:w('prep.','像……一样','like other people associated with the Bauhaus','像其他与包豪斯有关的人一样','插入关系从句的比较背景，后接名词people，不是谓语喜欢。'),
 other:w('det.','其他的','other people associated with the Bauhaus','其他与包豪斯有关的人','限定people，associated是其后置分词定语。'),
 with:w('prep.','与……有关','associated with the Bauhaus','与包豪斯有关','with引associated的联系对象，不能推出创办关系。'),
 of:w('prep.','……领域的','a school of design','一所设计学校','限定school领域，整体同位说明Bauhaus。'),
 to:w('prep.','到','emigrated to the United States','移居美国','to给emigrated的目的地，后接国家名称。'),
 before:w('prep.','在……之前','before World War II','在第二次世界大战之前','后为事件名词作时间界点，不引有限从句。'),
 and:w('conj.','并且','emigrated ... and took up posts','移居并任职','连接关系从句中两个共用who的谓语，不另起主句。'),
 take:w('v.（过去式took）','开始担任（take up）','took up posts','开始任职','took up接posts岗位，at后补充任职机构。'),
 up:w('particle','开始担任（take up）','took up posts','开始任职','与took构成任职短语，不能把up独立作方向向上。'),
 at:w('prep.','在','at American architecture schools','在美国建筑院校','限定took up posts发生的机构。'),
 american:w('adj.','美国的','American architecture schools','美国建筑院校','修饰architecture schools，说明任职机构国别。'),
},
'2011-p3-s6':{
 these:w('det.','这些','These designers','这些设计师','回指上句移居美国并在建筑院校任职的设计师。'),
 come:w('v.（过去式）','逐渐；后来开始','came to exert enormous influence','后来产生了巨大影响','come to do表逐步发展到某种状态，不表示空间来到。'),
 to:w('infinitive marker','不定式标记','to exert enormous influence','产生巨大影响','补足came，说明设计师后来形成的作用。'),
 on:w('prep.','对','influence on the course','对发展进程的影响','on引influence的作用对象，后面of进一步限定进程所属领域。'),
 of:w('prep.','……的','the course of American architecture','美国建筑的发展进程','of限定course为建筑发展，不是课程。'),
 american:w('adj.','美国的','American architecture','美国建筑','限定受影响的建筑领域国别。'),
 but:w('conj.','但是','but none more so than Mies','但没有谁的影响比密斯更大','转折突出群体中影响最大的密斯，后项省略重复谓语。'),
 none:w('pron.','没有一位设计师','none more so than Mies','没有谁比密斯影响更大','none取these designers的范围，否定加比较突出密斯。'),
 more:w('adv.','更为；程度更高','none more so than Mies','无人比密斯更为如此','more修饰so所替代的发挥影响程度，不限定设计师人数。'),
 so:w('substitute adv.','如此（发挥影响）','none more so than Mies','没有谁比密斯影响更大','so代替exert enormous influence所表达的作用，后项省略有限谓语。'),
 than:w('conj.（比较标记）','比','than Mies','比密斯','给more的比较对象，同属前述设计师群体。'),
},
'2011-p3-s7':{
 that:w('conj.','引出格言含义','means that less decoration ... has more impact','意味着少装饰有更强效果','that引means的宾语内容，不在从句里充当主宾。'),
 less:w('det.','较少的','less decoration','较少的装饰','修饰不可数decoration，properly organized进一步限定组织得当这一条件。'),
 have:w('v.（has）','具有；产生','has more impact','产生更强效果','has为实义动词，宾语more impact，不是完成时助动词。'),
 more:w('det.','更强的；更多的','more impact than a lot','比大量装饰更强的效果','more限定impact表现力，a lot省略of decoration，两种数量维度要分开。'),
 than:w('conj.（比较标记）','比','than a lot','比大量装饰','a lot承接decoration，不把than后理解成更多效果。'),
},
'2011-p3-s8':{
 he:w('pron.','他（密斯）','he believed','密斯认为','插入的观点来源，主干为Elegance did not derive from abundance。'),
 do:w('aux.（did）','过去时否定助动词','did not derive','并不源自','did承担过去时，后面的derive保留原形。'),
 not:w('adv.','不','did not derive from abundance','并不源于大量堆砌','否定优雅的来源关系，不能漏译或移到believed。'),
 from:w('prep.','源自','derive from abundance','源于大量堆砌','from引derive的来源，本句did not否定该来源。'),
},
'2011-p3-s9':{
 like:w('prep.','像……一样','Like other modern architects','像其他现代建筑师一样','比较背景状语，主语he仍指密斯。'),
 other:w('det.','其他的','other modern architects','其他现代建筑师','把密斯置于现代建筑师群体中比较。'),
 he:w('pron.','他（密斯）','he employed metal, glass and laminated wood','密斯采用金属、玻璃和层压木材','主句施事是密斯，后面的we为今天的人们。'),
 and:w('conj.','和','metal, glass and laminated wood','金属、玻璃和层压木材','连接employed的三个材料宾语，破折号后materials概括三者。'),
 that:w('relative pron.','这些材料','that we take for granted / that ... symbolized the future','今天习以为常／当年象征未来的材料','两个关系词都回指materials；前者作take的宾语，后者作symbolized的主语。'),
 we:w('pron.','我们（今天的人们）','we take for granted today','我们如今习以为常','从句主语we与主句he不同，today对照1940s。'),
 take:w('v.','视为寻常（take for granted）','take for granted','习以为常','宾语关系代词that已前置，for granted为宾补。'),
 for:w('prep.（固定搭配组成）','视为（take for granted）','take for granted','视为当然；习以为常','与granted共同作take的补充成分，不表示为了获批。'),
 grant:w('past participle（固定搭配组成）','理所当然的','take for granted','把……视为寻常','granted在习语中作宾补，指对材料习以为常。'),
 but:w('conj.','但是','but that in the 1940s symbolized the future','但在1940年代象征未来','连接两个平行定语从句，转折今天与当年的感受。'),
 in:w('prep.','在……年代','in the 1940s','在20世纪40年代','时间状语修饰symbolized，不能移到today。'),
 '1940s':w('time expression','20世纪40年代','in the 1940s','在20世纪40年代','以年代为时间背景，对照今天对材料习以为常。'),
},
'2011-p3-s10':{
 that:w('conj.','引出事实内容','the fact that the spaces ... were small and efficient','空间小而高效的事实','that引同位内容，spaces后he designed另为省略关系词的定语从句。'),
 he:w('pron.','他（密斯）','the spaces he designed','密斯设计的空间','he是内层designed主语，spaces是该动作省略的宾语。'),
 design:w('v.（过去式）','设计','the spaces he designed','他所设计的空间','designed为定语从句谓语，宾语与先行词spaces相同而省略。'),
 be:w('linking v.（were）','是；呈现','were small and efficient','是小而高效的','were连接spaces与并列表语，rather than后给被排除的描述。'),
 and:w('conj.','和；且','small and efficient / big and often empty','小而高效／宽大且常常空洞','各自连接两项平行表语，不能把efficient并列为新主句。'),
 rather:w('adv.（连接结构组成）','而不是','rather than big and often empty','而不是宽大且常常空洞','与than引与small and efficient平行的另一组描述，表取舍。'),
 than:w('conj.（rather than组成）','而不是','rather than big and often empty','而不是大而常空','than此处随rather表达取舍，不是比较级标记。'),
 often:w('adv.','常常','often empty','常常空洞','限定empty的出现频率，不修饰外层masked。'),
},
'2011-p3-s11':{
 in:w('prep.','在……里面','apartments in the elegant towers / those in their older neighbors','塔楼内的公寓／邻近旧楼内的公寓','两处in分别限定同类比较两端的公寓所在建筑。'),
 on:w('prep.','在……街道上','on Chicago\'s Lake Shore Drive','在芝加哥湖滨大道上','给Mies built的地点，Drive为道路专名。'),
 for:w('prep.（习语组成）','例如','for example','例如','插入举例标记，整句用芝加哥公寓说明小而高效。'),
 be:w('linking v.（were）','是；显得','were smaller','面积更小','were连接apartments与比较级smaller，比较对象为those。'),
 small:w('adj.（比较级smaller）','更小的','were smaller than those','比那些公寓更小','smaller比较公寓面积，破折号内给具体面积上限。'),
 under:w('prep.','不到；小于','under 1,000 square feet','不足一千平方英尺','限定住宅单元总面积，不能理解为每间卧室面积。'),
 than:w('conj.（比较标记）','比','than those in their older neighbors','比邻近旧楼中的那些公寓','接与apartments同类的替代词those，非比较整栋楼。'),
 those:w('demonstrative pron.','那些公寓','those in their older neighbors','邻近老楼中的公寓','替代apartments，in短语限定位置。'),
 their:w('possessive det.','这些新塔楼的','their older neighbors','这些塔楼附近更老的建筑','their对应新塔楼，neighbors借指相邻建筑，不指住户年龄。'),
},
'2011-p3-s12':{
 but:w('conj.','但是','But they were popular','但这些公寓很受欢迎','转折面积较小不妨碍受欢迎，后接具体原因。'),
 they:w('pron.','它们（这些公寓）','they were popular / the views they afforded','公寓受欢迎／公寓提供的景观','两处they均指公寓；在第二处作afforded主语。'),
 be:w('linking v.（were）','是；处于','were popular','很受欢迎','were接形容词popular，不是被动助动词。'),
 because:w('prep. phrase part','因为（because of）','because of their airy glass walls','因为其通透的玻璃墙','because of后并列三个名词项，不引because有限从句。'),
 of:w('prep.','因为；……的；与……相应的','because of / elegance of the buildings / equivalent of the abstract art','因为／建筑的优雅／抽象艺术的对应物','分别组成原因介词短语、所属限定与对应关系；不能一律译成的。'),
 their:w('possessive det.','这些公寓的','their airy glass walls','这些公寓通透明亮的玻璃墙','回指they即公寓，限定第一项受欢迎的原因。'),
 and:w('conj.','和','the views ... and the elegance / details and proportions','景观与优雅／细节与比例','前者连接原因项，后者连接建筑审美构成的两个名词。'),
 so:w('adv.','如此；很','the abstract art so popular at the time','当时很流行的抽象艺术','so修饰popular，整组后置限定art；不是说材料当时普及。'),
 at:w('prep.','在……时','at the time','在当时','限定抽象艺术流行的时代，与第一段战后语境相连。'),
},
'2011-p3-s13':{
 toward:w('prep.','趋向','the trend toward "less"','趋向少而精的趋势','toward引趋势的方向，less被引号标为理念用词。'),
 less:w('nominalized comparison','更少；少而精','toward "less"','趋向少而精','在toward后作为被引用的理念名称，承接减少规模与装饰的设计取向。'),
 be:w('linking v.（was）','是；来自','was not entirely foreign','并非完全来自国外','was接foreign表语，not entirely限制否定范围。'),
 not:w('adv.','并非','not entirely foreign','并非完全是外来的','只否定完全外来，不否定已有外国设计师的作用。'),
},
'2011-p3-s14':{
 in:w('prep.','在……年代或时期','In the 1930s / in the 1890s and the early 20th century','在1930年代／在1890年代及20世纪初','前者修饰started，后者修饰had designed；比较赖特不同时期的住宅。'),
 '1930s':w('time expression','20世纪30年代','In the 1930s','在20世纪30年代','较晚阶段开始建造更适度高效住宅，对照早年的铺展式设计。'),
 more:w('adv.','更加','more modest and efficient houses','更适度、更高效的住宅','more共同限定modest和efficient，与早年houses比较。'),
 and:w('conj.','和','modest and efficient / the 1890s and the early 20th century','适度且高效／1890年代与20世纪初','分别并列形容词定语和较早设计时期。'),
 around:w('adv.','大约','around 1,200 square feet','约一千二百平方英尺','修饰面积数值，说明住宅大致规模，不表示环绕位置。'),
 than:w('conj.（比较标记）','比','than the spreading two-story ones','比铺展开来的两层住宅','与more呼应，ones替代houses，比较同一建筑师不同时期设计。'),
 one:w('pron.（复数ones）','那些住宅','the spreading two-story ones','那些铺展开来的两层住宅','ones替代houses，后面定语从句限定为他早年所设计的。'),
 he:w('pron.','他（赖特）','he had designed','赖特曾经设计','回指同句Frank Lloyd Wright，是过去完成时从句的主语。'),
 have:w('aux.（had）','过去完成时标记','had designed in the 1890s','在19世纪90年代曾设计','had与designed构成过去完成时，早于1930年代的started。'),
 design:w('v.（过去分词）','设计','ones he had designed','他先前设计的住宅','与had构成过去完成时；ones是省略关系词所代表的宾语。'),
 '1890s':w('time expression','19世纪90年代','in the 1890s','在19世纪90年代','赖特较早铺展式住宅的设计时期。'),
 twentieth:w('ordinal numeral','第二十（世纪）','the early 20th century','20世纪初','20th限定century，early说明世纪初，与1890s同属较早阶段。'),
},
'2011-p3-s15':{
 from:w('prep.','向……征集；由……提供','commissioned from talented modern architects','向有才华的现代建筑师委托设计','from引受托提供设计的建筑师，by另引发起委托的杂志。'),
 by:w('prep.','由','by California Arts & Architecture magazine','由《加利福尼亚艺术与建筑》杂志','by引commissioned的委托方，from architects为设计提供方。'),
 between:w('prep.','在……之间','between 1945 and 1962','在1945至1962年间','限定委托设计的时期，与and配对给起止年份。'),
 and:w('conj.','和（时间界点）','between 1945 and 1962','1945至1962年间','and连接between所需的两个时间界点。'),
 be:w('linking v.（were / is）','是','were yet another influence / less is more','又是一种影响／少即是多','were是主句系动词，is在引述理念内部；commissioned为非谓语修饰。'),
 yet:w('adv.','又；再','yet another homegrown influence','又一股本土影响','yet加强another的追加意味，承接赖特的本土先例。'),
 another:w('det.','又一个；另一个','another homegrown influence','又一个本土影响','限定influence，说明美国本土来源不只前段赖特一例。'),
 on:w('prep.','对……的','influence on the "less is more" trend','对少即是多趋势的影响','on引influence所作用的设计趋势。'),
 less:w('pron.','更少的装饰或规模','less is more','少而精胜过多','引述理念的主语，整句格言在trend前作名称说明。'),
 more:w('pron.','更强的效果','less is more','少而精产生更强效果','引述理念的表语，不能把它理解为住宅数量增加。'),
},
'2011-p3-s16':{
 come:w('v.（过去式）','来自','came from the landscape','来自景观','came from接审美效果的来源，不是人从某处抵达。'),
 from:w('prep.','来自','from the landscape, new materials and forthright detailing','来自景观、新材料和明快的细部处理','from统领三个并列来源，细节处理仍是效果来源之一。'),
 and:w('conj.','和','new materials and forthright detailing','新材料与明快的细部处理','连接from统领的后两项来源，与landscape一起并列。'),
},
'2011-p3-s17':{
 in:w('prep.','在……作品中','In his Case Study House','在他的案例住宅中','限定Rapson的预测与设计所体现的具体作品。'),
 his:w('possessive det.','他的（拉普森的）','his Case Study House / his belief','他的案例住宅／他的信念','两处his都对应Rapson，后者为转折后被认可的理念。'),
 may:w('modal v.','可能','may have mispredicted','可能预测失准','may加完成式对过去预测作可能性评价，不能译成确定失败。'),
 have:w('aux.','完成式标记','may have mispredicted','可能曾预测失准','have与mispredicted构成情态完成式，预测发生在过去。'),
 just:w('adv.','究竟；具体','just how the mechanical revolution would impact everyday life','机械革命究竟会怎样影响日常生活','加强嵌入疑问how的具体方式，不是just now刚才。'),
 how:w('interrogative adv.','怎样','how the mechanical revolution would impact everyday life','机械革命将如何影响日常生活','引mispredicted的宾语内容，内部用陈述语序。'),
 will:w('modal v.（would）','将会（过去视角）','would impact everyday life','将会影响日常生活','would从过去的预测时点展望后来的生活变化。'),
 few:w('det.','几乎没有几个','few American families acquired helicopters','几乎没有美国家庭购买直升机','few带否定意味，对照多数家庭得到干衣机。'),
 american:w('adj.','美国的','American families','美国家庭','修饰families，few限定数量，后面的most仍指这一群体。'),
 though:w('conj.','虽然；尽管','though most eventually got clothes dryers','尽管大多数家庭最终有了干衣机','引让步分句，对照直升机预测与普及的日常设备。'),
 most:w('pron.','大多数美国家庭','most eventually got clothes dryers','多数家庭最终有了干衣机','most省略American families，作got的主语，不修饰eventually。'),
 but:w('conj.','但是','but his belief ... was widely shared','但他的信念广受认可','主层转折技术预测可能失准与自给自足信念获认同，两侧完整主谓。'),
 that:w('conj.','引出信念内容','his belief that self-sufficiency was both desirable and inevitable','自给自足既可取又不可避免的信念','that从句说明belief内容，不作内层主语。'),
 be:w('linking v. / aux.（was）','是；被动标记','self-sufficiency was ... / belief ... was widely shared','自给自足是……／信念广受认可','内层was连接两个形容词表语；外层was与shared组成被动谓语。'),
 both:w('correlative marker','既……又……','both desirable and inevitable','既值得向往又不可避免','both与and连接两个形容词，共同评价self-sufficiency。'),
 and:w('conj.','又；并且','both desirable and inevitable','既可取又不可避免','与both配对，保留信念中的双重判断。'),
},
};
const add=(id:string,words:Record<string,Context>)=>{passage2011P3SourceContexts[id]={...passage2011P3SourceContexts[id],...words};};
add('question-201131-prompt',{
 american:w('adj. / possessive n.（Americans\'）','美国的；美国人的','American housing style / the Americans\'','美国住宅风格／美国人的……','前者修饰housing，后者是复数名词所有格，题目问风格反映的心理取向。'),
});
add('question-201131-option-A',{and:w('conj.','和','prosperity and growth','繁荣与发展','并列两项时代景象，是否解释住宅风格需定位正文。')});
add('question-201131-option-B',{and:w('conj.','和','efficiency and practicality','效率与实用性','并列两项性质，题目要求区分住宅特点与背后的心理因素。')});
add('question-201131-option-C',{and:w('conj.','和','restraint and confidence','节制与信心','并列两项心理因素，接在题干所有格Americans\'之后。')});
add('question-201131-option-D',{and:w('conj.','和','pride and faithfulness','自豪与忠诚','并列两个抽象名词，不能仅因属于正面品质就确认。')});
add('question-201132-prompt',{
 which:w('interrogative pron.','哪一项','Which of the following','下列哪一项','which为主语中心，of短语限定从给定选项中选择。'),
 of:w('prep.','……中的','Which of the following','下列各项中的哪一项','部分与整体关系，following在the后名词化指下面的选项。'),
 follow:w('nominalized adj.','下列各项','the following','下列选项','following被the限定作名词性整体，不是紧随年代的分词定语。'),
 can:w('modal v.','能够；可以','can be inferred','可以推断出','can接被动式，要求结论受原文支持而非外部常识。'),
 be:w('aux.','被动标记','be inferred from Paragraph 3','从第三段推断出来','be与inferred组成被动，主语Which为推断内容。'),
 from:w('prep.','从……中','from Paragraph 3','从第三段中','给出证据范围，不能任意改用另一段或外部知识。'),
 about:w('prep.','关于','about the Bauhaus','关于包豪斯','限定推断主题为该设计学校或学派。'),
});
add('question-201132-option-A',{
 it:w('pron.','它（包豪斯）','It was founded','包豪斯由……创办','it承接题干Bauhaus，was founded是该机构的被动动作。'),
 be:w('aux.（was）','过去时被动标记','was founded by Ludwig Mies van der Rohe','由密斯创办','was与founded构成被动，by引所声称的创办者。'),
 by:w('prep.','由','by Ludwig Mies van der Rohe','由密斯·凡·德·罗','引选项声称的创办者，任职或有关联不自动证明创办。'),
});
add('question-201132-option-B',{
 its:w('possessive det.','它的（包豪斯的）','Its designing concept','包豪斯的设计理念','限定concept，题目语境的所属者为Bauhaus。'),
 design:w('v.-ing（名词性定语）','设计（活动）','designing concept','设计理念','designing在concept前限定理念内容，不构成进行时谓语。'),
 be:w('aux.（was）','过去时被动标记','was affected by World War II','受二战影响','was与affected构成被动，须检查原文有无这一因果。'),
 by:w('prep.','受……作用','by World War II','受第二次世界大战作用','给affected的影响来源，不能从时间相邻推成因果。'),
});
add('question-201132-option-C',{
 most:w('det.','大多数','Most American architects','大多数美国建筑师','most限定architects数量，是否达到大多数需证据支持。'),
 american:w('adj.','美国的','American architects','美国建筑师','修饰architects，不应和移居美国的部分设计师直接等同。'),
 use:w('past-habit marker（used）','过去曾经','used to be associated','过去曾有关联','used to加原形be表示以往状态，不是使用某物。'),
 to:w('infinitive marker','不定式标记','used to be associated with it','过去曾与它有关联','to接be原形构成used to，不能当作引关联对象的介词。'),
 be:w('aux. / linking v.','处于有关联的状态','be associated with it','与包豪斯有关联','be与associated组成状态表达，with引关联对象。'),
 with:w('prep.','与','associated with it','与包豪斯有关联','with后的it指学校，不能倒置谁与谁有关联的数量范围。'),
 it:w('pron.','它（包豪斯）','associated with it','与包豪斯有关联','作with宾语，承接题干学校名称。'),
});
add('question-201132-option-D',{
 it:w('pron.','它（包豪斯）','It had a great influence','包豪斯产生巨大影响','it指题干Bauhaus，influence对象为美国建筑。'),
 have:w('v.（had）','具有；产生','had a great influence','产生巨大影响','had为实义过去式，接名词宾语，不构成过去完成时。'),
 upon:w('prep.','对','influence upon American architecture','对美国建筑的影响','upon给influence的作用对象，可与on表达同一关系。'),
 american:w('adj.','美国的','American architecture','美国建筑','限定受影响的建筑领域，不把原文扩大到每一位建筑师。'),
});
add('question-201133-prompt',{
 that:w('conj.','引出密斯的看法','held that elegance of architectural design','认为建筑设计的优雅……','that引held的宾语内容，elegance为内层主语中心，选项补谓语。'),
 of:w('prep.','……的','elegance of architectural design','建筑设计的优雅','of限定elegance的所属领域，不是derive from的来源关系。'),
 design:w('n.','设计','architectural design','建筑设计','在of后与architectural组成名词短语，不是动作谓语。'),
});
add('question-201133-option-A',{
 be:w('linking v.（was）','具有……关系','was related to large space','与大空间有关','was related to描述所声称的关联，补接题干elegance。'),
 to:w('prep.','与','related to large space','与大空间有关','related to后接名词space，不是不定式。'),
});
add('question-201133-option-B',{
 be:w('aux.（was）','被动标记','was identified with emptiness','被等同于空旷','was与identified构成被动表达，题干优雅被声称等同于空洞。'),
 with:w('prep.','与……等同','identified with emptiness','与空洞等同','with引identify A with B中的B，不表示住宅材料。'),
});
add('question-201133-option-C',{
 be:w('linking v.（was）','是；处于','was not reliant on abundant decoration','不依赖大量装饰','was连接reliant形容词表语，not否定依赖关系。'),
 not:w('adv.','不','not reliant on abundant decoration','不依赖大量装饰','否定依赖大量装饰，不等于不需要任何设计。'),
 on:w('prep.','依赖于','reliant on abundant decoration','依赖大量装饰','reliant固定接on引依赖对象。'),
});
add('question-201133-option-D',{
 be:w('aux. / linking v.（was）','处于有关联状态','was not associated with efficiency','与实用高效无关','was associated with表示关联，not否定；是否符合密斯观点需证据。'),
 not:w('adv.','不','not associated with efficiency','与高效实用无关','选项否定关联关系，与正文small and efficient需分别核对。'),
 with:w('prep.','与','associated with efficiency','与高效实用有关','引关联对象efficiency，不是耗材或伴随动作。'),
});
add('question-201134-prompt',{
 what:w('interrogative pron.','什么情况；哪种说法','What is true','什么说法属实','what为疑问主语，is为系动词，无do助动词。'),
 be:w('linking v.（is）','是','What is true','哪种说法是真的','连接疑问主语what与形容词true。'),
 about:w('prep.','关于','about the apartments','关于这些公寓','限定待核实的对象，后置关系从句再限定是哪批公寓。'),
 on:w('prep.','在……街道上','on Chicago\'s Lake Shore Drive','在芝加哥湖滨大道上','给公寓建造的地点，Drive为专名的道路类型。'),
});
add('question-201134-option-A',{
 they:w('pron.','它们（这些公寓）','They ignored details and proportions','这些公寓忽视细节与比例','承接题干apartments，选项以建筑代指设计处理。'),
 and:w('conj.','和','details and proportions','细节与比例','并列ignored的两个宾语，核对原文是重视还是忽略。'),
});
add('question-201134-option-B',{
 they:w('pron.','它们（这些公寓）','They were built','这些公寓被建造','指题干apartments，在被动结构中为建造对象。'),
 be:w('aux.（were）','被动标记','were built with materials','用材料建成','were与built构成被动，with引材料。'),
 build:w('v.（过去分词built）','建造','were built with materials','用材料建造','built与were构成被动谓语，不是正文Mies built中的主动过去式。'),
 with:w('prep.','用；以……为材料','with materials popular at that time','用当时流行的材料','with引建材，popular短语后置修饰materials，是选项的限定。'),
 at:w('prep.','在……时候','at that time','在那个时候','限定popular所指时代，不能把正文art的修饰语移给materials。'),
 that:w('det.','那个','that time','那个时期','that限定time，不引定语或内容从句。'),
});
add('question-201134-option-C',{
 they:w('pron.','它们（这些公寓）','They were more spacious','这些公寓更宽敞','指题干apartments，为比较主语。'),
 be:w('linking v.（were）','是；显得','were more spacious','更加宽敞','were连接比较级形容词表语，后接than比较对象。'),
 more:w('adv.','更加','more spacious','更加宽敞','more与spacious组成比较级，不表示公寓数量更多。'),
 than:w('conj.（比较标记）','比','than neighboring buildings','比附近建筑','给出选项的比较对象，同时需核对正文面积比较方向。'),
});
add('question-201134-option-D',{
 they:w('pron.','它们（这些公寓）','They shared some characteristics','这些公寓具有一些共同特征','指题干公寓，shared接特征宾语而非分享动作的物品。'),
 some:w('det.','一些','some characteristics','一些特征','限定共同特征的部分数量，不主张建筑与艺术完全相同。'),
 of:w('prep.','……的','characteristics of abstract art','抽象艺术的特征','说明这些共同特征来自比较对象抽象艺术。'),
});
add('question-201135-prompt',{
 what:w('interrogative pron.','什么','What can we learn','我们可以得知什么','what是learn的前置疑问宾语；we才是主语，can在主语前。'),
 can:w('modal v.','可以；能够','can we learn','我们能了解到','疑问句中can置于we前，learn用原形。'),
 we:w('pron.','我们（读者）','we learn about the design','读者了解设计','主语we指作答读者，所学结论必须来自正文。'),
 about:w('prep.','关于','about the design','关于该设计','限定learn的讨论主题，不是给建造地点。'),
 of:w('prep.','……的','the design of the "Case Study Houses"','案例住宅的设计','of限定设计属于文末的案例住宅项目。'),
 design:w('n.','设计','the design of the "Case Study Houses"','案例住宅设计','在the后作名词，of短语给设计对象。'),
});
add('question-201135-option-A',{
 be:w('aux.（were）','被动标记','were widely used','被广泛使用','were与used构成被动，widely说明选项声称的普及程度。'),
 use:w('v.（过去分词used）','使用','Mechanical devices were widely used','机械装置得到广泛使用','used为被动谓语分词，不是used to过去曾经结构。'),
});
add('question-201135-option-B',{
 be:w('aux.（were）','被动标记','were taken into consideration','被纳入考虑','were与taken组成被动，主语Natural scenes为被考虑对象。'),
 take:w('v.（过去分词taken）','纳入（take into consideration）','taken into consideration','被纳入考虑','take A into consideration表示考虑A，被动中A提升为主语。'),
 into:w('prep.（固定搭配组成）','纳入','into consideration','纳入考虑','与taken构成考虑某事的整体表达，不表示实际进入地点。'),
});
add('question-201135-option-C',{
 be:w('aux.（were）','被动标记','were sacrificed for the overall effect','为整体效果而被牺牲','were与sacrificed构成被动，Details为受损对象。'),
 for:w('prep.','为了','for the overall effect','为了整体效果','引牺牲细节的目的；需核对正文是否支持这一取舍。'),
});
add('question-201135-option-D',{
 be:w('aux.（were）','被动标记','were employed','被采用','were与employed构成被动，主语为选项声称的环保材料。'),
});
add('2011-p3-s5',{design:w('n.','设计','a school of design','一所设计学校','design在of后作领域名词，school整体同位说明Bauhaus。')});
add('2011-p3-s11',{build:w('v.（过去式built）','建造','towers Mies built','密斯建造的塔楼','built为关系从句谓语，Mies为主语，省略的宾语关系词指towers。')});
add('2011-p3-s14',{build:w('v.-ing（动名词）','建造','started building more modest and efficient houses','开始建造更适度高效的住宅','building为start后的动名词宾语，仍接houses作自身的宾语。')});
add('2011-p3-s16',{material:w('n.（复数）','材料','new materials','新型材料','与景观、细部处理并列为美感来源；这里只给新型属性，未声称环保。')});
add('question-201131-prompt',{housing:w('n.（名词定语）','住宅','American housing style','美国住宅风格','housing在style前限定风格所属的建筑类别，整体为题干主语。')});
add('question-201132-option-C',{associate:w('past participle（状态表达）','有关联','used to be associated with it','过去曾与包豪斯有关联','associated接在be后，with it给关联对象，不能误标成修饰people的分词定语。')});
add('question-201133-prompt',{architectural:w('adj.','建筑的','architectural design','建筑设计','修饰名词design，二者在of后共同限定elegance。')});
add('question-201133-option-A',{space:w('n.','空间','large space','大空间','与large组成related to的关联对象，属于选项提出的观点。')});
add('question-201133-option-D',{associate:w('past participle（状态表达）','有关联','was not associated with efficiency','与效率没有关联','与was及with组成关联状态，not否定；接在题干elegance主语后。')});
add('question-201134-prompt',{build:w('v.（过去式built）','建造','the apartments Mies built','密斯建造的公寓','本题干中Mies built限定apartments，省略的关系词作built宾语。')});
add('question-201134-option-B',{
 material:w('n.（复数）','材料','materials popular at that time','当时流行的材料','materials是with宾语，后置popular短语是选项对这些材料的限定。'),
 popular:w('adj.','流行的；普遍使用的','materials popular at that time','当时流行的材料','这里popular后置修饰materials；是否成立需与正文材料的时代描述核对。'),
 time:w('n.','时期；时候','at that time','在那个时候','that time指所述公寓建造时期，不是a time of结构。'),
});
add('question-201134-option-C',{building:w('n.（复数）','建筑物','neighboring buildings','邻近建筑','作为than的比较对象，neighboring为前置定语。')});
add('question-201134-option-D',{share:w('v.（过去式shared）','共有；具有相同的','shared some characteristics of abstract art','具有抽象艺术的一些共同特点','shared为主动过去式，主语They，宾语some characteristics；不是be shared被动。')});
add('question-201135-option-A',{widely:w('adv.','广泛地','widely used','被广泛使用','修饰被动分词used，说明选项声称的机械设备普及程度。')});
add('question-201135-option-C',{
 detail:w('n.（复数）','细节；细部','Details were sacrificed','细部被舍弃','Details为选项被动句主语，核对正文forthright detailing是否支持牺牲细节。'),
 effect:w('n.','效果','the overall effect','整体效果','作for宾语，说明选项声称舍弃细节所追求的目的。'),
});
add('question-201135-option-D',{
 material:w('n.（复数）','材料','Eco-friendly materials','环保材料','本选项以Eco-friendly声称材料环保，正文new本身不含这一断言。'),
 employ:w('v.（过去分词employed）','采用；使用','materials were employed','材料被采用','employed与were构成被动谓语，主语为材料，环保属性另由前置定语给出。'),
});
// 所有映射逐来源人工填写，循环仅为已审核搭配建立可点击词组入口。
export const passage2011P3ContextGlosses:Record<string,{meaning:string;note:string}>={};
for(const words of Object.values(passage2011P3SourceContexts))for(const context of Object.values(words))passage2011P3ContextGlosses[context.pattern.toLowerCase()]={meaning:context.patternMeaning,note:context.use!};
export function getPassage2011P3SourceKnowledge(headword:string,sourceId?:string):WordKnowledge|undefined{
 const context=sourceId?passage2011P3SourceContexts[sourceId]?.[headword]:undefined;
 if(!context)return undefined;
 return{grammarRole:context.partOfSpeech!,grammarSummary:context.use!,structures:[{pattern:context.pattern,meaning:context.patternMeaning,rule:context.use!}]};
}
