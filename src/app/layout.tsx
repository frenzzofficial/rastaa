import type { Metadata } from "next";
import "@/styles/globals.css";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import {
  jetBrainsMono,
  manrope,
  spaceGrotesk,
} from "@/packages/configs/fonts.config";
import { seo } from "@/packages/seo/seo.config";

export const metadata: Metadata = seo;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
