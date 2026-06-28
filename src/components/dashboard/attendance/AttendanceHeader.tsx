"use client";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PageIntro from "../shared/PageIntro";
import { useAttendance } from "./context/AttendanceContext";

export default function AttendanceHeader() {
  const {
    filters,
    monthValue,
    statusFilter,
    setMonthValue,
    setStatusFilter,
    exportReport,
  } = useAttendance();

  return (
    <PageIntro
      icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 22 }} />}
      title="Attendance Tracking"
      description="Monitor your daily presence, hours, and schedule."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pl-3 pr-8 text-label-md text-on-surface shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={monthValue}
              onChange={(e) => setMonthValue(e.target.value)}
            >
              {filters.months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <KeyboardArrowDownOutlinedIcon
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
              sx={{ fontSize: 20 }}
            />
          </div>

          <div className="relative">
            <select
              className="cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest py-2 pl-3 pr-8 text-label-md text-on-surface shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {filters.statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <KeyboardArrowDownOutlinedIcon
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
              sx={{ fontSize: 20 }}
            />
          </div>

          <button
            type="button"
            onClick={exportReport}
            className="flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-label-md text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
          >
            <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
            Export Report
          </button>
        </div>
      }
    />
  );
}
