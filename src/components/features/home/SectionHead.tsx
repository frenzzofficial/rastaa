import { useReveal } from "@/packages/hooks/useReveal";

const SectionHead = ({
  lines,
  subtext,
  dark = false,
}: {
  lines: string[];
  subtext: string;
  dark?: boolean;
}) => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal mb-[52px] grid grid-cols-1 items-end gap-6 sm:grid-cols-2"
    >
      <h2
        className={[
          "font-display m-0 text-[clamp(1.9rem,4vw,3rem)] leading-[1.03] tracking-[-0.03em]",
          dark ? "text-white" : "text-[var(--zinc-950)]",
        ].join(" ")}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[var(--zinc-400)] sm:justify-self-end">
        {subtext}
      </p>
    </div>
  );
};

export default SectionHead;
