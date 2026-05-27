import Link from 'next/link';
import type { BlogPost } from '@/lib/posts';
import CategoryIcon from './CategoryIcon';

interface CategorySectionProps {
  title: string;
  description?: string;
  posts: BlogPost[];
  tagSlug: string;
  showDescription?: boolean;
}

export default function CategorySection({
  title,
  description,
  posts,
  tagSlug,
  showDescription = true,
}: CategorySectionProps) {
  const categoryPosts = posts.slice(0, 4);
  const titleWord = title.split(' ').slice(1).join(' ') || title;

  return (
    <section className="mb-8 rounded-xl border border-primary-dark bg-[rgba(var(--primary-main-rgb),0.5)] p-8 backdrop-blur-md">
      <div className="mb-8 flex items-start justify-between max-md:flex-col max-md:gap-4">
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-gluten text-[1.8em] text-primary-dark [text-shadow:var(--text-shadow-secondary)] dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-main p-2 [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-white">
              <CategoryIcon tagSlug={tagSlug} className="icon-svg size-16" />
            </span>
            {titleWord}
          </h2>
          {showDescription && description && (
            <p className="m-0 text-[1.1em] text-primary-dark dark:text-white">{description}</p>
          )}
        </div>
        <Link
          href={`/categories/${tagSlug}/`}
          className="flex items-center gap-2 font-medium text-primary-dark no-underline transition-transform duration-200 hover:translate-x-1 hover:text-primary-main max-md:self-start dark:text-white dark:hover:text-accent"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {categoryPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="block overflow-hidden rounded-lg border border-primary-dark bg-primary-main text-white no-underline shadow-[0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_black]"
          >
            <div className="flex items-center gap-2 rounded-t-lg border border-black bg-primary-dark p-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c940]" />
              </div>
              <div className="flex-1 overflow-hidden rounded bg-primary-light px-2 py-1 text-[0.8em] text-ellipsis whitespace-nowrap text-primary-dark">
                {post.data.title}
              </div>
            </div>
            <div className="rounded-b-lg bg-primary-main p-4">
              <img src={post.data.heroImage} alt="" className="mb-4 h-[150px] w-full rounded-lg object-cover" />
              <h3 className="mb-2 font-gluten text-[1.2em] text-primary-dark dark:text-white">{post.data.title}</h3>
              <p className="m-0 line-clamp-2 text-[0.9em] text-primary-dark dark:text-white">{post.data.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
