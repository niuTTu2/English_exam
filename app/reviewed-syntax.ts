import type { BeginnerSyntaxComponent, SentenceAnalysis, SentenceChunk, SyntaxVisualRole } from "./data";

export const visualRoleLabels: Record<SyntaxVisualRole, string> = {
  subject: "主语", predicate: "谓语", object: "宾语", complement: "补足成分", modifier: "修饰成分", connector: "连接成分",
};

const coreFunctionColors: Record<string, SyntaxVisualRole> = {
  主语: "subject", 主语从句: "subject", 第一分句主语: "subject", 第二分句主语: "subject",
  谓语: "predicate", 谓语部分: "predicate", 主句谓语: "predicate", 第一分句谓语: "predicate", 第二分句谓语: "predicate",
  宾语: "object", 宾语从句: "object", 宾语内容: "object",
  表语: "complement", 表语从句: "complement", 宾语补足语: "complement", 收款对象补足语: "complement", 方向补足语: "complement",
  时间状语从句: "modifier", 条件状语从句: "modifier", 原因状语从句: "modifier", 让步状语从句: "modifier",
};

/** 配色由精审者指定，名称/关系复用人工成分数据，避免两处各写一套语法。 */
export function withReviewedSyntax(sentence: Omit<SentenceAnalysis, "chunks">, roles: SyntaxVisualRole[]): SentenceAnalysis {
  const components = sentence.beginnerSyntax?.components;
  if (!components?.length || roles.length !== components.length) throw new Error(`${sentence.id}: 颜色与已审成分必须一一对应`);
  let cursor = 0;
  const chunks: SentenceChunk[] = components.map((component, index) => {
    const requiredColor = coreFunctionColors[component.function];
    if (requiredColor && roles[index] !== requiredColor) throw new Error(`${sentence.id}: ${component.function}不能使用${roles[index]}配色`);
    const start = sentence.text.indexOf(component.text, cursor);
    if (start < cursor || /[\p{L}\p{N}]/u.test(sentence.text.slice(cursor, start))) {
      throw new Error(`${sentence.id}: 成分未按原文连续覆盖：${component.text}`);
    }
    const end = start + component.text.length;
    const text = sentence.text.slice(cursor, end);
    cursor = end;
    return {
      text, visualRole: roles[index], grammarFunction: component.function, form: component.form,
      relation: component.modifies, explanation: component.explanation, componentText: component.text,
    };
  });
  const tail = sentence.text.slice(cursor);
  if (/[\p{L}\p{N}]/u.test(tail)) throw new Error(`${sentence.id}: 末尾仍有未覆盖原文`);
  chunks[chunks.length - 1].text += tail;
  return { ...sentence, chunks };
}

export function chunkVisualRole(chunk: SentenceChunk): SyntaxVisualRole {
  if (chunk.visualRole) return chunk.visualRole;
  return chunk.role === "condition" ? "modifier" : chunk.role;
}

export function chunkDescription(chunk: SentenceChunk): string | undefined {
  if (!chunk.visualRole) return undefined;
  return `${chunk.grammarFunction} · ${chunk.form}；${chunk.relation}`;
}

export function componentFromReviewedChunk(chunk: SentenceChunk): BeginnerSyntaxComponent | undefined {
  if (!chunk.visualRole) return undefined;
  return { text: chunk.componentText, function: chunk.grammarFunction, form: chunk.form, modifies: chunk.relation, explanation: chunk.explanation };
}
