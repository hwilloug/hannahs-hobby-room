import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function subscribeToNewsletter(
  email: string,
  preferences: Record<string, boolean>
): Promise<'created' | 'exists'> {
  const supabase = getSupabaseAdmin();
  const normalizedEmail = email.trim().toLowerCase();

  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (existing) return 'exists';

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: normalizedEmail,
    preferences,
  });

  if (error) {
    if (error.code === '23505') return 'exists';
    throw error;
  }

  return 'created';
}
