import { createFileRoute, Link } from "@tanstack/react-router";
import { stallById, type StallId } from "@/lib/wujin/content";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { BackToStreet, Shell } from "@/components/wujin/chrome";
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
        做完{name}的这件小事，长夜会翻开对应的一页。
      </p>
    );
  }
  return (
    <Link to="/night" className="mt-4 inline-flex min-h-11 items-center text-sm text-lantern">
      这一辰已经写进长夜
    </Link>
  );
}
