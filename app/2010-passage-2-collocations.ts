// 首屏搭配按真实来源选择；完整词典仍保留其他搭配供展开学习。
// 键是稳定词元，值是已收录中文讲解的来源表达或相应规范搭配。
const group = (expression: string, ...words: string[]): Record<string, string[]> =>
  Object.fromEntries(words.map(word => [word, [expression]]));

export const passage2010P2PreferredCollocations: Record<string, Record<string, string[]>> = {
  "2010-p2-s1": {
    ...group("was addressing a small gathering", "address", "gathering"),
    ...group("had invited men to join them", "invite", "join"),
  },
  "2010-p2-s2": {
    ...group("Throughout the evening", "throughout"),
    ...group("offering ideas and anecdotes", "offer", "idea", "anecdote"),
  },
  "2010-p2-s3": { ...group("Toward the end of the evening", "toward", "end"), ...group("talk to them", "talk") },
  "2010-p2-s4": group("nodded in agreement", "nod", "agreement"),
  "2010-p2-s5": group("gestured toward his wife", "gesture", "toward"),
  "2010-p2-s6": { ...group("burst into laughter", "burst", "laughter"), ...group("looked puzzled and hurt", "look", "puzzle", "hurt") },
  "2010-p2-s8": { ...group("come home from work", "come", "home", "work"), ...group("nothing to say", "nothing", "say") },
  "2010-p2-s9": { ...group("keep the conversation going", "keep", "conversation", "go"), ...group("in silence", "silence") },
  "2010-p2-s10": { ...group("tend to talk", "tend", "talk"), ...group("in public situations", "public", "situation") },
  "2010-p2-s11": group("wreaking havoc with marriage", "wreak", "havoc", "with", "marriage"),
  "2010-p2-s12": group("in the late 1970s", "late"),
  "2010-p2-s13": {
    ...group("Divorce Talk", "talk", "divorce"),
    ...group("only a few of the men", "only", "few"),
    ...group("lack of communication", "lack", "communication"),
    ...group("the reason for their divorces", "reason"),
  },
  "2010-p2-s14": {
    ...group("Given the current divorce rate", "give", "current", "rate"),
    ...group("amounts to millions of cases", "amount", "million", "case"),
    ...group("a virtual epidemic", "virtual", "epidemic"),
  },
  "2010-p2-s15": {
    ...group("focused not on tangible inequities", "focus", "tangible", "inequity"),
    ...group("given up the chance", "give", "chance"),
    ...group("far more than their share", "far", "more", "share"),
    ...group("daily life-support work", "daily", "life-support", "work"),
  },
  "2010-p2-s16": group("focused on communication", "focus", "communication"),
  "2010-p2-s17": group("listen to me", "listen"),
  "2010-p2-s18": {
    ...group("first and foremost", "first", "foremost"),
    ...group("conversational partners", "conversational", "partner"),
    ...group("share this expectation", "share", "expectation"),
  },
  "2010-p2-s19": {
    ...group("In short", "short"),
    ...group("at the breakfast table", "breakfast", "table"),
    ...group("with a newspaper held up in front of his face", "with", "newspaper", "hold"),
    ...group("in front of his face", "front", "face"),
    ...group("glares at the back of it", "glare", "back"),
  },
  "question-201026-option-A": group("talk to them", "talk"),
  "question-201026-option-D": group("sharing housework", "share", "housework"),
  "question-201027-prompt": { ...group("judging from the context", "judge", "from", "context"), ...group("the phrase means", "mean") },
  "question-201028-option-A": group("in public", "public"),
  "question-201028-option-C": group("communication between couples", "communication", "between", "couple"),
  "question-201029-option-A": group("more research", "more", "research"),
  "question-201029-option-D": group("between man and wife", "between"),
  "question-201030-option-A": group("Divorce Talk", "talk", "divorce"),
};
