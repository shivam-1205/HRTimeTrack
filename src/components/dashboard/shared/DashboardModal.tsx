"use client";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import type { ReactNode } from "react";
import {
  MODAL_SHADOW,
  modalCloseBtnClass,
  modalSizeClass,
  modalStatTileClass,
  type ModalSize,
} from "./modalStyles";

type DashboardModalProps = {
  title: string;
  subtitle?: string;
  titleId?: string;
  size?: ModalSize;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  headerBelow?: ReactNode;
  headerBadge?: ReactNode;
  banner?: ReactNode;
  showHeader?: boolean;
};

export function DashboardModalStatGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2.5">{children}</div>;
}

export function DashboardModalStat({
  icon,
  label,
  value,
  valueClass = "text-on-surface",
  spanFull = false,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
  valueClass?: string;
  spanFull?: boolean;
}) {
  return (
    <div className={`${modalStatTileClass} ${spanFull ? "col-span-2" : ""}`}>
      <div className="mb-0.5 flex items-center gap-1.5 text-on-surface-variant">
        {icon && <span className="flex shrink-0 [&_svg]:!text-[15px]">{icon}</span>}
        <span className="text-caption leading-none">{label}</span>
      </div>
      <p className={`truncate text-label-md font-semibold leading-snug ${valueClass}`}>{value}</p>
    </div>
  );
}

/** @deprecated Use DashboardModalStat inside DashboardModalStatGrid */
export function DashboardModalDetailRow({
  icon,
  label,
  value,
  valueClass = "text-on-surface",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <DashboardModalStat icon={icon} label={label} value={value} valueClass={valueClass} spanFull />
  );
}

export default function DashboardModal({
  title,
  subtitle,
  titleId,
  size = "md",
  onClose,
  children,
  footer,
  headerBelow,
  headerBadge,
  banner,
  showHeader = true,
}: DashboardModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`flex max-h-[min(85vh,640px)] flex-col overflow-hidden rounded-2xl bg-surface-container-lowest ${MODAL_SHADOW} ${modalSizeClass[size]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {banner}

        {showHeader && (
          <div className="flex shrink-0 items-start justify-between gap-2 border-b border-outline-variant/20 px-5 py-3.5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id={titleId} className="text-label-lg font-semibold text-on-surface">
                  {title}
                </h2>
                {headerBadge}
              </div>
              {subtitle && (
                <p className="mt-0.5 text-caption text-on-surface-variant">{subtitle}</p>
              )}
              {headerBelow}
            </div>
            <button
              type="button"
              onClick={onClose}
              className={modalCloseBtnClass}
              aria-label="Close"
            >
              <CloseOutlinedIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="flex shrink-0 justify-end gap-2 border-t border-outline-variant/20 px-5 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
