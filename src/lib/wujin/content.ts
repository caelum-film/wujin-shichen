import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Coffee,
  Flame,
  Mail,
  Moon,
  Sailboat,
  ScrollText,
  Shield,
  Spline,
  SunMedium,
  Waves,
  Wine,
} from "lucide-react";

export type StallId =
  | "zi"
  | "chou"
  | "yin"
  | "mao"
  | "chen"
  | "si"
  | "wu"
  | "wei"
  | "shen"
  | "you"
  | "xu"
  | "hai";

export type Stall = {
  id: StallId;
  branch: string;
  name: string;
  hours: string;
  blurb: string;
  ritual: string;
  icon: LucideIcon;
};

export const stalls: Stall[] = [
  {
    id: "zi",
    branch: "子",
    name: "听潮铺",
    hours: "23:00 – 01:00",
    blurb: "把石子投进没有名字的江。潮会还你三行，不多。",
    ritual: "投三枚石子。每一枚换回一行，行与行之间是水声。",
    icon: Waves,
  },
  {
    id: "chou",
    branch: "丑",
    name: "饲梦铺",
    hours: "01:00 – 03:00",
    blurb: "梦会饿。你挑三样白天没处放的东西喂它。",
    ritual: "选三样饲料。梦吃完，会把碗沿上的话留给你。",
    icon: Moon,
  },
  {
    id: "yin",
    branch: "寅",
    name: "点灯铺",
    hours: "03:00 – 05:00",
    blurb: "巷尾有一户不睡觉的人。灯一盏盏亮，故事才肯往下说。",
    ritual: "点亮六盏灯。灯齐了，那户人家才承认你来过。",
    icon: Flame,
  },
  {
    id: "mao",
    branch: "卯",
    name: "醒茶铺",
    hours: "05:00 – 07:00",
    blurb: "叶、水、器，各选一种。茶汤会写成一封很短的晨信。",
    ritual: "配一盏。信不长，只够把今天的第一步说清楚。",
    icon: Coffee,
  },
  {
    id: "chen",
    branch: "辰",
    name: "龙骨铺",
    hours: "07:00 – 09:00",
    blurb: "八片骨头，没有吉凶。你排的顺序，就是它要说的话。",
    ritual: "点选四字，先后即句读。龙骨不判，只认顺序。",
    icon: ScrollText,
  },
  {
    id: "si",
    branch: "巳",
    name: "结绳铺",
    hours: "09:00 – 11:00",
    blurb: "四股线结成今日签。签不预言财运，只告诉你怎么过这一辰。",
    ritual: "依序选四色。绳结好了，签自己会落款。",
    icon: Spline,
  },
  {
    id: "wu",
    branch: "午",
    name: "影子戏",
    hours: "11:00 – 13:00",
    blurb: "戏台在烈日底下。你点主角、天气和一件不可告人的小东西。",
    ritual: "开演四幕。影子比人先知道秘密。",
    icon: SunMedium,
  },
  {
    id: "wei",
    branch: "未",
    name: "旧书铺",
    hours: "13:00 – 15:00",
    blurb: "六册没有版权页的薄书。都是雾津的人写给雾津的。",
    ritual: "翻开任意一册。看中的那一页，可以夹进夜记。",
    icon: BookOpen,
  },
  {
    id: "shen",
    branch: "申",
    name: "屋顶信",
    hours: "15:00 – 17:00",
    blurb: "六扇窗，六种回信的脾气。你把一句短话塞进窗缝。",
    ritual: "选一户人家，写不超过二十八字。他们会回。",
    icon: Mail,
  },
  {
    id: "you",
    branch: "酉",
    name: "酒旗铺",
    hours: "17:00 – 19:00",
    blurb: "掌柜不劝醉。酒旗底下，故事随你点的酒和小菜变味。",
    ritual: "选一种酒、一样小菜。掌柜只讲跟这杯有关的事。",
    icon: Wine,
  },
  {
    id: "xu",
    branch: "戌",
    name: "守夜铺",
    hours: "19:00 – 21:00",
    blurb: "鼓响之前，去看那些自己在闪的窗。睡着的窗不必惊动。",
    ritual: "点亮找你的窗。看漏了也无妨，城会自己把夜守完。",
    icon: Shield,
  },
  {
    id: "hai",
    branch: "亥",
    name: "归舟铺",
    hours: "21:00 – 23:00",
    blurb: "把一句愿望折进纸里，放进江心。下游偶尔会回一声。",
    ritual: "写下愿望，折成舟，送走。舟不回来，回声会。",
    icon: Sailboat,
  },
];

