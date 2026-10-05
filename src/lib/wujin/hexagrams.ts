import { trigrams, type TrigramId } from "./yijing.ts";

export type Hexagram = {
  n: number;
  name: string;
  lower: TrigramId;
  upper: TrigramId;
  lines: string;
  text: string;
};

const bits: Record<TrigramId, string> = {
  qian: "111",
  dui: "110",
  li: "101",
  zhen: "100",
  xun: "011",
  kan: "010",
  gen: "001",
  kun: "000",
};

const raw: [string, TrigramId, TrigramId, string][] = [
  ["乾", "qian", "qian", "天不发布告。城门那一寸，只留给肯自己站直的人。"],
  ["坤", "kun", "kun", "地收下投进潮里的名字，并不催你认领。"],
  ["屯", "zhen", "kan", "名字刚浮出水面，城还没决定要不要为它开门。"],
  ["蒙", "kan", "gen", "雾还没散。先做完一间铺里的小事，再问江。"],
  ["需", "qian", "kan", "船在，你也在。先把脚步在码头上放稳。"],
  ["讼", "kan", "qian", "两个人争一个字的时候，字会自己走掉。"],
  ["师", "kan", "kun", "夜里需要一个肯守灯的人，不需要一支队伍。"],
  ["比", "kun", "kan", "猫在窗下多停一会儿，城就暂时把你写成自己人。"],
  ["小畜", "qian", "xun", "风只蓄住一点雨。够润袖口，不够发潮。"],
  ["履", "dui", "qian", "桥看起来不存在，你仍要一步一步走完。"],
  ["泰", "qian", "kun", "天与地在这一辰对坐。名字变轻，是因为有人帮你拿过。"],
  ["否", "kun", "qian", "城假装无事。门暂时只开给货，不开给人。"],
  ["同人", "li", "qian", "同一盏灯下，不相识的人可以共用一句以后。"],
  ["大有", "qian", "li", "口袋里已有十二个时辰帮你留下的东西。"],
  ["谦", "gen", "kun", "伞不是债。把字放低一点，雨才肯停。"],
  ["豫", "kun", "zhen", "鼓还没响，灯自己先亮。预支的喜悦，仍算数。"],
  ["随", "zhen", "dui", "空舟比满舟走得远。跟着它，不是失去方向。"],
  ["蛊", "xun", "gen", "旧书里长出不是你写的字。先擦掉那一页的霉。"],
  ["临", "dui", "kun", "潮靠近岸，不是来讨名字，是来让你看清它。"],
  ["观", "kun", "xun", "贴着码头的木头听。别人的脚步里有你的停顿。"],
  ["噬嗑", "zhen", "li", "梦咽不下那粒字。咬合之处，正是你要亲自带着的地方。"],
  ["贲", "li", "gen", "灯把字照出影子。影子更好看，你要的仍是字本身。"],
  ["剥", "kun", "gen", "一层一层卸下。剩下的那一笔，才是不肯沉的名字。"],
  ["复", "zhen", "kun", "一阳从子时回来。你以为丢掉的，在最底下复生。"],
  ["无妄", "zhen", "qian", "不必为投进江里的那一下再编一个理由。"],
  ["大畜", "qian", "gen", "龙骨把字捂热。蓄住，比立刻说出来更像带它上岸。"],
  ["颐", "zhen", "gen", "喂梦要有节制。碗沿的话，比碗里的东西更该留下。"],
  ["大过", "xun", "dui", "梁木弯了，城仍站着。你不必一次把夜走完。"],
  ["坎", "kan", "kan", "第三类潮只练习回声。一再经过，不是沉没。"],
  ["离", "li", "li", "火要附在灯芯和袖口上。离开人，它只是空话。"],
  ["咸", "gen", "dui", "掌心一点猫毛，是感应，不是占有。"],
  ["恒", "xun", "zhen", "绳不是锁。每天摸到那一结，日子就还在。"],
  ["遁", "gen", "qian", "退不是逃。是把名字从酒里取出，先含着。"],
  ["大壮", "qian", "zhen", "壮在脚步不平。不平说明鞋里还有一个字。"],
  ["晋", "kun", "li", "早晨的雾替你向前走了一步。要跟上去。"],
  ["明夷", "li", "kun", "光被收进土里。暗处的灯芯，仍算一盏。"],
  ["家人", "li", "xun", "窗缝里的信不必转交。自己撑的伞，才像回家。"],
  ["睽", "dui", "li", "影子先上台，人还在台下。看见，并不立刻相认。"],
  ["蹇", "gen", "kan", "桥洞里的回声会害羞。路难，是因为你停下来听了。"],
  ["解", "kan", "zhen", "结打开时，红点还在。解开不是弄丢。"],
  ["损", "dui", "gen", "少带一件白天的东西进城。损掉的是你以为必须沉的重量。"],
  ["益", "zhen", "xun", "江把一行水印还给纸舟。你没求的那一句，算增益。"],
  ["夬", "qian", "dui", "决断只要一寸。手合上，比再投一次更清楚。"],
  ["姤", "xun", "qian", "一阴不期而遇。先别把这个名字赶走。"],
  ["萃", "kun", "dui", "人聚在空地上，只议一件事：今天是否值得靠近。"],
  ["升", "xun", "kun", "从井栏往上长的不是雾，是你肯被叫住的声音。"],
  ["困", "kan", "dui", "酒变浑又变清。困住你的是想把名字吐回去的那一下。"],
  ["井", "xun", "kan", "井还在老地方。打水的人换了，绳还是那根。"],
  ["革", "li", "dui", "门轴响了一声。变革往往只有一寸宽。"],
  ["鼎", "xun", "li", "一盏茶把旧名字煮成新的温度。器在，物就还在。"],
  ["震", "zhen", "zhen", "灯一盏盏亮起，像雷在巷子里走近。惊过之后，故事才往下说。"],
  ["艮", "gen", "gen", "停在门槛上并不丢脸。山让脚步知道哪里该住。"],
  ["渐", "gen", "xun", "像雁一样一页一页翻。长夜不要跳着读。"],
  ["归妹", "dui", "zhen", "纸舟先走，人后走。先出发的，不一定先到家。"],
  ["丰", "li", "zhen", "灯多到能看清一个字，就够了。再多会晃眼。"],
  ["旅", "gen", "li", "你不是雾津人。旅人的凭证是湿袖口，不是户籍。"],
  ["巽", "xun", "xun", "风从窗缝进来，先把字吹正，再决定要不要留下。"],
  ["兑", "dui", "dui", "说出口的若是甜的，带一点陈皮的旧，就可以信。"],
  ["涣", "kan", "xun", "雾散不是消失。是聚着的那团怕，终于肯散开。"],
  ["节", "dui", "kan", "一筒夜就够。两筒会把名字一起缩短。"],
  ["中孚", "dui", "xun", "空舟里的空白比满纸更可信。诚在中间。"],
  ["小过", "gen", "zhen", "多开的那一寸门，只容一只手。小事越过了，不必声张。"],
  ["既济", "li", "kan", "十二时都走过。已经渡过，仍要把袖口晾干。"],
  ["未济", "kan", "li", "还差一次手合上。未完成，正是还能问江的理由。"],
];

