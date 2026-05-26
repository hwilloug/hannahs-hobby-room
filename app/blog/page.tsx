import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import FormattedDate from '@/components/FormattedDate';

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto w-full max-w-[960px] px-4">
      <ul className="m-0 flex list-none flex-wrap gap-8 p-0 max-[720px]:gap-2">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className={`w-[calc(50%-1rem)] max-[720px]:w-full max-[720px]:text-center ${
              index === 0 ? 'mb-4 w-full text-center max-[720px]:mb-0' : ''
            }`}
          >
            <Link href={`/blog/${post.slug}/`} className="block transition-all duration-200 ease-in-out hover:[&_.blog-date]:text-accent hover:[&_.blog-title]:text-accent">
              <img
                width={720}
                height={360}
                src={post.data.heroImage}
                alt=""
                className={index === 0 ? 'w-full' : ''}
              />
              <h4 className={`blog-title m-0 leading-none text-black-custom ${index === 0 ? 'text-[2.369rem] max-[720px]:text-[1.563em]' : ''}`}>
                {post.data.title}
              </h4>
              <p className="blog-date m-0 text-gray-custom">
                <FormattedDate date={post.data.pubDate} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
