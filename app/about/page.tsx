import Link from 'next/link';
import { createSiteMetadata } from '@/lib/metadata';

export const metadata = createSiteMetadata({
  title: 'About Me',
  description: 'About Me',
  image: 'https://blog-images.poppyland.dev/me.jpeg',
  type: 'article',
});

export default function AboutPage() {
  return (
    <article className="mx-auto mb-8 max-w-[800px] rounded-xl border border-primary-dark bg-[rgba(var(--primary-main-rgb),0.6)] p-4">
      <div className="w-full">
        <img
          src="https://blog-images.poppyland.dev/me.jpeg"
          alt="Hannah Willoughby"
          className="mx-auto block h-[500px] w-[500px] max-w-full rounded-t-xl object-cover"
        />
      </div>
      <div className="prose mb-4 rounded-b-xl bg-primary-light p-4">
        <div className="mt-4 text-center leading-none">
          <h1 className="mb-2 text-[3.052em] text-primary-dark">About Me</h1>
        </div>
        <div>
          <p>
            Hello world! I&apos;m Hannah, a DevOps Engineer by day and an enthusiastic hobbyist by night. From my home in Fort Mill, SC, which I share with my partner Danny and our three cats, I pursue a diverse array of creative interests. My passions range from nurturing my garden and crafting with needle and thread, to building with wood and hunting for antique treasures. When I&apos;m not creating something with my hands, you&apos;ll find me immersed in a good book, working on coding projects, or studying languages. This blog is where I document these adventures and share what I learn along the way.
          </p>
          <p className="centered">Find me on:</p>
          <div className="flex flex-col items-center gap-4">
            <a href="https://github.com/hwilloug" target="_blank" rel="noreferrer">
              <button className="w-[300px] cursor-pointer rounded-lg border border-secondary-dark bg-secondary-main px-4 py-4 text-white hover:bg-secondary-dark" type="button">
                Github
              </button>
            </a>
            <a href="https://www.linkedin.com/in/hannah-willoughby-6a8664160/" target="_blank" rel="noreferrer">
              <button className="w-[300px] cursor-pointer rounded-lg border border-secondary-dark bg-secondary-main px-4 py-4 text-white hover:bg-secondary-dark" type="button">
                LinkedIn
              </button>
            </a>
            <a href="https://www.goodreads.com/hannah218" target="_blank" rel="noreferrer">
              <button className="w-[300px] cursor-pointer rounded-lg border border-secondary-dark bg-secondary-main px-4 py-4 text-white hover:bg-secondary-dark" type="button">
                Goodreads
              </button>
            </a>
            <a href="https://hannahwilloughby.dev" target="_blank" rel="noreferrer">
              <button className="w-[300px] cursor-pointer rounded-lg border border-secondary-dark bg-secondary-main px-4 py-4 text-white hover:bg-secondary-dark" type="button">
                HannahWilloughby.dev
              </button>
            </a>
          </div>

          <h1 className="centered my-3">🌸</h1>

          <div className="m-8 grid grid-cols-2 items-center gap-4 max-[600px]:m-4 max-[600px]:grid-cols-1">
            <img
              src="https://blog-images.poppyland.dev/me_and_danny.jpeg"
              alt="Hannah and her partner Danny"
              className="rounded-lg border-[10px] border-secondary-dark"
            />
            <img
              src="https://blog-images.poppyland.dev/family_photo_2.jpeg"
              alt="Their four cats"
              className="rounded-lg border-[10px] border-secondary-dark"
            />
          </div>

          <h1 className="centered my-3">🌸</h1>

          <h3 className="centered">Contact me</h3>
          <p className="centered">
            Have a question or comment? I&apos;d love to hear from you! You can reach me via email at{' '}
            <Link href="mailto:support@hannahshobbyroom.com">support@hannahshobbyroom.com</Link>.
          </p>
        </div>
      </div>
    </article>
  );
}
