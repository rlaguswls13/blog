import React from "react";

export function NotionImage({ src, caption }: { src: string; caption?: string }) {
  if (!src) return null;
  return (
    <figure className="my-8 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl rounded-lg overflow-hidden flex justify-center">
        <img 
          src={src} 
          alt={caption || "Notion Image"} 
          className="w-auto h-auto max-h-[70vh] object-contain rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]"
        />
      </div>
      {caption && caption !== "image" && (
        <figcaption className="mt-3 text-sm text-[var(--text-secondary)] text-center font-medium">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
