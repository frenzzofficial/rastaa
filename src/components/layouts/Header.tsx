"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/packages/configs/data.config";

const Header = () => {
  const { nav } = siteConfig;
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mix-blend-difference flex items-center justify-between px-5 py-5.5 sm:px-14">
        <Link
          href="#"
          className="font-display text-lg font-semibold tracking-tight"
        >
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>

        <div className="hidden gap-8 text-black text-[13px] sm:flex">
          {nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.25 sm:hidden"
        >
          <span
            className={`h-[1.5px] w-5 bg-current transition-transform duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`h-[1.5px] w-5 bg-current transition-transform duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden bg-(--zinc-950) text-white transition-[max-height] duration-300 ease-[cubic-bezier(.16,1,.3,1)] sm:hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-5 pb-7 pt-2 text-sm">
          {nav.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
