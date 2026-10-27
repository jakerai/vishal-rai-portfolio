"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "About", id: "about" },
  { href: "/skills", label: "Skills", id: "skills" },
  { href: "/experience", label: "Experience", id: "experience" },
  { href: "/projects", label: "Projects", id: "projects" },
];

const ALL_MOBILE_LINKS = [
  { href: "/", label: "Home", id: "home", navIdx: 0 },
  { href: "/about", label: "About", id: "about", navIdx: 1 },
  { href: "/skills", label: "Skills", id: "skills", navIdx: 2 },
  { href: "/experience", label: "Experience", id: "experience", navIdx: 3 },
  { href: "/projects", label: "Projects", id: "projects", navIdx: 4 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Helper to determine active index across:
  // 0: Home (Vishal Rai)
  // 1: About (/about)
  // 2: Skills (/skills)
  // 3: Experience (/experience)
  // 4: Projects (/projects)
  const getNavIndex = (path: string) => {
    if (path.startsWith("/about")) return 1;
    if (path.startsWith("/skills")) return 2;
    if (path.startsWith("/experience")) return 3;
    if (path.startsWith("/projects")) return 4;
    return 0;
  };

  const activeIdx = getNavIndex(pathname);
  const activeId = activeIdx === 0 ? "home" : (NAV_LINKS[activeIdx - 1]?.id ?? "home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled || mobileOpen
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || mobileOpen
          ? "1px solid rgba(0, 0, 0, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div
        className="section-container"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
        }}
      >
        {/* Logo / Brand Name */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <span
            className="block"
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--text-heading)",
              letterSpacing: "0.02em",
              fontFamily: "'Segoe UI Symbol', 'Apple Symbols', 'Cambria Math', system-ui, sans-serif",
              transition: "color 0.2s ease, opacity 0.2s ease",
            }}
          >
            𝓥𝓲𝓼𝓱𝓪𝓵 𝓡𝓪𝓲
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex"
          style={{
            position: "relative",
            alignItems: "center",
            gap: 12,
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "8px 18px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isActive
                    ? "var(--text-heading)"
                    : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-heading)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isActive
                    ? "var(--text-heading)"
                    : "var(--text-secondary)";
                }}
              >
                <span>{link.label}</span>
                {/* Active Underline Indicator */}
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isActive ? "22px" : "0px",
                    height: "2px",
                    borderRadius: "1px",
                    background: "var(--text-heading)",
                    transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle"
          className="flex md:!hidden flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 1.5,
              background: "var(--text-heading)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: mobileOpen ? "translateY(7.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 1.5,
              background: "var(--text-heading)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 1.5,
              background: "var(--text-heading)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: mobileOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className="md:!hidden"
        style={{
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: mobileOpen ? 380 : 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: mobileOpen
            ? "1px solid rgba(0, 0, 0, 0.08)"
            : "none",
        }}
      >
        <div className="section-container" style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {ALL_MOBILE_LINKS.map((link) => {
            const isActive = activeIdx === link.navIdx;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (link.href === "/" && pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--text-heading)" : "var(--text-primary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-subtle)",
                  transition: "color 0.3s ease",
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 8px",
                      background: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "4px",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: "var(--text-heading)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#10b981",
                      }}
                    />
                    CURRENT
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
