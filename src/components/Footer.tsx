import { CLUB } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--navy)] text-[var(--cream)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-serif text-lg">{CLUB.name}</p>
        <p className="text-sm text-white/70">
          {CLUB.chapter} · Built for the campus recruitment task
        </p>
      </div>
    </footer>
  );
}
