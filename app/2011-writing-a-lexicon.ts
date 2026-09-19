import type { SentenceWordContext } from "./contextual-vocabulary";
import { reviewedLexicon, type LexiconRow } from "./2011-content-helpers";

const rows: LexiconRow[] = [
  ["assume", "assumes assumed assuming", "v.", "假定；设想", "可在本题情境指令中替换suppose，设定表亲已经获录取的前提。", "assume that something is true（假定某事为真）", "assume较正式，强调把某命题暂作前提；此处不取承担责任义。"],
  ["suppose", "supposes supposed supposing", "v.", "假设；设想", "祈使句Suppose引入写信情境，后接省略that的宾语从句。", "suppose that something is true（假设某事为真）", "assume也可设定前提；suppose此处不是无证据地猜测考试结果。"],
  ["cousin", "cousins", "n.", "堂亲；表亲", "your cousin Li Ming为收信人，姓名作同位语；cousin本身不标明性别。", "a cousin of mine（我的一位堂亲或表亲）", "brother和sister通常指兄弟姐妹，不可据中文泛称随意替换cousin。"],
  ["li", "", "proper noun", "李（姓）", "Li Ming整体为收信人李明，Li为姓。", "Dear Li Ming（亲爱的李明）", "不是写信人的署名Zhang Wei。"],
  ["ming", "", "proper noun", "明（名）", "Li Ming是题设姓名，不能根据拼音替原题指定性别。", "Dear Li Ming（亲爱的李明）", "和Li共同构成姓名，不能作为普通名词解释。"],
  ["admit", "admits admitted admitting", "v.", "准许进入；录取", "has been admitted to为现在完成时被动，表示刚被大学录取。", "be admitted to a university（被大学录取）", "admit也表示承认，后接名词、doing或that从句；本句不取承认义。"],
  ["university", "universities", "n.", "大学", "a university为录取院校；university life中名词作定语限定生活阶段。", "university life（大学生活）", "university以辅音音素/j/开头，用a而不是an。"],
  ["write", "writes wrote written writing", "v.", "写；撰写", "write somebody a letter为给某人写信，write的内容由宾语说明。", "write somebody a letter（给某人写信）", "write—wrote—written不规则；write to somebody也可表给某人写信。"],
  ["letter", "letters", "n.", "信；书信", "a letter为本题要求的体裁，不是议论文。", "write a letter to somebody（给某人写信）", "letter另指字母；这里不能理解为写一个字母。"],
  ["congratulate", "congratulates congratulated congratulating", "v.", "祝贺", "congratulate him/her直接以人为宾语，祝贺事件是大学录取。", "congratulate somebody on something（就某事祝贺某人）", "congratulate祝贺已发生的喜事，wish多用于对未来的祝愿；不能混同。"],
  ["give", "gives gave given giving", "v.", "给予；提出", "give him/her suggestions为双宾语结构，建议给予表亲。", "give somebody suggestions（给某人建议）", "give—gave—given不规则；suggestions可数，advice不可数。"],
  ["suggestion", "suggestions", "n.", "建议", "suggestions on how to...说明建议的具体主题是入学准备。", "suggestions on how to prepare（关于如何准备的建议）", "a suggestion可数；不写an advice。另可指迹象或暗示。"],
  ["how", "", "interrogative adverb", "如何；怎样", "how to get prepared为疑问词加不定式，作on的宾语，说明准备方法。", "how to do something（如何做某事）", "不是有完整主谓的疑问从句；不在how后再补that。"],
  ["get", "gets got gotten getting", "v.", "变得；进入某状态", "get prepared是系动词与分词状态，说明做好准备。", "get prepared for something（为某事做好准备）", "get在此不是得到一件物品；get—got—got/gotten。"],
  ["prepare", "prepares prepared preparing", "v.", "准备", "prepared与get连用表准备好的状态，for引准备应对的大学生活。", "prepare for university life（为大学生活作准备）", "prepare for后接事项，prepare to后接动词原形；preparation是派生名词，单独计数。"],
  ["life", "lives", "n.", "生活", "university life指大学阶段的学习和日常生活，不限于考试。", "adapt to university life（适应大学生活）", "life—lives；live为动词生活，不能把所有lives不分语境归一。"],
  ["word", "words", "n.", "词；单词", "100 words用于作文篇幅计数，不指100个汉字。", "about one hundred words（约一百词）", "word也可指话语、消息或诺言，如keep one's word信守诺言。"],
  ["answer", "answers", "n. used attributively", "答题；答案", "ANSWER SHEET整体为答题卡，answer以名词修饰sheet。", "an answer sheet（一张答题卡）", "answer亦可作动词回答；本题不是命令考生另写答案一词。"],
  ["sheet", "sheets", "n.", "纸页；表单", "ANSWER SHEET 2指原卷的答题卡2。", "ANSWER SHEET 2（答题卡2）", "sheet也可指床单、薄片，本文为答题用纸页。"],
  ["sign", "signs signed signing", "v.", "签名；署名", "Do not sign your own name禁止署考生自己的姓名。", "sign one's name（签署姓名）", "sign作名词可指迹象、标志、符号；sign a contract为签署合同。"],
  ["own", "", "adj.", "自己的", "your own name中own加强your，强调不要使用本人真名。", "one's own name（自己的名字）", "own作动词表示拥有；此处不是动词谓语。"],
  ["name", "names", "n.", "姓名", "与sign搭配，下一句指定以Zhang Wei替代。", "sign a name（署名）", "name也可作动词命名、说出名字；本题是签名对象。"],
  ["end", "ends", "n.", "末尾；结尾", "at the end of the letter定位到信件末尾，非时间截止日。", "at the end of the letter（在信的末尾）", "in the end表示最终，不能代替带of的具体位置结构。"],
  ["use", "uses used using", "v.", "使用；采用", "Use Zhang Wei为祈使句，要求用指定署名。", "use a specified name（使用指定姓名）", "use是及物动词，姓名可直接作宾语；此处不是used to曾经。"],
  ["zhang", "", "proper noun", "张（姓）", "与Wei组成题目指定的写信人署名Zhang Wei。", "Yours, Zhang Wei（祝好，张伟）", "不能替换成收信人的Li Ming。"],
  ["wei", "", "proper noun", "伟（名）", "Zhang Wei整体为规定署名，拼写按题目保留。", "Yours, Zhang Wei（祝好，张伟）", "此处为专名组成，不是普通英文词根。"],
  ["instead", "", "adv.", "代替；改用", "承接上一句禁止真实署名，要求改用Zhang Wei。", "use another name instead（改用另一个名字）", "instead可单独放句末；instead of为介词短语，后面需要宾语。"],
  ["address", "addresses", "n.", "地址", "Do not write your address是格式限制，不需邮寄地址。", "write one's address（写下地址）", "address作动词可指向某人讲话、处理问题；address an issue为处理问题。"],
  ["point", "points", "n.", "分；分值", "10 points表本题总分，不是给定十条要点。", "ten points（十分）", "point另指观点、要点、地点；point out为指出，百分点用percentage point。"],
  ["about", "", "adv.", "大约", "about 100 words限定近似词数，不是至少。", "about one hundred（大约一百）", "about作介词可表关于；at least表示至少，不可混同。"],
  ["just", "", "adv.", "刚刚", "has just been admitted指新近完成录取，不取仅仅义。", "have just done（刚做完某事）", "just也可表仅仅、恰好或公正的；本句为时间副词。"],
  ["have", "has had having", "aux.", "完成时助动词", "has与been admitted构成现在完成时被动，has与单数Li Ming一致。", "has been admitted（已经被录取）", "have也可表拥有或have to必须；此处不是实义拥有。"],
  ["be", "am is are was were been being", "aux.", "被动助动词", "been是be的过去分词，has been admitted中连接完成时和被动语态。", "have been admitted（已经被录取）", "be—was/were—been不规则；此处不能将been独立译为存在。"],
  ["do", "does did done doing", "aux.", "否定祈使助动词", "Do not引出禁止指令，后面sign/write仍用动词原形。", "do not write（不要写）", "do在此没有独立的‘做’义，帮助构成否定祈使句；后面的实义动词保持原形。"],
  ["should", "", "modal v.", "应当", "You should write规定写作要求，后接动词原形。", "should write（应当写）", "此处不是表猜测的应该已经；should不随主语变为单三。"],
  ["you", "", "pron.", "你；考生", "You是对考生的指令主语，不是收信人李明。", "you should write（你应当写）", "you为主格/宾格同形，your为形容词性物主代词。"],
  ["your", "", "possessive determiner", "你的；考生的", "your修饰cousin/name/address，将写作情境交给考生。", "your own name（你自己的名字）", "your后接名词，yours可独立使用，不写your's。"],
  ["him", "", "pron.", "他（宾格）", "him/her并列标示男女两种可能，都指题设表亲。", "write him a letter（给他写一封信）", "him是he的宾格；代词人物指代须依本题，不沿用其他阅读的人物。"],
  ["her", "", "pron.", "她（宾格）", "与him并列，作write/congratulate/give的对象；本句不是物主词她的。", "give her suggestions（给她建议）", "her也可作她的修饰名词；这里的him/her整体是人称宾语。"],
];
const reviewed = reviewedLexicon(rows);
export const writing2011ALexicon = reviewed.entries;
export const writing2011ALemmaAliases: Record<string, string> = { ...reviewed.aliases, own: "own", about: "about", her: "her", him: "him", your: "your" };
export const writing2011ACollocationGlosses = reviewed.glosses;
export const writing2011AFormPartOfSpeech: Record<string, string> = { admitted: "v.-ed（被动分词）", prepared: "v.-ed（表准备好的状态）", has: "aux.", been: "aux.", own: "adj.", about: "adv.", words: "n.", points: "n.", answer: "n. used attributively" };
writing2011ALexicon.admit.otherMeanings = ["承认事实或过错：admit doing/that...；准许进入：admit somebody to a place；收治住院：be admitted to hospital。"];
writing2011ALexicon.letter.otherMeanings = ["字母：a capital letter大写字母；字面条文：the letter of the law法律条文字面。"];
writing2011ALexicon.address.otherMeanings = ["v. 处理：address a problem处理问题；向……讲话：address an audience向听众讲话；n. 演说：give an address发表演说。"];
writing2011ALexicon.point.otherMeanings = ["要点或观点：the main point主要论点；意义：the point of doing做某事的意义；v. 指向：point to指向；指出：point out。"];
export const writing2011ASentenceContexts: Record<string, Record<string, SentenceWordContext>> = {
  "2011-writing-a-s1": {
    to: { partOfSpeech: "prep.", contextualMeaning: "引出录取的机构", use: "admitted to中to为介词，后接a university，说明被哪类机构录取。", preferredCollocations: ["be admitted to a university"] },
    your: { partOfSpeech: "possessive determiner", contextualMeaning: "你的", use: "your限定cousin，指考生在题设情境中的表亲。", preferredCollocations: ["your cousin"] },
    a: { partOfSpeech: "art.", contextualMeaning: "一所（不特指）", use: "a限定单数可数名词university，未指定具体院校；university以辅音音素/j/开头，所以用a。", preferredCollocations: ["a university"] },
    university: { partOfSpeech: "n.", contextualMeaning: "大学", use: "a university是to的宾语，说明录取院校；不是要求写明大学名称。", preferredCollocations: ["be admitted to a university"] },
    suppose: { contextualSubstitutions: [{ label: "assume", chinese: "假定", fit: "direct", rewrittenSentence: "Assume your cousin Li Ming has just been admitted to a university.", nuance: "assume语气略正式，更突出把录取设为写作前提；不改变时间、收信人或录取事件。", target: "word:assume" }] }
  },
  "2011-writing-a-s2": {
    a: { partOfSpeech: "art.", contextualMeaning: "一封", use: "a限定单数可数名词letter；a letter是Write的直接宾语。", preferredCollocations: ["a letter"] },
    to: { partOfSpeech: "不定式标记", contextualMeaning: "引出不定式动作", use: "第一处to由congratulate与give两个目的动作共用；how to get中的to引出准备这一动作，整体说明建议主题。", preferredCollocations: ["to congratulate somebody", "how to do something"] },
    and: { partOfSpeech: "conj.", contextualMeaning: "并且", use: "连接congratulate与give，两个动作同属写信目的，共用前面的to；不是让考生二选一。", preferredCollocations: ["congratulate and give"] },
    on: { partOfSpeech: "prep.", contextualMeaning: "关于", use: "suggestions on how to get prepared...中on引出建议主题，宾语是疑问词加不定式。", preferredCollocations: ["suggestions on how to prepare"] },
    for: { partOfSpeech: "prep.", contextualMeaning: "为；针对", use: "prepared for中的for后接university life，说明准备应对什么。", preferredCollocations: ["get prepared for university life"] },
    prepare: { partOfSpeech: "adj.（过去分词形容词化）", contextualMeaning: "准备好的", use: "原文prepared在get后作表语，表示准备好的状态；for说明准备对象。", preferredCollocations: ["get prepared for university life"] },
    university: { partOfSpeech: "n.（作定语）", contextualMeaning: "大学", use: "university修饰life，说明大学阶段的生活，不单指某所院校。", preferredCollocations: ["university life"] }
  },
  "2011-writing-a-s3": {
    write: { partOfSpeech: "v.", contextualMeaning: "写；撰写", use: "should后的write用原形；about 100 words为宾语，on短语说明作答位置。", preferredCollocations: ["write about 100 words"] },
    on: { partOfSpeech: "prep.", contextualMeaning: "在……上", use: "on ANSWER SHEET 2指定原纸笔试卷的答题位置。", preferredCollocations: ["on ANSWER SHEET 2"] }
  },
  "2011-writing-a-s4": {
    do: { partOfSpeech: "aux.", contextualMeaning: "构成否定祈使句", use: "Do与not配合，禁止用考生真名署名；sign仍用原形。", preferredCollocations: ["Do not sign your own name"] },
    not: { partOfSpeech: "adv.", contextualMeaning: "不；不要", use: "Do not sign给出禁止要求，禁止的是以考生自己的真名署名。", preferredCollocations: ["Do not sign your own name"] },
    your: { partOfSpeech: "possessive determiner", contextualMeaning: "你的", use: "your限定name，own进一步强调是考生本人的姓名。", preferredCollocations: ["your own name"] },
    at: { partOfSpeech: "prep.", contextualMeaning: "在（某一位置）", use: "at the end of定位到信件结尾，整个短语修饰sign。", preferredCollocations: ["at the end of the letter"] },
    the: { partOfSpeech: "art.", contextualMeaning: "特指已知对象", use: "the letter回指题目要求写的信；the end表示这封信确定的末尾。两处the都不表示数量。", preferredCollocations: ["the end of the letter"] },
    of: { partOfSpeech: "prep.", contextualMeaning: "……的", use: "of the letter修饰end，限定是这封信的末尾。", preferredCollocations: ["at the end of the letter"] },
    letter: { partOfSpeech: "n.", contextualMeaning: "信；书信", use: "the letter回指本题所写信件，作of的宾语，限定end。", preferredCollocations: ["at the end of the letter"] }
  },
  "2011-writing-a-s6": {
    do: { partOfSpeech: "aux.", contextualMeaning: "构成否定祈使句", use: "Do与not配合构成禁止要求，后面的write保持原形。", preferredCollocations: ["Do not write your address"] },
    not: { partOfSpeech: "adv.", contextualMeaning: "不；不要", use: "Do not write禁止填写地址；not否定整个write your address动作。", preferredCollocations: ["Do not write your address"] },
    write: { partOfSpeech: "v.", contextualMeaning: "写下；填写", use: "write以your address为宾语，Do not说明不要填写这一内容。", preferredCollocations: ["Do not write your address"] },
    your: { partOfSpeech: "possessive determiner", contextualMeaning: "你的", use: "your限定address，指考生自己的地址。", preferredCollocations: ["your address"] }
  }
};

