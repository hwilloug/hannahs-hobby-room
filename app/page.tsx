import { getAllPosts } from '@/lib/posts';
import Carousel from '@/components/Carousel';
import BrowserCard from '@/components/BrowserCard';
import CategorySection from '@/components/CategorySection';
import NewsletterSignup from '@/components/NewsletterSignup';
import NewsletterPopup from '@/components/NewsletterPopup';
import styles from './page.module.css';

export default function HomePage() {
  const sortedPosts = getAllPosts();
  const featuredPosts = sortedPosts.slice(0, 4);

  return (
    <div className={styles.contentWrapper}>
      <section className={styles.featuredArticles}>
        <h2 className={styles.homePageHeader}>Featured Articles</h2>
        <Carousel>
          {featuredPosts.map((post) => (
            <BrowserCard
              key={post.slug}
              title={post.data.title}
              image={post.data.heroImage}
              url={`/blog/${post.slug}/`}
            />
          ))}
        </Carousel>
      </section>

      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeHeader}>
          <span className={`${styles.word} ${styles.word2}`}>🌸Welcome</span>
          <span className={`${styles.word} ${styles.word3}`}>to</span>
          <span className={`${styles.word} ${styles.word4}`}>Hannah&apos;s</span>
          <span className={`${styles.word} ${styles.word5}`}>Hobby</span>
          <span className={`${styles.word} ${styles.word6}`}>Room🌸</span>
        </h1>
        <div className={styles.welcomeText}>
          <p>
            Hi! I&apos;m Hannah, and I&apos;m thrilled to welcome you to my hobby blog. Here, I share what I&apos;ve been working on and how I did it! There are six categories to choose from:{' '}
            <span className={styles.hobby}>gardening</span>, <span className={styles.hobby}>crafts</span>,{' '}
            <span className={styles.hobby}>coding</span>, <span className={styles.hobby}>books</span>, and{' '}
            <span className={styles.hobby}>antiquing</span>.
          </p>
          <p>I hope you learn something new or find a new hobby to explore.</p>
          <p>Thank you for stepping into my world, and I can&apos;t wait to share this room with you!</p>
          <p>Warm regards,</p>
          <img src="/signature.png" alt="Hannah's signature" className={styles.signature} />
        </div>
      </div>

      <NewsletterSignup />

      <div className={styles.categories}>
        <CategorySection
          title="🎨 Crafts"
          description=""
          posts={sortedPosts.filter((p) => p.data.category?.toLowerCase() === 'crafts')}
          category="crafts"
        />
        <CategorySection
          title="🌱 Gardening"
          description=""
          posts={sortedPosts.filter((p) => p.data.category?.toLowerCase() === 'gardening')}
          category="gardening"
        />
        <CategorySection
          title="💻 Coding"
          description=""
          posts={sortedPosts.filter((p) => p.data.category?.toLowerCase() === 'coding')}
          category="coding"
        />
        <CategorySection
          title="📚 Books"
          description=""
          posts={sortedPosts.filter((p) => p.data.category?.toLowerCase() === 'books')}
          category="books"
        />
        <CategorySection
          title="🏺 Antiquing"
          description=""
          posts={sortedPosts.filter((p) => p.data.category?.toLowerCase() === 'antiquing')}
          category="antiquing"
        />
      </div>

      <NewsletterPopup />
    </div>
  );
}
