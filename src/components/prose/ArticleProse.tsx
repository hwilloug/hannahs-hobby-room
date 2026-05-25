import type { ReactNode } from 'react';

interface ArticleProseProps {
  children: ReactNode;
}

export default function ArticleProse({ children }: ArticleProseProps) {
  return <div className="markdown-content prose">{children}</div>;
}
