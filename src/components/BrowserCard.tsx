import Link from 'next/link';
import styles from './BrowserCard.module.css';

interface BrowserCardProps {
  title: string;
  image: string;
  url: string;
  subtitle?: string;
  showSubtitle?: boolean;
}

export default function BrowserCard({
  title,
  image,
  url,
  subtitle,
  showSubtitle = false,
}: BrowserCardProps) {
  return (
    <Link href={url} className={styles.browserWindow}>
      <div className={styles.browserHeader}>
        <div className={styles.browserActions}>
          <span className={styles.browserAction} />
          <span className={styles.browserAction} />
          <span className={styles.browserAction} />
        </div>
        <div className={styles.browserAddress}>{title}</div>
      </div>
      <div className={styles.browserContent}>
        <img src={image} alt="" />
        <h3>{title}</h3>
        {showSubtitle && subtitle && <p>{subtitle}</p>}
      </div>
    </Link>
  );
}
