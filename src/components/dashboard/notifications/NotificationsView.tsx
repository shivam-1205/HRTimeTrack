import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PageIntro from "../shared/PageIntro";
import { INNER_CARD, PAGE_CARD, statusBadgeClass } from "../shared/pageStyles";
import { NOTIFICATIONS, UPCOMING_HOLIDAYS_NOTIFY } from "./data";

const categoryIcon = {
  leave: BeachAccessOutlinedIcon,
  attendance: ScheduleOutlinedIcon,
  system: EventAvailableOutlinedIcon,
  approval: CheckCircleOutlinedIcon,
};

const categoryColor = {
  leave: "bg-primary-container/10 text-primary",
  attendance: "bg-amber-500/10 text-amber-600",
  system: "bg-surface-container text-on-surface-variant",
  approval: "bg-emerald-500/10 text-emerald-600",
};

export default function NotificationsView() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<NotificationsOutlinedIcon sx={{ fontSize: 22 }} />}
        iconClassName="bg-primary-container/10 text-primary"
        title="Notifications"
        description="Stay updated on leave approvals, attendance alerts, and company announcements."
        action={
          <button
            type="button"
            className="rounded-xl border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            Mark all as read
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <span className={statusBadgeClass("primary")}>{unreadCount} unread</span>
        <span className={statusBadgeClass("neutral")}>{NOTIFICATIONS.length} total</span>
      </div>

      <section className={`${PAGE_CARD} p-6`}>
        <h2 className="text-h3 font-semibold text-on-surface">Upcoming Holidays</h2>
        <p className="mt-1 text-body-md text-on-surface-variant">Next 3 holidays coming up.</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {UPCOMING_HOLIDAYS_NOTIFY.map((holiday) => (
            <article key={holiday.name} className={`${INNER_CARD} p-4`}>
              <h3 className="font-medium text-on-surface">{holiday.name}</h3>
              <p className="mt-1 text-caption text-on-surface-variant">{holiday.date}</p>
              <span className="mt-3 inline-block rounded-full bg-surface-container px-2.5 py-0.5 text-caption text-on-surface-variant">
                {holiday.days}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="border-b border-outline-variant/30 px-6 py-4">
          <h2 className="text-h3 font-semibold text-on-surface">All Notifications</h2>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {NOTIFICATIONS.map((item) => {
            const Icon = categoryIcon[item.category];
            return (
              <article
                key={item.id}
                className={`flex gap-4 px-6 py-4 transition-colors hover:bg-surface-container-low/40 ${
                  item.unread ? "bg-primary-container/5" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${categoryColor[item.category]}`}
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
                  <p className="mt-1 text-body-md text-on-surface-variant">{item.message}</p>
                  <p className="mt-2 text-caption text-outline">{item.time}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
