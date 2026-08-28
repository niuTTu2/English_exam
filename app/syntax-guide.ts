import type {
  BeginnerClauseDetail,
  BeginnerSyntaxComponent,
  SentenceAnalysis,
  SentenceChunk,
  SyntaxRole,
} from "./data";
import { getLexicalGuide } from "./lexicon";

export type BeginnerLayerGuide = {
  label: string;
  english: string;
  explanation: string;
  function: string;
  form: string;
  question: string;
  modifies: string;
};

export type BeginnerSyntaxGuide = {
  components: BeginnerSyntaxComponent[];
  layers: BeginnerLayerGuide[];
  clauses: BeginnerClauseDetail[];
};

const roleNames: Record<SyntaxRole, string> = {
  condition: "状语 / 条件背景",
  subject: "主语",
  predicate: "谓语",
  object: "宾语 / 表语",
  modifier: "修饰成分",
  connector: "连接成分",
};

const roleQuestions: Record<SyntaxRole, string> = {
  condition: "在什么条件、时间或背景下？",
  subject: "谁或什么？",
  predicate: "做什么，或处于什么状态？",
  object: "动作涉及谁 / 什么，或主语是什么？",
  modifier: "修饰谁？补充哪一类信息？",
  connector: "前后是什么逻辑关系？",
};

const clauseMarkers = [
  "even though",
  "even if",
  "as soon as",
  "in order that",
  "so that",
  "provided that",
  "as if",
  "as though",
  "although",
  "because",
  "unless",
  "whether",
  "however",
  "whenever",
  "wherever",
  "while",
  "when",
  "before",
  "after",
  "since",
  "though",
  "whose",
  "which",
  "where",
  "what",
  "that",
  "who",
  "whom",
  "if",
  "for",
  "as",
];

function normalizedText(text: string) {
  return text.trim().replace(/^[,;:—"“‘\s]+|[,;:.!?"”’\s]+$/g, "");
}

function firstMarker(text: string) {
  const lower = ` ${normalizedText(text).toLowerCase()} `;
  return clauseMarkers.find((marker) => lower.includes(` ${marker} `)) ?? "无单独引导词";
}

function inferAdverbial(text: string) {
  const lower = normalizedText(text).toLowerCase();
  if (/^(if|unless|provided that|only if)\b/.test(lower)) return "条件状语从句";
  if (/^(when|while|whenever|once|as soon as|before|after)\b/.test(lower)) return "时间状语从句";
  if (/^(because|since|now that|given that)\b/.test(lower)) return "原因状语从句";
  if (/^(although|though|even though|even if|however|much as)\b/.test(lower)) return "让步状语从句";
  if (/^(so that|in order that)\b/.test(lower)) return "目的 / 结果状语从句";
  if (/^(last|next|this|that|every)\s+(year|month|week|day|morning|evening|night)\b/.test(lower)) return "时间状语";
  if (/^(today|yesterday|tomorrow|nowadays|recently|formerly|eventually)\b/.test(lower)) return "时间状语";
  if (/^(in|at|on|inside|outside|throughout|across)\b/.test(lower) && /(japan|america|europe|india|city|cities|country|countries|world|school|market|home|harvard|korea)\b/.test(lower)) return "地点 / 范围状语";
  return "状语 / 背景成分";
}

function inferFunction(source: string, fallbackRole?: SyntaxRole) {
  if (/主语从句/.test(source)) return "主语从句";
  if (/宾语从句/.test(source)) return "宾语从句";
  if (/表语从句/.test(source)) return "表语从句";
  if (/同位语从句/.test(source)) return "同位语从句";
  if (/定语从句/.test(source)) return "定语从句";
  if (/条件/.test(source)) return source.includes("从句") ? "条件状语从句" : "条件状语";
  if (/时间/.test(source)) return source.includes("从句") ? "时间状语从句" : "时间状语";
  if (/地点|位置|范围/.test(source)) return "地点 / 范围状语";
  if (/原因|因果/.test(source)) return source.includes("从句") ? "原因状语从句" : "原因状语";
  if (/让步/.test(source)) return source.includes("从句") ? "让步状语从句" : "让步状语";
  if (/目的/.test(source)) return "目的状语";
  if (/结果/.test(source)) return "结果成分";
  if (/方式|手段/.test(source)) return "方式状语";
  if (/程度|数量|频率/.test(source)) return "程度 / 数量 / 频率修饰";
  if (/非谓语|不定式|分词|动名词/.test(source)) return "非谓语结构";
  if (/同位/.test(source)) return "同位语";
  if (/表语|系表/.test(source)) return "表语";
  if (/宾语/.test(source)) return "宾语";
  if (/谓语/.test(source)) return "谓语";
  if (/主语/.test(source)) return "主语";
  if (/连接|转折|递进|承接|对比/.test(source)) return "逻辑连接";
  if (/定语|后置修饰|修饰/.test(source)) return "定语 / 修饰成分";
  if (fallbackRole === "condition") return inferAdverbial(source);
  return fallbackRole ? roleNames[fallbackRole] : "句子成分";
}

