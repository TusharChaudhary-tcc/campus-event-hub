import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EventForm } from "@/components/EventForm";
import { serializeEvent } from "@/lib/constants";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-800 bg-[#0a0f1d] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent"></div>
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
            <span className="text-neon-cyan">///</span> Modify Node
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-400">
            &gt; Reconfiguring existing event parameters.
          </p>
        </div>
        <Link
          href="/admin"
          className="border border-slate-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_10px_rgba(255,0,60,0.2)]"
        >
          &lt; Abort Sequence
        </Link>
      </div>
      <div className="relative border border-slate-800 bg-[#050505] p-6 sm:p-8">
        <EventForm initial={serializeEvent(event)} eventId={event.id} />
      </div>
    </main>
  );
}