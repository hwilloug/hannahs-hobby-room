import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import FormattedDate from './FormattedDate';

interface RelatedArticlesProps {
  currentSlug: string;
  subcategories: string[];
}

export default async function RelatedArticles({
  currentSlug,
  subcategories,
}: RelatedArticlesProps) {
  const allPosts = await getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false;
      const postSubcategories = post.data.subcategories || [];
      return postSubcategories.some((sub) => subcategories.includes(sub));
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mb-16 pt-8">
      <h2 className="mb-6 text-center text-primary-dark dark:text-white">Related Articles</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 max-md:grid-cols-1">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-primary-dark bg-primary-light text-inherit no-underline shadow-[4px_4px_var(--primary-dark)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 dark:bg-[rgba(var(--primary-main-rgb),0.2)]"
          >
            <div className="flex items-center border-b border-primary-dark bg-primary-main p-3 dark:bg-[rgba(var(--primary-main-rgb),0.3)]">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full border border-black/10 bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full border border-black/10 bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full border border-black/10 bg-[#28c940]" />
              </div>
              <div className="mr-12 flex-1 text-center text-[0.9em] text-primary-dark dark:text-white">
                Related Post
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <img
                src={post.data.heroImage}
                alt=""
                className="mb-4 h-[150px] w-full rounded-lg border border-primary-dark object-cover"
              />
              <h3 className="mb-2 font-gluten text-[1.2em] text-primary-dark dark:text-white">{post.data.title}</h3>
              <p className="mb-2 text-[0.9em] text-gray-custom">
                <FormattedDate date={post.data.pubDate} />
              </p>
              <p className="m-0 line-clamp-2 text-[0.9em] text-gray-dark-custom dark:text-white/90">
                {post.data.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
