import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { stalls } from "@/lib/wujin/content";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { formatWhen } from "@/lib/wujin/time";
import { Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({ meta: [{ title: "夜记 · 雾津十二时" }] }),
});

function JournalPage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const removeSlip = useJournal((s) => s.removeSlip);
  const [pending, setPending] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const visible = filter === "all" ? slips : slips.filter((slip) => slip.stallId === filter);
  const used = stalls.filter((stall) => slips.some((slip) => slip.stallId === stall.id));

  return (
    <Shell>
      <p className="text-sm text-lantern">只存在于这台设备</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">夜记</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/75">
        你在铺子里收下的句子都夹在这里。它们也会被渡口重读，并决定长夜翻到第几页。撕掉只影响这本册子，江还在。
      </p>
      <Link to="/night" className="mt-4 inline-flex min-h-11 items-center text-sm text-lantern">
        去读长夜
      </Link>

      {ready && slips.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip on={filter === "all"} onClick={() => setFilter("all")}>
            全部
          </FilterChip>
          {used.map((stall) => (
            <FilterChip
              key={stall.id}
              on={filter === stall.id}
              onClick={() => setFilter(stall.id)}
            >
              {stall.branch} · {stall.name}
            </FilterChip>
          ))}
          {slips.some((slip) => slip.stallId === "yi") ? (
            <FilterChip on={filter === "yi"} onClick={() => setFilter("yi")}>
              易 · 问江
            </FilterChip>
          ) : null}
          {slips.some((slip) => slip.stallId === "voyage") ? (
            <FilterChip on={filter === "voyage"} onClick={() => setFilter("voyage")}>
              航 · 夜航
            </FilterChip>
          ) : null}
          {slips.some((slip) => slip.stallId === "run") ? (
            <FilterChip on={filter === "run"} onClick={() => setFilter("run")}>
              闰 · 拾遗
            </FilterChip>
          ) : null}
        </div>
      ) : null}

      {!ready ? (
        <p className="mt-8 text-paper/70">正在翻开册子…</p>
      ) : visible.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-paper p-5 text-ink">
          <p className="font-serif text-xl">这一页还是空白的。</p>
          <p className="mt-3 leading-relaxed">
            雾津不催你。先去一个时辰里坐坐，回来时这里会有纸。
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper"
          >
            回到长街
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((slip) => (
            <li key={slip.id} className="rounded-2xl bg-paper p-5 text-ink">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-cinnabar">
                    {slip.branch}时 · {formatWhen(slip.at)}
                  </p>
                  <h2 className="mt-1 font-serif text-xl">{slip.title}</h2>
                </div>
                <span
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-cinnabar font-serif text-cinnabar"
                  aria-hidden
                >
                  {slip.branch}
                </span>
              </div>
              <div className="mt-3 space-y-2 leading-relaxed">
                {slip.body.split("\n").map((line, index) => (
                  <p key={`${slip.id}-${index}`}>{line}</p>
                ))}
              </div>
              <div className="mt-4">
                {pending === slip.id ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        removeSlip(slip.id);
                        setPending(null);
                      }}
                      className="inline-flex min-h-11 items-center rounded-full bg-cinnabar px-4 text-sm text-paper"
                    >
                      确认撕掉
                    </button>
                    <button
                      type="button"
                      onClick={() => setPending(null)}
                      className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 text-sm"
                    >
                      留下
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPending(slip.id)}
                    className="inline-flex min-h-11 items-center text-sm text-cinnabar"
                  >
                    撕掉这张
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function FilterChip({
  children,
  on,
  onClick,
}: {
  children: ReactNode;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={
        on
          ? "min-h-11 rounded-full bg-cinnabar px-4 text-sm text-paper"
          : "min-h-11 rounded-full border border-paper/25 px-4 text-sm text-paper"
      }
    >
      {children}
    </button>
  );
}
