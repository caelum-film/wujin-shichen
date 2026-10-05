import { createFileRoute } from "@tanstack/react-router";
import { stallById, type StallId } from "@/lib/wujin/content";
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
      <div className="mt-8">
        <Ritual id={stall.id as StallId} />
      </div>
    </Shell>
  );
}
