import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage() {
  const logs = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-800 bg-[#0a0f1d] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-neon-pink via-neon-purple to-transparent"></div>
        
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
            <span className="text-neon-pink">///</span> Diagnostics Log
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-400">
            &gt; Reviewing user-reported system anomalies and UI defects.
          </p>
        </div>
        
        <Link
          href="/admin"
          className="border border-slate-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
        >
          &lt; Return to Command Center
        </Link>
      </div>

      <div className="grid gap-4">
        {logs.length === 0 ? (
          <div className="border border-neon-cyan/50 bg-neon-cyan/5 p-8 text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-neon-cyan">
              &gt; System nominal. No anomalies detected in the database.
            </p>
          </div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className="border-l-2 border-neon-pink bg-[#050505] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-colors hover:bg-slate-900/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="border border-neon-pink bg-neon-pink/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-neon-pink">
                    {log.category.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    ID: {log.id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <time className="font-mono text-xs text-slate-400">
                  {new Date(log.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                {log.description}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}