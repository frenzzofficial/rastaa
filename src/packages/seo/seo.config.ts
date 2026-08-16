import type { Metadata } from "next";
import { appConfig } from "@/packages/configs/app.config";

const { title, description } = appConfig;

export const seo : Metadata = {
  metadataBase: new URL("https://frenzzofficial.github.io/rastaa/"),
  title,
  description,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
