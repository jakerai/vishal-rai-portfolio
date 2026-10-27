"use client";

import Link from "next/link";

interface SectionAdvanceBarProps {
  nextHref?: string;
  nextLabel?: string;
  isFinalSection?: boolean;
}

export default function SectionAdvanceBar({
  nextHref,
}: SectionAdvanceBarProps = {}) {
  const content = (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        userSelect: "none",
        cursor: nextHref ? "pointer" : "default",
        padding: "8px 16px",
      }}
    >
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          transition: "color 0.25s ease",
        }}
      >
        SCROLL TO EXPLORE
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          color: "var(--text-muted)",
          animation: "chevronBob 1.8s infinite ease-in-out",
          transition: "color 0.25s ease",
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );

  return (
    <div
      style={{
        padding: "54px 0 68px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {nextHref ? (
        <Link
          href={nextHref}
          style={{
            textDecoration: "none",
            display: "inline-flex",
          }}
          onMouseEnter={(e) => {
            const elms = e.currentTarget.querySelectorAll("span, svg");
            elms.forEach((el) => {
              (el as HTMLElement).style.color = "var(--text-heading)";
            });
          }}
          onMouseLeave={(e) => {
            const elms = e.currentTarget.querySelectorAll("span, svg");
            elms.forEach((el) => {
              (el as HTMLElement).style.color = "var(--text-muted)";
            });
          }}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
