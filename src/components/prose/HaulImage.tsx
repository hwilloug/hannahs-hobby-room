interface HaulImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function HaulImage({ src, alt, caption }: HaulImageProps) {
  return (
    <div className="grid grid-cols-2 items-center justify-items-center gap-2.5 max-md:grid-cols-1 [&_img]:h-auto [&_img]:w-full max-md:[&_img]:h-auto max-md:[&_img]:max-h-[500px] max-md:[&_img]:w-auto">
      <img src={src} alt={alt} />
      <p>{caption}</p>
    </div>
  );
}
