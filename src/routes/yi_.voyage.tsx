import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { hexagramByLines, trigramName } from "@/lib/wujin/hexagrams";
import { hexGlyph } from "@/lib/wujin/yijing";
import { useJournal } from "@/lib/wujin/store";
import { Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/yi_/voyage")({
  component: VoyagePage,
  head: () => ({ meta: [{ title: "夜航 · 雾津十二时" }] }),
});

const steps = [
  { place: "潮底", yang: "让名字浮上来", yin: "让它再沉一点" },
  { place: "梦碗", yang: "再喂一口", yin: "把碗盖上" },
  { place: "巷灯", yang: "再点一盏", yin: "留一盏是暗的" },
  { place: "腕绳", yang: "把结系紧", yin: "把结松开" },
  { place: "酒杯", yang: "把名字喝下去", yin: "把杯子放下" },
  { place: "城门", yang: "把手合上", yin: "再投一次" },
];

function VoyagePage() {
  const [bits, setBits] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const addSlip = useJournal((s) => s.addSlip);
  const done = bits.length === steps.length;
  const hex = done ? hexagramByLines(bits.join("")) : undefined;
  const step = steps[bits.length];

  return (
    <Shell>
      <Link to="/yi" className="inline-flex min-h-11 items-center text-sm text-lantern">
        返回易
      </Link>
      <p className="mt-4 text-sm text-lantern">不掷钱。六次选择，自下往上长成一卦</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">夜航</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        阿迟走过的地方，你再走一遍。每一次只选一边。阳在左，阴在右。走到城门，卦就齐了。
      </p>
      <ol className="mt-8 space-y-2" aria-label="已走过的爻">
        {Array.from({ length: 6 }, (_, index) => {
          const place = 6 - index;
          const bit = bits[place - 1];
          return (
            <li key={place} className="flex items-center gap-3">
              <span className="w-4 text-sm text-paper/45">{place}</span>
              {bit ? <Bar bit={bit} /> : <span className="h-3 flex-1 rounded bg-paper/10" />}
              <span className="w-28 text-right text-sm text-paper/60">
                {bit ? (bit === "1" ? steps[place - 1]?.yang : steps[place - 1]?.yin) : steps[place - 1]?.place}
              </span>
            </li>
          );
        })}
      </ol>
      {step ? (
        <div className="mt-6">
          <p className="text-sm text-lantern">
            第 {bits.length + 1} 步 · {step.place}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Choice onClick={() => setBits((curr) => [...curr, "1"])}>{step.yang}</Choice>
            <Choice onClick={() => setBits((curr) => [...curr, "0"])}>{step.yin}</Choice>
          </div>
        </div>
      ) : null}
      {bits.length > 0 ? (
        <button
          type="button"
          onClick={() => {
            setBits([]);
            setSaved(false);
          }}
          className="mt-4 inline-flex min-h-11 items-center text-sm text-paper/70"
        >
          从头再航
        </button>
      ) : null}
      {hex ? (
        <article className="mt-8 rounded-2xl bg-paper p-5 text-ink">
          <p className="font-serif text-5xl leading-none text-cinnabar" aria-hidden>
            {hexGlyph(hex.n)}
          </p>
          <h2 className="mt-3 font-serif text-3xl">{hex.name}</h2>
          <p className="mt-1 text-sm text-ink/60">
            下{trigramName(hex.lower)}上{trigramName(hex.upper)}
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed">{hex.text}</p>
          <p className="mt-3 leading-relaxed text-ink/80">{hex.image}</p>
          <button
            type="button"
            disabled={saved}
            onClick={() => {
              addSlip({
                stallId: "voyage",
                branch: "航",
                title: `夜航 · ${hex.name}`,
                body: [
                  ...bits.map((bit, index) => `${steps[index]?.place}：${bit === "1" ? steps[index]?.yang : steps[index]?.yin}`),
                  `${hex.name}：${hex.text}`,
                ].join("\n"),
              });
              setSaved(true);
            }}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper disabled:opacity-60"
          >
            {saved ? "已收入夜记" : "收入夜记"}
          </button>
        </article>
      ) : null}
    </Shell>
  );
}

function Bar({ bit }: { bit: string }) {
  if (bit === "1") return <span className="h-3 flex-1 bg-paper" />;
  return (
    <span className="flex flex-1 gap-2">
      <span className="h-3 flex-1 bg-paper" />
      <span className="h-3 flex-1 bg-paper" />
    </span>
  );
}

function Choice({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-2xl border border-paper/25 px-4 py-3 text-left text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
    >
      {children}
    </button>
  );
}
