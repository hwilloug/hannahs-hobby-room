import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { searchPosts } from '@/utils/search';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const posts = await getAllPosts();
    const searchResults = searchPosts(posts, query);
    return NextResponse.json(searchResults);
  } catch {
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
}
