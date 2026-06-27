"use client";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { CARD_SHADOW } from "./monthlyAttendanceTypes";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function UpcomingHolidayWidget() {
  const { upcomingHoliday, openHolidayDetail } = useMonthlyAttendance();

  return (
    <button
      type="button"
      onClick={openHolidayDetail}
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary-fixed to-surface-container p-6 text-left transition-transform hover:scale-[1.01] ${CARD_SHADOW}`}
    >
      <div className="pointer-events-none absolute -top-4 -right-4 opacity-10">
        <CelebrationOutlinedIcon sx={{ fontSize: 120 }} />
      </div>
      <div className="relative z-10">
        <h3 className="mb-2 text-h3 font-semibold text-on-primary-fixed">Upcoming Holiday</h3>
        <div className="rounded-lg border border-surface-container-lowest bg-surface-container-lowest/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="text-h2 font-bold text-primary">{upcomingHoliday.name}</div>
          <div className="mt-1 flex items-center gap-1 text-body-md text-on-surface">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
            {upcomingHoliday.date}
          </div>
          <div className="mt-2 inline-block rounded-md bg-surface-container-highest px-2 py-1 text-caption text-on-surface-variant">
            {upcomingHoliday.note}
          </div>
        </div>
      </div>
    </button>
  );
}
