"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatEventWhen } from "@/lib/constants";

export type AdminEventRow = {
  id: string;
  name: string;
  venue: string;
  startsAt: string;
  category: string;
  featured: boolean;
  registrationCount: number;
};

export function AdminEventTable({ events }: { events: AdminEventRow[] }) {
  const router = useRouter();

  async function remove(id: string, name: string) {
    if (!confirm(`Delete “${name}”? Registrations for this event will be removed too.`)) {
      return;
    }
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Could not delete event");
      return;
    }
    router.refresh();
  }

  if (events.length === 0) {
    return <p className="text-[var(--muted)]">No events yet. Add the first one.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--line)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--cream)] text-[var(--navy)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Event</th>
            <th className="px-4 py-3 font-semibold">When</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Regs</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t border-[var(--line)]">
              <td className="px-4 py-3">
                <div className="font-medium text-[var(--navy)]">{event.name}</div>
                <div className="text-xs text-[var(--muted)]">{event.venue}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-[var(--muted)]">
                {formatEventWhen(event.startsAt)}
              </td>
              <td className="px-4 py-3">{event.category}</td>
              <td className="px-4 py-3">{event.registrationCount}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/registrations?eventId=${event.id}`}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs"
                  >
                    Students
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(event.id, event.name)}
                    className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
