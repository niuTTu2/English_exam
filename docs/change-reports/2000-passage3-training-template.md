# 2000 Text 3 完整训练模板迁移

## 范围与来源

- 用户上传 `2000.pdf`，正文在第 3 页，第 19—20 题在第 3 页，第 21—22 题在第 4 页。已按 PDF 技能渲染页图核对；PDF 元数据中的 1986 不作为年份依据，页面标题为 2000。
- PDF SHA-256：`6de345bdc851e924ea3033a7ad7b1af7f8c3f68ecaf649e5a6ecb2d58ffd6212`。保存逐句、题干与选项来源指纹 `tests/fixtures/2000-passage-3-source.json`。
- 保留 13 句 `p3-s1`—`p3-s13`，原卷 4 段句组为 1—2、3—8、9—10、11—13。第 19—22 题沿用已核验答案 B/A/C/D，未改变源文、选项或题号。
- `passage-3-reviewed/reading/practice/guide/evidence/question-analysis` 保存人工句法、词块对译、阅读问题、22 个逐句任务、3 个地图任务和 4 题证据路径；`data.ts` 在旧 verified hook 之后接入，避免旧主干覆盖人工结果。
- `passage-3-contexts/word-knowledge` 及本篇 lexicon/knowledge 修补按正文与 20 个题干选项来源解释词卡。`contextual-vocabulary/lexicon/knowledge-base/vocabulary-priority` 仅增加本篇入口。

## 本篇关键判断

- `whatever` 从句整体作让步状语，内部 whatever 作表语；`even admitting` 是让步非谓语插入。第 3 句 `till now we live...` 是完整时间从句，因此全卷人工从句总数由 98 修正为 99，不能为保旧计数漏掉从句。
- 第 10 句 `to read` 与 `to find` 为两个并列后置真正主语；`off which` 修饰 bridge，区分桥的起点与河的终点。拟声和 185 公斤是被引诗行，不虚构主谓或重量归属。
- 第 12 句承认变化需要相应表达变化的一般原则；第 13 句仍在追问人是否本质改变。第 22 题 D 的 transient 是选项概括，原文没有持续年限或具体寿命，证据说明明确限定推断强度。
- 原卷确有 `past conditions ... conditionally speeding up`。保留 conditionally 并按字面“有条件地”理解；不偷偷改成 continually，也不虚构具体条件或线性规律。
- 同句 speeding（动词）/speed（名词）、fall/falling 按真实词形区分；正文 notes 为“注释”，will 为“意愿”，type 为“印刷字体”。题干 novel 为形容词，选项 review 为名词，using 为动名词，more of A than B 比较类别。
- 所有提示词用解锁讲解前的实际按钮验证，包含真实屈折词形和原文预标词组。反馈依赖按实际透露的信息记录；从句解释未透露的另一个指代任务不受到连带辅助标记。
- 沿用既有词条原形、真实来源与年度索引；未另造同义词条或重复计数。regarded→considered 的替换实际删去 as，因此修正为需调整结构，而非直接替换。
- 完整阅读层标记覆盖正文、4 段地图、全 20 题干选项语言分析和 4 题 locationPolicy；保留 4 个补全答案语言示例作为兼容阅读内容。

## 必要审计结果

| 检查 | 实际命令/范围 | 结果 |
|---|---|---|
| 原卷与语义 | PDF 第 1、3、4 页图；本文录入时逐句核对 | 完成 |
| 单篇回归 | `node --test --test-concurrency=1 tests/2000-passage-3-training.test.mjs` | 4 项通过，含真实 SSR 提示入口 |
| 通用内容 | `npm run quality:content` | 63 项通过；修复后完整重跑通过 |
| 生产构建 | 由根工作树合并后运行 | 本隔离分支按分工未运行 |
| 差异范围 | `git diff --check` | 通过 |
| 手机实测 | 本篇无界面修改；沿用用户已确认的移动交互 | 未冒称执行了新一轮真机测试 |

首次通用门禁发现旧词卡表与新覆盖结果的期望不一致，以及两个原介词选项只有一个顶层色块。前者合并人工来源表并保留已有替换，后者明确拆出介词与宾语；受影响检查 3 项随后通过。没有放宽或跳过断言。

## 阻塞与交接

- 无阻塞性文本缺失。源文 conditionally 异常及第 22 题推断边界已如实记录。
- 分支独立提交，不推送；根代理合并后构建与发布。Cloudflare 未在本篇工作中核验。
- 下一篇按原卷顺序处理 2000 Text 4。

## 2026-09-19 主分支集成验收

本篇与另外两篇分别保留独立内容提交。合并后的三篇来源/词卡/提示/定位专项16/16通过；新增提示入口、2011反馈关联及2000从句真实计数门禁3/3通过。2000从句基线累计为100，保留各句精确计数（新增Text3的till与第14题题干各1条）。主工作区生产构建通过，确认Build complete.；未执行远端迁移。本篇专项已加入quality:content供后续回归，发布状态仍以对应提交检查为准。