export function stallById(id: string): Stall | undefined {
  return stalls.find((s) => s.id === id);
}

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const poems: string[][] = [
  ["潮来的时候，城门并不开。", "灯在水里比在街上更亮。", "我把名字交给下一班船。"],
  ["有人在桥下数错过的时辰。", "数到第七下，雨自己停了。", "雾津因此多了一条干的街。"],
  ["江心有一座不靠岸的摊。", "卖的是昨天没说完的话。", "买的人通常已经不在了。"],
  ["夜色把船舷磨得很薄。", "薄到能听见对岸的碗响。", "那是别人家里的平安。"],
  ["我问潮：你从哪里来。", "潮说：从所有没回的信里。", "于是我们都沉默了一会儿。"],
  ["石子入水，像一句迟到的道歉。", "涟漪比话走得更远。", "远到城外，就变成了天气。"],
  ["子时的水不照人。", "它只照那些还醒着的念头。", "念头见了自己，便轻轻沉下去。"],
  ["把耳朵贴在码头的木头上。", "木头里有许多旧的脚步。", "它们还在往某个摊位去。"],
];

export const feeds = [
  { id: "key", label: "旧钥匙", line: "你摸到一把钥匙，齿纹像谁的乳名，却打不开任何一扇你记得的门。" },
  { id: "porridge", label: "半碗冷粥", line: "锅边还留着半碗冷粥，米粒一粒一粒记着早晨，记到后来连盐都淡了。" },
  { id: "letter", label: "未寄的信", line: "信没有地址，只有一个被水泡开的「你」，你不确定那是称呼还是叹息。" },
  { id: "cat", label: "猫的名字", line: "有只猫答应了你，只要你不再叫它原来的名字，它就肯在梦里带路。" },
  { id: "rain", label: "雨声", line: "雨声负责把所有锋利的句子磨圆，磨完也不告诉你那些句子原本想伤谁。" },
  { id: "ticket", label: "一张船票", line: "船票的日期是明天，船的名字却是昨天。检票的人说，两个日子都能上。" },
  { id: "needle", label: "母亲的针线", line: "一根针带着线，在梦里缝你白天裂开的那句话，针脚很密，像舍不得。" },
  { id: "sugar", label: "一粒糖", line: "糖溶得很快，甜却留在一件你已经不穿的衣服里，口袋还记得你的手。" },
];

const morals = [
  "有些东西喂给梦，是为了白天不用再拿着。",
  "梦吃得很干净，连愧疚都舔了一下，但没咽下去。",
  "你醒来时会忘记顺序，只记得碗是温的。",
  "这碗梦偏咸。咸的梦适合拿来走路，不适合拿来写信。",
  "梦说它吃饱了，请你明天不要再喂同一件事。",
  "剩下的一点甜，留在牙齿上，像一个还没决定要不要说的名字。",
];

export function dreamBowl(ids: string[]) {
  const picked = ids
    .map((id) => feeds.find((f) => f.id === id))
    .filter((f): f is (typeof feeds)[number] => Boolean(f));
  const names = picked.map((p) => p.label).join("、");
  const moral = morals[hashString(ids.join("|")) % morals.length] ?? morals[0];
  return {
    opening: `丑时，你把${names}搁到梦的碗沿。`,
    lines: picked.map((p) => p.line),
    closing: `梦吃完，留下一句：${moral}`,
  };
}

