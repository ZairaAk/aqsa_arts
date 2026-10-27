# Aqsa Arts

Live: https://aqsaembroidery.in

Demo video: <ADD LINK>

Repository: https://github.com/ZairaAk/aqsa_arts

A showcase site and content management system for Mir Abdul Majeed, a Kashmiri master artisan of Aari and Crewel embroidery.

## Problem Statement

Mir Abdul Majeed has practiced hand embroidery in Srinagar for more than six decades, but his work has no online presence he can control. Every website change needs a developer, product photos live in WhatsApp chats, and customers have no single place to see the collection or reach him.

## Target Users

| User | Need |
|---|---|
| Artisan / shop owner (admin) | Update products, photos, story, awards and contact details without touching code |
| Customers and buyers | Browse the collection, read the artisan's story, and enquire quickly |
| Cultural and craft enthusiasts | Learn about Aari embroidery and GI-certified Kashmiri crafts |

## Solution

A Next.js application with a public showcase site and a protected admin CMS. Content is stored in Postgres, images are uploaded straight to cloud storage, and every admin save refreshes the affected public pages immediately. Visitors enquire through a prefilled WhatsApp message, the channel the artisan already uses for sales.

## Key Features

| Workflow | What the user can do |
|---|---|
| 1. Secure admin access | Sign in at `/admin/login`. Signed session cookie protects every `/admin/*` route. Unauthenticated requests are redirected |
| 2. Product management | Create, edit, delete products with multiple images, category and slug. Inputs validated with Zod. Images upload directly to Vercel Blob and are cleaned up on delete |
| 3. Live content editing | Edit hero, featured products, craftsmanship values, About story, awards, media features and site settings. Saves revalidate public pages instantly |
| 4. Public browsing and enquiry | Browse collections, open product detail pages, and start a WhatsApp enquiry using generated links |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Vercel Postgres / Neon) |
| ORM | Prisma 7 |
| File storage | Vercel Blob (client-direct upload) |
| Validation | Zod |
| Auth | jose (signed session cookies) |
| UI feedback | sonner toasts, skeleton loaders |
| Hosting | Vercel |

## Architecture

```text
Browser
  |
  |-- Public site (site) ----------> Server Components --> Repositories --> Prisma --> Postgres
  |
  |-- Admin (dashboard)
        |
        v
   proxy.ts (route guard, checks signed session)
        |
        v
   Client form --> Server Action --> Zod validation --> Repository --> Prisma --> Postgres
                         |
                         +--> revalidatePath() refreshes public pages
        |
        +--> /api/admin/upload (mints Blob token) --> Browser uploads image directly to Vercel Blob
```

| Component | Responsibility |
|---|---|
| `src/app/(site)` | Public pages: home, about, collections |
| `src/app/admin` | Login and protected dashboard |
| `src/lib/actions` | Server Actions for all mutations, one file per entity |
| `src/lib/repositories` | Data-access layer over Prisma, one file per entity |
| `src/lib/validation` | Zod schemas, one file per entity |
| `src/lib/auth` | Session creation and verification, login and logout actions |
| `src/lib/storage` | Blob deletion helper |
| `src/lib/utils` | Slug generation, WhatsApp link helpers |
| `src/proxy.ts` | Route protection for `/admin/*` |
| `prisma/` | Schema and seed script |

Design decisions:

| Decision | Reason |
|---|---|
| Server Actions instead of a REST API | Fewer moving parts for form-driven mutations, validated on the server |
| Repository layer | Keeps database access out of components and actions |
| Client-direct image upload | Avoids server body-size limits for large photos |
| Revalidate on save | The artisan sees changes live without a redeploy |
| WhatsApp enquiry | Matches how the artisan already takes orders |

## Error Handling

| Case | Behaviour |
|---|---|
| Invalid form input | Zod errors shown inline, nothing is saved |
| Failed save or upload | Error toast, form state preserved |
| Unauthenticated admin request | Redirected to `/admin/login` |
| Wrong credentials | Login rejected with an error message |
| Delete actions | Confirmation dialog before removal |
| Slow data | Skeleton loaders in admin |

## Local Setup

Prerequisites: Node.js 20+, a Postgres database, a Vercel Blob read-write token.

```bash
git clone https://github.com/ZairaAk/aqsa_arts.git
cd aqsa_arts
npm install
# Create .env.local with the values listed below
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin/login

## Environment Variables

| Variable | Description |
|---|---|
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | Random string for signing sessions, e.g. `openssl rand -base64 32` |
| `DATABASE_URL` | Postgres connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read-write token |

Secrets are never committed. `.env.local` is git-ignored.

## Deployment

Deployed on Vercel at https://aqsaembroidery.in. `npm run build` runs `prisma generate` before `next build`. Before the first deploy, set `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` in the project environment variables, then migrate and seed the database.

## Originality

Built from scratch for a real client. Open-source libraries are used as listed in the tech stack. No existing project was forked or adapted.

## Author

Zaira (GitHub: ZairaAk)
