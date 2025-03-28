import { getCollection } from 'astro:content';
import { searchPosts } from '../../utils/search';

export async function GET({ url }: { url: URL }) {
	const query = url.searchParams.get('q')?.toLowerCase() || '';
	
	if (!query) {
		return new Response(JSON.stringify([]), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		const posts = await getCollection('blog');
		const searchResults = searchPosts(posts, query);

		return new Response(JSON.stringify(searchResults), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to search posts' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
} 