import styles from './Footer.module.css';

export default function Footer() {
  const today = new Date();

  const sitemap = [
    {
      title: 'Home',
      links: [
        { text: 'About', href: '/about/' },
        { text: 'Crafts', href: '/categories/crafts/' },
        { text: 'Antiquing', href: '/categories/antiquing/' },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {sitemap.map((section) => (
            <div key={section.title} className={styles.footerSection}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.footerSection}>
            <h3>Connect</h3>
            <div className={styles.socialLinks}>
              <a href="mailto:support@hannahshobbyroom.com" target="_blank" rel="noreferrer">
                <span className="sr-only">Email us</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  width="32"
                  height="32"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="https://github.com/withastro/astro" target="_blank" rel="noreferrer">
                <span className="sr-only">Go to Astro&apos;s GitHub repo</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" width="32" height="32">
                  <path
                    fill="currentColor"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {today.getFullYear()} Hannah&apos;s Hobby Room. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
