import { NextRequest, NextResponse } from 'next/server';
import { updateLikes } from '@/lib/db/articles';
import { handleDbError, runWithSupabase } from '@/lib/api/errors';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  return runWithSupabase(async () => {
    let decrease = false;
    try {
      const body = await request.json();
      decrease = Boolean(body?.decrease);
    } catch {
      // empty body is fine
    }

    try {
      const likes = await updateLikes(slug, decrease);
      return NextResponse.json({ likes });
    } catch (error) {
      return handleDbError(error);
    }
  });
}
