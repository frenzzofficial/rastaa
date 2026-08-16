"use client";

import { useEffect, useRef } from "react";

/**
 * useReveal — attaches an IntersectionObserver to the returned ref and adds
 * `.in-view` (paired with the `.reveal` class in globals.css) once the
 * element scrolls into view. Unobserves after the first trigger.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
