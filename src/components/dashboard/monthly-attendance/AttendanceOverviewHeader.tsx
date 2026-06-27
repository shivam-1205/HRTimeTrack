import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function AttendanceOverviewHeader() {
  return (
    <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-h1 font-semibold text-on-background">Attendance Overview</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Track your time, manage logs, and view your schedule.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-outline px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container"
        >
          <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
          Download Report
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />
          Apply Leave
        </button>
      </div>
    </header>
  );
}
