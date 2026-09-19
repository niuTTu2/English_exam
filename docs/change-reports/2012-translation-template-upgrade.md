# 2012年英语二整篇翻译训练模板升级

## 最终整合验收

- 本篇真实公共入口7/7通过；全部新增专项已纳入`quality:content`，不设置条件跳过。
- 本轮首轮全库内容检查157/157通过；随后包含三份翻译的受影响内容与公共训练门禁69/69通过，0失败、0跳过，退出码均为0。
- Node v24.19.0配合Git Bash执行`npm run build`，五阶段生产构建输出`Build complete.`，退出码0；本地postbuild明确跳过远端迁移。
- `git diff --check`通过。独立TypeScript检查仍为10项既有诊断，退出码2；本轮文件无新增诊断，不宣称全库类型通过。
- 未改UI、账号、同步及部署配置。隔离本地开发预览因Windows虚拟模块加载失败而未完成交互验收，不把200响应或静态HTML当成页面功能通过。
- 按篇提交推送及Cloudflare最终状态见Git历史与交付消息；以下保留作者当时的源卷与专项记录，不把主代理的整合检查写成作者亲自执行。

## 范围与来源

- 基线：本轮开始与专项完成后核对，HEAD及origin/main均为`8f5c80ddab79d099efa797983a3c130d858d47ab`。
- 唯一原文依据：复用`tests/fixtures/2012-translation.json`中的用户原卷快照；两段来源索引为264、265。本轮没有直接读取原DOCX，也没有重新计算DOCX哈希，不能据此声称亲自核对过原DOCX。
- 快照所记录的来源SHA256为`b91cfe8e6a3eb63b02fc6573514e34a67937bf8160a5712ce640315e2da306f9`。这是复用的来源元数据，不是本轮重新验证的原卷文件哈希；该夹具未提供原DOCX文件名。
- 保留六句、两段（2句＋4句），稳定句ID为`2012-translation-s1`至`2012-translation-s6`。保留原题号46、任务ID201246、15分和`format: "passage"`，整篇一次作答。
- 参考译文供学习者自行对照，不是官方阅卷答案，不提供整篇译文自动评分。新增的句内任务是结构和阅读训练，不是补造原卷选择题。
- 本轮不创建篇章地图、不修改登录、同步或交互，不提交、推送、建分支，不运行全库测试或生产构建。

## 修改文件

| 文件 | 本篇职责 |
|---|---|
| `app/2012-translation-data.ts` | 原句保持不变，套用精审结构；保留整篇任务及既有句ID；新增可供主代理接入的文章段落导出；新增两项有实质内容的词组入口 |
| `app/2012-translation-syntax.ts` | 六句人工components/children、七个有限从句、reading、连续词块对译、补译与原卷瑕疵说明 |
| `app/2012-translation-practice.ts` | 11项任务，逐句2/2/1/2/1/3；全部采用range/link/order，包含提示入口及有方向的反馈依赖 |
| `app/2012-translation-contexts.ts` | 132条逐句词元语境及当前来源优先的知识结构；覆盖本篇全部136个逐句去重英文词形 |
| `app/2012-translation-lexicon.ts` | 在既有导出内部合并精审语境，保留原有规范词条、词形别名与bothered→troubled整句替换 |
| `app/2012-translation-knowledge.ts` | 当前句知识优先于旧词条知识；保留原有词组，新增原卷瑕疵对照和Silicon Valley，明确年龄规范式不回填原文 |
| `tests/translation2012-template-upgrade.test.mjs` | 本篇7项专项回归，检查来源、结构、关键语义、任务、实际词卡与原有公共入口 |
| 本报告 | 记录真实来源复用、专项结果和主代理接入事项 |

未写入共享`app/data.ts`、`app/contextual-vocabulary.ts`、`app/knowledge-base.ts`、`app/lexicon.ts`、`package.json`或任何总台账；不覆盖其他写作者的内容。

## 关键判断

### 原文瑕疵与学习规范分开

- 第1句`their best and brightest departure`保持原样。`workers`和`brain drain`支持人才离开的语境解释，但不足以唯一恢复原本拟用的英文形式。明确标记内部连接存疑，不硬说best and brightest正常修饰departure，也不再断言原文一定缺某个所有格形式。
- 仅供学习的例子为`the departure of their best and brightest`。它只出现在中文讲解和独立规范例句中，不进入原句、主干、英文词块或来源快照；其词组入口同样显式警告不是校正后的原文。
- 第4句`over the age 25`保持原样，明确原文缺常见连接of、不将25硬讲成规范同位语。学习规范式另列`over the age of 25`。语义边界为严格超过25岁；既有自然译文的“25岁以上”由翻译注释说明，不据此将25岁整纳入统计口径。

### 从句、并列和数字口径

