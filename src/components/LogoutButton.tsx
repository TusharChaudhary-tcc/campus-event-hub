"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        start(async () => {
          await fetch("/api/admin/logout", { method: "POST" });
          router.push("/admin/login");
          router.refresh();
        });
      }}
      className="border border-slate-700 bg-transparent px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-pink hover:bg-neon-pink/5 hover:text-neon-pink hover:shadow-[0_0_15px_rgba(255,0,60,0.2)] disabled:opacity-50 disabled:hover:border-slate-700 disabled:hover:text-slate-300 disabled:hover:shadow-none"
    >
      {pending ? "Terminating..." : "Disconnect"}
    </button>
  );
}