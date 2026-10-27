"use client";

import { useEffect, useRef, useState } from "react";
import SectionBadge from "./SectionBadge";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    title: "Phishing Detection System",
    subtitle: "High-volume malicious URL detection and threat mitigation platform",
    description:
      "A high-volume phishing detection system designed to identify potentially malicious URLs and help protect individuals and financial institutions from phishing attacks, data theft, and financial loss.",
    features: [
      "Implemented a producer and consumer architecture with batching and scalable consumers to process high volumes of incoming records.",
      "Improved system stability during peak workloads and supported processing of over one million records per day.",
      "Used monitoring and load testing to evaluate throughput, latency, and reliability.",
    ],
    tech: [
      "Python",
      "Apache Kafka",
      "AWS Lambda",
      "Amazon S3",
      "MariaDB",
      "AI/ML",
      "Amazon EKS",
      "GitHub",
    ],
    metrics: [
      { label: "Throughput", value: "1M+ Records/day" },
      { label: "Architecture", value: "Kafka Event-Driven" },
      { label: "Deployment", value: "AWS EKS & Lambda" },
    ],
    color: "rgba(6, 182, 212, 0.15)",
  },

  {
    title: "Data Extraction System",
    subtitle: "Automated file parsing, ISP/telecom enrichment, and threat intelligence pipeline",
    description:
      "A data extraction and enrichment system that processes files, extracts relevant information, and enriches the data using third-party APIs to identify ISP and telecommunications provider information. The enriched data is persisted for threat analysis and integrated with Splunk for visualization and analysis.",
    features: [
      "Developed multiple AWS Lambda functions to extract, enrich, and persist data.",
      "Improved data extraction by using regular expressions to identify and extract relevant information from files.",
      "Implemented monitoring and alerts to detect data processing failures.",
    ],
    tech: [
      "Python",
      "Amazon S3",
      "AWS Lambda",
      "Amazon DynamoDB",
      "Splunk",
      "Third-Party APIs",
    ],
    metrics: [
      { label: "Storage", value: "DynamoDB & S3" },
      { label: "Analytics", value: "Splunk Integration" },
      { label: "Compute", value: "AWS Lambda Serverless" },
    ],
    color: "rgba(139, 92, 246, 0.15)",
  },

  {
    title: "Phishing Threat Intelligence Search API",
    subtitle: "Serverless threat intelligence search, file metadata indexing, and pagination",
    description:
      "A serverless API built with AWS Lambda to search and retrieve threat intelligence data from PostgreSQL and Elasticsearch. Supports filtering by file and malware-related identifiers, retrieving metadata such as file hashes, filenames, file types, and timestamps, and returning paginated results through a structured JSON response.",
    features: [
      "Developed AWS Lambda API endpoints to query threat intelligence data from PostgreSQL and Elasticsearch.",
      "Implemented filtering and pagination to support efficient retrieval of file and malware-related metadata.",
      "Validated request parameters and implemented error handling for invalid queries and database failures.",
      "Returned structured JSON responses containing search results, record counts, and pagination information.",
    ],
    tech: [
      "Python",
      "Amazon S3",
      "AWS Lambda",
      "Amazon API Gateway",
      "Redis",
      "PostgreSQL",
      "Elasticsearch",
      "GitLab",
    ],
    metrics: [
      { label: "Search Engine", value: "Elasticsearch" },
      { label: "Database", value: "PostgreSQL & Redis" },
      { label: "API Gateway", value: "AWS Lambda Serverless" },
    ],
    color: "rgba(96, 165, 250, 0.15)",
  },

  {
    title: "Online Education Platform",
    subtitle: "AI-powered LMS with virtual classrooms, student information & administrative automation",
    description:
      "An AI-powered education and learning management platform integrating online classrooms, student information management, live video classes, and administrative automation.",
    features: [
      "Developed REST APIs for student enrollment, course management, assignments, and file management.",
      "Collaborated with cross-functional engineering teams to integrate platform components and deliver additional system functionality.",
      "Integrated Amazon Cognito for secure authentication and Amazon S3 for cloud educational content storage.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Amazon Cognito",
      "Amazon S3",
      "MongoDB",
      "Jenkins",
      "SonarQube",
    ],
    metrics: [
      { label: "Backend", value: "Java & Spring Boot" },
      { label: "Auth & Identity", value: "Amazon Cognito" },
      { label: "Code Quality", value: "SonarQube & CI/CD" },
    ],
    color: "rgba(99, 102, 241, 0.15)",
  },

  {
    title: "Online AI Course Enrollment and Payment Platform",
    subtitle: "Multi-gateway digital course enrollment and secure payment system",
    description:
      "An online learning platform that publishes AI training courses for individuals from non-technical backgrounds, allowing learners to enroll in courses and pay online through multiple payment gateways available in Nepal.",
    features: [
      "Developed REST APIs for course management and learner enrollment.",
      "Integrated multiple payment gateways to enable online course payments.",
      "Implemented PDF payment receipt generation for successful transactions.",
      "Collaborated with frontend developers to integrate backend APIs with the user interface.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Auth0",
      "Amazon S3",
      "MongoDB",
      "Amazon EC2",
      "Jenkins",
      "GitHub",
    ],
    metrics: [
      { label: "Backend", value: "Java & Spring Boot" },
      { label: "Security & Auth", value: "Auth0 & Spring Sec" },
      { label: "Storage", value: "MongoDB & Amazon S3" },
    ],
    color: "rgba(52, 211, 153, 0.15)",
  },

  {
    title: "Truckload Marketplace Platform",
    subtitle: "Freight transportation coordination marketplace with real-time bidding & Stripe",
    description:
      "A logistics marketplace that connects shippers, brokers, and truckers, enabling users to discover available loads and coordinate freight transportation through an online platform.",
    features: [
      "Developed backend APIs to support load listings and marketplace functionality.",
      "Contributed to payment processing integration using Stripe.",
      "Collaborated with mobile app developers to integrate backend APIs with the mobile applications.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Auth0",
      "Amazon S3",
      "MongoDB",
      "Amazon EC2",
      "Stripe",
      "Redis",
      "GitHub",
    ],
    metrics: [
      { label: "Domain", value: "Logistics Marketplace" },
      { label: "Payments", value: "Stripe Processing" },
      { label: "Storage", value: "MongoDB & Redis" },
    ],
    color: "rgba(251, 146, 60, 0.15)",
  },

  {
    title: "Mobile Financial Services Platform",
    subtitle: "Interoperable branchless banking, electronic voucher transfers, and Android app",
    description:
      "An interoperable mobile financial services and branchless banking platform. The system connected multiple banks to facilitate mobile-based financial transactions, electronic voucher transfers, and financial services.",
    features: [
      "Contributed to the development and maintenance of core backend application functionality.",
      "Developed desktop GUI functionality to process refunds for failed transactions.",
      "Developed an Android application supporting wallet-to-wallet transfers, wallet-to-bank transfers, bank-to-wallet deposits, utility bill payments, and other digital financial services.",
    ],
    tech: [
      "Java",
      "Spring Framework",
      "Hibernate",
      "Oracle Database",
      "JAX-WS",
      "Android",
      "TortoiseSVN",
    ],
    metrics: [
      { label: "Domain", value: "Branchless Banking" },
      { label: "Database", value: "Oracle & Hibernate" },
      { label: "Platforms", value: "Web & Android" },
    ],
    color: "rgba(244, 114, 182, 0.15)",
  },
];

