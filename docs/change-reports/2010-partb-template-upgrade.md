# 2010 英语二 Part B 完整训练模板升级

## 来源与范围

- 唯一英文来源为用户《考研英语二2010年真题（整卷）.docx》，SHA256 `4261d96d47e428840c390375dd9582a275d9d0ece598788788369b86dd477c8b`。正文一基245—250，原题251—265。保留英式拼写、题45罗马数字Ⅱ及原卷标点。
- 保留6段、28句、41—45五道真实T/F题，答案仍 F T F T F。正文分组1—3/4—8/9—12/13—18/19—23/24—28。正文、题干和两项原选项的fixture独立从DOCX提取；既有答案来源见 `2010-passage-5.md`。
- 稳定ID不变，不增加四选一选项。复用经审旧底稿的原文和教学说明，人工重排混合主谓块、补嵌套children和具体predicateDetails；完整导出使用统一精审配色、词块译文与阅读关键。

## 语义审查

- 28句对应25个限定、插入或省略分句；第3句that包括两个并列命题，it指方法、them指航空公司。第4句插入语不打断answer与lies；第5—8句flying/flowing/known与有限谓语分开。
- 第10句what宾语内包含完整if条件，assemble/assume/change/proceed四项共享were to；so只说明换位目的，到positions结束，proceed仍属if。第11句that包括括号内的伴随排放结果。15%是节油减幅，71%是25只鸟的航程增幅，两指标与主体不可互换。
- 第18句whether主语从句与although让步分开；蓝图不等于法规已批准。第19句how真正主语含内部that，气流使编队更高效，天气影响方式仍待研究。第21句两个省略that分别为内容连接和宾语关系代词。
- 第22句It为形式主语，for airlines为协调执行者，them回指航空公司。第23句as为倒装省略的类比，货机是reschedule的逻辑宾语。第25句has yet to begin为尚未启动，不是现在完成时has begun。
- 第26句when内they指军机，says后they指reports；当前美国军方计划不能证实二战未定国别的报道。第27句cousin后省was，lost只修饰Lancaster，不补亲属年龄、性别、长幼或最终命运；第28句should为推断。
- 35个逐句主动任务、3个地图任务；所有hintWords均检查实际单词/预标表达。新增团队共享概念 `parallel-structure`、`clause-purpose`；让步继续使用 `clause-concession`。
- 第11句首次范围练习无法在右括号结束，因为实际范围控件以词为端点。改为连接主干与括号结果的主动任务；句法分析仍保留完整that从句和括号，未为通过门禁截去语义内容。

## 题证与词卡

- 五题保留True/False判断形式，逐题给证据、命题对照、两项判断依据和可验定位路径。False表示不符或缺乏原文支持，不自动推出相反极端。第43题同时核对疑问、might与被新增的比较/因果；第45题把documented与unsubstantiated的证据等级冲突作为核心。
- 五题干及十个真实真假标签均有语言分析，True/False按省略陈述对象的形容词标签处理，不伪造完整句。
- 43个真实来源（28正文、5题干、10真假标签）共有193条人工语境修正；33来源211个词卡词位设置优先搭配。正文experience动词与42题名词、air flowing与air flows、by距离/施事、as名称/数量/类比/评注、more单一比较、working group与work out、operational guidelines与has yet to均独立处理。
- 不相关旧篇语法例如led被套lead to、as被套拍卖时间句、operational被套运筹学、should被套感叹虚拟语气，仅在此记录排错；实际词卡直接讲当前句。保留原有peer/look和unsubstantiated/unconfirmed完整句替换及可点击目标。
- 首屏搭配均来自实际连续原文，附规范结构、中文解释及例子，已有词组键优先复用。本篇专名、核心词、熟词义及结构的优先级仍为学习建议。

## 验证

| 检查 | 结果 |
|---|---|
| `npm run quality:content` | 初轮60/63；两项旧模型断言与一处新搭配注册遗漏 |
| 同类修复 | 旧objectOrComplement断言更新为精确“省略的表语”predicateDetails；lost目标递归检查真实children；旧语境核对采用本篇review覆盖并继续验证原同义替换；补齐来源搭配注册 |
| 受影响回归 | 内容语境、既有Part B两项、新专项两项先通过；完整门禁发现右括号范围端点不可操作 |
| 最终受影响检查 | 改为结果连接后，完成声明门禁及新专项3/3通过；之前已通过的内容语境与Part B回归保留 |
| 新专项 | 原卷6段和T/F、25从句关键边界、题证路径、43来源词卡、211首屏入口及实际hintWords全部通过 |
| ESLint与`git diff --check` | 通过 |
| 生产构建、部署和手机操作 | 留给根分支集成后统一验收；此隔离分支不宣称已上线 |

日志：scratch中的 `partb-content-check.log`、`partb-specific-check.log`、`partb-recheck.log`、`partb-final-check.log`、`partb-lint.log`。未重复运行已通过全套，未降低门禁或把通过代码检查等同于人工语义确认。

## 交接

提交仅包含本篇和必要接入，无来源或关键语义阻塞。根维护者负责合并、统一构建、发布、总台账。下一篇为2010翻译；完形已由团队另一代理承接，避免重复编辑。
