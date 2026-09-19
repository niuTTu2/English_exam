# 2000 Text 5 完整训练模板迁移

## 来源与范围

- 用户 `2000.pdf` 第5页实际页图；PDF页面标题为2000，1986元数据不作为年份。已视觉核对正文、原段落和第27—30题。
- 源PDF SHA-256：`6de345bdc851e924ea3033a7ad7b1af7f8c3f68ecaf649e5a6ecb2d58ffd6212`。静态源文夹具为 `tests/fixtures/2000-passage-5-source.json`。
- 保持15句 `p5-s1`—`p5-s15`、原卷3段（1—5、6—10、11—15）及四题答案A/C/D/B。第10句双引号按原卷恢复，未改英文措辞。
- 新增本篇 reviewed/reading/practice/guide/evidence/question-analysis/contexts/word-knowledge。人工结构在旧 verified hook 之后接入，避免旧分类覆盖。15句逐块对译、27句任务、3地图任务、20真实题干选项分析与4补全示例齐备。

## 原文疑点和语义处理

- 第7句原卷确写 `a decade or two years ago`。主译用“与原文所说的 a decade or two years ago 相比（时间措辞有疑点）”，不把十年或两年前当已确认的正常时间跨度。注记说明字面可读十年或两年前，结合语境可能本想表达十至二十年前，但无法确认。英文保留，原有“十年或二十年前”的确定译法同步从词组讲解移除。
- 第2句not least为强调尤其包括，第3句claim后的完成不定式保留所称行为先于声称及事实未获保证。第4句what内作主语、that只连表语内容，尾部if not...then为省略的来源对照，不虚构有限从句。
- 第5句note单词义“意味；色彩”，heavy note of hypocrisy整体才是“浓重的虚伪意味”。骑马者是已经受益的受教育者，不将末句比喻只释为行动太迟。
- 第8句lest后be为虚拟式被动，pushing/acquisitive/vulgar为主语补足；辨明怕“被别人认为”与自己认为抱负不道德。第9句三个定语从句分别附着spectacles/publisher/journalist，advocating仅为分词修饰，takes只带his meals宾语，地点不混为宾补。
- 第10句是作者对他人行为的反讽概括，proper不表作者倡议。第11句where为含让步意味的情境，保留not/extremely；第13句less openly只说明较少宣称，不能变成完全不再。第14句some of which整体作关系从句主语、内嵌that表语从句，两个结果保留or。第15句Such为前置表语，way后的关系标记可省that/in which，不补the way how。
- 所有旧层次说明、语法说明及逻辑综述由本篇已人工写明的组件/阅读重点接管，防止旧的确定时间译法或“不张扬”结论从次级面板回流。
- 27题区分有回报与回报足抵代价；28题将先得益、再否认与虚伪评价连回比喻；29题区分主动think与被动be thought；30题由健康价值、公开减少及隐蔽化负面后果推出公开积极维护，明确为整段推断，不伪造逐字指令。全部定位路径有版本与上限，全选末段或全文不能代替精确定位。

## 词卡、提示与审计同步

- 正文和20个题干/选项来源分别提供词义、词性与用法。reward/return的名词与动词、once副词与连接词、after连接词与介词、appear动名词与不定式均有专项。
- 本篇源特定词形：`p5-s8 thought → think`、`p5-s15 left → left`，避免思想名词或leave动词抢占；educated/stirrings/promptings按实际词条合并。关键搭配均有中文讲解和可点击入口，不创建空词组卡。
- 27任务所有hint通过未解锁讲解时的实际SSR按钮验证；lest范围反馈只定向影响顾虑判断，不反向污染范围划选或扩散到无关从句。新题初次接入revision 1。
- 新增稳定概念 `clause-purpose`（目的从句）和 `nonfinite-gerund`（动名词结构），根已授权与其他分支取并集。同步修正Text4 range helper必需的 `options: []` 类型字段。
- 从句审计按来源新增 `p5-q27-prompt` 后置that主语内容、`p5-q28-option-b` 的once从句，各+1；Text5正文数量不变。本分支99→101。根另有Text1和Text2新增来源，合并需逐来源取并集后重算，不能覆盖根总数。
- 更新过时note测试而不回退词义：Text5从词组义改为单词义；Text3 notes按已审“n.（复数）/注释”；2010完形noted按既有“注意到；记录”，2010 Text1 note按既有“基调；意味”。实际其他篇词卡未改。

## 验收

| 检查 | 结果 |
|---|---|
| 本篇原卷与语义自审 | PDF第5页视觉核验完成 |
| 本篇专项与note语义专项 | `node --test --test-concurrency=1 tests/2000-passage-5-training.test.mjs tests/vocabulary-senses.test.mjs`，14/14通过 |
| 通用内容 | `npm run quality:content`，63/63通过 |
| TypeScript静态检查 | 本篇新增文件与Text4 helper无剩余错误；全库仍有既存2001重复key、2012参数数目、lexicon旧索引/联合类型和Cloudflare环境声明问题，未越篇修补 |
| 差异检查 | `git diff --check`通过 |
| 构建与移动实测 | 本分支不build、不推送；根合并后构建。未冒称本篇新增手机实测 |

单篇独立提交，根代理负责整合发布。下一篇按原题型处理2000完形，然后五个选定翻译句。
