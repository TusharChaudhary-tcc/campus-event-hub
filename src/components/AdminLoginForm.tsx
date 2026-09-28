"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

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
      setError("Wrong password");
      return;
    }
    router.push(params.get("from") || "/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-serif text-3xl text-[var(--navy)]">Admin login</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Default password is <code>clubadmin123</code> (see README).
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Password
          <input
            name="password"
            type="password"
            required
            className="h-11 rounded-xl border border-[var(--line)] px-3"
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-full bg-[var(--navy)] text-sm font-medium text-white"
        >
          {pending ? "Signing in…" : "Enter dashboard"}
        </button>
      </form>
    </main>
  );
}
