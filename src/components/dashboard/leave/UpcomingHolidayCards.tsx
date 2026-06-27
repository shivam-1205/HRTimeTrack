"use client";

import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import type { ReactNode } from "react";
import type { Holiday } from "./holidayCalendarTypes";
import { useHolidayCalendar } from "./context/HolidayCalendarContext";

function getCardConfig(holiday: Holiday): {
  icon: ReactNode;
  iconClass: string;
  footerClass: string;
  footerIcon: ReactNode;
  footerLabel: string;
} {
  if (holiday.name.includes("Christmas")) {
    return {
      icon: <RedeemOutlinedIcon sx={{ fontSize: 24 }} />,
      iconClass: "bg-secondary-container/20 text-secondary",
      footerClass: "text-secondary",
      footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
      footerLabel: "Paid Holiday",
    };
  }

  if (holiday.name.includes("New Year")) {
    return {
      icon: <CelebrationOutlinedIcon sx={{ fontSize: 24 }} />,
      iconClass: "bg-primary-container/20 text-primary",
      footerClass: "text-primary",
      footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
      footerLabel: "Paid Holiday",
    };
  }

  if (holiday.status === "floating") {
    return {
      icon: <PublicOutlinedIcon sx={{ fontSize: 24 }} />,
      iconClass: "bg-amber-500/10 text-amber-600",
      footerClass: "text-amber-600",
      footerIcon: <EventAvailableOutlinedIcon sx={{ fontSize: 16 }} />,
      footerLabel: "Floating Holiday Eligible",
    };
  }

  return {
    icon: <PublicOutlinedIcon sx={{ fontSize: 24 }} />,
    iconClass: "bg-surface-variant text-on-surface-variant",
    footerClass: "text-on-surface-variant",
    footerIcon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
    footerLabel: "Paid Holiday",
  };
}

export default function UpcomingHolidayCards() {
  const { upcomingCards, openHolidayDetail } = useHolidayCalendar();

  if (upcomingCards.length === 0) {
    return (
      <p className="text-center text-body-md text-on-surface-variant">No more upcoming holidays this year.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {upcomingCards.map((holiday) => {
        const config = getCardConfig(holiday);

        return (
          <button
            key={holiday.id}
            type="button"
            onClick={() => openHolidayDetail(holiday)}
            className="rounded-lg border border-outline-variant bg-surface p-6 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${config.iconClass}`}>
                {config.icon}
              </div>
              <span className="text-caption text-on-surface-variant">{holiday.shortDate}</span>
            </div>
            <h3 className="mb-1 text-h3 font-semibold text-on-surface">{holiday.name}</h3>
            <p className="text-body-md text-on-surface-variant">{holiday.dayOfWeek}</p>
            <div className="mt-4 border-t border-outline-variant/50 pt-4">
              <span className={`inline-flex items-center gap-1 text-label-md ${config.footerClass}`}>
                {config.footerIcon}
                {config.footerLabel}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
