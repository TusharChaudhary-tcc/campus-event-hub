# Campus Event Hub

A full-stack college event management platform built for a campus club recruitment task.

Campus Event Hub allows students to discover college events, view event details, and register online. Club administrators can manage events and view student registrations through a dedicated admin panel.

## Features

### Student Side

- Responsive home page
- Browse upcoming college events
- Search events by name
- Filter events by category
- View detailed event information
- Register for events
- Prevent duplicate registration for the same event and email

### Admin Side

- Admin login
- Admin dashboard
- Create events
- Edit events
- Delete events
- View registered students
- Search and filter registrations

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite
- Lucide React

## Project Structure

```text
campus-event-hub/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin pages
│   │   ├── api/            # API route handlers
│   │   └── events/         # Student event pages
│   ├── components/         # Reusable UI components
│   └── lib/                # Database and utility code
├── .env.example
├── package.json
└── README.md
```

## How It Works

```text
Student/Admin UI
       ↓
Next.js App Router
       ↓
API Route Handlers
       ↓
Prisma ORM
       ↓
SQLite Database
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18 or later
- npm

### 1. Clone the repository

```bash
git clone <repository-url>
cd campus-event-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file from the example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Windows Command Prompt:**

```cmd
copy .env.example .env
```

Then open `.env` and configure the values:

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="your-admin-password"
ADMIN_SESSION_TOKEN="your-session-token"
```

For a real deployment, use secure values instead of development/demo credentials.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Set up the database

Run the Prisma migration:

```bash
npx prisma migrate dev
```

### 6. Add sample data

```bash
npx prisma db seed
```

### 7. Start the development server

```bash
npm run dev
```

Open the application at:

http://localhost:3000

### 8. Optional: Open Prisma Studio

In a separate terminal:

```bash
npx prisma studio
```

Prisma Studio will open at:

http://localhost:5555

## Admin Panel

Open:

http://localhost:3000/admin

The development project uses the password configured through `ADMIN_PASSWORD` in `.env`.

Do not use sample credentials in a production environment.

## Database

The application uses SQLite with Prisma ORM.

### Event

Stores information such as:

- Event name
- Description
- Venue
- Date and time
- Category
- Featured status

### Registration

Stores:

- Student name
- Email
- College year
- Phone number
- Registered event

Each event can have multiple registrations.

A unique constraint on `eventId` and `email` prevents the same email address from registering for the same event more than once.

## API Routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/events` | Get events |
| POST | `/api/events` | Create an event |
| GET | `/api/events/[id]` | Get event details |
| PUT | `/api/events/[id]` | Update an event |
| DELETE | `/api/events/[id]` | Delete an event |
| POST | `/api/events/[id]/register` | Register for an event |
| GET | `/api/registrations` | Get registrations |

## Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production build:

```bash
npm run start
```

## Future Improvements

- Student accounts and registration history
- Email confirmation after registration
- Event capacity limits
- QR-code based event check-in
- Role-based admin access
- Production-ready authentication
- Persistent production database

## Project Purpose

This project was developed as a college club recruitment task to demonstrate full-stack web development, database integration, API development, and responsive UI design.