"use client";

import { Inter } from "next/font/google";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function DashboardMain({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    /* Margin on outer shell — NOT inside zoom — so top bar clears the sidebar */
    <div
      className={`dashboard-theme dashboard-main flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-in-out max-md:ml-0 ${
        collapsed ? "md:ml-[52px]" : "md:ml-[188px]"
      }`}
    >
      <div className="dashboard-scaled flex min-h-screen flex-1 flex-col">
        <TopNavBar />
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className={`${inter.className} min-h-screen antialiased`}>
        <Sidebar />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </SidebarProvider>
  );
}
