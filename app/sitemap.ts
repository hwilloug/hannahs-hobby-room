import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { tagToSlug } from '@/lib/tagSlug';

const SITE_URL = 'https://hannahshobbyroom.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/search/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tags/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/categories/${tagToSlug(tag)}/`,
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

  return [...staticRoutes, ...tagRoutes, ...postRoutes];
}
