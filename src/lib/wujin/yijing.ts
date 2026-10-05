import type { StallId } from "@/lib/wujin/content";

export type TrigramId = "qian" | "dui" | "li" | "zhen" | "xun" | "kan" | "gen" | "kun";

export type Trigram = {
  id: TrigramId;
  name: string;
  nature: string;
  quality: string;
  lines: string;
  hex: number;
  where: string;
  prose: string;
};

/** 下卦在前。线自下而上，1 为阳，0 为阴。 */
export const trigrams: Trigram[] = [
  {
    id: "qian",
    name: "乾",
    nature: "天",
    quality: "健",
    lines: "111",
    hex: 1,
    where: "多开的那一寸城门",
    prose: "天在雾津不发布告。它只把城门的一寸留给肯自己站直的人。阿迟把手合上的那一下，就是乾。",
  },
  {
    id: "dui",
    name: "兑",
    nature: "泽",
    quality: "说",
    lines: "110",
    hex: 58,
    where: "酉时的酒旗",
    prose: "泽把话说软，不把话说没。嘴里若是甜的，带一点陈皮的旧，就可以信。",
  },
  {
    id: "li",
    name: "离",
    nature: "火",
    quality: "丽",
    lines: "101",
    hex: 30,
    where: "寅时的六盏灯",
    prose: "火要附在灯芯和袖口上才算数。离开人，它只是一句被风吹灭的空话。",
  },
  {
    id: "zhen",
    name: "震",
    nature: "雷",
    quality: "动",
    lines: "100",
    hex: 51,
    where: "子时回头的第一声",
    prose: "惊是一阳从最底下回来。你以为丢掉的名字，往往先以一声不对的回声出现。",
  },
  {
    id: "xun",
    name: "巽",
    nature: "风",
    quality: "入",
    lines: "011",
    hex: 57,
    where: "窗缝与早雾",
    prose: "风不敲门。它从窗缝进来，先把字吹正，再决定要不要把它坐暖。",
  },
  {
    id: "kan",
    name: "坎",
    nature: "水",
    quality: "陷",
    lines: "010",
    hex: 29,
    where: "没有名字的江",
    prose: "潮有三类。第一类推船，第二类推话，第三类只在桥洞里练习回声。习坎，是一再经过，不是沉没。",
  },
  {
    id: "gen",
    name: "艮",
    nature: "山",
    quality: "止",
    lines: "001",
    hex: 52,
    where: "门槛与不存在的桥中央",
    prose: "停在门槛上并不丢脸。山的本事是让脚步知道哪里该住，哪里不该再投一次。",
  },
  {
    id: "kun",
    name: "坤",
    nature: "地",
    quality: "顺",
    lines: "000",
    hex: 2,
    where: "收下名字的岸",
    prose: "地不催你认领。袖口是湿的，木头记得脚步。坤是城愿意把这些都先收下。",
  },
];

export type Tidal = {
  stallId: StallId;
  branch: string;
  name: string;
  lines: string;
  hex: number;
  motion: string;
};

/** 十二消息：阳从子时复生，到亥时重新沉入坤。 */
export const tidal: Tidal[] = [
  { stallId: "zi", branch: "子", name: "复", lines: "100000", hex: 24, motion: "一阳从潮底回来。" },
  { stallId: "chou", branch: "丑", name: "临", lines: "110000", hex: 19, motion: "阳靠近岸，来看你，不来讨债。" },
  { stallId: "yin", branch: "寅", name: "泰", lines: "111000", hex: 11, motion: "天与地在这一辰对坐。" },
  { stallId: "mao", branch: "卯", name: "大壮", lines: "111100", hex: 34, motion: "脚步开始不平，因为鞋里有字。" },
  { stallId: "chen", branch: "辰", name: "夬", lines: "111110", hex: 43, motion: "决断只要一寸，手合上就够。" },
  { stallId: "si", branch: "巳", name: "乾", lines: "111111", hex: 1, motion: "阳气满了。满，不是终。" },
  { stallId: "wu", branch: "午", name: "姤", lines: "011111", hex: 44, motion: "一阴不期而遇，先别赶它走。" },
  { stallId: "wei", branch: "未", name: "遁", lines: "001111", hex: 33, motion: "退开半步，名字还在嘴里。" },
  { stallId: "shen", branch: "申", name: "否", lines: "000111", hex: 12, motion: "城假装无事。门暂且不开。" },
  { stallId: "you", branch: "酉", name: "观", lines: "000011", hex: 20, motion: "贴着木头听别人的脚步。" },
  { stallId: "xu", branch: "戌", name: "剥", lines: "000001", hex: 23, motion: "层层卸下，底下一笔还在。" },
  { stallId: "hai", branch: "亥", name: "坤", lines: "000000", hex: 2, motion: "夜把一切先收下。" },
];

export function tidalByStall(id: string) {
  return tidal.find((item) => item.stallId === id);
}

export function hexGlyph(n: number) {
  return String.fromCodePoint(0x4dc0 + n - 1);
}

export function trigramByLines(lines: string) {
  return trigrams.find((item) => item.lines === lines);
}
