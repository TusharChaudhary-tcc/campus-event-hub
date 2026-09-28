import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { parseEventInput } from "@/lib/validators";
import { serializeEvent } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const category = request.nextUrl.searchParams.get("category")?.trim() ?? "";

  const events = await prisma.event.findMany({
    where: {
      AND: [
        q
          ? { name: { contains: q } }
          : {},
        category && category !== "All" ? { category } : {},
      ],
    },
    orderBy: { startsAt: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  return NextResponse.json({
    events: events.map((e) => ({
      ...serializeEvent(e),
      registrationCount: e._count.registrations,
    })),
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = parseEventInput(await request.json());
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (parsed.data.featured) {
    await prisma.event.updateMany({ data: { featured: false } });
  }
  const event = await prisma.event.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      venue: parsed.data.venue,
      startsAt: new Date(parsed.data.startsAt),
      category: parsed.data.category,
      featured: Boolean(parsed.data.featured),
    },
  });
  return NextResponse.json({ event: serializeEvent(event) }, { status: 201 });
}
