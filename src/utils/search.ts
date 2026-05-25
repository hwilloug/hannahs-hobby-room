import type { BlogPost } from '@/lib/posts';

export interface SearchResult {
  title: string;
  url: string;
  subtitle?: string;
  heroImage?: string;
}

export function searchPosts(posts: BlogPost[], query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();

  return posts
    .filter((post) => {
      const titleMatch = post.data.title.toLowerCase().includes(normalizedQuery);
      const subtitleMatch = post.data.subtitle?.toLowerCase().includes(normalizedQuery);
      const tagMatch = post.data.subcategories.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );
      return titleMatch || subtitleMatch || tagMatch;
    })
    .map((post) => ({
      title: post.data.title,
      url: `/blog/${post.slug}/`,
      subtitle: post.data.subtitle,
      heroImage: post.data.heroImage,
    }));
}
