"use client";

import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useDashboardTracker } from "./context/DashboardTrackerContext";
import DashboardCard from "./DashboardCard";

const statusConfig = {
  active: {
    label: "Present",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600",
    pulse: true,
  },
  on_break: {
    label: "On Break",
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600",
    pulse: true,
  },
  ended: {
    label: "Day Ended",
    dot: "bg-outline",
    badge: "bg-surface-container text-on-surface-variant",
    pulse: false,
  },
} as const;

export default function LiveTrackerCard() {
  const { status, startedAtLabel, elapsedLabel, endedAt, toggleBreak, endDay, startDay } =
    useDashboardTracker();
  const config = statusConfig[status];

  return (
    <DashboardCard className="flex h-full min-h-[150px] flex-col justify-between p-6 lg:col-span-1">
      <div>
        <div className="mb-4 flex items-start justify-between gap-2">
          <h3 className="text-h3 font-semibold text-on-surface">Live Tracker</h3>
          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium ${config.badge}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${config.dot} ${config.pulse ? "animate-pulse" : ""}`}
            />
            {config.label}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-display text-4xl font-bold tracking-tight text-primary">{elapsedLabel}</p>
          <p className="mt-2 text-caption text-on-surface-variant">
            {status === "ended" && endedAt
              ? `Ended at ${endedAt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`
              : `Started at ${startedAtLabel}`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {status === "ended" ? (
          <button
            type="button"
            onClick={startDay}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-label-md font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
          >
            <WbSunnyOutlinedIcon sx={{ fontSize: 18 }} />
            Start Day
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={toggleBreak}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-label-md font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
            >
              {status === "on_break" ? (
                <>
                  <PlayCircleOutlinedIcon sx={{ fontSize: 18 }} />
                  Resume Work
                </>
              ) : (
                <>
                  <PauseCircleOutlinedIcon sx={{ fontSize: 18 }} />
                  Take a Break
                </>
              )}
            </button>
            <button
              type="button"
              onClick={endDay}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-surface-container-lowest py-3 text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-low"
            >
              <StopCircleOutlinedIcon sx={{ fontSize: 18 }} />
              End Day
            </button>
          </>
        )}
      </div>
    </DashboardCard>
  );
}
