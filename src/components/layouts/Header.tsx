import Link from "next/link";
import { siteConfig } from "@/packages/configs/data.config";

const Header = () => {
  const { brand, nav } = siteConfig;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-[22px] text-white mix-blend-difference sm:px-14">
      <Link
        href="#"
        className="font-display text-lg font-semibold tracking-tight"
      >
        {brand.name}
      </Link>
      <div className="hidden gap-8 text-[13px] sm:flex">
        {nav.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};
export default Header;
