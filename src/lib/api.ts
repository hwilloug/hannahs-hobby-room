// Blog API client — calls same-origin Next.js routes backed by Supabase
import { getApiBase } from '@/utils/apiBase';

export interface Comment {
  id: string;
  timestamp: string;
  body: string;
  username: string;
  article_slug: string;
  parent_id?: string;
  children?: Comment[];
}

function apiUrl(path: string): string {
  return `${getApiBase()}${path}`;
}

export async function getArticle(slug: string): Promise<{
  article: { slug: string; likes: number; createdAt: string; updatedAt: string };
  comments: Comment[];
} | null> {
  try {
    const response = await fetch(apiUrl(`/api/articles/${slug}`));
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function likeArticle(slug: string, decrement: boolean = false): Promise<number> {
  try {
    const response = await fetch(apiUrl(`/api/articles/${slug}/like`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decrease: decrement }),
    });
    if (!response.ok) {
      throw new Error('Failed to like article');
    }
    const data = await response.json();
    return data.likes;
  } catch (error) {
    console.error('Error liking article:', error);
    return 0;
  }
}

export async function addComment(
  articleSlug: string,
  username: string,
  body: string,
  parentId?: string
): Promise<Comment> {
  const response = await fetch(apiUrl('/api/comments'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      comment_body: body,
      parent_comment_id: parentId,
      article_slug: articleSlug,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add comment');
  }

  return await response.json();
}
