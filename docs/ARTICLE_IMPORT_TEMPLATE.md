# 单篇文章导入模板

每次只复制一份模板，先完成内容清单，再写入项目。字段名称与 `app/data.ts` 的现有类型保持一致。

执行检查以 `RELEASE_CHECKLIST.md` 为准，不在本模板再维护另一套重复审计。以下示意 ID 不可直接复制用于正式数据。

新版阅读完整字段以 `TRAINING_TEMPLATE.md` 和2010 Text 1实际文件为准。以下对象展示人工录入字段；不要继续仿照旧文章的六类 `role`。先录入 `Omit<SentenceAnalysis, "chunks">`，再调用 `withReviewedSyntax(draft, colors)`，由人工成分统一产生颜色层与精确名称。

## 现有接入位置

- 单篇数据：沿用 `app/<year>-passage-<n>-data.ts`、`-lexicon.ts`、`-knowledge.ts`，字段类型见 `app/data.ts`；旧文件仅作结构参考，不视为语义免审样板。
- `app/data.ts`：目录状态、文章对象、句子/题目汇总；保留已有 ID，题目 `id` 为跨卷稳定键，`number` 为原卷题号。
- `app/contextual-vocabulary.ts`：文章类型与逐句本句义/替换；键用规范 headword，不用过去式等表层词形。
- `app/lexicon.ts`、`app/knowledge-base.ts`：复用并扩充规范条目与关联，避免全局覆盖旧语境或把派生词当作屈折词形。
- `app/study-app.tsx`：仅在现有文章类型列表确需扩充时做最小接入，不顺手修改界面逻辑。
- `app/verified-answer-keys.ts` 与 `tests/content-quality.test.mjs`：答案依据和必要单篇断言；同义替换测试须检查目标内容与实际语境入口，不能只数条目。
- `docs/IMPORT_PROGRESS.md` 与本篇报告：同步总表、分表和下一接续点。

