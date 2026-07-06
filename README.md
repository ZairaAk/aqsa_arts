# Aqsa Arts

A showcase site for Mir Abdul Majeed, a Kashmiri artisan specializing in handcrafted Aari embroidery and traditional handicrafts. Built with Next.js (App Router) and a full admin CMS for managing site content without touching code.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4**
- **Prisma 7** ORM against **Postgres** (Vercel Postgres / Neon)
- **Vercel Blob** for image uploads (client-direct upload, bypassing server body-size limits)
- **Zod** for input validation, **sonner** for toasts
- **jose** for signed session cookies (admin auth)

## Project structure

```
src/
  app/
    (site)/           Public site: home, about, collections (route group with its own layout)
    admin/
      login/           Admin login page
      (dashboard)/      Protected admin CMS: products, homepage, about, settings
    api/admin/upload/   Route handler that mints Vercel Blob client-upload tokens
  components/
    admin/
      shared/           Reusable admin UI: Modal, ConfirmDialog, Field, ImageUploader, IconPicker, AdminNav, Skeleton
      products/         Product form + table
      homepage/         Homepage content form + featured-products panel
      about/            About page form, awards manager, media manager
      settings/         Site settings form
    home/, about/, products/, layout/, ui/, icons/   Public-site components
  lib/
    actions/            Server Actions (mutations), one file per entity
    repositories/        Prisma data-access layer, one file per entity
    validation/          Zod schemas, one file per entity
    auth/                Session (jose) + login/logout Server Actions
    db/                  Prisma client singleton + seed data source
    storage/             Vercel Blob delete helper
    constants/            Nav items, craftsmanship icon library
    utils/                Slug generation, WhatsApp link helpers
    types.ts             Shared Server Action result type
  proxy.ts               Route protection for /admin/* (this Next.js version's name for middleware)
prisma/
  schema.prisma          Data model
  seed.ts                 Seeds the DB from src/lib/db/seed-data.ts
```

## Getting started

```bash
npm install
npx prisma migrate dev   # apply the schema to your database
npx prisma db seed       # populate initial content
npm run dev
```

Requires a `.env.local` with:

```
ADMIN_USERNAME=
ADMIN_PASSWORD=
SESSION_SECRET=          # random string, e.g. `openssl rand -base64 32`
DATABASE_URL=             # Postgres connection string
BLOB_READ_WRITE_TOKEN=    # Vercel Blob read-write token
```

## Admin panel

Visit `/admin/login`. From there you can manage products (including images), the homepage's hero/featured/craftsmanship sections, the about page's story/awards/media features, and general site settings (contact info, address, footer). Every save revalidates the affected public pages immediately.

## Deploying

On Vercel, `npm run build` runs `prisma generate` before `next build`, so the generated Prisma client is always in sync. Make sure `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` are set in the project's environment variables before the first deploy — the database needs to be migrated and seeded beforehand too.
