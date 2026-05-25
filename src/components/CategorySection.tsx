import Link from 'next/link';
import type { BlogPost } from '@/lib/posts';
import CategoryIcon from './CategoryIcon';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  title: string;
  description: string;
  posts: BlogPost[];
  category: string;
}

export default function CategorySection({
  title,
  description,
  posts,
  category,
}: CategorySectionProps) {
  const categoryPosts = posts.slice(0, 4);
  const titleWord = title.split(' ')[1] ?? title;

  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <div>
          <h2>
            <span className={styles.icon}>
              <CategoryIcon category={category} className="icon-svg size-16" />
            </span>
            {titleWord}
          </h2>
          <p>{description}</p>
        </div>
        <Link href={`/categories/${category}/`} className={styles.viewAll}>
          View All
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
      <div className={styles.postsGrid}>
        {categoryPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className={styles.browserWindow}>
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
              <h3>{post.data.title}</h3>
              <p>{post.data.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
