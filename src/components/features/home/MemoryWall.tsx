"use client";
import { siteConfig } from "@/packages/configs/data.config";
import { useReveal } from "@/packages/hooks/useReveal";
import SectionHead from "./SectionHead";

const MemoryWall = () => {
  const { memoryWall } = siteConfig;
  const stripRef = useReveal<HTMLDivElement>();

  return (
    <section id="wall" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-14">
      <SectionHead lines={memoryWall.heading} subtext={memoryWall.subtext} />

      <div
        ref={stripRef}
        className="reveal wall-strip flex gap-4 overflow-x-auto pb-3"
      >
        {memoryWall.tiles.map((tile) => (
          <div
            key={tile.id}
            className="relative flex h-[280px] w-[220px] shrink-0 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--zinc-800)] to-[var(--zinc-950)] p-4 text-white after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,var(--ember-soft),transparent_60%)]"
          >
            <div className="relative z-10 text-xs leading-relaxed">
              <b className="font-display block text-[13px]">
                {tile.name} · {tile.place}
              </b>
              {tile.caption}
            </div>
          </div>
        ))}

        <div className="flex h-[280px] w-[220px] shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-[var(--zinc-700)] p-5 text-center text-[13px] text-[var(--zinc-400)]">
          {memoryWall.addTileText}
          <span className="font-semibold text-[var(--ember)]">
            {memoryWall.addTileCta}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MemoryWall;
