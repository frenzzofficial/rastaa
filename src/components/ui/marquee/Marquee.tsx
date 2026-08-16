import type { SiteConfig } from "@/packages/configs/data.config";

interface MarqueeProps {
  SiteConfig: SiteConfig;
}

const Marquee = ({ SiteConfig }: MarqueeProps) => {
  const { ticker } = SiteConfig;
  // Rendered twice back-to-back so the -50% translateX loop is seamless.
  const items = [...ticker, ...ticker];

  return (
    <div className="marquee-wrap overflow-hidden whitespace-nowrap border-y border-[var(--zinc-800)] bg-[var(--zinc-950)] py-[14px] text-[var(--zinc-50)]">
      <div className="marquee-track inline-flex gap-12">
        {items.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            className="font-display inline-flex items-center gap-3.5 text-[15px] tracking-[-0.01em] after:content-['—'] after:text-[var(--ember)]"
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
