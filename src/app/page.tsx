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
      {/* Row 1: Image Card | Bio Card | Recent Projects Card */}
      <div
        className="about-top-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          alignItems: "stretch",
        }}
      >
        {/* Column 1: Profile Card */}
        <div
          className="profile-card"
          style={{
            margin: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={myImage}
            alt="Profile"
            className="profile-img"
            width={200}
            height={200}
            priority
          />
          <h2 style={{ marginBottom: "5px", marginTop: "15px" }}>{profile.name}</h2>
          <p className="role" style={{ margin: "5px 0" }}>{profile.role}</p>
          <p className="univ" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {profile.organization}
          </p>
          <div style={{ marginTop: "15px" }}>
            {profile.social.map((s, i) => (
              <a
                key={i}
                href={s.link}
                style={{
                  display: "inline-block",
                  margin: "0 8px",
                  fontSize: "1.3rem",
                  textDecoration: "none",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Bio Content */}
        <div
          className="bio-card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "20px" }}>{profile.bio_title}</h2>
          <p style={{ lineHeight: "1.6", color: "var(--text-secondary)", margin: 0 }}>
            {profile.bio_text}
          </p>
        </div>

        {/* Column 3: Recent Projects */}
        <div className="recent-projects-card" style={{ height: "100%" }}>
          <h2 style={{ marginTop: 0, marginBottom: "20px" }}>최근 프로젝트</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="recent-project-mini"
                style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}
              >
                <span
                  className="mini-title"
                  style={{ display: "block", fontWeight: "bold", marginBottom: "4px" }}
                >
                  <Link
                    href={`/projects/${p.id}`}
                    style={{ textDecoration: "none", color: "var(--accent-primary)" }}
                  >
                    {p.title}
                  </Link>
                </span>
                <span
                  className="mini-period"
                  style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
                >
                  {formatPeriods(p.periods)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Others (기타 정보) */}
      <div className="others-card" style={{ marginTop: "40px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>기타 정보</h2>
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h3 style={{ marginTop: 0, color: "var(--text-primary)" }}>Interests</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {profile.interests.map((item, i) => (
                <li key={i} style={{ padding: "6px 0", color: "var(--text-secondary)" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ marginTop: 0, color: "var(--text-primary)" }}>Education</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {profile.education.map((edu, i) => (
                <li key={i} style={{ padding: "6px 0", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{edu.degree}</strong>
                  <br />
                  {edu.school} ({edu.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3: Skills | Hobbies */}
      <div style={{ marginTop: "40px" }}>
        <h2>기술 스택 및 취미</h2>
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          <div className="skills-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>TECHNICAL</h3>
            {skills.technical.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
          <div className="skills-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>HOBBIES</h3>
            {skills.hobbies.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
