import { useEffect, useState, type ReactElement } from "react";
import {
  boatEcho,
  boneChars,
  books,
  brewLetter,
  dreamBowl,
  feeds,
  households,
  lanternLines,
  leaves,
  poems,
  pourWine,
  readBones,
  roles,
  secrets,
  shadowPlay,
  sides,
  spirits,
  threadColors,
  tieSign,
  vessels,
  waters,
  weathers,
  windows,
  type StallId,
} from "@/lib/wujin/content";
import { useJournal } from "@/lib/wujin/store";
import { ChoiceGroup, cn, InkButton, Paper, PrimaryButton, GhostButton } from "@/components/wujin/chrome";

function useSaver(stallId: StallId, branch: string) {
  const addSlip = useJournal((s) => s.addSlip);
  const [saved, setSaved] = useState(false);
  return {
    saved,
    reset: () => setSaved(false),
    save: (title: string, body: string) => {
      if (saved || !body.trim()) return;
      addSlip({ stallId, branch, title, body });
      setSaved(true);
    },
  };
}

function Tide() {
  const { saved, save, reset } = useSaver("zi", "子");
  const [seed, setSeed] = useState<number | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * poems.length));
  }, []);

  const poem = seed === null ? [] : (poems[seed] ?? []);
  const shown = poem.slice(0, n);

  return (
    <div>
      <div className="rounded-2xl bg-river p-5">
        <p className="text-sm text-lantern">江面</p>
        <div className="mt-4 min-h-28 space-y-3 font-serif text-lg leading-relaxed">
          {shown.length === 0 ? (
            <p className="text-paper/70">水还是平的。石子在你掌心里。</p>
          ) : (
            shown.map((line) => <p key={line}>{line}</p>)
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton
          disabled={seed === null || n >= 3}
          onClick={() => setN((v) => Math.min(3, v + 1))}
        >
          {n >= 3 ? "三枚都投尽了" : `投石子 · ${n}/3`}
        </PrimaryButton>
        {n >= 3 ? (
          <GhostButton
            onClick={() => {
              setSeed(Math.floor(Math.random() * poems.length));
              setN(0);
              reset();
            }}
          >
            再听一次
          </GhostButton>
        ) : null}
      </div>
      {n >= 3 ? (
        <Paper
          title="听潮 · 三行"
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() => save("听潮 · 三行", shown.join("\n"))}
            />
          }
        >
          {shown.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}

function Dream() {
  const { saved, save, reset } = useSaver("chou", "丑");
  const [picked, setPicked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  function toggle(id: string) {
    setReady(false);
    reset();
    setPicked((curr) => {
      if (curr.includes(id)) return curr.filter((item) => item !== id);
      if (curr.length >= 3) return curr;
      return [...curr, id];
    });
  }

  const bowl = ready ? dreamBowl(picked) : null;

  return (
    <div>
      <p className="text-sm text-lantern">已选 {picked.length} / 3</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {feeds.map((feed) => {
          const on = picked.includes(feed.id);
          return (
            <button
              key={feed.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(feed.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on ? "border-cinnabar bg-cinnabar text-paper" : "border-paper/25 text-paper",
              )}
            >
              {feed.label}
            </button>
          );
        })}
      </div>
      <div className="mt-5">
        <PrimaryButton disabled={picked.length !== 3} onClick={() => setReady(true)}>
          喂给梦
        </PrimaryButton>
      </div>
      {bowl ? (
        <Paper
          title="饲梦 · 一碗"
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() =>
                save("饲梦 · 一碗", [bowl.opening, ...bowl.lines, bowl.closing].join("\n"))
              }
            />
          }
        >
          <p>{bowl.opening}</p>
          {bowl.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>{bowl.closing}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function Lanterns() {
  const { saved, save } = useSaver("yin", "寅");
  const [lit, setLit] = useState<boolean[]>(() => lanternLines.map(() => false));
  const all = lit.every(Boolean);

  return (
    <div className="space-y-3">
      {lanternLines.map((line, index) => {
        const on = lit[index];
        return (
          <button
            key={line}
            type="button"
            aria-pressed={on}
            onClick={() =>
              setLit((curr) => curr.map((value, i) => (i === index ? true : value)))
            }
            className={cn(
              "w-full rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
              on ? "border-lantern bg-river" : "border-paper/15 bg-ink",
            )}
          >
            <span className="text-sm text-lantern">第 {index + 1} 盏{on ? " · 已亮" : " · 未点"}</span>
            <span className="mt-2 block font-serif text-lg leading-relaxed">
              {on ? line : "灯还黑着。点一下。"}
            </span>
          </button>
        );
      })}
      {all ? (
        <Paper
          title="点灯 · 巷尾"
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() => save("点灯 · 巷尾", lanternLines.join("\n"))}
            />
          }
        >
          {lanternLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}

function Tea() {
  const { saved, save, reset } = useSaver("mao", "卯");
  const [leaf, setLeaf] = useState<string | null>(null);
  const [water, setWater] = useState<string | null>(null);
  const [vessel, setVessel] = useState<string | null>(null);
  const [letter, setLetter] = useState<{ body: string; closer: string } | null>(null);

  function pick(setter: (id: string) => void, id: string) {
    setter(id);
    setLetter(null);
    reset();
  }

  return (
    <div className="space-y-6">
      <ChoiceGroup label="叶" options={leaves} value={leaf} onChange={(id) => pick(setLeaf, id)} />
      <ChoiceGroup label="水" options={waters} value={water} onChange={(id) => pick(setWater, id)} />
      <ChoiceGroup
        label="器"
        options={vessels}
        value={vessel}
        onChange={(id) => pick(setVessel, id)}
      />
      <PrimaryButton
        disabled={!leaf || !water || !vessel}
        onClick={() => {
          if (!leaf || !water || !vessel) return;
          setLetter(brewLetter(leaf, water, vessel));
        }}
      >
        沏一盏
      </PrimaryButton>
      {letter ? (
        <Paper
          title="醒茶 · 晨信"
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() => save("醒茶 · 晨信", `${letter.body}\n${letter.closer}`)}
            />
          }
        >
          <p>{letter.body}</p>
          <p>{letter.closer}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function Bones() {
  const { saved, save, reset } = useSaver("chen", "辰");
  const [order, setOrder] = useState<string[]>([]);
  const reading = order.length === 4 ? readBones(order) : null;

  function tap(ch: string) {
    reset();
    setOrder((curr) => {
      if (curr.includes(ch)) return curr.filter((item) => item !== ch);
      if (curr.length >= 4) return curr;
      return [...curr, ch];
    });
  }

  return (
    <div>
      <p className="text-sm text-lantern">先点到的在前 · {order.length}/4</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {boneChars.map((ch) => {
          const index = order.indexOf(ch);
          const on = index >= 0;
          return (
            <button
              key={ch}
              type="button"
              aria-pressed={on}
              onClick={() => tap(ch)}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center rounded-2xl border font-serif text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on ? "border-cinnabar bg-cinnabar text-paper" : "border-paper/25 bg-river text-paper",
              )}
            >
              {ch}
              <span className="text-xs">{on ? `第 ${index + 1}` : " "}</span>
            </button>
          );
        })}
      </div>
      {reading ? (
        <Paper
          title="龙骨 · 顺序"
          action={<SaveOnPaper saved={saved} onSave={() => save("龙骨 · 顺序", reading)} />}
        >
          <p className="font-serif text-lg">{order.join(" · ")}</p>
          <p>{reading}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function Threads() {
  const { saved, save, reset } = useSaver("si", "巳");
  const [order, setOrder] = useState<string[]>([]);

  function tap(id: string) {
    reset();
    setOrder((curr) => {
      if (curr.includes(id)) return curr.filter((item) => item !== id);
      if (curr.length >= 4) return curr;
      return [...curr, id];
    });
  }

  const sign = order.length === 4 ? tieSign(order) : null;

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-paper/15">
        {Array.from({ length: 4 }, (_, index) => {
          const id = order[index];
          const color = threadColors.find((item) => item.id === id);
          return <div key={index} className={cn("h-8", color ? color.swatch : "bg-river")} />;
        })}
      </div>
      <p className="mt-3 text-sm text-lantern">依序点四股 · {order.length}/4。再点已选的可以拆掉。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {threadColors.map((color) => {
          const index = order.indexOf(color.id);
          const on = index >= 0;
          return (
            <button
              key={color.id}
              type="button"
              aria-pressed={on}
              onClick={() => tap(color.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on ? "border-cinnabar bg-cinnabar text-paper" : "border-paper/25 text-paper",
              )}
            >
              <span className={cn("size-3 rounded-full", color.swatch)} />
              {color.label}
              {on ? ` · ${index + 1}` : ""}
            </button>
          );
        })}
      </div>
      {sign ? (
        <Paper
          title={sign.name}
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() => save(sign.name, `${sign.braid}\n${sign.line}`)}
            />
          }
        >
          <p className="font-serif">{sign.braid}</p>
          <p>{sign.line}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function Shadow() {
  const { saved, save, reset } = useSaver("wu", "午");
  const [role, setRole] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [beats, setBeats] = useState<string[] | null>(null);
  const [shown, setShown] = useState(1);

  function pick(setter: (id: string) => void, id: string) {
    setter(id);
    setBeats(null);
    setShown(1);
    reset();
  }

  const visible = beats?.slice(0, shown) ?? [];

  return (
    <div className="space-y-6">
      <ChoiceGroup label="谁上台" options={roles} value={role} onChange={(id) => pick(setRole, id)} />
      <ChoiceGroup
        label="今天的天"
        options={weathers}
        value={weather}
        onChange={(id) => pick(setWeather, id)}
      />
      <ChoiceGroup
        label="不可告人的那件"
        options={secrets}
        value={secret}
        onChange={(id) => pick(setSecret, id)}
      />
      <div className="flex flex-wrap gap-3">
        <PrimaryButton
          disabled={!role || !weather || !secret}
          onClick={() => {
            if (!role || !weather || !secret) return;
            const play = shadowPlay(role, weather, secret);
            setBeats(play);
            setShown(1);
            reset();
          }}
        >
          开演
        </PrimaryButton>
        {beats && shown < beats.length ? (
          <GhostButton onClick={() => setShown((n) => n + 1)}>下一幕</GhostButton>
        ) : null}
      </div>
      {visible.length > 0 ? (
        <Paper
          title="影子戏"
          action={
            beats && shown >= beats.length ? (
              <SaveOnPaper
                saved={saved}
                onSave={() => save("影子戏", beats.join("\n"))}
              />
            ) : null
          }
        >
          {visible.map((beat, index) => (
            <p key={beat}>
              <span className="font-serif text-cinnabar">第{index + 1}幕 </span>
              {beat}
            </p>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}

function Books() {
  const { saved, save, reset } = useSaver("wei", "未");
  const [bookId, setBookId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const book = books.find((item) => item.id === bookId) ?? null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {books.map((item) => {
          const on = item.id === bookId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setBookId(item.id);
                setPage(0);
                reset();
              }}
              className={cn(
                "min-h-16 rounded-2xl border px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on ? "border-cinnabar bg-river" : "border-paper/20 bg-river/60",
              )}
            >
              <span className="text-sm text-lantern">{item.shelf}</span>
              <span className="mt-1 block font-serif text-lg">《{item.title}》</span>
            </button>
          );
        })}
      </div>
      {book ? (
        <Paper
          title={`《${book.title}》 · 第 ${page + 1} 页`}
          action={
            <div className="flex flex-wrap gap-3">
              <InkButton
                disabled={page === 0}
                onClick={() => {
                  setPage((n) => Math.max(0, n - 1));
                  reset();
                }}
              >
                上一页
              </InkButton>
              <InkButton
                disabled={page >= book.pages.length - 1}
                onClick={() => {
                  setPage((n) => Math.min(book.pages.length - 1, n + 1));
                  reset();
                }}
              >
                下一页
              </InkButton>
              <SaveOnPaper
                saved={saved}
                label="夹进夜记"
                onSave={() =>
                  save(`旧书 · ${book.title}`, `第 ${page + 1} 页\n${book.pages[page] ?? ""}`)
                }
              />
            </div>
          }
        >
          <p>{book.pages[page]}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function Roofs() {
  const { saved, save, reset } = useSaver("shen", "申");
  const [house, setHouse] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const chosen = households.find((item) => item.id === house) ?? null;

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {households.map((item) => {
          const on = item.id === house;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setHouse(item.id);
                setReply(null);
                reset();
              }}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on ? "border-cinnabar bg-river" : "border-paper/20",
              )}
            >
              <span className="font-serif text-lg">{item.name}</span>
              <span className="mt-1 block text-sm text-paper/75">{item.hint}</span>
            </button>
          );
        })}
      </div>
      <label className="block">
        <span className="mb-2 block font-serif text-lg">塞进窗缝的话</span>
        <textarea
          value={note}
          maxLength={28}
          rows={3}
          onChange={(event) => {
            setNote(event.target.value);
            setReply(null);
            reset();
          }}
          placeholder="二十八字以内。空白也可以，他们认得沉默。"
          className="w-full rounded-2xl border border-paper/25 bg-river px-4 py-3 text-base text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lantern"
        />
        <span className="mt-1 block text-sm text-lantern">{note.trim().length}/28</span>
      </label>
      <PrimaryButton
        disabled={!chosen}
        onClick={() => {
          if (!chosen) return;
          const text = note.trim() || "（空白。只有一点窗缝里的风。）";
          setReply(chosen.reply(text));
        }}
      >
        塞进窗缝
      </PrimaryButton>
      {reply ? (
        <Paper
          title={`${chosen?.name ?? "回信"}`}
          action={<SaveOnPaper saved={saved} onSave={() => save("屋顶信", reply)} />}
        >
          <p>{reply}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function WineStall() {
  const { saved, save, reset } = useSaver("you", "酉");
  const [spirit, setSpirit] = useState<string | null>(null);
  const [side, setSide] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <ChoiceGroup
        label="酒"
        options={spirits}
        value={spirit}
        onChange={(id) => {
          setSpirit(id);
          setStory(null);
          reset();
        }}
      />
      <ChoiceGroup
        label="小菜"
        options={sides}
        value={side}
        onChange={(id) => {
          setSide(id);
          setStory(null);
          reset();
        }}
      />
      <PrimaryButton
        disabled={!spirit || !side}
        onClick={() => {
          if (!spirit || !side) return;
          setStory(pourWine(spirit, side));
        }}
      >
        温一壶
      </PrimaryButton>
      {story ? (
        <Paper
          title="酒旗下"
          action={<SaveOnPaper saved={saved} onSave={() => save("酒旗下", story)} />}
        >
          <p>{story}</p>
        </Paper>
      ) : null}
    </div>
  );
}

const WATCH_SECONDS = 24;

function Watch() {
  const { saved, save, reset } = useSaver("xu", "戌");
  const [targets, setTargets] = useState<string[]>([]);
  const [hits, setHits] = useState<string[]>([]);
  const [left, setLeft] = useState(WATCH_SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState("鼓还没响。先看哪些窗在找你。");

  useEffect(() => {
    if (!running || done) return;
    const id = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, done]);

  useEffect(() => {
    if (!running || targets.length === 0) return;
    if (targets.every((id) => hits.includes(id))) {
      setRunning(false);
      setDone(true);
      setFlash("该亮的都亮过了。鼓可以晚一点再响。");
    }
  }, [hits, targets, running]);

  function start() {
    const pool = [...windows];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const current = pool[i];
      const swap = pool[j];
      if (!current || !swap) continue;
      pool[i] = swap;
      pool[j] = current;
    }
    setTargets(pool.slice(0, 4).map((item) => item.id));
    setHits([]);
    setLeft(WATCH_SECONDS);
    setDone(false);
    setRunning(true);
    reset();
    setFlash("有的窗在眨眼。睡着的不必敲。");
  }

  function tap(id: string) {
    if (!running) return;
    if (hits.includes(id)) return;
    const item = windows.find((entry) => entry.id === id);
    if (!item) return;
    if (!targets.includes(id)) {
      setFlash(`${item.house}睡得很稳，灯没有找你。`);
      return;
    }
    setHits((curr) => [...curr, id]);
    setFlash(item.line);
  }

  const found = windows.filter((item) => hits.includes(item.id));
  const complete = done && targets.length > 0 && targets.every((id) => hits.includes(id));
  const body = [
    complete
      ? "鼓还没响，你已经把该看的都看过了。雾津今夜无事，只有这些小小的亮。"
      : done
        ? "鼓响了。没看见的那些窗，自己会把夜守完。你看见的，已经够写进夜记。"
        : "",
    ...found.map((item) => `${item.house}：${item.line}`),
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-river">
        <div
          className="h-full origin-left bg-lantern"
          style={{ transform: `scaleX(${running || done ? left / WATCH_SECONDS : 1})` }}
        />
      </div>
      <p className="mt-3 text-sm text-lantern">
        {running ? `香还剩 ${left} 息` : done ? "这一巡结束了" : "香还没点"}
      </p>
      <p className="mt-2 min-h-12 leading-relaxed">{flash}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {windows.map((item) => {
          const hit = hits.includes(item.id);
          const live = running && targets.includes(item.id) && !hit;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => tap(item.id)}
              className={cn(
                "min-h-20 rounded-2xl border px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                hit ? "border-lantern bg-river" : "border-paper/20",
                live && "ember border-lantern",
              )}
            >
              <span className="block font-serif text-lg">{item.house}</span>
              <span className="mt-1 block text-sm text-paper/70">
                {hit ? "看见了" : live ? "灯在闪" : "窗"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5">
        {running ? null : (
          <PrimaryButton onClick={start}>{done ? "再守一巡" : "开始守夜"}</PrimaryButton>
        )}
      </div>
      {done ? (
        <Paper
          title="守夜"
          action={<SaveOnPaper saved={saved} onSave={() => save("守夜", body)} />}
        >
          {body.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}

function Boat() {
  const { saved, save, reset } = useSaver("hai", "亥");
  const [wish, setWish] = useState("");
  const [step, setStep] = useState(0);
  const [echo, setEcho] = useState<string | null>(null);
  const steps = ["一张平纸", "对折", "成舟"];

  return (
    <div>
      <label className="block">
        <span className="mb-2 block font-serif text-lg">写给下游的一句</span>
        <textarea
          value={wish}
          maxLength={36}
          rows={3}
          onChange={(event) => {
            setWish(event.target.value);
            setStep(0);
            setEcho(null);
            reset();
          }}
          placeholder="三十六字以内。比如：让那封信自己找到地址。"
          className="w-full rounded-2xl border border-paper/25 bg-river px-4 py-3 text-base text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lantern"
        />
        <span className="mt-1 block text-sm text-lantern">{wish.trim().length}/36</span>
      </label>
      <div className="mt-5 rounded-2xl border border-paper/15 bg-river p-5 text-center">
        <p className="font-serif text-5xl text-lantern">舟</p>
        <p className="mt-2 text-sm text-lantern">{steps[step]}</p>
        <p className="mt-3 min-h-12 leading-relaxed">{wish.trim() || "纸上还空着。"}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {step < 2 ? (
          <PrimaryButton
            disabled={!wish.trim()}
            onClick={() => setStep((value) => Math.min(2, value + 1))}
          >
            {step === 0 ? "对折" : "折成舟"}
          </PrimaryButton>
        ) : (
          <PrimaryButton
            disabled={!wish.trim()}
            onClick={() => {
              const text = wish.trim();
              setEcho(boatEcho(text));
            }}
          >
            放入江心
          </PrimaryButton>
        )}
      </div>
      {echo ? (
        <Paper
          title="下游回声"
          action={
            <SaveOnPaper
              saved={saved}
              onSave={() => save("归舟", `${wish.trim()}\n${echo}`)}
            />
          }
        >
          <p className="font-serif">{wish.trim()}</p>
          <p>{echo}</p>
        </Paper>
      ) : null}
    </div>
  );
}

function SaveOnPaper({
  saved,
  onSave,
  label = "收入夜记",
}: {
  saved: boolean;
  onSave: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={saved}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern disabled:opacity-60"
    >
      {saved ? "已收入夜记" : label}
    </button>
  );
}

const ritualMap: Record<StallId, () => ReactElement> = {
  zi: Tide,
  chou: Dream,
  yin: Lanterns,
  mao: Tea,
  chen: Bones,
  si: Threads,
  wu: Shadow,
  wei: Books,
  shen: Roofs,
  you: WineStall,
  xu: Watch,
  hai: Boat,
};

export function Ritual({ id }: { id: StallId }) {
  const View = ritualMap[id];
  return <View />;
}
