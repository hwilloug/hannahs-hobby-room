import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllTags } from '@/lib/posts';
import { tagToSlug } from '@/lib/tagSlug';
import styles from './tags.module.css';

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
    <div className={styles.contentWrapper}>
      <h1>Topics</h1>
      <ul>
        {uniqueTags.map((t) => (
          <li key={t}>
            <Link href={`/categories/${tagToSlug(t)}/`}>{t}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
