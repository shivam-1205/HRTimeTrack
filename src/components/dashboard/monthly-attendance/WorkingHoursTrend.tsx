"use client";

import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useState } from "react";
import { CARD_SHADOW, CHART_BARS } from "./monthlyAttendanceData";

export default function WorkingHoursTrend() {
  const [period, setPeriod] = useState<"week" | "month">("month");

  return (
    <section className={`rounded-xl bg-surface-container-lowest p-6 ${CARD_SHADOW}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-h3 font-semibold text-on-surface">Working Hours Trend</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPeriod("week")}
            className={`rounded-md px-2 py-1 text-caption font-medium ${
              period === "week"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => setPeriod("month")}
            className={`rounded-md px-2 py-1 text-caption font-medium ${
              period === "month"
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
            {CHART_BARS.map((bar, index) => (
              <div
                key={index}
                className={`w-1/12 rounded-t-sm transition-colors ${bar.className}`}
                style={{ height: bar.height }}
              />
            ))}
          </div>
          <span className="absolute bottom-2 left-2 rounded-md bg-surface-container-lowest px-2 py-1 text-caption text-on-surface-variant shadow-sm">
            {period === "month" ? "Jun 1 - Jun 30" : "Jun 8 - Jun 14"}
          </span>
        </div>

        <div className="flex w-full flex-col justify-center gap-4 md:w-64">
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-md font-medium text-on-surface">Attendance Score</span>
              <StarOutlinedIcon className="text-amber-500" sx={{ fontSize: 18 }} />
            </div>
            <div className="flex items-end gap-1">
              <span className="text-h1 font-semibold text-primary">9.4</span>
              <span className="mb-1 text-body-md text-on-surface-variant">/10</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-outline-variant/30">
              <div className="h-1.5 w-[94%] rounded-full bg-primary" />
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant/20 bg-surface-container p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-md font-medium text-on-surface">Consistency</span>
              <BoltOutlinedIcon className="text-emerald-500" sx={{ fontSize: 18 }} />
            </div>
            <span className="text-h1 font-semibold text-emerald-600">High</span>
            <p className="mt-2 text-caption text-on-surface-variant">Top 15% in department</p>
          </div>
        </div>
      </div>
    </section>
  );
}
