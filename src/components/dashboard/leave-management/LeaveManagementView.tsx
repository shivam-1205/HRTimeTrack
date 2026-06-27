"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PageIntro from "../shared/PageIntro";
import { INNER_CARD, PAGE_CARD, reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import HolidayMessagesPanel from "./HolidayMessagesPanel";
import LeaveManagementModals from "./LeaveManagementModals";
import {
  LeaveManagementProvider,
  useLeaveManagement,
} from "./context/LeaveManagementContext";
import type { LeaveStatus } from "./leaveManagementTypes";
import { statusLabel, statusToTone } from "./leaveManagementUtils";

function LeaveNotification() {
  const { notification, clearNotification } = useLeaveManagement();
  if (!notification) return null;

  const icons = { success: CheckCircleOutlinedIcon, info: InfoOutlinedIcon, error: ErrorOutlineOutlinedIcon };
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

function LeaveManagementContent() {
  const {
    summary,
    filteredRequests,
    historyStats,
    statusFilter,
    period,
    monthValue,
    year,
    formOptions,
    setStatusFilter,
    setPeriod,
    setMonthValue,
    setYear,
    openRequestModal,
    openLeaveDetail,
    exportRequests,
  } = useLeaveManagement();

  const summaryCards = [
    { key: "approved" as const, label: "Approved", value: summary.approved, className: "text-emerald-600", filter: "approved" as LeaveStatus },
    { key: "pending" as const, label: "Pending", value: summary.pending, className: "text-amber-600", filter: "pending" as LeaveStatus },
    { key: "rejected" as const, label: "Rejected", value: summary.rejected, className: "text-red-600", filter: "rejected" as LeaveStatus },
  ];

  const historyStatItems = [
    { label: "Total Requests", value: historyStats.total, className: "text-on-surface" },
    { label: "Approved", value: historyStats.approved, className: "text-emerald-600" },
    { label: "Pending", value: historyStats.pending, className: "text-amber-600" },
    { label: "On Hold", value: historyStats.onHold, className: "text-blue-600" },
    { label: "Rejected", value: historyStats.rejected, className: "text-red-600" },
    { label: "Days Taken", value: historyStats.daysTaken, className: "text-primary" },
  ];

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <LeaveNotification />

      <PageIntro
        icon={<BeachAccessOutlinedIcon sx={{ fontSize: 22 }} />}
        iconClassName="bg-primary-container/10 text-primary"
        title="Leave Management"
        description="Request time off, track approval status, and review your leave history."
        action={
          <button
            type="button"
            onClick={openRequestModal}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md text-on-primary shadow-sm hover:bg-primary/90"
          >
            <AddOutlinedIcon sx={{ fontSize: 18 }} />
            Request Leave
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => setStatusFilter(statusFilter === card.filter ? "all" : card.filter)}
            className={`${PAGE_CARD} p-6 text-center transition-shadow hover:shadow-md ${
              statusFilter === card.filter ? "ring-2 ring-primary/30" : ""
            }`}
          >
            <div className={`text-[40px] font-bold leading-none ${card.className}`}>{card.value}</div>
            <div className="mt-2 text-body-md text-on-surface-variant">{card.label}</div>
          </button>
        ))}
      </div>

      <HolidayMessagesPanel />

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-outline-variant/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BeachAccessOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
            <h2 className="text-h3 font-semibold text-on-surface">Leave Requests</h2>
            {statusFilter !== "all" && (
              <button type="button" onClick={() => setStatusFilter("all")} className="text-caption text-primary hover:underline">
                Clear filter
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportRequests}
              className="flex items-center gap-1 rounded-lg border border-outline-variant px-3 py-2 text-label-md text-on-surface hover:bg-surface-container-low"
            >
              <DownloadOutlinedIcon sx={{ fontSize: 16 }} />
              Export
            </button>
            <button
              type="button"
              onClick={openRequestModal}
              className="flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm hover:bg-primary/90"
            >
              <AddOutlinedIcon sx={{ fontSize: 18 }} />
              Request Leave
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">From</th>
                <th className="px-6 py-3 font-medium">To</th>
                <th className="px-6 py-3 font-medium">Subject</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Conflict</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-on-surface-variant">
                    No leave requests match this filter.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-b border-outline-variant/20 hover:bg-surface-container-low/40"
                    onClick={() => openLeaveDetail(row)}
                  >
                    <td className="px-6 py-4">
                      <span className={reasonBadgeClass(row.typeTone)}>{row.type}</span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{row.from}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{row.to}</td>
                    <td className="max-w-xs truncate px-6 py-4 text-on-surface-variant">{row.subject}</td>
                    <td className="px-6 py-4">
                      <span className={statusBadgeClass(statusToTone(row.status))}>{statusLabel(row.status)}</span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{row.conflict ?? "—"}</td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => openLeaveDetail(row)}
                        className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 bg-surface p-1.5 text-on-surface-variant hover:border-primary/30 hover:bg-primary-container/10 hover:text-primary"
                        aria-label={`View leave ${row.subject}`}
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "currentColor" }} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${PAGE_CARD} p-6`}>
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <HistoryOutlinedIcon className="text-on-surface-variant" sx={{ fontSize: 22 }} />
            <h2 className="text-h3 font-semibold text-on-surface">Leave History</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg border border-outline-variant/50 bg-surface-container-low p-1">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`rounded-md px-3 py-1 text-caption font-medium ${
                  period === "monthly" ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setPeriod("yearly")}
                className={`rounded-md px-3 py-1 text-caption font-medium ${
                  period === "yearly" ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant"
                }`}
              >
                Yearly
              </button>
            </div>
            {period === "monthly" && (
              <div className="relative">
                <select
                  className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pr-8 pl-3 text-label-md"
                  value={monthValue}
                  onChange={(e) => setMonthValue(e.target.value)}
                >
                  {formOptions.months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <KeyboardArrowDownOutlinedIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" sx={{ fontSize: 18 }} />
              </div>
            )}
            <div className="relative">
              <select
                className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pr-8 pl-3 text-label-md"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {formOptions.years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <KeyboardArrowDownOutlinedIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" sx={{ fontSize: 18 }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {historyStatItems.map((stat) => (
            <article key={stat.label} className={`${INNER_CARD} p-4 text-center`}>
              <div className={`text-h2 font-bold ${stat.className}`}>{stat.value}</div>
              <div className="mt-1 text-caption text-on-surface-variant">{stat.label}</div>
            </article>
          ))}
        </div>
      </section>

      <LeaveManagementModals />
    </div>
  );
}

export default function LeaveManagementView() {
  return (
    <LeaveManagementProvider>
      <LeaveManagementContent />
    </LeaveManagementProvider>
  );
}
