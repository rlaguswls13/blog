interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
}

export function TimelineItem({ title, date, description }: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <h3>{title}</h3>
      <span className="date">{date}</span>
      <p>{description}</p>
    </div>
  );
}
