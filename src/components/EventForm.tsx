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
      setError(json.error ?? "Could not save event");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
      <label className="grid gap-1 text-sm">
        Event name
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className="h-11 rounded-xl border border-[var(--line)] px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Date & time
        <input
          name="startsAt"
          type="datetime-local"
          required
          defaultValue={initial ? toLocalInput(initial.startsAt) : ""}
          className="h-11 rounded-xl border border-[var(--line)] px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Venue
        <input
          name="venue"
          required
          defaultValue={initial?.venue}
          className="h-11 rounded-xl border border-[var(--line)] px-3"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Category
        <select
          name="category"
          defaultValue={initial?.category ?? "Workshop"}
          className="h-11 rounded-xl border border-[var(--line)] px-3"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Description
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          className="rounded-xl border border-[var(--line)] px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          name="featured"
          type="checkbox"
          defaultChecked={initial?.featured}
        />
        Featured event (shown on home)
      </label>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-full bg-[var(--navy)] px-5 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : eventId ? "Save changes" : "Add event"}
      </button>
    </form>
  );
}
