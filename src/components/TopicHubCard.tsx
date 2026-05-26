import Link from 'next/link';
import CategoryIcon from './CategoryIcon';

interface TopicHubCardProps {
  tagSlug: string;
  name: string;
  description: string;
  emoji: string;
}

export default function TopicHubCard({
  tagSlug,
  name,
  description,
  emoji,
}: TopicHubCardProps) {
  return (
    <Link
      href={`/categories/${tagSlug}/`}
      className="group flex h-full flex-col rounded-xl border border-primary-dark bg-[rgba(var(--primary-main-rgb),0.6)] p-6 text-inherit no-underline shadow-[4px_4px_var(--primary-dark)] backdrop-blur-md transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_var(--primary-dark)] dark:bg-[rgba(var(--primary-main-rgb),0.4)]"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-main p-2 [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-white">
          <CategoryIcon tagSlug={tagSlug} className="icon-svg" />
        </span>
        <h2 className="m-0 font-gluten text-[1.6em] text-primary-dark dark:text-white">
          {emoji} {name}
        </h2>
      </div>
      <p className="mb-6 flex-1 text-[1em] leading-relaxed text-primary-dark dark:text-white/90">
        {description}
      </p>
      <span className="flex items-center gap-2 font-medium text-primary-dark transition-transform duration-200 group-hover:translate-x-1 dark:text-white">
        Explore {name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
          aria-hidden
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}
