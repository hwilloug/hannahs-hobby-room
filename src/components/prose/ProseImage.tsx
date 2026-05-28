import Image from 'next/image';

interface ProseImageProps {
  src: string;
  alt: string;
}

export default function ProseImage({ src, alt }: ProseImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      sizes="(max-width: 768px) 100vw, 800px"
      className="h-auto w-full"
    />
  );
}
