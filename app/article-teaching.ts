export type PassageEvidence = { sentenceId: string; quote: string; role: string };
export type ArticleGuide = {
  route: string[];
  mainIdea: string;
  paragraphs: Array<{ paragraphId: string; title: string; summary: string; relation: string }>;
  sentenceRoles: Record<string, string>;
  references: Array<{ expression: string; sentenceId: string; referent: string; targetSentenceIds: string[]; explanation: string }>;
  timeline: Array<{ label: string; event: string; evidence: PassageEvidence[] }>;
  voices: Array<{ speaker: string; claim: string; boundary: string; evidence: PassageEvidence[] }>;
};
