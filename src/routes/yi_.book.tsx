import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { hexagrams, trigramName } from "@/lib/wujin/hexagrams";
import { hexGlyph, trigrams, type TrigramId } from "@/lib/wujin/yijing";
import { cn, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/yi_/book")({
  validateSearch: (search: Record<string, unknown>): { n?: number } => {
    const n = Number(search.n);
    return n > 0 ? { n } : {};
  },
  component: BookPage,
  head: () => ({ meta: [{ title: "六十四卦 · 雾津十二时" }] }),
});

function BookPage() {
  const [query, setQuery] = useState("");
  const [tri, setTri] = useState<TrigramId | "all">("all");
  const n = Route.useSearch().n ?? 0;
  const [open, setOpen] = useState<number | null>(n || null);
  const focus = hexagrams.find((item) => item.n === n);
  const q = query.trim();
  const list = hexagrams.filter((item) => {
    const byName = !q || item.name.includes(q) || String(item.n) === q;
    const byTri = tri === "all" || item.lower === tri || item.upper === tri;
    return byName && byTri;
  });

  return (
    <Shell>
      <Link to="/yi" className="inline-flex min-h-11 items-center text-sm text-lantern">
        返回易
      </Link>
      <p className="mt-4 text-sm text-lantern">旧卦名，城里的新句子</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">六十四卦</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        每一卦两句。第一句是雾津听到的判断，第二句是这城里此刻的景象。可按卦名、序数，或八卦来翻。
      </p>
      <label className="mt-6 block text-sm text-lantern" htmlFor="hex-q">
        查找
      </label>
      <input
        id="hex-q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="如：复、井、24"
        className="mt-2 w-full rounded-xl border border-paper/20 bg-river px-4 py-3 text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <Filter on={tri === "all"} onClick={() => setTri("all")}>
          全部
        </Filter>
        {trigrams.map((item) => (
          <Filter key={item.id} on={tri === item.id} onClick={() => setTri(item.id)}>
            {item.name}
          </Filter>
        ))}
      </div>
      <p className="mt-4 text-sm text-paper/60">{list.length} 卦</p>
      {focus && !q && tri === "all" ? (
        <article className="mt-3 rounded-2xl bg-paper p-5 text-ink">
          <p className="font-serif text-4xl leading-none text-cinnabar" aria-hidden>
            {hexGlyph(focus.n)}
          </p>
          <h2 className="mt-3 font-serif text-2xl">
            {focus.n} · {focus.name}
          </h2>
          <p className="mt-3 font-serif text-lg leading-relaxed">{focus.text}</p>
          <p className="mt-3 leading-relaxed">{focus.image}</p>
        </article>
      ) : null}
      <ul className="mt-3 space-y-2">
        {list.map((item) => {
          const shown = open === item.n;
          return (
            <li key={item.n}>
              <button
                type="button"
                aria-expanded={shown}
                onClick={() => setOpen(shown ? null : item.n)}
                className="flex w-full items-center gap-3 rounded-2xl border border-paper/15 bg-river px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
              >
                <span className="w-10 text-center font-serif text-3xl text-lantern" aria-hidden>
                  {hexGlyph(item.n)}
                </span>
                <span>
                  <span className="block font-serif text-xl">
                    {item.n} · {item.name}
                  </span>
                  <span className="text-sm text-paper/65">
                    下{trigramName(item.lower)}上{trigramName(item.upper)}
                  </span>
                </span>
              </button>
              {shown ? (
                <article className="mt-2 rounded-2xl bg-paper p-5 text-ink">
                  <p className="font-serif text-lg leading-relaxed">{item.text}</p>
                  <p className="mt-3 leading-relaxed text-ink/80">{item.image}</p>
                </article>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}

function Filter({
  children,
  on,
  onClick,
}: {
  children: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
        on ? "border-cinnabar bg-cinnabar text-paper" : "border-paper/25 text-paper",
      )}
    >
      {children}
    </button>
  );
}
