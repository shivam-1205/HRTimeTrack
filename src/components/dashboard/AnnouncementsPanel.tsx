import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DashboardCard from "./DashboardCard";

const announcements = [
  {
    dot: "bg-error",
    title: "System Maintenance",
    body: "Portal down briefly tonight at 11 PM.",
    time: "2 hours ago",
  },
  {
    dot: "bg-primary",
    title: "Townhall Meeting",
    body: "Q3 Results discussion tomorrow at 2 PM.",
    time: "Yesterday",
  },
  {
    dot: "bg-outline",
    title: "Policy Update",
    body: "New WFH guidelines uploaded.",
    time: "3 days ago",
  },
];

export default function AnnouncementsPanel() {
  return (
    <DashboardCard variant="tinted" className="col-span-1 flex flex-col p-4 lg:col-span-1">
      <div className="mb-4 flex items-center justify-between border-b border-outline-variant/70 pb-3">
        <h3 className="flex items-center gap-2 text-h3 font-semibold text-on-surface">
          <CampaignOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
          Updates
        </h3>
        <button type="button" className="text-caption font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="flex max-h-[320px] flex-col gap-3 overflow-y-auto">
        {announcements.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-outline-variant/60 bg-surface-container-lowest p-3 shadow-[0_1px_2px_rgba(21,28,39,0.04)]"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
              <p className="text-label-md font-medium text-on-surface">{item.title}</p>
            </div>
            <p className="mb-2 text-caption leading-relaxed text-on-surface-variant">{item.body}</p>
            <p className="text-[10px] text-outline">{item.time}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
