import Image from 'next/image';

interface HaulImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function HaulImage({ src, alt, caption }: HaulImageProps) {
  return (
    <div className="my-4 grid grid-cols-2 items-center justify-items-center gap-2.5 max-md:grid-cols-1">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="h-auto w-full max-md:max-h-[500px] max-md:w-auto"
      />
      <p>{caption}</p>
    </div>
  );
}
