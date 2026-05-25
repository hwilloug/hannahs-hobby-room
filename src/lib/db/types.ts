export interface DbArticle {
  slug: string;
  likes: number;
  title: string | null;
  subtitle: string | null;
  pub_date: string | null;
  updated_date: string | null;
  hero_image: string | null;
  subcategories: string[];
  created_at: string;
  updated_at: string;
}

export interface DbComment {
  id: string;
  article_slug: string;
  username: string;
  body: string;
  parent_id: string | null;
  created_at: string;
}

export interface ApiComment {
  id: string;
  timestamp: string;
  body: string;
  username: string;
  article_slug: string;
  parent_id?: string;
}

export function toApiComment(row: DbComment): ApiComment {
  return {
    id: row.id,
    timestamp: row.created_at,
    body: row.body,
    username: row.username,
    article_slug: row.article_slug,
    ...(row.parent_id ? { parent_id: row.parent_id } : {}),
  };
}
