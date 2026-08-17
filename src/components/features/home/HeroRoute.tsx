"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  forwardRef,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);
}

export type HeroRouteHandle = {
  /** Draws the route in and glides the marker to its resting point. Returns the tween so callers can slot it into a parent timeline. */
  intro: () => gsap.core.Timeline;
  /** Brief glow/scale pulse on the marker — used when a mood is hovered. */
  pulse: () => void;
};

type HeroRouteProps = {
  /** Section this route should scrub against while scrolling. */
  scrollTriggerRef: RefObject<HTMLElement | null>;
};

const ROUTE_PATH =
  "M -40 150 C 160 40, 340 260, 560 120 S 900 40, 1180 170";

const HeroRoute = forwardRef<HeroRouteHandle, HeroRouteProps>(
  ({ scrollTriggerRef }, ref) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const markerRef = useRef<SVGGElement | null>(null);
    const ringRef = useRef<SVGCircleElement | null>(null);

    useImperativeHandle(ref, () => ({
      intro() {
        const tl = gsap.timeline();
        const path = pathRef.current;
        const marker = markerRef.current;
        if (!path || !marker) return tl;

        tl.set(marker, { autoAlpha: 0, transformOrigin: "50% 50%" })
          .fromTo(
            path,
            { drawSVG: "0%" },
            { drawSVG: "0% 100%", duration: 1.7, ease: "power2.inOut" },
            0.15,
          )
          .to(marker, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, 0.3)
          .to(
            marker,
            {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 0.16,
              },
              duration: 1.7,
              ease: "power2.inOut",
            },
            0.15,
          );

        return tl;
      },
      pulse() {
        const marker = markerRef.current;
        const ringEl = ringRef.current;
        if (!marker || !ringEl) return;
        gsap.fromTo(
          marker,
          { scale: 1 },
          { scale: 1.35, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 1 },
        );
        gsap.fromTo(
          ringEl,
          { attr: { r: 6 }, opacity: 0.6 },
          { attr: { r: 20 }, opacity: 0, duration: 0.9, ease: "power2.out" },
        );
      },
    }));

    useEffect(() => {
      const path = pathRef.current;
      const marker = markerRef.current;
      const trigger = scrollTriggerRef.current;
      if (!path || !marker || !trigger) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTween = gsap.to(marker, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: 0.16,
            end: 0.94,
          },
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      });

      return () => mm.revert();
    }, [scrollTriggerRef]);

    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55]"
        viewBox="0 0 1140 320"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--zinc-700)"
          strokeWidth="1.5"
          strokeDasharray="1 9"
          strokeLinecap="round"
        />
        <g ref={markerRef}>
          <circle
            ref={ringRef}
            r="6"
            fill="none"
            stroke="var(--ember)"
            strokeWidth="1.5"
            opacity="0"
          />
          <circle r="5" fill="var(--zinc-50)" stroke="var(--ember)" strokeWidth="2" />
          <circle r="1.75" fill="var(--ember)" />
        </g>
      </svg>
    );
  },
);

HeroRoute.displayName = "HeroRoute";

export default HeroRoute;
