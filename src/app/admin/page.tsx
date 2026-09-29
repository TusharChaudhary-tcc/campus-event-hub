import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { AdminEventTable } from "@/components/AdminEventTable";
import { LogoutButton } from "@/components/LogoutButton";
import { serializeEvent } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { _count: { select: { registrations: true } } },
  });
  const count = await prisma.registration.count();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="relative flex flex-wrap items-start justify-between gap-6 border border-slate-800 bg-[#0a0f1d] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Cyber Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-transparent"></div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neon-purple mb-2 animate-pulse">
            &gt; SYS.ROOT_ACCESS_GRANTED
          </p>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white">
            Command <span className="text-neon-cyan">Center</span>
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-wider text-slate-400">
            Active Nodes: <span className="text-white">{events.length}</span> <span className="mx-2 text-slate-700">|</span> 
            Total Logs: <span className="text-white">{count}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/events/new"
            className="border border-neon-cyan bg-neon-cyan/10 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_var(--color-neon-cyan)]"
          >
            + Initialize Node
          </Link>
          <Link
            href="/admin/registrations"
            className="border border-slate-700 bg-transparent px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-purple hover:bg-neon-purple/5 hover:text-neon-purple"
          >
            Query Database
          </Link>
          <Link
            href="/admin/feedback"
            className="border border-slate-700 bg-transparent px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-pink hover:bg-neon-pink/5 hover:text-neon-pink"
          >
            View Diagnostics
          </Link>
          <LogoutButton />
        </div>
      </div>
      
      <div className="mt-8 border border-slate-800 bg-[#050505] p-1">
        <Suspense fallback={
          <div className="p-10 text-center font-mono text-sm uppercase tracking-widest text-neon-cyan animate-pulse">
            &gt; Connecting to admin tables...
          </div>
        }>
          <AdminEventTable
            events={events.map((e) => ({
              ...serializeEvent(e),
              registrationCount: e._count.registrations,
            }))}
          />
        </Suspense>
      </div>
    </main>
  );
}