export const lanternLines = [
  "寅时的巷子只有一家窗还亮，亮得像故意的。",
  "屋里的人并不做事，只把白天别人丢掉的「以后」捡回来摊平。",
  "他有一个规矩：灯不借给赶路的，只借给还不想睡的。",
  "你敲了门。门里问：你是来还一句，还是来借一句。",
  "你说不出来。灯便自己往你袖口里靠了靠，像认人。",
  "天亮以前，那扇窗会灭。灭了之后，雾津会假装没有这条巷。",
];

export const leaves = [
  { id: "baihao", label: "白毫", note: "清，慢" },
  { id: "chenpi", label: "陈皮", note: "旧，甜" },
  { id: "guihua", label: "桂花", note: "软，近" },
];

export const waters = [
  { id: "well", label: "井水", note: "静" },
  { id: "snow", label: "雪水", note: "薄" },
  { id: "river", label: "江水", note: "远" },
];

export const vessels = [
  { id: "clay", label: "粗陶" },
  { id: "porcelain", label: "青瓷" },
  { id: "copper", label: "铜壶" },
];

const teaLetters: Record<string, string> = {
  "baihao:well":
    "卯时好。井水把白毫醒得很慢，像一个人终于愿意把昨天的话再说一遍。你若有未回的消息，宜在这盏见底之前回。",
  "baihao:snow":
    "雪水煮白毫，香气很淡，淡到能听见自己的呼吸。今天适合把计划写短一点，短到一张纸的边就能放下。",
  "baihao:river":
    "江水带一点远方的铁味。白毫压不住它，于是这盏茶像一封从下游寄回来的短信：人到了，风也到了。",
  "chenpi:well":
    "陈皮在井水里显出旧日子的甜。不是新的甜，是放得够久的那种。宜见一位很久没见的人，但不必带礼物。",
  "chenpi:snow": "雪水把陈皮的烈收住了。你今天说话可以慢。慢本身就是味道，不必再加别的。",
  "chenpi:river":
    "江水配陈皮，像码头上两种口音相遇。这盏茶建议你：把一件拖着的事，交给一个具体的时辰，而不是交给「以后」。",
  "guihua:well": "桂花沉下去又浮上来。井水不动声色。有些喜欢不必说破，只要这盏还热着。",
  "guihua:snow": "雪水里的桂花像一句被冬天保存的好话。今天宜把它送给别人，而不是留给自己闻。",
  "guihua:river": "江水太活，桂花只好跟着走。这是一盏不适合久坐的茶。喝完就可以出门，门会认你的袖口。",
};

const teaClosers: Record<string, string> = {
  clay: "粗陶记得所有温度。放下杯子时，你的掌心也是热的。",
  porcelain: "青瓷把光收得很干净。你看着它，会把自己也看清楚一点。",
  copper: "铜壶还在轻轻响。那是水离开之前的最后一句，不必答。",
};

export function brewLetter(leaf: string, water: string, vessel: string) {
  const body = teaLetters[`${leaf}:${water}`];
  const closer = teaClosers[vessel];
  if (!body || !closer) return null;
  return { body, closer };
}

export const boneChars = ["风", "门", "归", "舟", "灯", "雨", "人", "岸"] as const;

export const boneGloss: Record<(typeof boneChars)[number], string> = {
  风: "来得及的消息",
  门: "你还没推的那一下",
  归: "一个还站得住的理由",
  舟: "暂时借给你的身体",
  灯: "还肯为你亮着的东西",
  雨: "替你说完的那半句",
  人: "尚未抵达的你",
  岸: "可以停下而不算输的地方",
};

export function readBones(chars: string[]) {
  const [a, b, c, d] = chars;
  if (!a || !b || !c || !d) return null;
  const g = (ch: string) => boneGloss[ch as (typeof boneChars)[number]];
  return `${a}在前，是${g(a)}。${b}随后，是${g(b)}。行至${c}，遇见${g(c)}。落在${d}，便是${g(d)}。龙骨不判吉凶，只把顺序交给你。`;
}

