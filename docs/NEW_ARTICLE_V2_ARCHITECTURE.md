# 新导入阅读文章 V2 架构

## 实施前仓库审计（2026-09-20）

基线：`a8b258fb8c191d3016120b63b5afd823b0851345`。独立分支：`codex/new-article-v2`。本轮用户要求优先于历史文档的全库升级、每句完整句法、每句任务和直接推送 main 的安排。旧内容冻结，不导入新真题，不另建部署。

### 现状与边界

| 层 | 仓库现状 | V2 使用方式 |
| --- | --- | --- |
| 原卷 | `app/data.ts` 的 `ArticleContent.sentences/questions/paragraphs`；题目来源用 `question-<id>-prompt` 与 `questionOptionSourceId` | 同一份原文和稳定 ID；不复制正文，不按年份猜体验版本 |
| V1 页面 | `study-app.tsx` 的考场初读、初学精读、错题复盘和公共词汇入口；正文学习依赖 `StudySentence` | 未声明 V2 的文章完整沿用原 JSX、组件、文案与交互 |
| V1 句法 | `SentenceAnalysis`、`beginnerSyntax`、`withReviewedSyntax`；`SentenceSyntaxPanel` 使用“谁修饰谁”标题及完整结构资料 | 只复用数据类型；V2 的深度结构另作页面组件，不改 V1 标题和默认展开行为 |
| V1 训练 | `learning-model.ts` 的任务、版本、提示事件与复习；地图和讲解有尝试解锁规则 | V2 的理解不受任务解锁限制；可选练习复用任务和尝试类型，不以语法完成率衡量阅读 |
| 题目 | 答案、解释保存在原题；`QuestionReasoning` 有证据、同义链、干扰类型与定位路径 | 新增可选错因摘要，引用已有证据 ID；按本次用户所选项显示差别 |
| 词汇来源 | `resolveEntry`、`vocabularyCorpus`、`contextual-vocabulary.ts`、`lexicon.ts`、`knowledge-base.ts` | V2 词表只保存来源与分类引用，不保存第二份词典 |
| 记忆身份 | `vocabulary-learning/model.ts`、`sense-registry.ts`、人工 reviewed 映射和 `memory-groups.ts` | 继续使用原 `termKey/kind/senseId` 与词组规范键；同义措辞归组、不同义不合并 |
| 学习与复习 | `enrollVocabulary`、queue/session/scheduler，记忆、尝试、会话与可选拼写分别保存 | 本篇加入待学/复习和连续学习共用这些实现，不复制调度算法 |
| 保存 | version:1 的学习快照，账号隔离的本机 state/base，云端 CAS 与备份保护 | 可选扩展字段；不改账号、邮箱、数据库、容量或部署。新增字段须校验、无损往返、旧客户端漏传保护和冲突停止上传 |
| 离线 | `public/sw.js` 缓存已访问同源资源 | V2 按需加载；访问后可缓存离线使用，不给全部 V1 页面预加载 V2 |

2010 Text 1/2 各为19句、原卷5段、5题、35项句子任务及3项地图回忆。它们的 `*-data/reading/guide/evidence/practice/question-analysis/question-contexts` 分层依靠稳定来源 ID。V1 的这些数量和完成状态只描述两篇现状，不是 V2 数量门槛。不能把它们翻成 V2 来演示。

词汇升级的现行规范是 `docs/VOCABULARY_LEARNING_UPGRADE.md` 第15—17节及 `VOCABULARY_SENSE_AUDIT.md`：全部义项按已导入真实出处数展示；人工映射处理同义措辞；旧记忆 ID 不重命名、不删除。V2 继承该规则。

### 必须解决的接入点

1. `ArticleContent` 当前没有体验版本开关，不能用 paragraphs、guide、teachingStatus 或年份推断 V2。
2. `SentenceAnalysis` 的旧必填字段不能整体变为可选，否则会迫使 V1 组件改动。V2 导入帮助函数应只填兼容所需空容器，普通句不生成虚假语法树；正式内容门禁必须按明确版本分别检查。
3. `study-app.tsx` 已有3861行，新增阅读页面不能继续放入该文件。这里只允许动态边界、来源跳转和既有快照保存的薄适配。
4. V1 题目证据面板以标准讲义为先。V2 须先显示用户选择、正确项、所选错项的具体差别与最小证据，完整讲义保留第二层。
5. 原卷页不能借用带词义的词卡入口。标记只保存精确来源与字符范围；查词放在学习页。
6. 现有同步虽然保留未知顶层字段，但不足以保证未知 map 中的每条新记录不被旧页面的空 map 清掉。须增加针对 V2 可选记录的保留和原子冲突保护。

