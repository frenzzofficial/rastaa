"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { MoodKey } from "@/packages/configs/data.config";

type MoodContextValue = {
  activeMood: MoodKey;
  setActiveMood: (mood: MoodKey) => void;
};

const MoodContext = createContext<MoodContextValue | null>(null);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [activeMood, setActiveMood] = useState<MoodKey>("all");
  return (
    <MoodContext.Provider value={{ activeMood, setActiveMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within a MoodProvider");
  return ctx;
}
