"use client";

import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { useMemo } from "react";
import { AnalyticsDonut, AnalyticsProgress } from "./AnalyticsChart";
import { useDashboardTracker } from "./context/DashboardTrackerContext";
import { DASHBOARD_DATA } from "./data/dashboardTypes";
import DashboardCard from "./DashboardCard";

const iconMap: Record<string, SvgIconComponent> = {
  schedule: ScheduleOutlinedIcon,
  coffee: CoffeeOutlinedIcon,
  donut: DonutLargeOutlinedIcon,
  login: LoginOutlinedIcon,
};

export default function AnalyticsGrid() {
  const { elapsedSeconds, breakSeconds } = useDashboardTracker();
  const { analyticsMeta } = DASHBOARD_DATA;

  const stats = useMemo(() => {
    const todayHours = elapsedSeconds / 3600;
    const totalWorkedHours = analyticsMeta.weeklyWorkedHours + todayHours;
    const workedProgress = (totalWorkedHours / analyticsMeta.weeklyTargetHours) * 100;

    const breakMins = analyticsMeta.baseBreakMinutes + Math.floor(breakSeconds / 60);
    const breakProgress = (breakMins / analyticsMeta.maxBreakMinutes) * 100;

    return DASHBOARD_DATA.analytics.map((stat) => {
      if (stat.id === "total-worked") {
        return {
          ...stat,
          value: `${totalWorkedHours.toFixed(1)} hrs`,
          progress: workedProgress,
        };
      }
      if (stat.id === "break-time") {
        return {
          ...stat,
          value: `${breakMins} mins`,
          progress: breakProgress,
        };
      }
      if (stat.id === "attendance") {
        return {
          ...stat,
          value: `${analyticsMeta.attendancePercent}%`,
          donutPercent: analyticsMeta.attendancePercent,
        };
      }
      return stat;
    });
  }, [elapsedSeconds, breakSeconds, analyticsMeta]);

  return (
    <div className="grid grid-cols-2 gap-4 lg:col-span-2">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        const donutPercent = "donutPercent" in stat ? stat.donutPercent : undefined;

        return (
          <DashboardCard key={stat.id} className="flex min-h-[188px] flex-col p-4">
            <div className="mb-2 flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Icon sx={{ fontSize: 20 }} className="text-on-surface-variant" />
                <h4 className="text-label-md font-medium text-on-surface">{stat.label}</h4>
              </div>
              {stat.trend && (
                <span className="flex items-center text-caption font-medium text-emerald-600">
                  <ArrowUpwardOutlinedIcon sx={{ fontSize: 14 }} />
                  {stat.trend}
                </span>
              )}
            </div>

            <div className={`${stat.showDonut ? "flex items-end justify-between" : ""} mt-auto`}>
              <div>
                <p className="text-h2 font-semibold text-on-surface">{stat.value}</p>
                <p className={`text-caption ${stat.subColor}`}>{stat.sub}</p>
              </div>
              {stat.showDonut && typeof donutPercent === "number" && (
                <AnalyticsDonut percent={donutPercent} />
              )}
            </div>

            {stat.progress !== null && (
              <AnalyticsProgress percent={stat.progress} colorClass={stat.progressColor} />
            )}
          </DashboardCard>
        );
      })}
    </div>
  );
}
