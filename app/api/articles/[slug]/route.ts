import { NextRequest, NextResponse } from 'next/server';
import { getArticleWithComments } from '@/lib/db/articles';
import { handleDbError, runWithSupabase } from '@/lib/api/errors';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  return runWithSupabase(async () => {
    try {
      const { article, comments } = await getArticleWithComments(slug);
      return NextResponse.json({
        article: {
          slug: article.slug,
          likes: article.likes,
          createdAt: article.created_at,
          updatedAt: article.updated_at,
        },
        comments,
      });
    } catch (error) {
      return handleDbError(error);
    }
  });
}
