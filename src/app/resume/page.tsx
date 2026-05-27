import resumeData from "@/data/resume.json";
import { TimelineItem } from "@/components/ui/Timeline";

export default function ResumePage() {
  const { resume } = resumeData;

  return (
    <>
      <div className="project-card" style={{ marginBottom: "40px", padding: "40px" }}>
        <h1>경력 요약</h1>
        <div style={{ marginTop: "30px" }}>
          {resume.work.map((item, idx) => (
            <TimelineItem
              key={idx}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="project-card">
          <h2>학력</h2>
          <div style={{ marginTop: "25px" }}>
            {resume.education.map((item, idx) => (
              <TimelineItem
                key={idx}
                title={item.title}
                date={item.date}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div className="project-card">
          <h2>자격증</h2>
          <div style={{ marginTop: "25px" }}>
            {resume.certification.map((item, idx) => (
              <TimelineItem
                key={idx}
                title={item.title}
                date={item.date}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
