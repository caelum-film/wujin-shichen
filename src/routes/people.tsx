import { createFileRoute, Link } from "@tanstack/react-router";
import { hourIds } from "@/lib/wujin/chronicle";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { people } from "@/lib/wujin/world";
import { BackToStreet, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/people")({
  component: PeoplePage,
  head: () => ({ meta: [{ title: "街上的人 · 雾津十二时" }] }),
});

function PeoplePage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const count = hourIds(new Set(slips.map((slip) => slip.stallId))).length;

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">他们记得你做过的事，不记得你的脸</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">街上的人</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        雾津的人不多。每一个都和阿迟的名字有关，也和你留下的夜笺有关。走得越深，他们越肯把后半句说完。
      </p>
      <ul className="mt-8 space-y-3">
        {people.map((person) => {
          const open = ready && count >= person.need;
          if (!open) {
            return (
              <li key={person.id} className="rounded-2xl border border-paper/10 px-5 py-4">
                <p className="text-sm text-lantern">还差 {Math.max(person.need - count, 0)} 间铺</p>
                <h2 className="mt-1 font-serif text-2xl">{person.name}</h2>
                <p className="mt-2 text-sm text-paper/65">{person.role}</p>
              </li>
            );
          }
          return (
            <li key={person.id}>
              <Link
                to="/people/$id"
                params={{ id: person.id }}
                className="block rounded-2xl border border-paper/20 bg-river px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
              >
                <p className="text-sm text-lantern">{person.where}</p>
                <h2 className="mt-1 font-serif text-2xl">{person.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/75">{person.role}</p>
                <p className="mt-3 text-sm">去听他说</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
