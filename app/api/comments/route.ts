import { NextRequest, NextResponse } from 'next/server';
import { createComment } from '@/lib/db/comments';
import { handleDbError, runWithSupabase } from '@/lib/api/errors';

export async function POST(request: NextRequest) {
  return runWithSupabase(async () => {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    const articleSlug = (body.article_slug ?? body.articleSlug) as string | undefined;
    const username = body.username as string | undefined;
    const commentBody = (body.comment_body ?? body.body) as string | undefined;
    const parentId = (body.parent_comment_id ?? body.parent_id ?? body.parentId) as
      | string
      | undefined;

    if (!articleSlug || !username || !commentBody) {
      return NextResponse.json(
        { message: 'article_slug, username, and comment body are required' },
        { status: 400 }
      );
    }

    if (username.length > 100 || commentBody.length > 5000) {
      return NextResponse.json({ message: 'Input too long' }, { status: 400 });
    }

    try {
      const comment = await createComment({
        articleSlug,
        username,
        body: commentBody,
        parentId,
      });
      return NextResponse.json(comment, { status: 201 });
    } catch (error) {
      return handleDbError(error);
    }
  });
}
