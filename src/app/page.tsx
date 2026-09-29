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
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-neon-purple drop-shadow-[0_0_8px_var(--color-neon-purple)]">
          {CLUB.chapter}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-white sm:text-6xl uppercase tracking-wide">
          Club nights, contests, and workshops — <span className="text-neon-cyan">without the WhatsApp chaos.</span>
        </h1>
        {/* <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-white sm:text-6xl uppercase tracking-wide">
  ALGORITHMIC ARENAS & DEV QUESTS — <span className="text-neon-cyan">LEVEL UP YOUR TECH STACK.</span>
</h1> */}
<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
  Join the lobby. From weekly logic scrimmages to full-scale hackathons, this is where theory meets execution. Pick your stack, join the queue, and boost your developer rank.
</p>
        {/* <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          {CLUB.about}
        </p> */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="border-2 border-neon-cyan bg-neon-cyan/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)]"
          >
            Browse events
          </Link>
          <a
            href="#featured"
            className="border-2 border-slate-700 bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-neon-purple hover:text-neon-purple hover:shadow-[0_0_15px_var(--color-neon-purple)]"
          >
            Featured this week
          </a>
        </div>
      </section>

      {/* Featured Event Section */}
      <section id="featured" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl text-white">
          <span className="text-neon-pink">///</span> Featured Event
        </h2>
        
        {featured ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            <div className="relative border border-slate-800 bg-[#0f172a]/80 p-8 text-white backdrop-blur-md lg:col-span-3 border-l-4 border-l-neon-pink shadow-[0_0_30px_rgba(255,0,60,0.1)]">
              {/* Decorative Corner Cyber Element */}
              <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-slate-700"></div>
              
              <p className="text-xs font-bold uppercase tracking-widest text-neon-pink">
                {featured.category}
              </p>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl text-white">
                {featured.name}
              </h3>
              <p className="mt-5 max-w-xl text-slate-400 leading-relaxed">
                {featured.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-neon-cyan uppercase tracking-wider">
                <span className="h-2 w-2 bg-neon-cyan rounded-full animate-pulse"></span>
                {featured.venue}
              </div>
              <Link
                href={`/events/${featured.id}`}
                className="mt-8 inline-block border border-neon-pink bg-neon-pink/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-neon-pink transition-all hover:bg-neon-pink hover:text-white hover:shadow-[0_0_20px_var(--color-neon-pink)]"
              >
                Initialize Registration
              </Link>
            </div>
            <div className="lg:col-span-2">
              <EventCard event={serializeEvent(featured)} />
            </div>
          </div>
        ) : (
          <p className="mt-6 text-slate-500 border border-slate-800 bg-slate-900/50 p-6 font-mono text-sm uppercase">
            &gt; System alert: No featured events located in the mainframe.
          </p>
        )}
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <h2 className="font-display text-3xl text-white">
             <span className="text-neon-cyan">///</span> Upcoming Database
          </h2>
          <Link 
            href="/events" 
            className="text-sm font-bold uppercase tracking-wider text-neon-cyan transition-all hover:text-white hover:drop-shadow-[0_0_8px_var(--color-neon-cyan)]"
          >
            Access Full Log →
          </Link>
        </div>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={serializeEvent(event)} />
          ))}
        </div>
        
        {upcoming.length === 0 ? (
          <p className="mt-6 text-slate-500 border border-slate-800 bg-slate-900/50 p-6 font-mono text-sm uppercase">
            &gt; System alert: Event queue is currently empty.
          </p>
        ) : null}
      </section>
    </main>
  );
}