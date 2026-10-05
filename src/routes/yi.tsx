import { createFileRoute, Link } from "@tanstack/react-router";
import { stalls } from "@/lib/wujin/content";
import { hexGlyph, tidal, trigrams } from "@/lib/wujin/yijing";
import { BackToStreet, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/yi")({
  component: YiPage,
  head: () => ({ meta: [{ title: "易 · 雾津十二时" }] }),
});

function YiPage() {
  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">城不占卜。它只用卦记下潮怎么来回。</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">易</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        八卦住在雾津的八处地方。十二个时辰则是一条更慢的潮：阳从子时复生，到巳时站满，午时遇见第一笔阴，亥时重新交给地。这不是课本，是阿迟的名字在城里走过的路线。
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/yi/cast"
          className="inline-flex min-h-11 items-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper"
        >
          问江起卦
        </Link>
        <Link
          to="/yi/book"
          className="inline-flex min-h-11 items-center rounded-full border border-paper/30 px-5 text-sm text-paper"
        >
          翻六十四卦
        </Link>
        <Link
          to="/yi/voyage"
          className="inline-flex min-h-11 items-center rounded-full border border-paper/30 px-5 text-sm text-paper"
        >
          走一次夜航
        </Link>
      </div>

      <h2 className="mt-10 font-serif text-2xl">八卦住在哪里</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {trigrams.map((item) => (
          <li key={item.id} className="rounded-2xl border border-paper/15 bg-river p-5">
            <p className="font-serif text-3xl leading-none text-lantern" aria-hidden>
              {hexGlyph(item.hex)}
            </p>
            <h3 className="mt-3 font-serif text-2xl">
              {item.name}
              <span className="ml-2 text-base text-paper/70">
                {item.nature} · {item.quality}
              </span>
            </h3>
            <p className="mt-1 text-sm text-lantern">{item.where}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/80">{item.prose}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-serif text-2xl">十二消息</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/70">
        每一辰对应一卦。卦名是旧的，句子是这座城新写的。
      </p>
      <ol className="mt-4 space-y-3">
        {tidal.map((item) => {
          const stall = stalls.find((entry) => entry.id === item.stallId);
          return (
            <li key={item.stallId}>
              <Link
                to="/stall/$id"
                params={{ id: item.stallId }}
                className="flex items-center gap-4 rounded-2xl border border-paper/15 bg-river px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
              >
                <span className="w-10 shrink-0 text-center font-serif text-3xl text-lantern" aria-hidden>
                  {hexGlyph(item.hex)}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl">
                    {item.branch}时 · {item.name}
                  </span>
                  <span className="mt-1 block text-sm text-paper/75">
                    {stall?.name} · {item.motion}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}
