"use client";

import { useEffect, useState } from "react";

export default function PaymentIdempotencyDiagram() {
  // 0 = Initial Payment Request, 1 = Processing & Bank Charge, 2 = Duplicate Retry (Blocked & Cached)
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none flex flex-col justify-between bg-white">
      {/* Visual Phase Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] border-b border-black/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              phase === 2 ? "bg-amber-500" : "bg-purple-600"
            }`}
          />
          <span className="text-zinc-800 font-medium">
            {phase === 0 && "1. Initial Request: Client submits payment with Idempotency-Key"}
            {phase === 1 && "2. Key locked in Redis SETNX • Bank charged once • Response cached"}
            {phase === 2 && "3. Duplicate Retry: Same key detected • Bank bypassed • Cached response replayed"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
              phase < 2
                ? "bg-purple-50 text-purple-800 border border-purple-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            {phase < 2 ? "Initial Execution" : "Deduplication Shield Active"}
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
              id="arrow-purple-idem"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#7c3aed" />
            </marker>
            <marker
              id="arrow-emerald-idem"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
            </marker>
            <marker
              id="arrow-amber-idem"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
            </marker>

            <filter id="idem-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* PATH 1: Client -> API Gateway */}
          <path
            d="M 95 125 L 145 125"
            stroke={phase === 2 ? "#d97706" : "#7c3aed"}
            strokeWidth="1.8"
            markerEnd={phase === 2 ? "url(#arrow-amber-idem)" : "url(#arrow-purple-idem)"}
          />

          {/* PATH 2: Gateway <-> Idempotency Store (Lock / Check) */}
          <path
            d="M 205 100 L 255 55"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeDasharray={phase === 2 ? "4 4" : "none"}
            markerEnd="url(#arrow-purple-idem)"
          />

          {/* PATH 3: Gateway -> Payment Core (Only in phase 0 and 1) */}
          <path
            d="M 215 135 L 265 175"
            stroke={phase < 2 ? "#7c3aed" : "rgba(0,0,0,0.15)"}
            strokeWidth="1.5"
            strokeDasharray={phase < 2 ? "none" : "3 3"}
            markerEnd={phase < 2 ? "url(#arrow-purple-idem)" : ""}
          />

          {/* PATH 4: Payment Core -> Bank / Visa Network (Only in phase 0 and 1) */}
          <path
            d="M 390 175 L 440 175"
            stroke={phase < 2 ? "#059669" : "rgba(0,0,0,0.12)"}
            strokeWidth="1.8"
            strokeDasharray={phase < 2 ? "none" : "3 3"}
            markerEnd={phase < 2 ? "url(#arrow-emerald-idem)" : ""}
          />

          {/* PATH 5: Bank -> Store cached response (After charge) */}
          <path
            d="M 495 145 C 495 85, 420 55, 385 55"
            stroke={phase === 1 ? "#059669" : "rgba(0,0,0,0.12)"}
            strokeWidth="1.4"
            strokeDasharray="3 3"
            markerEnd={phase === 1 ? "url(#arrow-emerald-idem)" : ""}
          />

          {/* PATH 6: Return Response to Client (Cached or fresh 200 OK) */}
          <path
            d="M 265 55 C 220 55, 130 75, 95 105"
            stroke={phase === 2 ? "#059669" : "rgba(5, 150, 105, 0.25)"}
            strokeWidth={phase === 2 ? "2" : "1.2"}
            strokeDasharray={phase === 2 ? "none" : "4 4"}
            markerEnd="url(#arrow-emerald-idem)"
          />

          {/* ANIMATED PACKETS */}
          {/* Phase 0: First submission */}
          {phase === 0 && (
            <circle r="4" fill="#7c3aed">
              <animateMotion dur="1s" repeatCount="indefinite" path="M 95 125 L 145 125" />
            </circle>
          )}

          {/* Phase 1: Charge Bank and Save Response */}
          {phase === 1 && (
            <>
              <circle r="4" fill="#7c3aed">
                <animateMotion dur="1.1s" repeatCount="indefinite" path="M 215 135 L 265 175" />
              </circle>
              <circle r="4.5" fill="#059669">
                <animateMotion dur="1.1s" repeatCount="indefinite" path="M 390 175 L 440 175" />
              </circle>
              <circle r="4" fill="#059669">
                <animateMotion dur="1.4s" repeatCount="indefinite" path="M 495 145 C 495 85, 420 55, 385 55" />
              </circle>
            </>
          )}

          {/* Phase 2: Duplicate request -> Fast Cache Return (Bank BYPASSED) */}
          {phase === 2 && (
            <>
              <circle r="4" fill="#d97706">
                <animateMotion dur="0.9s" repeatCount="indefinite" path="M 95 125 L 145 125" />
              </circle>
              <circle r="4" fill="#d97706">
                <animateMotion dur="0.9s" repeatCount="indefinite" path="M 205 100 L 255 55" />
              </circle>
              <circle r="4.5" fill="#059669">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 265 55 C 220 55, 130 75, 95 105" />
              </circle>
            </>
          )}

          {/* ─── NODE: CLIENT / CHECKOUT APP ─── */}
          <g transform="translate(10, 65)" filter="url(#idem-card-shadow)">
            <rect
              width="85"
              height="115"
              rx="6"
              fill="#ffffff"
              stroke={phase === 2 ? "#d97706" : "#7c3aed"}
              strokeWidth="1.5"
            />
            <text x="8" y="18" fill="#18181b" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Checkout App</text>
            <text x="8" y="30" fill="#71717a" fontSize="7" fontFamily="sans-serif">POST /payments</text>

            <rect x="6" y="38" width="73" height="34" rx="3" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="9" y="49" fill="#7c3aed" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">Idempotency-Key:</text>
            <text x="9" y="62" fill="#0f172a" fontSize="6.5" fontFamily="monospace">uuid-8f92-ac14</text>

            <rect x="6" y="78" width="73" height="28" rx="3" fill={phase === 2 ? "#ecfdf5" : "#fafafa"} stroke={phase === 2 ? "#a7f3d0" : "#e2e8f0"} />
            <text x="9" y="89" fill={phase === 2 ? "#047857" : "#71717a"} fontSize="6.5" fontWeight="600" fontFamily="sans-serif">
              {phase === 2 ? "Duplicate Retry" : "Attempt #1"}
            </text>
            <text x="9" y="99" fill="#52525b" fontSize="6" fontFamily="sans-serif">
              {phase === 2 ? "200 OK (Replay)" : "Amount: $149.00"}
            </text>
          </g>

          {/* ─── NODE: API GATEWAY & IDEMPOTENCY FILTER ─── */}
          <g transform="translate(145, 85)" filter="url(#idem-card-shadow)">
            <rect width="80" height="75" rx="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.6" />
            <text x="8" y="18" fill="#7c3aed" fontSize="8" fontWeight="600" fontFamily="sans-serif">API Gateway</text>
            <text x="8" y="30" fill="#18181b" fontSize="7" fontWeight="500" fontFamily="sans-serif">Idempotency Guard</text>
            <text x="8" y="44" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">• Extract Header</text>
            <text x="8" y="55" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">• Lock or Lookup</text>
            <text x="8" y="66" fill="#059669" fontSize="6.5" fontWeight="500" fontFamily="sans-serif">• Prevent Double</text>
          </g>

          {/* ─── NODE: IDEMPOTENCY STORE (REDIS / DISTRIBUTED LOCK) ─── */}
          <g transform="translate(255, 20)" filter="url(#idem-card-shadow)">
            <rect
              width="130"
              height="65"
              rx="6"
              fill={phase === 2 ? "#ecfdf5" : "#f8fafc"}
              stroke={phase === 2 ? "#059669" : "#7c3aed"}
              strokeWidth="1.5"
            />
            <text x="8" y="17" fill="#7c3aed" fontSize="8" fontWeight="600" fontFamily="sans-serif">Idempotency Store</text>
            <text x="8" y="29" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Redis SETNX / Distributed Lock</text>

            <rect x="6" y="36" width="118" height="22" rx="3" fill="#ffffff" stroke="#e2e8f0" />
            <text x="10" y="47" fill="#52525b" fontSize="6.5" fontFamily="sans-serif">Key: uuid-8f92-ac14</text>
            <text x="10" y="54" fill={phase === 2 ? "#059669" : "#7c3aed"} fontSize="6.5" fontWeight="600" fontFamily="sans-serif">
              {phase === 0 ? "Status: NEW (Acquiring Lock)" : phase === 1 ? "Status: PROCESSING (Locked)" : "Status: COMPLETED (Cached 200)"}
            </text>
          </g>

          {/* ─── NODE: PAYMENT CORE SERVICE ─── */}
          <g transform="translate(265, 145)" filter="url(#idem-card-shadow)">
            <rect
              width="125"
              height="60"
              rx="6"
              fill="#ffffff"
              stroke={phase < 2 ? "#7c3aed" : "#cbd5e1"}
              strokeWidth="1.4"
            />
            <text x="8" y="18" fill="#7c3aed" fontSize="8" fontWeight="600" fontFamily="sans-serif">Payment Core</text>
            <text x="8" y="32" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Order &amp; Ledger Engine</text>
            <text x="8" y="46" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">
              {phase < 2 ? "Execute Transaction" : "Idle (Bypassed by Idempotency)"}
            </text>
          </g>

          {/* ─── NODE: BANK / CARD NETWORK (CRITICAL POINT) ─── */}
          <g transform="translate(440, 145)" filter="url(#idem-card-shadow)">
            <rect
              width="145"
              height="60"
              rx="6"
              fill={phase < 2 ? "#ffffff" : "#fbfbfb"}
              stroke={phase < 2 ? "#059669" : "#e4e4e7"}
              strokeWidth={phase < 2 ? "1.8" : "1"}
            />
            <text x="10" y="18" fill={phase < 2 ? "#047857" : "#94a3b8"} fontSize="8" fontWeight="600" fontFamily="sans-serif">
              Bank / Card Gateway
            </text>
            <text x="10" y="32" fill={phase < 2 ? "#18181b" : "#94a3b8"} fontSize="7.5" fontWeight="500" fontFamily="sans-serif">
              Stripe / Visa / Banking Core
            </text>

            <rect x="8" y="38" width="129" height="16" rx="3" fill={phase < 2 ? "#ecfdf5" : "#f1f5f9"} />
            <text x="12" y="49" fill={phase < 2 ? "#059669" : "#64748b"} fontSize="6.5" fontWeight="600" fontFamily="sans-serif">
              {phase < 2 ? "✓ Charged Exactly Once ($149)" : "🛡️ BYPASSED: Zero Duplicate Debit"}
            </text>
          </g>

          {/* FLOW LABELS */}
          <g transform="translate(90, 140)">
            <text fill="#7c3aed" fontSize="7" fontWeight="500" fontFamily="sans-serif">
              1. POST key
            </text>
          </g>
          <g transform="translate(205, 45)">
            <text fill="#7c3aed" fontSize="7" fontWeight="500" fontFamily="sans-serif">
              2. Lock Key
            </text>
          </g>
          <g transform="translate(390, 192)">
            <text fill={phase < 2 ? "#059669" : "#94a3b8"} fontSize="7" fontWeight="500" fontFamily="sans-serif">
              3. Debit
            </text>
          </g>
          <g transform="translate(130, 75)">
            <text fill="#059669" fontSize="7" fontWeight="600" fontFamily="sans-serif">
              ◀ Cached 200 OK Replay
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="px-5 pb-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-black/[0.05] pt-2">
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Deduplication Pattern:</span>
          <span className="text-purple-800 font-medium">Atomic Distributed Lock + Cached Response Replay</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Protection:</span>
          <span className="text-emerald-700 font-medium">Zero Double-Charges Guaranteed</span>
        </span>
      </div>
    </div>
  );
}
