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

## 句子语境与本句可替换

重复词仍复用稳定 `headword`。只有当前文章/句子的词义、用法或可替换项放进
`app/contextual-vocabulary.ts`，不要复制整份词条：

```ts
"year-section-sentence-number": {
  headword: {
    contextualMeaning: "当前句中的准确词义（与通用词义不同时填写）",
    use: "当前句中的句法、搭配和语义作用（需要覆盖时填写）",
    contextualSubstitutions: [
      {
        label: "替换词或表达",
        chinese: "该替换项在本句中的中文义",
        fit: "direct", // 或 with-adjustment
        rewrittenSentence: "完成替换后的整句，不能只列单词",
        nuance: "替换项与原词在语气、范围或搭配上的区别",
        adjustment: "fit 为 with-adjustment 时必填，说明改了什么结构",
        target: "word:稳定原形", // 或 phrase:规范表达
      },
    ],
  },
}
```

- 每个词最多列 1—3 个当前句真正成立的替换项；没有可靠替换时不强行填写。
- `examSynonyms` 是一般近义词辨析，不代表能直接放回原句。
- 替换后的完整句必须保持原命题信息；改变语气时要明确写进 `nuance`。
- `target` 指向的单词或词组必须能打开有词性、中文义和用法的有效知识页。

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
  // 答案同时写入该年份的 verified-answer-keys 清单，防止后续误改。
  locating: "答案如何由定位句、搭配或逻辑确定",
  explanations: {
    A: "逐项原因",
    B: "逐项原因",
    C: "逐项原因",
    D: "逐项原因",
  },
}
```
