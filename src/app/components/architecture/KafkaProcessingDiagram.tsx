"use client";

import { useEffect, useState } from "react";

export default function KafkaProcessingDiagram() {
  const [metricCount, setMetricCount] = useState<number>(34820);
  const [throughput, setThroughput] = useState<number>(1420);

  useEffect(() => {
    const timer = setInterval(() => {
      setMetricCount((c) => c + Math.floor(Math.random() * 25) + 15);
      setThroughput(1400 + Math.floor(Math.sin(Date.now() / 1000) * 150));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full select-none flex flex-col justify-between bg-white">
      {/* Visual Live Stream Header */}
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] border-b border-black/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
          <span className="text-zinc-800 font-medium">
            High-Throughput Partitioned Ingestion &amp; Concurrent Stream Workers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-[10px]">Topology:</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 font-medium">
            Distributed Partitions (RF: 3)
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
              id="arrow-cyan"
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
              id="arrow-green"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
            </marker>

            <filter id="kafka-card-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.04" />
            </filter>
          </defs>

          {/* PATHS: Devices -> Ingestion Gateway */}
          <path d="M 85 45 L 140 100" stroke="#0891b2" strokeWidth="1.4" strokeOpacity="0.5" markerEnd="url(#arrow-cyan)" />
          <path d="M 85 115 L 140 115" stroke="#059669" strokeWidth="1.4" strokeOpacity="0.5" markerEnd="url(#arrow-cyan)" />
          <path d="M 85 185 L 140 130" stroke="#d97706" strokeWidth="1.4" strokeOpacity="0.5" markerEnd="url(#arrow-cyan)" />

          {/* PATHS: Ingestion -> Kafka Partitions */}
          <path d="M 215 105 L 255 55" stroke="#0891b2" strokeWidth="1.6" strokeOpacity="0.7" markerEnd="url(#arrow-cyan)" />
          <path d="M 215 115 L 255 115" stroke="#059669" strokeWidth="1.6" strokeOpacity="0.7" markerEnd="url(#arrow-cyan)" />
          <path d="M 215 125 L 255 175" stroke="#d97706" strokeWidth="1.6" strokeOpacity="0.7" markerEnd="url(#arrow-cyan)" />

          {/* PATHS: Kafka Partitions -> Parallel Workers */}
          <path d="M 335 55 L 365 55" stroke="#0891b2" strokeWidth="1.6" strokeOpacity="0.8" markerEnd="url(#arrow-cyan)" />
          <path d="M 335 115 L 365 115" stroke="#059669" strokeWidth="1.6" strokeOpacity="0.8" markerEnd="url(#arrow-green)" />
          <path d="M 335 175 L 365 175" stroke="#d97706" strokeWidth="1.6" strokeOpacity="0.8" markerEnd="url(#arrow-cyan)" />

          {/* PATHS: Workers -> Aggregation */}
          <path d="M 445 55 L 475 95" stroke="#0891b2" strokeWidth="1.4" strokeOpacity="0.6" markerEnd="url(#arrow-cyan)" />
          <path d="M 445 115 L 475 115" stroke="#059669" strokeWidth="1.4" strokeOpacity="0.6" markerEnd="url(#arrow-green)" />
          <path d="M 445 175 L 475 135" stroke="#d97706" strokeWidth="1.4" strokeOpacity="0.6" markerEnd="url(#arrow-cyan)" />

          {/* PATHS: Aggregation -> DB & Dashboard */}
          <path d="M 535 90 L 535 55" stroke="#0891b2" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#arrow-cyan)" />
          <path d="M 535 140 L 535 185" stroke="#059669" strokeWidth="1.6" markerEnd="url(#arrow-green)" />

          {/* CONCURRENT ANIMATED PACKETS */}
          <circle r="4" fill="#0891b2">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 85 45 L 140 100" />
          </circle>
          <circle r="4" fill="#0891b2">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M 215 105 L 255 55" />
          </circle>
          <circle r="4" fill="#0891b2">
            <animateMotion dur="0.9s" repeatCount="indefinite" path="M 335 55 L 365 55" />
          </circle>

          <circle r="4" fill="#059669">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M 85 115 L 140 115" />
          </circle>
          <circle r="4" fill="#059669">
            <animateMotion dur="1.1s" repeatCount="indefinite" path="M 215 115 L 255 115" />
          </circle>
          <circle r="4" fill="#059669">
            <animateMotion dur="0.9s" repeatCount="indefinite" path="M 335 115 L 365 115" />
          </circle>

          <circle r="4" fill="#d97706">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 85 185 L 140 130" />
          </circle>
          <circle r="4" fill="#d97706">
            <animateMotion dur="1.3s" repeatCount="indefinite" path="M 215 125 L 255 175" />
          </circle>
          <circle r="4" fill="#d97706">
            <animateMotion dur="0.9s" repeatCount="indefinite" path="M 335 175 L 365 175" />
          </circle>

          <circle r="4.5" fill="#059669">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M 535 140 L 535 185" />
          </circle>

          {/* ─── NODES: IOT DEVICES (Left Column) ─── */}
          <g transform="translate(10, 25)" filter="url(#kafka-card-shadow)">
            <rect width="75" height="40" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.2" />
            <text x="8" y="17" fill="#0e7490" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Smart Meter A</text>
            <text x="8" y="30" fill="#71717a" fontSize="7.5" fontFamily="sans-serif">Telemetry Node</text>
          </g>

          <g transform="translate(10, 95)" filter="url(#kafka-card-shadow)">
            <rect width="75" height="40" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.2" />
            <text x="8" y="17" fill="#047857" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Sensor Fleet B</text>
            <text x="8" y="30" fill="#71717a" fontSize="7.5" fontFamily="sans-serif">IoT Gateway</text>
          </g>

          <g transform="translate(10, 165)" filter="url(#kafka-card-shadow)">
            <rect width="75" height="40" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
            <text x="8" y="17" fill="#b45309" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Edge Node C</text>
            <text x="8" y="30" fill="#71717a" fontSize="7.5" fontFamily="sans-serif">Real-time Stream</text>
          </g>

          {/* ─── NODE: INGESTION API ─── */}
          <g transform="translate(140, 85)" filter="url(#kafka-card-shadow)">
            <rect width="75" height="60" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.5" />
            <text x="8" y="20" fill="#0891b2" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Ingestion API</text>
            <text x="8" y="34" fill="#18181b" fontSize="8" fontWeight="500" fontFamily="sans-serif">FastAPI / Netty</text>
            <text x="8" y="48" fill="#71717a" fontSize="7" fontFamily="sans-serif">Partition Router</text>
          </g>

          {/* ─── NODE: KAFKA TOPIC & PARTITIONS ─── */}
          <g transform="translate(255, 30)" filter="url(#kafka-card-shadow)">
            <rect width="80" height="175" rx="6" fill="#f8fafc" stroke="#0891b2" strokeWidth="1.5" />
            <text x="8" y="16" fill="#0e7490" fontSize="8" fontWeight="600" fontFamily="sans-serif">Kafka Topic</text>
            <text x="8" y="26" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Distributed Log</text>

            {/* Partition 0 */}
            <rect x="6" y="34" width="68" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="10" y="47" fill="#0e7490" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Partition 0</text>
            <text x="10" y="60" fill="#64748b" fontSize="6.5" fontFamily="sans-serif">Active Stream</text>

            {/* Partition 1 */}
            <rect x="6" y="78" width="68" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="10" y="91" fill="#047857" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Partition 1</text>
            <text x="10" y="104" fill="#64748b" fontSize="6.5" fontFamily="sans-serif">Active Stream</text>

            {/* Partition 2 */}
            <rect x="6" y="122" width="68" height="36" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <text x="10" y="135" fill="#b45309" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Partition 2</text>
            <text x="10" y="148" fill="#64748b" fontSize="6.5" fontFamily="sans-serif">Active Stream</text>
          </g>

          {/* ─── NODE: PARALLEL CONSUMERS ─── */}
          <g transform="translate(365, 38)" filter="url(#kafka-card-shadow)">
            <rect width="80" height="34" rx="6" fill="#ffffff" stroke="#0891b2" strokeWidth="1.2" />
            <text x="7" y="15" fill="#0e7490" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Consumer 1</text>
            <text x="7" y="27" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Partition 0 Worker</text>
          </g>

          <g transform="translate(365, 98)" filter="url(#kafka-card-shadow)">
            <rect width="80" height="34" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.2" />
            <text x="7" y="15" fill="#047857" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Consumer 2</text>
            <text x="7" y="27" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Partition 1 Worker</text>
          </g>

          <g transform="translate(365, 158)" filter="url(#kafka-card-shadow)">
            <rect width="80" height="34" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
            <text x="7" y="15" fill="#b45309" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Consumer 3</text>
            <text x="7" y="27" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Partition 2 Worker</text>
          </g>

          {/* ─── NODE: TRANSFORMATION & AGGREGATION ─── */}
          <g transform="translate(475, 90)" filter="url(#kafka-card-shadow)">
            <rect width="85" height="50" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            <text x="8" y="17" fill="#059669" fontSize="8" fontWeight="600" fontFamily="sans-serif">Aggregation</text>
            <text x="8" y="30" fill="#18181b" fontSize="7.5" fontWeight="500" fontFamily="sans-serif">Flink Streaming</text>
            <text x="8" y="42" fill="#71717a" fontSize="6.5" fontFamily="sans-serif">Windowed Metrics</text>
          </g>

          {/* ─── NODE: DATABASE / CACHE ─── */}
          <g transform="translate(480, 15)" filter="url(#kafka-card-shadow)">
            <rect width="105" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="8" y="16" fill="#18181b" fontSize="8" fontWeight="600" fontFamily="sans-serif">Timescale &amp; Redis</text>
            <text x="8" y="30" fill="#71717a" fontSize="7" fontFamily="sans-serif">Time-Series &amp; Cache</text>
          </g>

          {/* ─── NODE: USER DASHBOARD ─── */}
          <g transform="translate(470, 185)" filter="url(#kafka-card-shadow)">
            <rect width="120" height="75" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            <circle cx="12" cy="14" r="3.5" fill="#059669" className="animate-pulse" />
            <text x="20" y="17" fill="#065f46" fontSize="8" fontWeight="600" fontFamily="sans-serif">Live Dashboard</text>
            <text x="10" y="34" fill="#71717a" fontSize="7" fontFamily="sans-serif">Processed Events</text>
            <text x="10" y="47" fill="#18181b" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">
              {metricCount.toLocaleString()}
            </text>
            <text x="10" y="60" fill="#71717a" fontSize="7" fontFamily="sans-serif">Throughput:</text>
            <text x="65" y="60" fill="#0891b2" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">
              {throughput}/sec
            </text>
            <text x="10" y="70" fill="#059669" fontSize="7" fontWeight="500" fontFamily="sans-serif">
              Latency: 1.8ms
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="px-5 pb-2.5 flex items-center justify-between text-[11px] text-zinc-500 border-t border-black/[0.05] pt-2">
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Stream Processing:</span>
          <span className="text-cyan-800 font-medium">IoT Ingest → Kafka → Parallel Consumers → Flink</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-zinc-400">Guarantee:</span>
          <span className="text-emerald-700 font-medium">At-Least-Once Delivery</span>
        </span>
      </div>
    </div>
  );
}
