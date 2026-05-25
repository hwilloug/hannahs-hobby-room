/** Base URL for blog API routes (same-origin when unset). */
export function getApiBase(): string {
  if (typeof window !== 'undefined') {
    return '';
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
