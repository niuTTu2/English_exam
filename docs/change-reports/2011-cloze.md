# 2011英语二完形填空交付报告

## 范围与来源

- 用户附件《考研英语二2011年真题（整卷）.docx》，正文P005—P013、题目P015—P114；SHA256：`c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82`。
- 九段、16句、20题；句ID为`2011-cloze-s1`—`s16`，题目存储ID为201101—201120。`tests/fixtures/2011-cloze.json`保留独立附件快照。
- 中国教育在线2011-02-15答案表与原卷逐题核对，答案ACBDD BACCB DBACA ADACD；来源登记于`app/verified-answer-keys.ts`。网络仅用于答案交叉核验，不替换附件正文。
- 新增三个篇目数据文件；接入data、lexicon、contextual-vocabulary、knowledge-base与年度入口；不修改认证、同步或部署配置。

## 关键判断

- 原卷的`an initiative push`原样保留，不擅自改为网上常见的`an initial push`。译为倡议性的推动，记录版本差异。
- 每句人工成分拆解和从句内部主谓宾；`what would eventually be...`为toward的宾语，`It seems clear that...`有后置主语从句；最后一段They指计算机安全专家。
- very在that very anonymity中是强调形容词；once为一次，private为私营，range为一系列，license区分名词和动词；themselves只回指网民，不沿用旧句迁移运动解释。
- 词组实例与规范形式分离，强制注册复用`be-forced-to-do`；删除不完整的`a compulsory Internet`标记，避免把网络误当强制性的语义中心。
- afford补充提供与负担得起义，第一句提供完整provide替换；其他多义与中文出处沿用既有词卡体系，学习记录键不变。

## 检查

- 通用内容测试29/29通过；新原文/选项/答案/语境专项2/2通过。
- 学习体验15/15、多义词9/9通过；lint及生产构建通过，构建未执行远端迁移。
- 补回自测答案词、speech词条并对齐目录顺序后重跑相关检查通过；TypeScript新增Entry类型兼容问题已修复，使用HEAD覆盖读取与当前代码分别检查，均为10项既有诊断、无新增。
- `git diff --check`通过；没有界面组件改动，不重复全量UI测试。

## 交接

- 内容关键疑点已解决；写作原图数字标注被遮挡，后续只能按可辨识柱高写近似值。
- 下一篇：2011 Text 1，第21—25题。Part B与写作尚需真实题型接入，不能宣称整卷已完成。
- 本报告记录发布前状态；独立提交/推送与公开页面结果以Git及最终交付为准，尚未读取Cloudflare控制台部署状态。
