import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { stalls } from "@/lib/wujin/content";
import { branchIndex } from "@/lib/wujin/time";
import { cn, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(branchIndex(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const current = now === null ? null : stalls[now];

  return (
    <Shell>
      <p className="text-sm text-lantern">一座不在地图上的江城</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight">十二时铺</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/80">
        雾津按十二个时辰开门。你可以从自己的此刻走进去，也可以去任何一间还亮着的铺子。每做完一件小事，城里会给你一张夜笺。
      </p>

      <section className="mt-8 rounded-2xl border border-cinnabar bg-river p-5">
        <p className="text-sm text-lantern">你的此刻</p>
        {current ? (
          <>
            <h2 className="mt-1 font-serif text-2xl">
              {current.branch}时 · {current.name}
            </h2>
            <p className="mt-2 text-sm text-paper/75">
              {current.hours} · {current.blurb}
            </p>
            <Link
              to="/stall/$id"
              params={{ id: current.id }}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
            >
              走进此刻
            </Link>
          </>
        ) : (
          <p className="mt-2 font-serif text-xl">正在读取你的时辰…</p>
        )}
      </section>

      <ol className="mt-6 grid grid-cols-6 gap-2 sm:grid-cols-12">
        {stalls.map((stall, index) => {
          const on = index === now;
          return (
            <li key={stall.id}>
              <Link
                to="/stall/$id"
                params={{ id: stall.id }}
                aria-label={`${stall.branch}时 ${stall.name}`}
                className={cn(
                  "flex min-h-11 items-center justify-center rounded-full border font-serif text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                  on
                    ? "border-cinnabar bg-cinnabar text-paper"
                    : "border-paper/20 text-paper hover:border-lantern",
                )}
              >
                {stall.branch}
              </Link>
            </li>
          );
        })}
      </ol>

      <ul className="mt-8 space-y-4">
        {stalls.map((stall, index) => {
          const Icon = stall.icon;
          const on = index === now;
          return (
            <li key={stall.id}>
              <Link
                to="/stall/$id"
                params={{ id: stall.id }}
                className={cn(
                  "block rounded-2xl border bg-river p-5 transition hover:border-lantern focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                  on ? "border-cinnabar" : "border-paper/15",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm text-lantern">
                      <Icon className="size-4" aria-hidden />
                      {stall.branch}时 · {stall.hours}
                      {on ? " · 此刻营业" : ""}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl">{stall.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-paper/80">{stall.blurb}</p>
                  </div>
                  <span className="shrink-0 font-serif text-4xl text-lantern" aria-hidden>
                    {stall.branch}
                  </span>
                </div>
                <p className="mt-4 text-sm">推门进去</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-paper/60">
        文字、铺子和规矩都是为这座城新写的。夜笺只留在你这台设备上，不会送到别人的江里。
      </p>
    </Shell>
  );
}
