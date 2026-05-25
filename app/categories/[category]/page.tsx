import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';
import { categoryMeta, categorySlugs, type CategorySlug } from '@/lib/categoryMeta';
import { SITE_TITLE } from '@/utils/consts';
import CategoryIcon from '@/components/CategoryIcon';
import FormattedDate from '@/components/FormattedDate';
import styles from './category.module.css';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const meta = categoryMeta[category as CategorySlug];
  if (!meta) return {};
  return { title: `${meta.name} - ${SITE_TITLE}` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const meta = categoryMeta[category as CategorySlug];

  if (!meta) {
    notFound();
  }

  const posts = getPostsByCategory(meta.name);

  return (
    <div className={styles.categoryLayout}>
      <div className={styles.categoryHeader}>
        <h1>
          <span className={styles.icon}>
            <CategoryIcon category={category} className="icon-svg" />
          </span>
          {meta.name}
        </h1>
        <p>{meta.description}</p>
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
      {meta.background && (
        <section className={styles.categoryHeader}>
          <h2 className="centered">My {meta.name} Background</h2>
          <p className="left">{meta.background}</p>
        </section>
      )}
    </div>
  );
}
