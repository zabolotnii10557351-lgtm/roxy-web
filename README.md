# Roxy AI Streamer — Marketing + MVP Dashboard

Beautiful, dark SaaS marketing site and MVP dashboard for the **Roxy AI Streamer** concept. Auth, downloads, and admin tooling are powered by Supabase.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui utilities
- lucide-react icons
- Zustand (mock state)
- Framer Motion (optional)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only, optional for admin ops by email)
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAILS`

## Supabase setup

1) In the Supabase SQL editor, run the SQL in [supabase/schema.sql](supabase/schema.sql).
2) Set your admin role after signing up:

```sql
update public.profiles set role = 'admin' where email = 'you@company.com';
```

## Supabase URL configuration

In Supabase dashboard (Auth → URL Configuration):

- Site URL: `https://roxstreamai.com`
- Redirect URLs: `https://roxstreamai.com/auth/callback` and `http://localhost:3000/auth/callback`

## Routes

**Marketing**
- / — Home
- /pricing — Pricing
- /docs — Docs (Quickstart + Glossary)
- /about — About
- /contact — Contact
- /download — Desktop downloads (auth required)

**Dashboard**
- /app — Overview
- /app/characters — Characters list
- /app/characters/new — Character Builder
- /app/stream-connectors — Connectors
- /app/dono-engine — Dono Engine
- /app/scripts — Stream Scripts
- /app/avatar-scene — Avatar + Scene
- /app/deploy — Deploy
- /app/billing — Billing
- /app/settings — Settings

**Admin**
- /admin — Overview
- /admin/users — Manage users
- /admin/releases — Manage releases

## Notes

- Auth is handled by Supabase SSR middleware + server components.
- Admin requires `profiles.role = 'admin'` (or `ADMIN_EMAILS` with service role key).
- Dark theme with purple-blue-cyan gradients and glassmorphism cards.
