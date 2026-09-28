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
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-5">
      <section className="lg:col-span-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#8a6a0a]">
          {event.category}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-[var(--navy)]">
          {event.name}
        </h1>
        <p className="mt-4 flex items-center gap-2 text-[var(--muted)]">
          <CalendarClock size={18} />
          {formatEventWhen(event.startsAt)}
        </p>
        <p className="mt-2 flex items-center gap-2 text-[var(--muted)]">
          <MapPin size={18} />
          {event.venue}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8">{event.description}</p>
      </section>
      <aside className="lg:col-span-2">
        {done === "1" ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-green-900">
            You are registered. See you at {event.venue}.
          </div>
        ) : open ? (
          <RegisterForm eventId={event.id} />
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 text-[var(--muted)]">
            Registration is closed for this event.
          </div>
        )}
      </aside>
    </main>
  );
}
