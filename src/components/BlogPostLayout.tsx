import Link from 'next/link';
import type { BlogPostData } from '@/lib/posts';
import { tagToSlug } from '@/lib/tagSlug';
import FormattedDate from './FormattedDate';
import LikeButton from './LikeButton';
import Comments from './Comments';
import NewsletterSignup from './NewsletterSignup';
import RelatedArticles from './RelatedArticles';
import AboutMeFooter from './AboutMeFooter';

interface BlogPostLayoutProps {
  data: BlogPostData;
  slug: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({ data, slug, children }: BlogPostLayoutProps) {
  const {
    title,
    subtitle,
    pubDate,
    updatedDate,
    heroImage,
    subcategories = [],
  } = data;

  return (
    <article className="mx-auto my-8 max-w-[800px] rounded-xl border border-primary-dark bg-[rgba(var(--primary-main-rgb),0.6)] p-4">
      <div className="w-full">
        {heroImage && (
          <img
            src={heroImage}
            alt={title}
            className="mx-auto block h-[500px] w-full rounded-t-xl object-cover"
          />
        )}
      </div>
      <div className="prose mb-4 rounded-b-xl bg-primary-light p-4">
        <div className="mb-4 py-4 text-center leading-none">
          <h1 className="mb-2 text-[2.441em] text-primary-dark">{title}</h1>
          <p className="text-gray-dark-custom">{subtitle}</p>
          <div className="mb-4 text-left text-primary-dark">
            <FormattedDate date={pubDate} />
            {updatedDate && (
              <div className="italic">
                Last updated on <FormattedDate date={updatedDate} />
              </div>
            )}
            <p>Written by Hannah Willoughby</p>
            <div className="my-4 flex flex-wrap gap-2">
              {subcategories.map((tag) => (
                <Link
                  key={tag}
                  href={`/categories/${tagToSlug(tag)}/`}
                  className="flex items-center justify-center rounded-full border border-secondary-dark bg-secondary-main px-3 py-1.5 text-[0.9em] font-medium text-white no-underline hover:bg-secondary-dark"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <LikeButton postSlug={slug} />
          </div>
          <hr />
        </div>
        <div className="px-4">{children}</div>
        <div className="my-4 text-right text-[0.8em] text-[rgb(var(--primary-main-rgb))] [&_p]:m-0">
          <p>Written by Hannah Willoughby</p>
          <p>
            Published on <FormattedDate date={pubDate} />
          </p>
          {updatedDate && (
            <p>
              Last updated on <FormattedDate date={updatedDate} />
            </p>
          )}
        </div>
        <LikeButton postSlug={slug} />
      </div>
      <Comments postSlug={slug} />
      <div className="mx-auto my-16 max-w-[800px]">
        <hr />
        <RelatedArticles currentSlug={slug} subcategories={subcategories} />
        <hr />
        <NewsletterSignup />
        <AboutMeFooter />
      </div>
    </article>
  );
}