## V2 设计

### 六层数据

| 语义层 | 复用字段 | 新增可选字段 |
| --- | --- | --- |
| 原卷 | sentences 的 id/number/text，questions，paragraphs | ArticleContent.experienceVersion: 2 |
| 快速阅读 | SentenceAnalysis.natural（一句话意思）、logic（段落作用）、phrases | SentenceAnalysis.quickReading：最小分块范围、阅读障碍、关键句理由 |
| 深度句法 | trunk、beginnerSyntax、literal、translationAlignment/Notes | grammarPatches；成分的关系类别。仅有真实关键理由时填写深度层 |
| 篇章 | ArticleContent.guide | 无平行地图；V2 默认折叠，不要求地图练习 |
| 题目推理 | QuestionReasoning.evidence/paraphrases/options/locationPolicy | correction：最小证据引用、转换引用、每个错误选项的关键差别和短再判断题 |
| 词汇搭配 | 现有规范词条、来源、sense、词组与记忆 | ArticleContent.vocabularyFocus：核心词、熟词生义、固定搭配、题目转换、识别词的来源引用 |

版本判断只接受 `experienceVersion === 2`。缺失字段明确为 V1；不能因为新字段碰巧存在而开启 V2。V2 内容不完整时显示可恢复的内容错误，不能偷偷退回 V1 或生成讲解。

### 四页

- **做题**：原卷连续段落及题干/选项；可选计时；原位难句、词/词组范围及选项标记。任何状态下都不在此页呈现翻译、答案、句法、地图、证据或同义转换。
- **快速读懂**：原句、自然译文、最小分块、本句关键、段落作用、核心词与搭配入口。深度结构和语法补丁在“我还是没读懂”内；没有关键理由的普通句不出现完整结构或强制任务。
- **题目解析**：整篇提交后按错题优先。依次显示选择/答案/差别/最小证据/转换/干扰方式/短再判断；完整证据链、全部选项与语言分析按需展开。再判断是看过讲解后的巩固，不记作无提示掌握。
- **词汇搭配**：五类文章来源引用，查询真实词卡、原句、本句义和其他语境；通过既有桥加入待学或复习；使用同一个连续学习组件。

### 学习状态及动态追问

答案、提交状态、个人笔记、练习尝试、词汇记忆继续使用既有字段。V2 的页面/计时、精确标记、个人追问使用可选记录字段；按账号保存，与现有同步快照一起传输。无可靠运行时 AI 后端：追问入口仅保存个人问题和笔记，明确不可在线回答；不发出 AI 请求，不修改正式内容。

### 兼容和迁移边界

- 不给任何当前文章添加 experienceVersion，不迁移原文/句法/答案/词汇和学习记录，不改旧 ID。
- 公共类型只增加可选字段；旧字段必选性和旧组件默认行为不变。
- 新 CSS 全部限定 V2 范围；新页面通过 lazy 动态加载，仅选中 V2 阅读时渲染。
- 不改变同步身份、CAS、备份触发器、存储信封版本或服务器结构；只增加字段校验及兼容保护。
- 源内容不是用户学习记录，不写入 localStorage 或云端个人快照。个人记录只存引用和用户输入。
- 测试使用明确标为合成的独立夹具，不导入生产目录，不把旧文章复制/改名成试点。

## 试点与验收状态

唯一正式试点为用户提供的 **2013 年英语二 Text 1（21—25题）**。只从整卷 DOCX 导入该篇：正文对应提取段落114—119，题干与选项对应120—144；原文件 SHA256 为 `7f00fcff824e1a0c21261d1f4d13e742b8f173748f56ec50abf275b143e75131`。没有导入同卷其余文章，也没有改造任何旧文章。

试点生产 ID 为 `2013-p1`，明确声明 `experienceVersion: 2`；保留6个原卷段落，按阅读边界拆为14个稳定句源，题目 ID 为 `201321`—`201325`，答案按原选项顺序核验为 A/D/B/B/C。原卷快照保存在 `tests/fixtures/2013-passage-1-source.json`，正文唯一生产转录在 `app/2013-passage-1-source.ts`。合成夹具仍只用于工程边界，不充当正式试点。

内容和结构验收已覆盖原卷重组、四页、普通句浅层、关键句折叠深度、错项专属差别、词义隔离、独立词组和共享记忆入口。360/390浏览器、离线重开、正式站部署仍须按下文未验证项完成；在此之前不合并生产 main。

