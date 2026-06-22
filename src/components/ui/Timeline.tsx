interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
}

export function TimelineItem({ title, date, description }: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <div className="item-title">{title}</div>
      <span className="date">{date}</span>
      <p>{description}</p>
    </div>
  );
}
