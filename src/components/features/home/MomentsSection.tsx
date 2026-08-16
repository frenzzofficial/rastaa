"use client";
import MomentCard from "@/components/ui/card/MomentCard";
import { siteConfig } from "@/packages/configs/data.config";
import { useMood } from "@/packages/hooks/useMood";
import { useReveal } from "@/packages/hooks/useReveal";
import SectionHead from "./SectionHead";

const MomentsSection = () => {
  const { moments, sections } = siteConfig;
  const { activeMood } = useMood();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="moments"
      className="mx-auto max-w-[1440px] px-5 py-24 sm:px-14"
    >
      <SectionHead
        lines={sections.momentsHeading}
        subtext={sections.momentsSubtext}
      />

      <div
        ref={gridRef}
        className="reveal grid grid-cols-1 gap-px border border-[var(--zinc-700)] bg-[var(--zinc-700)] sm:grid-cols-3"
      >
        {moments.map((moment) => (
          <div
            key={moment.id}
            className={moment.size === "lg" ? "sm:col-span-1" : ""}
          >
            <MomentCard
              moment={moment}
              hidden={activeMood !== "all" && moment.mood !== activeMood}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MomentsSection;
