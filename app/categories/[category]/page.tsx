import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagMeta, type TagSlug } from '@/lib/tagMeta';
import { findTagBySlug, tagToSlug } from '@/lib/tagSlug';
import { SITE_TITLE } from '@/utils/consts';
import CategoryIcon from '@/components/CategoryIcon';
import FormattedDate from '@/components/FormattedDate';
import styles from './category.module.css';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ category: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: tagSlug } = await params;
  const meta = tagMeta[tagSlug as TagSlug];
  const allTags = await getAllTags();
  const tagName = findTagBySlug(tagSlug, allTags);
  if (!tagName) return {};
  const title = meta?.name ?? tagName;
  return { title: `${title} - ${SITE_TITLE}` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: tagSlug } = await params;
  const allTags = await getAllTags();
  const tagName = findTagBySlug(tagSlug, allTags);

  if (!tagName) {
    notFound();
  }

  const meta = tagMeta[tagSlug as TagSlug];
  const posts = await getPostsByTag(tagName);
  const displayName = meta?.name ?? tagName;

  return (
    <div className={styles.categoryLayout}>
      <div className={styles.categoryHeader}>
        <h1>
          <span className={styles.icon}>
            <CategoryIcon tagSlug={tagSlug} className="icon-svg" />
          </span>
          {displayName}
        </h1>
        {meta?.description && <p>{meta.description}</p>}
      </div>
      <section>
        <ul className={styles.postsGrid}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className={styles.browserWindow}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserActions}>
                    <span className={styles.browserAction} />
                    <span className={styles.browserAction} />
                    <span className={styles.browserAction} />
                  </div>
                  <div className={styles.browserAddress}>{post.data.title}</div>
                </div>
                <div className={styles.browserContent}>
                  <img src={post.data.heroImage} alt="" />
                  <h2 className={styles.title}>{post.data.title}</h2>
                  <p className={styles.date}>
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                  <p className={styles.description}>{post.data.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {meta?.background && (
        <section className={styles.categoryHeader}>
          <h2 className="centered">My {displayName} Background</h2>
          <p className="left">{meta.background}</p>
        </section>
      )}
    </div>
  );
}
