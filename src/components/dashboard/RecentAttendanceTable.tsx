import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import DashboardCard from "./DashboardCard";

type AttendanceStatus = "Present" | "Late" | "Absent";

type AttendanceRow = {
  date: string;
  firstIn: string;
  lastOut: string;
  workedHours: string;
  status: AttendanceStatus;
};

const rows: AttendanceRow[] = [
  {
    date: "Oct 26, 2023",
    firstIn: "09:05 AM",
    lastOut: "--",
    workedHours: "04h 32m",
    status: "Present",
  },
  {
    date: "Oct 25, 2023",
    firstIn: "08:50 AM",
    lastOut: "06:15 PM",
    workedHours: "08h 45m",
    status: "Present",
  },
  {
    date: "Oct 24, 2023",
    firstIn: "09:30 AM",
    lastOut: "06:00 PM",
    workedHours: "07h 45m",
    status: "Late",
  },
  {
    date: "Oct 23, 2023",
    firstIn: "--",
    lastOut: "--",
    workedHours: "00h 00m",
    status: "Absent",
  },
];

const statusStyles: Record<AttendanceStatus, string> = {
  Present: "bg-emerald-500/10 text-emerald-600",
  Late: "bg-amber-500/10 text-amber-600",
  Absent: "bg-error/10 text-error",
};

export default function RecentAttendanceTable() {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-outline-variant/70 bg-surface-container-lowest px-4 py-4">
        <h3 className="text-h3 font-semibold text-on-surface">Recent Attendance</h3>
        <button
          type="button"
          className="flex items-center gap-1 text-label-md font-medium text-on-surface-variant transition-colors hover:text-primary"
        >
          <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/70 bg-surface-container-low text-caption font-medium text-on-surface-variant">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">First In</th>
              <th className="px-4 py-3 font-medium">Last Out</th>
              <th className="px-4 py-3 font-medium">Worked Hours</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {rows.map((row, index) => (
              <tr
                key={row.date}
                className={`transition-colors hover:bg-surface-container-low/60 ${
                  index < rows.length - 1 ? "border-b border-outline-variant/40" : ""
                }`}
              >
                <td className="px-4 py-3.5">{row.date}</td>
                <td className={`px-4 py-3.5 ${row.firstIn === "--" ? "text-outline" : ""}`}>
                  {row.firstIn}
                </td>
                <td className={`px-4 py-3.5 ${row.lastOut === "--" ? "text-outline" : ""}`}>
                  {row.lastOut}
                </td>
                <td
                  className={`px-4 py-3.5 ${
                    row.workedHours === "00h 00m" ? "text-outline" : "font-medium"
                  }`}
                >
                  {row.workedHours}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-caption font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
