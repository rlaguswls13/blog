import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import { SkillBar } from "@/components/ui/SkillBar";
import Link from "next/link";
import Image from "next/image";
import type { Skill } from "@/types";
import myImage from "../../public/images/myImage.png";
import { GithubIcon, PhoneIcon, MailIcon } from "@/components/ui/Icons";
import { RecentDevlogFlowSection } from "@/components/ui/RecentDevlogFlowSection";
import { AboutProjectCarousel } from "@/components/ui/AboutProjectCarousel";
import { AboutBioStory } from "@/components/ui/AboutBioStory";
import { AboutHighlights } from "@/components/ui/AboutHighlights";

export default function AboutPage() {
  const { profile, others } = profileData;
  const projectCarouselItems = projectsData.projects.slice(0, 9);
  const storyParagraphs =
    profile.bio_story && profile.bio_story.length > 0
      ? profile.bio_story
      : [profile.bio_text];
  const highlightItems =
    profile.bio_highlights && profile.bio_highlights.length > 0
      ? profile.bio_highlights
      : (profile.bio_points || []).slice(0, 3).map((point) => {
          const [title, ...rest] = point.split(": ");
          return { title, description: rest.join(": ") };
        });

  return (
    <>
      {/* Row 1: Image Card | Bio Card */}
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
          <div className="about-profile-name">{profile.name}</div>
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
          <span className="about-intro-kicker">ABOUT</span>
          <div className="about-intro-title">{profile.bio_title}</div>

          <AboutHighlights items={highlightItems} />

          <AboutBioStory paragraphs={storyParagraphs} />
        </div>

      </div>

      <section className="about-project-carousel-card" style={{ marginTop: "30px" }}>
        <AboutProjectCarousel projects={projectCarouselItems} />
      </section>

      <div style={{ marginTop: "40px" }}>
        <RecentDevlogFlowSection />
      </div>

      {/* Row 2: Skills, Education, Hobbies & Interests Grid */}
      <div style={{ marginTop: "40px" }}>
        <div className="about-section-title">Tech/Interests</div>
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
            <div className="about-card-title">Interests</div>
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
            <div className="about-card-title">Education</div>
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
            <div className="about-card-title">Technical</div>
            {others.technical.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>

          {/* Card 4: Hobbies */}
          <div className="skills-card">
            <div className="about-card-title">Hobbies</div>
            {others.hobbies.map((s: Skill) => (
              <SkillBar key={s.name} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
