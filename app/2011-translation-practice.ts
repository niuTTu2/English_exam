import type { ErrorCategory, GrammarConceptId, PracticeTask } from "./learning-model";

const range = (id: string, prompt: string, answer: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hintWords: string[], leaksToTaskIds: string[] = []): PracticeTask => ({ id, revision: 1, kind: "range", prompt, options: [], answer, evidence: answer, feedback, conceptId, errorType, hintWords, mapRevealsAnswer: false, leaksToTaskIds });
const link = (id: string, prompt: string, pairs: [string, string][], evidence: string, feedback: string, conceptId: GrammarConceptId, errorType: ErrorCategory, hintWords: string[], leaksToTaskIds: string[] = []): PracticeTask => ({ id, revision: 1, kind: "link", prompt, links: pairs.map(([source, target]) => ({ source, target })), options: [...new Set(pairs.map(([, target]) => target))], answer: JSON.stringify(pairs.map(([, target]) => target)), evidence, feedback, conceptId, errorType, hintWords, mapRevealsAnswer: false, leaksToTaskIds });

export const translation2011Practice: Record<number, PracticeTask[]> = {
  1: [
    range("comparison-range", "划出以as开头的完整比较从句；不要带入破折号后的比例补充。", "as the world's airlines do", "as与the same配合，the world's airlines是主语，do是替代性谓语。从句到do结束；roughly 2 percent另补排放数量。", "comparison-scope", "clause-boundary", ["as", "do", "airlines", "same", "volume", "the same volume of greenhouse gases as the world's airlines do"], ["predicate-links"]),
    link("predicate-links", "把三层主语连接到各自的谓语，不把that从句的谓语当作整句唯一谓语。", [
      ["Who", "would have thought"], ["the IT industry", "produces"], ["the world's airlines", "do"],
    ], "Who would have thought that, globally, the IT industry produces about the same volume of greenhouse gases as the world's airlines do", "Who支配would have thought；that内容中的the IT industry支配produces；as从句的the world's airlines支配do。do替代产生排放的动作。", "finite-predicate", "predicate", ["Who", "would", "have", "thought", "industry", "produces", "as", "airlines", "do", "the same volume of greenhouse gases as the world's airlines do"], ["comparison-range"]),
  ],
  2: [
    range("toll-range", "划出表示‘给环境造成令人意外的损害’的完整动词搭配，包括受影响对象。", "take a surprising toll on the environment", "take a toll on整体表示给……造成损害；surprising修饰toll，on引出环境这个受影响对象。不要把toll译成通行费。", "lexical-context", "collocation", ["take", "toll", "surprising", "on", "environment", "take a surprising toll on the environment"]),
  ],
  3: [
    range("attempts-clause", "划出on后面的完整疑问内容从句，包括说明尝试目的的不定式。", 'how many attempts are needed to get the "right" answer', "从how many attempts开始，到answer结束。how many attempts是are needed的主语，to get the \"right\" answer说明尝试目的；depending on在从句外。", "clause-object", "clause-boundary", ["depending", "on", "how", "many", "attempts", "needed", "to", 'depending on how many attempts are needed to get the "right" answer'], ["attempts-links"]),
    link("attempts-links", "把疑问主语与不定式目的分别连接到它们的作用。", [
      ["how many attempts", "are needed的主语：需要的尝试次数"], ['to get the "right" answer', "尝试的目的：找到所需答案"],
    ], 'how many attempts are needed to get the "right" answer', "被需要的是尝试，不是how或answer；to get交代这些尝试为了什么。整个疑问内容作介词on的宾语。", "passive-voice", "subject", ["how", "many", "attempts", "are", "needed", "to", "get", 'depending on how many attempts are needed to get the "right" answer'], ["attempts-clause"]),
  ],
  4: [
    link("attachment-links", "分别连接目的动作的执行者、速度修饰对象和装满设备的对象。", [
      ["To deliver results to its users quickly", "执行者是Google，说明维护设施的目的"],
      ["quickly", "修饰deliver，不是maintain"],
      ["packed with powerful computers", "修饰data centres，不是users"],
    ], "To deliver results to its users quickly, then, Google has to maintain vast data centres around the world, packed with powerful computers", "Google为了迅速返回结果而维护数据中心。quickly限定deliver；packed是补充中心配置的分词定语。then表示因此，不引入先后建造过程。", "nonfinite-subject", "attachment", ["To", "deliver", "quickly", "Google", "packed", "with", "centres", "deliver results to its users", "packed with powerful computers"]),
  ],
  5: [
    range("while-range", "划出省略主语和be的完整时间状语结构，不包括第一主句。", "While producing large quantities of CO2", "While到CO2构成同时关系，省略的主语是these computers、be可理解为are；逗号之后these computers emit是第一主句。", "clause-time", "clause-boundary", ["While", "producing", "these", "computers", "large quantities of CO2"], ["reference-links"]),
    link("reference-links", "把两处回指连接到真实对象，不按最近名词机械配对。", [
      ["these computers", "上一句数据中心里的powerful computers"],
      ["which", "为数据中心充分使用空调制冷这一做法"],
    ], "these computers emit a great deal of heat, so the centres need to be well air-conditioned, which uses even more energy", "these computers回指前句设备，也是While producing的逻辑主语；which回指制冷做法，uses是单数。发热→需制冷→额外耗能，不把which连到CO2或复数centres。", "reference-pronoun", "reference", ["these", "computers", "While", "producing", "which", "uses", "air-conditioned", "well air-conditioned"], ["while-range"]),
  ],
  6: [
    link("shared-subject-links", "找出共同主语、their的指代和closely的修饰对象。", [
      ["Google and other big tech providers", "monitor与make的共同主语"],
      ["their", "Google及其他大型技术服务商的"],
      ["closely", "修饰monitor，表示密切监测"],
    ], "Google and other big tech providers monitor their efficiency closely and make improvements", "第一个and连接主语中的两项，第二个连接monitor与make；their回指这个共同主语，closely只描述监测方式。企业有改进行动不等于环境负担已消失。", "parallel-structure", "attachment", ["Google", "and", "other", "providers", "monitor", "make", "their", "closely", "monitor their efficiency closely", "make improvements"]),
  ],
  7: [
    link("to-and-agent-links", "区分两个to，并把句末执行者短语接回它补充的动作。", [
      ["to reduction", "介词短语，说明road通向的目标"],
      ["to be done", "被动不定式，后置修饰more"],
      ["by big companies", "be done的执行者，而不是road的修饰语"],
    ], "on the road to reduction, but there is much more to be done, and not just by big companies", "to reduction接名词，to be done接被动动词结构；by big companies依附be done。not just扩大执行者范围，并没有免除企业责任。", "nonfinite-infinitive", "attachment", ["to", "road", "reduction", "more", "done", "by", "the first step on the road to reduction", "much more to be done", "not just by big companies"], ["responsibility-range"]),
    range("responsibility-range", "划出表示‘不只是由大公司来做’的片段，从否定词开始，不带前面的and。", "not just by big companies", "not just否定的是‘仅限于’，by引出be done的执行者；企业仍需行动，其他主体也不能置身事外。", "negation-contrast", "translation", ["not", "just", "by", "companies", "not just by big companies"], ["to-and-agent-links"]),
  ],
};
