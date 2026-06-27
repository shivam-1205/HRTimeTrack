export const PAGE_CARD =
  "rounded-xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_4px_12px_rgba(53,37,205,0.05)]";

export const INNER_CARD = "rounded-lg border border-outline-variant/30 bg-surface-container-low";

export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral" | "primary";

export function statusBadgeClass(tone: StatusTone) {
  const map: Record<StatusTone, string> = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
    danger: "border-red-200 bg-red-50 text-red-700",
    neutral: "border-outline-variant bg-surface-container text-on-surface-variant",
    primary: "border-primary/20 bg-primary-container/10 text-primary",
  };
  return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-medium ${map[tone]}`;
}

export function reasonBadgeClass(type: "holiday" | "weekend" | "medical" | "casual") {
  const map = {
    holiday: "border-violet-200 bg-violet-50 text-violet-700",
    weekend: "border-blue-200 bg-blue-50 text-blue-700",
    medical: "border-teal-200 bg-teal-50 text-teal-700",
    casual: "border-sky-200 bg-sky-50 text-sky-700",
  };
  return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-medium ${map[type]}`;
}

export function remainingBadgeClass() {
  return "inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-caption font-medium text-on-primary";
}
