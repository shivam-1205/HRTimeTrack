"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";
import PageIntro from "../shared/PageIntro";
import { INNER_CARD, PAGE_CARD, reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { HISTORY_STATS, LEAVE_REQUESTS, LEAVE_SUMMARY } from "./data";

const summaryCards = [
  { label: "Approved", value: LEAVE_SUMMARY.approved, className: "text-emerald-600" },
  { label: "Pending", value: LEAVE_SUMMARY.pending, className: "text-amber-600" },
  { label: "Rejected", value: LEAVE_SUMMARY.rejected, className: "text-red-600" },
];

const historyStats = [
  { label: "Total Requests", value: HISTORY_STATS.total, className: "text-on-surface" },
  { label: "Approved", value: HISTORY_STATS.approved, className: "text-emerald-600" },
  { label: "Pending", value: HISTORY_STATS.pending, className: "text-amber-600" },
  { label: "On Hold", value: HISTORY_STATS.onHold, className: "text-blue-600" },
  { label: "Rejected", value: HISTORY_STATS.rejected, className: "text-red-600" },
  { label: "Days Taken", value: HISTORY_STATS.daysTaken, className: "text-primary" },
];

export default function LeaveManagementView() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<BeachAccessOutlinedIcon sx={{ fontSize: 22 }} />}
        iconClassName="bg-primary-container/10 text-primary"
        title="Leave Management"
        description="Request time off, track approval status, and review your leave history."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <article key={card.label} className={`${PAGE_CARD} p-6 text-center`}>
            <div className={`text-[40px] font-bold leading-none ${card.className}`}>{card.value}</div>
            <div className="mt-2 text-body-md text-on-surface-variant">{card.label}</div>
          </article>
        ))}
      </div>

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-outline-variant/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BeachAccessOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
            <h2 className="text-h3 font-semibold text-on-surface">Leave Requests</h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm hover:bg-primary/90"
          >
            <AddOutlinedIcon sx={{ fontSize: 18 }} />
            Request Leave
          </button>
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
              </tr>
            </thead>
            <tbody className="text-body-md">
              {LEAVE_REQUESTS.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-outline-variant/20 hover:bg-surface-container-low/40"
                >
                  <td className="px-6 py-4">
                    <span className={reasonBadgeClass(row.typeTone)}>{row.type}</span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.from}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.to}</td>
                  <td className="max-w-xs px-6 py-4 text-on-surface-variant">{row.subject}</td>
                  <td className="px-6 py-4">
                    <span className={statusBadgeClass("success")}>Approved</span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">—</td>
                </tr>
              ))}
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
            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pr-8 pl-3 text-label-md">
                <option>June</option>
                <option>May</option>
              </select>
              <KeyboardArrowDownOutlinedIcon
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                sx={{ fontSize: 18 }}
              />
            </div>
            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pr-8 pl-3 text-label-md">
                <option>2026</option>
                <option>2025</option>
              </select>
              <KeyboardArrowDownOutlinedIcon
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                sx={{ fontSize: 18 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {historyStats.map((stat) => (
            <article key={stat.label} className={`${INNER_CARD} p-4 text-center`}>
              <div className={`text-h2 font-bold ${stat.className}`}>{stat.value}</div>
              <div className="mt-1 text-caption text-on-surface-variant">{stat.label}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
