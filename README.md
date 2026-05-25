# Hannah's Hobby Room

A personal hobby blog built with [Next.js](https://nextjs.org/) (App Router), deployed on [Vercel](https://vercel.com/).

## Project structure

```text
├── app/                 # Next.js App Router pages and API routes
├── content/blog/        # Markdown blog posts
├── public/              # Static assets (fonts, images)
├── src/
│   ├── components/      # React components
│   ├── lib/             # Content loading, metadata, category data
│   └── utils/           # Shared utilities
└── next.config.ts
```

## Commands

| Command         | Action                              |
| :-------------- | :---------------------------------- |
| `npm install`   | Install dependencies                |
| `npm run dev`   | Start dev server at localhost:3000  |
| `npm run build` | Build for production                |
| `npm run start` | Serve production build locally      |

## Content

Blog posts live in `content/blog/` as Markdown files with frontmatter (`title`, `subtitle`, `pubDate`, `heroImage`, `category`, `subcategories`).

## Features

- Static blog post generation from markdown
- Category and tag pages
- Client-side search via `/api/search`
- Likes, comments, and newsletter via Supabase (Next.js API routes)
- Newsletter signup
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap.xml`

## Supabase setup

This project replaces the old RDS + Lambda API with [Supabase](https://supabase.com) Postgres and same-origin API routes.

### 1. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the migration in `supabase/migrations/001_initial_schema.sql`.

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in values from **Project Settings → API Keys**:

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_...`) — optional for now; API routes use the secret key |
| `SUPABASE_SECRET_KEY` | Secret key (`sb_secret_...`) — server only, never commit |

Add the same variables in **Vercel → Project → Settings → Environment Variables**.

### 3. Seed article rows

Each blog slug needs a row in `articles` for likes. After migration from RDS, seed any missing slugs:

```bash
npm run db:seed
```

### 4. Migrate existing RDS data

See `supabase/migrate-from-rds.md` for exporting likes, comments, and newsletter subscribers from your old Postgres database.

### API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/articles/[slug]` | GET | Likes + comments for a post |
| `/api/articles/[slug]/like` | POST | Increment/decrement likes |
| `/api/comments` | POST | Add a comment |
| `/api/newsletter` | POST | Newsletter signup |
