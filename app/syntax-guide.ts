import type {
  BeginnerClauseDetail,
  BeginnerSyntaxComponent,
  SentenceAnalysis,
  SentenceChunk,
  SyntaxRole,
} from "./data";
import { getLexicalGuide } from "./lexicon";
import { verifiedClausesFor2000 } from "./verified-syntax-2000";

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
  object: "宾语",
  modifier: "补充说明成分",
  connector: "逻辑连接",
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
  const lower = normalizedText(text).toLowerCase();
  const matches = clauseMarkers
    .map((marker) => ({ marker, index: lower.search(new RegExp(`\\b${marker.replace(/\s+/g, "\\s+")}\\b`)) }))
    .filter((match) => match.index >= 0)
    .sort((a, b) => a.index - b.index || b.marker.length - a.marker.length);
  return matches[0]?.marker ?? "无单独引导词";
}

function inferAdverbial(text: string) {
  const lower = normalizedText(text).toLowerCase().replace(/^(but|and|yet)\s+/, "");
  if (/^(if|unless|provided that|only if)\b/.test(lower)) return "条件状语从句";
  if (/^(when|while|whenever|once|as soon as|before|after)\b/.test(lower)) return "时间状语从句";
  if (/^(owing to|because of|due to|thanks to)\b/.test(lower)) return "原因状语";
  if (/^(because|since|now that|given that)\b/.test(lower)) return "原因状语从句";
  if (/^(although|though|even though|even if|however|much as)\b/.test(lower)) return "让步状语从句";
  if (/^(so that|in order that)\b/.test(lower)) return "目的 / 结果状语从句";
  if (/^(as|whatever|however)\b/.test(lower) && finiteVerbIndex(wordTokens(lower)) >= 0) return /^(whatever|however)/.test(lower) ? "让步状语从句" : "时间 / 伴随状语从句";
  if (/^(last|next|this|that|every)\s+(year|month|week|day|morning|evening|night)\b/.test(lower)) return "时间状语";
  if (/^(today|yesterday|tomorrow|nowadays|recently|formerly|eventually)\b/.test(lower)) return "时间状语";
  if (/^(?:[a-z-]+|\d+)\s+years?\s+ago\b/.test(lower)) return "时间状语";
  if (/^(by|in|during|over|throughout|for|till)\b/.test(lower) && /(\b\d{3,4}\b|\byears?\b|\bcentur(?:y|ies)\b|\bdecades?\b|\bmid-\d+s\b|\bpast\b|\bpresent\b|\bfuture\b|\bjuly\b|\bage\b|\bnow\b|\ba while\b)/.test(lower)) return "时间状语";
  if (/^(in order to|so as to|just to|to)\b/.test(lower)) return "目的状语（不定式）";
  if (/^(in|at|on|inside|outside|throughout|across)\b/.test(lower) && /(japan|america|europe|india|city|cities|country|countries|world|school|market|home|harvard|korea)\b/.test(lower)) return "地点 / 范围状语";
  return "状语 / 背景成分";
}

const finiteAuxiliaries = new Set(["am", "is", "are", "was", "were", "have", "has", "had", "do", "does", "did", "can", "could", "may", "might", "must", "shall", "should", "will", "would"]);

