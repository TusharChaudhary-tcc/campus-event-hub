import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: { eventId?: string };
}) {
  const where = searchParams.eventId ? { eventId: searchParams.eventId } : {};
  const registrations = await prisma.registration.findMany({
    where,
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-800 bg-[#0a0f1d] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-neon-purple via-neon-cyan to-transparent"></div>
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
            <span className="text-neon-purple">///</span> Student Logs
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-400">
            &gt; Querying {registrations.length} total active registrations.
          </p>
        </div>
        <Link
          href="/admin"
          className="border border-slate-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
        >
          &lt; Command Center
        </Link>
      </div>

      <div className="overflow-x-auto border border-slate-800 bg-[#050505]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b-2 border-slate-700 bg-slate-900/80 font-mono text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-5 py-4 font-semibold">User Data</th>
              <th className="px-5 py-4 font-semibold">Contact</th>
              <th className="px-5 py-4 font-semibold">Target Node</th>
              <th className="px-5 py-4 font-semibold">Timestamp</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm text-slate-300">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-neon-cyan">
                  &gt; SYSTEM ALERT: No registration logs found.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id} className="border-b border-slate-800 transition-colors hover:bg-slate-900/60">
                  <td className="px-5 py-4 font-display font-bold uppercase tracking-wider text-white">
                    {reg.name}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {reg.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className="border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-neon-cyan">
                      {reg.event.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {new Date(reg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}