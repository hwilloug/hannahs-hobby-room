import { getAllPosts } from '@/lib/posts';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/utils/consts';

const SITE_URL = 'https://hannahshobbyroom.com';

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid>${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description><![CDATA[${post.data.subtitle ?? ''}]]></description>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
