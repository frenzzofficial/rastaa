import { siteConfig } from "@/packages/configs/data.config";

const Footer = () => {
  const { brand, footer } = siteConfig;

  return (
    <footer className="bg-[var(--zinc-950)] px-5 pb-[30px] pt-14 text-[var(--zinc-400)] sm:px-14">
      <div className="mb-[22px] flex flex-wrap items-start justify-between gap-[30px] border-b border-[var(--zinc-800)] pb-9">
        <div className="font-display text-xl text-white">{brand.name}</div>
        <div className="font-mono-brand text-xs">
          {footer.areasServed.join(" · ")}
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2.5 text-xs">
        <span>{footer.copyright}</span>
        <span>{footer.tagline}</span>
      </div>
    </footer>
  );
};

export default Footer;
