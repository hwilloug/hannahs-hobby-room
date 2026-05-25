import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export function supabaseNotConfiguredResponse() {
  return NextResponse.json(
    { message: 'Database is not configured. Set Supabase environment variables.' },
    { status: 503 }
  );
}

export async function runWithSupabase(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  if (!isSupabaseConfigured()) {
    return supabaseNotConfiguredResponse();
  }
  return handler();
}

export function handleDbError(error: unknown) {
  if (error instanceof Error && error.message === 'NOT_FOUND') {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }
  console.error(error);
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