## 实施结果与交付记录（2026-09-20）

### 架构文件

| 文件 | 职责 |
| --- | --- |
| `app/article-v2/model.ts` | 可选内容层、明确版本、个人记录和未来追问接口 |
| `app/article-v2/content.ts` | 来源索引、字符范围和独立 V2 内容门禁 |
| `app/article-v2/article-v2.tsx` | 四页主入口、保存错误、来源返回和提交边界 |
| `app/article-v2/exam-page.tsx` | 连续原卷、答案、可选计时、原位难句/词组/选项标记 |
| `app/article-v2/quick-reading-card.tsx` | 轻量快速阅读卡和段落页面 |
| `app/article-v2/deep-reading.tsx` | 折叠的关键结构、关系分组和人话优先语法补丁 |
| `app/article-v2/question-mistake-card.tsx` | 错题优先、所选错项差别、最小证据及短再判断 |
| `app/article-v2/article-vocabulary-page.tsx` | 五类来源入口、现有词卡及同一个 VocabularyLearning |
| `app/article-v2/optional-practice.tsx` | 复用 PracticeTaskInput 与既有尝试历史 |
| `app/article-v2/follow-up-panel.tsx` | 六类个人追问和可编辑笔记；没有 AI 请求 |
| `app/article-v2/state.ts`、`persistence.ts` | 原快照增量操作、计时、标记撤销、校验、漏传保护、逐条冲突 |
| `app/article-v2/article-v2.css` | 仅 V2 的响应式样式，手机四入口改为两列 |
| `app/article-v2-boundary.tsx` | 小型错误边界；首次离线缺模块时可恢复提示 |
| `app/study-app.tsx` | 薄适配：lazy 分流、同一快照保存、词汇兼容入口、来源跳转；原 V1 JSX 保留 |
| `app/study-sync.ts`、`app/api/study-state/route.ts` | 仅增加 V2 可选记录保护；认证、CAS、备份、存储容量保持原样 |
| `app/vocabulary-learning/corpus.ts` | 仅明确 V2 时读取精审来源分类；复用既有词库和记忆身份 |
| `app/2013-passage-1-source.ts` | 试点原卷唯一生产转录、段落映射、题干与选项 |
| `app/2013-passage-1-reading.ts`、`2013-passage-1-structure.ts` | 14句快速层及仅关键句的按需深度层 |
| `app/2013-passage-1-questions.ts` | 21—25题最小证据、同义转换、逐错项差别与短再判断 |
| `app/2013-passage-1-vocabulary.ts`、`2013-passage-1-data.ts` | 文章来源语境、稳定词组和五类词汇来源索引；接入共用词库 |

### 实际新增字段

所有公共类型增量均为可选，未放宽或删除任何 V1 必填字段。

| 所在类型 | 新字段 | 含义/兼容性 |
| --- | --- | --- |
| ArticleContent | experienceVersion?、vocabularyFocus? | 只有数值2启动 V2；词表是来源分类引用 |
| SentenceAnalysis | quickReading? | blocks 字符范围、obstacle、keyReasons；意思/段落作用继续用 natural/logic |
| SentenceAnalysis | grammarPatches? | explanation/relation/term/transferRule；不代替快速层 |
| BeginnerSyntaxComponent | relationKind? | 主干/修饰/补充/从句内部；旧组件不使用它 |
| QuestionReasoning | correction? | minimalEvidenceIds/paraphraseIndexes、byWrongOption.difference/recheck、correctCheck |
| PracticeTask | purpose? | 练习对理解或答案的实际价值；旧任务无需补填 |
| 个人学习快照 | articleV2Progress? | articleId/page/elapsedMs/timerStartedAt?/updatedAt |
| 个人学习快照 | articleV2Marks? | 稳定ID、articleId/sourceId/kind/start/end/active/createdAt/updatedAt |
| 个人学习快照 | articleV2FollowUps? | 稳定ID、articleId/sourceId/intent/question/note/createdAt/updatedAt |

答案与交卷仍写 answers/submittedSections；练习尝试仍写 practiceAttempts。单词和词组仍写 vocabularyMemories/Attempts/Sessions/Settings/QueueState/Migration，按现有 senseId 和规范词组键记忆。进入 V2 词汇页复用已有词汇兼容流程；原词汇键、历史和原字段不删除。没有建立 V2 词库或复习计划。

