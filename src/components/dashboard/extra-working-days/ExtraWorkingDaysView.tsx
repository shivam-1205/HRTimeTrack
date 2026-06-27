import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PageIntro from "../shared/PageIntro";
import { PAGE_CARD, reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { EXTRA_DAY_STATUS_COUNTS, EXTRA_WORKING_DAYS } from "./data";

const statusCounts = [
  { label: "Approved", count: EXTRA_DAY_STATUS_COUNTS.approved, tone: "success" as const },
  { label: "Pending", count: EXTRA_DAY_STATUS_COUNTS.pending, tone: "warning" as const },
  { label: "On Hold", count: EXTRA_DAY_STATUS_COUNTS.onHold, tone: "info" as const },
  { label: "Rejected", count: EXTRA_DAY_STATUS_COUNTS.rejected, tone: "danger" as const },
];

function StatusDot({ tone }: { tone: "success" | "warning" | "info" | "danger" }) {
  const colors = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-orange-500",
    danger: "bg-red-500",
  };
  return <span className={`h-2.5 w-2.5 rounded-full ${colors[tone]}`} />;
}

export default function ExtraWorkingDaysView() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<CalendarMonthOutlinedIcon sx={{ fontSize: 22 }} />}
        title="My Extra Working Days"
        description={
          <>
            Days you worked on weekends or public holidays. Only{" "}
            <span className="font-medium text-emerald-600">approved</span> days count toward your
            balance.
          </>
        }
        action={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
          >
            <EventAvailableOutlinedIcon sx={{ fontSize: 18 }} />
            Request
          </button>
        }
      />

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="flex flex-wrap items-center gap-6 border-b border-outline-variant/30 px-6 py-4">
          {statusCounts.map(({ label, count, tone }) => (
            <div key={label} className="flex items-center gap-2">
              <StatusDot tone={tone} />
              <span className="text-h3 font-semibold text-on-surface">{count}</span>
              <span className="text-body-md text-on-surface-variant">{label}</span>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Reason</th>
                <th className="px-6 py-3 font-medium">Your Note</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {EXTRA_WORKING_DAYS.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-outline-variant/20 transition-colors hover:bg-surface-container-low/40"
                >
                  <td className="px-6 py-4 font-medium text-on-surface">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={reasonBadgeClass(row.reasonType)}>{row.reason}</span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.note}</td>
                  <td className="px-6 py-4">
                    <span className={statusBadgeClass("warning")}>Pending</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-label-md text-primary hover:underline"
                    >
                      <EditOutlinedIcon sx={{ fontSize: 16 }} />
                      Edit Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
