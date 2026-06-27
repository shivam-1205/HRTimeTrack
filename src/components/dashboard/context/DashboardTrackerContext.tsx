"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DASHBOARD_DATA,
  formatDuration,
  formatTime12h,
  formatTodayDate,
  formatWorkedHours,
  getAttendanceStatus,
  parseTimeToday,
  type AttendanceRow,
  type TrackerStatus,
} from "../data/dashboardTypes";

type DashboardTrackerContextValue = {
  status: TrackerStatus;
  startedAtLabel: string;
  elapsedSeconds: number;
  elapsedLabel: string;
  breakSeconds: number;
  endedAt: Date | null;
  toggleBreak: () => void;
  endDay: () => void;
  startDay: () => void;
  recentAttendance: AttendanceRow[];
};

const DashboardTrackerContext = createContext<DashboardTrackerContextValue | null>(null);

export function DashboardTrackerProvider({ children }: { children: ReactNode }) {
  const { liveTracker } = DASHBOARD_DATA;

  const [startedAt, setStartedAt] = useState(() => parseTimeToday(liveTracker.startedAt));
  const [startedAtLabel, setStartedAtLabel] = useState(liveTracker.startedAt);
  const [status, setStatus] = useState<TrackerStatus>(liveTracker.initialStatus);
  const [elapsedSeconds, setElapsedSeconds] = useState(liveTracker.initialElapsedSeconds);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [endedAt, setEndedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (status !== "active") return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "on_break") return;

    const interval = window.setInterval(() => {
      setBreakSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [status]);

  const toggleBreak = useCallback(() => {
    if (status === "ended") return;
    setStatus((prev) => (prev === "on_break" ? "active" : "on_break"));
  }, [status]);

  const endDay = useCallback(() => {
    if (status === "ended") return;
    setStatus("ended");
    setEndedAt(new Date());
  }, [status]);

  const startDay = useCallback(() => {
    const now = new Date();
    setStartedAt(now);
    setStartedAtLabel(formatTime12h(now));
    setElapsedSeconds(0);
    setBreakSeconds(0);
    setEndedAt(null);
    setStatus("active");
  }, []);

  const todayAttendance = useMemo((): AttendanceRow => {
    return {
      date: formatTodayDate(),
      firstIn: formatTime12h(startedAt),
      lastOut: endedAt ? formatTime12h(endedAt) : "--",
      workedHours: formatWorkedHours(elapsedSeconds),
      status: getAttendanceStatus(startedAt),
    };
  }, [startedAt, endedAt, elapsedSeconds]);

  const recentAttendance = useMemo(
    () => [todayAttendance, ...DASHBOARD_DATA.recentAttendance],
    [todayAttendance],
  );

  const value = useMemo(
    (): DashboardTrackerContextValue => ({
      status,
      startedAtLabel,
      elapsedSeconds,
      elapsedLabel: formatDuration(elapsedSeconds),
      breakSeconds,
      endedAt,
      toggleBreak,
      endDay,
      startDay,
      recentAttendance,
    }),
    [
      status,
      startedAtLabel,
      elapsedSeconds,
      breakSeconds,
      endedAt,
      toggleBreak,
      endDay,
      startDay,
      recentAttendance,
    ],
  );

  return (
    <DashboardTrackerContext.Provider value={value}>{children}</DashboardTrackerContext.Provider>
  );
}

export function useDashboardTracker() {
  const context = useContext(DashboardTrackerContext);
  if (!context) {
    throw new Error("useDashboardTracker must be used within DashboardTrackerProvider");
  }
  return context;
}
