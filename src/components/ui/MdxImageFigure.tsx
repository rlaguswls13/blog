import Image from "next/image";
import lipcodeResult from "../../../public/images/2026_lipcoding_result.png";

const imageRegistry = {
  lipcodeResult,
} as const;

type ImageKey = keyof typeof imageRegistry;

interface MdxImageFigureProps {
  src?: string;
  imageKey?: ImageKey;
  alt: string;
  priority?: boolean;
  maxWidth?: number;
  width?: number;
  height?: number;
}

export function MdxImageFigure({
  src,
  imageKey,
  alt,
  priority = false,
  maxWidth = 1200,
  width = 1200,
  height = 675,
}: MdxImageFigureProps) {
  const resolvedSrc = imageKey ? imageRegistry[imageKey] : src;

  const imageProps =
    typeof resolvedSrc === "string"
      ? { width, height }
      : {};

  if (!resolvedSrc) {
    return null;
  }

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
        src={resolvedSrc}
        alt={alt}
        {...imageProps}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={priority}
      />
    </div>
  );
}