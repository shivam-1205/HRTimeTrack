"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  HOLIDAY_META,
  HOLIDAY_YEARS,
  type Holiday,
  type NextHolidayHero,
} from "../holidayCalendarTypes";
import {
  exportHolidaysCsv,
  getHolidaysForYear,
  getNextHoliday,
  getUpcomingHolidays,
  getYearStats,
} from "../holidayCalendarUtils";

type Notification = { type: "success" | "info"; message: string };

type HolidayCalendarContextValue = {
  meta: typeof HOLIDAY_META;
  years: typeof HOLIDAY_YEARS;
  year: number;
  holidays: Holiday[];
  nextHero: NextHolidayHero | null;
  upcomingCards: Holiday[];
  yearStats: ReturnType<typeof getYearStats>;
  selectedHoliday: Holiday | null;
  notification: Notification | null;
  setYear: (year: number) => void;
  openHolidayDetail: (holiday: Holiday) => void;
  closeHolidayDetail: () => void;
  exportSchedule: () => void;
  addToCalendar: (holiday: Holiday) => void;
  clearNotification: () => void;
};

const HolidayCalendarContext = createContext<HolidayCalendarContextValue | null>(null);

export function HolidayCalendarProvider({ children }: { children: ReactNode }) {
  const [year, setYearState] = useState(HOLIDAY_META.defaultYear);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const holidays = useMemo(() => getHolidaysForYear(year), [year]);
  const nextHero = useMemo(() => getNextHoliday(year), [year]);
  const upcomingCards = useMemo(() => getUpcomingHolidays(year, 3), [year]);
  const yearStats = useMemo(() => getYearStats(year), [year]);

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 3500);
  }, []);

  const setYear = useCallback(
    (nextYear: number) => {
      setYearState(nextYear);
      showNotification("info", `Showing holidays for ${nextYear}`);
    },
    [showNotification],
  );

  const openHolidayDetail = useCallback((holiday: Holiday) => {
    setSelectedHoliday(holiday);
  }, []);

  const closeHolidayDetail = useCallback(() => setSelectedHoliday(null), []);

  const exportSchedule = useCallback(() => {
    exportHolidaysCsv(holidays, year);
    showNotification("success", `Holiday schedule for ${year} exported.`);
  }, [holidays, year, showNotification]);

  const addToCalendar = useCallback(
    (holiday: Holiday) => {
      const title = encodeURIComponent(holiday.name);
      const details = encodeURIComponent(holiday.description);
      const start = holiday.dateIso.replace(/-/g, "");
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${start}&details=${details}`;
      window.open(url, "_blank", "noopener,noreferrer");
      showNotification("success", `Added ${holiday.name} to calendar.`);
    },
    [showNotification],
  );

  const value = useMemo(
    (): HolidayCalendarContextValue => ({
      meta: HOLIDAY_META,
      years: HOLIDAY_YEARS,
      year,
      holidays,
      nextHero,
      upcomingCards,
      yearStats,
      selectedHoliday,
      notification,
      setYear,
      openHolidayDetail,
      closeHolidayDetail,
      exportSchedule,
      addToCalendar,
      clearNotification: () => setNotification(null),
    }),
    [
      year,
      holidays,
      nextHero,
      upcomingCards,
      yearStats,
      selectedHoliday,
      notification,
      setYear,
      openHolidayDetail,
      closeHolidayDetail,
      exportSchedule,
      addToCalendar,
    ],
  );

  return (
    <HolidayCalendarContext.Provider value={value}>{children}</HolidayCalendarContext.Provider>
  );
}

export function useHolidayCalendar() {
  const context = useContext(HolidayCalendarContext);
  if (!context) {
    throw new Error("useHolidayCalendar must be used within HolidayCalendarProvider");
  }
  return context;
}
