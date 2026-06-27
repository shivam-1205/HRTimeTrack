import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { DIRECTORY_STATS } from "./employees";

const stats = [
  {
    label: "Total Employees",
    value: DIRECTORY_STATS.totalEmployees,
    icon: GroupOutlinedIcon,
    iconClass: "bg-primary-container/10 text-primary",
  },
  {
    label: "New Joiners (This Month)",
    value: DIRECTORY_STATS.newJoiners,
    icon: PersonAddOutlinedIcon,
    iconClass: "bg-secondary-container/10 text-secondary",
  },
  {
    label: "Departments",
    value: DIRECTORY_STATS.departments,
    icon: DomainOutlinedIcon,
    iconClass: "bg-tertiary-container/10 text-tertiary",
  },
] as const;

export default function DirectoryStats() {
  return (
    <section>
      <h2 className="mb-4 text-h2 font-semibold text-on-surface">Employee Directory</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, iconClass }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface p-4 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}
            >
              <Icon sx={{ fontSize: 24 }} />
            </div>
            <div>
              <p className="text-caption text-outline">{label}</p>
              <p className="text-h3 font-semibold text-on-surface">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
