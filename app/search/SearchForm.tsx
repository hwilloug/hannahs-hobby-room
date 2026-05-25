'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import styles from './search.module.css';

interface SearchFormProps {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement).value;
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form action="/search" method="get" className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="search"
        id="search-input"
        name="q"
        placeholder="Search posts..."
        defaultValue={initialQuery}
        aria-label="Search posts"
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value;
            if (value) {
              router.push(`/search?q=${encodeURIComponent(value)}`);
            }
          }
        }}
      />
    </form>
  );
}
