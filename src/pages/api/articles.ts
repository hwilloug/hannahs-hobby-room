import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';

export const POST: APIRoute = async ({ request, locals }) => {
  // Check authentication
  if (!locals.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    const { title, description, category, subcategories, heroImage, pubDate, content } = data;

    // Create slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });

    // Format subcategories
    const subcategoriesArray = subcategories
      ? subcategories.split(',').map((s: string) => s.trim())
      : [];

    // Create markdown content
    const markdown = [
      '---',
      `title: '${title.replace(/'/g, "''")}'`,
      `description: '${description.replace(/'/g, "''")}'`,
      `pubDate: '${new Date(pubDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })}'`,
      `heroImage: '${heroImage}'`,
      `category: '${category}'`,
      subcategoriesArray.length > 0 && `subcategories: ${JSON.stringify(subcategoriesArray)}`,
      '---',
      '',
      content
    ].filter(Boolean).join('\n');

    // Write file
    const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
    await fs.writeFile(filePath, markdown, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating article:', error);
    return new Response(JSON.stringify({ error: 'Failed to create article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};