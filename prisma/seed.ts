import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

const eventData = [
  {
    name: "Freshers' Coding Kickoff",
    description:
      "Meet the club, set up your CodeChef profile, and solve a friendly starter contest. Mentors from 2nd and 3rd year will be around to help.",
    venue: "ABES Seminar Hall A",
    startsAt: new Date("2026-10-08T16:00:00.000Z"),
    category: "Social",
    featured: true,
  },
  {
    name: "DSA Workshop: Arrays to Recursion",
    description:
      "A hands-on session covering patterns that show up in campus placements and CodeChef Div 3. Bring your laptop.",
    venue: "Lab 3, CS Block",
    startsAt: new Date("2026-10-15T10:30:00.000Z"),
    category: "Workshop",
    featured: false,
  },
  {
    name: "October Long Challenge Watch Party",
    description:
      "Solve live, compare approaches, and debrief editorials together. Snacks on the club. All divisions welcome.",
    venue: "Innovation Hub",
    startsAt: new Date("2026-10-22T18:00:00.000Z"),
    category: "Contest",
    featured: false,
  },
  {
    name: "Alumni Talk: Internships at Product Companies",
    description:
      "ABES alumni share how they used contest practice, projects, and referrals to land internships. Q&A at the end.",
    venue: "Auditorium, Main Block",
    startsAt: new Date("2026-11-05T15:00:00.000Z"),
    category: "Talk",
    featured: false,
  },
  {
    name: "Campus Hack Sprint 24h",
    description:
      "Team up and ship a campus-useful prototype in 24 hours. Themes announced at kickoff. Certificates for all finishers.",
    venue: "CS Block + Online Discord",
    startsAt: new Date("2026-11-14T09:00:00.000Z"),
    category: "Hackathon",
    featured: false,
  },
  {
    name: "Graph Algorithms Deep Dive",
    description:
      "BFS, DFS, shortest paths, and contest tricks. We will work through 6 problems of increasing difficulty.",
    venue: "Lab 1, CS Block",
    startsAt: new Date("2026-11-28T11:00:00.000Z"),
    category: "Workshop",
    featured: false,
  },
];

async function main() {
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  const events = [];
  for (const data of eventData) {
    events.push(await prisma.event.create({ data }));
  }

  const contest = events.find((e) => e.category === "Contest");
  const kickoff = events.find((e) => e.featured);

  if (kickoff) {
    await prisma.registration.createMany({
      data: [
        {
          eventId: kickoff.id,
          name: "Ananya Sharma",
          email: "ananya.sharma@college.edu",
          collegeYear: "2nd Year, CSE",
          phone: "9876543210",
        },
        {
          eventId: kickoff.id,
          name: "Rohit Verma",
          email: "rohit.verma@college.edu",
          collegeYear: "1st Year, AIML",
          phone: "9123456780",
        },
      ],
    });
  }

  if (contest) {
    await prisma.registration.create({
      data: {
        eventId: contest.id,
        name: "Priya Nair",
        email: "priya.nair@college.edu",
        collegeYear: "3rd Year, IT",
        phone: "9988776655",
      },
    });
  }

  console.log(`Seeded ${events.length} events.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
