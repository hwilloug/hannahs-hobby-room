import { hasPostContent } from '@/content/posts/registry';
import { ensureArticle } from '@/lib/db/articles';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { ApiComment, DbComment } from './types';
import { toApiComment } from './types';

export async function createComment(input: {
  articleSlug: string;
  username: string;
  body: string;
  parentId?: string;
}): Promise<ApiComment> {
  if (!hasPostContent(input.articleSlug)) {
    throw new Error('NOT_FOUND');
  }

  await ensureArticle(input.articleSlug);

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('comments')
    .insert({
      article_slug: input.articleSlug,
      username: input.username.trim(),
      body: input.body.trim(),
      parent_id: input.parentId ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return toApiComment(data as DbComment);
}
