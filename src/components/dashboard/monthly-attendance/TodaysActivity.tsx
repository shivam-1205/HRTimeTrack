"use client";

import { CARD_SHADOW } from "./monthlyAttendanceTypes";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

function TimelineDot({ variant }: { variant: "success" | "default" | "pending" }) {
  if (variant === "success") {
    return (
      <div className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-surface-container-lowest bg-emerald-500" />
    );
  }
  if (variant === "pending") {
    return (
      <div className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-surface-container-lowest bg-outline" />
    );
  }
  return (
    <div className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-surface-container-lowest bg-outline-variant" />
  );
}

export default function TodaysActivity() {
  const { todayActivity } = useMonthlyAttendance();
  const { progressPercent, timeline } = todayActivity;
  const offset = 282.7 - (282.7 * progressPercent) / 100;

  return (
    <section className={`rounded-xl bg-surface-container-lowest p-6 ${CARD_SHADOW}`}>
      <h3 className="mb-4 text-h3 font-semibold text-on-surface">Today&apos;s Activity</h3>

      <div className="mb-4 flex items-center justify-center border-b border-outline-variant/20 py-4">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="#dce2f3" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#3525cd"
              strokeWidth="8"
              strokeDasharray="282.7"
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-h2 font-semibold text-on-surface">{progressPercent}%</span>
            <span className="text-caption text-on-surface-variant">Spent</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 pl-2">
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-outline-variant/40" />
        {timeline.map((item, index) => (
          <div
            key={item.id}
            className={`relative mb-4 flex gap-4 ${item.variant === "pending" ? "opacity-50" : ""} ${
              index === timeline.length - 1 ? "mb-0" : ""
            }`}
          >
            <TimelineDot variant={item.variant} />
            <div>
              <div className="text-label-md text-on-surface">{item.label}</div>
              <div className="text-caption text-on-surface-variant">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
