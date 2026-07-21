type DevlogSectionHeaderProps = {
  title: string;
  count: number;
  context?: string;
};

export function DevlogSectionHeader({ title, count, context }: DevlogSectionHeaderProps) {
  return (
    <div className="education-list-header journal-list-header devlog-list-header">
      <div>
        <span className="journal-list-eyebrow">DEVLOG CATEGORY</span>
        <div className="section-title journal-list-title">
          {title} 목록 <small>{count}</small>
        </div>
      </div>
      {context && <span className="devlog-list-context">{context}</span>}
    </div>
  );
}
