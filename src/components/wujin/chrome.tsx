import { Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useJournal, useJournalReady } from "@/lib/wujin/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Shell({ children }: { children: ReactNode }) {
  useJournalReady();
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <TopBar />
      <main className="mx-auto w-full max-w-3xl px-5 py-8">{children}</main>
    </div>
  );
}

export function TopBar() {
  const ready = useJournalReady();
  const count = useJournal((s) => s.slips.length);
  return (
    <header className="sticky top-0 z-10 border-b border-paper/10 bg-ink/95">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
        <Link
          to="/"
          className="font-serif text-lg font-semibold text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
        >
          雾津十二时
        </Link>
        <Link
          to="/journal"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-lantern focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
        >
          <BookMarked className="size-4" aria-hidden />
          夜记{ready && count > 0 ? ` · ${count}` : ""}
        </Link>
      </div>
      <nav className="mx-auto flex max-w-3xl flex-wrap gap-x-4 px-5 pb-2 text-sm">
        <NavLink to="/night">长夜</NavLink>
        <NavLink to="/yi">易</NavLink>
        <NavLink to="/city">城志</NavLink>
        <NavLink to="/ferry">渡口</NavLink>
        <NavLink to="/people">街上的人</NavLink>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: "/night" | "/yi" | "/city" | "/ferry" | "/people"; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center text-paper/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-cinnabar px-5 text-sm font-medium text-paper transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/25 px-5 text-sm text-paper transition hover:border-lantern focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string; note?: string }[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-serif text-lg">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(option.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern",
                on
                  ? "border-cinnabar bg-cinnabar text-paper"
                  : "border-paper/25 text-paper hover:border-lantern",
              )}
            >
              {option.label}
              {option.note ? (
                <span className={on ? "text-paper/85" : "text-lantern"}> · {option.note}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function InkButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 px-5 text-sm text-ink transition hover:border-cinnabar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
export function Paper({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <article className="mt-6 rounded-2xl bg-paper p-5 text-ink">
      <h2 className="font-serif text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed">{children}</div>
      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
}

export function BackToStreet() {
  return (
    <Link
      to="/"
      className="inline-flex min-h-11 items-center text-sm text-lantern focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lantern"
    >
      返回长街
    </Link>
  );
}
