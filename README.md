# Hannah's Hobby Room

A personal hobby blog built with [Next.js](https://nextjs.org/) (App Router), deployed on [Vercel](https://vercel.com/).

## Project structure

```text
├── app/                 # Next.js App Router pages and API routes
├── src/content/posts/   # React article components (one file per slug)
├── public/              # Static assets (fonts, images)
├── src/
│   ├── components/      # React components
│   ├── lib/             # Content loading, metadata, tag data
│   └── utils/           # Shared utilities
└── next.config.ts
```

## Commands

| Command         | Action                              |
| :-------------- | :---------------------------------- |
| `npm install`   | Install dependencies                |
| `npm run dev`   | Start dev server at localhost:3000 (requires Supabase env) |
| `npm run build` | Build for production (requires Supabase env)                |
| `npm run start` | Serve production build locally      |

## Content

Article **metadata** (title, subtitle, dates, hero image, `subcategories`) lives in Supabase `articles`. Article **body** lives as React components in `src/content/posts/` (one `.tsx` file per slug, registered in `registry.ts`).

Browse posts by topic at `/categories/[tag-slug]/` (e.g. `/categories/crafts/`, `/categories/cross-stitch/`). All topics are listed at `/tags/`.

To add a new post:

1. Add a row in Supabase (or run a seed) with slug, title, `pub_date`, `hero_image`, `subcategories`, etc.
2. Create `src/content/posts/your-slug.tsx` exporting a default component.
3. Register the slug in `src/content/posts/registry.ts` (or re-run `node scripts/convert-posts.mjs` if migrating from markdown).

## Features

- Static blog post generation from React components + Supabase metadata
- Topic browse pages at `/categories/[tag-slug]/`
- Client-side search via `/api/search`
- Likes, comments, and newsletter via Supabase (Next.js API routes)
- Newsletter signup
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap.xml`

## Supabase setup

This project replaces the old RDS + Lambda API with [Supabase](https://supabase.com) Postgres and same-origin API routes.

### 1. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run migrations in `supabase/migrations/` (`001` through `004`).

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in values from **Project Settings → API Keys**:

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_...`) — optional for now; API routes use the secret key |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_...`) — server only, never commit |

Add the same variables in **Vercel → Project → Settings → Environment Variables**.

### 3. Seed article metadata

Populate `articles` from `scripts/seed-data/metadata.json` (or from `content/blog/` if present):

```bash
npm run db:seed
```

The app reads article metadata from Supabase only at runtime and build time — not from committed JSON. Likes and comments from RDS migration are preserved.

### 4. Migrate existing RDS data

See `supabase/migrate-from-rds.md` for exporting likes, comments, and newsletter subscribers from your old Postgres database.

### API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/articles/[slug]` | GET | Likes + comments for a post |
| `/api/articles/[slug]/like` | POST | Increment/decrement likes |
| `/api/comments` | POST | Add a comment |
| `/api/newsletter` | POST | Newsletter signup |
