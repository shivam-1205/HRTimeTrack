// Legacy layout helper — app router uses app/layout.tsx + AppChrome instead.
import { ReactNode } from "react";

export const metadata = {
  title: "Enterprise HRMS Portal",
  description:
    "The modern, intuitive HRMS platform designed to streamline payroll, enhance employee wellness, and ensure global compliance for enterprise teams.",
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      {children}
    </div>
  );
}