export const threadColors = [
  { id: "zhu", label: "朱砂", swatch: "bg-cinnabar" },
  { id: "dian", label: "靛蓝", swatch: "bg-river border border-paper/40" },
  { id: "zhe", label: "赭石", swatch: "bg-lantern" },
  { id: "yue", label: "月白", swatch: "bg-paper" },
  { id: "song", label: "松烟", swatch: "bg-ink border border-paper/30" },
  { id: "xing", label: "杏黄", swatch: "bg-lantern" },
] as const;

const signs = [
  { name: "慢火签", line: "今天宜把一件事做完，而不是把三件事做热。" },
  { name: "回潮签", line: "有句旧话会回来。你不必接住全部，接住称呼就好。" },
  { name: "留白签", line: "把日程空出一寸。空的那一寸会自己长出答案。" },
  { name: "窄门签", line: "路变窄不是拒绝，是请你只带一件真正要带的东西。" },
  { name: "暖石签", line: "去摸一件实在的东西：杯子、栏杆、别人的肩。温度会把你领回来。" },
  { name: "夜航签", line: "你可以暂时不靠岸。把方向交给下一座灯，而不是交给焦虑。" },
  { name: "薄霜签", line: "有些话表面凉，里面是软的。等一等再回复。" },
  { name: "未名签", line: "不必给今天的心情起名字。没有名字的东西，比较不容易被吓跑。" },
];

export function tieSign(ids: string[]) {
  const sign = signs[hashString(ids.join("-")) % signs.length] ?? signs[0];
  const braid = ids
    .map((id) => threadColors.find((t) => t.id === id)?.label)
    .filter(Boolean)
    .join(" · ");
  return { ...sign, braid };
}

export const roles = [
  { id: "scholar", label: "书生" },
  { id: "cook", label: "厨娘" },
  { id: "child", label: "小孩" },
  { id: "boat", label: "船娘" },
];

export const weathers = [
  { id: "fog", label: "雾", phrase: "一场不肯散的雾" },
  { id: "rain", label: "骤雨", phrase: "一场说来就来的骤雨" },
  { id: "sun", label: "烈日", phrase: "一把直直压下来的烈日" },
  { id: "snow", label: "细雪", phrase: "一场还没决定落不落地的细雪" },
];

export const secrets = [
  { id: "letter", label: "勿开的信", phrase: "一封写着「勿开」的信" },
  { id: "tooth", label: "一颗假牙", phrase: "一颗不属于这出戏的假牙" },
  { id: "shadow", label: "会改词的影子", phrase: "一段会自己改词的影子" },
  { id: "noodle", label: "未付的面", phrase: "一碗还没付账的面" },
];

export function shadowPlay(role: string, weather: string, secret: string): string[] | null {
  const w = weathers.find((item) => item.id === weather)?.phrase;
  const s = secrets.find((item) => item.id === secret)?.phrase;
  if (!w || !s) return null;
  const plays: Record<string, string[]> = {
    scholar: [
      `午时的雾津，影子比人先到戏台。书生站在${w}里，袖口湿了一点，像刚从一句没写完的诗里出来。`,
      `他口袋里藏着${s}。影子比他先承认这件事，在地上比出一个不该有的形状。`,
      `台下有人咳嗽。书生鞠躬，把秘密暂时让给影子保管。${w}负责把观众的脸模糊掉。`,
      "戏散时，书生把影子卷进书里。他说：明天若还来，请从第二页看。",
    ],
    cook: [
      `灶口的光把厨娘的影子拉得很长，长过整条卖吃食的街。今天的天是${w}。`,
      `她手上有面粉，心里有${s}。影子在墙上偷偷把秘密做成一道菜的形状。`,
      "有人来问：还有没有热的。她说有。影子却摇头，表示那份热是留给秘密的。",
      "收摊时她把影子从墙上揭下来，叠好，压在案板下。说明天继续营业。",
    ],
    child: [
      `小孩跑上戏台，${w}追在后面，像一个不愿意回家的玩伴。`,
      `他的影子比他勇敢，先去碰了${s}。碰完又退回来，装作只是在玩。`,
      "锣声一响，小孩忘记了自己是观众还是演员。影子提醒他：你只要负责笑。",
      "散场后影子牵着他走。路过灯时，两个影子叠成一个，秘密就没那么重了。",
    ],
    boat: [
      `船娘不登台。她把船停在戏台边上，让${w}当布景。`,
      `桨放下的时候，${s}在船舱里轻轻一响，像有人翻了个身。`,
      "观众以为看见的是水，其实是她的影子在替整座城划船。",
      "戏完了，她不谢幕。船先走，影子留半拍，把秘密放回水里。",
    ],
  };
  return plays[role] ?? null;
}

