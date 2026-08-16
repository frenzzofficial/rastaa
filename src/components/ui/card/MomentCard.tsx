"use client";

import type { Moment } from "@/packages/configs/data.config";
import { useSpotlight } from "@/packages/hooks/useSpotlight";
import "@/styles/ui/moment-card.css";

type MomentCardProps = {
  moment: Moment;
  hidden: boolean;
};

const MomentCard = ({ moment, hidden }: MomentCardProps) => {
  const [cardRef, handleMouseMove] = useSpotlight<HTMLButtonElement>();

  return (
    <button
      ref={cardRef}
      type="button"
      onMouseMove={handleMouseMove}
      className={[
        "moment-card group relative isolate flex min-h-95 flex-col justify-end overflow-hidden bg-(--zinc-950) p-7 text-left text-white",
        moment.size === "lg" ? "min-h-105" : "",
        hidden ? "hidden" : "flex",
      ].join(" ")}
    >
      <div className="spot absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 mb-2.5 text-[11px] uppercase tracking-[0.08em] text-(--ember)">
        {moment.tag}
      </div>

      <blockquote className="relative z-10 mb-4 border-l-2 border-(--ember) pl-3 text-[12.5px] italic leading-relaxed text-(--zinc-200)">
        &ldquo;{moment.quote}&rdquo;
      </blockquote>

      <h3 className="relative z-10 mb-2.5 text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.02em]">
        {moment.title}
      </h3>

      <p className="relative z-10 mb-4.5 max-w-[32ch] text-[13px] leading-relaxed text-(--zinc-400)">
        {moment.description}
      </p>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono-brand text-[11px] text-(--zinc-400)">
          {moment.proof}
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-45 group-hover:border-(--ember) group-hover:bg-(--ember)">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default MomentCard;
