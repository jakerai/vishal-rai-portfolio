import AboutSection from "../components/AboutSection";
import SectionAdvanceBar from "../components/SectionAdvanceBar";

export const metadata = {
  title: "About Me | Vishal Rai — Senior Software Engineer",
  description:
    "Engineering philosophy, background, and career highlights of Vishal Rai, Senior Backend & Systems Engineer.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <SectionAdvanceBar nextHref="/skills" nextLabel="Technical Skills" />
    </>
  );
}
