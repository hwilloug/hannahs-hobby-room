'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

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
    <form action="/search" method="get" className="my-8 max-w-[600px]" onSubmit={handleSubmit}>
      <input
        type="search"
        id="search-input"
        name="q"
        placeholder="Search posts..."
        defaultValue={initialQuery}
        aria-label="Search posts"
        autoComplete="off"
        className="w-full rounded-[20px] border-2 border-primary-main bg-white px-4 py-3 text-[1.2em] text-gray-dark-custom focus:border-primary-dark focus:outline-none"
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
