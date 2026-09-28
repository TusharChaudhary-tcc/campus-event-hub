import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { formatEventWhen } from "@/lib/constants";
import { RegistrationsToolbar } from "@/components/RegistrationsToolbar";

export const dynamic = "force-dynamic";

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; eventId?: string }>;
}) {
  const { q = "", eventId = "" } = await searchParams;
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    select: { id: true, name: true },
  });
  const rows = await prisma.registration.findMany({
    where: {
      AND: [
        eventId ? { eventId } : {},
        q
          ? {
              OR: [
                { name: { contains: q } },
                { email: { contains: q } },
                { collegeYear: { contains: q } },
                { phone: { contains: q } },
              ],
            }
          : {},
      ],
    },
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl text-[var(--navy)]">
        Registered students
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Search by name, email, college/year, or phone. Filter by event.
      </p>
      <div className="mt-6">
        <Suspense>
          <RegistrationsToolbar events={events} />
        </Suspense>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--cream)]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">College / Year</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">{row.collegeYear}</td>
                <td className="px-4 py-3">{row.phone}</td>
                <td className="px-4 py-3">{row.event.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {formatEventWhen(row.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-6 text-[var(--muted)]">No matching registrations.</p>
        ) : null}
      </div>
    </main>
  );
}
