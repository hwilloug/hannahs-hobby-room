/** Public bucket for article hero and inline images (created in Supabase Storage). */
export const ARTICLE_IMAGES_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_ARTICLE_IMAGES_BUCKET ?? 'article-images';

/** Object path inside `article-images`, e.g. `april-2026-antiquing-haul/hero.jpg`. */
export function articleImageObjectPath(slug: string, filename: string): string {
  return `${slug}/${filename}`;
}

/** Full public URL for an object in the article-images bucket. */
export function getArticleImagePublicUrl(objectPath: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  if (!base) {
    return `/${ARTICLE_IMAGES_BUCKET}/${objectPath}`;
  }
  return `${base}/storage/v1/object/public/${ARTICLE_IMAGES_BUCKET}/${objectPath}`;
}

/** Accepts a full URL or a storage object path (resolved to a public bucket URL). */
export function resolveArticleImageUrl(urlOrPath: string): string {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }
  return getArticleImagePublicUrl(urlOrPath);
}
