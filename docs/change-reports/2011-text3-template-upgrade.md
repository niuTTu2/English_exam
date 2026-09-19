# 2011 英语二 Text 3 完整训练模板升级

## 来源与范围

依据 `tests/fixtures/2011-p3.json` 的完整原卷快照逐段核对。本轮未重读原 DOCX；快照注明《考研英语二2011年真题（整卷）.docx》，原文 P181—187、题目 P188—212，原卷 SHA256 `c6c645b0aae768130cf35d6ace0bc86f3be31d946f4e7396a95168eb68988c82`。快照与现有正文无冲突。

保留 17 句 `2011-p3-s1`—`s17`、题 ID 201131—201135、英文、标点、四选项及答案 C/D/C/D/B。七个原段对应 1、2—3、4—6、7—10、11—12、13—14、15—17 句。原文单数 Economic condition、G. I. 的空格及题目 Americans'____ 均不改写。

本篇补 17 句精确成分、children、有限从句内部 predicateDetails、阅读问答和最终词块对译；28 项句子训练、3 项地图训练；7 段路线、14 项指代、6 项时间关系和4组观点；5题干与20选项完整语言分析及五题证据定位。新增 reading/practice/guide/evidence/question-analysis/contexts/priority 七个篇目文件，公共文件只接入本篇，不修改其他篇完成状态、界面或认证。

## 教学审计

- 第一段 with 结构中士兵共同执行 returning/going/lining，不造三个有限从句。第二段区分话题习语 it 与时期回指 it；that restraint 是限定词结构，made housing stylish 为使役宾补。经济条件只是推动因素之一，与心理原因、房屋特点分层。
- 密斯句中 who 管辖 emigrated 与 took up，比较背景和包豪斯同位语保留在从句中；推广格言不等于创办学校。引号内 less is more 本身有主谓，作为引述小句说明，不误当外层从句；none more so than Mies 为比较省略，不伪造有限谓语。
- less decoration 与 more impact 属不同维度，properly organized 保留条件；he believed 是观点插入语。两处 that 均修饰 materials，但分别作 take 宾语与 symbolized 主语。材料今天寻常、当年象征未来，不能移用 abstract art 的当时流行属性。
- 小公寓与邻楼公寓作同类面积比较；because of 后三项原因均为名词组。not entirely foreign 保留部分否定，赖特与案例住宅继续本土源流。commissioned from architects by magazine 区分受托方、委托方，were 才是主句有限谓语。
- 末句区分具体技术预测与总体自给自足信念；few 直升机和 most 干衣机不可泛化为所有机械设备普及。new materials 不新增环保属性，forthright detailing 不译成牺牲细节。
- 第32题必须联合学校关联及设计师影响，第34题联合公寓实例及抽象艺术对应；第33题允许第7句与第8句两条真实路径。单句缺少必要信息和全选正文不能通过多句定位。
- 实际词卡调用审计全部42个正文/题目来源：共208个本篇词条、256条逐来源人工语境；除冠词外所有真实token均有本篇或本句解释，语境首搭配有中文及可点击结构。question 来源直接取 sourceId，避免借定位正文句覆盖题干。
- following 的正文分词与题干“下列各项”、associated 的定语与选项状态、shared 的被动认同与主动共有、building 的动名词与 buildings 建筑物、材料各选项限定、have 的实义与助动用途分别处理。canonicalLemma 仅在本篇将原文 S14 的 building 归 build，名词词位 building 保持独立。保留 derive→stem 的完整替换与链接。
- 提示词逐项使用真实词形或已存在词组按钮。使役结构反馈单向辅助心理辨析，装饰比较反馈单向辅助分词受事；because of 层级反馈不辅助抽象艺术类比。跨句本土例证与地图关联仅按实际反馈登记，未自动双向联接所有同句任务。新任务 revision 为1。

## 检查

| 检查 | 结果 |
|---|---|
| `npm run quality:content` | 63/63通过 |
| `node --test --test-concurrency=1 tests/2011-p3-template.test.mjs tests/content-2011.test.mjs` | 18/18通过 |
| 全部42来源真实词卡、256条语境首搭配、词形角色与旧篇隔离 | 专项通过 |
| `npm run lint` | 0错误，1项既有 study-app img 警告 |
| `npx tsc --noEmit --incremental false` | 12项既有诊断，与上一篇相同，无本篇新增诊断 |
| `git diff --check` | 通过 |
| 构建、浏览器、部署 | 由主工作区合入后执行，本工作区未构建或发布 |

初轮门禁定位到 building 原词位经新动词形态映射误归 build，已以本篇来源限定修正，并用原卷及真实词卡测试复核；未放宽公共检查。旧整卷第9句测试由弃用 objectOrComplement 改为严格核对 predicateDetails 中 that 作宾语。

内容无未解决原文冲突。唯一来源限制为本轮使用带原卷 hash 的快照，未重新读取 DOCX。主工作区负责最终构建、页面抽查及发布；2011 写作 A/B 和翻译由主工作区独立处理，本次未触碰。
