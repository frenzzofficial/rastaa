"use client";
import { useRef } from "react";
import { siteConfig } from "@/packages/configs/data.config";
import "@/styles/ui/hero.css";

import { useHeroAnimation } from "@/packages/hooks/useHeroAnimation";
import HeroRoute from "./HeroRoute";
import MoodFilter from "./MoodFilter";

const Hero = () => {
  const { hero } = siteConfig;

  const sectionRef = useRef<HTMLElement | null>(null);

  const {
    glowRef,
    eyebrowRef,
    lineRefs,
    underlineRef,
    promptRef,
    moodWrapRef,
    routeRef,
  } = useHeroAnimation({
    sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center sm:px-14"
    >
      <div
        ref={glowRef}
        className="hero-glow pointer-events-none absolute inset-0 z-0 opacity-0"
      />

      <HeroRoute ref={routeRef} scrollTriggerRef={sectionRef} />

      <div
        ref={eyebrowRef}
        className="relative z-10 mb-6 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.08em] text-(--zinc-400)"
      >
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-(--ember)" />

        {hero.eyebrow}
      </div>

      <h1
        className="relative z-10 mx-auto mb-10 max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        style={{ perspective: "600px" }}
      >
        {hero.headlineLines.map((line, index) => (
          <span key={line} className="hero-line-mask">
            <span
              ref={(element) => {
                lineRefs.current[index] = element;
              }}
              className="relative inline-block"
              style={{
                color:
                  index === hero.accentLineIndex ? "var(--ember)" : undefined,
              }}
            >
              {line}

              {index === hero.accentLineIndex && (
                <span
                  ref={underlineRef}
                  className="hero-accent-underline absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-(--ember)"
                />
              )}
            </span>
          </span>
        ))}
      </h1>

      <p
        ref={promptRef}
        className="relative z-10 mb-4.5 max-w-[38ch] text-sm text-(--zinc-400)"
      >
        {hero.moodPrompt}
      </p>

      <div ref={moodWrapRef} className="relative z-10">
        <MoodFilter
          onMoodHoverChange={(hovering) => {
            if (hovering) {
              routeRef.current?.pulse();
            }
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
