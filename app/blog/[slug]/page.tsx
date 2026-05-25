import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { createSiteMetadata } from '@/lib/metadata';
import BlogPostLayout from '@/components/BlogPostLayout';
import MarkdownContent from '@/components/MarkdownContent';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostLayout data={post.data} slug={post.slug}>
      <MarkdownContent content={post.content} />
    </BlogPostLayout>
  );
}
