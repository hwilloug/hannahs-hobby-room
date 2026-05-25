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
- Likes and comments via external API (`blog-api.poppyland.dev`)
- Newsletter signup
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap.xml`
