import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import { format, parseISO } from 'date-fns';

// Function to format date to MMM dd yyyy format (e.g., "Mar 15 2024")
function formatDate(dateString) {
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
  return format(date, 'MMM dd yyyy');
}

// Function to create markdown content from article data
function createMarkdownContent(article) {
  const frontmatter = [
    '---',
    `title: '${article.title.replace(/'/g, "''")}'`,
    `description: '${article.subtitle.replace(/'/g, "''")}'`,
    `pubDate: '${formatDate(article.createdAt)}'`,
    article.updatedAt && `updatedDate: '${formatDate(article.updatedAt)}'`,
    `heroImage: '${article.img}'`,
    `category: '${article.category}'`,
    article.subcategory.length > 0 && `subcategories: ${JSON.stringify(article.subcategory)}`,
    '---',
    '',
    article.content
  ].filter(Boolean).join('\n');

  return frontmatter;
}

// Main migration function
async function migrateArticles(articles) {
  const contentDir = path.join(process.cwd(), 'src/content/blog');

  // Ensure the content directory exists
  await fs.mkdir(contentDir, { recursive: true });

  for (const article of articles) {
    try {
      // Create slug from title
      const slug = slugify(article.title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });

      // Create markdown content
      const markdown = createMarkdownContent(article);

      // Write to file
      await fs.writeFile(
        path.join(contentDir, `${slug}.md`),
        markdown,
        'utf-8'
      );

      console.log(`✓ Migrated: ${article.title}`);
    } catch (error) {
      console.error(`✗ Failed to migrate ${article.title}:`, error);
    }
  }
}

// Example usage
// TODO fix with pgquery
const articles = [
  {
    title: "Getting Started with Astro",
    subtitle: "A beginner's guide to Astro",
    content: "# Introduction\n\nAstro is a modern static site generator...",
    img: "/blog-placeholder-1.jpg",
    category: "Coding",
    subcategory: ["Tutorials", "Web Development"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  }
];

// Run migration
migrateArticles(articles)
  .then(() => console.log('Migration completed'))
  .catch(console.error);