内容字段随文章构建与缓存，个人快照只保存学习引用和个人输入，不复制官方原文/答案/释义。保存采用同一 version:1 信封、本机账号键、云端 CAS、无损词汇封包；旧客户端省略字段或提交空 map 时保留 V2 条目。同一条追问或进度跨设备同时变更按整条记录报告冲突，不拼出混合内容；用户明确解决冲突前仍沿用原停止上传和备份机制。取消标记用 active:false，不删历史键。

UI 先安全落盘再确认成功，账号 owner/epoch 不匹配时拒绝过期回调。定时器用累计时间及开始时间恢复，不每秒写存储。用户追问只能保存个人笔记，未来接口的 destination 固定 personal-note，不含官方内容写接口。

### 冻结与加载证据

- 实施前保存 `tests/fixtures/v1-frozen-before-v2.json`，基线为本文件首部 SHA。**35 篇、556 句、193 道选择/判断/匹配题**的 ArticleContent 序列化哈希保持相同，包括原卷、地图、句法、答案、证据和任务数据。
- 35篇连续原文、全部句子的 read/words/structure × 展开/折叠，以及全部 QuestionStudyCard 的 SSR 哈希逐篇相同。基线没有随实现重生成。这证明这些渲染路径一致，不冒充全部浏览器操作状态的端到端证明。
- 未修改任何旧文章数据文件、字典条目或 ID；没有访问、重写正式个人数据库。学习记录保护通过合成旧快照、无损封包、本机账号隔离、真实路由 CAS 和备份测试证明。
- 最终构建中 V2 是 dynamic entry：页面 JS 29,387字节，独立 CSS 4,669字节（均为未压缩构建文件大小）。静态依赖图不包含 V2 页面或其 CSS；生产 manifest 无 tests 入口，生产脚本无合成文章。少量可选字段解析与加载错误边界留在共用层。

### 实际检查

| 检查 | 结果 |
| --- | --- |
| `npm run quality` | 退出0：lint零错误；内容182/182；词义审计通过；构建通过；全量回归434/434 |
| V2、同步与真实路由专项 | 45/45，通过旧页面漏传/空 map、无效标记拒绝、并发版本、独立条目合并和整条冲突 |
| 最后接入修正后定向检查 | `article-v2.test.mjs`、`article-v2-build.test.mjs`、`vocabulary-content-aliases.test.mjs` 共16/16；覆盖最终V1基线和动态产物 |
| 最终受影响文件 lint、生产重建 | 零lint错误，重建退出0；未触发远端迁移/部署。全库原有6条warning，最终定向lint只有原有img warning |
| `tsc --noEmit --incremental false` | **不是全库通过**：实施前后输出完全相同，保留10处既有 Cloudflare类型、词典类型与Vite配置错误；本轮无新增诊断 |
| `git diff --check` | 通过 |

正式试点接入后的增量结果：2013专项7/7；真实试点、V1冻结、同步与认证定向52/52；`quality:content` 189/189并通过3053词条语义账本；lint零错误（6条旧warning）；生产构建通过。TypeScript仍为相同10项旧基线诊断，仅行号随导入移动。详细来源、内容判断及未验证项见 `docs/change-reports/2013-passage-1-v2-pilot.md`。

全量测试时曾因测试目录 HTML 被 Vite 自动扫描而产生非致命关闭提示。已改为 `.html.template`，仅显式启动测试服务时提供页面；受影响词义测试已定向重跑通过。没有降低断言或改旧语义以过关。

### 正式站实际观察与未验证项

已用浏览器实际打开 `https://onehjt.dpdns.org/`：2010 Text 1 连续原文可见，Text 2 的做题/初学精读可切换，仍使用“考场初读 / 初学精读 / 错题复盘 / 词汇学习”的 V1 标签。该观察针对现有生产版本，**不是本分支 V2 的线上验收**。

以下必须保留为未验收，不能推 main：

1. **360px/390px 实际浏览器布局及触控尚待本次试点复验**。响应式样式与SSR不等于无横向溢出实测。
2. **V2 完整浏览器闭环尚待复验**：做题→解析→原句→返回题目、词卡→原始题干/选项、手动范围标记、刷新恢复、跨账号切换与追问输入。
3. **V2 离线重开尚待实测**。沿用既有SW的已访问资源缓存，提供首次未缓存错误提示；无后端AI也无新增外部服务。
4. **本提交尚未部署到正式站**。生产 main 保持原版本；独立分支供审阅。没有触发登录、邮箱或部署调整。

提交SHA与审阅链接由最终交付消息及Git历史提供，不为将提交自己的SHA填回本文件反复修改提交。
