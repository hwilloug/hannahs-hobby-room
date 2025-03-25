import type { APIRoute } from 'astro';
import { addComment } from '../../lib/api';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { article_slug, comment_body, parent_comment_id, username } = await request.json();
    
    // Basic validation
    if (!article_slug || !comment_body || !username) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Add comment
    const comment = await addComment(article_slug, username, comment_body, parent_comment_id);

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