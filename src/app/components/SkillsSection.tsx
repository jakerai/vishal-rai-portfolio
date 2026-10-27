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

interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      { name: "Java", level: 95 },
      { name: "Spring Boot", level: 95 },
      { name: "Python", level: 88 },
      { name: "Spring Cloud", level: 85 },
      { name: "Hibernate / JPA", level: 90 },
      { name: "Flask / FastAPI", level: 80 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", level: 92 },
      { name: "MySQL", level: 90 },
      { name: "Oracle", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "Redis", level: 85 },
      { name: "Elasticsearch", level: 78 },
    ],
  },
  {
    name: "Architecture & Patterns",
    skills: [
      { name: "Microservices", level: 93 },
      { name: "REST API Design", level: 95 },
      { name: "Event-Driven Arch.", level: 88 },
      { name: "Domain-Driven Design", level: 85 },
      { name: "CQRS / Event Sourcing", level: 82 },
      { name: "System Design", level: 90 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 87 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 82 },
      { name: "CI/CD (Jenkins/GitHub)", level: 88 },
      { name: "Kafka / RabbitMQ", level: 85 },
      { name: "Terraform", level: 75 },
    ],
  },
];

const TECH_TAGS = [
  "Java", "Spring Boot", "Python", "PostgreSQL", "MySQL", "Oracle",
  "MongoDB", "Redis", "Kafka", "Docker", "Kubernetes", "AWS",
  "Microservices", "REST API", "GraphQL", "gRPC", "Git", "Linux",
  "Jenkins", "Terraform", "Elasticsearch", "RabbitMQ",
];

function SkillBar({
  name,
  level,
  animate,
  delay,
}: {
  name: string;
  level: number;
  animate: boolean;
  delay: number;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            color: "var(--text-heading)",
            letterSpacing: "0.05em",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: 2,
          background: "#e4e4e7",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: animate ? `${level}%` : "0%",
            background: "var(--text-heading)",
            transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      style={{
        position: "relative",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
        background: "#ffffff",
      }}
    >
      <div ref={ref} className="section-container">
        {/* Section Header */}
        <div
          style={{
            marginBottom: 80,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionBadge label="Technical Skills" />
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
            My{" "}
            <span style={{ color: "var(--text-heading)", fontStyle: "italic" }}>Tech Stack</span>
          </h2>
          <p
            style={{
              maxWidth: 600,
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            A decade of experience across the full backend ecosystem — from code
            to cloud.
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

        {/* Skill Categories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48,
            marginBottom: 80,
          }}
        >
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.name}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + catIdx * 0.15}s`,
              }}
            >
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-heading)",
                  marginBottom: 28,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                {cat.name}
              </h3>
              {cat.skills.map((skill, sIdx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  animate={inView}
                  delay={400 + catIdx * 150 + sIdx * 80}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Tags Cloud */}
        <div
          style={{
            paddingTop: 64,
            borderTop: "1px solid var(--border-subtle)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
          }}
        >
          <h3
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: 28,
            }}
          >
            Technologies I work with
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {TECH_TAGS.map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.9 + i * 0.03}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
