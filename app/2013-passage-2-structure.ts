import type { SentenceAnalysis, BeginnerSyntaxComponent } from "./data";
const c=(text:string,form:string,fn:string,modifies:string,explanation:string,relationKind:BeginnerSyntaxComponent["relationKind"]="trunk"):BeginnerSyntaxComponent=>({text,form,function:fn,modifies,explanation,relationKind});
export const passage2013P2Deep:Record<number,Partial<SentenceAnalysis>>={
 2:{trunk:"came those",literal:"伴随那些想在美国安永久的家的人而来的，是那些无意留下、想赚些钱然后回家的人。",beginnerSyntax:{components:[
 c("Along with the many folks looking to make a permanent home in the United States","介词短语","伴随状语","came","先交代与谁一同到来，介词后的 folks 不是 came 的主语。","modifier"),
 c("came","动词过去式","谓语","those","先出现到来这个动作，再交代是谁到来。"),
 {...c("those who had no intention to stay, and who would make some money and then go home","代词与定语从句","主语","came","those 指另一批人，两个并列 who 从句都限定这批人的意图。"),children:[
 c("who had no intention to stay","定语从句","后置定语","those","说明这批人不打算长住。","modifier"),
 c("who would make some money and then go home","定语从句","并列后置定语","those","说明赚钱后回家的打算；would 是过去视角下的将来。","modifier"),
 ]}],clauses:[
 {text:"who had no intention to stay",type:"定语从句",marker:"who",role:"限定those",subject:"who",predicate:"had",predicateDetails:[{function:"宾语",text:"no intention to stay"}],translationOrder:"先确定those是人，再说明他们无意留下。"},
 {text:"who would make some money and then go home",type:"定语从句",marker:"who",role:"与前一who从句并列限定those",subject:"who",predicate:"would make / go",predicateDetails:[{function:"宾语",text:"some money"}],translationOrder:"接着说明同一批人打算先赚钱、后回家。"},
 ]},grammarPatches:[{explanation:"先读到came，再往后找是谁来：答案是those，而不是句首介词后的folks。",relation:"Along with前置，those作came的主语。",term:"全部倒装",transferRule:"地点或伴随成分放在句首时，留意谓语后是否才出现主语。"}],practice:[{id:"2013-p2-s2-subject",revision:1,kind:"range",prompt:"划出came的完整主语（包括说明这批人的两个从句）。",options:[],answer:"those who had no intention to stay, and who would make some money and then go home",evidence:"came those who had no intention to stay",feedback:"those才是主语，两个who都在说明这批暂居者；Along with后面是伴随的人。",conceptId:"lexical-context",errorType:"option-logic",purpose:"find-trunk"}]},
 8:{grammarPatches:[{explanation:"同一批移民要么被称赞为未来的美国人，要么被贴上应驱逐者的标签；两种说法体现非黑即白。",relation:"hail them as...与brand them as...并列，them都是被评价的人。",term:"并列谓语与被动不定式",transferRule:"读hail/brand A as B时，先分清被评价者A和给出的身份B；to be done表示被施加动作。"}]},
 15:{grammarPatches:[{explanation:"工作、资金和思想的流动推动的是global economy，这个被动关系紧跟在economy后面。",relation:"driven by...限定economy，经济是被推动的一方。",term:"过去分词短语作后置定语",transferRule:"名词后过去分词短语常可理解为“被……的这个名词”，先确认被动关系是否说得通。"}]},
 19:{grammarPatches:[{explanation:"作者希望移民可以暂时贡献劳动，不需要为此承诺一辈子留在美国。",relation:"without committing...说明暂时productive不附带永久定居承诺；where限定place。",term:"定语从句与介词后动名词",transferRule:"commit oneself to中的to是介词，后接名词或doing；without否定其后的条件，别扩散到前面整个动作。"}]},
 20:{grammarPatches:[{explanation:"家可以在两地、一个人可以归属于两国，都是作者希望移民感到的内容。",relation:"that home...和that they...并列作feel的宾语。",term:"并列宾语从句",transferRule:"and that再次出现时，回看它是否与前一个that共享同一个引导动词，避免误挂到近处名词。"}]},
 22:{trunk:"Looking beyond the culture war logic means opening up the middle ground and understanding that managing immigration requires multiple paths and multiple outcomes",literal:"越过非对即错的文化战争逻辑，意味着打开中间地带，并理解移民管理需要多条路径和多种结果，包括在现行制度内不易合法实现的一些路径或结果。",beginnerSyntax:{components:[
 c("Looking beyond the culture war logic of right or wrong","动名词短语","主语","means","要解释的行为是超越非黑即白的逻辑。"),
 c("means","动词","谓语","主语的行为","说明这种做法意味着什么，不是打算做某事的mean to do。"),
 c("opening up the middle ground","动名词短语","第一宾语","means","第一项是开辟可讨论的中间空间。"),
 {...c("understanding that managing immigration today requires multiple paths and multiple outcomes, including some that are not easy to accomplish legally in the existing system","动名词短语","第二并列宾语","means","第二项是理解管理方式应当多样；including补充多样性有时超出现有制度能顺利处理的范围。"),children:[
 c("managing immigration today","动名词短语","宾语从句主语","requires","需要多种路径的是当今的移民管理。","clause-internal"),
 c("requires","动词","宾语从句谓语","managing immigration today","指出管理的需要。","clause-internal"),
 c("multiple paths and multiple outcomes","并列名词短语","宾语从句宾语","requires","需要的是多条路径和多种结果，不是单一合法/非法标签。","clause-internal"),
 c("including some that are not easy to accomplish legally in the existing system","补充短语","补充说明","multiple paths and multiple outcomes","包含目前制度下难以合法实现的一部分，并非说所有流动都非法。","supplement"),
 ]}],clauses:[
 {text:"that managing immigration today requires multiple paths and multiple outcomes, including some that are not easy to accomplish legally in the existing system",type:"宾语从句",marker:"that",role:"作understanding的宾语",subject:"managing immigration today",predicate:"requires",predicateDetails:[{function:"宾语",text:"multiple paths and multiple outcomes"}],translationOrder:"先理解管理需要多种路径，再读其中一些受现有制度限制。"},
 {text:"that are not easy to accomplish legally in the existing system",type:"定语从句",marker:"that",role:"限定some所指的一些路径或结果",subject:"that",predicate:"are",predicateDetails:[{function:"表语",text:"not easy to accomplish legally in the existing system"}],translationOrder:"一些路径或结果——在现行制度下难以合法实现的那些。"},
 ]},grammarPatches:[{explanation:"句首Looking是一项行为，means后又列出两项行为：开辟中间空间、理解多样路径。",relation:"Looking...作主语；opening和understanding并列作means的宾语。",term:"动名词主语与并列宾语",transferRule:"遇到mean doing先读成“意味着做某事”，不要混成mean to do“打算做某事”。"}]},
};
