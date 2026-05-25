import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const postsDirectory = path.join(process.cwd(), 'content/blog');

const blogSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string(),
  category: z.string(),
  subcategories: z.array(z.string()).optional(),
});

export type BlogPostData = z.infer<typeof blogSchema>;

export type BlogPost = {
  slug: string;
  data: BlogPostData;
  content: string;
};

function parsePost(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const parsed = blogSchema.parse(data);

  return {
    slug,
    data: {
      ...parsed,
      subcategories: parsed.subcategories ?? [],
    },
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
  return filenames
    .map(parsePost)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    return parsePost(`${slug}.md`);
  } catch {
    return undefined;
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (post) => post.data.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    (post.data.subcategories ?? []).includes(tag)
  );
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.data.subcategories ?? []);
  return [...new Set(tags)].sort();
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
