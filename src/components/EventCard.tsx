import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { formatEventWhen, isUpcoming } from "@/lib/constants";

export type EventCardData = {
  id: string;
  name: string;
  description: string;
  venue: string;
  startsAt: string | Date;
  category: string;
  featured?: boolean;
};

export function EventCard({
  event,
  registerHref,
}: {
  event: EventCardData;
  registerHref?: string;
}) {
  const upcoming = isUpcoming(event.startsAt);
  const href = registerHref ?? `/events/${event.id}`;

  return (
    <article className="group relative flex h-full flex-col border border-slate-800 bg-[#0a0f1d] p-6 transition-all hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-slate-700 transition-colors group-hover:border-neon-cyan"></div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="border border-neon-purple bg-neon-purple/10 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-neon-purple">
          {event.category}
        </span>
        {event.featured ? (
          <span className="border border-neon-pink bg-neon-pink/10 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-neon-pink shadow-[0_0_8px_rgba(255,0,60,0.2)]">
            Featured
          </span>
        ) : null}
        {!upcoming ? (
          <span className="border border-slate-700 bg-slate-800/50 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Archived
          </span>
        ) : null}
      </div>
      
      <h3 className="font-display text-xl text-white uppercase tracking-wide transition-colors group-hover:text-neon-cyan">
        {event.name}
      </h3>
      
      <div className="mt-4 flex flex-col gap-2 border-l-2 border-slate-800 pl-3 transition-colors group-hover:border-neon-cyan/50">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <CalendarClock size={16} className="text-neon-cyan" />
          {formatEventWhen(event.startsAt)}
        </p>
        <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <MapPin size={16} className="text-neon-cyan" />
          {event.venue}
        </p>
      </div>
      
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
        {event.description}
      </p>
      
      <div className="mt-6">
        {upcoming ? (
          <Link
            href={href}
            className="inline-block border border-neon-cyan bg-transparent px-6 py-2 font-display text-xs font-bold uppercase tracking-widest text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_var(--color-neon-cyan)]"
          >
            Execute Join
          </Link>
        ) : (
          <span className="inline-block border border-slate-700 bg-slate-800/50 px-6 py-2 font-display text-xs font-bold uppercase tracking-widest text-slate-500 cursor-not-allowed">
            Access Denied
          </span>
        )}
      </div>
    </article>
  );
}