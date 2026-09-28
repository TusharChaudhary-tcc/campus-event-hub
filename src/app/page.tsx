import Link from "next/link";
import { prisma } from "@/lib/db";
import { EventCard } from "@/components/EventCard";
import { CLUB, serializeEvent } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const now = new Date();
  const featured = await prisma.event.findFirst({
    where: { featured: true, startsAt: { gte: now } },
    orderBy: { startsAt: "asc" },
  });
  const upcoming = await prisma.event.findMany({
    where: {
      startsAt: { gte: now },
      ...(featured ? { id: { not: featured.id } } : {}),
    },
    orderBy: { startsAt: "asc" },
    take: 6,
  });

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6a0a]">
          {CLUB.chapter}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-[var(--navy)] sm:text-6xl">
          Club nights, contests, and workshops — without the WhatsApp chaos.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          {CLUB.about}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/events"
            className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-medium text-white"
          >
            Browse events
          </Link>
          <a
            href="#featured"
            className="rounded-full border border-[var(--navy)] px-6 py-3 text-sm font-medium text-[var(--navy)]"
          >
            Featured this week
          </a>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <h2 className="font-serif text-3xl text-[var(--navy)]">Featured event</h2>
        {featured ? (
          <div className="mt-5 grid gap-6 lg:grid-cols-5">
            <div className="rounded-3xl bg-[var(--navy)] p-8 text-[var(--cream)] lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                {featured.category}
              </p>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-4 max-w-xl text-white/80">{featured.description}</p>
              <p className="mt-6 text-sm text-[var(--gold)]">
                {featured.venue}
              </p>
              <Link
                href={`/events/${featured.id}`}
                className="mt-8 inline-flex rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)]"
              >
                Register
              </Link>
            </div>
            <div className="lg:col-span-2">
              <EventCard event={serializeEvent(featured)} />
            </div>
          </div>
        ) : (
          <p className="mt-4 text-[var(--muted)]">
            No featured event right now. Check the full list.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl text-[var(--navy)]">
            Upcoming events
          </h2>
          <Link href="/events" className="text-sm font-medium text-[var(--navy)]">
            List all events →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={serializeEvent(event)} />
          ))}
        </div>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-[var(--muted)]">No upcoming events yet.</p>
        ) : null}
      </section>
    </main>
  );
}
