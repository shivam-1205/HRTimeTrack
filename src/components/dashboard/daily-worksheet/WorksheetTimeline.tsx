"use client";

import { CARD_SHADOW } from "./dailyWorksheetTypes";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

function TimelineDot({ variant }: { variant: "success" | "active" | "upcoming" }) {
  if (variant === "success") {
    return (
      <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-surface-container-lowest" />
    );
  }
  if (variant === "active") {
    return (
      <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full bg-primary ring-4 ring-surface-container-lowest" />
    );
  }
  return (
    <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest" />
  );
}

export default function WorksheetTimeline() {
  const { timeline } = useDailyWorksheet();

  return (
    <section className={`flex flex-col rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
      <h3 className="mb-4 text-h3 font-semibold text-on-surface">Today&apos;s Timeline</h3>
      <div className="relative flex-1 space-y-6 border-l-2 border-outline-variant/30 pl-6">
        {timeline.map((item) => (
          <div
            key={item.id}
            className={`relative ${item.variant === "upcoming" ? "opacity-60" : ""}`}
          >
            <TimelineDot variant={item.variant} />
            <div className="mb-1 text-caption text-on-surface-variant">{item.time}</div>
            {item.variant === "active" ? (
              <div className="rounded-lg border border-primary/20 bg-primary-container/10 p-3">
                <div className="text-label-md font-semibold text-primary">{item.title}</div>
                {item.subtitle && (
                  <div className="mt-1 text-caption text-on-surface-variant">{item.subtitle}</div>
                )}
              </div>
            ) : (
              <div
                className={`rounded-lg border border-outline-variant/30 bg-surface p-3 ${
                  item.variant === "upcoming" ? "border-dashed" : ""
                }`}
              >
                <div className="text-label-md font-semibold text-on-surface">{item.title}</div>
                {item.subtitle && (
                  <div className="mt-1 text-caption text-on-surface-variant">{item.subtitle}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
