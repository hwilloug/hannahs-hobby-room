import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher([
  '/manage-articles(.*)',
  '/dashboard(.*)'
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn, sessionClaims } = auth();
  
  // Check if route needs protection
  if (isProtectedRoute(context.request)) {
    // Not signed in - redirect to sign in
    if (!userId) {
      const currentUrl = new URL(context.request.url);
      const returnUrl = currentUrl.pathname + currentUrl.search;
      return redirectToSignIn({ returnBackUrl: returnUrl });
    }

    // Check for admin role in public metadata
    // @ts-ignore
    const isAdmin = sessionClaims?.metadata?.roles?.includes('admin') || false;

    if (!isAdmin) {
      // User is signed in but not an admin - redirect to home
      return new Response('Unauthorized - Admin access required', {
        status: 403,
        headers: {
          'Location': '/'
        }
      });
    }

    // Add userId to context for admin routes
    context.locals.userId = userId;
    context.locals.isAdmin = true;
  } else {
    context.locals.isAdmin = false;
    context.locals.userId = userId || '';
  }
});