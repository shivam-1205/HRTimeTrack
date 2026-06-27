import type { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tinted" | "hero";
};

export default function DashboardCard({
  children,
  className = "",
  variant = "default",
}: DashboardCardProps) {
  const base =
    variant === "hero"
      ? "border-primary-fixed/30 bg-primary-fixed/25"
      : variant === "tinted"
        ? "border-outline-variant/50 bg-surface-container-low"
        : "border-outline-variant/50 bg-surface-container-lowest";

  return (
    <div
      className={`rounded-xl border shadow-[0_4px_12px_rgba(53,37,205,0.05)] ${base} ${className}`}
    >
      {children}
    </div>
  );
}
