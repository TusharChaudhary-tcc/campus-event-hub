"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export type EventFormValues = {
  name: string;
  description: string;
  venue: string;
  startsAt: string;
  category: string;
  featured: boolean;
};

function toLocalInput(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  initial,
  eventId,
}: {
  initial?: EventFormValues;
  eventId?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(e.currentTarget);
    const local = String(form.get("startsAt") ?? "");
    const payload = {
      name: String(form.get("name") ?? ""),
      description: String(form.get("description") ?? ""),
      venue: String(form.get("venue") ?? ""),
      startsAt: local ? new Date(local).toISOString() : "",
      category: String(form.get("category") ?? ""),
      featured: form.get("featured") === "on",
    };
    const res = await fetch(eventId ? `/api/events/${eventId}` : "/api/events", {
      method: eventId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { error?: string };
    setPending(false);
    if (!res.ok) {
      setError(json.error ?? "System failure: Could not save event data.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
        [SYS.NODE_ID] / Event Name
        <input
          name="name"
          required
          defaultValue={initial?.name}
          placeholder="ENTER EVENT IDENTIFIER"
          className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
        />
      </label>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
          [SYS.TIMESTAMP] / Date & Time
          <input
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={initial ? toLocalInput(initial.startsAt) : ""}
            className="h-12 w-full rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)] [color-scheme:dark]"
          />
        </label>
        
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
          [SYS.LOCATION] / Venue
          <input
            name="venue"
            required
            defaultValue={initial?.venue}
            placeholder="ENTER COORDINATES OR ROOM"
            className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          />
        </label>
      </div>

      <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
        [SYS.CLASS] / Category
        <select
          name="category"
          defaultValue={initial?.category ?? "Workshop"}
          className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      
      <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
        [SYS.DATA_LOG] / Description
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          placeholder="ENTER EVENT PARAMETERS AND DETAILS..."
          className="resize-none rounded-none border border-slate-700 bg-[#050505] p-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
        />
      </label>
      
      <div className="flex items-center gap-4 border border-slate-800 bg-[#0a0f1d] p-4">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={initial?.featured}
            className="peer h-5 w-5 appearance-none border border-slate-500 bg-[#050505] outline-none transition-all checked:border-neon-cyan checked:bg-neon-cyan/20 focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] cursor-pointer"
          />
          {/* Custom Checkmark Overlay */}
          <div className="pointer-events-none absolute text-neon-cyan opacity-0 peer-checked:opacity-100">
            ✓
          </div>
        </div>
        <div className="grid gap-1">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-white">
            [SYS.PRIORITY_FLAG]
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
            Promote to Home Cluster (Featured Event)
          </p>
        </div>
      </div>
      
      {error ? (
        <div className="border border-neon-pink/50 bg-neon-pink/5 p-4 animate-pulse" role="alert">
          <p className="font-mono text-sm uppercase tracking-widest text-neon-pink">
            &gt; {error}
          </p>
        </div>
      ) : null}
      
      <button
        type="submit"
        disabled={pending}
        className="mt-4 h-14 w-full border border-neon-cyan bg-neon-cyan/10 font-display text-sm font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)] disabled:opacity-50 disabled:hover:bg-neon-cyan/10 disabled:hover:text-neon-cyan disabled:hover:shadow-none"
      >
        {pending 
          ? "Transmitting Data..." 
          : eventId 
            ? "Update Node Configuration" 
            : "Execute Node Initialization"}
      </button>
    </form>
  );
}