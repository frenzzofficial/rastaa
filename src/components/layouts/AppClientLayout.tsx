"use client";

import Footer from "./Footer";
import Header from "./Header";
import { StructuredData } from "./StructuredData";
import WhatsAppFab from "./WhatsAppFab";

interface AppClientLayoutProps {
  children: React.ReactNode;
}
const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <>
      <StructuredData />
      <div className="grain" />
      <Header />
      {children}
      <Footer />
      <WhatsAppFab />
    </>
  );
};

export default AppClientLayout;
