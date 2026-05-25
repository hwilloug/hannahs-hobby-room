'use client';

import { useRef, useState, FormEvent } from 'react';
import styles from './NewsletterDialog.module.css';

const API_URL = 'https://blog-api.poppyland.dev';

export default function NewsletterDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showInterestsError, setShowInterestsError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlreadySubscribed, setShowAlreadySubscribed] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [interests, setInterests] = useState({
    gardening: false,
    crafts: false,
    coding: false,
    books: false,
    antiquing: false,
  });

  const interestKeys = Object.keys(interests) as (keyof typeof interests)[];

  function handleSelectAll(checked: boolean) {
    setSelectAll(checked);
    setInterests({
      gardening: checked,
      crafts: checked,
      coding: checked,
      books: checked,
      antiquing: checked,
    });
    setShowInterestsError(false);
  }

  function handleInterestChange(key: keyof typeof interests, checked: boolean) {
    const next = { ...interests, [key]: checked };
    setInterests(next);
    setSelectAll(interestKeys.every((k) => next[k]));
    setShowInterestsError(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const selectedInterests = interestKeys.filter((k) => interests[k]);

    if (selectedInterests.length === 0) {
      setShowInterestsError(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          preferences: selectedInterests.reduce(
            (acc, interest) => ({ ...acc, [interest]: true }),
            {} as Record<string, boolean>
          ),
        }),
      });

      if (response.ok) {
        dialogRef.current?.close();
        setShowSuccess(true);
      } else if (response.status === 409) {
        dialogRef.current?.close();
        setShowAlreadySubscribed(true);
      } else {
        console.error('Newsletter subscription failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <dialog ref={dialogRef} id="newsletter-dialog" className={styles.newsletterDialog}>
        <form id="newsletter-form" onSubmit={handleSubmit}>
          <h2>Subscribe to Newsletter</h2>
          <div className={styles.formGroup}>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.interestsSection}>
            <h3>Select Your Interests</h3>
            <label className={styles.selectAll}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              Select All
            </label>
            <div className={styles.checkboxGroup}>
              {interestKeys.map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={interests[key]}
                    onChange={(e) => handleInterestChange(key, e.target.checked)}
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
            {showInterestsError && (
              <p className={styles.errorText}>Please select at least one interest</p>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit">Subscribe</button>
            <button type="button" className={styles.cancelBtn} onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      {showSuccess && (
        <div className={styles.successPopup} style={{ display: 'flex' }}>
          <div className={styles.successContent}>
            <h3>🎉 Successfully Subscribed!</h3>
            <p>Thank you for subscribing to our newsletter.</p>
            <button className={styles.okBtn} onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}

      {showAlreadySubscribed && (
        <div className={styles.successPopup} style={{ display: 'flex' }}>
          <div className={styles.successContent}>
            <h3>Already Subscribed!</h3>
            <p>This email is already subscribed to our newsletter.</p>
            <button className={styles.okBtn} onClick={() => setShowAlreadySubscribed(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export function openNewsletterDialog(email?: string) {
  const dialog = document.getElementById('newsletter-dialog') as HTMLDialogElement | null;
  const emailInput = dialog?.querySelector('input[type="email"]') as HTMLInputElement | null;
  if (email && emailInput) {
    emailInput.value = email;
  }
  dialog?.showModal();
}
