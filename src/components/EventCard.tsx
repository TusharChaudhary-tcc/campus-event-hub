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
    <article className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[0_10px_30px_-24px_rgba(18,38,58,0.45)]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--navy)]">
          {event.category}
        </span>
        {event.featured ? (
          <span className="rounded-full bg-[var(--gold)]/20 px-3 py-1 text-xs font-semibold text-[#8a6a0a]">
            Featured
          </span>
        ) : null}
        {!upcoming ? (
          <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">
            Past
          </span>
        ) : null}
      </div>
      <h3 className="font-serif text-xl text-[var(--navy)]">{event.name}</h3>
      <p className="mt-2 flex items-start gap-2 text-sm text-[var(--muted)]">
        <CalendarClock size={16} className="mt-0.5 shrink-0" />
        {formatEventWhen(event.startsAt)}
      </p>
      <p className="mt-1 flex items-start gap-2 text-sm text-[var(--muted)]">
        <MapPin size={16} className="mt-0.5 shrink-0" />
        {event.venue}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[var(--ink)]">
        {event.description}
      </p>
      <div className="mt-5">
        {upcoming ? (
          <Link
            href={href}
            className="inline-flex rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--ink)]"
          >
            Register
          </Link>
        ) : (
          <span className="inline-flex rounded-full bg-zinc-200 px-4 py-2 text-sm text-zinc-500">
            Closed
          </span>
        )}
      </div>
    </article>
  );
}
