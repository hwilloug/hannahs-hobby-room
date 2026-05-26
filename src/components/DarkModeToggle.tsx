'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      storedTheme === 'dark' ||
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(prefersDark);
    setIsDark(prefersDark);
  }, []);

  function applyTheme(dark: boolean) {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    document.cookie = `theme=${dark ? 'dark' : 'light'}; path=/; max-age=31536000`;
  }

  function toggle() {
    const next = !isDark;
    applyTheme(next);
    setIsDark(next);
  }

  if (!mounted) {
    return (
      <button
        className="mr-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-2 text-white transition-all duration-300 ease-in-out max-md:mr-4"
        aria-label="Toggle dark mode"
      />
    );
  }

  return (
    <button
      id="dark-mode-toggle"
      className="mr-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-2 text-white transition-all duration-300 ease-in-out hover:bg-white/20 max-md:mr-4"
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      <svg
        className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isDark ? 'hidden' : 'block'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isDark ? 'block' : 'hidden'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
