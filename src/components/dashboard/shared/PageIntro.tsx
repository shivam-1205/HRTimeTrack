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
  iconClassName = "bg-primary-container/10 text-primary",
  title,
  description,
  action,
}: PageIntroProps) {
  return (
    <header className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
            >
              {icon}
            </div>
            <h1 className="min-w-0 text-h1 font-semibold text-on-surface">{title}</h1>
          </div>
          {description && (
            <div className="max-w-3xl pl-[calc(2.5rem+0.75rem)] text-body-md leading-relaxed text-on-surface-variant">
              {description}
            </div>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 lg:pt-1">{action}</div>}
    </header>
  );
}
