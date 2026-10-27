import React from "react";

interface SectionBadgeProps {
  label: string;
  dotColor?: string;
  icon?: React.ReactNode;
}

export default function SectionBadge({ label, dotColor = "#059669" }: SectionBadgeProps) {
  return (
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
        userSelect: "none",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)",
          animation: "subtlePulse 2s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  );
}
