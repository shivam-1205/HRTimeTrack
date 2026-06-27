"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttendanceAlertBanner from "./AttendanceAlertBanner";
import AttendanceHeroSummary from "./AttendanceHeroSummary";
import AttendanceKpiCards from "./AttendanceKpiCards";
import AttendanceOverviewHeader from "./AttendanceOverviewHeader";
import QuickActionsPanel from "./QuickActionsPanel";
import RecentAttendanceLogs from "./RecentAttendanceLogs";
import TodaysActivity from "./TodaysActivity";
import UpcomingHolidayWidget from "./UpcomingHolidayWidget";
import WorkingHoursTrend from "./WorkingHoursTrend";
import OverviewModals from "./OverviewModals";
import { MonthlyAttendanceProvider, useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

function OverviewNotification() {
  const { notification, clearNotification } = useMonthlyAttendance();
  if (!notification) return null;

  const Icon = notification.type === "success" ? CheckCircleOutlinedIcon : InfoOutlinedIcon;
  const styles =
    notification.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : notification.type === "error"
        ? "border-red-200 bg-red-50 text-red-800"
        : "border-blue-200 bg-blue-50 text-blue-800";

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles}`}>
      <div className="flex items-center gap-2">
        <Icon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button type="button" onClick={clearNotification} className="text-caption underline opacity-70 hover:opacity-100">
        Dismiss
      </button>
    </div>
  );
}

function MonthlyAttendanceContent() {
  return (
    <div className="flex flex-col gap-8">
      <OverviewNotification />
      <AttendanceOverviewHeader />
      <AttendanceHeroSummary />
      <AttendanceAlertBanner />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <AttendanceKpiCards />
          <WorkingHoursTrend />
          <RecentAttendanceLogs />
        </div>
        <div className="flex flex-col gap-8 lg:col-span-4">
          <TodaysActivity />
          <QuickActionsPanel />
          <UpcomingHolidayWidget />
        </div>
      </div>

      <OverviewModals />
    </div>
  );
}

export default function MonthlyAttendanceView() {
  return (
    <MonthlyAttendanceProvider>
      <MonthlyAttendanceContent />
    </MonthlyAttendanceProvider>
  );
}
