"use client";

import { useEffect, useRef, useState } from "react";
import SectionBadge from "./SectionBadge";

function useInView(threshold = 0.15) {
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

export default function AboutSection() {
  const { ref, inView } = useInView();

  const highlights = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 8l3 3-3 3" />
          <path d="M13 14h3" />
        </svg>
      ),
      title: "Backend Engineering",
      desc: "Building high-throughput APIs and distributed services that handle millions of requests with sub-100ms latency.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "System Architecture",
      desc: "Designing microservices, event-driven systems, and cloud-native architectures that scale effortlessly with business growth.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      title: "Database Mastery",
      desc: "Expertise across PostgreSQL, MySQL, Oracle, and MongoDB — optimizing queries, designing schemas, and ensuring data integrity at scale.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: "Cloud & DevOps",
      desc: "Deploying and managing production workloads on AWS, Docker, and Kubernetes with CI/CD pipelines and infrastructure as code.",
    },
  ];

  return (
    <section
      id="about"
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
          <SectionBadge label="About Me" />
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
            Engineering{" "}
            <span style={{ color: "var(--text-heading)", fontStyle: "italic" }}>Excellence</span>
          </h2>
          <p
            style={{
              maxWidth: 600,
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            With over a decade of hands-on experience, I bring deep technical
            expertise and a passion for building systems that truly perform.
          </p>
        </div>

        {/* Divider */}
        <div
          className="editorial-divider"
          style={{
            marginBottom: 80,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        />

        {/* Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 64,
          }}
          className="lg:!grid-cols-[2fr_3fr]"
        >
          {/* Left — Prose */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <div style={{ paddingBottom: 32, borderBottom: "1px solid var(--border-subtle)" }}>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "var(--text-secondary)",
                }}
              >
                I&apos;m a <strong style={{ color: "var(--text-heading)", fontWeight: 600 }}>Senior Software Engineer</strong> passionate
                about solving complex problems through clean, maintainable code.
                My primary stack revolves around{" "}
                <strong style={{ color: "var(--text-heading)", fontWeight: 600 }}>Java, Spring Boot, and Python</strong>,
                but I&apos;m language-agnostic when it comes to delivering results.
              </p>
            </div>
            <div style={{ paddingBottom: 32, borderBottom: "1px solid var(--border-subtle)" }}>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "var(--text-secondary)",
                }}
              >
                I specialize in designing and building{" "}
                <strong style={{ color: "var(--text-heading)", fontWeight: 600 }}>scalable backend systems</strong>{" "}
                — from REST APIs handling millions of requests to event-driven
                microservices architectures that power enterprise-grade applications.
                Every line of code I write is driven by performance, reliability,
                and long-term maintainability.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "var(--text-secondary)",
                }}
              >
                When working with clients, I focus on{" "}
                <strong style={{ color: "var(--text-heading)", fontWeight: 600 }}>clear communication</strong>,
                timely delivery, and going beyond just code — I provide architectural
                guidance, performance optimization, and strategic technical consulting
                to ensure your project&apos;s long-term success.
              </p>
            </div>
          </div>

          {/* Right — Highlights */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--border-subtle)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {highlights.map((item, i) => (
              <div
                key={item.title}
                style={{
                  background: "#ffffff",
                  padding: "36px 32px",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.1}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#fbfbfb";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                }}
              >
                <div
                  style={{
                    marginBottom: 20,
                    color: "var(--text-heading)",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--text-heading)",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
