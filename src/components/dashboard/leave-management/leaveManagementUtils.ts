import type {
  HistoryStats,
  HolidayMessage,
  LeaveRequestForm,
  LeaveRequestRow,
  LeaveStatus,
  PeriodFilter,
  StatusFilter,
} from "./leaveManagementTypes";
import { LEAVE_FORM_OPTIONS, LEAVE_META } from "./leaveManagementTypes";

const TYPE_LABELS: Record<string, { label: string; tone: LeaveRequestRow["typeTone"] }> = {
  casual: { label: "Casual", tone: "casual" },
  medical: { label: "Medical", tone: "medical" },
  earned: { label: "Comp-off", tone: "casual" },
  half_day: { label: "Casual (½ PM)", tone: "casual" },
  wfh: { label: "Work From Home", tone: "casual" },
};

export function computeSummaryCounts(rows: LeaveRequestRow[]) {
  return {
    approved: rows.filter((r) => r.status === "approved").length,
    pending: rows.filter((r) => r.status === "pending").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
  };
}

export function filterByStatus(rows: LeaveRequestRow[], filter: StatusFilter): LeaveRequestRow[] {
  if (filter === "all") return rows;
  return rows.filter((r) => r.status === filter);
}

export function statusLabel(status: LeaveStatus): string {
  const map: Record<LeaveStatus, string> = {
    approved: "Approved",
    pending: "Pending",
    on_hold: "On Hold",
    rejected: "Rejected",
  };
  return map[status];
}

export function statusToTone(status: LeaveStatus): "success" | "warning" | "info" | "danger" {
  const map: Record<LeaveStatus, "success" | "warning" | "info" | "danger"> = {
    approved: "success",
    pending: "warning",
    on_hold: "info",
    rejected: "danger",
  };
  return map[status];
}

export function computeDaysBetween(fromIso: string, toIso: string): number {
  const from = new Date(fromIso + "T12:00:00");
  const to = new Date(toIso + "T12:00:00");
  const diff = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(diff === 0 ? 0.5 : diff, 0.5);
}

export function formatDisplayDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function recipientLabel(value: string): string {
  return LEAVE_FORM_OPTIONS.recipients.find((r) => r.value === value)?.label ?? value;
}

export function validateLeaveForm(form: LeaveRequestForm): string | null {
  if (!form.leaveType) return "Leave type is required";
  if (!form.fromDate || !form.toDate) return "From and to dates are required";
  if (form.toDate < form.fromDate) return "To date must be on or after from date";
  if (!form.recipient) return "Recipient is required";
  if (!form.subject.trim()) return "Subject is required";
  if (!form.message.trim()) return "Message is required";
  return null;
}

export function formToLeaveRequest(form: LeaveRequestForm): LeaveRequestRow {
  const typeInfo = TYPE_LABELS[form.leaveType] ?? { label: form.leaveType, tone: "casual" as const };
  const days = form.leaveType === "half_day" ? 0.5 : computeDaysBetween(form.fromDate, form.toDate);
  const now = new Date();
  const sentAt = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const toName =
    form.recipient === "hr"
      ? "HR Department"
      : form.recipient === "both"
        ? "Priya Sharma & HR"
        : LEAVE_META.managerName;

  return {
    id: `leave-${crypto.randomUUID()}`,
    type: typeInfo.label,
    typeTone: typeInfo.tone,
    typeValue: form.leaveType,
    from: formatDisplayDate(form.fromDate),
    to: formatDisplayDate(form.toDate),
    fromIso: form.fromDate,
    toIso: form.toDate,
    days,
    subject: form.subject,
    status: "pending",
    conflict: null,
    recipient: form.recipient,
    submittedAt: formatDisplayDate(form.fromDate),
    reviewedBy: null,
    reviewedAt: null,
    messages: [
      {
        id: `msg-${crypto.randomUUID()}`,
        direction: "sent",
        from: LEAVE_META.employeeName,
        to: toName,
        subject: form.subject,
        body: form.message,
        sentAt,
      },
    ],
  };
}

export function computeHistoryStats(
  rows: LeaveRequestRow[],
  period: PeriodFilter,
  monthValue: string,
  year: number,
): HistoryStats {
  const filtered = rows.filter((row) => {
    const rowYear = parseInt(row.fromIso.slice(0, 4), 10);
    if (rowYear !== year) return false;
    if (period === "yearly") return true;
    const rowMonth = row.fromIso.slice(0, 7);
    return rowMonth === monthValue;
  });

  return {
    total: filtered.length,
    approved: filtered.filter((r) => r.status === "approved").length,
    pending: filtered.filter((r) => r.status === "pending").length,
    onHold: filtered.filter((r) => r.status === "on_hold").length,
    rejected: filtered.filter((r) => r.status === "rejected").length,
    daysTaken: filtered
      .filter((r) => r.status === "approved")
      .reduce((sum, r) => sum + r.days, 0),
  };
}

export function findLeaveById(rows: LeaveRequestRow[], id: string): LeaveRequestRow | undefined {
  return rows.find((r) => r.id === id);
}

export function findHolidayMessage(id: string, messages: HolidayMessage[]): HolidayMessage | undefined {
  return messages.find((m) => m.id === id);
}

export function exportLeavesCsv(rows: LeaveRequestRow[]) {
  const headers = ["Type", "From", "To", "Days", "Subject", "Status", "Conflict"];
  const data = rows.map((r) => [
    r.type,
    r.from,
    r.to,
    String(r.days),
    r.subject,
    statusLabel(r.status),
    r.conflict ?? "—",
  ]);
  const csv = [headers, ...data].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "leave-requests.csv";
  link.click();
  URL.revokeObjectURL(url);
}
