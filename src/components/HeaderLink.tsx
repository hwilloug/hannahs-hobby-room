'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function HeaderLink({ href, className, children }: HeaderLinkProps) {
  const pathname = usePathname();
  const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
  const normalizedPath = pathname?.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const firstSegment = normalizedPath?.split('/').filter(Boolean)[0];
  const isActive =
    normalizedPath === normalizedHref ||
    (href !== '/' && `/${firstSegment}` === normalizedHref);

  return (
    <Link
      href={href}
      className={`group inline-block h-16 w-24 rounded-lg px-4 py-2 text-white no-underline transition-colors max-md:h-auto max-md:w-auto hover:bg-[rgba(var(--primary-light-rgb),0.4)] max-md:hover:[&_.icon_svg]:h-5 max-md:hover:[&_.icon_svg]:w-5 max-md:hover:[&_.text]:text-[0.8em] max-md:hover:[&_.text]:opacity-100 hover:[&_.icon_svg]:h-[42px] hover:[&_.icon_svg]:w-[42px] hover:[&_.text]:text-[0] hover:[&_.text]:opacity-0 ${isActive ? 'bg-[rgba(var(--primary-light-rgb),0.2)]' : ''} ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
