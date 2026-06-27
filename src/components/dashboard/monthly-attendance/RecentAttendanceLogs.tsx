import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CARD_SHADOW, RECENT_LOGS } from "./monthlyAttendanceData";

export default function RecentAttendanceLogs() {
  return (
    <section className={`overflow-hidden rounded-xl bg-surface-container-lowest ${CARD_SHADOW}`}>
      <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-bright p-6">
        <h3 className="text-h3 font-semibold text-on-surface">Recent Logs</h3>
        <button type="button" className="text-label-md text-primary hover:underline">
          View All Logs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Clock In</th>
              <th className="p-4 font-medium">Clock Out</th>
              <th className="p-4 font-medium">Total Hrs</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-md">
            {RECENT_LOGS.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-outline-variant/10 transition-colors hover:bg-surface-container-low/50 ${
                  row.highlight ? "bg-error-container/10" : ""
                }`}
              >
                <td className="p-4">
                  <div className="font-medium text-on-surface">{row.date}</div>
                  <div className={`text-caption ${row.dayClass ?? "text-on-surface-variant"}`}>
                    {row.day}
                  </div>
                </td>
                <td className="p-4">
                  {row.statusVariant === "present" ? (
                    <span className="inline-block rounded-md border border-emerald-200 bg-emerald-500/10 px-2 py-0.5 text-caption text-emerald-700">
                      {row.status}
                    </span>
                  ) : (
                    <span className="inline-block rounded-md border border-error/20 bg-error/10 px-2 py-0.5 text-caption text-error">
                      {row.status}
                    </span>
                  )}
                </td>
                <td className="p-4 text-on-surface-variant">{row.clockIn}</td>
                <td className={`p-4 ${row.clockOutClass ?? "text-on-surface-variant"}`}>
                  {row.clockOut}
                </td>
                <td className="p-4 font-medium text-on-surface">{row.totalHrs}</td>
                <td className="p-4 text-right">
                  {row.action === "menu" ? (
                    <button
                      type="button"
                      className="p-1 text-outline transition-colors hover:text-primary"
                      aria-label="More actions"
                    >
                      <MoreVertOutlinedIcon sx={{ fontSize: 18 }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rounded-md border border-error/30 px-2 py-1 text-caption text-error transition-colors hover:bg-error/10"
                    >
                      Fix
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
