# 单篇文章交付报告

## 基本信息

- 年份：2000
- 试卷类型：英语一
- 文章：阅读 Passage 3《未来主义诗歌与新的表达方式》
- 原文来源：`试卷/2000 (1).pdf`（用户提供的原卷）
- 答案来源：原卷答案页，经逐题核对：19-B、20-A、21-C、22-D

## 本次完成

- 句子数量：13
- 题目数量：4（第 19—22 题）
- 新增可点击词形数量：200 个 Passage 3 词汇规范条目（重复词形统一合并到既有词条）
- 新增规范词组数量：52 个规范词组指南，覆盖 66 个原文表达别名
- 修改文件：
  - `app/passage-3-data.ts`
  - `app/passage-3-knowledge.ts`
  - `app/passage-3-lexicon.ts`
  - `app/data.ts`
  - `app/knowledge-base.ts`
  - `app/lexicon.ts`
  - `app/study-app.tsx`
  - `app/globals.css`
  - `tests/content-quality.test.mjs`
  - `docs/IMPORT_PROGRESS.md`
  - `docs/change-reports/2000-passage-3.md`

## 自动检查

- `npm run quality`：通过
- `npm run quality:content`：通过（6 项）
- `npm test`：通过（构建成功，11 项测试全部通过）
- `npx eslint . --ignore-pattern dist --ignore-pattern .next`：通过
- `git diff --check`：通过

## 人工复核

- 原文逐字核对：完成（正文、题干、A-D 选项、标点和题号均以原卷 PDF 为准）
- 翻译复核：完成（13 句正文及题目分析的结构直译、通顺译文）
- 单词与词组覆盖：完成（正文、题干、选项和提交后分析文本均通过词条覆盖检查）
- 答案和选项错因：完成（每题唯一答案、定位句及 A-D 四项具体原因）
- 年度索引：完成（已接入年度单词表、词组表和出现次数统计）

## 待用户确认

无。

## 给发布者的说明

- 提交答案后，题卡新增“提交后句读”面板：题干、四个选项和正确答案组合句均可展开查看彩色成分、主干、逐层结构、语法、直译、通顺译文和句间逻辑。
- 新增题目分析字段的完整性、`chunks` 原文还原和英文词条覆盖测试；没有删除或放宽既有断言。
- 未改变登录、同步、复习算法或既有文章内容。
