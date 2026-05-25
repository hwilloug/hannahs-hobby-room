'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './HeaderLink.module.css';

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
      className={`${styles.link} ${className ?? ''} ${isActive ? styles.active : ''}`}
    >
      {children}
    </Link>
  );
}
