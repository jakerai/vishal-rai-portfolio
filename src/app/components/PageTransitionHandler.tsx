"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTES = ["/", "/about", "/skills", "/experience", "/projects"];

export default function PageTransitionHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<"up" | "down">("up");

  const isNavigatingRef = useRef(false);
  const lockUntilRef = useRef(0);
  const touchStartY = useRef(0);

  // Initialize lock on mount
  useEffect(() => {
    lockUntilRef.current = Date.now() + 1000;
  }, []);

  // Determine current index from pathname
  let currentIdx = ROUTES.indexOf(pathname);
  if (currentIdx === -1) {
    if (pathname.startsWith("/about")) currentIdx = 1;
    else if (pathname.startsWith("/skills")) currentIdx = 2;
    else if (pathname.startsWith("/experience")) currentIdx = 3;
    else if (pathname.startsWith("/projects")) currentIdx = 4;
    else currentIdx = 0;
  }

  // When pathname changes, reset state and set lock cooldown
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const t = setTimeout(() => {
      setIsExiting(false);
      isNavigatingRef.current = false;
      lockUntilRef.current = Date.now() + 1200;
      document.documentElement.style.scrollBehavior = "";
    }, 10);
    return () => clearTimeout(t);
  }, [pathname]);

  const triggerNavigation = useCallback(
    (targetRoute: string, dir: "up" | "down") => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      lockUntilRef.current = Date.now() + 2500;

      setExitDirection(dir);
      setIsExiting(true);

      setTimeout(() => {
        router.push(targetRoute);
      }, 220);
    },
    [router]
  );

  useEffect(() => {
    let accumulatedDelta = 0;
    let resetTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (Date.now() < lockUntilRef.current) return;
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isBottom = scrollY + windowHeight >= docHeight - 12;
      const isTop = scrollY <= 6;

      // Scrolling DOWN at bottom of page
      if (e.deltaY > 0 && isBottom && currentIdx < ROUTES.length - 1) {
        accumulatedDelta += e.deltaY;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          accumulatedDelta = 0;
        }, 180);

        if (accumulatedDelta > 45) {
          accumulatedDelta = 0;
          triggerNavigation(ROUTES[currentIdx + 1], "up");
        }
      }
      // Scrolling UP at top of page
      else if (e.deltaY < 0 && isTop && currentIdx > 0) {
        accumulatedDelta += e.deltaY;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          accumulatedDelta = 0;
        }, 180);

        if (accumulatedDelta < -45) {
          accumulatedDelta = 0;
          triggerNavigation(ROUTES[currentIdx - 1], "down");
        }
      } else {
        accumulatedDelta = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (Date.now() < lockUntilRef.current) return;
      if (isNavigatingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isBottom = scrollY + windowHeight >= docHeight - 15;
      const isTop = scrollY <= 10;

      // Swipe up = scroll down
      if (diffY > 55 && isBottom && currentIdx < ROUTES.length - 1) {
        triggerNavigation(ROUTES[currentIdx + 1], "up");
      }
      // Swipe down = scroll up
      else if (diffY < -55 && isTop && currentIdx > 0) {
        triggerNavigation(ROUTES[currentIdx - 1], "down");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (Date.now() < lockUntilRef.current) return;
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isBottom = scrollY + windowHeight >= docHeight - 12;
      const isTop = scrollY <= 8;

      if ((e.key === "ArrowDown" || e.key === "PageDown") && isBottom && currentIdx < ROUTES.length - 1) {
        e.preventDefault();
        triggerNavigation(ROUTES[currentIdx + 1], "up");
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && isTop && currentIdx > 0) {
        e.preventDefault();
        triggerNavigation(ROUTES[currentIdx - 1], "down");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(resetTimer);
    };
  }, [currentIdx, triggerNavigation]);

  return (
    <div
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting
          ? exitDirection === "up"
            ? "translateY(-30px)"
            : "translateY(30px)"
          : "translateY(0)",
        transition: isExiting
          ? "opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
          : "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
