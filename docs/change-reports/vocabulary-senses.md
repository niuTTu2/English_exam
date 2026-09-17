# 词卡多义用法与逐出处中文义交付报告

## 范围与来源

- 日期：2026-09-17。响应用户对单词/词组全部常见考查义项、用法及年份对应中文义的要求；本轮不是文章导入，不改正文、题干、答案或题号。
- 复用已导入真实语料。所有年份、出处、词形、词频仍来自正文、题干和选项；教学例句是新写的演示句，不标示考试年份，不进入语料计数。
- 常见义项核对：剑桥词典英语词条。19个单词：note、company、address、interest、subject、state、case、issue、account、mean、figure、term、matter、present、value、move、practice、observe、charge。
- 单词来源格式：`https://dictionary.cambridge.org/dictionary/english/<word>`。逐页核对释义后自行组织中文解释、搭配提示和双语教学例句，不复制词典长段落或整页例句。
- 另核对短语页面：`https://dictionary.cambridge.org/dictionary/english/make-up`、`https://dictionary.cambridge.org/dictionary/english/in-turn`、`https://dictionary.cambridge.org/dictionary/english/as-well-as`、`https://dictionary.cambridge.org/dictionary/english/rather-than`、`https://dictionary.cambridge.org/dictionary/english/account-for`。note、company页面与既有精审句法支持相应名词搭配。as well as比较义另由2000阅读Passage 2原句及既有精审规范结构确认。
- 本轮新增19词119项、7类词组18项，全部具有词性/结构、中文义、用法搭配和双语教学例句。它们是已核验常见义项，不宣称每项都已考过、按考频排序或全词库考义已穷尽。其他词继续显示既有多义补充和全部已导入真题用法，不用猜测填充词库。

## 设计与关键判断

- `app/vocabulary-senses.ts`：通用义项独立于本句义，按稳定lemma或既有词组规范键关联；每个义项有局部稳定ID。不同词组结构可共用用法家族，但不改变旧pattern键、原文实例或次数统计。
- `app/data.ts`：词卡新增可选`senseGuide`，出处新增可选`contexts`。保留手写旧seed兼容，运行时每个真实出处都补齐词形/表达、词性、中文义和用法。
- `app/contextual-vocabulary.ts`、`app/lexicon.ts`：支持句内词性覆盖；note的2000 Passage 3为注释、2000 Passage 5为虚伪意味、2010完形为注意到异常、2010 Text 1为事件结束的基调。保留原有observe与striking替换，不用通用词典义覆盖本句义。
- 词组新增源位置限定释义入口。`a lack of sales`与需求例句复用同一规范键，但当前中文义为销售不足；2000 Passage 2内的`as well as`按同级比较解释，不能套用通用“以及”。浏览补充解释不迁移已有存储键。
- `app/study-app.tsx`：出处按真实sourceId重新解析实际词形，不复制当前选中词义；题干与选项保持独立source，不冒充正文句子。每处保留多个不同词形/词组实例，重复同形折叠但不改次数；词形和规范短语查询分别缓存，避免多个年份反复全量解析。
- 单独的`TermSenses`放在本句义之后，常见义项、既有多义补充、真题用法分层折叠。真题近似中文表述不当作独立词典义项计数；教学例句明确标注非真题。词组家族中的语法差异逐项说明。
- 年份列表按钮保留原有跳转功能，新增每处中文义、实际表达与词性；不嵌套交互元素。`app/globals.css`提供窄屏单列、键盘焦点与44px触摸区域。
- 新义项区域在原有自测解锁边界内；不提前泄露答案。不访问账号、密码、真实学习数据或生产数据库，不修改同步、认证、存储schema、依赖或部署配置。

## 必要审计结果

| 检查 | 命令/范围 | 实际结果 |
|---|---|---|
| 来源与语义 | 19词及5个短语词典页；note四出处、company公司/结伴、需求/销售、as well as比较 | 已完成 |
| 多义专项 | `node --test tests/vocabulary-senses.test.mjs` | 9/9通过；覆盖1981个词条及全部已标注词组的运行时出处 |
| 既有学习体验 | `node --test tests/study-experience.test.mjs` | 15/15通过 |
| 内容检查 | `npm run quality:content` | 29/29通过 |
| lint | `npm run lint` | 通过 |
| 构建与UI | `npm run build`；`node --test --test-concurrency=1 tests/ui-components.test.mjs tests/rendered-html.test.mjs` | 构建通过，UI6/6通过；本地构建跳过远端迁移 |
| 类型基线 | TypeScript内存对比HEAD与当前；不生成文件 | 两者均为10项既有诊断，无新增；不宣称全量tsc通过 |
| 手机/电脑 | 隔离匿名Chrome：1366px电脑、390px手机 | 四个note中文义、音符例句、默认折叠、跨年份跳转与焦点、make up六义、键盘Enter展开均通过；无横向溢出、无pageerror；自测锁定时多义、本句义、年份行均未渲染 |
| 差异与范围 | `git diff --check`及verify-change脚本 | 通过；README已同步，设计写入本报告；不提交无关`.serena/`、`.spec-workflow/`和`audit.log` |

本地界面截图与内容/lint/构建日志保存在忽略的`outputs/vocabulary-senses-*`，不混入代码提交。必要检查共59项测试通过，不重复执行会再次构建的`npm test`。规范词组查找、词频、旧键与年度索引仍由既有测试及本轮针对性测试共同保护。

## 阻塞与交接

- 关键语义疑点：无。全词库义项穷尽不是本轮核验结果，不以数量保证代替语义审查。
- 下一步：独立提交推送后匿名核验两个既有生产域名。所有发布前检查已完成；不重复本轮未改变的测试与构建。
- 提交/推送：待提交；最终SHA见Git与交付消息。
- Cloudflare：尚未核验本轮版本；不另建部署，不改域名或令牌。
