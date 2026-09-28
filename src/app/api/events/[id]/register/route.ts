import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseRegistrationInput } from "@/lib/validators";
import { serializeRegistration } from "@/lib/constants";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  if (event.startsAt.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "Registration is closed for this event" },
      { status: 400 },
    );
  }
  const parsed = parseRegistrationInput(await request.json());
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  try {
    const registration = await prisma.registration.create({
      data: {
        eventId: id,
        ...parsed.data,
      },
    });
    return NextResponse.json(
      { registration: serializeRegistration(registration) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "This email is already registered for the event" },
      { status: 409 },
    );
  }
}
