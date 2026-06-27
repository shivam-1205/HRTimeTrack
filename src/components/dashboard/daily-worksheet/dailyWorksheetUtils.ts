import type {
  ActivityItem,
  BlockerItem,
  DailyTaskDraft,
  TaskFormEntry,
  TaskRow,
  TaskStatus,
  TimelineItem,
  WeeklyDay,
} from "./dailyWorksheetTypes";

export function createEmptyTaskEntry(): TaskFormEntry {
  return {
    id: crypto.randomUUID(),
    projectName: "",
    clientName: "",
    taskTitle: "",
    taskDescription: "",
    workCategory: "",
    priority: "med",
    startTime: "",
    endTime: "",
    status: "pending",
    remarks: "",
  };
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}-${m}-${y}`;
}

export function parseHoursFromTimes(startTime: string, endTime: string): number | null {
  if (!startTime || !endTime) return null;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes <= 0) return null;
  return Math.round((minutes / 60) * 10) / 10;
}

export function formatHoursLabel(hours: number | null): string {
  if (hours === null) return "—";
  return `${hours}h`;
}

export function parseActualHours(actualHours: string): number {
  if (actualHours === "--" || !actualHours) return 0;
  const parsed = parseFloat(actualHours);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatTime12h(time24: string): string {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export function resolveProjectFilterKey(projectName: string): string {
  const slug = projectName.toLowerCase().replace(/\s+/g, "-");
  const known = ["hrms-redesign", "core-services", "frontend", "api"];
  if (known.includes(slug)) return slug;
  if (projectName.toLowerCase().includes("hrms")) return "hrms-redesign";
  if (projectName.toLowerCase().includes("core")) return "core-services";
  if (projectName.toLowerCase().includes("front")) return "frontend";
  return slug || "all";
}

export function taskFormToRow(entry: TaskFormEntry, existingId?: string): TaskRow {
  const hours = parseHoursFromTimes(entry.startTime, entry.endTime);
  return {
    id: existingId ?? crypto.randomUUID(),
    task: entry.taskTitle,
    project: entry.projectName,
    clientName: entry.clientName,
    taskDescription: entry.taskDescription,
    workCategory: entry.workCategory,
    priority: entry.priority,
    estimatedHours: hours !== null ? hours.toFixed(1) : "--",
    actualHours: hours !== null ? hours.toFixed(1) : "--",
    status: entry.status,
    startTime: entry.startTime,
    endTime: entry.endTime,
    remarks: entry.remarks,
    attachmentName: entry.attachmentName,
    projectFilterKey: resolveProjectFilterKey(entry.projectName),
  };
}

export function taskRowToFormEntry(row: TaskRow): TaskFormEntry {
  return {
    id: crypto.randomUUID(),
    projectName: row.project,
    clientName: row.clientName ?? "",
    taskTitle: row.task,
    taskDescription: row.taskDescription ?? "",
    workCategory: row.workCategory ?? "",
    priority: row.priority,
    startTime: row.startTime ?? "",
    endTime: row.endTime ?? "",
    status: row.status,
    remarks: row.remarks ?? "",
    attachmentName: row.attachmentName,
  };
}

export function computeLoggedHours(tasks: TaskRow[]): number {
  return tasks.reduce((sum, t) => sum + parseActualHours(t.actualHours), 0);
}

export function computeKpis(tasks: TaskRow[], targetHours: number) {
  const logged = computeLoggedHours(tasks);
  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const blockers = tasks.filter(
    (t) => t.status === "in_progress" && t.remarks?.toLowerCase().includes("block"),
  ).length;
  const planned = tasks.length;
  const percent = Math.min(100, Math.round((logged / targetHours) * 100));
  const remaining = Math.max(0, Math.round((targetHours - logged) * 10) / 10);
  const productivity =
    planned > 0 ? Math.min(100, Math.round((completed / planned) * 100) + 20) : 0;

  return {
    loggedHours: {
      current: Math.round(logged * 10) / 10,
      target: targetHours,
      trendPercent: 12,
      trendLabel: "12% vs yesterday",
    },
    completed: {
      count: completed,
      planned,
      label: `out of ${planned} planned`,
    },
    inProgress: {
      count: inProgress,
      note: blockers > 0 ? `${blockers} Blocking issue` : "No blockers",
    },
    productivityScore: {
      value: productivity,
      label: productivity >= 80 ? "Excellent pace" : productivity >= 50 ? "Good pace" : "Needs focus",
    },
    dailyGoal: {
      percent,
      remainingHours: remaining,
      streakDays: 3,
    },
  };
}

export function buildTimelineFromTasks(tasks: TaskRow[]): TimelineItem[] {
  const withTimes = tasks
    .filter((t) => t.startTime)
    .sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""));

  const items: TimelineItem[] = withTimes.map((t, i) => ({
    id: `tl-${t.id}`,
    time: formatTime12h(t.startTime!),
    title: t.status === "done" ? "Completed" : t.status === "in_progress" ? "Current Focus" : "Scheduled",
    subtitle: t.task,
    variant:
      t.status === "done" ? "success" : t.status === "in_progress" ? "active" : ("upcoming" as const),
  }));

  if (items.length === 0) {
    return [
      { id: "empty-1", time: "09:00 AM", title: "Start Work", variant: "upcoming" },
      { id: "empty-2", time: "06:00 PM", title: "End of Day", variant: "upcoming" },
    ];
  }

  const activeIdx = items.findIndex((i) => i.variant === "active");
  if (activeIdx === -1 && items.length > 0) {
    items[items.length - 1].variant = "active";
  }

  items.push({ id: "break", time: "02:00 PM", title: "Scheduled Break", variant: "upcoming" });
  items.push({ id: "eod", time: "06:00 PM", title: "End of Day", variant: "upcoming" });

  return items;
}

export function updateWeeklyTodayHours(days: WeeklyDay[], todayHours: number): WeeklyDay[] {
  return days.map((d) => (d.isToday ? { ...d, hours: todayHours } : d));
}

export function filterTasksByProject(tasks: TaskRow[], filter: string): TaskRow[] {
  if (filter === "all") return tasks;
  return tasks.filter((t) => t.projectFilterKey === filter);
}

export function validateTaskEntry(entry: TaskFormEntry): string | null {
  if (!entry.projectName.trim()) return "Project Name is required";
  if (!entry.taskTitle.trim()) return "Task Title is required";
  if (!entry.priority) return "Priority is required";
  if (!entry.status) return "Status is required";
  return null;
}

export function validateDraft(draft: DailyTaskDraft): string | null {
  if (!draft.date) return "Date is required";
  if (draft.tasks.length === 0) return "Add at least one task";
  for (let i = 0; i < draft.tasks.length; i++) {
    const err = validateTaskEntry(draft.tasks[i]);
    if (err) return `Task ${i + 1}: ${err}`;
  }
  return null;
}

export function createActivity(
  message: string,
  type: ActivityItem["type"],
  time?: string,
): ActivityItem {
  const now = new Date();
  const defaultTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return {
    id: crypto.randomUUID(),
    message,
    time: time ?? defaultTime,
    type,
  };
}

export function statusLabel(status: TaskStatus): string {
  const map: Record<TaskStatus, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    done: "Done",
  };
  return map[status];
}

export function deriveBlockerFromTask(task: TaskRow): BlockerItem | null {
  if (!task.remarks?.toLowerCase().includes("block")) return null;
  return {
    id: `blk-${task.id}`,
    title: task.remarks,
    project: task.project,
    severity: task.priority === "high" ? "high" : "med",
    reportedAt: task.startTime ? formatTime12h(task.startTime) : "Today",
    status: "open",
  };
}
