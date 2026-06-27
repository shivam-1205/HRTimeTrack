import attendanceResponse from "./attendanceData.json";

export type DayStatus = "present" | "late" | "absent" | "weekend" | "empty";
export type LogStatus = "Present" | "Late" | "Absent";
export type LiveSessionStatus = "Open" | "Closed";

export type CalendarDay = {
  day?: number;
  status: DayStatus;
  checkIn?: string;
  checkOut?: string;
  leaveStatus?: string;
  remarks?: string;
  dimmed?: boolean;
};

export type DayDetail = {
  dateLabel: string;
  dateIso: string;
  day: number;
  status: DayStatus;
  onTimeLabel: string;
  loginTime: string;
  logoutTime: string;
  liveSession: LiveSessionStatus;
  totalWorked: string;
  lateBy: string;
  leaveStatus: string;
  remarks: string;
};

export type LogRow = {
  id: string;
  date: string;
  day?: CalendarDay;
  status: LogStatus;
  firstIn: string;
  lastOut: string;
  totalHours: string;
  sessions: number;
  highlight?: boolean;
};

export type MonthData = {
  monthLabel: string;
  weekDays: string[];
  legend: { status: string; label: string; colorClass: string }[];
  days: CalendarDay[];
};

export type AttendanceApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      employeeId: string;
      employeeName: string;
      month: string;
      year: number;
    };
    filters: {
      months: { value: string; label: string }[];
      statuses: { value: string; label: string }[];
    };
    months: Record<string, MonthData>;
  };
};

const response = attendanceResponse as AttendanceApiResponse;

export const ATTENDANCE_API = response;
export const ATTENDANCE_META = response.data.meta;
export const ATTENDANCE_FILTERS = response.data.filters;
export const ATTENDANCE_MONTHS = response.data.months;

export const DEFAULT_MONTH = ATTENDANCE_FILTERS.months[0]?.value ?? "2026-06";
