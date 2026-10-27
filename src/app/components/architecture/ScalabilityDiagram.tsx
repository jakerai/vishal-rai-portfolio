"use client";

import { useEffect, useState } from "react";

export default function ScalabilityDiagram() {
  const [isSurge, setIsSurge] = useState<boolean>(false);
  const [cpuUsage, setCpuUsage] = useState<number>(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsSurge((prev) => {
        const next = !prev;
        setCpuUsage(next ? 88 : 42);
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none flex flex-col justify-between bg-white">
      {/* Header status bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] border-b border-black/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              isSurge ? "bg-amber-500" : "bg-blue-600"
            }`}
          />
          <span className="text-zinc-800 font-medium">
            {isSurge ? "Traffic surge active • Horizontal Pod Autoscaling (2 → 4 Pods)" : "Standard baseline traffic • 2 Active Replicas"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-[10px]">Cluster Utilization:</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
              isSurge ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {cpuUsage}% Load
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 w-full min-h-[260px] flex items-center justify-center p-2 bg-white">
        <svg
          viewBox="0 0 600 280"
          className="w-full h-full max-h-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow-blue"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
            </marker>
            <marker
              id="arrow-cyan-scale"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284c7" />
            </marker>

            <filter id="scale-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* PATHS: Users -> CDN */}
          <path d="M 70 125 L 110 125" stroke="#0284c7" strokeWidth="1.6" markerEnd="url(#arrow-cyan-scale)" />

          {/* PATHS: CDN -> Edge Frontends */}
          <path d="M 180 110 L 210 75" stroke="#0284c7" strokeWidth="1.4" markerEnd="url(#arrow-cyan-scale)" />
          <path d="M 180 135 L 210 165" stroke="#0284c7" strokeWidth="1.4" markerEnd="url(#arrow-cyan-scale)" />

          {/* PATHS: Frontends -> Load Balancer */}
          <path d="M 285 75 L 315 110" stroke="#0284c7" strokeWidth="1.4" markerEnd="url(#arrow-cyan-scale)" />
          <path d="M 285 165 L 315 130" stroke="#0284c7" strokeWidth="1.4" markerEnd="url(#arrow-cyan-scale)" />

          {/* PATHS: Load Balancer -> Backend Replicas */}
          <path d="M 385 105 L 420 45" stroke="#2563eb" strokeWidth={isSurge ? "1.6" : "1.2"} opacity={isSurge ? 1 : 0.2} markerEnd="url(#arrow-blue)" />
          <path d="M 385 115 L 420 95" stroke="#2563eb" strokeWidth="1.6" markerEnd="url(#arrow-blue)" />
          <path d="M 385 125 L 420 145" stroke="#2563eb" strokeWidth="1.6" markerEnd="url(#arrow-blue)" />
          <path d="M 385 135 L 420 195" stroke="#2563eb" strokeWidth={isSurge ? "1.6" : "1.2"} opacity={isSurge ? 1 : 0.2} markerEnd="url(#arrow-blue)" />

          {/* PATHS: Backends -> Cache/DB */}
          <path d="M 495 45 L 530 110" stroke="#2563eb" strokeWidth="1.4" opacity={isSurge ? 1 : 0.2} markerEnd="url(#arrow-blue)" />
          <path d="M 495 95 L 530 115" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
          <path d="M 495 145 L 530 125" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#arrow-blue)" />
          <path d="M 495 195 L 530 130" stroke="#2563eb" strokeWidth="1.4" opacity={isSurge ? 1 : 0.2} markerEnd="url(#arrow-blue)" />

          {/* ANIMATED PACKETS */}
          <circle r="4" fill="#0284c7">
            <animateMotion dur={isSurge ? "0.6s" : "1.2s"} repeatCount="indefinite" path="M 70 125 L 110 125" />
          </circle>

          <circle r="3.5" fill="#0284c7">
            <animateMotion dur={isSurge ? "0.7s" : "1.3s"} repeatCount="indefinite" path="M 180 110 L 210 75" />
          </circle>
          <circle r="3.5" fill="#0284c7">
            <animateMotion dur={isSurge ? "0.8s" : "1.4s"} repeatCount="indefinite" path="M 180 135 L 210 165" />
          </circle>

          <circle r="3.5" fill="#0284c7">
            <animateMotion dur={isSurge ? "0.7s" : "1.3s"} repeatCount="indefinite" path="M 285 75 L 315 110" />
          </circle>
          <circle r="3.5" fill="#0284c7">
            <animateMotion dur={isSurge ? "0.8s" : "1.4s"} repeatCount="indefinite" path="M 285 165 L 315 130" />
          </circle>

          <circle r="4" fill="#2563eb">
            <animateMotion dur="1.1s" repeatCount="indefinite" path="M 385 115 L 420 95" />
          </circle>
          <circle r="4" fill="#2563eb">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M 385 125 L 420 145" />
          </circle>

          {isSurge && (
            <>
              <circle r="4" fill="#059669">
                <animateMotion dur="0.9s" repeatCount="indefinite" path="M 385 105 L 420 45" />
              </circle>
              <circle r="4" fill="#059669">
                <animateMotion dur="0.9s" repeatCount="indefinite" path="M 385 135 L 420 195" />
              </circle>
            </>
          )}

          {/* ─── NODE: USERS / TRAFFIC ─── */}
          <g transform="translate(10, 95)" filter="url(#scale-card-shadow)">
            <rect width="60" height="60" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
            <text x="7" y="20" fill="#0284c7" fontSize="8" fontWeight="600" fontFamily="sans-serif">Global Users</text>
            <text x="7" y="34" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">HTTP Traffic</text>
            <text x="7" y="47" fill="#71717a" fontSize="7" fontFamily="sans-serif">{isSurge ? "12k req/s" : "3k req/s"}</text>
          </g>

          {/* ─── NODE: CDN / EDGE (FRONTEND LAYER) ─── */}
          <g transform="translate(110, 95)" filter="url(#scale-card-shadow)">
            <rect width="70" height="60" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.5" />
            <text x="8" y="19" fill="#0891b2" fontSize="8" fontWeight="600" fontFamily="sans-serif">Edge CDN</text>
            <text x="8" y="33" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Cloudflare</text>
            <text x="8" y="46" fill="#059669" fontSize="7" fontWeight="500" fontFamily="sans-serif">92% Cached</text>
          </g>

          {/* ─── NODES: FRONTEND INSTANCES ─── */}
          <g transform="translate(210, 50)" filter="url(#scale-card-shadow)">
            <rect width="75" height="42" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
            <text x="8" y="18" fill="#0284c7" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Frontend Node 1</text>
            <text x="8" y="31" fill="#71717a" fontSize="7" fontFamily="sans-serif">Next.js Edge</text>
          </g>
          <g transform="translate(210, 140)" filter="url(#scale-card-shadow)">
            <rect width="75" height="42" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
            <text x="8" y="18" fill="#0284c7" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Frontend Node 2</text>
            <text x="8" y="31" fill="#71717a" fontSize="7" fontFamily="sans-serif">Next.js Edge</text>
          </g>

          {/* ─── NODE: LOAD BALANCER ─── */}
          <g transform="translate(315, 90)" filter="url(#scale-card-shadow)">
            <rect width="70" height="65" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="7" y="19" fill="#1d4ed8" fontSize="8" fontWeight="600" fontFamily="sans-serif">Load Balancer</text>
            <text x="7" y="33" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Application L7</text>
            <text x="7" y="47" fill="#2563eb" fontSize="7" fontFamily="sans-serif">Round Robin</text>
            <text x="7" y="58" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Health Probes</text>
          </g>

          {/* ─── NODES: BACKEND REPLICAS (PODS) ─── */}
          {/* Pod 1 (Autoscaled) */}
          <g transform="translate(420, 25)" opacity={isSurge ? 1 : 0.35} className="transition-opacity duration-700" filter="url(#scale-card-shadow)">
            <rect
              width="75"
              height="34"
              rx="6"
              fill="#ffffff"
              stroke={isSurge ? "#059669" : "#cbd5e1"}
              strokeWidth={isSurge ? "1.5" : "1"}
            />
            <text x="6" y="15" fill={isSurge ? "#047857" : "#71717a"} fontSize="7.5" fontWeight="600" fontFamily="sans-serif">
              Backend Pod 1
            </text>
            <text x="6" y="27" fill={isSurge ? "#059669" : "#94a3b8"} fontSize="6.5" fontWeight="500" fontFamily="sans-serif">
              {isSurge ? "★ Auto-Scaled" : "Standby"}
            </text>
          </g>

          {/* Pod 2 (Always Active) */}
          <g transform="translate(420, 75)" filter="url(#scale-card-shadow)">
            <rect width="75" height="34" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="6" y="15" fill="#1d4ed8" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Backend Pod 2</text>
            <text x="6" y="27" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Spring Boot</text>
          </g>

          {/* Pod 3 (Always Active) */}
          <g transform="translate(420, 125)" filter="url(#scale-card-shadow)">
            <rect width="75" height="34" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="6" y="15" fill="#1d4ed8" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Backend Pod 3</text>
            <text x="6" y="27" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">FastAPI / Python</text>
          </g>

          {/* Pod 4 (Autoscaled) */}
          <g transform="translate(420, 175)" opacity={isSurge ? 1 : 0.35} className="transition-opacity duration-700" filter="url(#scale-card-shadow)">
            <rect
              width="75"
              height="34"
              rx="6"
              fill="#ffffff"
              stroke={isSurge ? "#059669" : "#cbd5e1"}
              strokeWidth={isSurge ? "1.5" : "1"}
            />
            <text x="6" y="15" fill={isSurge ? "#047857" : "#71717a"} fontSize="7.5" fontWeight="600" fontFamily="sans-serif">
              Backend Pod 4
            </text>
            <text x="6" y="27" fill={isSurge ? "#059669" : "#94a3b8"} fontSize="6.5" fontWeight="500" fontFamily="sans-serif">
              {isSurge ? "★ Auto-Scaled" : "Standby"}
            </text>
          </g>

          {/* ─── NODE: CACHE / DATABASE TIER ─── */}
          <g transform="translate(530, 85)" filter="url(#scale-card-shadow)">
            <rect width="65" height="75" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="7" y="19" fill="#18181b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Data Tier</text>
            <text x="7" y="33" fill="#d97706" fontSize="7" fontWeight="500" fontFamily="sans-serif">Redis Cache</text>
            <text x="7" y="47" fill="#2563eb" fontSize="7" fontWeight="500" fontFamily="sans-serif">Postgres DB</text>
            <text x="7" y="61" fill="#059669" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">3x Replicas</text>
          </g>
        </svg>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="px-5 pb-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-black/[0.05] pt-2">
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Scaling Model:</span>
          <span className="text-blue-800 font-medium">Edge SSR + Horizontal Pod Autoscaler (HPA)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Replicas:</span>
          <span className={isSurge ? "text-emerald-700 font-semibold" : "text-blue-700 font-medium"}>
            {isSurge ? "4 Pods Active (+100%)" : "2 Pods Baseline"}
          </span>
        </span>
      </div>
    </div>
  );
}
