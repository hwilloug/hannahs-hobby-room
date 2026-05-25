import BrowserCard from '@/components/BrowserCard';
import { getAllPosts } from '@/lib/posts';
import { searchPosts } from '@/utils/search';
import SearchForm from './SearchForm';
import styles from './search.module.css';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || '';
  const posts = await getAllPosts();
  const searchResults = query ? searchPosts(posts, query) : [];

  return (
    <div className={styles.searchPage}>
      <h1>{query ? `Search results for "${q}"` : 'Search'}</h1>
      <SearchForm initialQuery={q ?? ''} />
      {query && (
        <div className={styles.resultsInfo}>
          <p>
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{q}&quot;
          </p>
        </div>
      )}
      <div className={styles.searchResults}>
        {searchResults.map((post) => (
          <BrowserCard
            key={post.url}
            title={post.title}
            image={post.heroImage || ''}
            url={post.url}
            subtitle={post.subtitle}
            showSubtitle
          />
        ))}
      </div>
    </div>
  );
}
