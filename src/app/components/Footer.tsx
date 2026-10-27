"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        paddingTop: 32,
        paddingBottom: 32,
        borderTop: "1px solid var(--border-subtle)",
        background: "#ffffff",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          className="sm:!flex-row sm:!items-center sm:!justify-between"
        >
          {/* Logo & copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                letterSpacing: "0.02em",
              }}
            >
              © {new Date().getFullYear()} Vishal Rai. All rights reserved.
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Crafting scalable frontend & backend systems with{" "}
            <span style={{ color: "var(--text-heading)" }}>♥</span> and clean code.
          </p>

          {/* Back to top */}
          <Link
            href="/"
            aria-label="Back to top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              padding: 0,
              transition: "color 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-heading)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            Back to top
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
