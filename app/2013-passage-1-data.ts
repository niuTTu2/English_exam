import type { ArticleContent } from "./data";
import { passage2013P1Sentences, passage2013P1Paragraphs, passage2013P1Guide } from "./2013-passage-1-reading";
import { passage2013P1Questions } from "./2013-passage-1-questions";
export { passage2013P1Sentences, passage2013P1Questions };
export const passage2013P1Article: ArticleContent = {
  id: "2013-p1", year: 2013, sectionId: "p1", label: "阅读 Text 1", badge: "2013 · 英语二 · Text 1", title: "2013 英语二 · Text 1",
  description: "原卷6段14句，21—25题。按做题、快速读懂、题目解析、词汇搭配四步学习。", kind: "reading", experienceVersion: 2,
  sentences: passage2013P1Sentences, questions: passage2013P1Questions, paragraphs: passage2013P1Paragraphs, guide: passage2013P1Guide,
  vocabularyFocus: [
    ...[
      [1, "automated"], [3, "unemployment"], [3, "demand"], [3, "globalization"], [3, "replacing"], [4, "skills"], [5, "average"], [8, "contribution"], [8, "unique"], [10, "acceleration"], [11, "manufacturing"], [13, "require"], [14, "ensures"],
    ].map(([n, expression]) => ({ sourceId: `2013-p1-s${n}`, expression: String(expression), kind: "word" as const, categories: ["core" as const] })),
    ...[[1, "relates"], [3, "pieces"], [5, "over"], [8, "field"], [9, "eating"], [11, "notes"], [11, "shed"], [11, "gains"], [14, "Bill"]].map(([n, expression]) => ({ sourceId: `2013-p1-s${n}`, expression: String(expression), kind: "word" as const, categories: ["sense" as const] })),
    ...[[2, "keep the man away from"], [3, "making the point"], [3, "because of"], [3, "replacing labor with machines or foreign workers"], [6, "used to"], [7, "access to"], [8, "stand out"], [11, "one out of every three"], [11, "in total"], [13, "for sure"], [13, "require workers to have"], [14, "has access to"], [14, "post-high school education"]].map(([n, expression]) => ({ sourceId: `2013-p1-s${n}`, expression: String(expression), kind: "phrase" as const, categories: ["collocation" as const] })),
    { sourceId: "question-201321-option-A", expression: "advances", kind: "word", categories: ["paraphrase"], questionLink: { questionId: 201321, paraphraseIndex: 0 } },
    { sourceId: "question-201322-option-D", expression: "contribute", kind: "word", categories: ["paraphrase"], questionLink: { questionId: 201322, paraphraseIndex: 0 } },
    { sourceId: "question-201323-option-B", expression: "at a high speed", kind: "phrase", categories: ["paraphrase"], questionLink: { questionId: 201323, paraphraseIndex: 0 } },
    { sourceId: "question-201324-option-B", expression: "ensure", kind: "word", categories: ["paraphrase"], questionLink: { questionId: 201324, paraphraseIndex: 0 } },
    { sourceId: "question-201325-option-C", expression: "Average", kind: "word", categories: ["paraphrase"], questionLink: { questionId: 201325, paraphraseIndex: 0 } },
    { sourceId: "2013-p1-s1", expression: "Adam", kind: "word", categories: ["recognition"] },
    { sourceId: "2013-p1-s1", expression: "Davidson", kind: "word", categories: ["recognition"] },
    { sourceId: "2013-p1-s7", expression: "robotics", kind: "word", categories: ["recognition"] },
  ],
};
