import Link from 'next/link';

export default function WelcomeHero() {
  return (
    <section className="mb-12 rounded-xl border border-primary-dark bg-primary-main p-6 text-white shadow-[8px_8px_var(--primary-dark)] md:p-8">
      <h1 className="mb-4 flex flex-wrap justify-center gap-2 text-[2.2em] leading-[1.1] font-bold [text-shadow:var(--text-shadow-secondary)] md:text-[2.6em]">
        <span className="welcome-word welcome-word-2">🌸Welcome</span>
        <span className="welcome-word welcome-word-3">to</span>
        <span className="welcome-word welcome-word-4">Hannah&apos;s</span>
        <span className="welcome-word welcome-word-5">Hobby</span>
        <span className="welcome-word welcome-word-6">Room🌸</span>
      </h1>
      <div className="text-left text-[1.05em] leading-relaxed">
        <p>
          Hi! I&apos;m Hannah — I share what I&apos;ve been making and how I did it, from{' '}
          <span className="text-secondary-light underline decoration-secondary-light decoration-wavy decoration-1 underline-offset-4">
            crafts
          </span>{' '}
          and{' '}
          <span className="text-secondary-light underline decoration-secondary-light decoration-wavy decoration-1 underline-offset-4">
            antiquing
          </span>{' '}
          to cross stitch, gardening, and more.
        </p>
        <p className="mt-3">
          Pick a topic below to browse, or{' '}
          <Link
            href="/about/"
            className="text-secondary-light underline decoration-secondary-light decoration-wavy decoration-1 underline-offset-4 hover:text-white"
          >
            read more about me
          </Link>
          .
        </p>
        <div className="mt-4 flex items-end gap-4">
          <p className="m-0">Warm regards,</p>
          <img src="/signature.png" alt="Hannah's signature" className="w-[80px]" />
        </div>
      </div>
    </section>
  );
}
