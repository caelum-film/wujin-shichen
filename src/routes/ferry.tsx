import { createFileRoute, Link } from "@tanstack/react-router";
import { useJournal, useJournalReady } from "@/lib/wujin/store";
import { ferrymanLetter } from "@/lib/wujin/world";
import { BackToStreet, Shell } from "@/components/wujin/chrome";

export const Route = createFileRoute("/ferry")({
  component: FerryPage,
  head: () => ({ meta: [{ title: "渡口 · 雾津十二时" }] }),
});

function FerryPage() {
  const ready = useJournalReady();
  const slips = useJournal((s) => s.slips);
  const letter = ferrymanLetter(ready ? slips : []);

  return (
    <Shell>
      <BackToStreet />
      <p className="mt-4 text-sm text-lantern">老周的船没有班次</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">渡口</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
        他把你已经写下的夜笺重新读一遍，读成一封不寄出的信。信只在舱里给江听。你的原话还在夜记里，他不改。
      </p>

      <article className="mt-8 rounded-2xl bg-paper p-5 text-ink">
        <h2 className="font-serif text-2xl">{ready ? letter.title : "船还在雾里"}</h2>
        <div className="mt-3 space-y-3 leading-relaxed">
          {ready ? (
            letter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>老周在听潮，还没把舱板擦干。</p>
          )}
        </div>
      </article>

      <p className="mt-6 text-sm leading-relaxed text-paper/70">
        想让信更长，就再去一间铺。想看原话，去
        <Link to="/journal" className="text-lantern">
          夜记
        </Link>
        。
      </p>
    </Shell>
  );
}
