import Link from 'next/link';
import type { BlogPostData } from '@/lib/posts';
import FormattedDate from './FormattedDate';
import LikeButton from './LikeButton';
import Comments from './Comments';
import NewsletterSignup from './NewsletterSignup';
import RelatedArticles from './RelatedArticles';
import AboutMeFooter from './AboutMeFooter';
import styles from './BlogPostLayout.module.css';

interface BlogPostLayoutProps {
  data: BlogPostData;
  slug: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({ data, slug, children }: BlogPostLayoutProps) {
  const {
    title,
    subtitle,
    pubDate,
    updatedDate,
    heroImage,
    category,
    subcategories = [],
  } = data;

  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <article className={styles.articleWrapper}>
      <div className={styles.heroImage}>
        {heroImage && <img src={heroImage} alt={title} />}
      </div>
      <div className={styles.prose}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles.date}>
            <FormattedDate date={pubDate} />
            {updatedDate && (
              <div className={styles.lastUpdatedOn}>
                Last updated on <FormattedDate date={updatedDate} />
              </div>
            )}
            <p>Written by Hannah Willoughby</p>
            <div className={styles.categoryPills}>
              <Link href={`/categories/${categorySlug}/`} className={`${styles.pill} ${styles.category}`}>
                {category}
              </Link>
              {subcategories.map((sub) => (
                <Link key={sub} href={`/tags?tag=${encodeURIComponent(sub)}`} className={`${styles.pill} ${styles.subcategory}`}>
                  {sub}
                </Link>
              ))}
            </div>
            <LikeButton postSlug={slug} />
          </div>
          <hr />
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.authorInfo}>
          <p>Written by Hannah Willoughby</p>
          <p>
            Published on <FormattedDate date={pubDate} />
          </p>
          {updatedDate && (
            <p>
              Last updated on <FormattedDate date={updatedDate} />
            </p>
          )}
        </div>
        <LikeButton postSlug={slug} />
      </div>
      <Comments postSlug={slug} />
      <div className={styles.newsletterAndRelated}>
        <hr />
        <RelatedArticles currentSlug={slug} category={category} subcategories={subcategories} />
        <hr />
        <NewsletterSignup />
        <AboutMeFooter />
      </div>
    </article>
  );
}
