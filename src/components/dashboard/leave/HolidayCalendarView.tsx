"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayScheduleTable from "./HolidayScheduleTable";
import NextHolidayHero from "./NextHolidayHero";
import UpcomingHolidayCards from "./UpcomingHolidayCards";
import { HolidayCalendarModals } from "./HolidayDetailModal";
import { HolidayCalendarProvider, useHolidayCalendar } from "./context/HolidayCalendarContext";

function HolidayNotification() {
  const { notification, clearNotification } = useHolidayCalendar();
  if (!notification) return null;

  const Icon = notification.type === "success" ? CheckCircleOutlinedIcon : InfoOutlinedIcon;
  const styles =
    notification.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
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

function HolidayCalendarContent() {
  return (
    <div className="flex flex-col gap-8">
      <HolidayNotification />
      <HolidayCalendarHeader />
      <NextHolidayHero />
      <UpcomingHolidayCards />
      <HolidayScheduleTable />
      <HolidayCalendarModals />
    </div>
  );
}

export default function HolidayCalendarView() {
  return (
    <HolidayCalendarProvider>
      <HolidayCalendarContent />
    </HolidayCalendarProvider>
  );
}
