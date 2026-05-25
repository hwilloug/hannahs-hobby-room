interface ProseImageProps {
  src: string;
  alt: string;
}

export default function ProseImage({ src, alt }: ProseImageProps) {
  return <img src={src} alt={alt} />;
}
