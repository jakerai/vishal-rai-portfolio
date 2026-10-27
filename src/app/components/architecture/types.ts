export interface ArchitectureSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const ARCHITECTURE_SLIDES: ArchitectureSlide[] = [
  {
    id: "jwt-auth",
    number: "01",
    title: "JWT Authentication & Authorization",
    subtitle: "End-to-End Stateless Auth & Protected Resource Access",
    category: "Security & Identity",
    tags: ["OAuth2 / JWT", "RS256 Signing", "Bearer Token", "Stateless"],
    accentColor: "#059669", // Deep Emerald
    badgeBg: "rgba(5, 150, 105, 0.08)",
    badgeText: "#047857",
    badgeBorder: "rgba(5, 150, 105, 0.25)",
  },
  {
    id: "kafka-iot",
    number: "02",
    title: "Kafka Event-Driven Processing",
    subtitle: "High-Throughput IoT Ingestion & Parallel Stream Workers",
    category: "Distributed Streaming",
    tags: ["Apache Kafka", "Parallel Workers", "Time-Series DB", "Live Telemetry"],
    accentColor: "#0891b2", // Cyan / Teal
    badgeBg: "rgba(8, 145, 178, 0.08)",
    badgeText: "#0e7490",
    badgeBorder: "rgba(8, 145, 178, 0.25)",
  },
  {
    id: "scalability",
    number: "03",
    title: "Frontend & Backend Auto-Scalability",
    subtitle: "Edge CDN Caching & Dynamic Horizontal Pod Autoscaling",
    category: "Cloud Infrastructure",
    tags: ["Anycast CDN", "Load Balancer", "HPA Auto-Scale", "Read Replicas"],
    accentColor: "#2563eb", // Royal Blue
    badgeBg: "rgba(37, 99, 235, 0.08)",
    badgeText: "#1d4ed8",
    badgeBorder: "rgba(37, 99, 235, 0.25)",
  },
  {
    id: "microservices",
    number: "04",
    title: "Microservices & Event Mesh",
    subtitle: "Decoupled Domain Services & Async Event-Driven Pub/Sub",
    category: "Service Architecture",
    tags: ["API Gateway", "Database-per-Service", "RabbitMQ / Kafka", "Domain Isolation"],
    accentColor: "#d97706", // Warm Amber
    badgeBg: "rgba(217, 119, 6, 0.08)",
    badgeText: "#b45309",
    badgeBorder: "rgba(217, 119, 6, 0.25)",
  },
  {
    id: "payment-idempotency",
    number: "05",
    title: "Payment Idempotency & Deduplication",
    subtitle: "Atomic Distributed Lock, Key Verification & Duplicate Prevention",
    category: "Fintech & Reliability",
    tags: ["Idempotency-Key", "Distributed Lock", "Redis SETNX", "Zero Double-Debit"],
    accentColor: "#7c3aed", // Deep Violet
    badgeBg: "rgba(124, 58, 237, 0.08)",
    badgeText: "#6d28d9",
    badgeBorder: "rgba(124, 58, 237, 0.25)",
  },
];
