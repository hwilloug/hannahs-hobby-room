'use client';

import { useRef, useState, FormEvent } from 'react';

const API_BASE = '/api';

export default function NewsletterDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showInterestsError, setShowInterestsError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlreadySubscribed, setShowAlreadySubscribed] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [interests, setInterests] = useState({
    crafts: false,
    antiquing: false,
  });

  const interestKeys = Object.keys(interests) as (keyof typeof interests)[];

  function handleSelectAll(checked: boolean) {
    setSelectAll(checked);
    setInterests({
      crafts: checked,
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
      const response = await fetch(`${API_BASE}/newsletter`, {
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
      <dialog
        ref={dialogRef}
        id="newsletter-dialog"
        className="w-[90%] max-w-[500px] rounded-xl border border-primary-dark bg-primary-light p-8 shadow-[8px_8px_var(--primary-dark)] backdrop:bg-black/50"
      >
        <form id="newsletter-form" onSubmit={handleSubmit}>
          <h2 className="text-primary-dark">Subscribe to Newsletter</h2>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-primary-dark bg-primary-main px-3 py-2.5 text-base text-white"
            />
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-primary-dark">Select Your Interests</h3>
            <label className="mb-2 flex items-center gap-2 font-bold text-primary-dark">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              Select All
            </label>
            <div className="mt-4 flex flex-col gap-2">
              {interestKeys.map((key) => (
                <label key={key} className="flex items-center gap-2 text-primary-dark">
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
              <p className="mt-2 text-sm text-[#ff4444]">Please select at least one interest</p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="cursor-pointer rounded-md border border-primary-dark bg-primary-main px-5 py-2.5 text-base text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Subscribe
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md border border-primary-dark bg-transparent px-5 py-2.5 text-base text-primary-dark transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-dark hover:text-white"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      {showSuccess && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-primary-light p-8 text-center shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <h3 className="mb-4 text-primary-dark">🎉 Successfully Subscribed!</h3>
            <p>Thank you for subscribing to our newsletter.</p>
            <button
              className="mt-4 cursor-pointer rounded-md border border-primary-dark bg-primary-main px-5 py-2.5 text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-dark"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showAlreadySubscribed && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-primary-light p-8 text-center shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <h3 className="mb-4 text-primary-dark">Already Subscribed!</h3>
            <p>This email is already subscribed to our newsletter.</p>
            <button
              className="mt-4 cursor-pointer rounded-md border border-primary-dark bg-primary-main px-5 py-2.5 text-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary-dark"
              onClick={() => setShowAlreadySubscribed(false)}
            >
              OK
            </button>
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
