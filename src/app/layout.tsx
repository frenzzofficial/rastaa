import type { Metadata } from "next";
import "@/styles/globals.css";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import {
  jetBrainsMono,
  manrope,
  spaceGrotesk,
} from "@/packages/configs/fonts.config";
export const metadata: Metadata = {
  title: "Rastaa — Trips Built Around a Feeling",
  description:
    "Not a package catalog. Tell us the moment you're chasing — sunrise, silence, gold hour — and we'll build the route around it. Delhi NCR pickup.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetBrainsMono.variable}h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
