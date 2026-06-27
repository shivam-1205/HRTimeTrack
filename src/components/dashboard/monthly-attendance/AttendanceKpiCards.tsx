import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { CARD_SHADOW, KPI_STATS } from "./monthlyAttendanceData";

const iconMap = {
  percent: PercentOutlinedIcon,
  check_circle: CheckCircleOutlinedIcon,
  schedule: ScheduleOutlinedIcon,
  logout: LogoutOutlinedIcon,
} as const;

export default function AttendanceKpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {KPI_STATS.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];

        return (
          <article
            key={stat.id}
            className={`flex flex-col rounded-xl bg-surface-container-lowest p-4 transition-shadow hover:shadow-[0_12px_24px_rgba(53,37,205,0.08)] ${CARD_SHADOW} ${
              "alertBorder" in stat && stat.alertBorder ? "border-l-4 border-l-error" : ""
            }`}
          >
            <div className="mb-4 flex items-start justify-between">
              <span className="text-caption uppercase tracking-wider text-on-surface-variant">
                {stat.label}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md ${stat.iconClass}`}
              >
                <Icon sx={{ fontSize: 18 }} />
              </div>
            </div>
            <span className="mb-1 text-h2 font-semibold text-on-surface">{stat.value}</span>
            <span
              className={`flex items-center gap-1 text-caption ${stat.subtextClass}`}
            >
              {"trend" in stat && stat.trend && (
                <TrendingUpOutlinedIcon sx={{ fontSize: 14 }} />
              )}
              {stat.subtext}
            </span>
          </article>
        );
      })}
    </div>
  );
}
