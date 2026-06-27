"use client";

import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import { usePathname } from "next/navigation";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="landing-theme flex min-h-full flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
