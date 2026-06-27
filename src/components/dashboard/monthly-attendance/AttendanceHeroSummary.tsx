"use client";

import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { CARD_SHADOW } from "./monthlyAttendanceTypes";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function AttendanceHeroSummary() {
  const { meta, profile, clockOut, openRegularize } = useMonthlyAttendance();
  const { hours, minutes } = profile.workingHours;

  return (
    <section
      className={`relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl bg-surface-container-lowest p-6 md:flex-row ${CARD_SHADOW}`}
    >
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="z-10 flex items-center gap-6">
        <div className="relative">
          <img
            src={meta.avatar}
            alt={meta.employeeName}
            className="h-20 w-20 rounded-full border-2 border-surface-container-lowest object-cover shadow-sm"
          />
          <div
            className={`absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-surface-container-lowest ${
              profile.isClockedIn ? "bg-emerald-500" : "bg-outline-variant"
            }`}
          />
        </div>
        <div>
          <h2 className="flex flex-wrap items-center gap-2 text-h2 font-semibold text-on-surface">
            {meta.employeeName}
            <span
              className={`rounded-md border px-2 py-0.5 text-caption ${
                profile.isClockedIn
                  ? "border-emerald-200 bg-emerald-500/10 text-emerald-700"
                  : "border-outline-variant bg-surface-variant text-on-surface-variant"
              }`}
            >
              {profile.status}
            </span>
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-body-md text-on-surface-variant">
            <span className="flex items-center gap-1">
              <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
              {meta.employeeId}
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-1">
              <CategoryOutlinedIcon sx={{ fontSize: 18 }} />
              {meta.department}
            </span>
          </div>
        </div>
      </div>

      <div className="z-10 flex items-center gap-8 rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
        <div className="flex flex-col">
          <span className="mb-1 text-caption text-on-surface-variant">Today&apos;s Working Hours</span>
          <span className="flex items-baseline gap-1 text-h1 font-semibold text-primary">
            {String(hours).padStart(2, "0")}
            <span className="text-h3">h</span>
            {String(minutes).padStart(2, "0")}
            <span className="text-h3">m</span>
          </span>
          <span className="mt-1 flex items-center gap-1 text-caption text-on-surface-variant">
            <LoginOutlinedIcon sx={{ fontSize: 14 }} />
            Login: {profile.loginTime}
          </span>
        </div>
        <div className="hidden h-16 w-px bg-outline-variant/40 sm:block" />
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={clockOut}
            disabled={!profile.isClockedIn}
            className="w-32 rounded-lg bg-error py-2 text-center text-label-md text-on-error shadow-sm transition-colors hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clock Out
          </button>
          <button
            type="button"
            onClick={() => openRegularize()}
            className="w-32 rounded-lg border border-outline py-2 text-center text-label-md text-on-surface transition-colors hover:bg-surface-container"
          >
            Regularize
          </button>
        </div>
      </div>
    </section>
  );
}