function inferForm(text: string, syntaxFunction: string, role?: SyntaxRole) {
  const clean = normalizedText(text);
  const lower = clean.toLowerCase();
  if (syntaxFunction.includes("从句")) return "从句（内部也有自己的主语和谓语）";
  if (/^(in|on|at|under|with|without|by|from|for|of|between|among|amid|after|before|during|through|throughout|across|within|beyond)\b/.test(lower)) return "介词短语";
  if (/^to\s+[a-z]/.test(lower)) return "to do 不定式短语";
  if (/^[a-z-]+ing\b/.test(lower)) return "-ing 非谓语 / 动名词短语";
  if (/^[a-z-]+ed\b/.test(lower)) return "过去分词短语";
  if (/^(last|next|this|that|every)\s+(year|month|week|day|morning|evening|night)\b/.test(lower)) return "名词短语作状语";
  if (/^[a-z-]+ly$/.test(lower)) return "副词";
  if (role === "subject" || role === "object") return "名词、代词或名词短语";
  if (role === "predicate") return "谓语动词 / 动词短语";
  if (role === "connector") return "连接词 / 连接短语";
  return "词或短语组合";
}

function questionFor(syntaxFunction: string, fallbackRole?: SyntaxRole) {
  if (syntaxFunction.includes("时间")) return "什么时候发生？";
  if (syntaxFunction.includes("地点") || syntaxFunction.includes("范围")) return "在哪里或在什么范围内？";
  if (syntaxFunction.includes("条件")) return "在什么条件下成立？";
  if (syntaxFunction.includes("原因")) return "为什么发生？";
  if (syntaxFunction.includes("让步")) return "尽管什么情况，主句仍成立？";
  if (syntaxFunction.includes("目的")) return "为了什么？";
  if (syntaxFunction.includes("方式")) return "以什么方式发生？";
  if (syntaxFunction.includes("定语")) return "修饰前面的哪个名词？";
  if (syntaxFunction.includes("宾语")) return "动作涉及什么，或具体内容是什么？";
  if (syntaxFunction.includes("表语")) return "主语是什么或怎么样？";
  if (syntaxFunction.includes("主语")) return "谁或什么是全句谈论对象？";
  if (syntaxFunction.includes("谓语")) return "主语做什么或处于什么状态？";
  if (syntaxFunction.includes("连接")) return "前后是什么逻辑关系？";
  return fallbackRole ? roleQuestions[fallbackRole] : "这组词在句中做什么？";
}

function modifiesFor(syntaxFunction: string) {
  if (syntaxFunction.includes("时间") || syntaxFunction.includes("地点") || syntaxFunction.includes("条件") || syntaxFunction.includes("原因") || syntaxFunction.includes("让步") || syntaxFunction.includes("目的") || syntaxFunction.includes("方式")) return "整体修饰主句谓语，补充动作发生的背景";
  if (syntaxFunction.includes("定语")) return "修饰它前面的中心名词，限定“哪一个 / 什么样的”";
  if (syntaxFunction.includes("宾语从句")) return "整体放在谓语动词后，充当该动词的宾语";
  if (syntaxFunction.includes("主语从句")) return "整个从句充当主句主语";
  if (syntaxFunction.includes("表语从句")) return "放在系动词后，解释主语内容";
  if (syntaxFunction.includes("同位语")) return "解释前面的抽象名词具体指什么";
  if (syntaxFunction === "主语") return "与谓语构成主干，是动作或状态的主体";
  if (syntaxFunction === "谓语") return "说明主语的动作、状态或判断";
  if (syntaxFunction.includes("宾语") || syntaxFunction === "表语") return "承接谓语，补全动作对象或主语状态";
  if (syntaxFunction.includes("连接")) return "连接前后同级成分或分句，并标出逻辑关系";
  if (syntaxFunction.includes("非谓语")) return "依附主句成分，不单独充当带时态的谓语";
  return "结合相邻主干判断它修饰或补充的对象";
}

