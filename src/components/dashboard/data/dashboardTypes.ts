import dashboardData from "./dashboardData.json";

export type AttendanceStatus = "Present" | "Late" | "Absent";

export type TrackerStatus = "active" | "on_break" | "ended";

export type AttendanceRow = {
  date: string;
  firstIn: string;
  lastOut: string;
  workedHours: string;
  status: AttendanceStatus;
};

export type Announcement = {
  id: string;
  dot: string;
  title: string;
  body: string;
  time: string;
};

export type AnalyticsStat = {
  id: string;
  label: string;
  value: string;
  sub: string;
  progress: number | null;
  progressColor: string;
  subColor: string;
  trend?: string;
  showDonut?: boolean;
  icon: "schedule" | "coffee" | "donut" | "login";
};

export type DashboardData = {
  user: {
    name: string;
    shiftLabel: string;
    shiftStart: string;
    shiftEnd: string;
  };
  liveTracker: {
    startedAt: string;
    initialElapsedSeconds: number;
    initialStatus: TrackerStatus;
  };
  analyticsMeta: {
    weeklyWorkedHours: number;
    weeklyTargetHours: number;
    baseBreakMinutes: number;
    maxBreakMinutes: number;
    attendancePercent: number;
  };
  analytics: AnalyticsStat[];
  announcements: Announcement[];
  recentAttendance: AttendanceRow[];
};

export const DASHBOARD_DATA = dashboardData as DashboardData;

export function parseTimeToday(time12h: string): Date {
  const match = time12h.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return new Date();

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function formatTime12h(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatWorkedHours(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

export function formatTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getAttendanceStatus(firstIn: Date): AttendanceStatus {
  const [shiftHour, shiftMinute] = DASHBOARD_DATA.user.shiftStart.split(":").map(Number);
  const shiftStart = new Date(firstIn);
  shiftStart.setHours(shiftHour, shiftMinute, 0, 0);

  const graceEnd = new Date(shiftStart);
  graceEnd.setMinutes(graceEnd.getMinutes() + 15);

  if (firstIn > graceEnd) return "Late";
  return "Present";
}
