# 2010 英语二 Text 3 完整训练模板升级

## 范围与来源

- 原文依据用户《考研英语二2010年真题（整卷）.docx》，SHA256 `4261d96d47e428840c390375dd9582a275d9d0ece598788788369b86dd477c8b`。正文一基段落179—185，题目186—210。
- 保留原文7段、16句、31—35题及 A A D C B 答案；原先答案来源和核对记录见 `2010-passage-3.md`。本次不另改答案，不替换用户原文。
- 句ID `2010-p3-s1`—`s16`、题ID `201031`—`201035`及已有词条保持稳定。原卷段落/题项快照存入 `tests/fixtures/2010-p3-source.json`。
- 新增人工syntax、已复核reading、篇章guide、practice、evidence、question-analysis、逐来源contexts与collocations；只做本篇必要data、词卡与优先级接入。原工作区未接入reading文件只读并复核，未修改原文件。

## 本篇关键判断

- 16句由统一人工成分生成配色，顶层连续、不重叠；15个限定从句逐个保存具体宾语/表语/补足成分，较复杂句有真实children。词块译文跟同一组chunks一一对应，不把表语当宾语。
- 第2句的 `often in response...daily cues` 仍说明消费者动作，逗号不终止when从句；从句边界与范围题均覆盖到daily cues。第5句两个that分别作turned to的介词宾语、use的直接宾语。第13句who从句包含退休来源中的公司同位说明及内部that sold，销售额归宝洁，不归心理学家。
- 保留首句原卷had perfected；recently与last year各自限定退休和公司销售，后者按文章叙述时间理解。正文7段按原卷分组，不按教学主题重新猜段。
- 全篇28项逐句主动任务、3项地图回忆。复杂句用范围或连接，简单句只保留必要问题。hintWords按实际可点击词形核对（如it's）；只声明确会泄露答案的反馈依赖，未将同句两题一律双向污染。
- 5题各有多句证据、全部真实选项判断和精确定位路径。第33题的A/B/C事实成立但不应选入NOT题；第34题区分实验的认识作用与广告的习惯塑造作用；第35题区分企业引语和叙述者评价。
- 全部5题干、20选项补语言分析。第31题选项是补全题干谓语的片段，第33题品牌及第34题名词短语、第35题形容词不虚构完整句主语谓语。
- 41个来源（16正文句＋25题干/选项）补247条独立审定词汇语境，并为29个来源的159个词卡入口设定优先搭配；保留已有完整词库覆盖。代表修复：正文use动词/名词、commercials名词/34C commercial形容词、32C buying power的购买力、33题Which疑问代词、14句it's真实指代、15句两个through的不同动作归属。旧词卡中的其他文章例子不再充当前语境解释。单词“使用”与词性n.分栏，不将词性术语写进词义。
- P3范围内统一people及people's的规范词位为people，不改其他篇归一化。已存在的规范词组键优先复用；新增优先搭配有原文表达、规范结构、中文规则和原文双语例子。年度词表、词族、出现位置仍走既有统一语料入口。

## 必要审计结果

| 检查 | 实际命令或范围 | 结果 |
|---|---|---|
| 来源及语义 | 逐段原卷核对，录入同步语义审查 | 正文、题项、答案不变；原7段全部还原 |
| 本篇专项 | `node --test tests/text3-template-upgrade.test.mjs`及修正后的专项重跑 | 最终2项通过；覆盖完整when范围、嵌套公司说明、实际提示入口、词卡及NOT/观点归属 |
| 内容检查 | `npm run quality:content` | 首轮60/63；缺失语境字段与两个旧模板断言在同类汇总后修复 |
| 受影响检查 | `node --test --test-concurrency=1 --test-name-pattern='同一词条\|Text 3\|声明完成\|Text 2词卡' tests/content-quality.test.mjs tests/training-template.test.mjs tests/text3-template-upgrade.test.mjs` | 7/7通过，包含原3项失败和本篇2项专项；未跳过原失败 |
| 代码检查 | `npx eslint app/2010-passage-3-*.ts app/contextual-vocabulary.ts app/data.ts app/knowledge-base.ts app/vocabulary-priority.ts` | 通过，无本篇警告 |
| 差异与范围 | `git diff --check` | 通过 |
| 整合后检查 | 新提示入口门禁、本篇及2011 Text 1受影响来源检查 | 9/9通过 |
| 生产构建 | 主工作区 `npm run build` | 通过，确认 Build complete.；非生产环境跳过远端迁移 |
| 公开页面与手机 | 尚未发布本篇 | 未验证，不把自动测试当作真机验收 |

两条旧断言按本次已授权范围精确更新：use改为分别验证n.词性和“使用”义项；Text3现有优先级，须验证Hacker在此不误认专名、Curtis为专名，并继续验证未知篇目不获建议。这不是删除或降低质量门禁。

## 阻塞与交接

- 无未解决的来源或关键语义疑点。下一篇为2010 Text 4，继续逐篇完成，不混入本篇提交。
- 主工作区已完成集成和构建，待走既有main→Cloudflare发布；提交SHA及部署结果留在Git历史和交接消息。全库台账由主维护者在集成时更新。
