# 2011英语二整篇翻译训练模板升级

## 最终整合验收

- 真实公共入口7/7通过；接入完成后删除了临时条件跳过逻辑，未来注册缺失必须失败，不以跳过隐藏退化。
- 本轮全库内容检查157/157通过；随后包含三份翻译的受影响内容与公共训练门禁69/69通过，0失败、0跳过。全部新增专项已注册到`quality:content`。
- Node v24.19.0配合Git Bash执行`npm run build`，五阶段生产构建输出`Build complete.`，本地postbuild明确跳过远端迁移。
- `git diff --check`通过。独立TypeScript检查保留10项既有诊断，本轮文件无新增诊断；构建通过不冒充全库类型通过。
- 未改UI、账号、同步及部署配置。隔离本地开发预览因Windows虚拟模块加载失败而未完成交互验收，不把200响应或静态HTML当成页面功能通过。
- 按篇提交推送及Cloudflare最终状态见Git历史与交付消息；下面保留本篇作者的源卷与专项记录，不把其当时未执行的全库检查改写为亲自执行。

## 范围与来源

- 起始 `HEAD` 与 `origin/main` 均为 `8f5c80d`；直接在指定工作区处理，不创建分支、不暂存、不提交、不推送。
- 本轮正文唯一依据为既存 `tests/fixtures/2011-translation.json`。实际读取的是用户原卷快照及仓库旧报告，**没有读取原DOCX，也没有重新计算原DOCX的SHA256**。
- 快照记录来源《考研英语二2011年真题（整卷）.docx》，说明位置P275—P276、正文P277—P279；这些位置是快照元数据，不冒充本轮查看DOCX所得。
- 快照保存的原卷SHA256为 `c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82`，已与旧报告和专项常量核对。当前JSON文件自身SHA256为 `9f5a3256d85ae12edaa5c7aac254b06747bde530f654305ee30570314f695ff9`，二者是不同文件的哈希。
- 原文快照的当前Git对象与 `origin/main:tests/fixtures/2011-translation.json` 均为 `90a02da2850750f612d13f7f783cac8d34f1ca7d`；未改动、重新导入或从网络替换原文。
- 保留3段7句，段内句数1/4/2；句ID `2011-translation-s1` 至 `2011-translation-s7`，原题46、任务ID `201146`、原卷15分、整篇一次作答均不变。参考译文用于自评，不进行机器语义评分。

## 修改文件

1. `app/2011-translation-data.ts`：既有草稿接入人工审查函数；导出原卷段落描述；第4句保留then推论，第7句移除原文未明示的“我们”。
2. `app/2011-translation-syntax.ts`：7句精确components/children/clauses、reading、连续词块对译及必要补译说明。
3. `app/2011-translation-practice.ts`：11项主动任务，5项range、6项link；各句任务数2/1/2/1/2/1/2。
4. `app/2011-translation-contexts.ts`：136条句内词位语境与对应知识，覆盖7句实际可点击词位。
5. `app/2011-translation-collocations.ts`：39条人工来源搭配记录，覆盖136条词位的首选搭配；复用既有规范键，只提供缺失指南。
6. `app/2011-translation-lexicon.ts`：仅新增本篇think词条和屈折形式映射，防止thought在本句误归名词thought；旧优质词条、其他义、辨析和改写保留。
7. `tests/translation2011-template-upgrade.test.mjs`：本篇独立检查及公共接入后的实际词卡门禁。
8. `docs/change-reports/2011-translation-template-upgrade.md`：本报告。

未编辑共享 `app/data.ts`、`app/contextual-vocabulary.ts`、`app/knowledge-base.ts`、`package.json`、总进度文档及其他作者文件。

## 本篇关键判断

- 第1句Who是主语，would have thought为谓语；that宾语从句包含完整比较与破折号数量补充。as从句止于do；do为替代性助动词，不另造原文未出现的宾语。保存全球范围、大致相同和约2%的限定。
- 第2句take、a surprising toll及on the environment各有准确功能，不再把含宾语的整段仅称“谓语”。
- 第3句how many attempts是are needed的主语；to get表尝试目的，不写成are needed的宾语。0.2、7.0、grams与right引号全部保留。
- 第4句To deliver由Google执行，quickly修饰deliver；packed修饰data centres，不修饰users。then表推论，不造时间顺序。
- 第5句While表同时，省略主语为these computers；which回指空调制冷做法。发热→制冷→额外耗能，不补发电方式。
- 第6句两个and分别连接主语和谓语，monitor与make共享执行者；closely修饰monitor。
- 第7句第一处is后的名词组是表语；there is与被动不定式分别解释。to reduction为介词结构，to be done为不定式。句末by短语回接be done，not just扩大而不排除企业责任；不把无完整主谓的省略补充伪造为从句。
- have、do、more、monitor、need等逐句区分词性与语法作用；同句多次出现的to、be、and在各自use中按位置逐一解释，不强套一个义项。IT保留缩写词性，CO2不拆词。
- 词位would沿用规范键will；thought在本篇归think，不改变其他文章的带来源解析。原有volume/toll/monitor其他义、right→correct完整改写及目标词条均保留。
- 不添加阅读地图、不造客观选择题；11项练习只检验所给范围或连接关系，不声称机器判定整篇翻译正确。新任务revision为1，真实提示词形、互相泄露的反馈方向及非地图属性均有检查。

