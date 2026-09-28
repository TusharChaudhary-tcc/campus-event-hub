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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-4xl text-[var(--navy)]">All events</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Search by name and filter by category. Open a card to register.
      </p>
      <div className="mt-6">
        <Suspense>
          <SearchFilters />
        </Suspense>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={serializeEvent(event)} />
        ))}
      </div>
      {events.length === 0 ? (
        <p className="mt-8 text-[var(--muted)]">No events match that search.</p>
      ) : null}
    </main>
  );
}
