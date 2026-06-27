"use client";

import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { CARD_SHADOW } from "./dailyWorksheetTypes";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

export default function WorksheetKpiSection() {
  const { kpis } = useDailyWorksheet();
  const { loggedHours, completed, inProgress, productivityScore, dailyGoal } = kpis;
  const goalOffset = 251.2 - (251.2 * dailyGoal.percent) / 100;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:col-span-8">
        <article className={`flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
          <div className="mb-2 flex items-start justify-between">
            <span className="text-caption uppercase tracking-wider text-on-surface-variant">
              Logged Hours
            </span>
            <ScheduleOutlinedIcon className="text-secondary" sx={{ fontSize: 20 }} />
          </div>
          <div>
            <div className="text-h1 font-semibold text-on-surface">
              {loggedHours.current}
              <span className="text-h3 font-normal text-on-surface-variant">/{loggedHours.target}h</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-caption text-emerald-600">
              <ArrowUpwardOutlinedIcon sx={{ fontSize: 14 }} />
              {loggedHours.trendLabel}
            </div>
          </div>
        </article>

        <article className={`flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
          <div className="mb-2 flex items-start justify-between">
            <span className="text-caption uppercase tracking-wider text-on-surface-variant">
              Completed
            </span>
            <TaskAltOutlinedIcon className="text-emerald-600" sx={{ fontSize: 20 }} />
          </div>
          <div>
            <div className="text-h1 font-semibold text-on-surface">{completed.count}</div>
            <div className="mt-1 text-caption text-on-surface-variant">{completed.label}</div>
          </div>
        </article>

        <article className={`flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
          <div className="mb-2 flex items-start justify-between">
            <span className="text-caption uppercase tracking-wider text-on-surface-variant">
              In Progress
            </span>
            <PendingActionsOutlinedIcon className="text-amber-600" sx={{ fontSize: 20 }} />
          </div>
          <div>
            <div className="text-h1 font-semibold text-on-surface">{inProgress.count}</div>
            <div className="mt-1 text-caption text-amber-600">{inProgress.note}</div>
          </div>
        </article>

        <article
          className={`relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary-container p-4 ${CARD_SHADOW}`}
        >
          <div className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10 mb-2 flex items-start justify-between">
            <span className="text-caption uppercase tracking-wider text-on-primary-container">
              Prod. Score
            </span>
            <SpeedOutlinedIcon className="text-on-primary-container" sx={{ fontSize: 20 }} />
          </div>
          <div className="relative z-10">
            <div className="text-h1 font-semibold text-on-primary-container">
              {productivityScore.value}<span className="text-h3 font-normal">%</span>
            </div>
            <div className="mt-1 text-caption text-on-primary-container/80">{productivityScore.label}</div>
          </div>
        </article>
      </div>

      <article
        className={`flex items-center gap-6 rounded-xl bg-surface-container-lowest p-4 lg:col-span-4 ${CARD_SHADOW}`}
      >
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-surface-container-high"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset={goalOffset}
              className="text-primary"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-h3 font-bold text-on-surface">{dailyGoal.percent}%</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-h3 font-semibold text-on-surface">Daily Goal</h3>
          <p className="mb-3 text-caption text-on-surface-variant">
            {dailyGoal.remainingHours} hours remaining to hit target.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {Array.from({ length: dailyGoal.streakDays }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className="z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-100"
                  style={{ zIndex: 40 - day * 10 }}
                >
                  <CheckOutlinedIcon className="text-emerald-700" sx={{ fontSize: 12 }} />
                </div>
              ))}
            </div>
            <span className="text-caption text-on-surface-variant">{dailyGoal.streakDays} day streak 🔥</span>
          </div>
        </div>
      </article>
    </div>
  );
}