export const hexagrams: Hexagram[] = raw.map(([name, lower, upper, text], index) => ({
  n: index + 1,
  name,
  lower,
  upper,
  lines: bits[lower] + bits[upper],
  text,
}));

const byLines = new Map(hexagrams.map((item) => [item.lines, item]));

export function hexagramByLines(lines: string) {
  return byLines.get(lines);
}

export function hexagramByNumber(n: number) {
  return hexagrams[n - 1];
}

export function trigramName(id: TrigramId) {
  return trigrams.find((item) => item.id === id)?.name ?? "";
}

export type CastLine = {
  coins: number[];
  value: 6 | 7 | 8 | 9;
};

export function throwLine(): CastLine {
  const coins = [0, 1, 2].map(() => (Math.random() < 0.5 ? 2 : 3));
  const sum = coins.reduce((total, coin) => total + coin, 0);
  return { coins, value: sum as CastLine["value"] };
}

export function resolveCast(values: number[]) {
  const primaryBits = values.map((value) => (value === 7 || value === 9 ? "1" : "0")).join("");
  const changedBits = values
    .map((value) => {
      if (value === 6) return "1";
      if (value === 9) return "0";
      return value === 7 ? "1" : "0";
    })
    .join("");
  const moving = values
    .map((value, index) => (value === 6 || value === 9 ? index : -1))
    .filter((index) => index >= 0);
  return {
    primary: hexagramByLines(primaryBits),
    changed: moving.length > 0 ? hexagramByLines(changedBits) : undefined,
    moving,
    primaryBits,
    changedBits,
  };
}
