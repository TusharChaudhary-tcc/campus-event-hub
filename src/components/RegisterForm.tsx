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
      setError(json.error ?? "Could not submit registration");
      return;
    }
    router.push(`/events/${eventId}?done=1`);
    router.refresh();
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6"
    >
      <h2 className="font-serif text-2xl text-[var(--navy)]">
        Event registration
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Name, email, college/year, and phone. We’ll use this at the door.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-1 text-sm">
          Name
          <input
            name="name"
            required
            className="h-11 rounded-xl border border-[var(--line)] px-3"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            className="h-11 rounded-xl border border-[var(--line)] px-3"
          />
        </label>
        <label className="grid gap-1 text-sm">
          College / Year
          <input
            name="collegeYear"
            required
            placeholder="e.g. 2nd Year, CSE"
            className="h-11 rounded-xl border border-[var(--line)] px-3"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Phone number
          <input
            name="phone"
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            placeholder="10 digits"
            className="h-11 rounded-xl border border-[var(--line)] px-3"
          />
        </label>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--navy)] disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit registration"}
      </button>
    </form>
  );
}
