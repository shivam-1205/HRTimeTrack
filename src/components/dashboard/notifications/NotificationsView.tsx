"use client";

import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PageIntro from "../shared/PageIntro";
import { INNER_CARD, PAGE_CARD, statusBadgeClass } from "../shared/pageStyles";
import {
  NotificationsProvider,
  useNotifications,
} from "./context/NotificationsContext";
import NotificationsModals from "./NotificationsModals";
import { categoryColorMap } from "./notificationsUtils";
import type { NotificationCategory } from "./notificationsTypes";

const categoryIcon: Record<NotificationCategory, typeof BeachAccessOutlinedIcon> = {
  leave: BeachAccessOutlinedIcon,
  attendance: ScheduleOutlinedIcon,
  system: EventAvailableOutlinedIcon,
  approval: CheckCircleOutlinedIcon,
};

function NotificationsContent() {
  const {
    notifications,
    filteredNotifications,
    upcomingHolidays,
    unreadCount,
    categories,
    categoryFilter,
    readFilter,
    setCategoryFilter,
    setReadFilter,
    markAllAsRead,
    openNotification,
    openHoliday,
  } = useNotifications();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<NotificationsOutlinedIcon sx={{ fontSize: 22 }} />}
        title="Notifications"
        description="Stay updated on leave approvals, attendance alerts, and company announcements."
        action={
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="rounded-xl border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low disabled:opacity-50"
          >
            Mark all as read
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className={statusBadgeClass("primary")}>{unreadCount} unread</span>
        <span className={statusBadgeClass("neutral")}>{notifications.length} total</span>
        {(["all", "unread", "read"] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setReadFilter(filter)}
            className={`rounded-full px-3 py-1 text-caption font-medium capitalize transition-colors ${
              readFilter === filter
                ? "bg-primary text-on-primary"
                : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategoryFilter(cat.value as typeof categoryFilter)}
            className={`rounded-full px-3 py-1 text-caption font-medium transition-colors ${
              categoryFilter === cat.value
                ? "bg-primary-container/20 text-primary"
                : "border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className={`${PAGE_CARD} p-6`}>
        <h2 className="text-h3 font-semibold text-on-surface">Upcoming Holidays</h2>
        <p className="mt-1 text-body-md text-on-surface-variant">Next holidays coming up.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {upcomingHolidays.map((holiday) => (
            <button
              key={holiday.id}
              type="button"
              onClick={() => openHoliday(holiday)}
              className={`${INNER_CARD} p-4 text-left transition-shadow hover:shadow-md`}
            >
              <h3 className="font-medium text-on-surface">{holiday.name}</h3>
              <p className="mt-1 text-caption text-on-surface-variant">{holiday.date}</p>
              <span className="mt-3 inline-block rounded-full bg-surface-container px-2.5 py-0.5 text-caption text-on-surface-variant">
                {holiday.daysUntil}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="border-b border-outline-variant/30 px-6 py-4">
          <h2 className="text-h3 font-semibold text-on-surface">All Notifications</h2>
        </div>
        {filteredNotifications.length === 0 ? (
          <p className="px-6 py-8 text-center text-body-md text-on-surface-variant">
            No notifications match your filters.
          </p>
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {filteredNotifications.map((item) => {
              const Icon = categoryIcon[item.category];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openNotification(item)}
                  className={`flex w-full gap-4 px-6 py-4 text-left transition-colors hover:bg-surface-container-low/40 ${
                    item.unread ? "bg-primary-container/5" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${categoryColorMap[item.category]}`}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-on-surface">{item.title}</h3>
                      {item.unread && (
                        <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-body-md text-on-surface-variant">{item.message}</p>
                    <p className="mt-2 text-caption text-outline">{item.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <NotificationsModals />
    </div>
  );
}

export default function NotificationsView() {
  return (
    <NotificationsProvider>
      <NotificationsContent />
    </NotificationsProvider>
  );
}
