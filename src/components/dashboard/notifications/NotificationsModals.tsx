"use client";

import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import Link from "next/link";
import DashboardModal, {
  DashboardModalStat,
  DashboardModalStatGrid,
} from "../shared/DashboardModal";
import { modalBtnOutline, modalBtnPrimary } from "../shared/modalStyles";
import { statusBadgeClass } from "../shared/pageStyles";
import { useNotifications } from "./context/NotificationsContext";
import { categoryLabelMap } from "./notificationsUtils";

function NotificationDetailModal() {
  const { selectedNotification, closeModal, dismissNotification } = useNotifications();
  if (!selectedNotification) return null;

  const item = selectedNotification;

  return (
    <DashboardModal
      title={item.title}
      subtitle={item.sentAt}
      size="md"
      onClose={closeModal}
      headerBadge={
        <span className={statusBadgeClass(item.unread ? "primary" : "neutral")}>
          {categoryLabelMap[item.category]}
        </span>
      }
      footer={
        <>
          <button type="button" onClick={() => dismissNotification(item.id)} className={modalBtnOutline}>
            Dismiss
          </button>
          <Link href={item.relatedRoute} onClick={closeModal} className={`flex items-center gap-1.5 ${modalBtnPrimary}`}>
            <OpenInNewOutlinedIcon sx={{ fontSize: 16 }} />
            {item.actionLabel}
          </Link>
        </>
      }
    >
      <p className="mb-3 text-body-md text-on-surface-variant">{item.message}</p>
      <div className="rounded-xl border border-outline-variant/25 bg-surface-container-low/50 p-3">
        <p className="whitespace-pre-wrap text-body-md leading-relaxed text-on-surface">{item.body}</p>
      </div>
    </DashboardModal>
  );
}

function HolidayNotifyModal() {
  const { selectedHoliday, closeModal } = useNotifications();
  if (!selectedHoliday) return null;

  const holiday = selectedHoliday;

  return (
    <DashboardModal
      title={holiday.name}
      subtitle={holiday.date}
      size="sm"
      onClose={closeModal}
      headerBadge={
        <span className={statusBadgeClass(holiday.paid ? "success" : "neutral")}>
          {holiday.paid ? "Paid Holiday" : "Unpaid"}
        </span>
      }
      footer={
        <button type="button" onClick={closeModal} className={modalBtnPrimary}>
          Close
        </button>
      }
    >
      <DashboardModalStatGrid>
        <DashboardModalStat label="Day" value={holiday.dayOfWeek} />
        <DashboardModalStat label="Countdown" value={holiday.daysUntil} />
        <DashboardModalStat label="Type" value={holiday.type} spanFull />
        <DashboardModalStat label="Details" value={holiday.description} spanFull />
      </DashboardModalStatGrid>
    </DashboardModal>
  );
}

export default function NotificationsModals() {
  const { activeModal } = useNotifications();

  return (
    <>
      {activeModal === "notification" && <NotificationDetailModal />}
      {activeModal === "holiday" && <HolidayNotifyModal />}
    </>
  );
}
