import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher([
  '/manage-articles(.*)',
  '/dashboard(.*)'
]);

export const onRequest = clerkMiddleware((auth, context, next) => {

  const { userId, sessionClaims, redirectToSignIn } = auth();

  // Check for admin role
  // @ts-ignore
  const isAdmin = sessionClaims?.roles?.includes('admin') || false;

  // Check if route needs protection  
  if (isProtectedRoute(context.request)) {
    // Not signed in - redirect to sign in
    if (!userId) {
      const currentUrl = new URL(context.request.url);
      const returnUrl = currentUrl.pathname + currentUrl.search;
      return redirectToSignIn({ returnBackUrl: returnUrl });
    }

    if (!isAdmin) {
      // User is signed in but not an admin - redirect to home
      return new Response('Unauthorized - Admin access required', {
        status: 403,
        headers: {
          'Location': '/'
        }
      });
    }
  }
  context.locals.userId = userId || '';
  context.locals.isAdmin = isAdmin;
  context.locals.username = sessionClaims?.username as string || '';
  return next()
});