"use client";

import { siteConfig } from "@/packages/configs/data.config";
import { useMood } from "@/packages/hooks/useMood";

const MoodFilter = () => {
  const { moods } = siteConfig;
  const { activeMood, setActiveMood } = useMood();

  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((mood) => {
        const isActive = activeMood === mood.key;
        return (
          <button
            key={mood.key}
            type="button"
            onClick={() => setActiveMood(mood.key)}
            className={[
              "inline-flex items-center gap-2.5 rounded-full border px-[22px] py-3.5 text-sm font-semibold transition-transform duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-[3px]",
              isActive
                ? "border-[var(--zinc-950)] bg-[var(--zinc-950)] text-white"
                : "border-[var(--zinc-700)] bg-white text-[var(--zinc-950)] hover:border-[var(--zinc-950)]",
            ].join(" ")}
          >
            <span className="font-mono-brand text-[11px] text-[var(--ember)]">
              {mood.index}
            </span>
            {mood.label}
          </button>
        );
      })}
    </div>
  );
};

export default MoodFilter;
