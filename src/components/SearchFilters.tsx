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
      className="flex flex-col gap-4 sm:flex-row"
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
      <div className="relative flex-1">
        {/* Terminal Input Prompt */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-mono text-neon-cyan animate-pulse">
          &gt;
        </span>
        <input
          name="q"
          defaultValue={q}
          placeholder="SEARCH EVENT DATABASE..."
          className="h-12 w-full rounded-none border border-slate-700 bg-[#050505] pl-10 pr-4 font-mono text-sm uppercase tracking-wider text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
        />
      </div>
      
      <div className="relative sm:w-64">
        <select
          name="category"
          defaultValue={category}
          className="h-12 w-full appearance-none rounded-none border border-slate-700 bg-[#050505] pl-4 pr-10 font-mono text-sm uppercase tracking-wider text-white outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          onChange={(e) => apply({ category: e.target.value })}
        >
          <option value="All" className="bg-[#0f172a] text-white">ALL CLASSES</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0f172a] text-white">
              {c.toUpperCase()}
            </option>
          ))}
        </select>
        {/* Custom Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-neon-cyan">
          ▼
        </div>
      </div>

      <button
        type="submit"
        className="h-12 border border-neon-cyan bg-neon-cyan/10 px-8 font-display text-sm font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)]"
      >
        Execute
      </button>
    </form>
  );
}