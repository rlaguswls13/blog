"use client";
import contactData from "@/data/contact.json";

export default function ContactPage() {
  const { contact } = contactData;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="project-card" style={{ padding: "50px", textAlign: "center" }}>
        <h1 style={{ borderBottom: "none", paddingBottom: 0 }}>Contact Me</h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "40px" }}>
          {contact.intro}
        </p>

        <a
          href={`mailto:${contact.email}`}
          style={{
            display: "inline-block",
            padding: "15px 30px",
            backgroundColor: "var(--accent-primary)",
            color: "white",
            borderRadius: "30px",
            fontSize: "1.2rem",
            fontWeight: 700,
            textDecoration: "none",
            marginBottom: "40px",
            transition: "all 0.3s",
            boxShadow: "0 4px 15px rgba(98, 0, 238, 0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(98, 0, 238, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(98, 0, 238, 0.3)";
          }}
        >
          {contact.email}
        </a>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {contact.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
