"use client";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useHolidayCalendar } from "./context/HolidayCalendarContext";

export default function HolidayCalendarHeader() {
  const { meta, years, year, yearStats, setYear, exportSchedule } = useHolidayCalendar();

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-h1 font-semibold text-on-surface">Holiday Calendar</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Company-recognized holidays and observed days off.
        </p>
        <p className="mt-1 text-caption text-on-surface-variant">
          {meta.companyName} · {meta.region} · {yearStats.total} holidays ({yearStats.paid} paid,{" "}
          {yearStats.floating} floating)
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container p-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={`rounded-full px-4 py-2 text-label-md transition-colors ${
                year === y
                  ? "border border-outline-variant/50 bg-surface text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={exportSchedule}
          className="flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
        >
          <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
          Export
        </button>
      </div>
    </div>
  );
}
