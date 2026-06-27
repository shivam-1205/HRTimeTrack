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
  ATTENDANCE_FILTERS,
  ATTENDANCE_META,
  ATTENDANCE_MONTHS,
  DEFAULT_MONTH,
  type CalendarDay,
  type DayDetail,
  type LogRow,
  type MonthData,
} from "../attendanceTypes";
import {
  buildDayDetail,
  buildLogRecordsFromCalendar,
  exportRecordsCsv,
  filterCalendarDays,
  filterLogRecords,
  paginateRecords,
  parseMonthValue,
} from "../attendanceUtils";

type Notification = { type: "success" | "info"; message: string };

type AttendanceContextValue = {
  meta: typeof ATTENDANCE_META;
  filters: typeof ATTENDANCE_FILTERS;
  monthValue: string;
  statusFilter: string;
  searchQuery: string;
  monthData: MonthData;
  calendarDays: CalendarDay[];
  allRecords: LogRow[];
  paginatedRecords: LogRow[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    label: string;
  };
  selectedDay: DayDetail | null;
  notification: Notification | null;
  setMonthValue: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
  openDayDetail: (day: CalendarDay) => void;
  closeDayDetail: () => void;
  openLogDetail: (record: LogRow) => void;
  goToPage: (page: number) => void;
  exportReport: () => void;
  clearNotification: () => void;
};

const AttendanceContext = createContext<AttendanceContextValue | null>(null);

const PAGE_SIZE = 5;

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [monthValue, setMonthValueState] = useState(DEFAULT_MONTH);
  const [statusFilter, setStatusFilterState] = useState("all");
  const [searchQuery, setSearchQueryState] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDay, setSelectedDay] = useState<DayDetail | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const { year, month } = parseMonthValue(monthValue);
  const monthData = ATTENDANCE_MONTHS[monthValue] ?? ATTENDANCE_MONTHS[DEFAULT_MONTH];

  const allRecords = useMemo(
    () => buildLogRecordsFromCalendar(monthData.days, year, month),
    [monthData.days, year, month],
  );

  const filteredRecords = useMemo(
    () => filterLogRecords(allRecords, statusFilter, searchQuery),
    [allRecords, statusFilter, searchQuery],
  );

  const paginationResult = useMemo(
    () => paginateRecords(filteredRecords, page, PAGE_SIZE),
    [filteredRecords, page],
  );

  const calendarDays = useMemo(
    () => filterCalendarDays(monthData.days, statusFilter),
    [monthData.days, statusFilter],
  );

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 3500);
  }, []);

  const setMonthValue = useCallback((value: string) => {
    setMonthValueState(value);
    setPage(1);
    setSelectedDay(null);
    showNotification("info", `Showing attendance for ${ATTENDANCE_MONTHS[value]?.monthLabel ?? value}`);
  }, [showNotification]);

  const setStatusFilter = useCallback((value: string) => {
    setStatusFilterState(value);
    setPage(1);
  }, []);

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value);
    setPage(1);
  }, []);

  const openDayDetail = useCallback(
    (day: CalendarDay) => {
      const detail = buildDayDetail(day, year, month);
      if (!detail) return;
      setSelectedDay(detail);
    },
    [year, month],
  );

  const openLogDetail = useCallback(
    (record: LogRow) => {
      if (!record.day) return;
      openDayDetail(record.day);
    },
    [openDayDetail],
  );

  const closeDayDetail = useCallback(() => setSelectedDay(null), []);

  const goToPage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const exportReport = useCallback(() => {
    exportRecordsCsv(filteredRecords, monthData.monthLabel);
    showNotification("success", "Attendance report exported.");
  }, [filteredRecords, monthData.monthLabel, showNotification]);

  const value = useMemo(
    (): AttendanceContextValue => ({
      meta: ATTENDANCE_META,
      filters: ATTENDANCE_FILTERS,
      monthValue,
      statusFilter,
      searchQuery,
      monthData,
      calendarDays,
      allRecords,
      paginatedRecords: paginationResult.items,
      pagination: {
        page: paginationResult.page,
        pageSize: paginationResult.pageSize,
        total: paginationResult.total,
        totalPages: paginationResult.totalPages,
        label: paginationResult.label,
      },
      selectedDay,
      notification,
      setMonthValue,
      setStatusFilter,
      setSearchQuery,
      openDayDetail,
      closeDayDetail,
      openLogDetail,
      goToPage,
      exportReport,
      clearNotification: () => setNotification(null),
    }),
    [
      monthValue,
      statusFilter,
      searchQuery,
      monthData,
      calendarDays,
      allRecords,
      paginationResult,
      selectedDay,
      notification,
      setMonthValue,
      setStatusFilter,
      setSearchQuery,
      openDayDetail,
      closeDayDetail,
      openLogDetail,
      goToPage,
      exportReport,
    ],
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error("useAttendance must be used within AttendanceProvider");
  }
  return context;
}
