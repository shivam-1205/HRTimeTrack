import type { AttendanceLogRow } from "./monthlyAttendanceTypes";

export function exportOverviewCsv(logs: AttendanceLogRow[], monthLabel: string) {
  const headers = ["Date", "Day", "Status", "Clock In", "Clock Out", "Total Hours"];
  const rows = logs.map((r) => [
    r.date,
    r.day,
    r.status,
    r.clockIn,
    r.clockOut,
    r.totalHrs,
  ]);
  const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `attendance-overview-${monthLabel.replace(/\s+/g, "-").toLowerCase()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function formatClockOutNow(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function computeWorkedFromLogin(loginTime: string, hours: number, minutes: number): string {
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

export function findLogById(logs: AttendanceLogRow[], id: string | null): AttendanceLogRow | null {
  if (!id) return null;
  return logs.find((l) => l.id === id) ?? null;
}

export function barClassName(bar: { isAbsent?: boolean; hours: number }): string {
  if (bar.isAbsent) return "bg-error/40 group-hover:bg-error cursor-pointer";
  if (bar.hours === 0) return "bg-outline-variant/30";
  if (bar.hours >= 9) return "bg-primary/90 group-hover:bg-primary cursor-pointer";
  if (bar.hours >= 7) return "bg-primary/60 group-hover:bg-primary cursor-pointer";
  return "bg-primary/40 group-hover:bg-primary cursor-pointer";
}
