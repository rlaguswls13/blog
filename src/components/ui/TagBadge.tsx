export function TagBadge({ tag }: { tag: string }) {
  return <span className="tech-tag">{tag}</span>;
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="devlog-tags">
      {tags.map((t) => (
        <TagBadge key={t} tag={t} />
      ))}
    </div>
  );
}
