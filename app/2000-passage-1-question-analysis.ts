import type { BeginnerSyntaxComponent, BeginnerClauseDetail, QuestionAnalysis, SentenceAnalysis, SyntaxVisualRole } from "./data";
import { withReviewedSyntax } from "./reviewed-syntax";
const c = (text: string, form: string, fn: string, modifies: string, explanation: string, children?: BeginnerSyntaxComponent[]): BeginnerSyntaxComponent => ({ text, form, function: fn, modifies, explanation, children });
const questionPhrases: Record<string, string[]> = {
  "11-A-analysis": ["had made painstaking efforts towards this goal"],
  "11-B-analysis": ["eight times larger than before"],
  "11-D-analysis": ["had given an impetus to its economy"],
  "12-A-analysis": ["had withdrawn to its domestic market"],
  "12-B-analysis": ["had been taken over by foreign enterprises"],
  "12-D-analysis": ["had lost part of its domestic market"],
  "13-prompt-analysis": ["be inferred from the passage"],
  "13-A-analysis": ["shift between self-doubt and blind pride"],
  "13-B-analysis": ["contribute to economic progress"],
  "13-C-analysis": ["depends on international cooperation"],
  "13-D-analysis": ["pave the way for further development"],
  "14-prompt-analysis": ["can be attributed to"],
  "14-A-analysis": ["turning of the business cycle"],
};
const a = (id: string, text: string, components: BeginnerSyntaxComponent[], colors: SyntaxVisualRole[], meaning: string, focus: string, clauses: BeginnerClauseDetail[] = [], phrase = false): SentenceAnalysis => ({ ...withReviewedSyntax({ id, number: 0, text, trunk: text, beginnerSyntax: { components, clauses }, layers: [{ label: "本项语言", text: focus }], grammar: [focus], literal: meaning, natural: meaning, logic: "本层解释本项实际表达，选入与否另看题目证据。", phrases: questionPhrases[id] ?? [] }, colors), ...(phrase ? { textKind: "phrase" as const } : {}) });
const cl = (text: string, type: string, marker: string, role: string, subject: string, predicate: string, details: Array<[string,string]>, translationOrder: string): BeginnerClauseDetail => ({ text, type, marker, role, subject, predicate, predicateDetails: details.map(([fn,text])=>({function:fn,text})), translationOrder });
const industry = (id: string, text: string, subject: string, predicate: string, rest: string, fn: string, meaning: string, focus: string) => a(id,text,[c(subject,"名词短语","主语",predicate,"与题干the American连接为美国的这一行业。"),c(predicate,"过去完成时结构","谓语",subject,focus),c(rest,fn === "宾语" ? "名词短语" : "介词短语",fn,predicate,focus)],["subject","predicate",fn === "宾语" ? "object" : "modifier"],meaning,focus);
export const passage2000P1QuestionAnalysis: Record<number, QuestionAnalysis> = {
  11: {
    prompt: a("11-prompt-analysis", "The U.S. achieved its predominance after World War II because ____.", [c("The U.S.","国家缩写","主语","achieved","U.S.是United States。"),c("achieved","过去式动词","谓语","The U.S.","及物动词，直接接取得的地位。"),c("its predominance","名词短语","宾语","achieved","its指美国，predominance是主导地位。"),c("after World War II","介词短语","时间状语","achieved","限定二战以后。"),c("because ____","原因连词及待选空格","原因说明框架","achieved","本题要求将真实选项填成原因从句；原题空格处不能补造谓语。")],["subject","predicate","object","modifier","modifier"],"美国在二战后取得主导地位，是因为……。","because问原因，不是在问随后发生了什么。"),
    options: {
      A: a("11-A-analysis","it had made painstaking efforts towards this goal",[c("it","代词","主语","had made","指题干美国。"),c("had made","过去完成时","谓语","it","表示在取得地位以前已作努力。"),c("painstaking efforts","名词短语","宾语","had made","painstaking强调费力、精心。"),c("towards this goal","介词短语","目标修饰语","efforts","this goal回指取得主导地位。")],["subject","predicate","object","modifier"],"它曾为这一目标付出艰苦努力。","把painstaking的费力意味与文中effortless比较，先保留本项原意。"),
      B: a("11-B-analysis","its domestic market was eight times larger than before",[c("its domestic market","名词短语","主语","was","美国国内市场。"),c("was","过去式系动词","谓语","market","连接市场与大小比较。"),c("eight times larger than before","形容词比较结构","表语","was","before把比较基准设为以前的市场，不能读成竞争者。",[c("than before","比较补足结构","比较基准","larger","before是以前，省略相同的市场比较内容。")])],["subject","predicate","complement"],"其国内市场比以前大八倍。","比较对象由than引出；数字相同并不保证命题相同。"),
      C: a("11-C-analysis","the war had destroyed the economies of most potential competitors",[c("the war","名词短语","主语","had destroyed","指二战。"),c("had destroyed","过去完成时","谓语","the war","破坏发生在取得优势之前。"),c("the economies of most potential competitors","名词短语","宾语","had destroyed","中心economies，of说明经济属于多数潜在竞争者。",[c("of most potential competitors","介词短语","后置定语","economies","most限定竞争者数量，potential说明有竞争可能。")])],["subject","predicate","object"],"战争摧毁了大多数潜在竞争者的经济。","主语战争、宾语经济；不能把competitors当作destroyed的直接宾语。"),
      D: a("11-D-analysis","the unparalleled size of its workforce had given an impetus to its economy",[c("the unparalleled size of its workforce","名词短语","主语","had given","中心size；of its workforce明确限定劳动力规模。",[c("of its workforce","介词短语","后置定语","size","并不是市场规模。")]),c("had given","过去完成时","谓语","size","与an impetus to搭配表示给予推动。"),c("an impetus","名词短语","宾语","had given","impetus是推动力，不是劳动人数。"),c("to its economy","介词短语","受益对象补足语","had given an impetus","经济是获得推动的对象。")],["subject","predicate","object","complement"],"其无可比拟的劳动力规模给经济提供了推动力。","先分清劳动力的规模与技术水平，不能让unparalleled自动对应原文市场。"),
    },
  },
  12: {
    prompt: a("12-prompt-analysis","The loss of U.S. predominance in the world economy in the 1980s is manifested in the fact that the American ____.",[c("The loss of U.S. predominance in the world economy in the 1980s","名词短语及多层介词修饰","主语","is manifested","中心loss，后面说明失去哪种优势、在哪个领域与年代。",[c("of U.S. predominance in the world economy","介词短语","后置定语","loss","世界经济中的美国优势是所失去的地位。"),c("in the 1980s","时间介词短语","时间限定","loss of predominance","限定80年代的优势丧失。")]),c("is manifested","一般现在时被动","谓语","The loss","表现出来，不是主动展示某个宾语。"),c("in the fact that the American ____","介词短语及待补内容从句","体现依据补足语","is manifested","fact后的that说明事实内容；the American必须接选项中的行业名词和谓语。",[c("that the American ____","不完整的that内容框架","同位语从句框架","fact","语言层保留原题空格，不猜待选主语中心与谓语。")])],["subject","predicate","modifier"],"20世纪80年代美国丧失世界经济主导地位，体现在美国……这一事实中。","manifested是被动；选项中的行业名词承接the American，不把American当作孤立的人。"),
    options: {
      A: industry("12-A-analysis","TV industry had withdrawn to its domestic market","TV industry","had withdrawn","to its domestic market","退却终点状语","电视业已退守本国市场。","withdraw to描述撤回某个地方；本项断言的动作是退守，不是被收购。"),
      B: industry("12-B-analysis","semiconductor industry had been taken over by foreign enterprises","semiconductor industry","had been taken over","by foreign enterprises","施事状语","半导体业已被外国企业接管。","had been taken over是过去完成时被动，by给出接管方，表示事件已经发生。"),
      C: industry("12-C-analysis","machine-tool industry had collapsed after suicidal actions","machine-tool industry","had collapsed","after suicidal actions","时间兼事件背景状语","机床业已在自毁行为后崩溃。","collapsed是已经崩溃；after只直接表先后，suicidal又额外给行为贴上自毁性质。"),
      D: industry("12-D-analysis","auto industry had lost part of its domestic market","auto industry","had lost","part of its domestic market","宾语","汽车业已失去部分国内市场。","part限定只是部分；its的所属是美国汽车行业，不是国外市场。"),
    },
  },
  13: {
    prompt: a("13-prompt-analysis","What can be inferred from the passage?",[c("What","疑问代词","主语","can be inferred","所问是可被推断出的内容。"),c("can be inferred","情态动词及被动结构","谓语","What","infer推断；be inferred是被动，不是文章主动猜测。"),c("from the passage","介词短语","推断依据状语","be inferred","根据文章，而非个人常识。")],["subject","predicate","modifier"],"从文章中可以推断出什么？","隐含结论仍须以文内证据为依据，不能把可能性扩大成普遍定律。"),
    options: {
      A: a("13-A-analysis","It is human nature to shift between self-doubt and blind pride",[c("It","形式主语","主语","is","真正内容由后置不定式给出。"),c("is","系动词","谓语","It","连接human nature。"),c("human nature","名词短语","表语","is","声称这是人的普遍本性。"),c("to shift between self-doubt and blind pride","不定式短语","后置真正主语","It的内容","shift的范围由between A and B给出；不是两个独立宾语。")],["subject","predicate","complement","subject"],"在自我怀疑和盲目自豪之间摇摆是人的本性。","本项将现象概括为human nature，范围比某时期美国人的反应更广。"),
      B: a("13-B-analysis","Intense competition may contribute to economic progress",[c("Intense competition","名词短语","主语","may contribute","强烈竞争，不是合作。"),c("may contribute","情态动词及动词","谓语","competition","may只说明可能；contribute to为有助于。"),c("to economic progress","介词短语","贡献对象补足语","contribute","to后接名词progress，不是不定式。")],["subject","predicate","complement"],"激烈竞争可能有助于经济进步。","may与有助于的表达保留有限因果，不断言竞争必定造就所有进步。"),
      C: a("13-C-analysis","The revival of the economy depends on international cooperation",[c("The revival of the economy","名词短语","主语","depends","revival是复苏，of说明哪个领域。"),c("depends","第三人称单数动词","谓语","revival","depend on说明依赖关系。"),c("on international cooperation","介词短语","依赖对象补足语","depends","cooperation为合作，和competition不同。")],["subject","predicate","complement"],"经济复苏依赖国际合作。","依赖关系比may contribute强，且合作不是竞争的同义词。"),
      D: a("13-D-analysis","A long history of success may pave the way for further development",[c("A long history of success","名词短语","主语","may pave","中心history；of success说明经历内容。"),c("may pave","情态动词加动词","谓语","history","pave the way是为后续铺路的比喻。"),c("the way","名词短语","宾语","pave","搭配中的道路，并非真实道路施工。"),c("for further development","介词短语","受益或目标补足语","pave the way","further为更进一步，限定发展。")],["subject","predicate","object","modifier"],"长期成功的历史可能为进一步发展铺路。","本项虽有may，但没有表达如何处理成功史这一关键条件；需与首句双重作用比较。"),
    },
  },
  14: {
    prompt: a("14-prompt-analysis","The author seems to believe the revival of the U.S. economy in the 1990s can be attributed to the ____.",[c("The author","名词短语","主语","seems","问作者立场，不自动接受引文观点。"),c("seems","第三人称单数动词","谓语","The author","seems to表从文字推测其看法。"),c("to believe the revival of the U.S. economy in the 1990s can be attributed to the ____","不定式及省略that的内容从句","不定式补足语","seems","believe内部内容从revival开始；can be attributed为被动。",[c("the revival of the U.S. economy in the 1990s can be attributed to the ____","省略that的内容从句","宾语从句","believe","不是第二个独立句；主语是revival。",[c("the revival of the U.S. economy in the 1990s","名词短语","从句主语","can be attributed","限定美国经济和90年代。"),c("can be attributed","情态被动结构","从句谓语","revival","被归因于，原因由to引出。"),c("to the ____","介词及待选原因","归因对象补足语","attributed","选项补入名词性原因。")])])],["subject","predicate","complement"],"作者似乎认为，20世纪90年代美国经济的复苏可归因于……。","author是观点范围；选项全为名词短语，不能补造成作者直接说过的完整句。",[cl("the revival of the U.S. economy in the 1990s can be attributed to the ____","宾语从句","省略that","believe的内容","the revival of the U.S. economy in the 1990s","can be attributed",[["归因对象补足语","to the ____"]],"先译复苏可归因于什么，再加作者似乎认为。")]),
    options: {
      A: a("14-A-analysis","turning of the business cycle",[c("turning","动名词名词化","名词中心","接题干to the之后","周期的转变，没有句子时态。"),c("of the business cycle","介词短语","后置定语","turning","说明经济周期在变化。")],["complement","modifier"],"商业周期的转变。","turning是名词性变化，business cycle整体是经济周期。",[],true),
      B: a("14-B-analysis","restructuring of industry",[c("restructuring","动名词名词化","名词中心","接题干to the之后","重新安排结构，不是现在进行时。"),c("of industry","介词短语","后置定语","restructuring","工业是被重组的领域。")],["complement","modifier"],"工业的结构重组。","of industry给出重组对象，不代表工业主动重组其他东西。",[],true),
      C: a("14-C-analysis","improved business management",[c("improved","过去分词形容词化","前置定语","management","已改进的，并非独立过去时谓语。"),c("business management","名词组合","名词中心","接题干to the之后","企业管理，business限定管理领域。")],["modifier","complement"],"改进了的企业管理。","短语以management为中心，improved表修饰关系。",[],true),
      D: a("14-D-analysis","success in education",[c("success","名词","名词中心","接题干to the之后","成功，不预设本文是否支持。"),c("in education","介词短语","后置定语","success","说明在哪个领域成功。")],["complement","modifier"],"教育领域的成功。","in education修饰success；机构名称出现不等于文章提出教育成功。",[],true),
    },
  },
};
