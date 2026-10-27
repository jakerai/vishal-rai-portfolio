"use client";

import { useEffect, useState } from "react";

export default function MicroservicesDiagram() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none flex flex-col justify-between bg-white">
      {/* Visual Header */}
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] border-b border-black/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-zinc-800 font-medium">
            {step === 0 && "1. Gateway routes order placement request to Order Service"}
            {step === 1 && "2. Order Service persists state into dedicated Order Database"}
            {step === 2 && "3. OrderCreated event published to distributed message broker"}
            {step === 3 && "4. Payment Service consumes event & executes transactional settlement"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-[10px]">Architecture:</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-medium">
            Database-Per-Service
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
              id="arrow-amber-ms"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
            </marker>
            <marker
              id="arrow-cyan-ms"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#0891b2" />
            </marker>
            <marker
              id="arrow-emerald-ms"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
            </marker>

            <filter id="ms-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* PATH: Client -> API Gateway */}
          <path d="M 75 125 L 120 125" stroke="#d97706" strokeWidth="1.6" markerEnd="url(#arrow-amber-ms)" />

          {/* PATHS: Gateway -> Services */}
          <path d="M 195 105 L 245 50" stroke="#0891b2" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrow-cyan-ms)" />
          <path d="M 195 125 L 245 125" stroke="#d97706" strokeWidth="1.8" markerEnd="url(#arrow-amber-ms)" />
          <path d="M 195 145 L 245 200" stroke="#059669" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrow-emerald-ms)" />

          {/* PATHS: Services -> Independent Databases */}
          <path d="M 355 50 L 400 50" stroke="#0891b2" strokeWidth="1.4" markerEnd="url(#arrow-cyan-ms)" />
          <path d="M 355 125 L 400 125" stroke="#d97706" strokeWidth="1.6" markerEnd="url(#arrow-amber-ms)" />
          <path d="M 355 200 L 400 200" stroke="#059669" strokeWidth="1.4" markerEnd="url(#arrow-emerald-ms)" />

          {/* PATHS: Services <-> Message Broker (Async Pub/Sub) */}
          <path
            d="M 300 152 L 300 170 C 300 180, 470 180, 500 155"
            stroke="#d97706"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            markerEnd="url(#arrow-amber-ms)"
          />

          <path
            d="M 525 160 C 525 210, 400 235, 355 215"
            stroke="#059669"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            markerEnd="url(#arrow-emerald-ms)"
          />

          {/* ANIMATED PACKETS */}
          {step === 0 && (
            <>
              <circle r="4" fill="#d97706">
                <animateMotion dur="1s" repeatCount="indefinite" path="M 75 125 L 120 125" />
              </circle>
              <circle r="4" fill="#d97706">
                <animateMotion dur="1s" repeatCount="indefinite" path="M 195 125 L 245 125" />
              </circle>
            </>
          )}

          {step === 1 && (
            <circle r="4" fill="#d97706">
              <animateMotion dur="0.9s" repeatCount="indefinite" path="M 355 125 L 400 125" />
            </circle>
          )}

          {step === 2 && (
            <circle r="4.5" fill="#b45309">
              <animateMotion dur="1.3s" repeatCount="indefinite" path="M 300 152 L 300 170 C 300 180, 470 180, 500 155" />
            </circle>
          )}

          {step === 3 && (
            <>
              <circle r="4.5" fill="#059669">
                <animateMotion dur="1.4s" repeatCount="indefinite" path="M 525 160 C 525 210, 400 235, 355 215" />
              </circle>
              <circle r="4" fill="#047857">
                <animateMotion dur="0.9s" repeatCount="indefinite" path="M 355 200 L 400 200" />
              </circle>
            </>
          )}

          {/* ─── NODE: CLIENT ─── */}
          <g transform="translate(10, 95)" filter="url(#ms-card-shadow)">
            <rect width="65" height="60" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.3" />
            <text x="8" y="20" fill="#b45309" fontSize="8" fontWeight="600" fontFamily="sans-serif">Client App</text>
            <text x="8" y="34" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Web / iOS</text>
            <text x="8" y="47" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">HTTP Request</text>
          </g>

          {/* ─── NODE: API GATEWAY ─── */}
          <g transform="translate(120, 80)" filter="url(#ms-card-shadow)">
            <rect width="75" height="90" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.6" />
            <text x="8" y="20" fill="#b45309" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">API Gateway</text>
            <text x="8" y="34" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Routing &amp; TLS</text>
            <text x="8" y="48" fill="#71717a" fontSize="7" fontFamily="sans-serif">• Rate Limiting</text>
            <text x="8" y="60" fill="#71717a" fontSize="7" fontFamily="sans-serif">• Auth Guard</text>
            <text x="8" y="72" fill="#71717a" fontSize="7" fontFamily="sans-serif">• Path Router</text>
          </g>

          {/* ─── SERVICES & DATABASES ─── */}

          {/* Domain 1: USER SERVICE */}
          <g transform="translate(245, 25)" filter="url(#ms-card-shadow)">
            <rect width="110" height="50" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.3" />
            <text x="8" y="17" fill="#0e7490" fontSize="8" fontWeight="600" fontFamily="sans-serif">User Service</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Java &amp; Spring Boot</text>
            <text x="8" y="42" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Profile Management</text>
          </g>
          {/* User DB */}
          <g transform="translate(400, 25)" filter="url(#ms-card-shadow)">
            <rect width="85" height="50" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.2" />
            <text x="8" y="17" fill="#0e7490" fontSize="8" fontWeight="600" fontFamily="sans-serif">User Database</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">PostgreSQL</text>
            <text x="8" y="42" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Isolated Schema</text>
          </g>

          {/* Domain 2: ORDER SERVICE */}
          <g transform="translate(245, 100)" filter="url(#ms-card-shadow)">
            <rect
              width="110"
              height="52"
              rx="6"
              fill="#ffffff"
              stroke="#d97706"
              strokeWidth={step === 0 || step === 1 ? "1.8" : "1.3"}
            />
            <text x="8" y="17" fill="#b45309" fontSize="8" fontWeight="600" fontFamily="sans-serif">Order Service</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Python &amp; FastAPI</text>
            <text x="8" y="43" fill="#d97706" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">Emits: OrderCreated</text>
          </g>
          {/* Order DB */}
          <g transform="translate(400, 100)" filter="url(#ms-card-shadow)">
            <rect
              width="85"
              height="52"
              rx="6"
              fill="#ffffff"
              stroke={step === 1 ? "#d97706" : "#cbd5e1"}
              strokeWidth="1.3"
            />
            <text x="8" y="17" fill="#b45309" fontSize="8" fontWeight="600" fontFamily="sans-serif">Order Database</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">MongoDB</text>
            <text x="8" y="43" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Document Store</text>
          </g>

          {/* Domain 3: PAYMENT SERVICE */}
          <g transform="translate(245, 175)" filter="url(#ms-card-shadow)">
            <rect
              width="110"
              height="50"
              rx="6"
              fill="#ffffff"
              stroke="#059669"
              strokeWidth={step === 3 ? "1.8" : "1.3"}
            />
            <text x="8" y="17" fill="#047857" fontSize="8" fontWeight="600" fontFamily="sans-serif">Payment Service</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Go / Spring Engine</text>
            <text x="8" y="42" fill="#059669" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">Consumes: OrderCreated</text>
          </g>
          {/* Payment DB */}
          <g transform="translate(400, 175)" filter="url(#ms-card-shadow)">
            <rect
              width="85"
              height="50"
              rx="6"
              fill="#ffffff"
              stroke={step === 3 ? "#059669" : "#cbd5e1"}
              strokeWidth="1.3"
            />
            <text x="8" y="17" fill="#047857" fontSize="8" fontWeight="600" fontFamily="sans-serif">Payment DB</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Ledger / Stripe</text>
            <text x="8" y="42" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">ACID Compliance</text>
          </g>

          {/* ─── NODE: MESSAGE BROKER / EVENT BUS (RIGHT) ─── */}
          <g transform="translate(505, 90)" filter="url(#ms-card-shadow)">
            <rect
              width="85"
              height="70"
              rx="6"
              fill="#fafafa"
              stroke={step === 2 ? "#b45309" : "#d97706"}
              strokeWidth="1.5"
            />
            <text x="7" y="18" fill="#b45309" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Event Bus</text>
            <text x="7" y="31" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">RabbitMQ / Kafka</text>
            <text x="7" y="45" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Async Pub/Sub</text>
            <text x="7" y="58" fill="#059669" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">Decoupled Mesh</text>
          </g>
        </svg>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="px-5 pb-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-black/[0.05] pt-2">
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Communication:</span>
          <span className="text-emerald-700 font-medium">Synchronous Ingress + Asynchronous Event Pub/Sub</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Data Isolation:</span>
          <span className="text-amber-800 font-medium">Independent Databases per Microservice</span>
        </span>
      </div>
    </div>
  );
}
