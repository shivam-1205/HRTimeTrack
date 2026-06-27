import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import DashboardCard from "./DashboardCard";

const stats = [
  {
    icon: ScheduleOutlinedIcon,
    label: "Total Worked",
    value: "38.5 hrs",
    sub: "This Week",
    progress: 85,
    progressColor: "bg-primary",
    subColor: "text-outline",
  },
  {
    icon: CoffeeOutlinedIcon,
    label: "Break Time",
    value: "45 mins",
    sub: "Today",
    progress: 45,
    progressColor: "bg-amber-500",
    subColor: "text-outline",
  },
  {
    icon: DonutLargeOutlinedIcon,
    label: "Attendance",
    value: "98%",
    sub: "Monthly",
    progress: null,
    progressColor: "",
    subColor: "text-outline",
    trend: "2%",
    showDonut: true,
  },
  {
    icon: LoginOutlinedIcon,
    label: "Avg Login",
    value: "08:55 AM",
    sub: "On Time",
    progress: null,
    progressColor: "",
    subColor: "text-emerald-600",
  },
];

export default function AnalyticsGrid() {
  return (
    <div className="col-span-1 grid grid-cols-2 gap-4 md:col-span-3 lg:col-span-2">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <DashboardCard key={stat.label} className="flex flex-col p-4">
            <div className="mb-2 flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Icon sx={{ fontSize: 20 }} className="text-on-surface-variant" />
                <h4 className="text-label-md font-medium">{stat.label}</h4>
              </div>
              {stat.trend && (
                <span className="flex items-center text-caption font-medium text-emerald-600">
                  <ArrowUpwardOutlinedIcon sx={{ fontSize: 14 }} />
                  {stat.trend}
                </span>
              )}
            </div>

            <div className={`${stat.showDonut ? "flex items-end justify-between" : ""} mt-auto`}>
              <div>
                <p className="text-h2 font-semibold text-on-surface">{stat.value}</p>
                <p className={`text-caption ${stat.subColor}`}>{stat.sub}</p>
              </div>
              {stat.showDonut && (
                <div className="relative h-12 w-12 rounded-full border-4 border-surface-container">
                  <div className="absolute inset-0 rotate-45 transform rounded-full border-4 border-primary border-b-transparent border-r-transparent" />
                </div>
              )}
            </div>

            {stat.progress !== null && (
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-container">
                <div
                  className={`h-full rounded-full ${stat.progressColor}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            )}
          </DashboardCard>
        );
      })}
    </div>
  );
}
