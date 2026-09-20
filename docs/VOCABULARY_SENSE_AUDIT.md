# 全库词义归并与防重复维护

本轮继续用户反馈的“释义措辞稍有不同就被拆成多个词条”问题。文章原文、语法、翻译、题目与答案、词条稳定键、账号和同步配置冻结。

## 为什么上一轮仍有重复

旧聚合以完整中文释义相等作为主要兜底。上一轮增加274词的明确别名，解决了and等高频问题，但没有完整覆盖词库。此外，旧资料把多个词性、多个真义、构词说明、搭配整体义混写为一段；这段话也被当成另一条词义。仅检查从原句打开的卡片，会漏掉默认原形查词入口加入的总括释义。

本轮全入口基线包含3,015个稳定词条、14,432条已标注语境、5,945个原显示行。其中1,286个词在至少一个入口显示多行，全部要求逐词审阅；多行本身并不代表重复。原句入口、无来源默认入口、来源特有的其他义项和已有senseGuide均纳入清单。

## 归并规则与完整信息

- 同词、同词性、相同核心义的不同译法通过精确的人工映射共享语义标识。不能用共同汉字、相似度或包含关系自动合并。
- 真实不同意思与词性继续分别显示。例如work的艺术作品、名词工作、动词劳动、奏效，以及health/healthy在已有稳定键下的不同词性。
- 精确来源映射包含sourceId、原词性、原释义；必要时再包含原文词形。patents/patented在同一句也能分别归类，不把一句里的两种用法混为一项。
- 混合旧段落中的明确词义分别显示。`fromNotes`保留其原文依据，没有确切语境时不分配考试次数。原段落及词性/用法说明在“原始用法补充”里保留，不再伪装成另一条核心词义。
- 同一义项的次数取真实sourceId并集，不简单相加；所有原词形、原释义、原用法、原句和出处仍可展开。教学例句不算真题次数。
- 特别保留固定搭配边界：all but two中的but不能计作普通转折；take等词在固定表达中的作用不等同于整个词组的翻译。

新增五份`reviewed-senses-*.ts`是指向现有语料的身份映射，不是第二套词库。`reviewed-senses.ts`按打开的词建立索引，显示结果按词缓存，首页不扫描全库。审计清单只供开发检查，不进入浏览器包。

默认查词另修两处阻塞：只有屈折形式有词卡的path/channel等基形，现在复用已导入语境，不再误称没有语料；已经独立导入的ruling、prompting、found等，不再因通用词形回退而打开rule、prompt、find的其他意思。来源解析和既有稳定词条键保持原样。

## 旧学习记录

没有新增必填持久化字段，没有数据库迁移或同步格式变更。原memory ID、sense ID、attempt、session、评分、到期日、主出处、笔记、清单以及旧term字段完整保留。读取时复用现有无损语义分组；不因查看词卡或打开队列改期。实际评分仍走原有调度及同日晋级限制。

新映射能让相同意思的旧记录在队列中按一个义项出现；不同意思的旧进度保持独立。明确属于整体结构或多个用法的旧注释，不再被粗粒度别名误并到某个普通词义。此类记录保留自身历史，不推测缺失信息，不要求用户手动补语境。

## 持续防回归

`scripts/audit-vocabulary-senses.mjs`导出真实词条输入、每个词的显示义项与来源，并提出需要人工核对的候选。候选不是自动合并授权。

`tests/fixtures/vocabulary-sense-review.json`保存每个词的输入指纹、原始证据、审阅结论和归并结果指纹。1,286个多行词必须有明确审阅结论和理由；单行条目标为`single-display`，不冒充完成了语义精审。`mixed-unresolved`表示某段旧注释无法唯一分配来源次数，不代表删除它。

`npm run quality:vocabulary-senses`遇到新增词、释义、出处、更改用法或例句、归并变化、删除条目都会失败。该门禁已接入`quality:content`，因此日常文章导入也会运行；不依赖维护者记得另执行一次。

新增内容的处理顺序：运行审计查看差异；检查原句和已有指南；更新精确映射或记录为何保持不同；更新对应人工结论；用`--write-ledger`显式重建清单；运行门禁及有关专项。禁止为让检查通过而自动刷新清单、把未审内容标成已审，或以字符串相似替代语义判断。

命令示例（输出路径及review文件按本次任务指定）：

```sh
node scripts/audit-vocabulary-senses.mjs --output /absolute/audit.json
npm run quality:vocabulary-senses
npm run quality
./node_modules/.bin/tsc --noEmit --incremental false --pretty false
git diff --check
```

专项还检查所有精确映射和`fromNotes`均有真实证据、全部原始语境字段保全、同一词性同一规范释义不能残留不同显示ID、同句不同词形不误合、旧记录不变、普通转折与数量结构分离、补充说明折叠且明确义项可见、默认查词回退。

## 修改文件

