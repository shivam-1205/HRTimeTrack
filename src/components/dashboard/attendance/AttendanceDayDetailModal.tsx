"use client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import DashboardModal, {
  DashboardModalStat,
  DashboardModalStatGrid,
} from "../shared/DashboardModal";
import { modalBtnPrimary } from "../shared/modalStyles";
import type { DayDetail } from "./attendanceTypes";

type AttendanceDayDetailModalProps = {
  detail: DayDetail | null;
  onClose: () => void;
};

function onTimeBadgeClass(label: string) {
  if (label === "On Time") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (label === "Late") return "border-amber-200 bg-amber-50 text-amber-700";
  if (label === "Absent") return "border-red-200 bg-red-50 text-red-700";
  return "border-outline-variant bg-surface-container text-on-surface-variant";
}

export default function AttendanceDayDetailModal({
  detail,
  onClose,
}: AttendanceDayDetailModalProps) {
  if (!detail) return null;

  return (
    <DashboardModal
      title={detail.dateLabel}
      titleId="attendance-day-title"
      size="sm"
      onClose={onClose}
      headerBadge={
        <span
          className={`inline-flex rounded-full border px-2 py-0.5 text-caption font-medium ${onTimeBadgeClass(detail.onTimeLabel)}`}
        >
          {detail.onTimeLabel}
        </span>
      }
      footer={
        <button type="button" onClick={onClose} className={modalBtnPrimary}>
          Close
        </button>
      }
    >
      <DashboardModalStatGrid>
        <DashboardModalStat
          icon={<LoginOutlinedIcon />}
          label="Login"
          value={detail.loginTime}
        />
        <DashboardModalStat
          icon={<LogoutOutlinedIcon />}
          label="Logout"
          value={detail.logoutTime}
        />
        <DashboardModalStat
          icon={<AccessTimeOutlinedIcon />}
          label="Session"
          value={detail.liveSession}
          valueClass={detail.liveSession === "Open" ? "text-emerald-600" : "text-on-surface-variant"}
        />
        <DashboardModalStat
          icon={<AccessTimeOutlinedIcon />}
          label="Worked"
          value={detail.totalWorked}
        />
        <DashboardModalStat
          icon={<EventAvailableOutlinedIcon />}
          label="Late By"
          value={detail.lateBy}
          valueClass={detail.lateBy === "On time" ? "text-emerald-600" : "text-amber-600"}
        />
        <DashboardModalStat
          icon={<EventAvailableOutlinedIcon />}
          label="Leave"
          value={detail.leaveStatus}
        />
        {detail.remarks && detail.remarks !== "—" && (
          <DashboardModalStat
            icon={<NotesOutlinedIcon />}
            label="Remarks"
            value={detail.remarks}
            valueClass="text-on-surface-variant"
            spanFull
          />
        )}
      </DashboardModalStatGrid>
    </DashboardModal>
  );
}