function componentFromChunk(chunk: SentenceChunk): BeginnerSyntaxComponent {
  const adverbial = inferAdverbial(chunk.text);
  const syntaxFunction = chunk.role === "condition" || (chunk.role === "modifier" && adverbial !== "状语 / 背景成分")
    ? adverbial
    : inferFunction(chunk.text, chunk.role);
  return {
    text: normalizedText(chunk.text),
    form: inferForm(chunk.text, syntaxFunction, chunk.role),
    function: syntaxFunction,
    modifies: modifiesFor(syntaxFunction),
    explanation: `${roleQuestions[chunk.role]} 先把“${normalizedText(chunk.text)}”作为一个整体，不要逐词打散。`,
  };
}

function splitLayerText(text: string) {
  const separator = text.search(/[:：]/);
  if (separator < 0) return { english: text.trim(), explanation: text.trim() };
  return {
    english: text.slice(0, separator).trim(),
    explanation: text.slice(separator + 1).trim(),
  };
}

function layerGuide(label: string, text: string): BeginnerLayerGuide {
  const split = splitLayerText(text);
  const syntaxFunction = inferFunction(`${label} ${text}`);
  return {
    label,
    english: split.english,
    explanation: split.explanation,
    function: syntaxFunction,
    form: inferForm(split.english, syntaxFunction),
    question: questionFor(syntaxFunction),
    modifies: modifiesFor(syntaxFunction),
  };
}

function clauseType(source: string, marker: string) {
  const inferred = inferFunction(source);
  if (inferred.includes("从句")) return inferred;
  if (["if", "unless", "provided that"].includes(marker)) return "条件状语从句";
  if (["when", "while", "before", "after", "as soon as", "whenever"].includes(marker)) return "时间状语从句";
  if (["because", "since", "for"].includes(marker)) return "原因状语从句";
  if (["although", "though", "even though", "even if", "however"].includes(marker)) return "让步状语从句";
  if (["who", "whom", "whose", "which"].includes(marker)) return "定语从句";
  if (["what", "whether"].includes(marker)) return "名词性从句";
  return "从句";
}

function translationOrder(type: string) {
  if (type.includes("定语")) return "先找被修饰的中心名词，再把从句理解成“……的”信息。";
  if (type.includes("宾语")) return "先读主句谓语，再把整个从句当作谓语的具体内容。";
  if (type.includes("主语")) return "先把整个从句压缩成“这件事”，再接主句谓语。";
  if (type.includes("表语")) return "先读主语和系动词，再用从句解释主语具体是什么。";
  if (type.includes("条件")) return "先译“如果 / 只有……”，再回到主句结果。";
  if (type.includes("时间")) return "先交代动作发生的时间，再译主句。";
  if (type.includes("原因")) return "先确认原因与结果关系，中文可按语境先因后果。";
  if (type.includes("让步")) return "先译“尽管……”，再突出主句仍然成立。";
  return "先把从句作为一个整体理解，再放回它在主句中的位置。";
}

