import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import VolunteerPortalPreview from "@/components/VolunteerPortalPreview";
import SkillsSection from "@/components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <DemoSection />
      <VolunteerPortalPreview />
      <SkillsSection />
    </>
  );
}
