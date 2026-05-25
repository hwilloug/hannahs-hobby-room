export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function findTagBySlug(slug: string, allTags: string[]): string | undefined {
  return allTags.find((tag) => tagToSlug(tag) === slug);
}
