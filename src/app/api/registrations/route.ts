import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { serializeRegistration } from "@/lib/constants";

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const eventId = request.nextUrl.searchParams.get("eventId")?.trim() ?? "";

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

  return NextResponse.json({
    registrations: rows.map((row) => ({
      ...serializeRegistration(row),
      event: {
        id: row.event.id,
        name: row.event.name,
        category: row.event.category,
      },
    })),
  });
}
