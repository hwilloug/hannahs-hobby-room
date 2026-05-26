import Link from 'next/link';

export default function AboutMeFooter() {
  return (
    <div className="mt-8 rounded-xl border border-primary-dark bg-primary-light p-6 text-center shadow-[4px_4px_var(--primary-dark)] dark:bg-[rgba(var(--primary-main-rgb),0.2)]">
      <h2 className="m-0 text-center font-gluten text-primary-dark dark:text-white">About Me</h2>
      <img
        src="https://blog-images.poppyland.dev/me.jpeg"
        alt="Hannah Willoughby"
        className="mx-auto my-0 mb-4 block h-[150px] w-[150px] rounded-full border-[3px] border-primary-dark"
      />
      <p className="mb-6 leading-normal text-gray-dark-custom dark:text-white/90">
        Hello world! I&apos;m Hannah, a DevOps Engineer by day and an enthusiastic hobbyist by night.
        From my home in Fort Mill, SC, I pursue a diverse array of creative interests.
      </p>
      <Link
        href="/about/"
        className="inline-block rounded-lg border border-secondary-dark bg-secondary-main px-6 py-3 text-white no-underline transition-colors duration-200 hover:bg-secondary-dark"
      >
        Read More
      </Link>
    </div>
  );
}
