import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { tagMeta, type TagSlug } from '@/lib/tagMeta';
import { findTagBySlug, tagToSlug } from '@/lib/tagSlug';
import { SITE_TITLE } from '@/utils/consts';
import CategoryIcon from '@/components/CategoryIcon';
import FormattedDate from '@/components/FormattedDate';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ category: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: tagSlug } = await params;
  const meta = tagMeta[tagSlug as TagSlug];
  const allTags = await getAllTags();
  const tagName = findTagBySlug(tagSlug, allTags);
  if (!tagName) return {};
  const title = meta?.name ?? tagName;
  return { title: `${title} - ${SITE_TITLE}` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: tagSlug } = await params;
  const allTags = await getAllTags();
  const tagName = findTagBySlug(tagSlug, allTags);

  if (!tagName) {
    notFound();
  }

  const meta = tagMeta[tagSlug as TagSlug];
  const posts = await getPostsByTag(tagName);
  const displayName = meta?.name ?? tagName;

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      <div className="m-12 rounded-xl border border-primary-dark bg-primary-main p-12 text-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-md:m-8 max-md:p-8">
        <h1 className="m-0 flex items-center justify-center gap-2 text-[3em] text-white [text-shadow:var(--text-shadow-header)] max-md:text-[2em]">
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-white/20 p-3 max-md:h-10 max-md:w-10 max-md:p-2 [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-white">
            <CategoryIcon tagSlug={tagSlug} className="icon-svg" />
          </span>
          {displayName}
        </h1>
        {meta?.description && (
          <p className="mx-auto mt-4 max-w-[600px] text-[1.2em] text-white/90">{meta.description}</p>
        )}
      </div>
      <section>
        <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 p-0 max-md:grid-cols-1 max-md:gap-4">
          {posts.map((post) => (
            <li key={post.slug} className="w-full min-w-0">
              <Link
                href={`/blog/${post.slug}/`}
                className="block h-full overflow-hidden rounded-xl border border-secondary-dark bg-secondary-light text-inherit no-underline shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_var(--secondary-dark)]"
              >
                <div className="flex items-center gap-2 border-b border-secondary-dark bg-secondary-main p-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c940]" />
                  </div>
                  <div className="flex-1 overflow-hidden rounded bg-secondary-light px-2 py-1 text-[0.8em] text-ellipsis whitespace-nowrap text-primary-dark">
                    {post.data.title}
                  </div>
                </div>
                <div className="p-4">
                  <img
                    src={post.data.heroImage}
                    alt=""
                    className="mb-4 h-[200px] w-full rounded-lg object-cover"
                  />
                  <h2 className="m-0 font-gluten text-[1.4em] leading-snug text-primary-dark">{post.data.title}</h2>
                  <p className="my-2 text-[0.9em] text-gray-custom">
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                  <p className="mt-2 mb-0 leading-normal text-gray-dark-custom">{post.data.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {meta?.background && (
        <section className="m-12 rounded-xl border border-primary-dark bg-primary-main p-12 text-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-md:m-8 max-md:p-8">
          <h2 className="text-white [text-shadow:var(--text-shadow)]">My {displayName} Background</h2>
          <p className="left mx-auto mt-4 max-w-[600px] text-[1.2em] text-white/90">{meta.background}</p>
        </section>
      )}
    </div>
  );
}
