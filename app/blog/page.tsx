import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import FormattedDate from '@/components/FormattedDate';
import styles from './blog.module.css';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className={styles.blogIndex}>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`}>
              <img width={720} height={360} src={post.data.heroImage} alt="" />
              <h4 className={styles.title}>{post.data.title}</h4>
              <p className={styles.date}>
                <FormattedDate date={post.data.pubDate} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
