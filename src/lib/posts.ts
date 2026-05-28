import type { ComponentType } from 'react';
import { z } from 'zod';
import { hasPostContent, postComponents, postSlugs } from '@/content/posts/registry';
import { getAllArticlesFromDb, getArticleFromDb } from '@/lib/db/articles';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import { resolveArticleImageUrl } from '@/lib/supabase/storage';

const blogSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string(),
  subcategories: z.array(z.string()),
});

export type BlogPostData = z.infer<typeof blogSchema>;

export type BlogPost = {
  slug: string;
  data: BlogPostData;
};

export type BlogPostWithContent = BlogPost & {
  Content: ComponentType;
};

function requireSupabase(): void {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is required. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env'
    );
  }
}

function dbRowToPostData(row: {
  title: string;
  subtitle: string | null;
  pub_date: string;
  updated_date: string | null;
  hero_image: string;
  subcategories: string[];
}): BlogPostData {
  return blogSchema.parse({
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    pubDate: row.pub_date,
    updatedDate: row.updated_date ?? undefined,
    heroImage: resolveArticleImageUrl(row.hero_image),
    subcategories: row.subcategories ?? [],
  });
}

function publishedSlugs(): string[] {
  return postSlugs.filter((slug) => hasPostContent(slug));
}

async function loadAllMetadata(): Promise<BlogPost[]> {
  requireSupabase();
  const slugs = new Set(publishedSlugs());
  const rows = await getAllArticlesFromDb();

  return rows
    .filter((row) => slugs.has(row.slug) && row.title && row.pub_date && row.hero_image)
    .map((row) => ({
      slug: row.slug,
      data: dbRowToPostData({
        title: row.title!,
        subtitle: row.subtitle,
        pub_date: row.pub_date!,
        updated_date: row.updated_date,
        hero_image: row.hero_image!,
        subcategories: row.subcategories,
      }),
    }))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

async function loadMetadataBySlug(slug: string): Promise<BlogPostData | undefined> {
  if (!hasPostContent(slug)) return undefined;

  requireSupabase();
  const row = await getArticleFromDb(slug);
  if (!row?.title || !row.pub_date || !row.hero_image) {
    return undefined;
  }

  return dbRowToPostData({
    title: row.title,
    subtitle: row.subtitle,
    pub_date: row.pub_date,
    updated_date: row.updated_date,
    hero_image: row.hero_image,
    subcategories: row.subcategories,
  });
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return loadAllMetadata();
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | undefined> {
  if (!hasPostContent(slug)) return undefined;

  const data = await loadMetadataBySlug(slug);
  if (!data) return undefined;

  return { slug, data, Content: postComponents[slug] };
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.subcategories.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.flatMap((post) => post.data.subcategories);
  return [...new Set(tags)].sort();
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