export default function ProjectsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <div ref={ref} className="section-container">
        {/* Section Header */}
        <div
          style={{
            marginBottom: 80,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionBadge label="Featured Work" />
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Notable{" "}
            <span style={{ color: "var(--text-heading)", fontStyle: "italic" }}>Projects</span>
          </h2>
          <p
            style={{
              maxWidth: 600,
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            A selection of systems I&apos;ve designed and built — each solving
            real-world challenges at scale.
          </p>
        </div>

        {/* Divider */}
        <div
          className="editorial-divider"
          style={{
            marginBottom: 0,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        />

        {/* Projects — Editorial Case Study Layout */}
        <div>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              style={{
                borderBottom: i < PROJECTS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                paddingTop: 64,
                paddingBottom: 64,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s`,
              }}
            >
              {/* Project number + Title */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 40,
                }}
                className="lg:!grid-cols-[1fr_1.2fr]"
              >
                {/* Left: Title & Meta */}
                <div>
                  {/* Project Index Pill & Accent Dot */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      height: 32,
                      padding: "0 14px",
                      borderRadius: "9999px",
                      border: "1px solid var(--border-default)",
                      background: "#ffffff",
                      boxSizing: "border-box",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: project.color.replace("0.15", "0.9"),
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      0{i + 1} / Case Study
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "var(--text-heading)",
                      marginBottom: 10,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      marginBottom: 28,
                    }}
                  >
                    {project.subtitle}
                  </p>

                  {/* Metrics */}
                  <div
                    style={{
                      display: "flex",
                      gap: 32,
                      flexWrap: "wrap",
                    }}
                  >
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 400,
                            letterSpacing: "-0.01em",
                            color: "var(--text-heading)",
                            lineHeight: 1.2,
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                            marginTop: 4,
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Description, Features, Tech */}
                <div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                      marginBottom: 28,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Features */}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 28 }}>
                    {project.features.map((f, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                          paddingTop: 8,
                          paddingBottom: 8,
                          borderBottom: j < project.features.length - 1 ? "1px solid var(--border-subtle)" : "none",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            marginTop: 7,
                            width: 4,
                            height: 4,
                            background: "var(--text-heading)",
                            display: "block",
                          }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="skill-tag"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
