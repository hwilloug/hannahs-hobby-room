import { getAllPosts } from '@/lib/posts';
import { featuredTagSlugs, tagMeta, type TagSlug } from '@/lib/tagMeta';
import CategorySection from '@/components/CategorySection';
import NewsletterSignup from '@/components/NewsletterSignup';
import NewsletterPopup from '@/components/NewsletterPopup';
import TopicHubCard from '@/components/TopicHubCard';
import WelcomeHero from '@/components/WelcomeHero';

const topicEmojis: Record<TagSlug, string> = {
  crafts: '🎨',
  antiquing: '🏺',
};

const categoryTagNames: Record<TagSlug, string> = {
  crafts: 'Crafts',
  antiquing: 'Antiquing',
};

export default async function HomePage() {
  const sortedPosts = await getAllPosts();

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-8">
      <WelcomeHero />

      <section className="mb-12" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="homePageHeader mb-6 text-center text-white [text-shadow:1px_1px_1px_1px_black]"
        >
          Explore Topics
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredTagSlugs.map((slug) => {
            const meta = tagMeta[slug];
            return (
              <TopicHubCard
                key={slug}
                tagSlug={slug}
                name={meta.name}
                description={meta.description}
                emoji={topicEmojis[slug]}
              />
            );
          })}
        </div>
      </section>

      <div className="grid gap-12">
        {featuredTagSlugs.map((slug) => {
          const meta = tagMeta[slug];
          const tagName = categoryTagNames[slug];
          return (
            <CategorySection
              key={slug}
              title={`${topicEmojis[slug]} ${meta.name}`}
              description={meta.description}
              posts={sortedPosts.filter((p) => p.data.subcategories.includes(tagName))}
              tagSlug={slug}
              showDescription={false}
            />
          );
        })}
      </div>

      <NewsletterSignup />
      <NewsletterPopup />
    </div>
  );
}
