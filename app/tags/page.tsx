import Link from 'next/link';
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/posts';
import BrowserCard from '@/components/BrowserCard';
import styles from './tags.module.css';

interface TagsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const { tag } = await searchParams;
  const uniqueTags = getAllTags();
  const filteredPosts = tag ? getPostsByTag(tag) : getAllPosts();

  return (
    <>
      {tag && (
        <div className={styles.contentWrapper}>
          <h1>Posts tagged with {tag}</h1>
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <BrowserCard
                key={post.slug}
                title={post.data.title}
                image={post.data.heroImage}
                url={`/blog/${post.slug}/`}
              />
            ))}
          </div>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <h1>Tags</h1>
        <ul>
          {uniqueTags.map((t) => (
            <li key={t}>
              <Link href={`/tags?tag=${encodeURIComponent(t)}`}>{t}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
