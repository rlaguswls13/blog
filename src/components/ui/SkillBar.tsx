import type { Skill } from "@/types";

export function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="skill-bar">
      <div className="skill-info">
        <span>
          {skill.icon} {skill.name}
        </span>
        <span>{skill.percent}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${skill.percent}%` }} />
      </div>
    </div>
  );
}
