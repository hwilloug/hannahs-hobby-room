'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE_TITLE } from '@/utils/consts';
import HeaderLink from './HeaderLink';
import DarkModeToggle from './DarkModeToggle';
import CategoryIcon from './CategoryIcon';
import styles from './Header.module.css';

interface SearchResult {
  title: string;
  url: string;
}

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(target) &&
        !(e.target as Element).closest(`.${styles.searchResults}`)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  async function handleSearch(value: string) {
    if (value.length < 2) {
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const results = await response.json();
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navTop}>
          <div className={styles.leftSection}>
            <div className={styles.appIcon}>
              <img src="/poppy.png" alt="Poppy Logo" />
            </div>
            <h2 id="app-title">
              <Link href="/">{SITE_TITLE}</Link>
            </h2>
          </div>
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="search"
                id="search-input"
                placeholder="Search posts..."
                aria-label="Search posts"
                autoComplete="off"
                onInput={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  clearTimeout(debounceRef.current);
                  debounceRef.current = setTimeout(() => handleSearch(value), 300);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = (e.target as HTMLInputElement).value;
                    if (value) {
                      window.location.href = `/search?q=${encodeURIComponent(value)}`;
                    }
                  }
                }}
              />
              {showResults && (
                <div className={styles.searchResults}>
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.slice(0, 5).map((post) => (
                        <div
                          key={post.url}
                          className={styles.searchResultItem}
                          onClick={() => (window.location.href = post.url)}
                          onKeyDown={() => {}}
                          role="button"
                          tabIndex={0}
                        >
                          <div className={styles.searchResultTitle}>{post.title}</div>
                        </div>
                      ))}
                      <div
                        className={`${styles.searchResultItem} ${styles.viewAll}`}
                        onClick={() => {
                          const q = searchInputRef.current?.value ?? '';
                          window.location.href = `/search?q=${encodeURIComponent(q)}`;
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        View {searchResults.length > 5 ? 'all ' : ''}
                        {searchResults.length} result
                        {searchResults.length !== 1 ? 's' : ''}
                      </div>
                    </>
                  ) : (
                    <div className={styles.searchResultItem}>No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.rightSection}>
            <DarkModeToggle />
            <HeaderLink href="/about/" className={styles.hideMobile}>
              <div className="nav-content">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="icon-svg size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </span>
                <span className="text">About</span>
              </div>
            </HeaderLink>
            <button
              className={styles.menuToggle}
              aria-label="Toggle menu"
              aria-expanded={navActive}
              onClick={() => setNavActive(!navActive)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`${styles.navBottom} ${navActive ? styles.active : ''}`}>
          <div className={styles.internalLinks}>
            {(['crafts', 'antiquing'] as const).map((cat) => (
              <HeaderLink key={cat} href={`/categories/${cat}/`}>
                <div className="nav-content">
                  <span className="icon">
                    <CategoryIcon category={cat} className="icon-svg size-6" />
                  </span>
                  <span className="text">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </div>
              </HeaderLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
