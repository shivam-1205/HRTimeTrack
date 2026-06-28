"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  NOTIFICATIONS_INITIAL,
  NOTIFICATIONS_META,
  NOTIFICATION_CATEGORIES,
  UPCOMING_HOLIDAYS_NOTIFY,
  type CategoryFilter,
  type NotificationItem,
  type UpcomingHolidayNotify,
} from "../notificationsTypes";
import { countUnread, filterNotifications } from "../notificationsUtils";

type ModalType = "notification" | "holiday" | null;
type ReadFilter = "all" | "unread" | "read";

type NotificationsContextValue = {
  meta: typeof NOTIFICATIONS_META;
  categories: typeof NOTIFICATION_CATEGORIES;
  notifications: NotificationItem[];
  filteredNotifications: NotificationItem[];
  upcomingHolidays: UpcomingHolidayNotify[];
  unreadCount: number;
  categoryFilter: CategoryFilter;
  readFilter: ReadFilter;
  activeModal: ModalType;
  selectedNotification: NotificationItem | null;
  selectedHoliday: UpcomingHolidayNotify | null;
  setCategoryFilter: (filter: CategoryFilter) => void;
  setReadFilter: (filter: ReadFilter) => void;
  openNotification: (item: NotificationItem) => void;
  openHoliday: (holiday: UpcomingHolidayNotify) => void;
  closeModal: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_INITIAL);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [selectedHoliday, setSelectedHoliday] = useState<UpcomingHolidayNotify | null>(null);

  const filteredNotifications = useMemo(
    () => filterNotifications(notifications, categoryFilter, readFilter),
    [notifications, categoryFilter, readFilter],
  );

  const unreadCount = useMemo(() => countUnread(notifications), [notifications]);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedNotification(null);
    setSelectedHoliday(null);
  }, []);

  const openNotification = useCallback((item: NotificationItem) => {
    setSelectedNotification(item);
    setActiveModal("notification");
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
  }, []);

  const openHoliday = useCallback((holiday: UpcomingHolidayNotify) => {
    setSelectedHoliday(holiday);
    setActiveModal("holiday");
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    closeModal();
  }, [closeModal]);

  const value = useMemo(
    () => ({
      meta: NOTIFICATIONS_META,
      categories: NOTIFICATION_CATEGORIES,
      notifications,
      filteredNotifications,
      upcomingHolidays: UPCOMING_HOLIDAYS_NOTIFY,
      unreadCount,
      categoryFilter,
      readFilter,
      activeModal,
      selectedNotification,
      selectedHoliday,
      setCategoryFilter,
      setReadFilter,
      openNotification,
      openHoliday,
      closeModal,
      markAsRead,
      markAllAsRead,
      dismissNotification,
    }),
    [
      notifications,
      filteredNotifications,
      unreadCount,
      categoryFilter,
      readFilter,
      activeModal,
      selectedNotification,
      selectedHoliday,
      closeModal,
      openNotification,
      openHoliday,
      markAsRead,
      markAllAsRead,
      dismissNotification,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