function clauseSkeleton(text: string, marker: string) {
  let core = normalizedText(text);
  if (marker !== "无单独引导词") {
    const markerIndex = core.toLowerCase().indexOf(marker.toLowerCase());
    if (markerIndex >= 0) core = core.slice(markerIndex + marker.length).replace(/^[,\s]+/, "");
  }
  if (/^(properly|carefully|poorly|well)\s+[a-z-]+ed\b/i.test(core)) {
    const [adverb, participle] = core.split(/\s+/, 2);
    return {
      subject: "it / 主句同一主语（省略）",
      predicate: `is ${adverb} ${participle}（be 动词与主语省略）`,
      objectOrComplement: "这是“连词 + 过去分词”的状语从句省略结构。",
    };
  }

  const tokens = core.match(/[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];
  const auxiliaries = new Set(["am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "can", "could", "may", "might", "must", "shall", "should", "will", "would"]);
  const finiteIndex = tokens.findIndex((token, index) => {
    const lower = token.toLowerCase();
    if (index > 0 && tokens[index - 1].toLowerCase() === "to") return false;
    if (/ing$/i.test(token) && !auxiliaries.has(lower)) return false;
    if (/ed$/i.test(token) && tokens[index + 1]?.toLowerCase() === "by") return false;
    const pos = getLexicalGuide(lower).partOfSpeech;
    return auxiliaries.has(lower) || /(^|\/)v\./.test(pos) || pos.includes("modal v.");
  });
  if (finiteIndex <= 0) {
    return {
      subject: "从引导词后找动作发出者",
      predicate: "找带时态、情态或语态变化的动词",
      objectOrComplement: "再看谓语后是否需要宾语、表语或补语。",
    };
  }

  let predicateEnd = finiteIndex + 1;
  if (auxiliaries.has(tokens[finiteIndex].toLowerCase())) {
    while (predicateEnd < tokens.length && predicateEnd <= finiteIndex + 3) {
      const token = tokens[predicateEnd];
      const pos = getLexicalGuide(token.toLowerCase()).partOfSpeech;
      if (/adv\./.test(pos) || /(^|\/)v\./.test(pos) || /adj\./.test(pos)) predicateEnd += 1;
      else break;
    }
  }
  const subject = tokens.slice(0, finiteIndex).join(" ");
  const predicate = tokens.slice(finiteIndex, predicateEnd).join(" ");
  const objectOrComplement = tokens.slice(predicateEnd).join(" ");
  return {
    subject,
    predicate,
    objectOrComplement: objectOrComplement || "该从句谓语在这里不需要另接宾语 / 补语。",
  };
}

function derivedClauses(sentence: SentenceAnalysis, layers: BeginnerLayerGuide[]): BeginnerClauseDetail[] {
  const candidates = layers.filter((layer) => layer.function.includes("从句") || layer.label.includes("从句"));
  const fromLayers = candidates.map((layer) => {
    const marker = firstMarker(layer.english);
    const type = clauseType(`${layer.label} ${layer.explanation}`, marker);
    const grammarDetail = sentence.grammar.find((item) => item.includes(marker) || item.includes(type.replace("状语", "")) || item.includes("从句"));
    const skeleton = clauseSkeleton(layer.english, marker);
    return {
      text: layer.english,
      type,
      marker,
      role: layer.modifies,
      subject: skeleton.subject,
      predicate: skeleton.predicate,
      objectOrComplement: `${skeleton.objectOrComplement}${grammarDetail ? `；语法提示：${grammarDetail}` : ""}`,
      translationOrder: translationOrder(type),
    };
  });
  const layerTexts = new Set(fromLayers.map((item) => normalizedText(item.text).toLowerCase()));
  const fromChunks = sentence.chunks
    .filter((chunk) => {
      const clean = normalizedText(chunk.text).toLowerCase();
      return chunk.role === "condition" || /^(when|while|if|unless|because|although|though|even if|even though)\b/.test(clean) || /\b(who|whom|whose|which)\b/.test(clean);
    })
    .filter((chunk) => !layerTexts.has(normalizedText(chunk.text).toLowerCase()))
    .map((chunk) => {
      const marker = firstMarker(chunk.text);
      const type = clauseType(`${inferFunction(chunk.text, chunk.role)} ${chunk.text}`, marker);
      const grammarDetail = sentence.grammar.find((item) => item.toLowerCase().includes(marker) || item.includes("从句"));
      const skeleton = clauseSkeleton(chunk.text, marker);
      return {
        text: normalizedText(chunk.text),
        type,
        marker,
        role: modifiesFor(type),
        subject: skeleton.subject,
        predicate: skeleton.predicate,
        objectOrComplement: `${skeleton.objectOrComplement}${grammarDetail ? `；语法提示：${grammarDetail}` : ""}`,
        translationOrder: translationOrder(type),
      };
    });
  return [...fromLayers, ...fromChunks];
}

export function buildBeginnerSyntaxGuide(sentence: SentenceAnalysis): BeginnerSyntaxGuide {
  const components = sentence.beginnerSyntax?.components ?? sentence.chunks.map(componentFromChunk);
  const layers = sentence.layers.map((layer) => layerGuide(layer.label, layer.text));
  const clauses = sentence.beginnerSyntax?.clauses ?? derivedClauses(sentence, layers);
  return { components, layers, clauses };
}

export function isLegacySyntaxSentence(id: string) {
  return /^(cloze|p[1-5]|translation)-/.test(id);
}
