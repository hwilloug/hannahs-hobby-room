import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { categorySlugs } from '@/lib/categoryMeta';

const SITE_URL = 'https://hannahshobbyroom.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/search/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tags/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((category) => ({
    url: `${SITE_URL}/categories/${category}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.data.updatedDate ?? post.data.pubDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
