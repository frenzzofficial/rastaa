"use client";

import { type MouseEvent, type RefObject, useCallback, useRef } from "react";

type SpotlightRef<T extends HTMLElement> = RefObject<T | null>;

type SpotlightHandler<T extends HTMLElement> = (event: MouseEvent<T>) => void;

export const useSpotlight = <T extends HTMLElement>(): [
  SpotlightRef<T>,
  SpotlightHandler<T>,
] => {
  const ref = useRef<T | null>(null);

  const handleMouseMove = useCallback((event: MouseEvent<T>) => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();

    element.style.setProperty("--x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }, []);

  return [ref, handleMouseMove];
};
