import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { hourIds } from "@/lib/wujin/chronicle";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { places } from "@/lib/wujin/world";
import { BackToStreet, cn, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/city")({
  component: CityPage,
  head: () => ({ meta: [{ title: "城志 · 雾津十二时" }] }),
});

function CityPage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const count = hourIds(new Set(slips.map((slip) => slip.stallId))).length;
  const [openId, setOpenId] = useState<string | null>(places[0]?.id ?? null);

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">不是地图，是城里愿意被记住的地方</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">城志</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        有的地方一直在。有的地方要等你的夜笺够了，才肯把名字告诉你。阿迟走过的足迹，也写在里面。
      </p>

      <ul className="mt-8 space-y-3">
        {places.map((place) => {
          const unlocked = ready && count >= place.need;
          const open = openId === place.id && unlocked;
          return (
            <li key={place.id}>
              <button
                type="button"
                aria-expanded={open}
                disabled={!unlocked}
                onClick={() => setOpenId(open ? null : place.id)}
                className={cn(
                  "w-full rounded-2xl border px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                  unlocked ? "border-paper/20 bg-river" : "border-paper/10 bg-ink",
                )}
              >
                <span className="text-sm text-lantern">
                  {unlocked ? "可进" : `还差 ${Math.max(place.need - count, 0)} 间铺`}
                </span>
                <span className="mt-1 block font-serif text-2xl">{place.name}</span>
                <span className="mt-2 block text-sm leading-relaxed text-paper/70">{place.hint}</span>
              </button>
              {open ? (
                <article className="mt-3 rounded-2xl bg-paper p-5 text-ink">
                  <div className="space-y-3 leading-relaxed">
                    {place.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
