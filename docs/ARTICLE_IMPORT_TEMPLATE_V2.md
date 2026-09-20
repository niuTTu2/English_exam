# 以后新导入阅读文章：V2 模板

适用范围：用户提供原卷的**新阅读文章**。当前文章全部保留 V1；不补标版本、不换 ID、不迁移个人记录。其他题型未在本轮改造。先读 `NEW_ARTICLE_V2_ARCHITECTURE.md` 与 `RELEASE_CHECKLIST.md`。

目标顺序：快速理解 → 定位证据 → 同义转换和干扰项 → 高价值词汇搭配 → 必要语法。语法只回答“为什么这样读”，不是必修主线。

## 1. 原卷及明确版本

保留用户原卷文件/页码/校验值与正文快照。使用现有 `ArticleContent`、`SentenceAnalysis`、`AnyQuestion`、`paragraphs` 和稳定 ID。新 ArticleContent 必须显式声明 `experienceVersion: 2`，只靠此字段选择新页面。标题只写试卷/文章标识，不把答案或中文主旨放入做题页标题。

正文只存一次：`sentences[].text`。`paragraphs` 按原卷顺序逐句覆盖，不按教学主题重分段。题干与选项保留原卷；来源为 `question-<id>-prompt` 与 `questionOptionSourceId(question, key)`。不把多句原文、答案和词条复制到页面模块。

按仓库现有导入方式接入 `articleContents`、年份/模块目录、`allSentences/allQuestions`、年度答案清单和词库来源索引。不要给任何旧文章添加新字段，不调用 V1 的 `withReviewedSyntax` 来批量生成新文章的完整树。

## 2. 每句的快速层

```ts
import { createV2Sentence } from "./article-v2/model";

const sentence = createV2Sentence({
  id: "<新文章ID>-s1", number: 1,
  text: sourceText,                  // 原卷唯一文本
  natural: "一句话说明完整意思。",    // 复用现有自然译文
  logic: "本句在该段中的作用。",      // 复用现有关系说明
  phrases: [],                       // 仅真实且已精审的连续搭配
  quickReading: {
    blocks: [{ start: 0, end: sourceText.length }],
    obstacle: "先抓哪个动作/关系，或本句唯一值得注意的词义。",
    keyReasons: [],                  // 普通句为空，不强行挑关键句
  },
});
```

`blocks` 是原文 UTF-16 字符半开范围 `[start, end)`，从0连续覆盖到 text.length，包括原标点和空格。根据阅读需要最小分块；简单句可只有一块。页面从原文切片展示，不保存重复分块文字。

帮助函数仅填 V1 类型兼容所需的空 `chunks/layers/grammar/trunk/literal`；不是生成语法内容。V2 的 chunks/layers/grammar 保持空容器，术语列表不能替代快速意思；普通句无需 `beginnerSyntax`、`grammarPatches` 或 `practice`。

## 3. 关键句按需深度层

至少符合一项才填写深度内容，数量由真实难点决定：

| keyReasons | 选入依据 |
| --- | --- |
| answer-evidence | 题目直接证据句 |
| inference-context | 推理所需上下文 |
| paragraph-turn | 段落转折或主旨 |
| nested-clause | 容易误判的嵌套从句 |
| attachment | 修饰归属易错 |
| nonfinite-actor | 非谓语执行者影响理解 |
| reference-or-scope | 重要指代、比较、否定、省略、时间关系 |
| misreading | 词都认识仍容易翻错 |
| main-line | 明显推动文章主线 |

可只提供必要补丁，不要求同样深度。有完整结构时复用 `trunk`、`beginnerSyntax.components/clauses`、`literal`、`translationAlignment/translationNotes`。主干按原词序删减；成分/从句必须来自真实父范围；不能把补充说明全部叫修饰。

每个成分增加 `relationKind`：`trunk` 主干、`modifier` 修饰、`supplement` 补充说明、`clause-internal` 从句内部。页面总标题为“句子骨架与各部分关系”。嵌套部分仍用 children；从句内部记录真实主语、谓语、宾补和翻译次序。指代复用 guide.references；时间关系可用 beginnerSyntax.reading.timeline。

语法补丁为 `grammarPatches: [{ explanation, relation, term, transferRule }]`，依次是人话、本句关系、正式名称、迁移规则。例如先说明 by 短语回答作品由谁创作，再说明跟着 works，最后说明是介词短语作后置定语。完整结构默认在“我还是没读懂”折叠层，不能阻挡快速译文。

篇章数据继续复用 `guide`：mainIdea/route、真实原卷段落关系、必要指代/时间/观点。地图和篇章练习均不成为解锁前置。

## 4. 题目推理与本次错因

答案仍只有 `question.answer` 一份。完整 `reasoning` 继续存证据、转换、四项判断、题干解释及 locationPolicy。原文证据保留已有 `evidence[].id/sentenceId/quote/role/strength`；quote 必须是对应原句子串。

增加可选 `reasoning.correction`，V2 题目必须填写：

```ts
correction: {
  minimalEvidenceIds: ["<已有证据ID>"],
  paraphraseIndexes: [0], // 引用 reasoning.paraphrases，到正确选项
  byWrongOption: {
    // 逐个真实错误选项编写；不为正确项制造错因。
    B: { difference: "B 把原文的哪个限定/对象换成了什么。", recheck: shortTask },
    // 其余错误项各有自己的对比与任务身份。
  },
  correctCheck: shortConfirmationTask,
}
```

