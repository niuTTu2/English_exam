# 词汇学习、背诵与复习升级

审计基线：`8d936e886d392b0030a9129f913f4d3cb760f68d`（`niuTTu2/English_exam` 的 main）。本轮任务以用户最新词汇升级指令为准，覆盖旧文档中的按篇内容升级安排。2026-09-19 开始审计；本文先记录审计与设计，实施结果另附交付报告。

## 范围和读取记录

团队已完整阅读 AGENTS、START_HERE、README、内容质量标准、训练模板、发布清单、文章导入模板，以及 data、study-app、study-sync、vocabulary-priority、vocabulary-senses、contextual-vocabulary、knowledge-base 的现行实现。另核对学习状态 API、现有同步测试、移动 CSS 与离线缓存。

真题原文、句法、语法任务、翻译、地图、题号/答案/证据/选项解释、已有文章与词条稳定键全部只读。账号、邮箱、登录、部署配置不变；只扩展用户明确要求的词汇快照校验和同步兼容。不得修改旧内容断言来通过检查。独立工作区保护其他工作区未提交的文章文件。

## 1. 当前单词卡流程

正文、题干、选项点击词形后，`resolveEntry(label, isPhrase, sourceId)` 读取既有规范词条与准确出处，再打开侧栏。精读通常立即显示本句义，考场页受既有解锁规则限制。年度词表直接显示中文，适合检索但不能承担先回忆的学习流程。

卡片已有本句义、词性、用法、搭配、语境替换、扩展义与统计。底部三档“正确/模糊/错误”修改 termRatings/reviewSchedule，评分后不自动切换，必须返回清单再点下一项。

## 2. 当前词组卡流程

词组由人工 phrases、题目分析与可靠知识结构提供，`sourceExpression` 与 `canonicalForm` 已存在。规范 `pattern:` 键及出处可复用，但当前与单词共用侧栏和旧评级调度，没有独立连续练习、挖空或拼写记录。

部分 resolver 返回的 sourceExpression 可能来自原始 seed；新学习卡必须使用当前真实 annotation 的 label，不能把 seed 出处表达当成当前原文。不会将相邻词自动组成词组，也不会把标记词组拆成多个单词。

## 3. 当前加入复习的方式

四种标记为“完全不会/有些陌生/不会搭配/容易混淆”。首次标记安排立即到期并保存当前 termContexts。自定义 lists/listItems 可独立保存出处。打开词卡本身不自动加入。

旧标记仅按词条稳定键记录；不能判断同一 lemma 的哪个含义已经掌握。新入口将标记连接到当前准确语境的 sense 记忆，并继续保留旧标记和出处。

## 4. 当前复习调度

`filterReviewKeys` 已区分到期/逾期/全部，未来时间不会进入已到期列表。`nextReviewSchedule` 使用 1、3、7、14、30、60 天，但每次点击“正确”都增加 repetitions，没有同日或提前复习保护。旧界面不存在本轮重现队列、连续学习会话或每日新词限制。

新调度为纯函数：未学习/学习中/待复习/已掌握/已暂停；忘记和模糊在本轮重新插入，重复困难项允许用户暂停保留，不伪造独立掌握。成功递进须到期且当日尚未晋级；提前复习不得推后既有到期时间。逾期时间只在实际评分后改变。优先处理逾期和到期，分批完成，提供10项和10分钟会话。

## 5. 当前持久化与同步

本机使用 `zhenti-judu-study-v2:guest` 或按邮箱隔离的 account 信封，包含 state 与最近同步 base；快照仍为 version:1。旧 `zhenti-judu-study-state-v1` 保留并支持显式恢复。服务端有账号校验、版本 CAS、写前备份触发器及空白覆盖防护。

`normalizeStudyState` 通过展开 snapshot 暂存额外字段，但组件手动重建 persistedState 会遗漏未知字段。三方合并支持新增 map，却可能把旧客户端缺失字段解释成删除；会话数组不能按普通集合合并，否则破坏顺序。服务端现有 preserveTrainingRecords 只保护训练字段。

新字段必须可选、客户端与服务端共同校验；未知扩展字段在往返中保留。尝试记录以不可变 ID 合并，记忆调度和完整会话按原子值处理，同项并发冲突保留双方并停上传，不拼凑不可能的调度或队列。旧页面漏传新字段时服务端保留已有记录。本轮不重建数据库或改变身份流程。

现有云端快照上限 500,000 字符是实际容量约束。新持久化只保存记忆/来源引用与进度，不复制整份词典和真题全文；原文、译文、完整知识按来源读取。超过上限保留本地记录并明确暂停同步，不能截断记录或建议以删除学习数据作为正常流程。

## 6. 当前移动端体验

既有响应式页面和手机交互保留。词卡侧栏使用固定高度滚区，评分按钮在内容下方；没有单手连续评分页，用户需要反复进出列表。新界面采用独立受限宽度卡片、至少44px操作目标、底部安全区和不遮挡正文的评分区；拼写表单在文档流中并响应可视高度。360px/390px需实际检查，真机软键盘和iOS行为不能仅凭HTML断言宣称验证。

