import { CATEGORIES } from "./constants";

export type EventInput = {
  name: string;
  description: string;
  venue: string;
  startsAt: string;
  category: string;
  featured?: boolean;
};

export type RegistrationInput = {
  name: string;
  email: string;
  collegeYear: string;
  phone: string;
};

function required(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    return `${field} is required`;
  }
  return null;
}

export function parseEventInput(body: unknown):
  | { ok: true; data: EventInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload" };
  }
  const b = body as Record<string, unknown>;
  const nameErr = required(b.name, "Event name");
  const descErr = required(b.description, "Description");
  const venueErr = required(b.venue, "Venue");
  const dateErr = required(b.startsAt, "Date & time");
  const catErr = required(b.category, "Category");
  const first = nameErr || descErr || venueErr || dateErr || catErr;
  if (first) return { ok: false, error: first };

  const startsAt = String(b.startsAt);
  if (Number.isNaN(new Date(startsAt).getTime())) {
    return { ok: false, error: "Date & time is not valid" };
  }
  if (!CATEGORIES.includes(b.category as (typeof CATEGORIES)[number])) {
    return { ok: false, error: "Unknown category" };
  }

  return {
    ok: true,
    data: {
      name: String(b.name).trim(),
      description: String(b.description).trim(),
      venue: String(b.venue).trim(),
      startsAt,
      category: String(b.category),
      featured: Boolean(b.featured),
    },
  };
}

export function parseRegistrationInput(body: unknown):
  | { ok: true; data: RegistrationInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid payload" };
  }
  const b = body as Record<string, unknown>;
  const nameErr = required(b.name, "Name");
  const emailErr = required(b.email, "Email");
  const yearErr = required(b.collegeYear, "College / year");
  const phoneErr = required(b.phone, "Phone number");
  const first = nameErr || emailErr || yearErr || phoneErr;
  if (first) return { ok: false, error: first };

  const email = String(b.email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email" };
  }
  const phone = String(b.phone).replace(/\s+/g, "");
  if (!/^[0-9]{10}$/.test(phone)) {
    return { ok: false, error: "Phone must be 10 digits" };
  }

  return {
    ok: true,
    data: {
      name: String(b.name).trim(),
      email,
      collegeYear: String(b.collegeYear).trim(),
      phone,
    },
  };
}
