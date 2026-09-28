import { notFound } from "next/navigation";
import { CalendarClock, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import { RegisterForm } from "@/components/RegisterForm";
import { formatEventWhen, isUpcoming } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ done?: string }>;
}) {
  const { id } = await params;
  const { done } = await searchParams;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();
  const open = isUpcoming(event.startsAt);

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5">
      <section className="lg:col-span-3 border-l-2 border-slate-800 pl-6 sm:pl-8">
        <div className="inline-block border border-neon-purple bg-neon-purple/10 px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-neon-purple">
          {event.category}
        </div>
        
        <h1 className="mt-6 font-display text-4xl text-white uppercase tracking-wider sm:text-5xl">
          {event.name}
        </h1>
        
        <div className="mt-6 flex flex-col gap-4 border-l-2 border-slate-800 pl-4">
          <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-slate-300">
            <CalendarClock size={18} className="text-neon-cyan" />
            {formatEventWhen(event.startsAt)}
          </p>
          <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider text-slate-300">
            <MapPin size={18} className="text-neon-cyan" />
            {event.venue}
          </p>
        </div>
        
        <div className="mt-8 relative">
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
            {event.description}
          </p>
        </div>
      </section>
      
      <aside className="lg:col-span-2">
        {done === "1" ? (
          <div className="relative border border-[#00ff9d] bg-[#00ff9d]/10 p-6 shadow-[0_0_20px_rgba(0,255,157,0.15)]">
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[#00ff9d]"></div>
            <h3 className="font-display text-lg font-bold text-[#00ff9d] uppercase tracking-widest">
              &gt; Registration Confirmed
            </h3>
            <p className="mt-3 font-mono text-sm text-[#00ff9d]/80 uppercase leading-relaxed">
              Slot secured in the database. See you at {event.venue}.
            </p>
          </div>
        ) : open ? (
          <RegisterForm eventId={event.id} />
        ) : (
          <div className="border border-slate-800 bg-[#050505] p-6 text-center">
            <p className="font-mono text-sm uppercase tracking-widest text-slate-500">
              &gt; System alert: Registration window has elapsed. Access denied.
            </p>
          </div>
        )}
      </aside>
    </main>
  );
}