export const books = [
  {
    id: "menu",
    title: "雾津食单残页",
    shelf: "食",
    pages: [
      "雾津没有菜谱，只有残页。残页上写：清早的鱼不要配午时的醋。不是味道不合，是两种时辰见面会吵架。",
      "又一页只剩半句：「把葱放在人到齐之前。」后面被汤渍没了。有人说这是待客的方法，也有人说这是孤独的方法。",
      "最后一页没有菜名，只有一行小字：若你独自吃完，请把碗口朝向江水。江水会当成有人还要回来。",
    ],
  },
  {
    id: "bridge",
    title: "不存在的桥",
    shelf: "路",
    pages: [
      "雾津的桥有一座不在地图上。它只在你赶路又突然不想赶的时候出现，栏杆是温的，像刚被谁握过。",
      "桥中央常年坐着同一个人，在补一张网。问他网做什么，他说：接住那些从句子里掉下去的名字。",
      "你若从桥上走完，会发现自己仍在原处。但口袋里多了一点点重量。那是桥费。桥不收钱，收你愿意记住的一个下午。",
    ],
  },
  {
    id: "night",
    title: "卖夜的人",
    shelf: "市",
    pages: [
      "有人在亥时沿街叫卖：「夜——新鲜的夜——」买的人通常已经有夜了。他们买的是另一种：短一点的、不做梦的。",
      "卖夜的人用竹筒量。一筒够你把一件心事放到明天。两筒就会忘记自己为什么要买。所以他很少卖两筒。",
      "天亮他收摊，竹筒是空的。有人问夜卖到哪里去了。他说：都回到你们眼睛里了。我只是帮你们暂时存放。",
    ],
  },
  {
    id: "tide",
    title: "潮声分类",
    shelf: "水",
    pages: [
      "雾津的潮被分成三类。第一类负责把船推走。第二类负责把话推回来。第三类不做事，只在桥洞里练习回声。",
      "第三类潮声最容易被误认为是有人叫你。你若答应，它会害羞，退得很远，远到像没发生过。",
      "分类的人住在码头尽头，耳朵一边大一边小。他说这不是病，是职业。大的那只，专门听还没发生的告别。",
    ],
  },
  {
    id: "door",
    title: "给未来的自己留门",
    shelf: "门",
    pages: [
      "雾津的门有的没有锁。门上贴着字条：「若你是以后的我，请进。茶在左边，抱歉在右边。」",
      "很少有人真的遇见以后的自己。更多时候，你推开的是别人留给别人的门。茶仍是热的。这就够像一次重逢。",
      "离开时请也留一扇。不必写名字。写你此刻还相信的一件小事，比如：灯会等你，面可以再热。",
    ],
  },
  {
    id: "cat",
    title: "猫的市政",
    shelf: "城",
    pages: [
      "雾津的夜里，猫有自己的市政。它们开会的地点在鱼摊收走之后的空地上，议题通常只有一个：今天的人是否值得继续靠近。",
      "决议不用文字。一只猫打了个呵欠，就算通过。通过的意思是：可以在某扇窗下多停一会儿。",
      "若你曾被一只猫长时间看着，那不是偶遇。那是市政厅把你的档案翻开了一页，并暂时批准你属于这座城。",
    ],
  },
];

