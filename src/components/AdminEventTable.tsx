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
    if (!confirm(`WARNING: Terminate node "${name}"? All associated student logs will be permanently purged.`)) {
      return;
    }
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("System error: Could not terminate event.");
      return;
    }
    router.refresh();
  }

  if (events.length === 0) {
    return (
      <div className="border border-neon-cyan/50 bg-neon-cyan/5 p-6 text-center shadow-[inset_0_0_15px_rgba(0,240,255,0.1)]">
        <p className="font-mono text-sm uppercase tracking-widest text-neon-cyan">
          &gt; SYSTEM ALERT: No active nodes detected. Initialize the first event.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-800 bg-[#050505]">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b-2 border-slate-700 bg-slate-900/80 font-mono text-xs uppercase tracking-widest text-slate-400">
          <tr>
            <th className="px-5 py-4 font-semibold">Node ID / Location</th>
            <th className="px-5 py-4 font-semibold">Timestamp</th>
            <th className="px-5 py-4 font-semibold">Class</th>
            <th className="px-5 py-4 font-semibold">Logs</th>
            <th className="px-5 py-4 font-semibold">Command Actions</th>
          </tr>
        </thead>
        <tbody className="font-mono text-sm text-slate-300">
          {events.map((event) => (
            <tr 
              key={event.id} 
              className="border-b border-slate-800 transition-colors hover:bg-slate-900/60"
            >
              <td className="px-5 py-4">
                <div className="font-display font-bold uppercase tracking-wider text-white">
                  {event.name}
                  {event.featured && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-neon-pink animate-pulse" title="Featured"></span>}
                </div>
                <div className="mt-1 text-xs text-slate-500 uppercase tracking-widest">
                  LOC: {event.venue}
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                {formatEventWhen(event.startsAt)}
              </td>
              <td className="px-5 py-4 text-xs">
                <span className="border border-slate-700 bg-slate-800 px-2 py-1 text-neon-cyan">
                  {event.category}
                </span>
              </td>
              <td className="px-5 py-4 font-bold text-white">
                {event.registrationCount}
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="border border-neon-cyan px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_10px_var(--color-neon-cyan)]"
                  >
                    Modify
                  </Link>
                  <Link
                    href={`/admin/registrations?eventId=${event.id}`}
                    className="border border-neon-purple px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neon-purple transition-all hover:bg-neon-purple hover:text-black hover:shadow-[0_0_10px_var(--color-neon-purple)]"
                  >
                    View Logs
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(event.id, event.name)}
                    className="border border-neon-pink px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neon-pink transition-all hover:bg-neon-pink hover:text-white hover:shadow-[0_0_10px_var(--color-neon-pink)]"
                  >
                    Terminate
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