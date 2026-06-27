"use client";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function AttendanceAlertBanner() {
  const { alert, openIncompleteLogs, openRegularize } = useMonthlyAttendance();
  const hasIssues = alert.incompleteLogs.length > 0;

  if (!hasIssues) return null;

  return (
    <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-error/20 bg-error-container/30 p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/10">
          <WarningAmberOutlinedIcon className="text-error" sx={{ fontSize: 22 }} />
        </div>
        <div>
          <h3 className="text-h3 font-semibold text-on-surface">{alert.title}</h3>
          <p className="text-body-md text-on-surface-variant">{alert.message}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={openIncompleteLogs}
          className="rounded-lg border border-error/30 px-4 py-2 text-label-md text-error transition-colors hover:bg-error/10"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={() => openRegularize()}
          className="rounded-lg bg-error px-4 py-2 text-label-md text-on-error shadow-sm transition-colors hover:bg-error/90"
        >
          Regularize Now
        </button>
      </div>
    </section>
  );
}
