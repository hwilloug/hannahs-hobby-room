import Link from 'next/link';
import styles from './AboutMeFooter.module.css';

export default function AboutMeFooter() {
  return (
    <div className={styles.aboutMeFooter}>
      <h2>About Me</h2>
      <img
        src="https://blog-images.poppyland.dev/me.jpeg"
        alt="Hannah Willoughby"
        className={styles.aboutMeFooterImage}
      />
      <p>
        Hello world! I&apos;m Hannah, a DevOps Engineer by day and an enthusiastic hobbyist by night.
        From my home in Fort Mill, SC, I pursue a diverse array of creative interests.
      </p>
      <Link href="/about/" className={styles.aboutMeFooterButton}>
        Read More
      </Link>
    </div>
  );
}