每个错项复用 `reasoning.options[key].errorType`，不能把所有错误都称为“没读懂”。最小证据与转换必须足以支持区别；NOT 题注意“正确选择”也可能对应原文矛盾，而非同义肯定。语言解析复用 `question.analysis.prompt/options`，在第二层展开。

提交后按错题优先：本次选择 → 正确项 → 两者差别 → 最小证据 → 原文到选项转换 → 干扰方式 → 一道短再判断。完整多句链、全部选项、题干/选项语言分析与合理定位路径放第二层。做题页即使提交也不显示这些答案资料。

## 5. 可选主动训练

仍用 `PracticeTask`，不增加任务存储体系。只在必须找主干、易错归属、题目考察关系、答案范围或高迁移结构时设置。优先 range/link/order，其次真正有判断价值的 choice；简单事实句不凑题。

V2 任务增加 `purpose`：`find-trunk`、`attachment-risk`、`question-relation`、`answer-scope`、`transfer`。保留稳定 task.id/revision，改语义或答案则增加 revision。不同错项的再判断有独立 ID，不能将B的尝试套到D。

题目再判断和可选句子练习发生在可读讲解之后，统一按辅助巩固记入原 `practiceAttempts`，不虚报独立掌握，不要求每句任务，不用语法完成率作文章进度。

## 6. 词汇和搭配：来源索引，共用词库

`ArticleContent.vocabularyFocus` 只保存 `{ sourceId, expression, kind, categories, questionLink? }`。expression 必须出现在该 sourceId 的原文。五类如下：

| categories | 共用系统身份/行为 |
| --- | --- |
| core | 本篇核心词，进入已有单词记忆 |
| sense | 熟词生义，按当前语境 sense 独立 |
| collocation | kind 必须 phrase，复用规范词组稳定键 |
| paraphrase | 题目转换；questionLink 指向 questionId/paraphraseIndex |
| recognition | 专名/低价值识别，默认不招募进必学队列，可手动加入 |

recognition 不与其他必学类别混标。其他类别可交叉；相同 sense 多个来源由原记忆合并规则处理。正文、题干和选项都可以成为来源；词组精审注解仍进入现有 sentence.phrases 或题目 analysis.phrases，不用随意圈选制造词组词条。

先补现有 `lexicon/contextual-vocabulary/knowledge-base` 的真实上下文和规范词组，再更新现有 reviewed sense 映射；未知或推测词条不得通过 V2 门禁。复用词形/原形/词族统计、其他真题出处和 SenseOverview；不能建立 V2 平行词典。

UI 通过 `vocabularyCorpus.resolveCandidate` 查询；通过 `enrollVocabulary` 加待学/复习；复用 `VocabularyLearning` 的记忆、会话、队列与调度。加入复习表示安排复习，不代表用户已自评答对。返回选项时定位原卷选项，返回句子时定位快速阅读原句；证据跳转保留返回该题的入口。

## 7. 个人追问、保存与离线

当前无运行时 AI。入口支持问这句话/为何不是某项/找主干/修饰归属/翻不通/更简单解释，仅保存个人问题和笔记。

未来后端只能实现 `FollowUpProvider` → `FollowUpAnswer`，destination 固定 `personal-note`；不能自动改正式答案/语法/词条。接入新服务另行取得授权。

新增个人字段为可选 `articleV2Progress/articleV2Marks/articleV2FollowUps`，与原 version:1 信封、账号隔离、无损封包和 CAS 同步。词汇/作答/练习仍用旧共用字段。取消标记保存 active:false，禁止通过删除 map 项丢掉跨设备状态。计时存开始时间和累计毫秒，不每秒写盘。保存失败不提示成功，不越过账号快照切换保护。

V2 JS/CSS 按需加载。既有 Service Worker 缓存访问过的模块；从未加载过的新模块离线不可用时明确提示，不能承诺首次离线加载。不要修改已有离线/部署系统以掩盖未验收。

## 8. 门禁与试点

`validateV2Article` 检查快速层、关键理由、原卷范围、证据引用、各错项、练习目的与词汇来源。它验证结构和引用，不能证明译文和逻辑正确；内容精审必须完成。

必要命令以 RELEASE_CHECKLIST 为准。独立合成验证入口：

```sh
node --test --test-concurrency=1 tests/article-v2.test.mjs tests/study-sync.test.mjs tests/auth.test.mjs
node tests/browser-v2/serve.mjs
# 本机打开 http://127.0.0.1:5174/tests/browser-v2/widths.html
node tests/browser-v2/serve-pilot.mjs
# 实际应用试点： http://127.0.0.1:5183/__v2-inspection
```

真实试点的完整操作路径见 `V2_BROWSER_ACCEPTANCE.md`。入口启动和HTTP响应通过，不代表手机触控、保存或离线已验收。

测试目录不被生产入口引用，不是正式新文章。首个正式试点是用户提供的2013英语二Text 1；实现方式见 `app/2013-passage-1-*.ts`、原卷快照 `tests/fixtures/2013-passage-1-source.json` 和专项测试 `tests/2013-passage-1-v2.test.mjs`。它是示例，不是句数、深度句数或任务数模板；以后仍按真实难点决定。不能把旧 Text 1/2 或合成夹具标为试点。360/390、离线、真实原卷内容及正式站 V2 验证全部完成前不推 main。
