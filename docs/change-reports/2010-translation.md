# 2010年英语二英译汉交付报告

## 范围与来源

- 用户授权：继续上传英译汉；本次仅收录2010年英语二第46题，不扩展写作、账号或同步功能。
- 来源：用户提供的《考研英语二2010年真题（整卷）.docx》。读取原文件的`word/document.xml`，Section III Translation说明为第266—268个顶层段落，正文为第269—271段（均按1起算）。保留三段、全部标点及大小写。
- 全文150个英文分词、113种表层词形；按规范空白计算SHA256：`2c7abcd9c5095aa4fc33075de6c6b32f7396cb420269fd7c67dad1bc56984ec1`。
- 10句、4个从句、30组原文表达；句子ID为`2010-translation-s1`至`s10`，单个任务ID为`201046`，原卷题号46，总分15分。
- 参考译文依据用户原文独立译写，不冒充官方标准答案或评分细则，不作自动评分。
- 新数据文件：`app/2010-translation-data.ts`、`app/2010-translation-lexicon.ts`、`app/2010-translation-knowledge.ts`。
- 必要接入：`data.ts`、`contextual-vocabulary.ts`、`lexicon.ts`、`knowledge-base.ts`、`study-app.tsx`、`globals.css`及内容/UI测试；README、开始说明、同事指令和台账同步更新。

## 本篇关键判断

- 第2句`Having endured ... life`是动名词完成式主语，不是原因状语。`made it clear ... that`中it是形式宾语，clear是宾补，that从句为真正宾语。
- 原卷使用`dot-com boom and burst`，不改成常见搭配中的bust。第4句signed的过去式与过去分词同形，不据此补写具体年份或事件日期。
- 第6句because在宁的引语内部；whose在引语外构成修饰Ning的非限制性定语从句。`translate into`为表现或转化成，sales不足并非必然零成交。
- 第8句是so much…that结果结构，would表示过去反复出现的醒来和凝视行为，不是虚拟。第10句turn the corner为情况好转，不能据劝慰话补写职业结局。
- 第7句的双引号直到第10句才闭合；第10句还有引述他人说话的内层单引号。英文拆句不增补引号，全文参考译文保留对应层级。
- sustainability及unsustainability保留独立原形，在词族层关联sustain；selling归sell，sales归sale。Boulder按地名，move按决定，passion按热爱的事情处理。
- it、have、be、that、through等按句保存本句义和用法；本篇核心句法也按语境读取，避免把旧篇病毒指代或形式主语讲解当作本句分析。
- `a lack of sales`复用既有`a lack of demand`的稳定模式键，并把通用解释扩展到不同缺少对象，不另造平行词组。
- 两条本句替换：recalls→remembers、miserable→very unhappy；都保存完整改写、差异和可点击目标。不为每句强行造替换。
- 中文专名/替换限制按说明文本展示，不误造英文词条链接；真实英文近义词保持可点击并检查有效内容。
- 2010年度单词表、词组表与出现次数自动纳入新正文；不手工固定跨篇统计值。

## 整篇题型兼容决策

- `TranslationTask`采用单句/整篇判别联合；`translationTaskSentences`返回任务实际覆盖的句子。旧2000年数据继续单句作答、原ID和记录键不变。
- 第46题保留一个输入框、一个提交动作、三段原文和三段参考译文。10句解析提交后默认折叠，不一次摊开全部语法。
- 每个可点击原文词绑定自身句子ID，提交后覆盖任务内全部句子；不把第2—10句错误绑定到第一句语境。
- 不改变存储、同步协议或生产数据库；继续使用原有文章ID加任务ID的翻译作答键。
- 原有2000年“一句一任务”断言保持；全局翻译检查改为按顺序精确覆盖全部句子、无重复/遗漏，并分别校验单句和整篇结构。

## 必要审计结果

| 检查 | 实际命令/范围 | 结果 |
|---|---|---|
| 来源和语义自审 | 原卷正文、题号、三段边界、10句精读、全部词形与关联链接 | 完成，无未决语义问题 |
| 内容检查 | `npm run quality:content` | 初次29项中25项通过；4项暴露新别名污染旧篇及近义词缺项，已修复 |
| 修复后专项 | `node --test --test-name-pattern='同一词条\|2010英译汉\|Text 3 词汇\|Text 2 词义\|全部词形' tests/content-quality.test.mjs` | 6/6通过；保留旧more/best原形，所有近义词目标补齐 |
| 词卡语法专项 | `node --test --test-name-pattern='2010英译汉\|所有预标词组\|全部词形' tests/content-quality.test.mjs` | 4/4通过；逐词核对词卡核心句法来自本篇语境 |
| 年度索引与体验 | `node --test tests/study-experience.test.mjs` | 15/15通过 |
| 静态检查 | `npm run lint` | 最终快照通过 |
| 生产构建 | `npm run build` | 最终快照通过；仅有大资源包提示，本地postbuild按既有保护跳过远端迁移 |
| UI与构建产物 | `node --test --test-concurrency=1 tests/ui-components.test.mjs tests/rendered-html.test.mjs` | 最终快照6/6通过，覆盖整篇1输入框、10折叠及2000年单句兼容 |
| TypeScript差异 | 内存读取HEAD作为基线，与当前工作区比较诊断，不写入源码 | 基线与当前均10项既有诊断，新增0；不声称全量tsc通过 |
| 隔离浏览器 | 本地构建、1440px桌面与390px手机；不登录真实账号 | 三段原文、原题46、15分、空提交拦截、草稿刷新、全文提交、1/1完成、参考三段、10句默认折叠、跨句词卡及解锁均通过；手机无横向溢出；2000年5句逐句提交仍正常 |
| 差异与范围 | `git diff --check`；`quality_checker.js app --json` | 差异无空白错误；辅助扫描65文件、0错误、19警告，主要为既有大文件/长函数及数据行长度提示；不为清提示重构旧模块 |

初次通用别名合并把旧篇more/best错误归并，已取消泛化合并，仅增加此前正文未用的四个实际新词形。关键数据和断言未删减，也没有通过隐藏字段规避检查。浏览器刷新验证须等认证初始化完成，不能把hydration前短暂空输入框误判为草稿丢失。

## 阻塞与交接

- 未解决内容疑点：无。
- 下一步：独立提交并推送既有`origin/main`，匿名核验公开生产页；不扩展写作。
- 提交/推送：待本篇独立提交，最终SHA见Git及交付消息。工具目录`.serena/`、`.spec-workflow/`和`audit.log`不纳入提交。
- Cloudflare：尚未发布本篇；推送后核对公开新资源与实际入口，不仅凭push宣称上线。
