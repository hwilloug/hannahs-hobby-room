import type { APIRoute } from 'astro';
import { addComment } from '../../lib/api';

export const POST: APIRoute = async ({ request, locals }) => {
  // Check authentication
  if (!locals.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { postSlug, body, parentId } = await request.json();

    // Get user info from Clerk
    const userResponse = await fetch(`https://api.clerk.com/v1/users/${locals.userId}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await userResponse.json();
    const username = userData.username || `${userData.firstName} ${userData.lastName}`.trim();

    // Add comment
    const comment = await addComment(postSlug, username, body, parentId);

    return new Response(JSON.stringify(comment), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(JSON.stringify({ error: 'Failed to add comment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};