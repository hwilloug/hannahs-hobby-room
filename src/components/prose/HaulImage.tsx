import styles from './HaulImage.module.css';

interface HaulImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function HaulImage({ src, alt, caption }: HaulImageProps) {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} />
      <p>{caption}</p>
    </div>
  );
}
