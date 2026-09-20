import type { ArticleContent, SentenceAnalysis } from "./data";

/** Legacy automatic highlighting is frozen to its original article corpus.
 * Newly imported content may share word memory, but must not restyle old questions.
 */
const legacyArticleIds = new Set(["cloze", "p1", "p2", "p3", "p4", "p5", "translation", "2001-cloze", "2001-p1", "2001-p2", "2010-cloze", "2010-p1", "2010-p2", "2010-p3", "2010-p4", "2010-p5", "2010-translation", "2011-cloze", "2011-p1", "2011-p2", "2011-p3", "2011-p4", "2011-p5", "2011-translation", "2011-writing-a", "2011-writing-b", "2012-cloze", "2012-p1", "2012-p2", "2012-p3", "2012-p4", "2012-p5", "2012-translation", "2012-writing-a", "2012-writing-b"]);
export function createAnalysisPhraseResolver(articles: Record<string, ArticleContent>, isKnown: (text: string) => boolean) {
  const collect = (article: ArticleContent) => [
    ...article.sentences.flatMap(sentence => sentence.phrases),
    ...article.questions.flatMap(question => question.options.map(option => option.text)
      .filter(text => text.includes(" ") && isKnown(text))),
  ];
  const legacy = Object.values(articles).filter(article => legacyArticleIds.has(article.id)).flatMap(collect);
  const sourceArticles = new Map(Object.values(articles).flatMap(article => article.questions.flatMap(question => [
    [`question-${question.id}-prompt`, article] as const,
    ...question.options.map(option => [`question-${question.id}-option-${option.key}`, article] as const),
  ])));
  return (analysis: SentenceAnalysis) => {
    const article = sourceArticles.get(analysis.id);
    const candidates = [...analysis.phrases, ...legacy, ...(article && !legacyArticleIds.has(article.id) ? collect(article) : [])];
    const text = analysis.text.toLowerCase();
    return [...new Set(candidates.filter(phrase => text.includes(phrase.toLowerCase())))];
  };
}
