"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * useMagnetic — attaches a subtle magnetic pull toward the cursor on the
 * returned ref. Disabled on touch devices and when the user prefers
 * reduced motion (mirrors the guard used by the hero's motion timeline).
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((event.clientX - rect.left - rect.width / 2) * strength);
        yTo((event.clientY - rect.top - rect.height / 2) * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return ref;
}
