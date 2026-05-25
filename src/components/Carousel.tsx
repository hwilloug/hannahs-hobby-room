'use client';

import { useEffect, useRef } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollAmount = 300;

    function updateButtonVisibility() {
      const { scrollLeft, scrollWidth, clientWidth } = carousel!;
      prevBtn!.style.opacity = scrollLeft > 0 ? '1' : '0';
      nextBtn!.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0';
    }

    function scroll(direction: 'left' | 'right') {
      const newPosition =
        direction === 'left'
          ? carousel!.scrollLeft - scrollAmount
          : carousel!.scrollLeft + scrollAmount;
      carousel!.scrollTo({ left: newPosition, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => scroll('left'));
    nextBtn.addEventListener('click', () => scroll('right'));
    carousel.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility();

    return () => {
      prevBtn.removeEventListener('click', () => scroll('left'));
      nextBtn.removeEventListener('click', () => scroll('right'));
      carousel.removeEventListener('scroll', updateButtonVisibility);
    };
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <button ref={prevRef} className={`${styles.navButton} ${styles.prev}`} aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div ref={carouselRef} className={styles.carousel}>
        <div className={styles.carouselContent}>{children}</div>
      </div>
      <button ref={nextRef} className={`${styles.navButton} ${styles.next}`} aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
