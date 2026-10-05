import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { hourIds } from "@/lib/wujin/chronicle";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { lostLines, returnLost } from "@/lib/wujin/world";
import { BackToStreet, cn, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/run")({
  component: RunPage,
  head: () => ({ meta: [{ title: "闰时 · 雾津十二时" }] }),
});

function RunPage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const addSlip = useJournal((s) => s.addSlip);
  const count = hourIds(new Set(slips.map((slip) => slip.stallId))).length;
  const open = ready && count >= 4;
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<string[] | null>(null);
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setResult(null);
    setSaved(false);
    setPicked((curr) => {
      if (curr.includes(id)) return curr.filter((item) => item !== id);
      if (curr.length >= 3) return curr;
      return [...curr, id];
    });
  }

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">钟点之外的一道缝</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">闰时</h1>
      {!open ? (
        <p className="mt-4 max-w-xl leading-relaxed text-paper/80">
          这扇门夹在时辰与时辰之间。你先在四间不同的铺里留下夜笺，缝才会裂开。现在是 {ready ? count : "…"} / 4。
        </p>
      ) : (
        <>
          <p className="mt-4 max-w-xl leading-relaxed text-paper/80">
            这里收留被放下、又还没人认领的东西。挑三样，送回它们肯负责的人手里。城会因此轻一寸。
          </p>
          <p className="mt-4 text-sm text-lantern">已选 {picked.length} / 3</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lostLines.map((item) => {
              const on = picked.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                    on ? "border-cinnabar bg-cinnabar text-paper" : "border-paper/25 text-paper",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={picked.length !== 3}
            onClick={() => setResult(returnLost(picked).paragraphs)}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper disabled:opacity-40"
          >
            送回去
          </button>
          {result ? (
            <article className="mt-6 rounded-2xl bg-paper p-5 text-ink">
              <h2 className="font-serif text-xl">拾遗</h2>
              <div className="mt-3 space-y-3 leading-relaxed">
                {result.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                disabled={saved}
                onClick={() => {
                  addSlip({
                    stallId: "run",
                    branch: "闰",
                    title: "闰时 · 拾遗",
                    body: result.join("\n"),
                  });
                  setSaved(true);
                }}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper disabled:opacity-60"
              >
                {saved ? "已收入夜记" : "收入夜记"}
              </button>
            </article>
          ) : null}
        </>
      )}
    </Shell>
  );
}
