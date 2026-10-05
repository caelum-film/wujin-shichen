import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters, dawn, hourIds } from "@/lib/wujin/chronicle";
import { stalls } from "@/lib/wujin/content";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { BackToStreet, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/night")({
  component: NightPage,
  head: () => ({ meta: [{ title: "长夜 · 雾津十二时" }] }),
});

function NightPage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const ids = new Set(slips.map((slip) => slip.stallId));
  const opened = hourIds(ids);
  const dawnOpen = ready && opened.length === stalls.length;

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">一篇要靠脚步翻开的故事</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">长夜</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        有个叫阿迟的人，把名字投进了潮里。名字不肯沉。你每做完一间铺，长夜就交出对应的一页。十二页齐了，雾才会散。
      </p>
      <p className="mt-4 text-sm text-lantern">
        {ready ? `已翻开 ${opened.length} / ${stalls.length}` : "正在对页码…"}
      </p>

      <ol className="mt-8 space-y-4">
        {chapters.map((chapter) => {
          const open = ready && ids.has(chapter.stallId);
          const stall = stalls.find((item) => item.id === chapter.stallId);
          if (!open) {
            return (
              <li key={chapter.stallId} className="rounded-2xl border border-paper/15 bg-river p-5">
                <p className="text-sm text-lantern">{chapter.branch}时 · 这一页还合着</p>
                <h2 className="mt-1 font-serif text-2xl">{chapter.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  去{stall?.name ?? "这一间铺"}做完那件小事，页子才会交给你。
                </p>
                {stall ? (
                  <Link
                    to="/stall/$id"
                    params={{ id: stall.id }}
                    className="mt-4 inline-flex min-h-11 items-center text-sm text-lantern"
                  >
                    去{stall.name}
                  </Link>
                ) : null}
              </li>
            );
          }
          return (
            <li key={chapter.stallId} className="rounded-2xl bg-paper p-5 text-ink">
              <p className="text-sm text-cinnabar">{chapter.branch}时</p>
              <h2 className="mt-1 font-serif text-2xl">{chapter.title}</h2>
              <div className="mt-3 space-y-3 leading-relaxed">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          );
        })}
        <li className={dawnOpen ? "rounded-2xl bg-paper p-5 text-ink" : "rounded-2xl border border-cinnabar bg-river p-5"}>
          <p className={dawnOpen ? "text-sm text-cinnabar" : "text-sm text-lantern"}>
            {dawnOpen ? "十二时之后" : "雾还没散"}
          </p>
          <h2 className="mt-1 font-serif text-2xl">{dawn.title}</h2>
          {dawnOpen ? (
            <div className="mt-3 space-y-3 leading-relaxed">
              {dawn.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-paper/75">
              这一页在城门外。十二间铺都留下夜笺，门才会多开一寸。
            </p>
          )}
        </li>
      </ol>
    </Shell>
  );
}
