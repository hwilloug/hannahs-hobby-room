// Blog API client for fetching articles
const API_BASE_URL = 'https://blog-api.poppyland.dev';

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  img: string;
  imgAlt: string;
  category: string;
  subcategory: string[];
  featured: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string; // UUID
  timestamp: string;
  body: string;
  username: string;
  articleSlug: string;
  parentId?: string;
  children?: Comment[];
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function likeArticle(slug: string): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}/like`, {
      method: 'POST',
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
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        body,
        parent_id: parentId,
        article_slug: articleSlug,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}
