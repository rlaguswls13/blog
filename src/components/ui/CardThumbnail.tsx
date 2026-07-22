import Image from "next/image";

type CardThumbnailProps = {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function CardThumbnail({ src, alt = "", className = "", priority = false }: CardThumbnailProps) {
  return (
    <div className={`card-thumbnail${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
