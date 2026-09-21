import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false } });
after(() => vite.close());

const data = await vite.ssrLoadModule("/app/data.ts");
const answers = await vite.ssrLoadModule("/app/verified-answer-keys.ts");

const expectedCloze = [
  "Given the advantages of electronic money, you might think that we would move quickly to the cashless society in which all payments are made electronically.",
  "However, a true cashless society is probably not around the corner.",
  "Indeed, predictions have been around for two decades but have not yet come to fruition.",
  'For example, Business Week predicted in 1975 that electronic means of payment would soon "revolutionize the very concept of money itself," only to reverse itself several years later.',
  "Why has the movement to a cashless society been so slow in coming?",
  "Although electronic means of payment may be more efficient than a payments system based on paper, several factors work against the disappearance of the paper system.",
  "First, it is very expensive to set up the computer, card reader, and telecommunications networks necessary to make electronic money the dominant form of payment.",
  "Second, paper checks have the advantage that they provide receipts, something that many consumers are unwilling to give up.",
  'Third, the use of paper checks gives consumers several days of "float" – it takes several days before a check is cashed and funds are withdrawn from the issuer\'s account, which means that the writer of the check can earn interest on the funds in the meantime.',
  "Because electronic payments are immediate, they eliminate the float for the consumer.",
  "Fourth, electronic means of payment may raise security and privacy concerns.",
  "We often hear media reports that an unauthorized hacker has been able to access a computer database and to alter information stored there.",
  "The fact that this is not an uncommon occurrence means that dishonest persons might be able to access bank accounts in electronic payments systems and steal from someone else's accounts.",
  "The prevention of this type of fraud is no easy task, and a new field of computer science is developing to cope with security issues.",
  "A further concern is that the use of electronic means of payment leaves an electronic trail that contains a large amount of personal data.",
  "There are concerns that government, employers, and marketers might be able to access these data, thereby violating our privacy.",
];

const expectedOptions = [
  ["Moreover", "However", "Therefore", "Otherwise"], ["off", "back", "over", "around"], ["power", "concept", "history", "role"], ["reverse", "resist", "resume", "reward"],
  ["silent", "sudden", "slow", "steady"], ["for", "against", "with", "on"], ["expensive", "imaginative", "sensitive", "productive"], ["similar", "original", "temporary", "dominant"],
  ["collect", "copy", "provide", "print"], ["give up", "take over", "bring back", "pass down"], ["before", "after", "since", "when"], ["kept", "borrowed", "withdrawn", "released"],
  ["Unless", "Because", "Until", "Though"], ["hide", "express", "ease", "raise"], ["analyzed", "shared", "stored", "displayed"], ["unsafe", "unnatural", "unclear", "uncommon"],
  ["steal", "choose", "benefit", "return"], ["consideration", "prevention", "manipulation", "justification"], ["call for", "fight against", "adapt to", "cope with"], ["chunk", "chip", "trail", "path"],
];

test("2013完形完整保留16句、20题80选项及已核验答案", () => {
  const article = data.articleContents["2013-cloze"];
  assert.equal(article.kind, "cloze");
  assert.deepEqual(article.sentences.map(item => item.text), expectedCloze);
  assert.deepEqual(article.questions.map(item => item.options.map(option => option.text)), expectedOptions);
  assert.deepEqual(Object.fromEntries(article.questions.map(item => [item.number, item.answer])), answers.verifiedAnswerKey2013Cloze);
  assert.deepEqual(article.sentences.flatMap(item => [...(item.testText ?? "").matchAll(/___\((\d+)\)/g)].map(match => Number(match[1]))), Array.from({ length: 20 }, (_, index) => index + 1));
  assert.ok(article.questions.every(item => Object.values(item.explanations).every(reason => reason.length >= 8)));
  assert.equal(data.sectionsByYear[2013][0].id, "2013-cloze");
});