| 职责 | 文件 |
|---|---|
| 精确归并类型与索引 | `app/vocabulary-learning/reviewed-sense-types.ts`、`app/vocabulary-learning/reviewed-senses.ts` |
| 五个审阅分区 | `app/vocabulary-learning/reviewed-senses-a-f.ts`、`app/vocabulary-learning/reviewed-senses-g-m.ts`、`app/vocabulary-learning/reviewed-senses-n-s.ts`、`app/vocabulary-learning/reviewed-senses-t-z.ts`、`app/vocabulary-learning/reviewed-senses-function.ts` |
| 显示、身份与旧记录分组 | `app/vocabulary-learning/sense-overview.ts`、`app/vocabulary-learning/sense-overview-panel.tsx`、`app/vocabulary-learning/sense-registry.ts`、`app/vocabulary-learning/memory-groups.ts` |
| 默认查词回退 | `app/vocabulary-learning/imported-entry-fallback.ts`、`app/study-app.tsx`（有限接入） |
| 全库门禁 | `scripts/audit-vocabulary-senses.mjs`、`tests/fixtures/vocabulary-sense-review.json`、`package.json` |
| 新增专项 | `tests/vocabulary-canonical-context.test.mjs`、`tests/vocabulary-function-review.test.mjs`、`tests/vocabulary-reviewed-registry.test.mjs`、`tests/vocabulary-sense-audit.test.mjs` |
| 精确来源旧断言更新 | `tests/vocabulary-semantic-dedup.test.mjs`、`tests/vocabulary-sense-overview.test.mjs` |
| 交付说明 | `docs/VOCABULARY_SENSE_AUDIT.md`、`docs/VOCABULARY_LEARNING_UPGRADE.md` |

旧断言更新没有绕过保护目标：work的旧宽泛原注经原句确认后归入名词工作，测试改为核对全部6个确切来源、原注文字仍存在、不会分摊到动词义；未审的bank宽泛合写仍不得推断归并。it的完整义项表增加无来源的情境占位义，测试明确检查其次数为未知，原三种功能的来源计数不变。

## 验证与限制

最终全入口复算结果：原5,945个显示行整合为4,374个核心义项及846条可展开的原始说明，909个词的首层义项行减少。14,432条原语境的原文、词形、词性、释义、用法、年份和出处完整保留；同词性、同规范释义却占不同显示ID的残留为0。这些是显示/归类统计，不是删除了若干词库记录。

1,286条人工审阅结论为：1,006条归并或结构化、175条确认保留真实区别、105条包含无法唯一分配出处次数的混合旧说明。最后12个共享译词候选（come、greet、have、human、interest、interpret、justice、regard、road、so、still、threaten）均已核对并记录保留边界，不能为了把机器候选数清零而合并真实多义。

本轮实际验证记录如下；不把修复前的失败写成全量通过：

| 命令 | 实际结果 |
|---|---|
| `npm run quality` | lint通过；内容171/171及义项门禁通过；构建通过；全套421项中420通过、1失败。失败定位到默认入口回退对有出处词卡的用法/POS优先级，已修复；未删除或放宽原断言。 |
| `node --test --test-concurrency=1 tests/vocabulary-canonical-context.test.mjs tests/vocabulary-senses.test.mjs` | 最终修复后15/15通过，包括全14,432条原语境的词形、词义、词性和用法一致性；增加了原回归点的具体来源断言。 |
| `node scripts/audit-vocabulary-senses.mjs --check-ledger` | 最终修复后通过，`unchanged-reviewed-inputs`；清单未被自动刷新。 |
| `npm run build` | 最终代码重新构建通过；现有大包及路由静态分类提示仍在。 |
| `npm run lint` | 最终代码0错误、6个既有警告。 |
| `node --test --test-concurrency=1 tests/ui-components.test.mjs tests/rendered-html.test.mjs` | 最终构建后15/15通过。 |
| `./node_modules/.bin/tsc --noEmit --incremental false --pretty false` | 退出2，10个旧错误与修改前基线逐字一致，无新增；不宣称全量类型检查通过。 |
| `git diff --check` | 通过。冻结的真题/答案内容和认证、同步、部署配置没有修改。 |

按仓库发布规范，失败修复后重跑受影响检查，没有再重复整套421项。新增审计、映射证据、旧记录分组、会话/队列、拼写和HTML专项均已在上述全套中运行；本轮不声称最后一次`npm run quality`退出0。

准备按两个独立阶段提交（归并功能、全库门禁与报告），完成后一次更新main。发布前在旧正式版本通过正常访客界面留下第1张bankruptcy的15卡会话，暂停后首页显示完成0张、今日已完成2项。提交SHA、Cloudflare结果及新版本实际页面/会话恢复结果记在交付消息，不为回填本提交自己的SHA反复提交。

仍不能把一段没有足够证据的旧混合注释强行分到某个义项。例如同一句多次出现且角色不同的be/to/of，或孤立错误选项同时给出两种可能含义。此类原注完整保留，其已明确词义显示，频次不伪分配。今后新增内容仍须审阅；测试可防映射漂移和信息丢失，不能自动证明所有中文语义判断永远正确。

可用云浏览器没有360px/390px视口控制、Android/iOS真机和真实软键盘能力。本轮应报告实际桌面验证，不把HTML结构测试当成手机真机验收。
