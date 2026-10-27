"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ARCHITECTURE_SLIDES } from "./types";
import JwtAuthDiagram from "./JwtAuthDiagram";
import KafkaProcessingDiagram from "./KafkaProcessingDiagram";
import ScalabilityDiagram from "./ScalabilityDiagram";
import MicroservicesDiagram from "./MicroservicesDiagram";
import PaymentIdempotencyDiagram from "./PaymentIdempotencyDiagram";

const AUTO_SLIDE_DURATION_MS = 10000;

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => { };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface ArchitectureSlideshowProps {
  onSlideChange?: (accentColor: string) => void;
}

export default function ArchitectureSlideshow({ onSlideChange }: ArchitectureSlideshowProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    onSlideChange?.(ARCHITECTURE_SLIDES[activeIndex].accentColor);
  }, [activeIndex, onSlideChange]);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const [isManualPause, setIsManualPause] = useState(false);
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [isTransitioning, setIsTransitioning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (newIndex: number, dir?: "left" | "right") => {
      if (newIndex === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setDirection(dir || (newIndex > activeIndex ? "right" : "left"));
      setActiveIndex(newIndex);
      setProgress(0);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    },
    [activeIndex, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    const nextIdx = (activeIndex + 1) % ARCHITECTURE_SLIDES.length;
    goToSlide(nextIdx, "right");
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIdx = (activeIndex - 1 + ARCHITECTURE_SLIDES.length) % ARCHITECTURE_SLIDES.length;
    goToSlide(prevIdx, "left");
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || isManualPause) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50;
    const progressIncrement = (intervalStep / AUTO_SLIDE_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused, isManualPause, nextSlide, activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  };

  const currentSlide = ARCHITECTURE_SLIDES[activeIndex];

  return (
    <div className="relative w-full max-w-[660px] select-none">
      {/* Signature Editorial Offset Border Frame */}
      <div
        aria-hidden="true"
        className="absolute -top-2 -right-2 w-full h-full border border-black/10 pointer-events-none"
      />

      {/* Main Architectural Showcase Container */}
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="System Architecture Visualizations"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative z-10 w-full bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-black/20"
        style={{
          minHeight: "410px",
        }}
      >
        {/* Editorial Top Header */}
        <div className="px-5 pt-4 pb-3 border-b border-black/[0.06] bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentSlide.accentColor }}
              />
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-500">
                ARCHITECTURE {currentSlide.number} / 05 • {currentSlide.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                {isPaused || isManualPause ? "PAUSED" : "ACTIVE"}
              </span>

              {/* Pause/Play Toggle */}
              <button
                type="button"
                onClick={() => setIsManualPause((prev) => !prev)}
                aria-label={isManualPause ? "Resume auto slideshow" : "Pause auto slideshow"}
                title={isManualPause ? "Resume slideshow" : "Pause slideshow"}
                className="text-zinc-400 hover:text-zinc-800 transition-colors p-0.5"
              >
                {isManualPause ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="text-[15px] font-medium text-zinc-900 tracking-tight">
              {currentSlide.title}
            </h3>
            <span className="text-[11px] text-zinc-500">
              {currentSlide.subtitle}
            </span>
          </div>
        </div>

        {/* Main Architecture Diagram Canvas Stage */}
        <div
          className="relative flex-1 w-full bg-white flex items-center justify-center overflow-hidden min-h-[275px]"
          aria-live="polite"
        >
          <div
            key={activeIndex}
            className={`w-full h-full ${prefersReducedMotion
                ? "transition-opacity duration-300 opacity-100"
                : direction === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }`}
            style={{
              animationDuration: "320ms",
              animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {activeIndex === 0 && <JwtAuthDiagram />}
            {activeIndex === 1 && <KafkaProcessingDiagram />}
            {activeIndex === 2 && <ScalabilityDiagram />}
            {activeIndex === 3 && <MicroservicesDiagram />}
            {activeIndex === 4 && <PaymentIdempotencyDiagram />}
          </div>
        </div>

        {/* Editorial Bottom Navigation Bar */}
        <div className="px-5 py-2.5 border-t border-black/[0.06] bg-white flex items-center justify-between">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous architecture diagram"
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* 5 Navigation Indicators */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Architecture slides navigation"
          >
            {ARCHITECTURE_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  title={slide.title}
                  onClick={() => goToSlide(index)}
                  className={`group relative flex items-center transition-all duration-300 ${isActive
                      ? "px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-medium"
                      : "px-1.5 py-0.5 text-zinc-400 hover:text-zinc-800 text-[10px]"
                    }`}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full transition-all mr-1 ${isActive ? "bg-white" : "bg-zinc-300 group-hover:bg-zinc-500"
                      }`}
                  />
                  <span>0{index + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next architecture diagram"
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-full h-[2px] bg-zinc-100 relative overflow-hidden" aria-hidden="true">
          <div
            className="h-full transition-all ease-linear"
            style={{
              width: `${progress}%`,
              backgroundColor: currentSlide.accentColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
