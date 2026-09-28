export const CATEGORIES = [
  "Workshop",
  "Contest",
  "Talk",
  "Hackathon",
  "Social",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CLUB = {
  name: "Campus Event Hub",
  chapter: "CodeChef Campus Chapter",
  tagline: "Contests, workshops, and campus nights — in one place.",
  about:
    "We are the college coding club: weekly practice, talks from seniors, and events that actually fill the lab. Whether you are opening CodeChef for the first time or hunting a 4-star rating, there is a seat for you.",
};

export function formatEventWhen(iso: string | Date) {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function isUpcoming(iso: string | Date) {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  return date.getTime() >= Date.now();
}

export function serializeEvent<
  T extends {
    startsAt: Date;
    createdAt: Date;
    updatedAt: Date;
  },
>(event: T) {
  return {
    ...event,
    startsAt: event.startsAt.toISOString(),
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };
}

export function serializeRegistration<
  T extends {
    createdAt: Date;
  },
>(row: T) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
}
