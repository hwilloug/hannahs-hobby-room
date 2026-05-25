import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/utils/consts';

const SITE_URL = 'https://hannahshobbyroom.com';

export function createSiteMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = '/blog-placeholder-1.jpg',
  type = 'website',
  publishDate,
  updatedDate,
}: {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: Date;
  updatedDate?: Date;
}): Metadata {
  const socialImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    authors: [{ name: 'Hannah Willoughby' }],
    alternates: {
      canonical: SITE_URL,
      types: {
        'application/rss+xml': `${SITE_URL}/rss.xml`,
      },
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: 'en_US',
      siteName: SITE_TITLE,
      title,
      description,
      images: [{ url: socialImage }],
      ...(publishDate && { publishedTime: publishDate.toISOString() }),
      ...(updatedDate && { modifiedTime: updatedDate.toISOString() }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  };
}

export { SITE_URL };
