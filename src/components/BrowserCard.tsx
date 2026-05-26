import Link from 'next/link';

interface BrowserCardProps {
  title: string;
  image: string;
  url: string;
  subtitle?: string;
  showSubtitle?: boolean;
}

export default function BrowserCard({
  title,
  image,
  url,
  subtitle,
  showSubtitle = false,
}: BrowserCardProps) {
  return (
    <Link
      href={url}
      className="block shrink-0 snap-start overflow-hidden rounded-lg border border-secondary-dark bg-secondary-light text-inherit no-underline shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_var(--secondary-dark)] max-[720px]:w-[250px] w-[300px]"
    >
      <div className="flex items-center gap-2 rounded-t-lg border-b border-secondary-dark bg-secondary-main p-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c940]" />
        </div>
        <div className="flex-1 overflow-hidden rounded bg-secondary-light px-2 py-1 text-[0.8em] text-ellipsis whitespace-nowrap text-primary-dark">
          {title}
        </div>
      </div>
      <div className="p-4">
        <img
          src={image}
          alt=""
          className="mb-4 h-[150px] w-full rounded-lg border border-secondary-dark object-cover"
        />
        <h3 className="m-0 font-gluten text-[1.1em] text-primary-dark">{title}</h3>
        {showSubtitle && subtitle && <p>{subtitle}</p>}
      </div>
    </Link>
  );
}
