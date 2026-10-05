import { createFileRoute, Link } from "@tanstack/react-router";
import { hourIds } from "@/lib/wujin/chronicle";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { personById } from "@/lib/wujin/world";
import { BackToStreet, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/people/$id")({
  component: PersonPage,
  head: ({ params }) => ({
    meta: [{ title: `${personById(params.id)?.name ?? "街上的人"} · 雾津十二时` }],
  }),
});

function PersonPage() {
  const { id } = Route.useParams();
  const person = personById(id);
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const count = hourIds(new Set(slips.map((slip) => slip.stallId))).length;
  const open = ready && person ? count >= person.need : false;

  if (!person) {
    return (
      <Shell>
        <BackToStreet />
        <h1 className="mt-6 font-serif text-3xl">这个人不在街上</h1>
      </Shell>
    );
  }

  return (
    <Shell>
      <Link
        to="/people"
        className="inline-flex min-h-11 items-center text-sm text-lantern"
      >
        返回街上
      </Link>
      <p className="mt-4 text-sm text-lantern">{person.where}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{person.name}</h1>
      <p className="mt-2 text-paper/75">{person.role}</p>
      {open ? (
        <>
          <article className="mt-6 space-y-3 rounded-2xl bg-paper p-5 leading-relaxed text-ink">
            {person.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <aside className="mt-4 rounded-2xl border border-lantern/40 bg-river p-5">
            <p className="text-sm text-lantern">此刻对你说</p>
            <p className="mt-2 font-serif text-xl leading-relaxed">{person.aside(count)}</p>
          </aside>
        </>
      ) : (
        <p className="mt-6 leading-relaxed text-paper/75">
          {person.name}还在门后。再留下几张夜笺，他才肯出来把话说完。
        </p>
      )}
    </Shell>
  );
}
