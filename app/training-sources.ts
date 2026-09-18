import type { ArticleContent } from "./data";
export function articleMapSource(article: ArticleContent) {
  return { id: `${article.id}-map`, number: 0, text: article.sentences.map(s => s.text).join(" "), practice: article.guide?.practice };
}
export function trainingSources(article: ArticleContent) {
  return [...article.sentences, ...(article.guide?.practice?.length ? [articleMapSource(article)] : [])];
}
