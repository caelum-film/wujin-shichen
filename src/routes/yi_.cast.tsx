import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { hexGlyph } from "@/lib/wujin/yijing";
import { resolveCast, throwLine, trigramName, type CastLine } from "@/lib/wujin/hexagrams";
import { Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/yi_/cast")({
  component: CastPage,
  head: () => ({ meta: [{ title: "问江 · 雾津十二时" }] }),
});

const coinFace = ["", "", "字", "背"];

function CastPage() {
  const [lines, setLines] = useState<CastLine[]>([]);
  const done = lines.length === 6;
  const cast = done ? resolveCast(lines.map((line) => line.value)) : null;

  return (
    <Shell>
      <Link to="/yi" className="inline-flex min-h-11 items-center text-sm text-lantern">
        返回易
      </Link>
      <p className="mt-4 text-sm text-lantern">三枚铜钱，自下往上</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">问江</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        字为阴，背为阳。六次之后，江给你一卦。先在心里放一句真正想问的事，不必写出来。城听得见停顿。
      </p>

      <ol className="mt-8 space-y-2">
        {Array.from({ length: 6 }, (_, index) => {
          const line = lines[5 - index];
          const place = 6 - index;
          return (
            <li key={place} className="flex items-center gap-4">
              <span className="w-6 text-sm text-paper/50">{place}</span>
              {line ? <Yao value={line.value} /> : <span className="h-3 flex-1 rounded bg-paper/10" />}
              <span className="w-16 text-right text-sm text-paper/60">
                {line ? line.coins.map((coin) => coinFace[coin]).join(" ") : "—"}
              </span>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        disabled={done}
        onClick={() => setLines((curr) => [...curr, throwLine()])}
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper disabled:opacity-40"
      >
        {lines.length === 0 ? "掷第一爻" : done ? "六爻已齐" : `掷第${lines.length + 1}爻`}
      </button>
      {lines.length > 0 ? (
        <button
          type="button"
          onClick={() => setLines([])}
          className="ml-3 inline-flex min-h-11 items-center text-sm text-paper/70"
        >
          重新问
        </button>
      ) : null}

      {cast?.primary ? (
        <article className="mt-8 rounded-2xl bg-paper p-5 text-ink">
          <p className="font-serif text-5xl leading-none text-cinnabar" aria-hidden>
            {hexGlyph(cast.primary.n)}
          </p>
          <h2 className="mt-3 font-serif text-3xl">
            {cast.primary.name}
            <span className="ml-2 text-lg text-ink/60">第 {cast.primary.n} 卦</span>
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            下{trigramName(cast.primary.lower)}上{trigramName(cast.primary.upper)}
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed">{cast.primary.text}</p>
          {cast.moving.length > 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-cinnabar">
              第{cast.moving.map((index) => index + 1).join("、")}爻在动。变过去的那一卦，城下一回才肯说完。
            </p>
          ) : null}
        </article>
      ) : null}
    </Shell>
  );
}

function Yao({ value }: { value: number }) {
  const yang = value === 7 || value === 9;
  const moving = value === 6 || value === 9;
  return (
    <span className="flex flex-1 items-center gap-2" aria-label={yang ? "阳爻" : "阴爻"}>
      {yang ? (
        <span className={`h-3 flex-1 ${moving ? "bg-cinnabar" : "bg-paper"}`} />
      ) : (
        <span className="flex flex-1 gap-2">
          <span className={`h-3 flex-1 ${moving ? "bg-cinnabar" : "bg-paper"}`} />
          <span className={`h-3 flex-1 ${moving ? "bg-cinnabar" : "bg-paper"}`} />
        </span>
      )}
    </span>
  );
}
