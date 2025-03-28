import type { CollectionEntry } from 'astro:content';

export interface SearchResult {
    title: string;
    url: string;
    subtitle?: string;
    category?: string;
    heroImage?: string;
}

export function searchPosts(posts: CollectionEntry<'blog'>[], query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();
    
    return posts
        .filter(post => {
            const titleMatch = post.data.title.toLowerCase().includes(normalizedQuery);
            const subtitleMatch = post.data.subtitle?.toLowerCase().includes(normalizedQuery);
            const categoryMatch = post.data.category?.toLowerCase().includes(normalizedQuery);
            const bodyMatch = post.body.toLowerCase().includes(normalizedQuery);
            return titleMatch || subtitleMatch || categoryMatch || bodyMatch;
        })
        .map(post => ({
            title: post.data.title,
            url: `/blog/${post.slug}`,
            subtitle: post.data.subtitle,
            category: post.data.category,
            heroImage: post.data.heroImage
        }));
} 