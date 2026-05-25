'use client';

import NewsletterDialog, { openNewsletterDialog } from './NewsletterDialog';
import styles from './NewsletterSignup.module.css';

export default function NewsletterSignup() {
  return (
    <div className={styles.emailSignup}>
      <h3 className={styles.homePageHeader}>Stay Updated! 🌟</h3>
      <p className={styles.signupText}>
        Subscribe to receive notifications about new hobby projects and tutorials!
      </p>
      <div className={styles.signupForm}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.emailInput}
          id="pre-signup-email"
        />
        <button
          className={styles.signupButton}
          onClick={() => {
            const email = (document.getElementById('pre-signup-email') as HTMLInputElement)?.value;
            openNewsletterDialog(email);
          }}
        >
          Select Interests
        </button>
      </div>
      <NewsletterDialog />
    </div>
  );
}
