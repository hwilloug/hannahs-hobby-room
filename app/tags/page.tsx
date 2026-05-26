import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllTags } from '@/lib/posts';
import { tagToSlug } from '@/lib/tagSlug';

interface TagsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const { tag } = await searchParams;

  if (tag) {
    redirect(`/categories/${tagToSlug(tag)}/`);
  }

  const uniqueTags = await getAllTags();

  return (
    <div className="mx-auto my-8 max-w-[800px] rounded-xl border border-primary-dark bg-[rgba(var(--primary-main-rgb),0.6)] p-4">
      <h1 className="text-[2.441em] text-primary-dark">Topics</h1>
      <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-0">
        {uniqueTags.map((t) => (
          <li key={t}>
            <Link href={`/categories/${tagToSlug(t)}/`}>{t}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
