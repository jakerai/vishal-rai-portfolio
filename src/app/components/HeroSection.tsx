"use client";

import { useEffect, useRef, useState } from "react";
import ArchitectureSlideshow from "./architecture/ArchitectureSlideshow";
import { ARCHITECTURE_SLIDES } from "./architecture/types";

const TITLES = [
  "Senior Software Engineer",
  "Python & FastAPI Expert",
  "Backend Architect",
  "Java & Spring Boot Expert",
  "Microservices",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [accentColor, setAccentColor] = useState(ARCHITECTURE_SLIDES[0].accentColor);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("theme-color-change", { detail: { color: accentColor } })
      );
    }
  }, [accentColor]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentTitle.slice(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* Content */}
      <div className="section-container" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
            paddingTop: 100,
            paddingBottom: 60,
          }}
          className="lg:!grid-cols-[1fr_minmax(480px,580px)] xl:!grid-cols-[1fr_640px] 2xl:!grid-cols-[1.1fr_680px]"
        >
          {/* Text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(50px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#059669",
                  boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)",
                  animation: "subtlePulse 2s ease-in-out infinite",
                }}
              />
              AVAILABLE FOR HIRE
            </div>

            {/* Main heading */}
            <h1
              style={{
                fontSize: "clamp(2.25rem, 3.6vw, 3.125rem)",
                fontWeight: 400,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "var(--text-heading)",
                marginBottom: 20,
              }}
            >
              <span style={{ display: "block", marginBottom: 4 }}>
                Hi, I&apos;m
              </span>
              <span
                style={{
                  fontWeight: 500,
                  fontStyle: "italic",
                  display: "block",
                  color: accentColor,
                  transition: "color 0.5s ease",
                }}
              >
                Vishal Rai
              </span>
            </h1>

            {/* Typing subtitle */}
            <div
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
                fontWeight: 400,
                color: "var(--text-secondary)",
                minHeight: "1.8em",
                marginBottom: 22,
                letterSpacing: "-0.01em",
              }}
            >
              <span>{displayText}</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: "var(--text-heading)",
                  verticalAlign: "text-bottom",
                  marginLeft: 3,
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.1vw, 1.02rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              10+ years crafting scalable, reliable backend systems. Specializing
              in Java, Spring Boot, Python, and cloud-native architectures that
              power mission-critical applications.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 40,
                marginBottom: 34,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "10+", label: "Years Exp." },
                { value: "30+", label: "Projects" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      color: "var(--text-heading)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: 6,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                id="hero-hire-me"
                href="https://www.upwork.com/freelancers/~0137b8400801fa71d3"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 34px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: accentColor,
                  color: "#ffffff",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "background 0.5s ease, box-shadow 0.5s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
                  boxShadow: `0 4px 18px ${accentColor}40`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(0.9)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Hire Me on Upwork
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              <a
                id="hero-download-cv"
                href="/vishal-rai-cv.pdf"
                download="vishal-rai-cv.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 34px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "#ffffff",
                  color: "var(--text-heading)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--text-heading)";
                  (e.currentTarget as HTMLElement).style.background = "#f4f4f5";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Download CV
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* System Architecture Slideshow */}
          <div
            style={{
              width: "100%",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
            className="flex justify-center w-full"
          >
            <ArchitectureSlideshow onSlideChange={setAccentColor} />
          </div>
        </div>
      </div>
    </section>
  );
}
