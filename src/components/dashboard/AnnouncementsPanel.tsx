import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import Link from "next/link";
import { DASHBOARD_DATA } from "./data/dashboardTypes";
import DashboardCard from "./DashboardCard";

export default function AnnouncementsPanel() {
  const { announcements } = DASHBOARD_DATA;

  return (
    <DashboardCard variant="tinted" className="flex h-full min-h-[400px] flex-col p-4 lg:col-span-1">
      <div className="mb-4 flex items-center justify-between border-b border-outline-variant/40 pb-3">
        <h3 className="flex items-center gap-2 text-h3 font-semibold text-on-surface">
          <CampaignOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
          Updates
        </h3>
        <Link
          href="/dashboard/notifications"
          className="text-caption font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-3 shadow-[0_1px_2px_rgba(21,28,39,0.04)]"
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
