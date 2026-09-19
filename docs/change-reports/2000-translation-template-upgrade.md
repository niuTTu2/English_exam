# 2000英译汉训练模板升级

## 范围与来源

- 原卷为用户文件 `D:\02_Workspace\ai\Yingyu\试卷\2000 (1).pdf` 第6页，本轮已读取PDF并渲染核对第31—35题下划线范围；SHA256为 `4eb3d9c807216619162410da95936cac14f6af57f630aa425841d221c47ad0fe`。
- 新增来源快照 `tests/fixtures/2000-translation-source.json`，保留第34题小写in、弯引号及破折号。前文只用于指代解释，不扩充考试语料。
- 保留 `translation-s31`—`translation-s35`、题目ID31—35及五个独立翻译任务，不改成整篇翻译，不添加客观题或自动语义评分。
- 新增5句精确关系树、连续词块对译、9项主动练习及逐句词汇知识；接入仍复用既有词库、年度统计、折叠页面和学习记录。
- 文件：`app/2000-translation-syntax.ts`、`app/2000-translation-practice.ts`、`app/2000-translation-contexts.ts`、三处公共数据/语境/知识索引、专项测试及原卷快照。

## 关键判断

- 第31句一个requires统领两个宾语，such as只举例专业科学家。this的依据是原卷未划线前句，不能独立猜成某个名词。
- 第32句it为形式主语，两个that主语从句同层并列；this回指农业与工业效率。obvious保留表语，不把形容词解释为带宾语动词。
- 第33句区分are feeling与are being exposed；to作介词与不定式标记须按出现位置解释；while为公众与政府两方面的对照。
- 第34句跨过with插入语连接process与was spread；that followed限定changes。近百年与约十年的比较保留nearly、may、or so；自然译文的“例如”注明来自划线前For example。
- 第35句arising的逻辑主语是problems，made的逻辑主语为themselves所回指的migration movements；不虚构有限从句。means保留名词稳定键，不混入动词mean。
- 逐句知识优先于通用词卡；修正changes被讲成“变化中的”、was被讲成系动词、wants被误读为动词及up等短语成分的串义。保留requires原有可靠同义改写；不为了规范化迁移既有词条ID。

## 必要审计

| 检查 | 范围 | 实际结果 |
|---|---|---|
| 来源与语义 | PDF第6页及五个实际待译片段 | 已读取并完成视觉核对 |
| 本篇专项 | `node --test --test-concurrency=1 tests/translation2000-template-upgrade.test.mjs` | 4/4通过；覆盖原文与任务边界、关系/训练、来源词卡和反馈传播 |
| 内容门禁 | `npm run quality:content`，随后复跑受影响内容及三份翻译专项 | 首轮157/157；最终整合69/69，均无失败或跳过；新增三份专项已纳入固定门禁 |
| 生产构建 | Node v24.19.0及Git Bash执行 `npm run build` | 五阶段构建成功，明确输出Build complete；本地postbuild跳过远端迁移 |
| 差异检查 | `git diff --check` | 通过 |

首次专项发现5个语境键与现有规范词条ID不一致，已按实际词位接回原词条；未放宽断言或改全局词形归一规则。内容复核另为第35句两项确有重叠的任务声明双向反馈影响，并纠正第33句提问中“本句两个to”的不准确说法。没有改变UI、登录、同步、部署配置，不重复整套手机真机回归；专项通过不等同真机或线上部署通过。

独立TypeScript检查仍有10项既有诊断（鉴权、旧词库类型、Cloudflare类型与Vite配置），本轮文件没有新增诊断，未宣称全库类型通过。隔离本地浏览器取得200响应，但Windows开发预览的虚拟模块加载失败，未把静态页面显示当成交互通过；生产发布抽查与此区分。

## 交接

- 本篇无未解决的关键来源或语义疑点。
- 整合质量检查及生产构建已通过，待按篇独立提交并沿既有GitHub→Cloudflare发布；最终SHA与部署结论见Git历史和交付消息。
- 下一接续为2011及2012已导入翻译模块；这两篇保留整篇第46题，不沿用本篇五个逐句考题边界。