function wordTokens(text: string) {
  return normalizedText(text).match(/[A-Za-z]+(?:-[A-Za-z]+)?(?:['’][A-Za-z]+)?/g) ?? [];
}

function finiteVerbIndex(tokens: string[]) {
  return tokens.findIndex((token, index) => {
    const lower = token.toLowerCase();
    if (index > 0 && tokens[index - 1].toLowerCase() === "to") return false;
    if (lower === "being" || lower === "been") return false;
    if (/ing$/i.test(token) && !finiteAuxiliaries.has(lower)) return false;
    const pos = getLexicalGuide(lower).partOfSpeech;
    return finiteAuxiliaries.has(lower) || /(^|\/)v\./.test(pos) || pos.includes("modal v.");
  });
}

function beginsWithClauseMarker(text: string) {
  const lower = normalizedText(text).toLowerCase();
  return /^(if|unless|when|while|whenever|before|after|because|since|although|though|even if|even though|as though|as if|provided that|who|whom|whose|which|where|what|whether|how|why|that)\b/.test(lower);
}

function hasFiniteClause(text: string) {
  if (!beginsWithClauseMarker(text)) return false;
  const marker = firstMarker(text);
  const tokens = wordTokens(text);
  const markerWords = marker === "无单独引导词" ? 0 : marker.split(/\s+/).length;
  return finiteVerbIndex(tokens.slice(markerWords)) >= 0;
}

function inferFunction(source: string, fallbackRole?: SyntaxRole) {
  if (/主语从句/.test(source)) return "主语从句";
  if (/宾语从句/.test(source)) return "宾语从句";
  if (/表语从句/.test(source)) return "表语从句";
  if (/真正主语|形式主语/.test(source) && /从句/.test(source)) return "主语从句";
  if (/内容从句/.test(source)) return "宾语从句";
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

function previousPredicate(chunks: SentenceChunk[], index: number) {
  return [...chunks.slice(0, index)].reverse().find((item) => item.role === "predicate")?.text ?? "主句谓语";
}

function nextPredicate(chunks: SentenceChunk[], index: number) {
  return chunks.slice(index + 1).find((item) => item.role === "predicate")?.text ?? previousPredicate(chunks, index);
}

function isLinkingPredicate(text: string) {
  const lower = normalizedText(text).toLowerCase();
  if (/\b(?:sweeping|filled|found|bought|seeing|regarded|deemed|forced|interested)\b/.test(lower)) return false;
  return /^(?:(?:can|could|may|might|must|shall|should|will|would)\s+)?(?:not\s+)?(?:am|is|are|was|were|be|been|being|seem|seems|seemed|become|becomes|became|prove|proves|proved|look|looks|looked|feel|feels|felt|remain|remains|remained)(?:\s+(?:not|always|still|probably|rather|very|more|less|well|widely|highly|hardly|never))*$/i.test(lower)
    || /^(?:have|has|had)\s+(?:always\s+)?been$/i.test(lower)
    || /^(?:have|has|had)\s+become$/i.test(lower)
    || /\b(?:going|learnt|learned)\s+to\s+be$/i.test(lower);
}

function componentFunction(chunk: SentenceChunk, index: number, chunks: SentenceChunk[]) {
  const clean = normalizedText(chunk.text);
  const lower = clean.toLowerCase();
  const priorPredicate = previousPredicate(chunks, index);
  const adverbial = inferAdverbial(clean);

  if (chunk.role === "subject") {
    if (/^(what|whether|how|why)\b/.test(lower) && hasFiniteClause(clean)) return "主语从句";
    return "主语";
  }
  if (chunk.role === "predicate") return "谓语";
  if (chunk.role === "connector") {
    if (/^(naturally|certainly|strangely|consequently|furthermore|again|more important)\b/.test(lower)) return "评注 / 逻辑副词";
    if (/^and hence the help\b/.test(lower)) return "并列宾语 / 结果递进";
    if (/^such\b.*\bis the way\b/.test(lower)) return "倒装总结分句";
    if (wordTokens(clean).length > 3 && finiteVerbIndex(wordTokens(clean)) >= 0) return "并列分句 / 逻辑连接";
    return "逻辑连接";
  }
  if (chunk.role === "condition") {
    if (/^because of\b/.test(lower)) return "原因状语";
    if (/^while\s+(often|still)\b/.test(lower)) return "让步状语从句省略结构";
    if (/^if not\b/.test(lower)) return "省略式让步 / 对比补充";
    if (hasFiniteClause(clean)) return inferAdverbial(clean);
    if (/^have\s+we\b/.test(lower)) return "冒号后的直接疑问分句";
    if (/^(if|while|when|though|although)\b/.test(lower) && /\b(ed|en)\b/.test(lower)) return "状语从句省略结构";
    return adverbial;
  }
  if (chunk.role === "object") {
    if (/^(that|what|whether|how|where|why)\b/.test(lower) && hasFiniteClause(clean)) {
      const hasFormalIt = chunks.slice(0, index).some((item) => item.role === "subject" && normalizedText(item.text).toLowerCase() === "it");
      if (hasFormalIt && (/\b(?:is|was)\s+(?:possible|obvious)\b/i.test(priorPredicate) || /^(inevitable|obvious|possible)$/i.test(normalizedText(chunks[index - 1]?.text ?? "")))) return "主语从句（形式主语 it）";
      if (/\b(?:was|were)\s+found\b/i.test(priorPredicate)) return "主语从句（形式主语 it）";
      if (/^(that)\b/.test(lower) && /proposition\b/i.test(chunks[index - 1]?.text ?? "")) return "同位语从句";
      if (/^that\b/.test(lower) && /some of which are/i.test(chunks[index - 1]?.text ?? "")) return "表语从句";
      return isLinkingPredicate(priorPredicate) ? "表语从句" : "宾语从句";
    }
    if (/^to\b/.test(lower) && /\bis\s+(?:advisable|upsetting)\b/i.test(priorPredicate)) return "真正主语（to do 不定式）";
    if (/^proud\b/.test(lower) && /\bmakes?\b/i.test(priorPredicate)) return "宾语补足语";
    if (/^as literature\b/.test(lower)) return "主语补足语";
    if (/^[“‘\"']/.test(chunk.text.trim())) return isLinkingPredicate(priorPredicate) ? "引语作表语" : "引语作宾语";
    if (isLinkingPredicate(priorPredicate)) return "表语";
    if (/^(to|with|at|on|into|from)\b/.test(lower)) return "介词宾语 / 谓语补足成分";
    return "宾语";
  }

  if (/^if not\b/.test(lower)) return "省略式让步 / 对比补充";
  if (/\blest\b/.test(lower) && /\bas\b/.test(lower)) return "比较状语 + 预防性目的从句";
  if (/^as\b.*\bas\b/.test(lower)) return "比较状语";
  if (/^lest\b/.test(lower)) return "预防性目的状语从句";
  if (/^where\b/.test(lower) && /few and unimpressive/i.test(previousPredicate(chunks, index))) return "让步性关系从句";
  if (hasFiniteClause(clean) && /^(who|whom|whose|which|that|where|when)\b/.test(lower)) return "定语从句";
  if (/^some of which are\b/.test(lower)) return "非限制性定语从句主干";
  if (/^(and|but)\b/.test(lower) && finiteVerbIndex(wordTokens(clean)) >= 0) return "并列分句 / 逻辑连接";
  if (adverbial !== "状语 / 背景成分") return adverbial;
  if (/^except\b/.test(lower)) return "例外范围状语";
  if (/^under\b.*\bconditions?\b/.test(lower)) return "条件背景状语";
  if (/^(on the left|on the right|and in the middle)\b/.test(lower)) return "省略谓语的方位列举";
  if (/^(summer homes|european travel|bmws)\b/.test(lower)) return "破折号前的举例列举";
  if (/^—?even admitting\b/.test(lower)) return "让步插入（-ing 非谓语）";
  if (/^how$/.test(lower)) return "感叹程度副词";
  if (/^a case of\b/.test(lower)) return "同位解释";
  if (/^(such as|for example|namely)\b/.test(lower)) return "举例 / 同位说明";
  if (/^(than|as .* as|almost as|just like|like\b)|\bthan\b/.test(lower)) return "比较结构";
  if (/^instead of\b/.test(lower)) return "替代方式状语（instead of + -ing）";
  if (/^to\s+[a-z]/.test(lower)) return "to do 不定式修饰 / 补足成分";
  if (/^(including|[a-z-]+ing)\b/.test(lower)) return "现在分词短语 / 补充说明";
  if (/^[a-z-]+ed\b/.test(lower)) return "过去分词短语 / 补充说明";
  if (/^(by|with|without|from|for|of|over|into|at|on|in|between|among|amid|about|beyond|under|solely to)\b/.test(lower)) return "介词短语 / 后置或状语修饰";
  if (isLinkingPredicate(priorPredicate)) return "表语";
  if (/^(now|then|mainly|only|especially|merely|largely|fully|almost)\b/.test(lower)) return "时间 / 程度副词性修饰";
  if (/^(a|an|the)\s+/.test(lower) || /^[A-Z][A-Za-z.'’ -]+$/.test(clean) || /^[—(]/.test(chunk.text.trim())) return "同位语 / 补足说明";
  return "补足说明成分";
}

function componentModifies(chunk: SentenceChunk, syntaxFunction: string, index: number, chunks: SentenceChunk[]) {
  const prior = normalizedText(chunks[index - 1]?.text ?? "前面的中心成分");
  const predicate = normalizedText(nextPredicate(chunks, index));
  if (syntaxFunction === "主语") return `与谓语“${predicate}”构成句子主干`;
  if (syntaxFunction === "谓语") return "说明相邻主语的动作、状态或判断";
  if (syntaxFunction.includes("宾语从句") || syntaxFunction === "宾语" || syntaxFunction.includes("介词宾语")) return `承接谓语“${normalizedText(previousPredicate(chunks, index))}”，补全动作涉及的内容`;
  if (syntaxFunction.includes("表语")) return `放在系动词“${normalizedText(previousPredicate(chunks, index))}”后，说明主语是什么或怎么样`;
  if (syntaxFunction.includes("定语") || syntaxFunction.includes("后置") || syntaxFunction.includes("同位")) return `修饰或解释前面的中心成分“${prior}”`;
  if (/状语|比较/.test(syntaxFunction)) return `修饰谓语或分句“${predicate}”，补充${syntaxFunction.replace(/[（(].*$/, "")}信息`;
  if (syntaxFunction.includes("连接")) return "连接前后同级成分或分句，并标明逻辑关系";
  return `补充说明相邻成分“${prior}”`;
}

function componentFromChunk(chunk: SentenceChunk, index: number, chunks: SentenceChunk[]): BeginnerSyntaxComponent {
  const syntaxFunction = componentFunction(chunk, index, chunks);
  const form = inferForm(chunk.text, syntaxFunction, chunk.role);
  const modifies = componentModifies(chunk, syntaxFunction, index, chunks);
  return {
    text: normalizedText(chunk.text),
    form,
    function: syntaxFunction,
    modifies,
    explanation: `${roleQuestions[chunk.role]} 本组是${form}，整体充当${syntaxFunction}；${modifies}。`,
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
  const original = normalizedText(text);
  let core = original;
  const markerIndex = marker === "无单独引导词" ? -1 : core.toLowerCase().indexOf(marker.toLowerCase());
  if (markerIndex > 0) core = core.slice(markerIndex);
  if (/^(properly|carefully|poorly|well)\s+[a-z-]+ed\b/i.test(core)) {
    const [adverb, participle] = core.split(/\s+/, 2);
    return {
      subject: "it / 主句同一主语（省略）",
      predicate: `is ${adverb} ${participle}（be 动词与主语省略）`,
      objectOrComplement: "这是“连词 + 过去分词”的状语从句省略结构。",
    };
  }

  const tokens = wordTokens(core);
  const markerWords = marker === "无单独引导词" ? [] : marker.split(/\s+/);
  const markerAtStart = marker !== "无单独引导词" && core.toLowerCase().startsWith(marker.toLowerCase());
  const afterMarker = markerAtStart ? tokens.slice(markerWords.length) : tokens;
  const afterFiniteIndex = finiteVerbIndex(afterMarker);
  if (afterFiniteIndex < 0) return null;

  const markerActsAsSubject = markerAtStart
    && ["who", "which", "what", "that"].includes(marker)
    && afterFiniteIndex === 0;
  const markerIsPossessive = markerAtStart && marker === "whose";
  const finiteIndex = markerAtStart ? afterFiniteIndex + markerWords.length : afterFiniteIndex;

  let predicateEnd = finiteIndex + 1;
  if (finiteAuxiliaries.has(tokens[finiteIndex].toLowerCase())) {
    while (predicateEnd < tokens.length && predicateEnd <= finiteIndex + 3) {
      const token = tokens[predicateEnd];
      const pos = getLexicalGuide(token.toLowerCase()).partOfSpeech;
      if (/adv\./.test(pos) || /(^|\/)v\./.test(pos) || /adj\./.test(pos)) predicateEnd += 1;
      else break;
    }
  }
  let subject: string;
  if (markerActsAsSubject) subject = marker;
  else if (markerIsPossessive) subject = tokens.slice(0, finiteIndex).join(" ");
  else if (markerAtStart) subject = tokens.slice(markerWords.length, finiteIndex).join(" ");
  else subject = tokens.slice(0, finiteIndex).join(" ");
  if (!subject) return null;
  const predicate = tokens.slice(finiteIndex, predicateEnd).join(" ");
  const objectOrComplement = tokens.slice(predicateEnd).join(" ");
  return {
    subject,
    predicate,
    objectOrComplement: objectOrComplement || "该从句谓语在这里不需要另接宾语 / 补语。",
  };
}

function derivedClauses(sentence: SentenceAnalysis, layers: BeginnerLayerGuide[]): BeginnerClauseDetail[] {
  const sourceLower = sentence.text.toLowerCase();
  const candidates = layers.filter((layer) => {
    const exact = normalizedText(layer.english);
    return (layer.function.includes("从句") || layer.label.includes("从句"))
      && exact.length > 2
      && !/[.…/]/.test(exact)
      && sourceLower.includes(exact.toLowerCase())
      && hasFiniteClause(exact);
  });
  const fromLayers = candidates.flatMap((layer) => {
    const marker = firstMarker(layer.english);
    const matchingChunkIndex = sentence.chunks.findIndex((chunk) => normalizedText(chunk.text).toLowerCase() === normalizedText(layer.english).toLowerCase());
    const matchingChunk = sentence.chunks[matchingChunkIndex];
    const contextualFunction = matchingChunk ? componentFunction(matchingChunk, matchingChunkIndex, sentence.chunks) : "";
    const type = contextualFunction.includes("从句") ? contextualFunction : clauseType(`${layer.label} ${layer.explanation}`, marker);
    const grammarDetail = sentence.grammar.find((item) => item.includes(marker) || item.includes(type.replace("状语", "")) || item.includes("从句"));
    const skeleton = clauseSkeleton(layer.english, marker);
    if (!skeleton) return [];
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
  const fromChunks = sentence.chunks.flatMap((chunk, index) => {
      const clean = normalizedText(chunk.text).toLowerCase();
      if (!hasFiniteClause(clean)) return [];
      if (/^which of the following\b/.test(clean)) return [];
      if (!/^(when|while|if|unless|because|since|although|though|even if|even though|who|whom|whose|which|where|what|whether|that)\b/.test(clean)) return [];
      if (layerTexts.has(clean)) return [];
      const marker = firstMarker(chunk.text);
      const contextualFunction = componentFunction(chunk, index, sentence.chunks);
      const type = contextualFunction.includes("从句") ? contextualFunction : clauseType(`${inferFunction(chunk.text, chunk.role)} ${chunk.text}`, marker);
      const grammarDetail = sentence.grammar.find((item) => item.toLowerCase().includes(marker) || item.includes("从句"));
      const skeleton = clauseSkeleton(chunk.text, marker);
      if (!skeleton) return [];
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
  const clauses = sentence.beginnerSyntax?.clauses
    ?? (isLegacySyntaxSentence(sentence.id) ? verifiedClausesFor2000(sentence.id) : derivedClauses(sentence, layers));
  return { components, layers, clauses };
}

export function isLegacySyntaxSentence(id: string) {
  return /^(cloze|p[1-5]|translation)-/.test(id);
}
