"use client";

import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useDirectory } from "./context/DirectoryContext";
import { formatStatNumber } from "./directoryUtils";

export default function DirectoryStats() {
  const { stats } = useDirectory();

  const items = [
    {
      label: "Total Employees",
      value: formatStatNumber(stats.totalEmployees),
      icon: GroupOutlinedIcon,
      iconClass: "bg-primary-container/10 text-primary",
    },
    {
      label: "New Joiners (This Month)",
      value: String(stats.newJoiners),
      icon: PersonAddOutlinedIcon,
      iconClass: "bg-secondary-container/10 text-secondary",
    },
    {
      label: "Departments",
      value: String(stats.departments),
      icon: DomainOutlinedIcon,
      iconClass: "bg-tertiary-container/10 text-tertiary",
    },
  ] as const;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map(({ label, value, icon: Icon, iconClass }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface p-4 shadow-sm"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}>
            <Icon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-caption text-outline">{label}</p>
            <p className="text-h3 font-semibold text-on-surface">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
