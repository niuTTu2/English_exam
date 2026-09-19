# 2001 Text 2 完整训练模板迁移

## 原卷与实际文本变化

- 用户原卷 `2001 (1).pdf`，SHA-256 `ed26be7b9d1c64262e9241105aab2b5d89da6bac51ff91e666dab656076a4e44`。按 PDF 技能提取并渲染核对；元数据误标 1986，首页可见标题为 2001，Text 2 正文与第 25—28 题在第 3 页。
- 保留 27 句及全部稳定 ID、原卷四段（1—5、6—11、12—14、15—27）、4 题、16 个选项、答案 C/A/D/A。英文及段落快照见 `tests/fixtures/2001-passage-2-source.json`。
- **本次英文正文有一处恢复**：第 9 句 `will be netted together` 改回 PDF 页面可见的 `will he netted together`。已直接核对渲染页面字形，不仅依据文本提取。旧导入报告记录过 he→be 校改，本次不删除该历史，也不声称正文完全未改。
- `he` 只作为原卷异常字形保留；正文、词卡和词组说明疑似应校读为 be，规范将来被动为 will be netted。中文按明确语境意图解释。旧规范词组入口仍指向原稳定 key `netted-together`；不复制新原形词条。
- 第 18 句 infrastructure 与 were 的数不一致同样保留、注明。旧历史报告提及的 all else being equal 不在现有原文和本页正文中，本次没有补入。

## 教学内容与题目

- 27 句逐句审定人工成分及 children、六色与准确功能、reading 问题、连续词块对译；保留 20 个真实有限从句。第 23 句 The Americans. 是名词短答，明确 phrase，不虚构谓语。
- 重点分清 what 主语从句与 that 定语从句、形式 it 与后置真实主语、afraid 内部主语、工具的最高级限定、观点持有者、出资/建设/拥有三种角色、have capital helping 与 help you build、which 的基础设施先行词、mean doing 与 let 宾补、needed 的设施修饰对象。
- 39 项逐句主动任务和 3 项地图回忆；真实单词/词组 hintWords、任务 revision、单向反馈依赖均有专项回归。没有把同句任务自动设为双向泄露。
- 四段地图保存 27 个句子作用、17 组指代、4 项时间线、3 组观点及边界。作者当时预测不冒充当前数据；二十年前不机械按考试年份倒推。
- 全部 20 个实际题目语言来源（4 题干+16 选项）完整分析。第 25 题 B/C 是省略宾语关系代词的有限从句；A/D 为分词修饰。第 27 题四个动名词选项与第 28 题四个名词性从句按真实结构处理。
- 每题有原文证据、改述与限度、全部真实选项理由和可通过的最小定位路径；全选正文均失败。第 26 题区分政府的经济动机与确实存在的连接功能，不把后者判成事实错误。

## 词卡、词组与共享入口

- 46 个正文/题目来源、154 条手工语境词卡，全部对应实际 token 的稳定词元。them 与 they 共用原词元时说明不同词位角色，不创造重复词条。
- 修复真实串篇/串句：存在句 there、形式 it、what/that/which、more 的程度与数量、may well/might well、实义/助动 have、mean 的正反边界、else、so、for/with/against/over 等。
- 题目语境明确 rich 修饰 countries，funds/support 为名词，building 为动名词，much 在题干为副词、在选项为限定词，foreign capital’s control 与 control over foreign corporations 方向相反。学生卡片直接讲当前结构，不放内部排错历史。
- 保留旧 27 句的可用同义替换；netted 的替换注明先校读 he 为 be，再改用 connected，标为 with-adjustment。
- 新增 25 项题目表达知识，24 处题目词组标注进入年度统计，正文保留 75 处词组标注。第 28 题 D 的 control 与 over 被 it has 隔开，采用真实连续片段 how much control / over foreign corporations 标注，规范 control over 留作结构说明。
- 消除 Text 2 lexicon 中真正重复的 combat 键：移除错误题号和不完整变形说明的旧重复项，保留正确词条。
- 学习优先级按本篇信息差距、基础设施、投资议论设置，不声称官方词频。sourceId 优先于正文定位句；其他文章隔离有回归。
- 公共门禁两处必要适配：显式 phrase 正文允许一个真实块，仍检查原文还原与准确结构；旧语境记录的词义/use 断言改比 getSentenceWordContext 的有效合并值，原有同义替换断言保留，避免把正确的来源覆盖误报成旧数据不一致。

## 检查与交接

- `node --test tests/2001-passage-2-template.test.mjs`：8 项专项通过，覆盖原文恢复、句法、提示方向、正文/题目词卡隔离、154 条来源、年度词组与定位。
- `npm run quality:content`：63/63，通过；修正上述旧门禁假设后完整复跑。
- `tsc --noEmit --incremental false --pretty false`：本篇无新增诊断；项目仍有既有 2012 Text 2 参数、Cloudflare 环境类型、全局 lexicon 与 vite 配置诊断，不记录为全库通过。
- `git diff --check`：通过。
- 按主代理安排未运行 build、不推送；由主代理合入后统一构建发布。没有声称浏览器或手机真机实测，继续复用用户已确认完成的交互。
