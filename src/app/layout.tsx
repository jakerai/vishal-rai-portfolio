import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CursorTrail from "./components/CursorTrail";
import PageTransitionHandler from "./components/PageTransitionHandler";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Rai | Senior Software Engineer",
  description:
    "Senior Software Engineer with 10+ years of experience building scalable backend systems with Java, Spring Boot, Python, microservices, and event-driven architectures.",
  keywords: [
    "Senior Software Engineer",
    "Java Developer",
    "Spring Boot",
    "Python",
    "Microservices",
    "Backend Engineer",
    "System Architecture",
    "REST API",
    "PostgreSQL",
    "MongoDB",
  ],
  openGraph: {
    title: "Vishal Rai | Senior Software Engineer",
    description:
      "10+ years building scalable, reliable backend systems. Expertise in Java, Spring Boot, Python, microservices & event-driven architectures.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <CursorTrail />
        <Navbar />
        <main className="flex-1">
          <PageTransitionHandler>{children}</PageTransitionHandler>
        </main>
      </body>
    </html>
  );
}
