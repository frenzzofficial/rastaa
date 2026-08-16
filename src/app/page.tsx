import Hero from "@/components/features/home/Hero";
import MemoryWall from "@/components/features/home/MemoryWall";
import MomentsSection from "@/components/features/home/MomentsSection";
import PlannerSection from "@/components/features/home/PlannerSection";
import Marquee from "@/components/ui/marquee/Marquee";
import { siteConfig } from "@/packages/configs/data.config";
import { MoodProvider } from "@/packages/hooks/useMood";

export default function Home() {
  return (
    <>
      <MoodProvider>
        <Hero />
        <Marquee SiteConfig={siteConfig} />
        <MomentsSection />
      </MoodProvider>

      <PlannerSection />
      <MemoryWall />
    </>
  );
}
