import type { SentenceReadingGuide } from "./data";

export const passage2010P2Reading: Record<string, SentenceReadingGuide> = {
  "2010-p2-s1": {
    focus: "先读‘我正在对一群人讲话’；破折号后解释这群人是谁，邀请男性的动作则发生在这场讲话之前。",
    questions: [
      { question: "客厅和女性团体分别接在哪里？", evidence: "in a suburban Virginia living room – a women's group that had invited men to join them", answer: "in…room 是讲话的地点状语；a women's group 回头解释 gathering 这群人，不是解释 room。that 从句再限定 group。先分人和地点，才不会把同位说明误挂到最近的名词上。" },
      { question: "had invited 和 to join 是两个谓语吗？", evidence: "that had invited men to join them", answer: "从句只有 had invited 这个带时态的谓语，that 代 group 作主语；men 是宾语，to join them 是宾补。加入的执行者是 men，them 指这个女性团体；过去完成时说明邀请在讲话之前已发生。" },
    ],
  },
  "2010-p2-s2": {
    focus: "男子健谈、妻子沉默是两边的对照。offering 是男子健谈的具体表现，不能接到妻子身上。",
    questions: [
      { question: "had been particularly talkative 是进行时吗？", evidence: "had been particularly talkative", answer: "不是。had been 是 be 的过去完成时，talkative 是形容词表语；特别健谈的是男子。particularly 修饰 talkative 的程度，后面的 offering 才是非谓语 -ing 形式，不能把两处隔着表语拼成 had been offering。" },
      { question: "两个副词分别管什么？", evidence: "frequently offering ideas and anecdotes", answer: "frequently 修饰 offering，表示频繁提供想法、讲趣闻；整组说明男子的伴随表现。妻子分句中的 silently 则修饰 sat，表示静静坐着，不修饰丈夫的说话。" },
      { question: "地点为什么不能都算作妻子的定语？", evidence: "while his wife sat silently beside him on the couch", answer: "beside him 交代坐在谁旁边，on the couch 交代坐在什么地方，均修饰 sat。while 在此既呈现同时发生的场景，更突出‘他话多，而她沉默’的对照，不译成‘然而妻子离开以后’。" },
    ],
  },
  "2010-p2-s3": {
    focus: "两层 that 套在一起：我谈到的是‘女性经常抱怨’，她们抱怨的才是‘丈夫不和她们说话’。",
    questions: [
      { question: "两个 that 后面各自有谁、做什么？", evidence: "that women frequently complain that their husbands don't talk to them", answer: "外层是 women—complain，作 commented 的内容；内层是 their husbands—don't talk，作 complain 的内容。that 只负责连接，不在这些内容从句里充当主语；them 回指女性，不能误指丈夫。" },
      { question: "开头时间和 frequently 属于同一层吗？", evidence: "Toward the end of the evening", answer: "这组时间短语修饰我那次 commented，表示聚会接近结束；frequently 在外层宾语从句内部修饰 complain，概括女性经常抱怨。一次评论的时间和经常抱怨的频率不能混在一起。" },
    ],
  },
  "2010-p2-s4": {
    focus: "只有 nodded 一个动作；quickly 说反应快，in agreement 说点头所表示的赞同。",
    questions: [
      { question: "in agreement 是 nod 的宾语吗？", evidence: "quickly nodded in agreement", answer: "不是。nodded 在这里不及物；in + 名词 agreement 构成态度/方式状语，说明他赞同作者的评论。quickly 是副词，修饰点头的速度，两者从不同角度解释同一动作。" },
    ],
  },
  "2010-p2-s5": {
    focus: "and 连接男士的两个动作：做手势，再说话。引号内另有主系表句，She 指他的妻子。",
    questions: [
      { question: "toward 和 in 各说明谁？", evidence: "He gestured toward his wife and said", answer: "toward his wife 修饰 gestured，说明手势的方向；引语里的 in our family 限定‘爱说话的人’这一称呼的家庭范围。妻子是手势指向的人，不是 said 的主语。" },
      { question: "talker 是动词吗？", evidence: "She's the talker in our family", answer: "She's 是 She is；系动词 is 后的 the talker 是名词表语，表示‘我们家那个爱说话的人’。主语是 She，不能把 talker 当成带时态的 talk。" },
    ],
  },
  "2010-p2-s6": {
    focus: "分号两侧是两套主谓：满屋人笑起来，这位男士却显得困惑、委屈。",
    questions: [
      { question: "room 和 looked 要怎样理解？", evidence: "The room burst into laughter; the man looked puzzled and hurt", answer: "The room 借地点代指听众；burst into laughter 表示突然大笑。后半句 looked 是‘显得’这一系动词，puzzled 和 hurt 是并列形容词表语，描述男士的感受，不是两个过去时动作。" },
    ],
  },
  "2010-p2-s7": {
    focus: "引语说在前，报道语放在后：‘确实如此’，他解释道。It's 里的 It 回指他刚才对妻子的评价。",
    questions: [
      { question: "为什么一句话里有 is 和 explained？", evidence: "\"It's true,\" he explained", answer: "引号内是 It—is—true 的主系表判断；引号外是 he—explained，交代谁说了这句话。两套谓语各有自己的主语，不能把 true 当 explained 的宾语，也不能把 It 当形式主语等待后面的从句。" },
    ],
  },
  "2010-p2-s8": {
    focus: "When 先限定‘下班回家时’，主句才说‘我没有话可说’；to say 修饰 nothing，不是回家的目的。",
    questions: [
      { question: "home 和 from work 为什么不都是宾语？", evidence: "When I come home from work", answer: "come 在这里不及物，home 是方向副词，from work 是来处介词短语，合起来表示下班回家。When 后有自己的 I—come，所以整块是时间状语从句。引语里的 I 是男士，而不是文章叙述者。" },
      { question: "to say 为什么紧跟 nothing？", evidence: "I have nothing to say", answer: "have 的宾语是 nothing；to say 是后置定语，说明‘可说的东西’。nothing 同时是 say 在意义上的宾语。不是‘我为了说话而没有东西’，否定也并未扩展成他在所有场合都沉默。" },
    ],
  },
  "2010-p2-s9": {
    focus: "过去式在这里用来设想相反情况：若不是妻子维持交谈，两人就会整晚沉默。",
    questions: [
      { question: "didn't 和 we'd 为什么不译成过去真的发生？", evidence: "If she didn't keep the conversation going, we'd spend the whole evening in silence", answer: "If + 过去式与 would + 原形配合，表示他对目前惯常情形的反事实设想；we'd 后接原形 spend，所以 'd 是 would，不是 had。现实是妻子在维持谈话，而不是已经有一晚谁都没说话。" },
      { question: "going、evening 和 silence 各是什么成分？", evidence: "keep the conversation going", answer: "keep 的宾语是 the conversation，going 是宾补，说明要使交谈持续的状态。主句 spend 的宾语 the whole evening 表时间段，in silence 是度过这段时间的状态状语；不是把 silence 当 spend 的第二个宾语。" },
    ],
  },
  "2010-p2-s10": {
    focus: "先抓 This episode crystallizes the irony；that 解释反差的内容，里面用 although 把‘外面话多’和‘家里话少’对起来。",
    questions: [
      { question: "that 是修饰 irony 的定语从句吗？", evidence: "the irony that although American men tend to talk more than women in public situations, they often talk less at home", answer: "这里是名词 irony 的内容说明，传统教学称同位语从句。that 不充当内部任何主语或宾语；内部是 although 引导的让步从句，加 they…talk…这个主要分句，共同说明反差是什么。" },
      { question: "两个 talk 的修饰语怎样对齐？", evidence: "they often talk less at home", answer: "前面 talk more 配 in public situations，后面 talk less 配 at home，都是说话量加发生场合。often 修饰后一个 talk 的频率，less 表说话量较少；they 回指 American men，不指 women。" },
      { question: "than women 能直接叫 talk 的宾语吗？", evidence: "talk more than women", answer: "不能。talk 不及物，more 是数量副词；than women 给出比较对象，按省略理解可补读成‘比女性说得多’。补读有助理解，但不把省略的词改写进原文。" },
    ],
  },
  "2010-p2-s11": {
    focus: "is wreaking 是谓语，havoc 才是宾语；with marriage 说明这份破坏落在哪个对象上。",
    questions: [
      { question: "wreaking havoc with 是怎样组起来的？", evidence: "this pattern is wreaking havoc with marriage", answer: "pattern 回指男子在外多话、在家少话的模式。is + wreaking 为现在进行时，wreak 表‘造成’，不可数名词 havoc 表‘严重破坏’；with marriage 引受影响对象。单点 wreaking 不能把‘婚姻严重受损’整句都当成这个动词的意思。" },
    ],
  },
  "2010-p2-s12": {
    focus: "被动句让‘这种模式’留在句首；by 后是观察者，in 后才是观察时间。",
    questions: [
      { question: "两个介词短语为什么不能混成身份说明？", evidence: "was observed by political scientist Andrew Hacker in the late 1970s", answer: "was observed 为过去时被动谓语；by political scientist Andrew Hacker 说明谁观察，in the late 1970s 说明何时观察，均接 observed。political scientist 是姓名前的职业称谓；late 修饰整个1970年代，指70年代后期。" },
    ],
  },
  "2010-p2-s13": {
    focus: "reports 与 that 中间插入出版信息；that 之后的主语还夹有一个省略关系词的定语从句和男女数量对照。",
    questions: [
      { question: "reports 的宾语到哪里才开始？", evidence: "reports in her new book Divorce Talk that", answer: "先跳过 in her new book Divorce Talk，找到 that 引出的报告内容。in…book 说明报告出现在什么书里，Divorce Talk 是书名，不是名叫 Divorce 的人说话。" },
      { question: "she interviewed 和 but only a few 分别附着在哪里？", evidence: "most of the women she interviewed – but only a few of the men –", answer: "主语骨架是‘多数女性——但只有少数男性——’。she interviewed 是修饰 women 的限制性定语从句，关系词省略，women 是 interviewed 在意义上的宾语；破折号内 only a few… 与 most…形成数量对照，共同指向后面的 gave。" },
      { question: "gave…as…该怎样译？", evidence: "gave lack of communication as the reason for their divorces", answer: "gave 接宾语 lack of communication，as the reason…把它认定为原因，整体是‘把沟通不足列为离婚原因’。of communication 修饰 lack，for their divorces 修饰 reason；不是‘给予沟通’或‘由于离婚而缺少沟通’。" },
    ],
  },
  "2010-p2-s14": {
    focus: "Given 在这里是‘考虑到’，不是被动谓语；主句从 that amounts 开始，末尾 epidemic 是对规模的比喻评价。",
    questions: [
      { question: "Given 后面为什么没有从句主谓？", evidence: "Given the current divorce rate of nearly 50 percent", answer: "Given 在这里作介词，接名词短语 divorce rate，整体提供推算前提。of nearly 50 percent 说明比率，nearly 修饰50%；不能认成‘离婚率被给予了’。" },
      { question: "that、every year 和破折号后各起什么作用？", evidence: "that amounts to millions of cases in the United States every year – a virtual epidemic of failed conversation", answer: "that 回指前文沟通问题与离婚的情况；amounts to 表总计达到。in the United States 限定统计范围，every year 是名词短语作时间状语。a virtual epidemic 同位评价这些大量个案，virtual 是‘几乎可称为的’，不是虚拟网络疫情。" },
    ],
  },
  "2010-p2-s15": {
    focus: "长句只有 focused 这一个限定谓语。先保住 not：抱怨最常指向的不是这些具体不公；后面两长块都只是举例。",
    questions: [
      { question: "women、husbands 和 complaints 谁才是主语？", evidence: "complaints from women about their husbands most often focused not on tangible inequities", answer: "中心是 complaints；from women 说抱怨来源，about their husbands 说抱怨对象，两组都修饰 complaints。most often 修饰 focused 的频率。not on…否定主要关注点，并不否认这些不公平存在；真正重点由下一句 Instead 给出。" },
      { question: "第一个例子里，having、to accompany 和 to his 怎样分层？", evidence: "having given up the chance for a career to accompany a husband to his", answer: "such as 后的第一例以 having given up 为中心，完成式 -ing 表先前已放弃；the chance 为宾语，for a career 修饰 chance。to accompany…是放弃机会的目的，a husband 是 accompany 的宾语，to his 指向丈夫的事业，his 独立代替 his career。" },
      { question: "or 后面又列了三个并列大例子吗？", evidence: "or doing far more than their share of daily life-support work like cleaning, cooking and social arrangements", answer: "or 先连接 having given up…与 doing…这两个大例子。第二例里 far 加强 more，than their share 给比较基准，of…work 说明份额属于什么；最里的 cleaning、cooking、social arrangements 才是 work 的三个例子，不能提升为与第一例同一层。" },
    ],
  },
  "2010-p2-s16": {
    focus: "Instead 接上前句的 not：抱怨实际集中在沟通。冒号后的引语只是举例，不是 communication 的定语从句。",
    questions: [
      { question: "they、He、me 分别指谁？", evidence: "they focused on communication: \"He doesn't listen to me.\"", answer: "they 承接前句主语 complaints，即这些抱怨；引语换成妻子的口吻，He 是丈夫，me 是妻子。focused on communication 是叙述，He doesn't listen… 是抱怨的原话，不能混成一套主谓。" },
    ],
  },
  "2010-p2-s17": {
    focus: "这个短句强调不和‘我’交谈，不能扩大成这个丈夫在任何场合都不说话。",
    questions: [
      { question: "doesn't 和 to me 分别有何作用？", evidence: "He doesn't talk to me", answer: "doesn't 承担第三人称单数和否定，后面 talk 保持原形。to me 引交谈对象，不是目的不定式；与上一句 listen to me 对照，妻子既希望丈夫倾听，也希望丈夫主动交流。" },
    ],
  },
  "2010-p2-s18": {
    focus: "I found that 之间插入前人研究；that 的发现包含由 but 连接的两面：妻子看重交谈伙伴，丈夫很少抱有同样期待。",
    questions: [
      { question: "as 是‘当哈克观察时’吗？", evidence: "as Hacker observed years before", answer: "这里是‘正如哈克多年前观察到的’，as 指作者所说的发现，并对应 observed 的宾语。years before 修饰 observed，标更早的观察时间；整块是插入评注，不是 found 的时间状语。" },
      { question: "want their husbands to be 中谁希望、谁成为？", evidence: "most wives want their husbands to be, first and foremost, conversational partners", answer: "希望者是 most wives；their husbands 是 want 的宾语，又是 to be 的逻辑主语；conversational partners 是 to be 的表语。first and foremost 插入不定式内部，强调这个角色最优先，不能把它当表语的一部分。" },
      { question: "but 和 few 会怎样改变意思？", evidence: "but few husbands share this expectation of their wives", answer: "but 在 found 的内容内部连接妻子、丈夫两个分句。few 表‘很少’，不是 a few 的‘有一些’；of their wives 说明丈夫对妻子的期待，不是说妻子拥有丈夫的想法。" },
    ],
  },
  "2010-p2-s19": {
    focus: "外层只是‘这个形象就是那个漫画场景’；先找 is，再依次放回 image 的定语，以及场景中男人和女人各自的动作。",
    questions: [
      { question: "为什么 represents、sitting 和 held 都不是主句谓语？", evidence: "the image that best represents the current crisis is the stereotypical cartoon scene", answer: "主句谓语是 is，scene 是表语中心。represents 在修饰 image 的 that 定语从句里；后面的 sitting 是修饰 man 的现在分词；held up 则在 with 结构中补充 newspaper 的状态，都各有所属。" },
      { question: "报纸和脸的位置如何判断？", evidence: "with a newspaper held up in front of his face", answer: "with 后的对象是 a newspaper，held up 为被动的过去分词补语，意思是报纸被举起；in front of his face 说明举在何处，his 指男子。整组附着在男子坐着的场景上，没有独立的时态谓语，因此不是一个新的完整从句。" },
      { question: "最后谁想说话，it 又指什么？", evidence: "while a woman glares at the back of it, wanting to talk", answer: "while 引出同一画面中女人的对照行为，主语 a woman，谓语 glares。at the back of it 是瞪视对象，it 指 newspaper，报纸正面朝着男子；wanting to talk 的逻辑主语仍是 woman，不是报纸或男子。" },
    ],
  },
};
