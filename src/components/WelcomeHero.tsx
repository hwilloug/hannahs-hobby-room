import Link from 'next/link';

const ABOUT_PHOTO = 'https://blog-images.poppyland.dev/me.jpeg';

export default function WelcomeHero() {
  return (
    <section className="mb-12 overflow-hidden rounded-xl border border-primary-dark bg-primary-main shadow-[8px_8px_var(--primary-dark)]">
      <div className="flex flex-col md:flex-row">
        <div className="shrink-0 md:w-[280px]">
          <img
            src={ABOUT_PHOTO}
            alt="Hannah Willoughby"
            className="h-[220px] w-full object-cover md:h-full md:min-h-[280px]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6 text-white md:p-8">
          <h1 className="mb-4 flex flex-wrap justify-center gap-2 text-[2.2em] leading-[1.1] font-bold [text-shadow:var(--text-shadow-header)] md:justify-start md:text-[2.6em]">
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
        </div>
      </div>
    </section>
  );
}
