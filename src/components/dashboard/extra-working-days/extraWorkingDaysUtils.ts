import type {
  ExtraDayRequest,
  ExtraDayStatus,
  ExtraWorkingDayRow,
  ReasonType,
  StatusCounts,
  StatusFilter,
} from "./extraWorkingDaysTypes";

const REASON_LABELS: Record<ReasonType, string> = {
  holiday: "Public Holiday",
  weekend: "Weekend (Sat/Sun)",
  medical: "Emergency / On-call",
  casual: "Other",
};

export function computeStatusCounts(rows: ExtraWorkingDayRow[]): StatusCounts {
  return {
    approved: rows.filter((r) => r.status === "approved").length,
    pending: rows.filter((r) => r.status === "pending").length,
    onHold: rows.filter((r) => r.status === "on_hold").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
  };
}

export function filterByStatus(rows: ExtraWorkingDayRow[], filter: StatusFilter): ExtraWorkingDayRow[] {
  if (filter === "all") return rows;
  return rows.filter((r) => r.status === filter);
}

export function statusToTone(status: ExtraDayStatus): "success" | "warning" | "info" | "danger" {
  const map: Record<ExtraDayStatus, "success" | "warning" | "info" | "danger"> = {
    approved: "success",
    pending: "warning",
    on_hold: "info",
    rejected: "danger",
  };
  return map[status];
}

export function statusLabel(status: ExtraDayStatus): string {
  const map: Record<ExtraDayStatus, string> = {
    approved: "Approved",
    pending: "Pending",
    on_hold: "On Hold",
    rejected: "Rejected",
  };
  return map[status];
}

export function parseHoursFromTimes(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "—";
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  if (mins <= 0) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function time24To12(time: string): string {
  if (!time) return "—";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate + "T12:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${formatted} (${day})`;
}

export function requestToRow(request: ExtraDayRequest): ExtraWorkingDayRow {
  const totalHours = parseHoursFromTimes(request.startTime, request.endTime);
  const date = new Date(request.date + "T12:00:00");
  const dayLabel = date.toLocaleDateString("en-US", { weekday: "long" });

  return {
    id: `ewd-${crypto.randomUUID()}`,
    date: formatDisplayDate(request.date),
    dateIso: request.date,
    dayLabel,
    reason: REASON_LABELS[request.reasonType] ?? request.reasonType,
    reasonType: request.reasonType,
    note: request.note,
    status: "pending",
    clockIn: time24To12(request.startTime),
    clockOut: time24To12(request.endTime),
    totalHours,
    workType: request.workType,
    submittedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reviewedBy: null,
    remarks: request.note,
  };
}

export function validateRequest(request: ExtraDayRequest): string | null {
  if (!request.date) return "Date is required";
  if (!request.reasonType) return "Reason is required";
  if (!request.workType) return "Work type is required";
  if (!request.startTime || !request.endTime) return "Start and end time are required";
  if (!request.note.trim()) return "Your note is required";
  const [sh, sm] = request.startTime.split(":").map(Number);
  const [eh, em] = request.endTime.split(":").map(Number);
  if (eh * 60 + em <= sh * 60 + sm) return "End time must be after start time";
  return null;
}

export function exportExtraDaysCsv(rows: ExtraWorkingDayRow[]) {
  const headers = ["Date", "Reason", "Note", "Status", "Clock In", "Clock Out", "Total Hours", "Work Type"];
  const data = rows.map((r) => [
    r.date,
    r.reason,
    r.note,
    statusLabel(r.status),
    r.clockIn,
    r.clockOut,
    r.totalHours,
    r.workType,
  ]);
  const csv = [headers, ...data].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "extra-working-days.csv";
  link.click();
  URL.revokeObjectURL(url);
}
