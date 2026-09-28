"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export function SearchFilters({ action = "/events" }: { action?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "All";

  function apply(next: { q?: string; category?: string }) {
    const sp = new URLSearchParams();
    const qv = next.q ?? q;
    const cv = next.category ?? category;
    if (qv) sp.set("q", qv);
    if (cv && cv !== "All") sp.set("category", cv);
    const qs = sp.toString();
    router.push(qs ? `${action}?${qs}` : action);
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      action={action}
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        apply({
          q: String(data.get("q") ?? ""),
          category: String(data.get("category") ?? "All"),
        });
      }}
    >
      <input
        name="q"
        defaultValue={q}
        placeholder="Search events by name"
        className="h-11 flex-1 rounded-xl border border-[var(--line)] bg-white px-4 text-sm outline-none ring-[var(--gold)] focus:ring-2"
      />
      <select
        name="category"
        defaultValue={category}
        className="h-11 rounded-xl border border-[var(--line)] bg-white px-3 text-sm outline-none ring-[var(--gold)] focus:ring-2"
        onChange={(e) => apply({ category: e.target.value })}
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-11 rounded-xl bg-[var(--navy)] px-5 text-sm font-medium text-white"
      >
        Search
      </button>
    </form>
  );
}
