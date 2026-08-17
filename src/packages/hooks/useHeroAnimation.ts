"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { HeroRouteHandle } from "@/components/features/home/HeroRoute";


interface UseHeroAnimationOptions {
  sectionRef: React.RefObject<HTMLElement | null>;
}

interface UseHeroAnimationReturn {
  glowRef: React.RefObject<HTMLDivElement | null>;
  eyebrowRef: React.RefObject<HTMLDivElement | null>;
  lineRefs: React.MutableRefObject<Array<HTMLSpanElement | null>>;
  underlineRef: React.RefObject<HTMLSpanElement | null>;
  promptRef: React.RefObject<HTMLParagraphElement | null>;
  moodWrapRef: React.RefObject<HTMLDivElement | null>;
  routeRef: React.RefObject<HeroRouteHandle | null>;
}

export const useHeroAnimation = ({
  sectionRef,
}: UseHeroAnimationOptions): UseHeroAnimationReturn => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const promptRef = useRef<HTMLParagraphElement | null>(null);
  const moodWrapRef = useRef<HTMLDivElement | null>(null);
  const routeRef = useRef<HeroRouteHandle | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "expo.out",
          },
        });

        if (routeRef.current) {
          timeline.add(routeRef.current.intro(), 0);
        }

        timeline
          .fromTo(
            eyebrowRef.current,
            {
              autoAlpha: 0,
              y: 10,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
            },
            0.1,
          )
          .fromTo(
            lineRefs.current,
            {
              yPercent: 130,
              rotateX: -40,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              rotateX: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.12,
            },
            0.3,
          )
          .fromTo(
            underlineRef.current,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3",
          )
          .fromTo(
            promptRef.current,
            {
              autoAlpha: 0,
              y: 10,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.45",
          )
          .fromTo(
            moodWrapRef.current?.querySelectorAll(".mood-btn") ?? [],
            {
              autoAlpha: 0,
              y: 16,
              scale: 0.92,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "back.out(1.6)",
            },
            "-=0.35",
          );

        if (!glow) return;

        const position = {
          x: 0,
          y: 0,
        };

        const setX = gsap.quickTo(position, "x", {
          duration: 0.5,
          ease: "power3",
          onUpdate: () => {
            glow.style.setProperty("--x", `${position.x}px`);
          },
        });

        const setY = gsap.quickTo(position, "y", {
          duration: 0.5,
          ease: "power3",
          onUpdate: () => {
            glow.style.setProperty("--y", `${position.y}px`);
          },
        });

        const handleMouseMove = (event: MouseEvent) => {
          const rect = section.getBoundingClientRect();

          setX(event.clientX - rect.left);
          setY(event.clientY - rect.top);
        };

        const handleMouseEnter = () => {
          gsap.to(glow, {
            opacity: 1,
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.4,
          });
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseenter", handleMouseEnter);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseenter", handleMouseEnter);
          section.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            eyebrowRef.current,
            ...lineRefs.current,
            promptRef.current,
          ],
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            rotateX: 0,
          },
        );

        gsap.set(
          moodWrapRef.current?.querySelectorAll(".mood-btn") ?? [],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          },
        );

        gsap.set(underlineRef.current, {
          scaleX: 1,
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);

  return {
    glowRef,
    eyebrowRef,
    lineRefs,
    underlineRef,
    promptRef,
    moodWrapRef,
    routeRef,
  };
};
