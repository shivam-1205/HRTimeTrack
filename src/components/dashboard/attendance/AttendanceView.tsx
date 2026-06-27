"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceDayDetailModal from "./AttendanceDayDetailModal";
import AttendanceDetailedLog from "./AttendanceDetailedLog";
import AttendanceHeader from "./AttendanceHeader";
import { AttendanceProvider, useAttendance } from "./context/AttendanceContext";

function AttendanceNotification() {
  const { notification, clearNotification } = useAttendance();
  if (!notification) return null;

  const Icon = notification.type === "success" ? CheckCircleOutlinedIcon : InfoOutlinedIcon;
  const styles =
    notification.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-blue-200 bg-blue-50 text-blue-800";

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles}`}>
      <div className="flex items-center gap-2">
        <Icon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button
        type="button"
        onClick={clearNotification}
        className="text-caption underline opacity-70 hover:opacity-100"
      >
        Dismiss
      </button>
    </div>
  );
}

function AttendanceContent() {
  const { selectedDay, closeDayDetail } = useAttendance();

  return (
    <div className="flex flex-col gap-6">
      <AttendanceNotification />
      <AttendanceHeader />
      <AttendanceCalendar />
      <AttendanceDetailedLog />
      <AttendanceDayDetailModal detail={selectedDay} onClose={closeDayDetail} />
    </div>
  );
}

export default function AttendanceView() {
  return (
    <AttendanceProvider>
      <AttendanceContent />
    </AttendanceProvider>
  );
}
