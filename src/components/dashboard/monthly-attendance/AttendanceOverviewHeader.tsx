"use client";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PageIntro from "../shared/PageIntro";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function AttendanceOverviewHeader() {
  const { downloadReport, openApplyLeave } = useMonthlyAttendance();

  return (
    <PageIntro
      icon={<CalendarMonthOutlinedIcon sx={{ fontSize: 22 }} />}
      title="Attendance Overview"
      description="Track your time, manage logs, and view your schedule."
      action={
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadReport}
            className="flex items-center gap-2 rounded-lg border border-outline px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container"
          >
            <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
            Download Report
          </button>
          <button
            type="button"
            onClick={openApplyLeave}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
          >
            <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
            Apply Leave
          </button>
        </div>
      }
    />
  );
}
