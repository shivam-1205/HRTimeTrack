import type { Metadata } from "next";
import DashboardShell from "@/src/dashboard/layout";
import "@/src/styles/dashboard.css";

export const metadata: Metadata = {
  title: "Enterprise HRMS - Employee Dashboard",
  description: "Employee dashboard for attendance, leave, and performance tracking.",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
