# 2012年英语二阅读 Text 2（26—30）交付报告

## 范围与来源

- 年份 / 试卷类型 / 篇目 / 题号：2012年英语二 / 阅读 Text 2 / 26—30题。
- 用户原卷文件名与页码或段落位置：`考研英语二2012年真题（整卷）.docx`；正文段落145—148，题目149—173；SHA256为`b91cfe8e6a3eb63b02fc6573514e34a67937bf8160a5712ce640315e2da306f9`。
- 答案依据（来源、定位；存在异文时说明版本处理）：哈尔滨工程大学网站所载《2012年英语（二）试题解析》Text 2教学参考核验C/B/B/A/C；所有题干与A—D选项按用户原卷顺序保存。部分第三方转载重排选项，未直接使用其答案字母。
- 句子数 / 题目数 / 稳定 ID 范围：18句 / 5题 / `2012-p2-s1`—`2012-p2-s18`、`201226`—`201230`。
- 修改文件与接入位置：`app/2012-passage-2-data.ts`、`app/2012-passage-2-lexicon.ts`、`app/2012-passage-2-knowledge.ts`、`app/data.ts`、`app/lexicon.ts`、`app/contextual-vocabulary.ts`、`app/knowledge-base.ts`、`app/verified-answer-keys.ts`、`tests/fixtures/2012-p2.json`、`tests/content-2012.test.mjs`及本报告、台账、入口说明。

## 本篇关键判断

- 复杂句、从句边界、指代或翻译的关键处理：第10句保留`It was not until ... that ...`强调结构、两层`when`从句和`what`名词性从句；第3句的异常原文`between girls as not only innocent but as evidence of innocence`不改写，以前句`that connection`回指解释语义。
- 重复词复用及新增语境（代表例）：`considered`归一到`consider`后显示“被认为是”；`wear`分别显示第6句动词“穿着”和第15句名词“服装”；完整扫描正文、题干和选项，补齐所有新词、专名和选项词卡。
- 原文词组与规范结构、同义替换的关键处理：句子`phrases`仅存原卷连续片段，例如`fuses girls' identity to appearance`；知识卡另存`fuse A to B`等规范结构。`Take the toddler`新增可点击的举例结构知识卡。
- 年度词表/统计接入方式：文章、句子和题目已加入`sectionsByYear`、`articleContents`、`allSentences`、`allQuestions`；词库、逐句语境和词组别名已纳入2012年度索引。

## 必要审计结果

| 检查 | 实际命令/范围 | 结果 |
|---|---|---|
| 来源、语义与答案自审 | 用户原卷段落145—148、题目149—173；公开教学解析互证答案 | 通过；异常并列原样保留 |
| Text 2专项与年度门禁 | `node --test --test-concurrency=1 tests/content-2012.test.mjs` | 12/12通过 |
| 内容检查 | `npm run quality:content` | 29/29通过 |
| 生产构建 | 设置与`scripts/sites-env.sh`一致的本地运行目录后执行`.\node_modules\.bin\vinext.cmd build` | 五阶段生产构建通过；未执行部署或数据库迁移 |
| 差异与范围 | `git diff --check`；仅本篇与必要索引 | 通过 |
| 额外静态检查 | `.\node_modules\.bin\eslint.cmd . --ignore-pattern dist --ignore-pattern .next` | 0错误；既有图片性能提示1条。`npm run lint`的Bash包装因WSL环境不可用，改用同一ESLint命令完成检查 |

## 阻塞与交接

- 未解决疑点：无。原卷异常并列形式不是待补文本，已按原样保留并记录其回指解释。
- 下一篇或下一步：发布前检查已完成，仅提交本篇文件并推送`origin/main`；随后在未登录只读浏览器中核验主站的2012 Text 2、九模块、138句和45道客观题。
- 提交 / 推送状态：待提交。
- Cloudflare：未核验。
