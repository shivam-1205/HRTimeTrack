"use client";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useMemo, useState } from "react";
import { useDashboardTracker } from "./context/DashboardTrackerContext";
import type { AttendanceStatus } from "./data/dashboardTypes";
import DashboardCard from "./DashboardCard";

const statusStyles: Record<AttendanceStatus, string> = {
  Present: "bg-emerald-500/10 text-emerald-600",
  Late: "bg-amber-500/10 text-amber-600",
  Absent: "bg-error/10 text-error",
};

const ALL_STATUSES: AttendanceStatus[] = ["Present", "Late", "Absent"];

export default function RecentAttendanceTable() {
  const { recentAttendance } = useDashboardTracker();
  const [filter, setFilter] = useState<AttendanceStatus | "All">("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredRows = useMemo(() => {
    if (filter === "All") return recentAttendance;
    return recentAttendance.filter((row) => row.status === filter);
  }, [recentAttendance, filter]);

  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-outline-variant/70 bg-surface-container-lowest px-4 py-4">
        <h3 className="text-h3 font-semibold text-on-surface">Recent Attendance</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilter((prev) => !prev)}
            className={`flex items-center gap-1 text-label-md font-medium transition-colors ${
              filter !== "All" ? "text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
            {filter === "All" ? "Filter" : filter}
          </button>
          {showFilter && (
            <div className="absolute top-full right-0 z-10 mt-1 min-w-[120px] rounded-lg border border-outline-variant/60 bg-surface-container-lowest py-1 shadow-lg">
              {(["All", ...ALL_STATUSES] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFilter(option);
                    setShowFilter(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-body-md transition-colors hover:bg-surface-container-low ${
                    filter === option ? "font-medium text-primary" : "text-on-surface"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/70 bg-surface-container-low text-caption font-medium text-on-surface-variant">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">First In</th>
              <th className="px-4 py-3 font-medium">Last Out</th>
              <th className="px-4 py-3 font-medium">Worked Hours</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {filteredRows.map((row, index) => (
              <tr
                key={row.date}
                className={`transition-colors hover:bg-surface-container-low/60 ${
                  index < filteredRows.length - 1 ? "border-b border-outline-variant/40" : ""
                }`}
              >
                <td className="px-4 py-3.5">{row.date}</td>
                <td className={`px-4 py-3.5 ${row.firstIn === "--" ? "text-outline" : ""}`}>
                  {row.firstIn}
                </td>
                <td className={`px-4 py-3.5 ${row.lastOut === "--" ? "text-outline" : ""}`}>
                  {row.lastOut}
                </td>
                <td
                  className={`px-4 py-3.5 ${
                    row.workedHours === "00h 00m" ? "text-outline" : "font-medium"
                  }`}
                >
                  {row.workedHours}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-caption font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
