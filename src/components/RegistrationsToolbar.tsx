"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function RegistrationsToolbar({
  events,
}: {
  events: { id: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const eventId = params.get("eventId") ?? "";

  function go(next: { q?: string; eventId?: string }) {
    const sp = new URLSearchParams();
    const qv = next.q ?? q;
    const ev = next.eventId ?? eventId;
    if (qv) sp.set("q", qv);
    if (ev) sp.set("eventId", ev);
    const qs = sp.toString();
    router.push(qs ? `/admin/registrations?${qs}` : "/admin/registrations");
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        go({
          q: String(data.get("q") ?? ""),
          eventId: String(data.get("eventId") ?? ""),
        });
      }}
    >
      <input
        name="q"
        defaultValue={q}
        placeholder="Search registrations"
        className="h-11 flex-1 rounded-xl border border-[var(--line)] px-4 text-sm"
      />
      <select
        name="eventId"
        defaultValue={eventId}
        className="h-11 rounded-xl border border-[var(--line)] px-3 text-sm"
        onChange={(e) => go({ eventId: e.target.value })}
      >
        <option value="">All events</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-11 rounded-xl bg-[var(--navy)] px-5 text-sm text-white"
      >
        Search
      </button>
    </form>
  );
}
