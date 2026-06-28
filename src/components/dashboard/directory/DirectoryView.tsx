"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PageIntro from "../shared/PageIntro";
import DirectoryFilters from "./DirectoryFilters";
import DirectoryModals from "./DirectoryModals";
import DirectoryStats from "./DirectoryStats";
import EmployeeCard from "./EmployeeCard";
import InviteTeamCard from "./InviteTeamCard";
import { DirectoryProvider, useDirectory } from "./context/DirectoryContext";

function DirectoryNotification() {
  const { notification, clearNotification } = useDirectory();
  if (!notification) return null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
      <div className="flex items-center gap-2">
        <CheckCircleOutlinedIcon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button type="button" onClick={clearNotification} className="text-caption underline opacity-70 hover:opacity-100">
        Dismiss
      </button>
    </div>
  );
}

function DirectoryContent() {
  const { filteredEmployees } = useDirectory();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <DirectoryNotification />

      <PageIntro
        icon={<BadgeOutlinedIcon sx={{ fontSize: 22 }} />}
        title="Directory"
        description="Find colleagues, view profiles, and connect across departments and locations."
      />

      <DirectoryStats />
      <DirectoryFilters />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        <InviteTeamCard />
      </section>

      {filteredEmployees.length === 0 && (
        <p className="text-center text-body-md text-on-surface-variant">
          No employees match your filters.
        </p>
      )}

      <DirectoryModals />
    </div>
  );
}

export default function DirectoryView() {
  return (
    <DirectoryProvider>
      <DirectoryContent />
    </DirectoryProvider>
  );
}
