type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  marker?: string;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, marker = "KHJ", className = "" }: PageHeaderProps) {
  return (
    <header className={`page-heading ${className}`.trim()}>
      <div className="page-heading-copy">
        <span className="page-heading-eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        <p className="page-heading-description">{description}</p>
      </div>
      <span className="page-heading-marker" aria-hidden="true">{marker}</span>
    </header>
  );
}
