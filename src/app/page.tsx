import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import { SkillBar } from "@/components/ui/SkillBar";
import { formatMiniPeriod } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { Skill } from "@/types";
import myImage from "../../public/images/myImage.png";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { MailIcon } from "@/components/icons/MailIcon";

export default function AboutPage() {
  const { profile, others } = profileData;
  const recentProjects = projectsData.projects.slice(0, 4);

  return (
    <>
      {/* Row 1: Image Card | Bio Card | Recent Projects Card */}
      <div className="about-top-grid">
        {/* Column 1: Profile Card */}
        <div className="profile-card">
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
          <div style={{ marginTop: "15px", display: "flex", gap: "16px", justifyContent: "center", alignItems: "center" }}>
            {profile.social.map((s, i) => (
              <a
                key={i}
                href={s.url || s.link}
                className="social-link"
                target={s.icon === "mail" ? undefined : "_blank"}
                rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                }}
              >
                {s.icon === "github" ? (
                  <GithubIcon width={22} height={22} />
                ) : s.icon === "phone" ? (
                  <PhoneIcon width={22} height={22} />
                ) : s.icon === "mail" ? (
                  <MailIcon width={22} height={22} />
                ) : (
                  <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Bio Content */}
        <div className="bio-card">
          <h2 style={{ marginTop: 0, marginBottom: "20px" }}>{profile.bio_title}</h2>
          <p style={{ lineHeight: "1.6", color: "var(--text-secondary)", margin: 0 }}>
            {profile.bio_text}
          </p>
        </div>

        {/* Column 3: Recent Projects */}
        <div className="recent-projects-card">
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
                  {formatMiniPeriod(p.periods)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Skills, Education, Hobbies & Interests Grid */}
      <div style={{ marginTop: "40px" }}>
        <h2>기술/관심사</h2>
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Card 1: Interests */}
          <div className="others-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Interests</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {others.interests.map((item, i) => (
                <li key={i} style={{ padding: "6px 0", color: "var(--text-secondary)" }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Education */}
          <div className="others-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Education</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {others.education.map((edu, i) => (
                <li key={i} style={{ padding: "6px 0", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{edu.degree}</strong>
                  <br />
                  {edu.school} ({edu.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Technical Skills */}
          <div className="skills-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Technical</h3>
            {others.technical.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>

          {/* Card 4: Hobbies */}
          <div className="skills-card">
            <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Hobbies</h3>
            {others.hobbies.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
