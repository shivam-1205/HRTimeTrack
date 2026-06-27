import type { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tinted";
};

export default function DashboardCard({
  children,
  className = "",
  variant = "default",
}: DashboardCardProps) {
  const base =
    variant === "tinted"
      ? "bg-surface-container-low border-outline-variant/70"
      : "bg-surface-container-lowest border-outline-variant/60";

  return (
    <div
      className={`rounded-xl border shadow-[0_1px_3px_rgba(21,28,39,0.06)] ${base} ${className}`}
    >
      {children}
    </div>
  );
}
