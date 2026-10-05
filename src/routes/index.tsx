import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { stalls } from "@/lib/wujin/content";
import { hourIds, streetTalk } from "@/lib/wujin/chronicle";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { branchIndex } from "@/lib/wujin/time";
import { tidalByStall } from "@/lib/wujin/yijing";
import { cn, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [now, setNow] = useState<number | null>(null);
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const visited = new Set(slips.map((slip) => slip.stallId));
  const done = hourIds(visited);

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
        雾津按十二个时辰开门。铺子里的小事会变成夜笺；夜笺攒起来，会翻开一篇叫《未寄出的名字》的长夜。十二辰也是一条潮：阳从子时复生，亥时交还给地。
      </p>

      <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-lantern">
        {ready ? streetTalk(done.length) : "城里的风还在认你的袖口。"}
      </p>
      {ready && slips.some((slip) => slip.stallId === "yi") ? (
        <p className="mt-3 text-sm text-paper/75">
          夜记里留着最近一问：{slips.find((slip) => slip.stallId === "yi")?.title}。渡口也会把这句话再读一遍。
        </p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          to="/night"
          className="rounded-2xl border border-cinnabar bg-river p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
        >
          <p className="text-sm text-lantern">长夜 · {ready ? `${done.length}/12` : "…"}</p>
          <h2 className="mt-1 font-serif text-2xl">未寄出的名字</h2>
          <p className="mt-2 text-sm leading-relaxed text-paper/75">阿迟投进潮里的字，正在十二个时辰里走路。</p>
        </Link>
        <Link
          to="/run"
          className="rounded-2xl border border-paper/20 bg-river p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
        >
          <p className="text-sm text-lantern">
            闰时 · {ready && done.length >= 4 ? "门开了" : `${ready ? done.length : 0}/4`}
          </p>
          <h2 className="mt-1 font-serif text-2xl">钟点之外</h2>
          <p className="mt-2 text-sm leading-relaxed text-paper/75">走完四间铺，缝里会有东西等你送回去。</p>
        </Link>
      </div>

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
                    <p className="mt-2 text-sm leading-relaxed text-paper/80">
                      {tidalByStall(stall.id)
                        ? `${tidalByStall(stall.id)?.name} · ${stall.blurb}`
                        : stall.blurb}
                    </p>
                    {visited.has(stall.id) ? (
                      <p className="mt-2 text-sm text-cinnabar">这一辰已留笺，长夜翻开了</p>
                    ) : null}
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
