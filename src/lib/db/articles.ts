import { hasPostContent } from '@/content/posts/registry';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { ApiComment, DbArticle, DbComment } from './types';
import { toApiComment } from './types';

export async function getAllArticlesFromDb(): Promise<DbArticle[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .not('title', 'is', null)
    .order('pub_date', { ascending: false });

  if (error) throw error;
  return (data ?? []) as DbArticle[];
}

export async function getArticleFromDb(slug: string): Promise<DbArticle | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return (data as DbArticle | null) ?? null;
}

export async function ensureArticle(slug: string): Promise<DbArticle> {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (existing) return existing as DbArticle;

  const { data, error } = await supabase
    .from('articles')
    .insert({ slug, likes: 0 })
    .select()
    .single();

  if (error) throw error;
  return data as DbArticle;
}

export async function getArticleWithComments(slug: string): Promise<{
  article: DbArticle;
  comments: ApiComment[];
}> {
  if (!hasPostContent(slug)) {
    throw new Error('NOT_FOUND');
  }

  const supabase = getSupabaseAdmin();
  const article = await ensureArticle(slug);

  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_slug', slug)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return {
    article,
    comments: ((comments ?? []) as DbComment[]).map(toApiComment),
  };
}

export async function updateLikes(slug: string, decrease: boolean): Promise<number> {
  if (!hasPostContent(slug)) {
    throw new Error('NOT_FOUND');
  }

  await ensureArticle(slug);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc('update_article_likes', {
    p_slug: slug,
    p_decrease: decrease,
  });

  if (error) throw error;
  return data as number;
}
