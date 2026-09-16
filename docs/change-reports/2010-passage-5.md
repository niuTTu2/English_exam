# 2010 年英语二 Part B 交付报告

## 范围与来源

- 篇目：Part B，原题名 `Copying Birds May Save Aircraft Fuel`，第41—45题；保留原卷 T/True、F/False，不补造 A—D 选项。
- 英文唯一依据：用户文件 `D:\01_Downlod\下载\考研英语二2010年真题（整卷）.docx`，一基段落244为标题、245—250为正文、251—265为题目。243的考试说明用于确认题型，不重复收进正文。
- 答案核验：新东方在线《2010年考研英语二真题及答案》（2018-10-15），`https://kaoyan.koolearn.com/20181015/1023400.html`；本次实际读取的答案表为 **F T F T F**，并与原卷定位逐题对照。网络文本不替代用户英文原文。
- 28个正文句子、25个显式从句/省略分句、5题、318种正文及题干选项表层英文词形。句子ID为`2010-p5-s1`—`2010-p5-s28`，题目稳定ID为`201041`—`201045`，显示原题号41—45。
- 独立从DOCX提取、仅合并空白后的正文SHA-256：`9b06d766d0665d36fbbec9a06e1b4b46a31bf430b90866788cb1caff2799b210`；题干及实际选项SHA-256：`5da9cfc2f0f9130dfbce3ae78e9d65cb933b5995e9bea0500104ef17bab93c21`。测试值并非从新数据反向生成。
- 新增`app/2010-passage-5-data.ts`、`app/2010-passage-5-lexicon.ts`、`app/2010-passage-5-knowledge.ts`；接入目录、语境词汇、总词库、知识库、独立答案表及两项现有测试文件。流程入口、README和进度同步更新。

## 本篇关键判断

- 保留英式`favourable / favoured / Organisation / Defence / programme / co-ordinate`及题45的罗马数字Ⅱ，所有分块能还原英文。
- 第10句分出what宾语、if条件、so目的三层，四个并列动作共享were to；模型推演不当成已实施客运。第18句whether主语从句与although让步、第19句形式主语与how/that嵌套、第23句as倒装省略、第26句reports同位内容和两次they不同回指均显式说明。
- 第27句cousin后省was；lost over Berlin修饰Lancaster，未擅自确定亲属性别、堂表长幼、机组最终命运或损失原因。末句should know表示合理推断，不是义务。
- 41题不需要购新机不能推成促进新机销量；42题减阻和推进节能均有明文；43题不得把疑问、might not与不明因果改成“肯定更舒适”；44题天气影响仍待研究；45题未经证实的军机报道不能成为美国军方二战实践的确证。
- `company`在本篇为结伴、`peer`为张望、`wake`为尾流、`range`为航程；与旧篇公司/同侪等本句义隔离。`see / as / by / so / it / they`按句保存实际功能或多处回指。
- `findings`为名词finding，Text 3的finding仍归动词find；reduction、separation、departure、flight、clearly等派生词保留独立词位，只在词族层关联。he/they代词变形仅在本篇优先解析，不全局更改旧篇his语境键。
- 复用既有require、known as、one of、of course、at least、make a/no difference等稳定词组；新增搭配均有中文结构规则，复杂模式有双语例句和易错提示。两项本句替换分别保留第17句、26句完整命题，并有可打开的look、unconfirmed目标。

## 必要接入设计

- 旧四选一`Question`保留；通过`TrueFalseQuestion`与`AnyQuestion`区分题型。统一解释读取函数对不存在的选项键显式报错，未放宽为任意两个选项。测试对四选一仍严格验证A—D，T/F严格验证两项原文与两项理由。
- 自测复用既有选择、评分与定位交互，仅增加“阅读判断（T / F）”标签；ID和学习记录键不改变，不新增数据库迁移，不改认证、账号或同步逻辑。
- 浏览器核验发现A350原本会拆成冠词A，因此分词、渲染和测试扫描同步保留字母数字代号；同时为被同一规则影响的既有2010完形H1N1补充完整词卡。这是共享分词的必要兼容，不重写旧篇正文或答案。
- 2010年度目录现在包含Text 1—4及Part B，共96个阅读句子、25题，21—45连续无缺。词表、词组表和出现次数复用现有文章/来源索引。

## 必要审计结果

| 检查 | 实际范围 | 结果 |
|---|---|---|
| 来源、语义、答案 | 原DOCX独立哈希；在线答案表；录入时语义自审 | 通过 |
| 内容门禁 | `npm run quality:content` | 初检25/27，新增全局his别名影响旧篇两项；改为本篇隔离后受影响5/5通过 |
| 最终内容专项 | 字母数字代号、句子完整性、全词形、语境、题目分析、Part B、Text 2/3/4、means统计，共10项 | 10/10通过；未重复运行完整套件 |
| 生产构建 | `npm run build`；A350修复后重新构建最终快照 | 通过；保留既有大分包和路由静态分类警告，本地postbuild跳过远端迁移 |
| lint | `npm run lint`，最终快照 | 通过 |
| 构建后UI与体验 | `node --test --test-concurrency=1 tests/ui-components.test.mjs tests/rendered-html.test.mjs tests/study-experience.test.mjs` | 最终17/17通过 |
| 浏览器 | 未登录隔离浏览器，1440px电脑与390px手机 | 五题只有T/F；未答满不能提交；标准序列5/5，全选T得2/5且3题标错；提交锁定、定位和每题两项理由可用；无横向溢出；company/peering/A350词卡语境正确 |
| TypeScript补充 | `npx tsc --noEmit`及编译器内存读取HEAD基线对比 | 全量仍有10个既有诊断；排除新增文件后HEAD也是10个，本轮无新增诊断。不能宣称全量tsc通过 |
| 差异范围 | `git diff --check`；变更分析脚本；人工审阅接入差异 | 通过；只暂存本篇及必要接入文档 |

TypeScript基线包括旧词库重复键、Cloudflare运行时声明与Vite配置类型等；未借此改认证、依赖或无关模块。没有调用会再次构建的完整`npm test`/`npm run quality`。

## 阻塞与交接

- 内容未解决疑点：无。本轮2010英语二全部阅读已完成，不回到2001年，不扩展第46题翻译和写作。
- 提交/推送：提交前待执行，最终SHA与结果以交付消息及Git历史为准；本篇单独提交，不合并Text 3/4。
- Cloudflare后台部署状态：提交前未核验。公开GitHub状态API遇匿名额度限制，不索取令牌、不绕过权限。推送后单独核验两个生产域名的公开内容与真实T/F交互；不能把推送直接当成上线。
- `.serena/`、`.spec-workflow/`、`audit.log`为已有本地资料，不提交；不读取或修改真实账号和学习数据。
