import { createFileRoute, Link } from "@tanstack/react-router";
import { stallById, type StallId } from "@/lib/wujin/content";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { BackToStreet, Shell } from "@/components/wujin/chrome";
import { tidalByStall, hexGlyph } from "@/lib/wujin/yijing";
import { hexagramByNumber } from "@/lib/wujin/hexagrams";
import { Ritual } from "@/components/wujin/rituals";

export const Route = createFileRoute("/stall/$id")({
  component: StallPage,
  head: ({ params }) => {
    const stall = stallById(params.id);
    return {
      meta: [{ title: stall ? `${stall.name} · 雾津十二时` : "雾津十二时" }],
    };
  },
});

function StallPage() {
  const { id } = Route.useParams();
  const stall = stallById(id);

  if (!stall) {
    return (
      <Shell>
        <BackToStreet />
        <h1 className="mt-6 font-serif text-3xl">这间铺子没有开门</h1>
        <p className="mt-3 text-paper/75">雾津只有十二个时辰。长街上找不到这个门牌。</p>
      </Shell>
    );
  }

  const Icon = stall.icon;

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 flex items-center gap-2 text-sm text-lantern">
        <Icon className="size-4" aria-hidden />
        {stall.branch}时 · {stall.hours}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{stall.name}</h1>
      {tidalByStall(stall.id) ? (
        <p className="mt-3 text-sm text-lantern">
          <span className="mr-2 font-serif text-2xl" aria-hidden>
            {hexGlyph(tidalByStall(stall.id)!.hex)}
          </span>
          消息卦 · {tidalByStall(stall.id)?.name} · {tidalByStall(stall.id)?.motion}
        </p>
      ) : null}
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">{stall.ritual}</p>
      <NightNote stallId={stall.id} name={stall.name} />
      <div className="mt-8">
        <Ritual id={stall.id as StallId} />
      </div>
    </Shell>
  );
}

function NightNote({ stallId, name }: { stallId: string; name: string }) {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const open = ready && slips.some((slip) => slip.stallId === stallId);
  if (!ready) return null;
  if (!open) {
    return (
      <p className="mt-4 text-sm leading-relaxed text-paper/60">
        做完{name}的这件小事，长夜会翻开对应的一页，这一辰的消息卦也会把话说完。
      </p>
    );
  }
  const tide = tidalByStall(stallId);
  const hex = tide ? hexagramByNumber(tide.hex) : undefined;
  return (
    <div className="mt-4">
      <Link to="/night" className="inline-flex min-h-11 items-center text-sm text-lantern">
        这一辰已经写进长夜
      </Link>
      {hex ? (
        <article className="mt-3 rounded-2xl bg-paper p-5 text-ink">
          <p className="text-sm text-cinnabar">消息卦说完了</p>
          <h2 className="mt-1 font-serif text-2xl">
            {hexGlyph(hex.n)} {hex.name}
          </h2>
          <p className="mt-3 font-serif text-lg leading-relaxed">{hex.text}</p>
          <p className="mt-3 leading-relaxed">{hex.image}</p>
          <Link
            to="/yi/cast"
            search={{ q: `从${tide?.branch}时的${hex.name}再问一次` }}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-cinnabar"
          >
            带着这一辰去问江
          </Link>
        </article>
      ) : null}
    </div>
  );
}