## 主代理接入清单

交付时主代理已明确反馈：以下共享文章、语境、知识和canonical复用注册均已完成，并已通过真实共享入口运行本篇专项7/7。本代理不重复运行；下面保留准确接入位置供后续维护。

### 1. 共享文章注册：`app/data.ts`

从 `./2011-translation-data` 增加导入 `translation2011ArticleParagraphs`，在 `articleContents["2011-translation"]` 设置 `paragraphs: translation2011ArticleParagraphs`。

已有 `translation2011Sentences`、`translation2011Tasks` 导入继续使用；篇内已完成 `translation2011Drafts.map(reviewTranslation2011)`，**不要再次map审查函数**。保留 `questions: []`、单个整篇任务，不增加 `guide`。统一验收通过后再登记 `teachingStatus: { syntax: true, vocabulary: true, evidence: true, practice: true }` 及总进度。

### 2. 句内词卡：`app/contextual-vocabulary.ts`

从 `./2011-translation-collocations` 导入 `translation2011TrainingContexts`，在 `sentenceWordContexts` 中放在旧 `translation2011SentenceContexts` 之后合入。该导出已按词位合并旧语境、新精审字段与 `preferredCollocations`，保留原来的contextualSubstitutions，不需再重复拼三张表。

### 3. 本句知识：`app/knowledge-base.ts`

从 `./2011-translation-contexts` 导入 `getTranslation2011ReviewedKnowledge`；在 `articleId === "2011-translation"` 分支中，先用规范headword与真实sentenceId调用它，命中即返回，未命中再走现有 `getTranslation2011WordKnowledge`。新getter已保留旧词条的辨析pitfalls，同时以当前句的grammarRole、grammarSummary与structures覆盖串句内容。

### 4. 搭配注册：同一知识文件

从 `./2011-translation-collocations` 导入：

- `translation2011SourcePhraseGuides`
- `translation2011SourcePhraseAliases`
- `translation2011SourceCollocationGlosses`

仅补共享注册表的缺失项，不覆盖已有指南。新增canonical若与已有canonical相同，应将来源别名指向既有key。**SourcePhraseAliases可能直接引用旧key，不保证SourcePhraseGuides中有同名项**：例如 `between-a-and-b`、`great-deal-attention`、`depend-on-2001p2` 必须复用，不访问未定义的新增guide，也不新造年份平行词条。

### 5. 检查与状态

主代理可将本篇专项加入统一检查入口，再负责全库检查、类型/生产构建与状态登记。本轮不修改package脚本，不运行这些全库命令。

## 必要检查结果

| 检查 | 实际执行及结果 |
|---|---|
| 原文与稳定边界 | 快照三段逐字还原、7句顺序、题号46、任务201146、一次全文作答：通过 |
| 内容专项（本代理执行） | 指定Node v24.19.0运行下方命令：当时7项登记，6项通过、0失败、公共接入项1项明确跳过 |
| 句法与词块 | 精确配色/名称、父子连续边界、主干原词序、5个真实从句、reading证据、词块还原：通过 |
| 主动任务 | 11项数量与版本、概念ID、可选范围端点、连接答案、真实提示入口、反馈依赖：通过 |
| 词卡及搭配 | 136条真实规范词位覆盖、本句字段隔离、39条来源搭配、旧知识与改写保留：通过 |
| 公共接入后端到端（主代理执行） | 主代理随后明确反馈共享接入完成并实测本篇7/7通过，包含最后的真实词卡与完成层检查；本代理按要求未重复测试，不冒充亲自复测 |
| 差异检查 | 限定8文件的空白错误检查通过，包含未跟踪新增文件；快照Git对象未变 |
| 全库quality、构建、lint、UI与部署 | 本代理未运行；整体质量、构建及发布的实际命令、结果与部署状态由主代理补记，不把本篇7/7专项称为全库或线上验收 |

```powershell
& 'C:\Users\Niu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/translation2011-template-upgrade.test.mjs
```

首轮发现thought未归think以及would应沿用will规范键，已修正文稿与本篇词位映射后重跑。新测试起初误要求既有指南的每个子结构都附例句；按仓库“至少一个有效双语实例”的要求校正了旧指南检查，新增指南仍逐结构检查例句。没有删除源句、词位、链接或任务来过关。

## 阻塞与交接

- 本篇独立结构与语境检查没有未解决失败；共享注册及实际词卡入口专项已由主代理反馈通过。真实页面、全库统一构建与部署不属于这7项结果，仍不宣称完成。
- 专项最后一项检查实际resolveEntry、词义/词性/grammarSummary、首选搭配链接、文章段落与完成状态。主代理已在接入后实测通过，按其要求不再重复运行。
- 原文排放数字为历史试卷陈述，不更新为实时科学数据。原文把温室气体比较与CO2比例并述，本轮不据此断言所有温室气体等于CO2，也不编造两行业合计数值。
- 精确词块是结构理解辅助；原卷中文表达允许多种译法，参考译文不冒充官方评分细则。自动检查不能证明全部语义唯一正确。
- 本代理无提交、推送、新分支、全库构建或部署操作；未覆盖其他作者改动。独立提交、推送及后续统一验证由主代理处理并补记结果。本篇实现停止扩充，不再重复检查。
