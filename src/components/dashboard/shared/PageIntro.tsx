import type { ReactNode } from "react";

type PageIntroProps = {
  icon: ReactNode;
  iconClassName?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

export default function PageIntro({
  icon,
  iconClassName = "bg-emerald-500/10 text-emerald-600",
  title,
  description,
  action,
}: PageIntroProps) {
  return (
    <header className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h1 className="text-h1 font-semibold text-on-surface">{title}</h1>
            {description && (
              <div className="mt-1 max-w-3xl text-body-md leading-relaxed text-on-surface-variant">
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