const roofExtras: { test: (note: string) => boolean; line: string }[] = [
  {
    test: (note) => note.includes("回家"),
    line: "另外窗里补了一句：回家的路如果太黑，就把一句真话反过来拿，让字面当你的灯。",
  },
  {
    test: (note) => note.includes("雨"),
    line: "窗里的人笑了一下：你连雨都写进来了，那今晚楼梯口会留一点干的地方。",
  },
  {
    test: (note) => note.includes("想"),
    line: "「想」字被抚平，像一条折痕：想可以有，但别让它淋一整夜。",
  },
  {
    test: (note) => note.includes("钱"),
    line: "对方摆摆手：钱的事这扇窗不管。人先坐干，事情就没有那么湿。",
  },
  {
    test: (note) => note.includes("爱") || note.includes("喜欢"),
    line: "窗里安静了一拍：这种东西不能撑太开，撑太开风会扯。收一点，才走得远。",
  },
  {
    test: (note) => note.includes("对不起") || note.includes("抱歉"),
    line: "窗开大了一点：这句话要趁早送出去，像湿伞要趁早撑开，不然会发霉。",
  },
];

function extraFor(note: string) {
  return roofExtras.find((item) => item.test(note))?.line ?? "";
}

export const households = [
  {
    id: "umbrella",
    name: "修伞的阿婆",
    hint: "窗下晾着一排还没干的伞骨。",
    reply: (note: string) =>
      `阿婆隔着窗缝看见：「${note}」。她说，伞能修的是雨，不是路程。你要去的地方，带一把就够，不必把整条街的雨都挡住。${extraFor(note)}`,
  },
  {
    id: "fish",
    name: "养金鱼的先生",
    hint: "鱼缸的灯永远比房间先亮。",
    reply: (note: string) =>
      `先生让金鱼先看你的字：「${note}」。鱼游了一圈，他才说：水里的东西不回答，可它们会绕着一句话转很久。你也可以。${extraFor(note)}`,
  },
  {
    id: "girl",
    name: "写信的女孩",
    hint: "窗台上压着好几张没写完的称呼。",
    reply: (note: string) =>
      `女孩把你的句子抄到信纸边角：「${note}」。她问，只问一句：这是要寄出的，还是只要有人看见？看见这件事，她可以先替你做。${extraFor(note)}`,
  },
  {
    id: "cook",
    name: "申时才醒的厨子",
    hint: "灶是冷的，人却已经在切明天的葱。",
    reply: (note: string) =>
      `厨子看了一眼：「${note}」。他说别写那么轻，轻的话不顶饿。你要是真有一件事过不去，就把它切成能下锅的大小。${extraFor(note)}`,
  },
  {
    id: "keys",
    name: "收藏钥匙的人",
    hint: "门后叮当作响，没有一把是他自己的门。",
    reply: (note: string) =>
      `他不看内容，先听钥匙碰钥匙的声音，才读：「${note}」。他说每句话都该有一把对应的门。你这句，暂时挂在第三排，不催你来取。${extraFor(note)}`,
  },
  {
    id: "cat",
    name: "屋顶上的猫",
    hint: "主人不在。猫代为拆信，爪印算章。",
    reply: (note: string) =>
      `猫把「${note}」坐扁了一点，才代表主人回复：收到。人不在，鱼在，窗开着。你若没有别的事，可以在屋檐下站到下一炷香。${extraFor(note)}`,
  },
];

export const spirits = [
  { id: "qing", label: "清酒", note: "薄" },
  { id: "huang", label: "黄酒", note: "厚" },
  { id: "shao", label: "烧酒", note: "烈" },
];

export const sides = [
  { id: "huamei", label: "话梅" },
  { id: "ginger", label: "姜丝" },
  { id: "chenpi", label: "陈皮" },
  { id: "peanut", label: "花生" },
];

