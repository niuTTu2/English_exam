import type { ErrorCategory, GrammarConceptId, PracticeTask } from "./learning-model";

const choice = (id: string, prompt: string, options: string[], answer: string, evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hintWords: string[]): PracticeTask => ({ id, revision: 1, kind: "choice", prompt, options, answer, evidence, feedback, conceptId, errorType, hintWords, mapRevealsAnswer: false });
const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, hintWords: string[]): PracticeTask => ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType: "clause-boundary", hintWords, mapRevealsAnswer: false });
const link = (id: string, prompt: string, pairs: [string, string][], evidence: string, feedback: string, conceptId: GrammarConceptId, hintWords: string[]): PracticeTask => ({ id, revision: 1, kind: "link", prompt, links: pairs.map(([source, target]) => ({ source, target })), options: [...new Set(pairs.map(([, target]) => target))], answer: JSON.stringify(pairs.map(([, target]) => target)), evidence, feedback, conceptId, errorType: "attachment", hintWords, mapRevealsAnswer: false });

export const translation2000Practice: Record<number, PracticeTask[]> = {
  31: [
    link("shared-require", "把需求、原因递进和举例分别接回支配它们的词。", [["varying measures of centralized control", "requires的第一宾语"], ["the help of specialized scientists", "requires的第二宾语"], ["such as economists and operational research experts", "scientists的举例"]], "requires varying measures of centralized control and hence the help of specialized scientists such as economists and operational research experts", "只有requires是有限谓语；and连接两项需求，such as只扩展第二项中的科学家。", "parallel-structure", ["requires", "and hence", "such as"]),
  ],
  32: [
    range("second-subject-clause", "选出第二个真正主语从句：从第二个that开始，到本句内容结束，不含句号。", "that this in turn rests upon the efforts of scientists and technologists of all kinds", "and连接两个同层级that从句；第二项不属于第一个从句的宾语。", "clause-subject", ["it", "that", "and", "obvious"]),
    choice("this-reference", "第二个that从句里的this承接什么？", ["前面提到的农业和工业效率", "用作占位的形式主语it", "尚未出现的一群科学家"], "前面提到的农业和工业效率", "the efficiency of its agriculture and industry, and that this in turn rests upon", "先找this前面刚提出的中心信息efficiency，再接‘这种效率又依赖……’。形式主语it不承担这一实际回指。", "reference-pronoun", "reference", ["this", "efficiency", "in turn"]),
  ],
  33: [
    link("active-passive-progressive", "区分两项公众变化与政府应对的谓语形式。", [["are feeling", "公众的主动进行时"], ["are being exposed", "公众的被动进行时"], ["are often forced", "政府的一般现在时被动"]], "are feeling new wants and are being exposed to new customs and ideas, while governments are often forced", "being加过去分词表达进行时被动；often是频率副词，不是进行时助动词。", "passive-voice", ["feeling", "being", "exposed", "forced"]),
    choice("two-to-functions", "to new customs与to introduce中的两个to，功能有何不同？", ["to new customs是介词；to introduce是不定式标记", "两个to都引导不定式", "两个to都引导主语从句"], "to new customs是介词；to introduce是不定式标记", "to new customs and ideas, while governments are often forced to introduce", "先看to后面接什么：customs为名词，introduce为动词原形。句中的具体支配表达分别为exposed to和forced to do。", "nonfinite-infinitive", "attachment", ["to", "customs", "introduce"]),
  ],
  34: [
    range("interrupted-subject", "跨过破折号前先确定：was spread的完整主语是什么？不要包含插入语。", "the process of industrialization", "with短语只是插入的伴随说明。真正主语以process为中心，与单数was一致。", "subject-head", ["process", "with", "was"]),
    choice("duration-contrast", "本句关于工业化时间的比较，哪项保留了原文限定？", ["早期欧洲历时近一个世纪，如今发展中国家可能约十年", "所有发展中国家必定恰好十年完成", "欧洲多于一个世纪，发展中国家十年后才开始"], "早期欧洲历时近一个世纪，如今发展中国家可能约十年", "over nearly a century, whereas nowadays a developing nation may undergo the same process in a decade or so", "nearly不是多于；may不是必然；or so不是精确数值，in a decade说明经历过程的时长。", "comparison-scope", "translation", ["nearly", "whereas", "may", "decade"]),
  ],
  35: [
    { ...link("nonfinite-agents", "把两个非谓语结构接回它们的逻辑主语。", [["arising from mass migration movements", "problems：问题源于迁移"], ["made relatively easy nowadays by modern means of transport", "migration movements：交通使迁移容易"]], "problems arising from mass migration movements—themselves made relatively easy nowadays by modern means of transport", "不要只按最近词形寻找主语。arising修饰problems，而themselves重提迁移，作made的逻辑主语。", "nonfinite-subject", ["arising", "themselves", "made", "means"]), leaksToTaskIds: ["because-of-boundary"] },
    { ...choice("because-of-boundary", "because of统领的两个原因是哪一组？", ["人口爆炸，或人口迁移所引起的问题", "人口爆炸先发生，因此必然导致迁移", "交通方便，或政府取消全部社会压力"], "人口爆炸，或人口迁移所引起的问题", "because of the population explosion or problems arising from mass migration movements", "or并列两个名词结构，第二个中心是problems；原文没有把人口爆炸与迁移写成先后因果。", "modifier-prepositional", "passage-logic", ["because of", "or", "problems"]), leaksToTaskIds: ["nonfinite-agents"] },
  ],
};
