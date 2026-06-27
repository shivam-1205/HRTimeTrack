export const MODAL_SHADOW =
  "shadow-[0_8px_30px_rgba(53,37,205,0.08),inset_0_0_0_1px_rgba(199,196,216,0.25)]";

export const modalInputClass =
  "w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export const modalLabelClass = "mb-1 block text-caption font-medium text-on-surface-variant";

export const modalSectionClass =
  "rounded-xl border border-outline-variant/25 bg-surface-container-low/50 p-3";

export const modalDetailRowClass =
  "flex items-start gap-2.5 rounded-xl border border-outline-variant/25 bg-surface-container-low/50 px-3 py-2.5";

export const modalBtnSecondary =
  "rounded-xl border border-outline-variant px-3.5 py-1.5 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low";

export const modalBtnOutline =
  "rounded-xl border border-outline-variant px-3.5 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low";

export const modalBtnPrimary =
  "rounded-xl bg-primary px-3.5 py-1.5 text-label-md text-on-primary transition-colors hover:bg-primary/90";

export const modalBtnDanger =
  "rounded-xl bg-error px-3.5 py-1.5 text-label-md text-on-error transition-colors hover:bg-error/90";

export const modalCloseBtnClass =
  "rounded-xl p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low";

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Fixed compact widths — avoids full-width stretched modals */
export const modalSizeClass: Record<ModalSize, string> = {
  xs: "w-[min(100%,22rem)]",
  sm: "w-[min(100%,26rem)]",
  md: "w-[min(100%,30rem)]",
  lg: "w-[min(100%,34rem)]",
  xl: "w-[min(100%,38rem)]",
};

export const modalStatTileClass =
  "rounded-xl border border-outline-variant/25 bg-surface-container-low/60 px-3.5 py-3";
