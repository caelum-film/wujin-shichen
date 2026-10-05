import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { hexGlyph } from "@/lib/wujin/yijing";
import { resolveCast, throwLine, trigramName, type CastLine } from "@/lib/wujin/hexagrams";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/yi_/cast")({
  component: CastPage,
  head: () => ({ meta: [{ title: "问江 · 雾津十二时" }] }),
});

const coinFace = ["", "", "字", "背"];

function CastPage() {
  const [lines, setLines] = useState<CastLine[]>([]);
  const [question, setQuestion] = useState("");
  const [saved, setSaved] = useState(false);
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const addSlip = useJournal((s) => s.addSlip);
  const latest = slips.find((slip) => slip.stallId !== "yi" && slip.stallId !== "run");
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
        字为阴，背为阳。六次之后，江给你一卦。把要问的那一句写下来，或什么都不写。城听得见停顿。
      </p>
      <label className="mt-6 block text-sm text-lantern" htmlFor="ask">
        这一问
      </label>
      <textarea
        id="ask"
        value={question}
        rows={3}
        onChange={(event) => {
          setQuestion(event.target.value);
          setSaved(false);
        }}
        placeholder="例如：这个名字，还要不要再投一次"
        className="mt-2 w-full rounded-xl border border-paper/20 bg-river px-4 py-3 text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
      />
      {ready && latest && !question ? (
        <button
          type="button"
          onClick={() => setQuestion(`沿夜笺「${latest.title}」再问一次`)}
          className="mt-2 inline-flex min-h-11 items-center text-sm text-lantern"
        >
          用最近一张夜笺来问
        </button>
      ) : null}

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
          onClick={() => {
            setLines([]);
            setSaved(false);
          }}
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
            本卦 · 下{trigramName(cast.primary.lower)}上{trigramName(cast.primary.upper)}
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed">{cast.primary.text}</p>
          <p className="mt-3 leading-relaxed text-ink/80">{cast.primary.image}</p>
          <Link
            to="/yi/book"
            search={{ n: cast.primary.n }}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-cinnabar"
          >
            在六十四卦里翻到这一卦
          </Link>
        </article>
      ) : null}
      {cast?.changed ? (
        <article className="mt-4 rounded-2xl border border-cinnabar bg-river p-5">
          <p className="text-sm text-lantern">
            之卦 · 第{cast.moving.map((index) => index + 1).join("、")}爻在动
          </p>
          <p className="mt-3 font-serif text-4xl leading-none text-lantern" aria-hidden>
            {hexGlyph(cast.changed.n)}
          </p>
          <h2 className="mt-3 font-serif text-3xl">{cast.changed.name}</h2>
          <p className="mt-4 leading-relaxed text-paper/85">
            本卦是眼前这一步。老阴与老阳翻过去之后，夜走到「{cast.changed.name}」：{cast.changed.text}
          </p>
          <p className="mt-3 leading-relaxed text-paper/75">{cast.changed.image}</p>
          <Link
            to="/yi/book"
            search={{ n: cast.changed.n }}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-lantern"
          >
            翻到变后的这一卦
          </Link>
        </article>
      ) : cast?.primary ? (
        <p className="mt-4 text-sm leading-relaxed text-paper/70">六爻都安静。这一卦不再往别处走。</p>
      ) : null}
      {cast?.primary ? (
        <button
          type="button"
          disabled={saved}
          onClick={() => {
            const changed = cast.changed;
            addSlip({
              stallId: "yi",
              branch: "易",
              title: changed ? `问江 · ${cast.primary?.name}之${changed.name}` : `问江 · ${cast.primary?.name}`,
              body: [
                `问：${question.trim() || "没有写下来的那一句"}`,
                `本卦${cast.primary?.name}：${cast.primary?.text}`,
                changed ? `之卦${changed.name}：${changed.text}` : "六爻安静，不再往别处走。",
              ].join("\n"),
            });
            setSaved(true);
          }}
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper disabled:opacity-60"
        >
          {saved ? "已收入夜记" : "收入夜记"}
        </button>
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
