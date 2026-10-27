import SkillsSection from "../components/SkillsSection";
import SectionAdvanceBar from "../components/SectionAdvanceBar";

export const metadata = {
  title: "Technical Skills | Vishal Rai — Senior Software Engineer",
  description:
    "Explore the technical stack, languages, databases, and architectural frameworks mastered by Vishal Rai over 10+ years.",
};

export default function SkillsPage() {
  return (
    <>
      <SkillsSection />
      <SectionAdvanceBar nextHref="/experience" nextLabel="Career Experience" />
    </>
  );
}
