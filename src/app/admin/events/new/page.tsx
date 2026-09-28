import { EventForm } from "@/components/EventForm";

export default function NewEventPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl text-[var(--navy)]">Add an event</h1>
      <p className="mt-2 mb-6 text-sm text-[var(--muted)]">
        Students will see this on Home and Events as soon as you save.
      </p>
      <EventForm />
    </main>
  );
}
