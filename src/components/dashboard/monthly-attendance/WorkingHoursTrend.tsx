"use client";

import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CARD_SHADOW } from "./monthlyAttendanceTypes";
import { barClassName } from "./monthlyAttendanceUtils";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function WorkingHoursTrend() {
  const {
    chartPeriod,
    chartBars,
    chartRangeLabel,
    scores,
    setChartPeriod,
    openLogDetailById,
  } = useMonthlyAttendance();

  return (
    <section className={`rounded-xl bg-surface-container-lowest p-6 ${CARD_SHADOW}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-h3 font-semibold text-on-surface">Working Hours Trend</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChartPeriod("week")}
            className={`rounded-md px-2 py-1 text-caption font-medium ${
              chartPeriod === "week"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => setChartPeriod("month")}
            className={`rounded-md px-2 py-1 text-caption font-medium ${
              chartPeriod === "month"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="group relative flex h-64 flex-grow items-center justify-center overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container-low">
          <div className="flex h-full w-full items-end justify-around gap-2 p-4">
            {chartBars.map((bar) => (
              <button
                key={bar.id}
                type="button"
                disabled={!bar.logId}
                onClick={() => openLogDetailById(bar.logId)}
                title={bar.logId ? `${bar.label}: ${bar.hours}h — click for details` : bar.label}
                className={`w-1/12 rounded-t-sm transition-colors ${barClassName(bar)}`}
                style={{ height: `${bar.heightPercent}%` }}
                aria-label={bar.logId ? `View ${bar.label} attendance` : bar.label}
              />
            ))}
          </div>
          <span className="absolute bottom-2 left-2 rounded-md bg-surface-container-lowest px-2 py-1 text-caption text-on-surface-variant shadow-sm">
            {chartRangeLabel}
          </span>
        </div>

        <div className="flex w-full flex-col justify-center gap-4 md:w-64">
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-md font-medium text-on-surface">Attendance Score</span>
              <StarOutlinedIcon className="text-amber-500" sx={{ fontSize: 18 }} />
            </div>
            <div className="flex items-end gap-1">
              <span className="text-h1 font-semibold text-primary">{scores.attendanceScore}</span>
              <span className="mb-1 text-body-md text-on-surface-variant">/{scores.attendanceMax}</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-outline-variant/30">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${scores.attendancePercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-md font-medium text-on-surface">Consistency</span>
              <BoltOutlinedIcon className="text-emerald-500" sx={{ fontSize: 18 }} />
            </div>
            <span className="text-h1 font-semibold text-emerald-600">{scores.consistency}</span>
            <p className="mt-2 text-caption text-on-surface-variant">{scores.consistencyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
