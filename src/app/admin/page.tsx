import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { AdminEventTable } from "@/components/AdminEventTable";
import { LogoutButton } from "@/components/LogoutButton";
import { serializeEvent } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { _count: { select: { registrations: true } } },
  });
  const count = await prisma.registration.count();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-[var(--navy)] p-6 text-white">
        <div>
          <h1 className="font-serif text-3xl">Admin dashboard</h1>
          <p className="mt-1 text-sm text-white/70">
            {events.length} events · {count} registrations
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/events/new"
            className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--navy)]"
          >
            Add an event
          </Link>
          <Link
            href="/admin/registrations"
            className="rounded-full border border-white/20 px-4 py-2 text-sm"
          >
            View registered students
          </Link>
          <LogoutButton />
        </div>
      </div>
      <div className="mt-8">
        <Suspense>
          <AdminEventTable
            events={events.map((e) => ({
              ...serializeEvent(e),
              registrationCount: e._count.registrations,
            }))}
          />
        </Suspense>
      </div>
    </main>
  );
}
