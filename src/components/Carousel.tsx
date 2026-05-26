'use client';

import { useEffect, useRef } from 'react';

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

    const scrollLeft = () => scroll('left');
    const scrollRight = () => scroll('right');

    prevBtn.addEventListener('click', scrollLeft);
    nextBtn.addEventListener('click', scrollRight);
    carousel.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility();

    return () => {
      prevBtn.removeEventListener('click', scrollLeft);
      nextBtn.removeEventListener('click', scrollRight);
      carousel.removeEventListener('scroll', updateButtonVisibility);
    };
  }, []);

  return (
    <div className="relative box-border w-full">
      <button
        ref={prevRef}
        className="absolute top-1/2 left-0 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-[rgba(var(--primary-main-rgb),0.8)] opacity-0 shadow-[0_2px_8px_rgba(var(--black),20%)] transition-[opacity,transform] duration-300 hover:scale-110 max-[720px]:hidden [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-black-custom"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div
        ref={carouselRef}
        className="box-border w-full snap-x snap-mandatory overflow-x-auto border-x-2 border-[rgb(var(--primary-main-rgb))] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="box-border flex gap-6 px-4 max-[720px]:px-2">{children}</div>
      </div>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-0 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-[rgba(var(--primary-main-rgb),0.8)] opacity-0 shadow-[0_2px_8px_rgba(var(--black),20%)] transition-[opacity,transform] duration-300 hover:scale-110 max-[720px]:hidden [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-black-custom"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
