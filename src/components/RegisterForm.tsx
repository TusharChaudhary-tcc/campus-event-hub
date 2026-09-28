"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch(`/api/events/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as { error?: string };
    setPending(false);
    if (!res.ok) {
      setError(json.error ?? "Authentication failed. Could not write to database.");
      return;
    }
    router.push(`/events/${eventId}?done=1`);
    router.refresh();
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative border border-slate-800 bg-[#0a0f1d]/80 p-6 backdrop-blur-sm sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      {/* Cyber Decor */}
      <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-neon-cyan"></div>
      
      <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
        <span className="text-neon-cyan">///</span> Secure Uplink
      </h2>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-400">
        &gt; Enter credentials for verification. Data will be logged for entry access.
      </p>
      
      <div className="mt-8 grid gap-6">
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
          [SYS.ID_NAME]
          <input
            name="name"
            required
            placeholder="ENTER FULL NAME"
            className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          />
        </label>
        
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
          [SYS.CONTACT_EMAIL]
          <input
            name="email"
            type="email"
            required
            placeholder="ENTER EMAIL ADDRESS"
            className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          />
        </label>
        
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
          [SYS.NODE_SECTOR]
          <input
            name="collegeYear"
            required
            placeholder="e.g. 2nd Year, CSE"
            className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          />
        </label>
        
        <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
          [SYS.COMM_LINK]
          <input
            name="phone"
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            placeholder="10 DIGIT NUMBER"
            className="h-12 rounded-none border border-slate-700 bg-[#050505] px-4 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
          />
        </label>
      </div>
      
      {error ? (
        <div className="mt-6 border border-neon-pink/50 bg-neon-pink/5 p-3" role="alert">
          <p className="font-mono text-xs uppercase tracking-widest text-neon-pink">
            &gt; ERROR: {error}
          </p>
        </div>
      ) : null}
      
      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full border border-neon-cyan bg-neon-cyan/10 px-4 py-4 font-display text-sm font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)] disabled:opacity-50 disabled:hover:bg-neon-cyan/10 disabled:hover:text-neon-cyan disabled:hover:shadow-none"
      >
        {pending ? "Executing Sequence..." : "Commit Registration"}
      </button>
    </form>
  );
}