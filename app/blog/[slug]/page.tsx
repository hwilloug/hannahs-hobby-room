import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { createSiteMetadata } from '@/lib/metadata';
import BlogPostLayout from '@/components/BlogPostLayout';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return createSiteMetadata({
    title: post.data.title,
    description: post.data.subtitle ?? post.data.title,
    image: post.data.heroImage,
    type: 'article',
    publishDate: post.data.pubDate,
    updatedDate: post.data.updatedDate,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return (
    <BlogPostLayout data={post.data} slug={post.slug}>
      <Content />
    </BlogPostLayout>
  );
}
