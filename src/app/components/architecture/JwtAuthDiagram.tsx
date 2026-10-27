"use client";

import { useEffect, useState } from "react";

export default function JwtAuthDiagram() {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none flex flex-col justify-between bg-white">
      {/* Visual Phase Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] border-b border-black/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              phase < 2 ? "bg-amber-500" : "bg-emerald-600"
            }`}
          />
          <span className="text-zinc-800 font-medium">
            {phase === 0 && "Step 1: Client submits authentication request"}
            {phase === 1 && "Step 2: Server validates credentials & issues signed JWT"}
            {phase === 3 && "Step 4: Token verified & protected resource returned"}
            {phase === 2 && "Step 3: Client sends authorized request with Bearer token"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
              phase < 2
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-zinc-50 text-zinc-400 border border-zinc-200"
            }`}
          >
            Authentication
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all duration-300 ${
              phase >= 2
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-zinc-50 text-zinc-400 border border-zinc-200"
            }`}
          >
            Authorization
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
              id="arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
            </marker>
            <marker
              id="arrow-emerald"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
            </marker>

            <filter id="jwt-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* PATH 1: Client -> Login API (Upper Forward) */}
          <path
            id="path-auth-req"
            d="M 120 75 L 205 75"
            stroke={phase === 0 ? "#d97706" : "rgba(217, 119, 6, 0.2)"}
            strokeWidth={phase === 0 ? "2" : "1.2"}
            strokeDasharray={phase === 0 ? "none" : "3 3"}
            markerEnd="url(#arrow-amber)"
          />

          {/* PATH 2: Login API -> DB Validation */}
          <path
            id="path-auth-val"
            d="M 335 75 L 420 75"
            stroke={phase === 1 ? "#d97706" : "rgba(217, 119, 6, 0.2)"}
            strokeWidth={phase === 1 ? "2" : "1.2"}
            strokeDasharray={phase === 1 ? "none" : "3 3"}
            markerEnd="url(#arrow-amber)"
          />

          {/* PATH 3: JWT Issued -> Return to Client (Curved return path) */}
          <path
            id="path-jwt-issue"
            d="M 270 105 C 270 135, 160 135, 120 100"
            stroke={phase === 1 ? "#d97706" : "rgba(217, 119, 6, 0.18)"}
            strokeWidth={phase === 1 ? "2" : "1.2"}
            strokeDasharray={phase === 1 ? "4 4" : "2 2"}
            markerEnd="url(#arrow-amber)"
          />

          {/* PATH 4: Client -> Protected API (Bearer Token - Lower Forward) */}
          <path
            id="path-authz-req"
            d="M 120 205 L 205 205"
            stroke={phase === 2 ? "#059669" : "rgba(5, 150, 105, 0.2)"}
            strokeWidth={phase === 2 ? "2" : "1.2"}
            strokeDasharray={phase === 2 ? "none" : "3 3"}
            markerEnd="url(#arrow-emerald)"
          />

          {/* PATH 5: Protected API -> Resource DB */}
          <path
            id="path-authz-res"
            d="M 335 205 L 420 205"
            stroke={phase === 3 ? "#059669" : "rgba(5, 150, 105, 0.2)"}
            strokeWidth={phase === 3 ? "2" : "1.2"}
            strokeDasharray={phase === 3 ? "none" : "3 3"}
            markerEnd="url(#arrow-emerald)"
          />

          {/* PATH 6: Resource Response 200 OK -> Return to Client */}
          <path
            id="path-authz-resp"
            d="M 270 235 C 270 265, 160 265, 120 230"
            stroke={phase === 3 ? "#059669" : "rgba(5, 150, 105, 0.18)"}
            strokeWidth={phase === 3 ? "2" : "1.2"}
            strokeDasharray={phase === 3 ? "4 4" : "2 2"}
            markerEnd="url(#arrow-emerald)"
          />

          {/* ANIMATED PACKETS */}
          {phase === 0 && (
            <circle r="4" fill="#d97706">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M 120 75 L 205 75" />
            </circle>
          )}

          {phase === 1 && (
            <g>
              <circle r="4" fill="#d97706">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 335 75 L 420 75" />
              </circle>
              <circle r="4.5" fill="#b45309">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 270 105 C 270 135, 160 135, 120 100" />
              </circle>
            </g>
          )}

          {phase === 2 && (
            <circle r="4.5" fill="#059669">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M 120 205 L 205 205" />
            </circle>
          )}

          {phase === 3 && (
            <g>
              <circle r="4" fill="#059669">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M 335 205 L 420 205" />
              </circle>
              <circle r="4.5" fill="#047857">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 270 235 C 270 265, 160 265, 120 230" />
              </circle>
            </g>
          )}

          {/* ─── NODE: CLIENT (Web / Mobile) ─── */}
          <g transform="translate(15, 60)" filter="url(#jwt-card-shadow)">
            <rect
              width="105"
              height="160"
              rx="6"
              fill="#ffffff"
              stroke={phase < 2 ? "#d97706" : "#059669"}
              strokeWidth="1.5"
            />
            {/* Header */}
            <circle cx="20" cy="22" r="4.5" fill={phase < 2 ? "#d97706" : "#059669"} />
            <text x="32" y="26" fill="#18181b" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              Client
            </text>
            <text x="15" y="44" fill="#71717a" fontSize="9" fontFamily="sans-serif">
              Web / Mobile App
            </text>

            {/* Auth State Box */}
            <rect
              x="10"
              y="58"
              width="85"
              height="40"
              rx="4"
              fill={phase < 2 ? "#fffbeb" : "#fafafa"}
              stroke={phase < 2 ? "#fcd34d" : "#e4e4e7"}
            />
            <text x="16" y="73" fill={phase < 2 ? "#b45309" : "#71717a"} fontSize="8.5" fontWeight="500" fontFamily="sans-serif">
              {phase === 0 ? "Login Request" : "Token Stored"}
            </text>
            <text x="16" y="88" fill="#52525b" fontSize="8" fontFamily="sans-serif">
              {phase === 0 ? "User Credentials" : "JWT in Memory"}
            </text>

            {/* Authz State Box */}
            <rect
              x="10"
              y="106"
              width="85"
              height="42"
              rx="4"
              fill={phase >= 2 ? "#ecfdf5" : "#fafafa"}
              stroke={phase >= 2 ? "#a7f3d0" : "#e4e4e7"}
            />
            <text x="16" y="122" fill={phase >= 2 ? "#047857" : "#71717a"} fontSize="8.5" fontWeight="500" fontFamily="sans-serif">
              {phase === 2 ? "Resource Request" : phase === 3 ? "200 OK Data" : "Bearer Header"}
            </text>
            <text x="16" y="137" fill="#71717a" fontSize="7.5" fontFamily="sans-serif">
              {phase >= 2 ? "Authorized Session" : "Awaiting Token"}
            </text>
          </g>

          {/* ─── NODE: LOGIN API / AUTH SERVER ─── */}
          <g transform="translate(205, 45)" filter="url(#jwt-card-shadow)">
            <rect
              width="130"
              height="60"
              rx="6"
              fill="#ffffff"
              stroke={phase === 0 || phase === 1 ? "#d97706" : "#e4e4e7"}
              strokeWidth="1.5"
            />
            <text x="12" y="22" fill="#b45309" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              Authentication API
            </text>
            <text x="12" y="38" fill="#18181b" fontSize="10" fontWeight="500" fontFamily="sans-serif">
              Identity Service
            </text>
            <text x="12" y="51" fill="#71717a" fontSize="8.5" fontFamily="sans-serif">
              Credential Validation
            </text>
          </g>

          {/* ─── NODE: CREDENTIAL VALIDATION & ISSUER ─── */}
          <g transform="translate(420, 45)" filter="url(#jwt-card-shadow)">
            <rect
              width="155"
              height="60"
              rx="6"
              fill="#ffffff"
              stroke={phase === 1 ? "#d97706" : "#e4e4e7"}
              strokeWidth="1.5"
            />
            <text x="12" y="22" fill="#b45309" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              Identity Store
            </text>
            <text x="12" y="38" fill="#18181b" fontSize="10" fontWeight="500" fontFamily="sans-serif">
              Password Hash &amp; Role DB
            </text>
            <text x="12" y="51" fill="#059669" fontSize="8.5" fontWeight="500" fontFamily="sans-serif">
              ✓ RS256 JWT Signed
            </text>
          </g>

          {/* ─── NODE: PROTECTED API GATEWAY ─── */}
          <g transform="translate(205, 175)" filter="url(#jwt-card-shadow)">
            <rect
              width="130"
              height="60"
              rx="6"
              fill="#ffffff"
              stroke={phase === 2 || phase === 3 ? "#059669" : "#e4e4e7"}
              strokeWidth="1.5"
            />
            <text x="12" y="22" fill="#047857" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              Resource API
            </text>
            <text x="12" y="38" fill="#18181b" fontSize="10" fontWeight="500" fontFamily="sans-serif">
              Gateway &amp; Guard
            </text>
            <text x="12" y="51" fill="#71717a" fontSize="8.5" fontFamily="sans-serif">
              Token Signature Check
            </text>
          </g>

          {/* ─── NODE: PROTECTED RESOURCE / DB ─── */}
          <g transform="translate(420, 175)" filter="url(#jwt-card-shadow)">
            <rect
              width="155"
              height="60"
              rx="6"
              fill="#ffffff"
              stroke={phase === 3 ? "#059669" : "#e4e4e7"}
              strokeWidth="1.5"
            />
            <text x="12" y="22" fill="#047857" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              Protected Resource
            </text>
            <text x="12" y="38" fill="#18181b" fontSize="10" fontWeight="500" fontFamily="sans-serif">
              Enterprise Data Tier
            </text>
            <text x="12" y="51" fill="#71717a" fontSize="8.5" fontFamily="sans-serif">
              Authorized Response
            </text>
          </g>

          {/* FLOW LABELS */}
          <g transform="translate(125, 62)">
            <text fill="#b45309" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              1. Credentials
            </text>
          </g>
          <g transform="translate(340, 62)">
            <text fill="#b45309" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              2. Validate Hash
            </text>
          </g>
          <g transform="translate(185, 126)">
            <text fill="#d97706" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              ◀ 3. Signed JWT
            </text>
          </g>
          <g transform="translate(125, 192)">
            <text fill="#047857" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              4. Bearer Token
            </text>
          </g>
          <g transform="translate(340, 192)">
            <text fill="#047857" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              5. Query Resource
            </text>
          </g>
          <g transform="translate(185, 256)">
            <text fill="#059669" fontSize="8" fontWeight="500" fontFamily="sans-serif">
              ◀ 6. Response (200 OK)
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Technical Insight Tag */}
      <div className="px-5 pb-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-black/[0.05] pt-2">
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Protocol:</span>
          <span className="text-zinc-800 font-medium">OAuth2 / Stateless JWT (RS256)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Authorization:</span>
          <span className="text-emerald-700 font-medium">Bearer Token in HTTP Header</span>
        </span>
      </div>
    </div>
  );
}
