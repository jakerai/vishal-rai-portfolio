import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";

export const metadata = {
  title: "Featured Projects | Vishal Rai — Senior Software Engineer",
  description:
    "Production-grade backend systems, threat detection platforms, logistics APIs, and high-throughput Kafka processing architectures.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsSection />
      <Footer />
    </>
  );
}
