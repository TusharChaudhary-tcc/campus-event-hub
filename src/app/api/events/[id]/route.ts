import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { parseEventInput } from "@/lib/validators";
import { serializeEvent } from "@/lib/constants";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({
    event: {
      ...serializeEvent(event),
      registrationCount: event._count.registrations,
    },
  });
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  const parsed = parseEventInput(await request.json());
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  if (parsed.data.featured) {
    await prisma.event.updateMany({ data: { featured: false } });
  }
  const event = await prisma.event.update({
    where: { id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      venue: parsed.data.venue,
      startsAt: new Date(parsed.data.startsAt),
      category: parsed.data.category,
      featured: Boolean(parsed.data.featured),
    },
  });
  return NextResponse.json({ event: serializeEvent(event) });
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await prisma.event.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
