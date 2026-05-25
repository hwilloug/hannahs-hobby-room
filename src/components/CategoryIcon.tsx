interface CategoryIconProps {
  tagSlug: string;
  className?: string;
}

export default function CategoryIcon({ tagSlug, className = 'icon-svg' }: CategoryIconProps) {
  const props = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    strokeWidth: 1.5,
    stroke: 'currentColor',
    className,
  };

  switch (tagSlug.toLowerCase()) {
    case 'crafts':
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
          />
        </svg>
      );
    case 'antiquing':
      return (
        <svg {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-2.018M9.53 16.122l-1.5-3.5M9.53 16.122l3.388-2.018m0 0a15.998 15.998 0 0 1 3.388-2.018M14.5 9.5l-1.5-3.5m0 0L12 3l-1 3m7.5 3.5L18 9.5m-6 0h6m-6 0-1.5 3.5M12 3v1.5"
          />
        </svg>
      );
    default:
      return null;
  }
}
