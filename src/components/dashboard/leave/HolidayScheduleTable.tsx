"use client";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useHolidayCalendar } from "./context/HolidayCalendarContext";
import { statusBadgeClass } from "./holidayCalendarUtils";

export default function HolidayScheduleTable() {
  const { year, holidays, nextHero, openHolidayDetail } = useHolidayCalendar();
  const highlightId = nextHero?.holiday.id;

  return (
    <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm">
      <div className="border-b border-outline-variant bg-surface-container-lowest p-6">
        <h3 className="text-h3 font-semibold text-on-surface">Full Schedule - {year}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="w-1/4 px-6 py-4 text-label-md text-on-surface-variant">Date</th>
              <th className="w-1/3 px-6 py-4 text-label-md text-on-surface-variant">Holiday Name</th>
              <th className="w-1/4 px-6 py-4 text-label-md text-on-surface-variant">Day of Week</th>
              <th className="px-6 py-4 text-label-md text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-right text-label-md text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50 text-body-md">
            {holidays.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                  No holidays listed for {year}.
                </td>
              </tr>
            ) : (
              holidays.map((holiday) => (
                <tr
                  key={holiday.id}
                  className={`cursor-pointer transition-colors hover:bg-surface-container-low/50 ${
                    holiday.id === highlightId ? "bg-primary-container/10" : ""
                  }`}
                  onClick={() => openHolidayDetail(holiday)}
                >
                  <td className="px-6 py-4 text-on-surface">{holiday.date}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{holiday.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{holiday.dayOfWeek}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded px-2 py-1 text-caption ${statusBadgeClass(holiday.status)}`}
                    >
                      {holiday.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => openHolidayDetail(holiday)}
                      className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 bg-surface p-1.5 text-on-surface-variant transition-colors hover:border-primary/30 hover:bg-primary-container/10 hover:text-primary"
                      aria-label={`View ${holiday.name} details`}
                    >
                      <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "currentColor" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
