'use client';

import NewsletterDialog, { openNewsletterDialog } from './NewsletterDialog';

export default function NewsletterSignup() {
  return (
    <div className="my-16 rounded-xl border border-primary-dark bg-warning-main p-8 text-center shadow-[4px_4px_1px_var(--primary-dark)]">
      <h3 className="homePageHeader mb-2 ml-0 text-center text-white [text-shadow:var(--text-shadow-secondary)]">
        Stay Updated! 🌟
      </h3>
      <p className="mb-6 text-black">Subscribe to receive notifications about new hobby projects and tutorials!</p>
      <div className="mx-auto flex max-w-[500px] gap-4 max-[600px]:flex-col">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-[25px] border border-primary-dark px-6 py-3 text-base"
          id="pre-signup-email"
        />
        <button
          className="cursor-pointer rounded-[25px] border-none bg-primary-main px-6 py-3 text-base whitespace-nowrap text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark max-[600px]:w-full"
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
