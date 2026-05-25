import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import FormattedDate from './FormattedDate';
import styles from './RelatedArticles.module.css';

interface RelatedArticlesProps {
  currentSlug: string;
  subcategories: string[];
}

export default async function RelatedArticles({
  currentSlug,
  subcategories,
}: RelatedArticlesProps) {
  const allPosts = await getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false;
      const postSubcategories = post.data.subcategories || [];
      return postSubcategories.some((sub) => subcategories.includes(sub));
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className={styles.relatedArticles}>
      <h2>Related Articles</h2>
      <div className={styles.articlesGrid}>
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className={styles.articleCard}>
            <div className={styles.browserBar}>
              <div className={styles.browserControls}>
                <div className={`${styles.control} ${styles.red}`} />
                <div className={`${styles.control} ${styles.yellow}`} />
                <div className={`${styles.control} ${styles.green}`} />
              </div>
              <div className={styles.browserTitle}>Related Post</div>
            </div>
            <div className={styles.cardContent}>
              <img src={post.data.heroImage} alt="" />
              <h3>{post.data.title}</h3>
              <p className={styles.date}>
                <FormattedDate date={post.data.pubDate} />
              </p>
              <p className={styles.description}>{post.data.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
