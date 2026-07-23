"use client";

import Image from "next/image";
import { useState } from "react";

type CardThumbnailProps = {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function CardThumbnail({ src, alt = "", className = "", priority = false }: CardThumbnailProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div
      className={`card-thumbnail${status === "loaded" ? " is-loaded" : " is-loading"}${className ? ` ${className}` : ""}`}
      aria-busy={status === "loading"}
    >
      {status !== "loaded" && (
        <div className="thumbnail-loading-placeholder" role="status" aria-live="polite">
          <span aria-hidden="true">{"{ code }"}</span>
          <small>{status === "error" ? "기본 이미지" : "이미지 불러오는 중"}</small>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
