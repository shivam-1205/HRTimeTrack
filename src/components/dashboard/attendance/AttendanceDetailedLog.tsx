import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type LogStatus = "Present" | "Late" | "Absent";

type LogRow = {
  date: string;
  status: LogStatus;
  firstIn: string;
  lastOut: string;
  totalHours: string;
  sessions: number;
  highlight?: boolean;
};

const rows: LogRow[] = [
  {
    date: "Tue, Oct 04",
    status: "Present",
    firstIn: "08:58 AM",
    lastOut: "05:15 PM",
    totalHours: "8h 17m",
    sessions: 1,
  },
  {
    date: "Mon, Oct 03",
    status: "Present",
    firstIn: "08:50 AM",
    lastOut: "05:00 PM",
    totalHours: "8h 10m",
    sessions: 1,
  },
  {
    date: "Fri, Sep 30",
    status: "Late",
    firstIn: "09:30 AM",
    lastOut: "05:30 PM",
    totalHours: "8h 00m",
    sessions: 1,
    highlight: true,
  },
  {
    date: "Thu, Sep 29",
    status: "Absent",
    firstIn: "-",
    lastOut: "-",
    totalHours: "0h 00m",
    sessions: 0,
  },
  {
    date: "Wed, Sep 28",
    status: "Present",
    firstIn: "08:55 AM",
    lastOut: "05:05 PM",
    totalHours: "8h 10m",
    sessions: 2,
  },
];

const statusBadge: Record<LogStatus, string> = {
  Present:
    "border-primary-container bg-primary-container/20 text-primary-fixed-dim",
  Late: "border-tertiary-container bg-tertiary-container/20 text-tertiary",
  Absent: "border-error-container bg-error-container/20 text-error",
};

const statusDot: Record<LogStatus, string> = {
  Present: "bg-primary",
  Late: "bg-tertiary",
  Absent: "bg-error",
};

export default function AttendanceDetailedLog() {
  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
      <div className="flex flex-col gap-3 border-b border-outline-variant bg-surface-container-lowest p-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-h3 font-semibold text-on-surface">Detailed Log</h3>
        <div className="relative w-full sm:w-56">
          <SearchOutlinedIcon
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 18 }}
          />
          <input
            type="text"
            placeholder="Search log..."
            className="w-full rounded-md border border-outline-variant bg-surface-container-lowest py-1.5 pl-8 pr-3 text-body-md text-on-surface focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Date</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Status</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">First In</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Last Out</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Total Hours</th>
              <th className="p-4 text-label-md font-medium text-on-surface-variant">Sessions</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {rows.map((row) => (
              <tr
                key={row.date}
                className={`border-b border-outline-variant transition-colors hover:bg-surface-container-lowest ${
                  row.highlight ? "bg-surface-container-lowest/50" : ""
                }`}
              >
                <td className="p-4">{row.date}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-caption font-medium ${statusBadge[row.status]}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${statusDot[row.status]}`} />
                    {row.status}
                  </span>
                </td>
                <td
                  className={`p-4 ${
                    row.status === "Late" ? "text-tertiary" : "text-outline"
                  }`}
                >
                  {row.firstIn}
                </td>
                <td className="p-4 text-outline">{row.lastOut}</td>
                <td
                  className={`p-4 font-medium ${
                    row.status === "Absent" ? "text-error" : ""
                  }`}
                >
                  {row.totalHours}
                </td>
                <td className="p-4">{row.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant bg-surface px-4 py-2">
        <span className="text-caption text-outline">Showing 1-5 of 24 records</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled
            className="rounded-md border border-outline-variant p-1 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
          >
            <ChevronLeftOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            type="button"
            className="rounded-md border border-outline-variant p-1 text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <ChevronRightOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
