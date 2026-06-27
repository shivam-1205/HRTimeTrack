import monthlyAttendanceResponse from "./monthlyAttendanceData.json";

export const CARD_SHADOW =
  "shadow-[0_4px_12px_rgba(53,37,205,0.05)] border border-[#e7eefe]";

export type LogDetail = {
  dateLabel: string;
  onTimeLabel: string;
  loginTime: string;
  logoutTime: string;
  liveSession: "Open" | "Closed";
  totalWorked: string;
  lateBy: string;
  leaveStatus: string;
  remarks: string;
};

export type AttendanceLogRow = {
  id: string;
  date: string;
  day: string;
  dayClass?: string;
  status: string;
  statusVariant: "present" | "missing";
  clockIn: string;
  clockOut: string;
  clockOutClass?: string;
  totalHrs: string;
  action: "menu" | "fix";
  highlight?: boolean;
  detail: LogDetail;
};

export type ChartBar = {
  id: string;
  label: string;
  hours: number;
  heightPercent: number;
  logId: string | null;
  isAbsent?: boolean;
};

export type KpiStat = {
  id: string;
  label: string;
  value: string;
  subtext: string;
  subtextClass: string;
  icon: string;
  iconClass: string;
  trend?: boolean;
  alertBorder?: boolean;
  detail: string;
};

export type TimelineVariant = "success" | "default" | "pending";

export type MonthlyAttendanceApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      employeeName: string;
      employeeId: string;
      department: string;
      avatar: string;
      monthLabel: string;
    };
    profile: {
      workingHours: { hours: number; minutes: number };
      loginTime: string;
      status: string;
      isClockedIn: boolean;
      expectedClockOut: string;
    };
    alert: {
      title: string;
      message: string;
      incompleteLogs: {
        id: string;
        date: string;
        day: string;
        issue: string;
        clockIn: string;
      }[];
    };
    kpis: KpiStat[];
    chart: {
      week: { rangeLabel: string; bars: ChartBar[] };
      month: { rangeLabel: string; bars: ChartBar[] };
    };
    scores: {
      attendanceScore: number;
      attendanceMax: number;
      attendancePercent: number;
      consistency: string;
      consistencyNote: string;
    };
    todayActivity: {
      progressPercent: number;
      timeline: { id: string; label: string; time: string; variant: TimelineVariant }[];
    };
    recentLogs: AttendanceLogRow[];
    quickActions: { id: string; label: string; icon: string }[];
    upcomingHoliday: {
      name: string;
      date: string;
      note: string;
      description: string;
      type: string;
    };
    leaveTypes: string[];
    formDefaults: {
      regularizeReasons: string[];
      wfhReasons: string[];
    };
  };
};

const response = monthlyAttendanceResponse as MonthlyAttendanceApiResponse;

export const MONTHLY_ATTENDANCE_API = response;
export const OVERVIEW_META = response.data.meta;
export const OVERVIEW_PROFILE = response.data.profile;
export const OVERVIEW_ALERT = response.data.alert;
export const KPI_STATS = response.data.kpis;
export const CHART_DATA = response.data.chart;
export const OVERVIEW_SCORES = response.data.scores;
export const TODAY_ACTIVITY = response.data.todayActivity;
export const RECENT_LOGS = response.data.recentLogs;
export const UPCOMING_HOLIDAY = response.data.upcomingHoliday;
export const LEAVE_TYPES = response.data.leaveTypes;
export const FORM_DEFAULTS = response.data.formDefaults;
