'use client';

import { useEffect, useState, FormEvent } from 'react';
import { openNewsletterDialog } from './NewsletterDialog';

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
    <div
      className={`fixed left-1/2 z-[1000] w-[90%] max-w-[600px] -translate-x-1/2 rounded-xl border border-secondary-dark bg-warning-main p-10 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out max-[640px]:p-8 ${
        visible ? 'bottom-5 opacity-100' : '-bottom-full opacity-0'
      }`}
      id="newsletter-popup"
    >
      <div className="relative mx-auto max-w-[500px]">
        <button
          className="absolute -top-6 -right-6 m-[5px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-primary-main p-0 pb-[3px] text-[1.4em] leading-none text-white transition-[background-color,transform] duration-200 hover:scale-110 hover:bg-primary-dark"
          aria-label="Close popup"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
        <h3 className="m-0 mb-2 text-center text-[1.8em] text-white max-[640px]:text-2xl">📬 Stay in the Loop!</h3>
        <p className="m-0 mb-6 text-center text-base leading-snug text-black">
          Subscribe to get the latest hobby updates and tutorials delivered straight to your inbox!
        </p>
        <form className="mx-auto flex max-w-[480px] gap-4 max-[640px]:flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            aria-label="Email address"
            id="popup-email-input"
            className="flex-1 rounded-[25px] border-2 border-white/30 bg-white/90 px-6 py-4 text-base text-black focus:border-white focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-[25px] border-none bg-primary-main px-8 py-4 text-base whitespace-nowrap text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark max-[640px]:w-full"
          >
            Select Interests
          </button>
        </form>
      </div>
    </div>
  );
}
