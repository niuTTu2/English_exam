/** Editorial identity links into the existing corpus; never replacement word entries. */
export type ReviewedSenseGroup = {
  id: string;
  pos: string;
  meaning: string;
  forms: readonly (readonly [sourcePos: string, meanings: readonly string[]])[];
  /** A meaning explicitly stated inside a reviewed composite note; never inherits that note's count. */
  fromNotes?: readonly (readonly [sourcePos: string, sourceMeaning: string])[];
  /** A broad old gloss can be assigned only after checking this exact real source. */
  sources?: readonly (readonly [sourceId: string, sourcePos: string, sourceMeaning: string, expression?: string])[];
};

export type ReviewedSenseTable = Readonly<Record<string, readonly ReviewedSenseGroup[]>>;

/** A reviewed composite or usage note is retained, but is not another lexical sense. */
export type ReviewedSenseAnnotation = {
  reason: string;
  forms?: ReviewedSenseGroup["forms"];
  sources?: ReviewedSenseGroup["sources"];
};
export type ReviewedSenseAnnotations = Readonly<Record<string, readonly ReviewedSenseAnnotation[]>>;
