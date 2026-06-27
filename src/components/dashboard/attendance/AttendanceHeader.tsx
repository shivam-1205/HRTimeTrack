import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function AttendanceHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 className="text-h1 font-semibold text-on-background">Attendance Tracking</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Monitor your daily presence, hours, and schedule.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select className="cursor-pointer appearance-none rounded-md border border-outline-variant bg-surface-container-lowest py-2 pl-3 pr-8 text-label-md text-on-surface shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Current Month (Oct 2023)</option>
            <option>September 2023</option>
            <option>August 2023</option>
          </select>
          <KeyboardArrowDownOutlinedIcon
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
        </div>

        <div className="relative">
          <select className="cursor-pointer appearance-none rounded-md border border-outline-variant bg-surface-container-lowest py-2 pl-3 pr-8 text-label-md text-on-surface shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Statuses</option>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
          </select>
          <KeyboardArrowDownOutlinedIcon
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-1 rounded-md border border-outline-variant bg-surface-container-lowest px-3 py-2 text-label-md text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
        >
          <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
          Export Report
        </button>
      </div>
    </div>
  );
}