const wineStories: Record<string, string> = {
  "qing:huamei":
    "掌柜把话梅按进清酒里，说：酸的那一点，是为了让你记得自己还醒着。雾津的酉时不劝人醉，只劝人把今天的棱角含一含。",
  "qing:ginger":
    "姜丝在清酒里站得很直。掌柜说，有些话要热着说，冷了就会变成误会。你今晚若要见人，宜先喝这一口。",
  "qing:chenpi":
    "陈皮沉底，清酒仍是清的。掌柜笑：好看的关系都这样，底下有旧的，面上仍干净。你不必把旧的捞上来给所有人看。",
  "qing:peanut":
    "花生要咬开。掌柜说，清酒配它，是提醒你：有的甜在壳里面，不敲是没有的。敲的时候轻一点，壳也是今天的一部分。",
  "huang:huamei":
    "黄酒本来就厚。话梅进去，像一个老故事忽然承认自己也酸过。掌柜给你续了一点点，不多，说厚的东西不能满。",
  "huang:ginger":
    "姜丝切开黄酒的甜。掌柜低声说：你最近太想把所有人都安顿好。今晚只安顿自己的胃，其他人的碗，明天还在。",
  "huang:chenpi":
    "两样都是陈的。掌柜不讲新故事，只问你：还记得自己第一次来雾津是为了什么吗。你不用说。酒会替你记一会儿。",
  "huang:peanut":
    "花生米在黄酒边一颗一颗，像在数日子。掌柜说数到你愿意停的那颗就可以。停，也是一种算法。",
  "shao:huamei":
    "烧酒见话梅，像烈性子遇见旧信。掌柜把杯子推远半寸：这个时辰，真话可以喝，但不要一口气喝完。",
  "shao:ginger":
    "两样都辣。掌柜哈哈一笑，又立刻收住：辣不是勇敢，辣只是提醒。你若有一句没说出口的，它现在就在舌尖上。",
  "shao:chenpi":
    "陈皮压住了烧酒的冲。掌柜说这叫有年纪的烈。你今天做成的事，不必再向谁证明。杯子见底即可。",
  "shao:peanut":
    "掌柜数花生，不数杯子。他说烧酒一喝就没了，花生还在。留一点能嚼的东西过夜，人就比较不容易散。",
};

export function pourWine(spirit: string, side: string) {
  return wineStories[`${spirit}:${side}`] ?? null;
}

export const windows = [
  { id: "bones", house: "修伞铺楼上", line: "有人在数伞骨，数到双数就停，像在跟雨商量。" },
  { id: "fish", house: "金鱼先生", line: "鱼缸的灯稳了一下，又自己暗下去，像眨眼。" },
  { id: "letter", house: "写信的窗", line: "笔尖停了很久。停，不是没有话，是话正在挑一个不太伤人的字。" },
  { id: "stove", house: "面摊后厨", line: "灶火忽然旺了一下。有人在给明天的汤热身。" },
  { id: "cat", house: "猫的窗", line: "只有呼吸。呼吸很均匀，像这座城暂时被批准平安。" },
  { id: "dock", house: "码头小屋", line: "船灯点上，又吹灭。点与灭之间，有人改了主意，改得很轻。" },
];

const echoes = [
  "下游有人把纸舟捞起来，读完，又放回去。他没有签名。",
  "江水把你的句子冲淡了一点，淡到刚好能被陌生人收下。",
  "舟过了雾津最后一座桥，桥上的灯为它亮了半拍。",
  "这只舟不会回来。它负责把你今晚的重量分给整条江。",
  "有个守夜的人看见了。他没有拦，只在册子上写：又一位还肯许愿的人。",
];

export function boatEcho(wish: string) {
  if (wish.includes("回家")) return "下游的水说：家不是码头，是你肯停桨的那一下。舟已替你把这句话送过桥。";
  if (wish.includes("想")) return "有人在下一座桥下捡到你的「想」，把它晒干了。晒干的想比较轻，还能再带在身上。";
  if (wish.includes("爱") || wish.includes("喜欢")) return "这个字进了水，会变重。船仍往前。重，不是它沉的理由。";
  if (wish.includes("对不起") || wish.includes("抱歉")) return "这句话比船先到。对方也许还没醒。等他醒，江会把句子烘干。";
  if (wish.includes("钱")) return "江不收这个。它把舟推回半尺，像在说：换一句你真正想放下的。";
  return echoes[hashString(wish) % echoes.length] ?? echoes[0];
}
