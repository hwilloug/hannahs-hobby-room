import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/db/newsletter';
import { handleDbError, runWithSupabase } from '@/lib/api/errors';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  return runWithSupabase(async () => {
    let body: { email?: string; preferences?: Record<string, boolean> };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }

    const email = body.email?.trim();
    const preferences = body.preferences;

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
    }

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json({ message: 'preferences are required' }, { status: 400 });
    }

    const hasInterest = Object.values(preferences).some(Boolean);
    if (!hasInterest) {
      return NextResponse.json(
        { message: 'At least one interest must be selected' },
        { status: 400 }
      );
    }

    try {
      const status = await subscribeToNewsletter(email, preferences);
      if (status === 'exists') {
        return NextResponse.json({ message: 'Already subscribed' }, { status: 409 });
      }
      return NextResponse.json({ message: 'Subscribed' }, { status: 201 });
    } catch (error) {
      return handleDbError(error);
    }
  });
}
