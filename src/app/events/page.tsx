import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import { SearchFilters } from "@/components/SearchFilters";
import { serializeEvent } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  const events = await prisma.event.findMany({
    where: {
      AND: [
        q ? { name: { contains: q } } : {},
        category && category !== "All" ? { category } : {},
      ],
    },
    orderBy: { startsAt: "asc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="font-display text-4xl text-white uppercase tracking-wider">
          <span className="text-neon-cyan">///</span> Event Log
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm uppercase tracking-widest text-slate-400">
          &gt; Query active databases. Filter by class. Initialize registration sequence to secure your slot.
        </p>
      </div>

      <div className="mt-8 relative border border-slate-800 bg-[#0a0f1d]/50 p-1">
        {/* Decorative scanline effect for the filter container */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-50"></div>
        <div className="p-4">
          <Suspense fallback={
            <div className="font-mono text-sm uppercase tracking-widest text-neon-cyan animate-pulse">
              &gt; Loading search modules...
            </div>
          }>
            <SearchFilters />
          </Suspense>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={serializeEvent(event)} />
        ))}
      </div>
      
      {events.length === 0 ? (
        <div className="mt-10 border border-neon-pink/50 bg-neon-pink/5 p-6 text-center shadow-[inset_0_0_20px_rgba(255,0,60,0.1)]">
          <p className="font-mono text-sm uppercase tracking-widest text-neon-pink">
            &gt; Error 404: No event modules match the current query parameters.
          </p>
        </div>
      ) : null}
    </main>
  );
}