"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  toggleMobile: () => void;
  setCollapsed: (value: boolean) => void;
  closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        mobileOpen,
        toggle: () => setCollapsed((prev) => !prev),
        toggleMobile: () => setMobileOpen((prev) => !prev),
        setCollapsed,
        closeMobile: () => setMobileOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
