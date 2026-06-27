import type { CalendarDay, DayDetail, DayStatus, LogRow, LogStatus } from "./attendanceTypes";

const OFFICE_START_MINUTES = 9 * 60; // 9:00 AM

export function parseMonthValue(value: string): { year: number; month: number } {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function time24To12(time: string): string {
  if (!time || time === "--" || time === "-") return "--";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export function minutesFromTime(time: string): number | null {
  if (!time || time === "--" || time === "-") return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0h 00m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function computeWorkedMinutes(checkIn?: string, checkOut?: string): number {
  const start = minutesFromTime(checkIn ?? "");
  const end = minutesFromTime(checkOut ?? "");
  if (start === null || end === null) return 0;
  return Math.max(0, end - start);
}

export function computeLateBy(checkIn?: string): string {
  const start = minutesFromTime(checkIn ?? "");
  if (start === null) return "—";
  const diff = start - OFFICE_START_MINUTES;
  if (diff <= 0) return "On time";
  if (diff < 60) return `${diff} min`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function buildDateLabel(year: number, month: number, day: number): string {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function buildShortDateLabel(year: number, month: number, day: number): string {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function dayStatusToLogStatus(status: DayStatus): LogStatus | null {
  if (status === "present") return "Present";
  if (status === "late") return "Late";
  if (status === "absent") return "Absent";
  return null;
}

export function dayStatusToOnTimeLabel(status: DayStatus): string {
  if (status === "present") return "On Time";
  if (status === "late") return "Late";
  if (status === "absent") return "Absent";
  return "—";
}

export function isToday(year: number, month: number, day: number, today = new Date(2026, 5, 26)): boolean {
  return (
    today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day
  );
}

export function buildDayDetail(
  day: CalendarDay,
  year: number,
  month: number,
  overrides?: Partial<DayDetail>,
): DayDetail | null {
  if (!day.day || day.status === "empty" || day.status === "weekend") return null;

  const workedMinutes = computeWorkedMinutes(day.checkIn, day.checkOut);
  const today = isToday(year, month, day.day);
  const sessionOpen = today && (!day.checkOut || day.checkOut === "--");

  return {
    dateLabel: buildDateLabel(year, month, day.day),
    dateIso: `${year}-${String(month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`,
    day: day.day,
    status: day.status,
    onTimeLabel: dayStatusToOnTimeLabel(day.status),
    loginTime: day.status === "absent" ? "—" : time24To12(day.checkIn ?? ""),
    logoutTime: day.status === "absent" ? "—" : time24To12(day.checkOut ?? "--"),
    liveSession: sessionOpen ? "Open" : "Closed",
    totalWorked: day.status === "absent" ? "0h 00m" : formatDuration(workedMinutes),
    lateBy: day.status === "absent" ? "—" : computeLateBy(day.checkIn),
    leaveStatus: day.leaveStatus ?? "No leave",
    remarks: day.remarks ?? "—",
    ...overrides,
  };
}

export function buildLogRecordsFromCalendar(
  days: CalendarDay[],
  year: number,
  month: number,
): LogRow[] {
  const rows: LogRow[] = [];

  days.forEach((day) => {
    if (!day.day) return;
    const logStatus = dayStatusToLogStatus(day.status);
    if (!logStatus) return;

    const workedMinutes = computeWorkedMinutes(day.checkIn, day.checkOut);
    const today = isToday(year, month, day.day);

    rows.push({
      id: `${year}-${month}-${day.day}`,
      date: buildShortDateLabel(year, month, day.day),
      day,
      status: logStatus,
      firstIn: day.status === "absent" ? "-" : time24To12(day.checkIn ?? ""),
      lastOut:
        day.status === "absent"
          ? "-"
          : day.checkOut && day.checkOut !== "--"
            ? time24To12(day.checkOut)
            : "--",
      totalHours: day.status === "absent" ? "0h 00m" : formatDuration(workedMinutes),
      sessions: day.status === "absent" ? 0 : 1,
      highlight: logStatus === "Late",
    });
  });

  return rows.sort((a, b) => (b.day?.day ?? 0) - (a.day?.day ?? 0));
}

export function filterCalendarDays(
  days: CalendarDay[],
  statusFilter: string,
): CalendarDay[] {
  if (statusFilter === "all") return days;
  return days.map((day) => {
    if (day.status === "empty" || day.status === "weekend") return day;
    if (day.status === statusFilter) return day;
    return { ...day, dimmed: true };
  });
}

export function filterLogRecords(
  records: LogRow[],
  statusFilter: string,
  searchQuery: string,
): LogRow[] {
  let filtered = records;

  if (statusFilter !== "all") {
    const statusMap: Record<string, LogStatus> = {
      present: "Present",
      late: "Late",
      absent: "Absent",
    };
    const target = statusMap[statusFilter];
    filtered = filtered.filter((r) => r.status === target);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.date.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.firstIn.toLowerCase().includes(q) ||
        r.lastOut.toLowerCase().includes(q) ||
        r.totalHours.toLowerCase().includes(q),
    );
  }

  return filtered;
}

export function paginateRecords<T>(records: T[], page: number, pageSize: number) {
  const total = records.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const items = records.slice(start, end);

  return {
    items,
    page: safePage,
    pageSize,
    total,
    totalPages,
    label:
      total === 0
        ? "No records found"
        : `Showing ${start + 1}-${end} of ${total} records`,
  };
}

export function exportRecordsCsv(records: LogRow[], monthLabel: string) {
  const headers = ["Date", "Status", "First In", "Last Out", "Total Hours", "Sessions"];
  const rows = records.map((r) => [
    r.date,
    r.status,
    r.firstIn,
    r.lastOut,
    r.totalHours,
    String(r.sessions),
  ]);
  const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `attendance-${monthLabel.replace(/\s+/g, "-").toLowerCase()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function statusFilterMatchesDay(day: CalendarDay, statusFilter: string): boolean {
  if (statusFilter === "all") return true;
  if (day.status === "empty" || day.status === "weekend") return true;
  return day.status === statusFilter;
}
