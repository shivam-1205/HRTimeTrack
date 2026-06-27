"use client";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { CARD_SHADOW } from "./dailyWorksheetTypes";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

export default function WeeklyHoursChart() {
  const { weeklyDays, weekLabel, targetHours } = useDailyWorksheet();
  const maxHours = Math.max(targetHours, ...weeklyDays.map((d) => d.hours), 1);

  return (
    <article className={`flex flex-col rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChartOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
          <h3 className="text-h3 font-semibold text-on-surface">Weekly Hours Analytics</h3>
        </div>
        <span className="text-caption text-on-surface-variant">{weekLabel}</span>
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 px-1 pt-2" style={{ minHeight: 160 }}>
        {weeklyDays.map((day) => {
          const heightPct = day.hours > 0 ? (day.hours / maxHours) * 100 : 4;
          const targetPct = (targetHours / maxHours) * 100;

          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[11px] font-medium text-on-surface-variant">
                {day.hours > 0 ? `${day.hours}h` : "—"}
              </span>
              <div className="relative flex h-28 w-full items-end justify-center">
                <div
                  className="absolute bottom-0 w-full border-t border-dashed border-outline-variant/50"
                  style={{ bottom: `${targetPct}%` }}
                  title={`Target: ${targetHours}h`}
                />
                <div
                  className={`w-full max-w-[36px] rounded-t-md transition-all duration-500 ${
                    day.isToday
                      ? "bg-primary"
                      : day.hours >= targetHours
                        ? "bg-emerald-500"
                        : day.hours > 0
                          ? "bg-secondary"
                          : "bg-outline-variant/30"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span
                className={`text-caption font-medium ${
                  day.isToday ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-outline-variant/20 pt-3 text-caption text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
          Target met
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0 w-4 border-t border-dashed border-outline-variant" />
          {targetHours}h target
        </span>
      </div>
    </article>
  );
}
