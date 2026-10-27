import HeroSection from "./components/HeroSection";
import SectionAdvanceBar from "./components/SectionAdvanceBar";

export const metadata = {
  title: "Vishal Rai | Senior Software Engineer",
  description:
    "Senior Software Engineer with 10+ years of experience building scalable backend systems with Java, Spring Boot, Python, microservices, and event-driven architectures.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionAdvanceBar nextHref="/about" nextLabel="About Me" />
    </>
  );
}
