'use client';

import { useEffect, useState } from 'react';

const API_BASE = '/api';

interface LikeButtonProps {
  postSlug: string;
}

function isArticleLiked(slug: string): boolean {
  const likedArticles = document.cookie
    .split('; ')
    .find((row) => row.startsWith('likedArticles='));
  if (!likedArticles) return false;
  const likedSlugs = likedArticles.split('=')[1].split(',');
  return likedSlugs.includes(slug);
}

function addToLikedArticles(slug: string) {
  const likedArticles = document.cookie
    .split('; ')
    .find((row) => row.startsWith('likedArticles='));
  let likedSlugs = likedArticles ? likedArticles.split('=')[1].split(',') : [];
  if (!likedSlugs.includes(slug)) {
    likedSlugs.push(slug);
    document.cookie = `likedArticles=${likedSlugs.join(',')}; path=/; max-age=31536000`;
  }
}

function removeFromLikedArticles(slug: string) {
  const likedArticles = document.cookie
    .split('; ')
    .find((row) => row.startsWith('likedArticles='));
  if (likedArticles) {
    let likedSlugs = likedArticles.split('=')[1].split(',');
    likedSlugs = likedSlugs.filter((s) => s !== slug);
    document.cookie = `likedArticles=${likedSlugs.join(',')}; path=/; max-age=31536000`;
  }
}

export default function LikeButton({ postSlug }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchInitialLikes() {
      try {
        const response = await fetch(`${API_BASE}/articles/${postSlug}`);
        if (response.ok) {
          const data = await response.json();
          setLikeCount(data.article?.likes || 0);
          setLiked(isArticleLiked(postSlug));
        }
      } catch (error) {
        console.error('Error fetching initial likes:', error);
      }
    }
    fetchInitialLikes();
  }, [postSlug]);

  async function toggleLike() {
    const isLiked = isArticleLiked(postSlug);
    try {
      const response = await fetch(`${API_BASE}/articles/${postSlug}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decrease: isLiked }),
      });
      if (!response.ok) throw new Error('Failed to toggle like');
      const data = await response.json();
      setLikeCount(data.likes);
      setLiked(!isLiked);
      if (isLiked) {
        removeFromLikedArticles(postSlug);
      } else {
        addToLikedArticles(postSlug);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="my-4 flex justify-center">
      <button
        className={`flex cursor-pointer items-center gap-2 rounded-[25px] border-2 px-5 py-2.5 text-[0.9em] transition-all duration-300 ease-in-out dark:border-secondary-light dark:text-secondary-light dark:hover:bg-secondary-light dark:hover:text-primary-dark ${
          liked
            ? 'border-primary-main bg-primary-main text-white hover:-translate-y-0.5 dark:bg-secondary-light dark:text-primary-dark'
            : 'border-primary-main bg-transparent text-primary-main hover:-translate-y-0.5 hover:bg-primary-main hover:text-white'
        }`}
        onClick={toggleLike}
        aria-label="Like this article"
      >
        <div className="flex items-center justify-center">
          <svg
            className={`h-5 w-5 transition-all duration-300 ease-in-out ${liked ? 'fill-current' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span className="min-w-[1em] text-center font-semibold">{likeCount}</span>
      </button>
    </div>
  );
}
