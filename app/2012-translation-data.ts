import type { SentenceAnalysis, TranslationTask } from "./data";
import { clause, segment, sentenceFactory } from "./2011-content-helpers";
const sentence = sentenceFactory("2012-translation");
export const translation2012Sentences: SentenceAnalysis[] = [
  sentence(1, [
    segment("When people in developing countries worry about migration, ", "condition", "时间背景从句", "提供担忧出现的背景", "people为从句主语，in developing countries限定people", "when说明谈到人口迁移时的常见关切；migration泛指迁移，不先限定移入或移出。"),
    segment("they are usually concerned at the prospect ", "predicate", "主谓系表与频率副词", "主句及担忧的触发点", "they指发展中国家的人们", "concerned在此担忧，at引起担忧的前景，usually不是毫无例外。"),
    segment("of their best and brightest departure ", "modifier", "原卷有语法瑕疵的名词结构", "说明prospect的内容", "语义由下句workers及全文brain drain限定为优秀人才离开", "原卷写best and brightest departure，名词化的人才称谓与departure间缺规范所有格连接；保留原样，不伪称标准结构。依上下文理解人才离开，不向原文补字。"),
    segment("to Silicon Valley or to hospitals and universities in the developed world.", "modifier", "两组并列目的地介词短语", "修饰departure去向", "to Silicon Valley与to hospitals and universities并列", "in the developed world限定医院大学所在区域；developing与developed区分发展中与发达。"),
  ], "they are concerned at the prospect of departure.", "当发展中国家的人们担心人口迁移时，他们通常担忧的是：本国最优秀、最聪明的人才将离开，前往硅谷，或前往发达国家的医院和大学。", "发展中国家的人们谈到人口迁移，通常担心本国最优秀的人才流向硅谷，或发达国家的医院和大学。", "引入人才外流担忧。原卷best and brightest departure结构不规范；词面原样保留，译意由workers与brain drain上下文确定，不静默修补。", ["worry about migration", "concerned at the prospect", "developing countries", "the developed world"], [
    clause("When people in developing countries worry about migration", "时间背景状语从句", "When", "限定主句担忧的谈论场景", "people in developing countries", "worry", "about migration（担忧对象）", "先译发展中国家的人们谈到迁移时，再译具体担忧。"),
  ]),
  sentence(2, [
    segment("These are the kind of workers ", "predicate", "指示主语与系表", "主句", "These指前句优秀人才", "保留原卷These are the kind的集合表达，不将kind改为kinds。"),
    segment("that countries like Britain, Canada and Australia try to attract ", "modifier", "关系从句及举例介词", "限定workers", "that作attract宾语，countries为从句主语", "like在国家名之前为例如，不是这些国家喜欢别国。"),
    segment("by using immigration rules ", "modifier", "by动名词方式短语", "说明attract的手段", "countries使用移民政策招揽人才", "immigration从接收国角度说移入，与emigration方向相反。"),
    segment("that privilege college graduates.", "modifier", "嵌套关系从句", "限定immigration rules", "that为privilege主语，回指rules", "privilege为及物动词，意为优待大学毕业生，不能只看作特权名词。"),
  ], "These are the kind of workers that countries try to attract.", "这些正是英国、加拿大和澳大利亚等国家试图通过使用优待大学毕业生的移民规定来吸引的那类工作者。", "英国、加拿大、澳大利亚等国通过给予大学毕业生优待的移民政策，力图吸引的正是这类人才。", "说明发达接收国的选择性引才手段，并非所有移民都同等受欢迎。", ["try to attract", "by using immigration rules", "privilege college graduates"], [
    clause("that countries like Britain, Canada and Australia try to attract by using immigration rules that privilege college graduates", "定语从句", "that", "限定workers", "countries like Britain, Canada and Australia", "try", "to attract（不定式宾语），that为attract宾语", "先读哪些国家吸引这些人才，再补通过什么规定。"),
    clause("that privilege college graduates", "定语从句", "that", "限定rules", "that（immigration rules）", "privilege", "college graduates", "译成优待大学毕业生的移民规定。"),
  ]),
  sentence(3, [
    segment("Lots of studies have found ", "predicate", "数量主语与现在完成时", "主句主谓", "studies为研究，have found概括累积发现", "lots of为许多，不等于研究已经证明所有情况。"),
    segment("that well-educated people from developing countries ", "subject", "宾语从句主语含定语", "所发现群体", "well-educated与from developing countries共同限定people", "指来自发展中国家、受过良好教育的人。"),
    segment("are particularly likely to emigrate.", "predicate", "系表可能性结构", "宾语从句谓语", "particularly提高likely程度", "emigrate从原国家移出，不是单指短期旅游或国内搬家。"),
  ], "studies have found that people are likely to emigrate.", "许多研究已经发现，来自发展中国家的受过良好教育的人特别可能移居国外。", "许多研究发现，发展中国家受过良好教育的人尤其容易选择移民海外。", "用研究概括支持人才外流的选择性，为印度数据铺垫。", ["Lots of studies", "particularly likely to emigrate"], [
    clause("that well-educated people from developing countries are particularly likely to emigrate", "宾语从句", "that", "作have found宾语", "well-educated people from developing countries", "are", "particularly likely to emigrate（表语）", "先译研究发现，再译哪类人更可能移民海外。"),
  ]),
  sentence(4, [
    segment("A big survey of Indian households in 2004 found ", "predicate", "调查主语与过去式谓语", "主句主谓及调查时间", "survey为调查，of引对象，in 2004为调查年份", "调查对象是印度家庭，不是英国医院。"),
    segment("that nearly 40% of emigrants had more than a high-school education, ", "object", "宾语从句及学历比较", "调查发现的第一比例", "emigrants为已移居国外的人", "more than a high-school education为高于高中学历，不能译作仅高中及以下，也不能等同全为博士。"),
    segment("compared with around 3.3% of all Indians over the age 25.", "modifier", "过去分词比较短语", "给出另一群体参照", "比较同种学历条件在两类人群中的占比", "原卷over the age 25缺常见of但数字清楚，原样保留；around为约，over为超过25岁而非小于25岁。"),
  ], "A survey found that nearly 40% of emigrants had more than a high-school education.", "2004年一项针对印度家庭的大型调查发现，近40%的移居国外者拥有高于高中的学历，而全体25岁以上印度人中这一比例约为3.3%。", "2004年，一项面向印度家庭的大型调查发现，近40%的移民受教育程度超过高中水平；相比之下，全部25岁以上印度人中，达到这一水平的约占3.3%。", "对比两个不同分母群体的受教育比例，不可译为40%的受教育者移民或将3.3%误作移民比例。", ["more than a high-school education", "compared with around 3.3%", "over the age 25"], [
    clause("that nearly 40% of emigrants had more than a high-school education", "宾语从句", "that", "作found宾语", "nearly 40% of emigrants", "had", "more than a high-school education", "先确定分母是移居国外者，再译近40%受教育程度高于高中。"),
  ]),
  sentence(5, [
    segment('This "brain drain" ', "subject", "指示名词及隐喻引号", "主语", "This回指高学历人才较易外流", "brain借指人才、智力资源，drain表示流失，不是脑部排水。"),
    segment("has long bothered policymakers in poor countries.", "predicate", "现在完成时与持续副词", "谓语宾语及地点限定", "policymakers为政策制定者", "long表示持续已久，in poor countries限定政策制定者所属国家。"),
  ], 'This "brain drain" has bothered policymakers.', "这种‘人才流失’长久以来一直困扰着贫穷国家的政策制定者。", "这种‘人才外流’长期困扰着贫穷国家的政策制定者。", "由研究数据回到输出国面临的政策焦虑。", ['"brain drain"', "has long bothered"]),
  sentence(6, [
    segment("They fear that it hurts their economies, ", "predicate", "主句内嵌宾语从句", "担忧及其内容", "They指policymakers，it指brain drain，their指贫穷国家", "hurt economies为损害经济，不译成伤害某个经济学家。"),
    segment("depriving them of much-needed skilled workers ", "modifier", "现在分词结果短语", "说明经济损害的方式与结果", "them指poor countries，workers为被失去的资源", "deprive A of B使A失去B，much-needed是十分需要的。"),
    segment("who could have taught at their universities, ", "modifier", "关系从句与情态完成式", "说明外流人才本可提供的贡献第一项", "who回指skilled workers", "could have taught表达未实现的可能贡献，不是将来必定执教。"),
    segment("worked in their hospitals and come up with clever new products ", "modifier", "关系从句并列分词谓语", "贡献第二、第三项", "worked和come共用could have，come为过去分词", "come up with为想出，clever说明产品设计巧妙。"),
    segment("for their factories to make.", "modifier", "for加逻辑主语的不定式", "后置限定products的生产用途", "factories是make的逻辑主语，products为省略的逻辑宾语", "不是for引原因从句，不让workers充当工厂的主语。"),
  ], "They fear that it hurts their economies, depriving them of workers.", "他们担心这会损害本国经济，使国家失去急需的熟练人才；这些人才本可以在本国大学教书、在医院工作，还可以想出巧妙的新产品供本国工厂生产。", "政策制定者担心，人才外流会损害本国经济，使国家失去急需的专业人才。这些人原本可以在本国大学任教、在医院工作，也可以设计出巧妙的新产品，交由本国工厂生产。", "把人才流失具体化为教育、医疗与产品创新的机会损失；could have保留本来可能的反事实色彩，不能写成已经完成。", ["depriving them of much-needed skilled workers", "could have taught", "come up with clever new products", "for their factories to make"], [
    clause("that it hurts their economies", "宾语从句", "that", "作fear宾语", "it（brain drain）", "hurts", "their economies", "先译他们担忧，再译人才流失损害本国经济。"),
    clause("who could have taught at their universities, worked in their hospitals and come up with clever new products for their factories to make", "定语从句", "who", "限定skilled workers", "who（专业人才）", "could have taught；could have worked；could have come up with", "at universities、in hospitals为地点；new products为come up with宾语", "先译这些人才本可，再平行展开教学、医疗工作和产品创新三项。"),
  ]),
];
export const translation2012Paragraphs = [translation2012Sentences.slice(0, 2), translation2012Sentences.slice(2)];
export const translation2012Tasks: TranslationTask[] = [{
  id: 201246, number: 46, format: "passage", points: 15, sentenceId: "2012-translation-s1",
  prompt: "第46题：把两段英文完整译成中文，整篇一次作答，15分。参考译文仅供对照学习，不作自动评分。",
  source: translation2012Paragraphs.map(paragraph => paragraph.map(sentence => sentence.text).join(" ")).join("\n\n"),
  answer: translation2012Paragraphs.map(paragraph => paragraph.map(sentence => sentence.natural).join("")).join("\n\n"),
  locating: "两段六句。migration泛指迁移、immigration为移入、emigrate为移出；privilege为优待动词。近40%以移民为分母，约3.3%以25岁以上全体印度人为分母。could have三项贡献为本可实现而失去的可能。原卷best and brightest departure及over the age 25有非标准连接，原样保留并在句法中提示；译意据全文人才外流语境和明确年龄数字，不静默补字。",
  paragraphs: translation2012Paragraphs,
}];
