"use client";

import { useAttendance } from "./context/AttendanceContext";
import type { CalendarDay } from "./attendanceTypes";

function DayCard({
  day,
  onSelect,
}: {
  day: CalendarDay;
  onSelect: (day: CalendarDay) => void;
}) {
  if (day.status === "empty") {
    return <div className="min-h-[88px] bg-transparent" />;
  }

  if (day.status === "weekend") {
    return (
      <div
        className={`flex min-h-[88px] flex-col justify-between rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-2 opacity-70 ${
          day.dimmed ? "opacity-30" : ""
        }`}
      >
        <div className="flex justify-end">
          <span className="text-label-md text-outline-variant">{day.day}</span>
        </div>
      </div>
    );
  }

  const statusConfig = {
    present: {
      badge: "P",
      badgeClass: "bg-primary-container text-on-primary-container",
      borderClass: "",
      inClass: "text-outline",
    },
    late: {
      badge: "L",
      badgeClass: "bg-tertiary-container text-on-tertiary-container",
      borderClass: "border-l-4 border-l-tertiary",
      inClass: "font-medium text-tertiary",
    },
    absent: {
      badge: "A",
      badgeClass: "bg-error-container text-on-error-container",
      borderClass: "border-l-4 border-l-error",
      inClass: "font-medium text-error",
    },
  }[day.status];

  const isClickable = day.status === "present" || day.status === "late" || day.status === "absent";

  return (
    <button
      type="button"
      onClick={() => isClickable && onSelect(day)}
      disabled={!isClickable}
      className={`flex min-h-[88px] w-full flex-col justify-between rounded-lg border border-outline-variant bg-surface p-2 text-left shadow-[0_2px_4px_-1px_rgba(53,37,205,0.03)] transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-default ${statusConfig.borderClass} ${
        day.dimmed ? "opacity-30" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`rounded px-1 py-0.5 text-caption font-medium ${statusConfig.badgeClass}`}
        >
          {statusConfig.badge}
        </span>
        <span className="text-label-md text-on-surface">{day.day}</span>
      </div>
      <div className="mt-auto">
        {day.status === "absent" ? (
          <div className={`text-caption ${statusConfig.inClass}`}>No Record</div>
        ) : (
          <>
            <div className={`text-caption ${statusConfig.inClass}`}>In: {day.checkIn}</div>
            <div className="text-caption text-outline">Out: {day.checkOut}</div>
          </>
        )}
      </div>
    </button>
  );
}

export default function AttendanceCalendar() {
  const { monthData, calendarDays, openDayDetail } = useAttendance();
  const { monthLabel, weekDays, legend } = monthData;

  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest p-4">
        <h3 className="text-h3 font-semibold text-on-surface">{monthLabel} Calendar</h3>
        <div className="flex gap-4 text-caption">
          {legend.map((item) => (
            <div key={item.status} className="flex items-center gap-1">
              <span className={`h-3 w-3 rounded-full ${item.colorClass}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-low/50 p-4">
        <div className="mb-1 grid grid-cols-7 gap-1">
          {weekDays.map((label, index) => (
            <div
              key={label}
              className={`py-1 text-center text-label-md ${
                index === 0 || index === 6 ? "text-outline-variant" : "text-outline"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <DayCard key={index} day={day} onSelect={openDayDetail} />
          ))}
        </div>
      </div>
    </section>
  );
}
