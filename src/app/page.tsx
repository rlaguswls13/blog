import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import { SkillBar } from "@/components/ui/SkillBar";
import { formatPeriods } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { Skill } from "@/types";
import myImage from "../../public/images/myImage.png";

export default function AboutPage() {
  const { profile, skills } = profileData;
  const recentProjects = projectsData.projects.slice(0, 4);

  return (
    <>
      <div className="profile-section">
        <div className="profile-card">
          <Image
            src={myImage}
            alt="Profile"
            className="profile-img"
            width={200}
            height={200}
            priority
          />
          <h2 style={{ marginBottom: "5px" }}>{profile.name}</h2>
          <p className="role">{profile.role}</p>
          <p className="univ">{profile.organization}</p>
          <div style={{ marginTop: "15px" }}>
            {profile.social.map((s, i) => (
              <a key={i} href={s.link}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="bio-content">
          <h1>{profile.bio_title}</h1>
          <p>{profile.bio_text}</p>
          <div className="grid-2" style={{ marginTop: "40px" }}>
            <div>
              <h3>Interests</h3>
              <ul>
                {profile.interests.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Education</h3>
              <ul>
                {profile.education.map((edu, i) => (
                  <li key={i}>
                    <strong>{edu.degree}</strong>
                    <br />
                    {edu.school} ({edu.year})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px" }}>
        <h1>기술스택/역량</h1>
        <div className="grid-2">
          <div>
            <h3>TECHNICAL</h3>
            {skills.technical.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
          <div>
            <h3>HOBBIES</h3>
            {skills.hobbies.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px" }}>
        <div className="recent-projects-box">
          <h3>최근 프로젝트</h3>
          {recentProjects.map((p) => (
            <div key={p.id} className="recent-project-mini">
              <span className="mini-title">
                <Link href={`/projects/${p.id}`}>{p.title}</Link>
              </span>
              <span className="mini-period">{formatPeriods(p.periods)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
