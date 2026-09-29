"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!res.ok) {
      setError("ACCESS DENIED: Invalid authentication hash.");
      return;
    }
    router.push(params.get("from") || "/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <div className="relative border border-slate-800 bg-[#0a0f1d]/90 p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        {/* Cyber Decor */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent"></div>
        <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-neon-cyan mt-2 mr-2"></div>

        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white">
          <span className="text-neon-cyan">///</span> Root Access
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slate-400">
          &gt; Default override key is <code className="text-neon-purple">clubadmin123</code>
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6">
          <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-slate-300">
            [SYS.AUTH_KEY]
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="ENTER PASSWORD"
                className="h-12 w-full rounded-none border border-slate-700 bg-[#050505] pl-4 pr-12 font-mono text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-neon-cyan focus:shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition-colors hover:text-neon-cyan"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          
          {error ? (
            <div className="border border-neon-pink/50 bg-neon-pink/5 p-3 animate-pulse" role="alert">
              <p className="font-mono text-xs uppercase tracking-widest text-neon-pink">
                &gt; ERROR: {error}
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-4 h-14 w-full border border-neon-cyan bg-neon-cyan/10 font-display text-sm font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)] disabled:opacity-50 disabled:hover:bg-neon-cyan/10 disabled:hover:text-neon-cyan disabled:hover:shadow-none"
          >
            {pending ? "Authenticating..." : "Initialize Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}