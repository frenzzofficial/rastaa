import { siteConfig } from "@/packages/configs/data.config";
import MoodFilter from "./MoodFilter";

const Hero = () => {
  const { hero } = siteConfig;

  return (
    <section className="relative flex min-h-[92dvh] flex-col justify-center px-5 pb-16 pt-32 sm:px-14">
      <div className="mb-6 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.08em] text-[var(--zinc-400)]">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--ember)]" />
        {hero.eyebrow}
      </div>

      <h1 className="mb-10 max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
        {hero.headlineLines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <span
              className="rise-line block"
              style={{
                animationDelay: `${i * 0.12}s`,
                color: i === hero.accentLineIndex ? "var(--ember)" : undefined,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="mb-[18px] text-sm text-[var(--zinc-400)]">
        {hero.moodPrompt}
      </p>
      <MoodFilter />
    </section>
  );
};

export default Hero;