`phrases`、成分和从句的 `text` 必须保存原文连续片段，不能填规范结构或省略号。规范结构放进知识字段，例如原文 `called out bids`，规范 `call out + bids`。新增文章不等于需要重构上述公共模块。

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
  // chunks 不在草稿中重复填写；末尾由 withReviewedSyntax 生成。
  trunk: "主干",
  layers: [
    { label: "层级名称", text: "英文片段：中文结构说明" },
  ],
  grammar: ["本句实际出现的规则及其作用"],
  beginnerSyntax: {
    reading: {
      focus: "本句真正的阅读关键：哪种关系读错就会误解句意",
      questions: [
        {
          question: "结合本句提出一个实际疑问，不套通用句型",
          evidence: "原句中的连续片段",
          answer: "明确说明判断依据、具体修饰对象及容易误读的区别",
        },
      ], // 1—3项；简单句1项即可
      // timeline: [{ label: "有依据的时间节点", explanation: "具体事件及上下文关系" }],
    },
    components: [
      {
        text: "原句中连续的一组词",
        form: "副词 / 介词短语 / 名词短语 / 非谓语 / 从句等",
        function: "时间状语 / 地点状语 / 主语 / 后置定语等，必须具体",
        modifies: "明确说明修饰哪个谓语、名词或整个分句",
        explanation: "用零基础学习者能理解的话说明为什么这些词要作为整体看",
        // children: [{ ...同结构成分对象 }],
        // 有内部修饰时保存真实父子关系，子项 text 必须处在父项的原文中。
      },
    ],
    clauses: [
      {
        text: "完整从句原文",
        type: "定语从句 / 宾语从句 / 条件状语从句等",
        marker: "引导词；无引导词时明确说明",
        role: "从句在主句中充当什么或修饰什么",
        subject: "从句内部主语",
        predicate: "从句内部谓语",
        predicateDetails: [{ function: "宾语 / 表语 / 宾语补足语中真实的一项", text: "对应原文片段" }],
        // 没有宾语或补足成分时为空数组；有多个就分别列出，不把分类合写为标签。
        translationOrder: "中文先理解哪一层、再回到哪一层",
      },
    ],
  },
  literal: "按结构得到的可理解直译",
  natural: "准确通顺的译文",
  logic: "本句在段落或论证中的作用",
  phrases: ["真题中实际出现的整体表达"],
  answerWords: ["仅在本句含自测空格时填写"],
}
```

`beginnerSyntax.components` 顶层按原句连续覆盖所有实词，`children`再说明内层关系。配色数组与顶层一一对应，例如 `It / was / a last victory` 使用 `["subject", "predicate", "complement"]`，最后一项 `function: "表语"`；时间状语从句用 `modifier`配色及准确名称。不得用“宾语/表语”混合标签。

生成的`chunks`必须按原文顺序连续覆盖全文，拼接结果应还原 `text`。`trunk` 只能使用原句中的词进行删减，禁止用释义改写主干。新导入句子必须人工填写
`beginnerSyntax`。自动整理只允许在编辑阶段帮助发现候选，不得进入正式展示；提交前必须逐句确认从句边界和内部主谓宾。
`trunk` 检查必须验证“按原文词序删减”，不能只验证每个单词是否曾在原文中出现。

正文/翻译句的 `reading` 必须逐句编写；参照 `app/2010-passage-1-reading.ts` 的讲解方式，以及 `app/2010-passage-1-data.ts` 的父子成分结构，不复制其具体语义。各层都写清“是什么形式、在本句做什么、作用于谁、怎么判断”；连续的“谓语＋宾语”只能标为整体主谓宾/谓语部分并向内拆，不能把宾语当动词。存量升级按 `SYNTAX_UPGRADE_PROGRESS.md` 登记，不能只加一个通用段落就算完成。

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
  specialForms: ["存在的特殊变形；无特殊变化则用空数组，由界面提示规则变化"],
  examSynonyms: ["有辨析价值的近义词（中文义和关键区别）；没有则空数组"],
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

下列对象为四选一模板。若用户原卷为 T/F 判断题，使用 `TrueFalseQuestion` 与 `format: "true-false"`，选项严格为 `[{ key: "T", text: "True" }, { key: "F", text: "False" }]`，答案及理由只用 T/F 键；不能将判断题伪装成 A–D 四选一。

```ts
{
  id: 201026, // 示例：跨卷稳定键；确认全库唯一后使用
  number: 26, // 原卷题号，与稳定键分开
  sentenceId: "兼容入口的主要定位句 ID；多句证据另存reasoning",
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

新阅读题还须挂接 `QuestionReasoning`（`app/article-teaching.ts`）：每项证据有稳定ID、句ID、连续原文、作用和强度；`options`使用原卷真实键，`paraphrases`链接证据和真实选项文本。参考 `app/2010-passage-1-evidence.ts`。较难题干/选项的 `analysis` 使用同一精确语法模型，参考 `app/2010-passage-1-question-analysis.ts`。不要把题目硬绑定一个句子，或把标题名词短语编成完整句。

## 阅读训练的必要接入

- `paragraphs`：从原卷核对段落，按顺序列句ID，不能依据句意猜原卷分段。
- `guide`：段落主旨/关系、全文路线、句子作用、指代、时间和观点边界。引用回到真实句子；practice保存地图解锁前的短回忆任务。
- `reasoning.locationPolicy`：多条合理定位路径，每条有必需证据组、补充句和最大选句数；不能只要求命中几个句号就通过。
- `translationAlignment` / `translationNotes`：词块与中文对应；标明根据上下文补出的中文逻辑词。
- `practice`：每句1—3个任务，使用 `learning-model.ts`概念ID、稳定任务ID与revision，证据为连续原文；反馈解释判断方法。复杂句至少一项range/link/order任务；题意、答案或形式改变增revision；hintWords、mapRevealsAnswer和leaksToTaskIds/leaksToTasks按实际泄露关系填写，禁止全句扩散。
- `teachingStatus`：完成一层才置true，不把旧兼容数据标成完成；四项状态不能代替交付报告中的实际页面验收。

只复制字段组织方式，不复制上一篇的本句义、主语、时间参照或题目证据。完整接手路线见 `TRAINING_TEMPLATE.md`。