Object.assign(writing2011ACollocationGlosses, {
  "your cousin": { meaning: "你的表亲或堂亲", note: "your为所有格限定词；cousin本身不区分性别。" },
  "a university": { meaning: "一所大学", note: "单数可数名词前用不定冠词；university以辅音音素/j/开头，选a。" },
  "a letter": { meaning: "一封信", note: "letter为单数可数名词；在Write him/her a letter中，整组作直接宾语。" },
  "to congratulate somebody": { meaning: "去祝贺某人；为了祝贺某人", note: "to加动词原形；在本题中表示写信目的，并由后面的give共用to。" },
  "congratulate and give": { meaning: "祝贺并给出（建议）", note: "两个动词形式平行，共用目的不定式标记to；各有自己的宾语。" },
  "write about 100 words": { meaning: "写约100词", note: "about修饰数量100，未规定精确上下限；words是英文单词数。" },
  "on answer sheet 2": { meaning: "在答题卡2上", note: "on引出书写位置，ANSWER SHEET是答题卡，不在此表示建议的主题。" },
  "do not sign your own name": { meaning: "不要署你自己的姓名", note: "Do not + 动词原形构成否定祈使句；禁止对象是真名，不是全部署名。" },
  "the end of the letter": { meaning: "这封信的末尾", note: "end是中心名词，of短语说明所属文本；the letter回指前文要求写的信。" },
  "do not write your address": { meaning: "不要填写你的地址", note: "Do not构成禁止要求；write为动词原形，your address作宾语。" },
  "your address": { meaning: "你的地址", note: "your限定名词address，本题要求不要填写这一信息。" }
});