## 7. 最影响连续背词的问题

- 先读释义后自评，缺少清晰的主动回忆阶段。
- 评分不自动下一张，没有暂停恢复、困难项重现和结束总结。
- 词条级进度把多义词混在一起；词组虽可查，却没有独立学习流程。
- 正确按钮像客观判题，实际只是用户脑内回忆后的自评。
- 首页没有到期单词/词组、每日目标、完成和积压的统一入口。
- 全年词表和出现统计涉及大量 resolver/全库扫描，不宜在每次学习首页渲染时构建。

## 8. 直接复用的字段和函数

| 现有能力 | 本轮用途 |
|---|---|
| VocabEntry.key/kind/headword/display | 维持原有词条身份，区分词与词组 |
| contextualMeaning/partOfSpeech/use | 当前语境答案首屏 |
| sourceExpression/canonicalForm | 词组原文与规范形式分列 |
| structures/collocationDetails/pitfalls | 一个关键结构与按需展开的规则、易错点 |
| synonymDetails/contextualSubstitutions/familyDetails | 同义替换与词族扩展，不混入首屏 |
| specialForms/otherMeanings/counts/occurrences | 可选巩固、其他义与真实出处浏览 |
| vocabularyPriority | core/sense/structure优先；function/recognition/name默认排除 |
| vocabulary-senses 人工义项ID | 复用已核验语义，并建立来源到sense的映射 |
| resolveEntry/findTermContexts/sourceDestination | 当前词卡解析、真实出处和返回原句/题目 |
| termRatings/reviewSchedule/termContexts | 无损迁移输入，旧字段继续可用 |
| marks/termNotes/lists/listItems | 用户主动候选、笔记及自定义范围 |

已有字段没有可靠音标或音频时不编造。浏览器发音仅为可选增强，不阻塞离线核心学习，不增加付费依赖。

## 9. 新数据结构和模块边界

新增 `app/vocabulary-learning/`，分离 model、sense-registry、scheduler、queue、session、spelling、corpus、migration、persistence 和 React 卡片/首页/总结。study-app 只做旧状态和入口的薄适配，不继续堆入新业务。

可选快照扩展：vocabularyMemories、vocabularyAttempts、vocabularySessions、vocabularySettings、vocabularyQueueState、vocabularyMigration。每个记忆项保存原有termKey、类型、sense ID、主要/轮换来源、状态、到期、间隔、连续掌握、遗忘数、最近自评/时间、拼写开关和独立拼写成绩、暂停及创建/更新时间。

sense ID 不能以中文文本作为唯一长期主键：优先已有人工义项/明确来源注册；未注册含义采用稳定词条+词性+来源锚点，已识别同义语境附加到现有记忆项并保留来源成员。只合并有依据的相同核心义，不以相同原形强并；相同词形出现十次不自动生成十张同义卡。`note`的基调/意味与注释、注意到分开；共享既有原形次数和词族知识。

学习会话保存有序队列、当前索引、当前卡翻面状态、逐次尝试、困难重现和结束状态；每次评分以稳定尝试ID一次结算。刷新、返回或登录状态恢复不能重算前六张。阅读自评与拼写判分分开。

语料候选按文章/年份/全部/标记/清单显式启动时按需构建并缓存；首页只统计已有记忆和当日事件。候选先用轻量已有语境/优先级筛选，卡片展示再解析完整知识。不会导入一套平行词库。

## 10. 旧记录迁移

1. 读取并校验原始信封；任何解析/迁移错误保留原始字符串并设置停写，禁止空状态写回。
2. 在内存构造可选新字段；原有 termRatings/reviewSchedule/termContexts/marks/termNotes/lists/listItems 和未知字段原样保留。
3. 以保存的准确出处优先解析 sense；多个保存语境按义分组，原来无法证明的独立掌握不推定到新义。没有准确来源的旧项保留并待按真实候选解析，不任意选一个不相关句子覆盖。
4. 旧到期时间/间隔照原记录保留，不重排逾期时间；旧错误/模糊仅作为迁移状态，不能冒充新会话自评事件。
5. 保存迁移映射/版本，重复进入幂等；先保存保护副本并完成校验，再使用现有账号隔离存储和同步。
6. 账号切换或迁移失败必须阻止旧内存写到目标账号；本机写失败也停止上传。

## 实施与验收计划

按审计/模型、连续学习、词组多义、拼写联动、同步验收形成阶段提交，全部通过后一次推 main。必测 momentum、note、filed for bankruptcy、all but two、Damien Hirst、同义合并/异义拆分、旧记录保留、未来/到期过滤、同日不晋级、第7张刷新恢复、20张连续评分及360/390布局。

执行专项、现有study-sync/auth、quality:content、lint、build、必要类型检查与构建后UI回归。若有旧类型基线错误，分别记录基线和本轮。公开站需要真实打开并操作学习/复习/词组/恢复；Git推送或Cloudflare成功不等于页面可用。最终交付记录每个SHA、命令结果、线上项目、设备限制和已知不足。
