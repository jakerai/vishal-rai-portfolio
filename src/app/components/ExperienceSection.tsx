"use client";

import { useEffect, useRef, useState } from "react";
import SectionBadge from "./SectionBadge";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Fusemachines",
    location: "Kathmandu, Nepal",
    period: "September 2017 — Present",
    type: "Full-time",
    description:
      "Progressed into a senior engineering role, contributing to backend development, system architecture, API design, and building scalable, reliable software solutions.",
    achievements: [
      "Participated in the design and architecture of distributed software systems, ensuring high scalability, reliability, and maintainability",
      "Optimized backend applications for maximum speed, throughput, and performance under intensive data workloads",
      "Led teams of software engineers, supervising development, setting coding standards, and ensuring high-quality software delivery within deadlines",
      "Mentored and coached engineers, providing technical guidance, architecture advice, and educational opportunities to improve technical capabilities",
      "Planned and managed project work, breaking down complex tasks into manageable pieces, estimating time, effort, and risk, and ensuring timely delivery",
      "Collaborated on system specifications and architectural roadmap design, contributing to key technology decisions and software solutions",
      "Deployed, monitored, and maintained production applications on cloud infrastructure, ensuring operational stability and continuous uptime",
      "Conducted performance evaluations, assessed team members' strengths and weaknesses, and assigned clear tasks to improve effectiveness",
      "Worked closely with HR on recruitment, interviewing and selecting potential candidates for engineering roles",
      "Participated in internal and client meetings, representing the engineering team and contributing to technical discussions",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "Apache Kafka",
      "AWS Lambda",
      "Amazon S3",
      "API Gateway",
      "DynamoDB",
      "Amazon EKS",
      "PostgreSQL",
      "TimescaleDB",
      "MongoDB",
      "Elasticsearch",
      "Docker",
    ],
  },
  {
    role: "Software Engineer",
    company: "Finaccess Pvt. Ltd",
    location: "Lalitpur, Nepal",
    period: "August 2013 — September 2017",
    type: "Full-time",
    description:
      "Joined as a Junior Software Engineer and developed my skills in software development, backend engineering, database management, and API development while contributing to application development and maintenance.",
    achievements: [
      "Developed and maintained features for the core mobile banking system, ensuring high reliability, strict consistency, and performance",
      "Implemented mission-critical backend functionality for financial transactions, automated reporting, and real-time monitoring modules",
      "Built resilient transaction reversal logic to ensure consistency and reliability during failed transfers and network timeouts",
      "Contributed to Android mobile app development, integrating native clients with backend banking services and payment APIs",
      "Collaborated with QA and support teams to maintain system stability, financial data integrity, and strict security compliance",
    ],
    tech: [
      "Java",
      "Spring Framework",
      "Spring MVC",
      "Oracle Database",
      "SQL",
      "Android",
      "REST APIs",
      "JAX-WS (SOAP)",
      "JAX-RS",
      "Security",
    ],
  },
];


export default function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      style={{
        position: "relative",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
        background: "#ffffff",
      }}
    >
      <div ref={ref} className="section-container" style={{ position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <div
          style={{
            marginBottom: 80,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionBadge label="Career Journey" />
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
              color: "var(--text-heading)",
            }}
          >
            Professional{" "}
            <span style={{ color: "var(--text-heading)", fontStyle: "italic" }}>Experience</span>
          </h2>
          <p
            style={{
              maxWidth: 600,
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            A proven track record of delivering impactful solutions across
            industries.
          </p>
        </div>

        {/* Divider */}
        <div
          className="editorial-divider"
          style={{
            marginBottom: 64,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        />

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.period}
              style={{
                position: "relative",
                paddingBottom: i < EXPERIENCES.length - 1 ? 64 : 0,
                marginBottom: i < EXPERIENCES.length - 1 ? 64 : 0,
                borderBottom: i < EXPERIENCES.length - 1 ? "1px solid var(--border-subtle)" : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.15}s`,
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 24,
                }}
                className="sm:!flex-row sm:!items-center sm:!justify-between"
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "var(--text-heading)",
                      marginBottom: 4,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, color: "var(--text-muted)" }}
                        aria-hidden="true"
                      >
                        <path d="M3 21h18" />
                        <path d="M9 8h1" />
                        <path d="M9 12h1" />
                        <path d="M9 16h1" />
                        <path d="M14 8h1" />
                        <path d="M14 12h1" />
                        <path d="M14 16h1" />
                        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                      </svg>
                      {exp.company}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>•</span>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                        fontWeight: 400,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, color: "var(--text-muted)" }}
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "var(--text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                  <span
                    style={{
                      height: 32,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0 14px",
                      borderRadius: "9999px",
                      color: "#059669",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      boxSizing: "border-box",
                      lineHeight: 1,
                    }}
                  >
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  maxWidth: 800,
                }}
              >
                {exp.description}
              </p>

              {/* Key Contributions */}
              <div style={{ marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-heading)",
                  }}
                >
                  Key Contributions
                </span>
              </div>

              {/* Achievements */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 24 }}>
                {exp.achievements.map((ach, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      fontSize: "0.88rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderBottom: j < exp.achievements.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: 7,
                        width: 4,
                        height: 4,
                        background: "var(--text-heading)",
                        display: "block",
                      }}
                    />
                    {ach}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="skill-tag"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
