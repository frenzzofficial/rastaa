"use client";

import { siteConfig } from "@/packages/configs/data.config";
import { useMagnetic } from "@/packages/hooks/useMagnetic";
import { useMood } from "@/packages/hooks/useMood";

type MoodButtonProps = {
  index: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
  onHoverChange: (hovering: boolean) => void;
};

const MoodButton = ({
  index,
  label,
  isActive,
  onSelect,
  onHoverChange,
}: MoodButtonProps) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.3);

  return (
    <button
      ref={magneticRef}
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={[
        "mood-btn inline-flex items-center gap-2.5 rounded-full border px-5.5 py-3.5 text-sm font-semibold transition-colors duration-200",
        isActive
          ? "border-(--zinc-950) bg-(--zinc-950) text-white"
          : "border-(--zinc-700) bg-white text-(--zinc-950) hover:border-(--zinc-950)",
      ].join(" ")}
    >
      <span className="font-mono-brand text-[11px] text-(--ember)">
        {index}
      </span>
      {label}
    </button>
  );
};

type MoodFilterProps = {
  /** Fired when a mood button is hovered/unhovered — lets the hero pulse its route marker. */
  onMoodHoverChange?: (hovering: boolean) => void;
};

const MoodFilter = ({ onMoodHoverChange }: MoodFilterProps) => {
  const { moods } = siteConfig;
  const { activeMood, setActiveMood } = useMood();

  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((mood) => (
        <MoodButton
          key={mood.key}
          index={mood.index}
          label={mood.label}
          isActive={activeMood === mood.key}
          onSelect={() => setActiveMood(mood.key)}
          onHoverChange={(hovering) => onMoodHoverChange?.(hovering)}
        />
      ))}
    </div>
  );
};

export default MoodFilter;
