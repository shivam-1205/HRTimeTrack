import type { CategoryFilter, NotificationItem } from "./notificationsTypes";

export function filterNotifications(
  items: NotificationItem[],
  category: CategoryFilter,
  readFilter: "all" | "unread" | "read",
): NotificationItem[] {
  return items.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const readMatch =
      readFilter === "all" ||
      (readFilter === "unread" && item.unread) ||
      (readFilter === "read" && !item.unread);
    return categoryMatch && readMatch;
  });
}

export function countUnread(items: NotificationItem[]) {
  return items.filter((n) => n.unread).length;
}

export const categoryIconMap = {
  leave: "leave",
  attendance: "attendance",
  system: "system",
  approval: "approval",
} as const;

export const categoryColorMap: Record<string, string> = {
  leave: "bg-primary-container/10 text-primary",
  attendance: "bg-amber-500/10 text-amber-600",
  system: "bg-surface-container text-on-surface-variant",
  approval: "bg-emerald-500/10 text-emerald-600",
};

export const categoryLabelMap: Record<string, string> = {
  leave: "Leave",
  attendance: "Attendance",
  system: "System",
  approval: "Approval",
};
