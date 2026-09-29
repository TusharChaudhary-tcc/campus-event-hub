import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, description } = body;

    if (!category || !description) {
      return NextResponse.json(
        { error: "Missing required anomaly data." },
        { status: 400 }
      );
    }

    // Write the bug report to the database
    const feedback = await prisma.feedback.create({
      data: {
        category: String(category),
        description: String(description),
      },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("System error during log transmission:", error);
    return NextResponse.json(
      { error: "Internal system error. Could not write to database." },
      { status: 500 }
    );
  }
}