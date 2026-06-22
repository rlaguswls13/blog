import Image from "next/image";

interface MdxImageFigureProps {
  src: string;
  alt: string;
  priority?: boolean;
  maxWidth?: number;
  width?: number;
  height?: number;
}

export function MdxImageFigure({
  src,
  alt,
  priority = false,
  maxWidth = 1200,
  width = 1200,
  height = 675,
}: MdxImageFigureProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: `${maxWidth}px`,
        margin: "20px auto",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={priority}
      />
    </div>
  );
}