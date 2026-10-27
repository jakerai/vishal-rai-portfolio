import ExperienceSection from "../components/ExperienceSection";
import SectionAdvanceBar from "../components/SectionAdvanceBar";

export const metadata = {
  title: "Career Experience | Vishal Rai — Senior Software Engineer",
  description:
    "10+ years career journey building enterprise platforms, financial processing systems, and scalable SaaS solutions.",
};

export default function ExperiencePage() {
  return (
    <>
      <ExperienceSection />
      <SectionAdvanceBar nextHref="/projects" nextLabel="Featured Projects" />
    </>
  );
}
