# 单篇文章导入模板

每次只复制一份模板，先完成内容清单，再写入项目。字段名称与 `app/data.ts` 的现有类型保持一致。

## 文章信息

```text
年份：
试卷类型：英语一 / 英语二
题型：完形 / 阅读 / 新题型 / 翻译
文章编号：
来源文件：
答案来源：
```
## 句子对象

```ts
{
  id: "year-section-sentence-number", // 稳定且全项目唯一
  number: 1,
  text: "完整原句",
  testText: "需要自测挖空时填写，否则省略",
  chunks: [
    { text: "原句中的连续片段", role: "subject" },
    { text: "后续连续片段", role: "predicate" },
  ],
  trunk: "主干",
  layers: [
    { label: "层级名称", text: "英文片段：中文结构说明" },
  ],
  grammar: ["本句实际出现的规则及其作用"],
  literal: "按结构得到的可理解直译",
  natural: "准确通顺的译文",
  logic: "本句在段落或论证中的作用",
  phrases: ["真题中实际出现的整体表达"],
  answerWords: ["仅在本句含自测空格时填写"],
}
```

`chunks` 必须按原文顺序连续覆盖全文，拼接结果应还原 `text`。

## 单词条目

```ts
{
  key: "原形或稳定键",
  headword: "原形",
  display: "当前词形",
  kind: "word",
  partOfSpeech: "明确词性",
  contextualMeaning: "本句义",
  use: "本句中的具体句法和搭配说明",
  specialForms: ["特殊变形；规则形式也应明确"],
  examSynonyms: ["近义词（中文义和关键区别）"],
  collocations: ["搭配"],
  otherMeanings: ["考研常见其他义"],
  wordFamily: ["同源词 + 词性 + 中文义"],
  confusions: ["不能混用的原因"],
  counts: { form: 0, lemma: 0, family: 0 },
  occurrences: [],
}
```

次数与出处由语料统计生成，不要手工编造固定数字。

## 词组知识

```ts
{
  key: "稳定模式键",
  canonical: "规范原型，如 between A and B",
  type: "介词结构 / 动词搭配 / 从句结构等",
  meaning: "通用中文义",
  summary: "本句如何使用",
  grammarRole: "本句句法作用",
  structures: [
    {
      pattern: "规范结构",
      meaning: "中文义",
      rule: "形式限制和使用条件",
      examples: [{ english: "例句", chinese: "译文" }],
    },
  ],
  pitfalls: ["典型错误和易混点"],
}
```

同时在别名映射中把真题原文表达指向这个规范模式。

## 题目对象

```ts
{
  id: 1,
  sentenceId: "对应定位句 ID",
  prompt: "题干或挖空片段",
  options: [
    { key: "A", text: "选项" },
    { key: "B", text: "选项" },
    { key: "C", text: "选项" },
    { key: "D", text: "选项" },
  ],
  answer: "A",
  locating: "答案如何由定位句、搭配或逻辑确定",
  explanations: {
    A: "逐项原因",
    B: "逐项原因",
    C: "逐项原因",
    D: "逐项原因",
  },
}
```
