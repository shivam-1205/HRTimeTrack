import notificationsResponse from "./notificationsData.json";

export type NotificationCategory = "leave" | "attendance" | "system" | "approval";

export type CategoryFilter = "all" | NotificationCategory;

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  body: string;
  time: string;
  sentAt: string;
  category: NotificationCategory;
  unread: boolean;
  actionLabel: string;
  relatedRoute: string;
};

export type UpcomingHolidayNotify = {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  daysUntil: string;
  type: string;
  paid: boolean;
  description: string;
};

export type NotificationsApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: { employeeName: string; employeeId: string };
    categories: { value: string; label: string }[];
    notifications: NotificationItem[];
    upcomingHolidays: UpcomingHolidayNotify[];
  };
};

const response = notificationsResponse as NotificationsApiResponse;

export const NOTIFICATIONS_META = response.data.meta;
export const NOTIFICATION_CATEGORIES = response.data.categories;
export const NOTIFICATIONS_INITIAL = response.data.notifications;
export const UPCOMING_HOLIDAYS_NOTIFY = response.data.upcomingHolidays;
