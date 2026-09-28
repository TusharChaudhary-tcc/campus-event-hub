import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EventForm } from "@/components/EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl text-[var(--navy)]">Edit event</h1>
      <p className="mt-2 mb-6 text-sm text-[var(--muted)]">{event.name}</p>
      <EventForm
        eventId={event.id}
        initial={{
          name: event.name,
          description: event.description,
          venue: event.venue,
          startsAt: event.startsAt.toISOString(),
          category: event.category,
          featured: event.featured,
        }}
      />
    </main>
  );
}
