"use client";

import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PageIntro from "../shared/PageIntro";
import { PAGE_CARD, reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import ExtraWorkingDaysModals from "./ExtraWorkingDaysModals";
import {
  ExtraWorkingDaysProvider,
  useExtraWorkingDays,
} from "./context/ExtraWorkingDaysContext";
import type { ExtraDayStatus, StatusFilter } from "./extraWorkingDaysTypes";
import { statusLabel, statusToTone } from "./extraWorkingDaysUtils";

const STATUS_ITEMS: { key: ExtraDayStatus; label: string; tone: "success" | "warning" | "info" | "danger" }[] = [
  { key: "approved", label: "Approved", tone: "success" },
  { key: "pending", label: "Pending", tone: "warning" },
  { key: "on_hold", label: "On Hold", tone: "info" },
  { key: "rejected", label: "Rejected", tone: "danger" },
];

function StatusDot({ tone }: { tone: "success" | "warning" | "info" | "danger" }) {
  const colors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-orange-500",
    danger: "bg-red-500",
  };
  return <span className={`h-2.5 w-2.5 rounded-full ${colors[tone]}`} />;
}

function ExtraDaysNotification() {
  const { notification, clearNotification } = useExtraWorkingDays();
  if (!notification) return null;

  const icons = {
    success: CheckCircleOutlinedIcon,
    info: InfoOutlinedIcon,
    error: ErrorOutlineOutlinedIcon,
  };
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };
  const Icon = icons[notification.type];

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles[notification.type]}`}>
      <div className="flex items-center gap-2">
        <Icon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button type="button" onClick={clearNotification} className="text-caption underline opacity-70 hover:opacity-100">Dismiss</button>
    </div>
  );
}

function ExtraWorkingDaysContent() {
  const {
    meta,
    statusCounts,
    statusFilter,
    filteredRecords,
    setStatusFilter,
    openRequestModal,
    openEditNote,
    openDetail,
    exportRecords,
  } = useExtraWorkingDays();

  const totalCount =
    statusCounts.approved + statusCounts.pending + statusCounts.onHold + statusCounts.rejected;

  const countMap: Record<Exclude<StatusFilter, "all">, number> = {
    approved: statusCounts.approved,
    pending: statusCounts.pending,
    on_hold: statusCounts.onHold,
    rejected: statusCounts.rejected,
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <ExtraDaysNotification />

      <PageIntro
        icon={<MoreTimeOutlinedIcon sx={{ fontSize: 22 }} />}
        title="My Extra Working Days"
        description={
          <>
            {meta.description} Approved balance:{" "}
            <span className="font-medium text-emerald-600">{meta.approvedBalance} days</span>
            {" · "}
            Pending: <span className="font-medium text-amber-600">{meta.pendingBalance}</span>
          </>
        }
        action={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportRecords}
              className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
            >
              <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
              Export
            </button>
            <button
              type="button"
              onClick={openRequestModal}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
            >
              <EventAvailableOutlinedIcon sx={{ fontSize: 18 }} />
              Request
            </button>
          </div>
        }
      />

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="flex flex-wrap items-center gap-4 border-b border-outline-variant/30 px-6 py-4">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`rounded-full px-3 py-1 text-label-md transition-colors ${
              statusFilter === "all" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            All ({totalCount})
          </button>
          {STATUS_ITEMS.map(({ key, label, tone }) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}
              className={`flex items-center gap-2 rounded-full px-3 py-1 transition-colors ${
                statusFilter === key ? "bg-surface-container-high ring-1 ring-primary/30" : "hover:bg-surface-container-low"
              }`}
            >
              <StatusDot tone={tone} />
              <span className="text-h3 font-semibold text-on-surface">{countMap[key]}</span>
              <span className="text-body-md text-on-surface-variant">{label}</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Reason</th>
                <th className="px-6 py-3 font-medium">Your Note</th>
                <th className="px-6 py-3 font-medium">Hours</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant">
                    No records for this filter. Click <strong>Request</strong> to submit a new extra working day.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row) => {
                  const canEdit = row.status === "pending" || row.status === "on_hold";
                  return (
                    <tr
                      key={row.id}
                      className="cursor-pointer border-b border-outline-variant/20 transition-colors hover:bg-surface-container-low/40"
                      onClick={() => openDetail(row)}
                    >
                      <td className="px-6 py-4 font-medium text-on-surface">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={reasonBadgeClass(row.reasonType)}>{row.reason}</span>
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-on-surface-variant">{row.note}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{row.totalHours}</td>
                      <td className="px-6 py-4">
                        <span className={statusBadgeClass(statusToTone(row.status))}>
                          {statusLabel(row.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openDetail(row)}
                            className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 bg-surface p-1.5 text-on-surface-variant transition-colors hover:border-primary/30 hover:bg-primary-container/10 hover:text-primary"
                            aria-label={`View ${row.date}`}
                          >
                            <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "currentColor" }} />
                          </button>
                          {canEdit && (
                            <button
                              type="button"
                              onClick={() => openEditNote(row)}
                              className="inline-flex items-center gap-1 rounded-md border border-outline-variant/40 px-2 py-1 text-caption text-primary transition-colors hover:bg-primary-container/10"
                            >
                              <EditOutlinedIcon sx={{ fontSize: 14 }} />
                              Edit Note
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ExtraWorkingDaysModals />
    </div>
  );
}

export default function ExtraWorkingDaysView() {
  return (
    <ExtraWorkingDaysProvider>
      <ExtraWorkingDaysContent />
    </ExtraWorkingDaysProvider>
  );
}