- 第1句When为时间背景状语从句；主句逐项区分they、are、usually、concerned，表语不冒充谓语或宾语。
- 第2句主句为主系表。外层that修饰workers，作attract的宾语；内层that修饰rules，作privilege的主语。外层完整包含by方式短语与内层关系从句，直到graduates。
- 第3句have found是研究发现的现在完成时，are likely仅表达可能性；to emigrate为形容词补足语，不是新的有限从句。
- 第4句近40%的分母是移居国外者，约3.3%的分母是全部超过25岁的印度人；共同统计条件是受教育程度超过高中。2004是调查时间，不是所有人的离境年份。compared with是非谓语比较短语，不虚构另一套主谓；整个比较参照保留在found的宾语从句范围内。
- 第5句按主语、谓语、宾语分开；long为持续时间副词，brain drain是名词隐喻，policymakers是受困扰者。
- 第6句fear的宾语范围包含经济损害、分词补充及workers关系从句。depriving的逻辑施事是brain drain；They指政策制定者，it指人才外流，them及经济、大学、医院、工厂的所属关系落在来源国。
- could have共同支配taught、worked和come，后三者均按过去分词理解；不能把后两项译成已经发生。表达来源国失去的贡献可能，不断言这些人在任何国家都从未从事这些工作。
- `for their factories to make`为products的非有限不定式后置定语，factories是make的逻辑主语，products对应逻辑宾语空位；不列作有限原因从句。
- 词块英文逐字、按顺序连续还原原句。中文补出的共同学历条件、代词所指、共享could have及语序连接分别在词块说明或translationNotes中交代。

### 词汇与已有内容保留

- 全部正文英文点击词形通过真实`resolveEntry`入口核对词义、词性、use、grammarSummary、结构及当前句优先词组；没有只在孤立数据对象中填值。
- migration为泛指迁移；immigration从接收国看移入；emigrate从来源国看移出。have分别区分第3、5句完成时助动词、第4句实义had、第6句情态完成式；to、with、at、that、countries等按句隔离。
- 同句同词元多词形沿用公共稳定词元机制，明确分项标注developing/developed、Indian/Indians、They/them，不为迁就卡片复制平行词条；这不是新增词位级动态分流功能。
- 保留原有句子分析的layers、grammar、直译、通顺译文、逻辑说明及全部原有词组。第1句旧讲解中“必然缺所有格”的确定性说法改为有证据边界的瑕疵说明，属于纠错，不删弱讲解。
- 保留bothered→troubled的完整句改写、中文义、差别及有效目标；新增词组直接复用既有词组注册出口。年度词表、词组表和统计入口实测可回到本篇来源，不手工编造次数。

## 专项结果

使用主代理指定的Node，仅运行：

```powershell
& 'C:\Users\Niu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test --test-concurrency=1 tests/translation2012-template-upgrade.test.mjs
```

- 结果：7项通过，0失败，0跳过；11项任务均检查真实证据、答案可作答、range端点、概念、提示入口及反馈目标。
- 实际词卡扫描：136个逐句去重英文词形，132条逐句词元语境；不把纯数字当英文单词统计，百分比及年份另有来源与口径断言。
- 首轮专项发现公共paragraphs和teachingStatus尚未设置，按诊断记录。主代理完成接入后，本篇专项已改为严格断言两段与四项true，并重新实测真实公共入口：最终7项通过，0失败，0跳过，约6.9秒；实际词卡检查也使用已接入的公共语境和知识优先入口。
- 首轮并行环境出现Vite的24678端口已占用警告，测试正常通过；最终复跑没有此警告。未停止、重启或占用其他写作者的服务。
- 本篇已跟踪文件的`git diff --check`通过；新增文件另检查行尾空白和冲突标记。Git的LF/CRLF提示不等于检查失败，未为消除提示修改仓库配置。
- 全库`quality:content`、lint、生产构建、独立TypeScript类型检查、浏览器/手机及线上部署均未运行或核验，交由主代理统一安排；专项通过不代表这些检查通过。

## 主代理接入核验

1. 主代理已在共享`app/data.ts`接入`translation2012ArticleParagraphs`；该符号由本篇`app/2012-translation-data.ts`导出，内容为两段及六个原句ID。最终专项已核验实际文章对象与导出完全一致。
2. `articleContents["2012-translation"]`保留已有`translation2012Sentences`、`translation2012Tasks`接入，`paragraphs`正确、`questions: []`且无guide，均已在真实公共入口断言通过。
3. `teachingStatus: { syntax: true, vocabulary: true, evidence: true, practice: true }`已由主代理设置并通过本篇专项。非客观题同时核对实际整篇任务、原句顺序、参考译文和段落，不因questions为空就自动算证据完成。
4. 主代理已将`translation2012ReviewedContexts`合并到公共语境入口，并优先调用`getTranslation2012ReviewedKnowledge`；本篇原出口的内部兼容合并保留。最终专项核验132条语境的真实词卡，并验证原有bothered→troubled替换仍存在，无需再次接入。
5. 如统一测试脚本需要显式列举专项文件，可由主代理加入`tests/translation2012-template-upgrade.test.mjs`；本轮没有编辑package.json。总台账据实登记六句、11任务，不新增阅读题数量、不加地图，不宣称本轮亲自读过DOCX。

## 阻塞与风险

- 无新的原文缺失需要猜补；两处原卷非标准形式已显式隔离，但它们原本应采用的确切英文仍不可由快照唯一判断，故不修复来源。
- 本篇交付为工作区补丁，公共段落、状态、逐句语境与知识优先入口已由主代理接入并通过最终专项；总台账、全库门禁、构建和发布仍由主代理统一安排。本代理未写共享文件。
- 未提交、未推送、未创建分支；Cloudflare与正式页面未核验。没有使用自动评分替代译文自评，也没有触及正式个人数据。
