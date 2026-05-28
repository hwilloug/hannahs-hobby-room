'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_TITLE } from '@/utils/consts';
import HeaderLink from './HeaderLink';
import DarkModeToggle from './DarkModeToggle';

interface SearchResult {
  title: string;
  url: string;
}

export default function Header() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(target)
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
    <header className="bg-primary-main shadow-[0_2px_8px_rgba(var(--black),5%)]">
      <nav className="relative mx-auto border-b border-primary-dark p-2 text-white">
        <div className="flex flex-nowrap items-center justify-between gap-2 max-md:flex-wrap max-md:pb-2">
          <div className="flex shrink-0 items-center gap-4">
            <div className="h-[50px] w-[50px]">
              <Image
                src="/poppy.png"
                alt="Poppy Logo"
                width={50}
                height={50}
                sizes="50px"
                priority
                className="h-full w-full"
              />
            </div>
            <h2 id="app-title" className="m-0 text-[2em] font-extrabold max-md:min-w-0 max-md:truncate max-md:text-xl max-md:whitespace-nowrap [&_a]:text-white [&_a]:no-underline">
              <Link href="/">{SITE_TITLE}</Link>
            </h2>
          </div>
          <div className="flex min-w-[200px] flex-1 justify-end px-4 max-md:order-2 max-md:mt-2 max-md:w-full max-md:flex-[1_0_100%] max-md:justify-stretch max-md:px-0">
            <div className="relative w-full max-w-[400px]">
              <input
                ref={searchInputRef}
                type="search"
                id="search-input"
                placeholder="Search posts..."
                aria-label="Search posts"
                autoComplete="off"
                className="w-full rounded-[20px] border border-white/20 bg-white/10 px-4 py-2 text-base text-white placeholder:text-white/70 focus:border-white/30 focus:bg-white/15 focus:outline-none"
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
                <div
                  ref={searchResultsRef}
                  className="absolute top-full right-0 left-0 z-[1000] mt-2 max-h-[400px] overflow-y-auto rounded-lg border border-primary-dark bg-primary-main p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                >
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.slice(0, 5).map((post) => (
                        <div
                          key={post.url}
                          className="mb-1 cursor-pointer rounded px-4 py-3 text-white transition-all duration-200 hover:-translate-y-px hover:bg-primary-dark"
                          onClick={() => (window.location.href = post.url)}
                          onKeyDown={() => {}}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="font-bold">{post.title}</div>
                        </div>
                      ))}
                      <div
                        className="mt-3 cursor-pointer bg-white px-4 py-4 text-center font-bold text-primary-main transition-all duration-200 hover:bg-primary-light"
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
                    <div className="mb-1 cursor-pointer rounded px-4 py-3 text-white">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <DarkModeToggle />
            <HeaderLink href="/about/" className="max-md:hidden">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
