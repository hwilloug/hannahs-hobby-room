import Link from 'next/link';
import { createSiteMetadata } from '@/lib/metadata';
import styles from './about.module.css';

export const metadata = createSiteMetadata({
  title: 'About Me',
  description: 'About Me',
  image: 'https://blog-images.poppyland.dev/me.jpeg',
  type: 'article',
});

export default function AboutPage() {
  return (
    <article className={styles.aboutArticle}>
      <div className={styles.heroImage}>
        <img src="https://blog-images.poppyland.dev/me.jpeg" alt="Hannah Willoughby" />
      </div>
      <div className={styles.prose}>
        <div className={styles.title}>
          <h1>About Me</h1>
        </div>
        <div className={styles.content}>
          <p>
            Hello world! I&apos;m Hannah, a DevOps Engineer by day and an enthusiastic hobbyist by night. From my home in Fort Mill, SC, which I share with my partner Danny and our three cats, I pursue a diverse array of creative interests. My passions range from nurturing my garden and crafting with needle and thread, to building with wood and hunting for antique treasures. When I&apos;m not creating something with my hands, you&apos;ll find me immersed in a good book, working on coding projects, or studying languages. This blog is where I document these adventures and share what I learn along the way.
          </p>
          <p className="centered">Find me on:</p>
          <div className={styles.socialLinks}>
            <a href="https://github.com/hwilloug" target="_blank" rel="noreferrer">
              <button className={styles.socialLink} type="button">Github</button>
            </a>
            <a href="https://www.linkedin.com/in/hannah-willoughby-6a8664160/" target="_blank" rel="noreferrer">
              <button className={styles.socialLink} type="button">LinkedIn</button>
            </a>
            <a href="https://www.goodreads.com/hannah218" target="_blank" rel="noreferrer">
              <button className={styles.socialLink} type="button">Goodreads</button>
            </a>
            <a href="https://hannahwilloughby.dev" target="_blank" rel="noreferrer">
              <button className={styles.socialLink} type="button">HannahWilloughby.dev</button>
            </a>
          </div>

          <h1 className={`centered ${styles.flowerDivider}`}>🌸</h1>

          <div className={styles.aboutImages}>
            <img src="https://blog-images.poppyland.dev/me_and_danny.jpeg" alt="Hannah and her partner Danny" className={styles.aboutImage} />
            <img src="https://blog-images.poppyland.dev/family_photo_2.jpeg" alt="Their four cats" className={styles.aboutImage} />
          </div>

          <h1 className={`centered ${styles.flowerDivider}`}>🌸</h1>

          <h3 className="centered">Contact me</h3>
          <p className="centered">
            Have a question or comment? I&apos;d love to hear from you! You can reach me via email at{' '}
            <Link href="mailto:support@hannahshobbyroom.com">support@hannahshobbyroom.com</Link>.
          </p>
        </div>
      </div>
    </article>
  );
}
