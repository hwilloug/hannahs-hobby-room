'use client';

import { useEffect, useState, FormEvent } from 'react';
import { openNewsletterDialog } from './NewsletterDialog';
import styles from './NewsletterPopup.module.css';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!shown && window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisible(true);
        setShown(true);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shown]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (document.getElementById('popup-email-input') as HTMLInputElement)?.value;
    openNewsletterDialog(email);
    setVisible(false);
  }

  return (
    <div className={`${styles.newsletterPopup} ${visible ? styles.show : ''}`} id="newsletter-popup">
      <div className={styles.popupContent}>
        <button className={styles.closeButton} aria-label="Close popup" onClick={() => setVisible(false)}>
          ×
        </button>
        <h3>📬 Stay in the Loop!</h3>
        <p className={styles.signupText}>
          Subscribe to get the latest hobby updates and tutorials delivered straight to your inbox!
        </p>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            aria-label="Email address"
            id="popup-email-input"
          />
          <button type="submit">Select Interests</button>
        </form>
      </div>
    </div>
  );
}
