import { getAllPosts } from '@/lib/posts';
import Carousel from '@/components/Carousel';
import BrowserCard from '@/components/BrowserCard';
import CategorySection from '@/components/CategorySection';
import NewsletterSignup from '@/components/NewsletterSignup';
import NewsletterPopup from '@/components/NewsletterPopup';

export default async function HomePage() {
  const sortedPosts = await getAllPosts();
  const featuredPosts = sortedPosts.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      <section className="mb-12 text-center">
        <h2 className="homePageHeader mb-1 ml-0 text-center text-white [text-shadow:1px_1px_1px_1px_black]">
          Featured Articles
        </h2>
        <Carousel>
          {featuredPosts.map((post) => (
            <BrowserCard
              key={post.slug}
              title={post.data.title}
              image={post.data.heroImage}
              url={`/blog/${post.slug}/`}
            />
          ))}
        </Carousel>
      </section>

      <div className="mx-auto max-w-[800px] rounded-xl border border-primary-dark bg-primary-main p-8 text-center text-white shadow-[8px_8px_var(--primary-dark)]">
        <h1 className="mb-4 flex flex-wrap justify-center gap-2 text-[3.052em] leading-[1.1] font-bold text-white [text-shadow:var(--text-shadow-header)]">
          <span className="welcome-word welcome-word-2">🌸Welcome</span>
          <span className="welcome-word welcome-word-3">to</span>
          <span className="welcome-word welcome-word-4">Hannah&apos;s</span>
          <span className="welcome-word welcome-word-5">Hobby</span>
          <span className="welcome-word welcome-word-6">Room🌸</span>
        </h1>
        <div className="mt-8 text-left">
          <p>
            Hi! I&apos;m Hannah, and I&apos;m thrilled to welcome you to my hobby blog. Here, I share what I&apos;ve been working on and how I did it! Browse by topic — from{' '}
            <span className="text-secondary-light underline decoration-secondary-light decoration-wavy decoration-1 underline-offset-4">
              crafts
            </span>{' '}
            and{' '}
            <span className="text-secondary-light underline decoration-secondary-light decoration-wavy decoration-1 underline-offset-4">
              antiquing
            </span>{' '}
            to cross stitch, gardening, and more.
          </p>
          <p>I hope you learn something new or find a new hobby to explore.</p>
          <p>Thank you for stepping into my world, and I can&apos;t wait to share this room with you!</p>
          <p>Warm regards,</p>
          <img src="/signature.png" alt="Hannah's signature" className="w-[100px]" />
        </div>
      </div>

      <NewsletterSignup />

      <div className="mt-16 grid gap-12">
        <CategorySection
          title="🎨 Crafts"
          description=""
          posts={sortedPosts.filter((p) => p.data.subcategories.includes('Crafts'))}
          tagSlug="crafts"
        />
        <CategorySection
          title="🏺 Antiquing"
          description=""
          posts={sortedPosts.filter((p) => p.data.subcategories.includes('Antiquing'))}
          tagSlug="antiquing"
        />
      </div>

      <NewsletterPopup />
    </div>
  );
}
