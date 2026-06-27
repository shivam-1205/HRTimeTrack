"use client";

import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useAttendance } from "./context/AttendanceContext";
import type { LogStatus } from "./attendanceTypes";

const statusBadge: Record<LogStatus, string> = {
  Present:
    "border-primary-container bg-primary-container/20 text-primary-fixed-dim",
  Late: "border-tertiary-container bg-tertiary-container/20 text-tertiary",
  Absent: "border-error-container bg-error-container/20 text-error",
};

const statusDot: Record<LogStatus, string> = {
  Present: "bg-primary",
  Late: "bg-tertiary",
  Absent: "bg-error",
};

export default function AttendanceDetailedLog() {
  const {
    paginatedRecords,
    pagination,
    searchQuery,
    setSearchQuery,
    goToPage,
    openLogDetail,
  } = useAttendance();

  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
      <div className="flex flex-col gap-3 border-b border-outline-variant bg-surface-container-lowest p-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-h3 font-semibold text-on-surface">Detailed Log</h3>
        <div className="relative w-full sm:w-56">
          <SearchOutlinedIcon
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 18 }}
          />
          <input
            type="text"
            placeholder="Search log..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-outline-variant bg-surface-container-lowest py-1.5 pl-8 pr-3 text-body-md text-on-surface focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Date</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Status</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">First In</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Last Out</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Total Hours</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Sessions</th>
              <th className="p-4 text-right text-label-md font-medium text-on-surface-variant">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                  No records match your filters.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-outline-variant transition-colors hover:bg-surface-container-lowest ${
                    row.highlight ? "bg-surface-container-lowest/50" : ""
                  }`}
                >
                  <td className="p-4">{row.date}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-caption font-medium ${statusBadge[row.status]}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${statusDot[row.status]}`} />
                      {row.status}
                    </span>
                  </td>
                  <td
                    className={`p-4 ${
                      row.status === "Late" ? "text-tertiary" : "text-outline"
                    }`}
                  >
                    {row.firstIn}
                  </td>
                  <td className="p-4 text-outline">{row.lastOut}</td>
                  <td
                    className={`p-4 font-medium ${
                      row.status === "Absent" ? "text-error" : ""
                    }`}
                  >
                    {row.totalHours}
                  </td>
                  <td className="p-4">{row.sessions}</td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => openLogDetail(row)}
                      className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 bg-surface p-1.5 text-on-surface-variant transition-colors hover:border-primary/30 hover:bg-primary-container/10 hover:text-primary"
                      aria-label={`View details for ${row.date}`}
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

      <div className="flex items-center justify-between border-t border-outline-variant bg-surface px-4 py-2">
        <span className="text-caption text-outline">{pagination.label}</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="rounded-md border border-outline-variant p-1 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeftOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => goToPage(pagination.page + 1)}
            className="rounded-md border border-outline-variant p-1 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRightOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
