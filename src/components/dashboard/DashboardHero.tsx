import { DASHBOARD_DATA } from "./data/dashboardTypes";
import DashboardCard from "./DashboardCard";

export default function DashboardHero() {
  const { user } = DASHBOARD_DATA;

  return (
    <DashboardCard
    variant="tinted"
    className="relative flex flex-col items-center justify-between overflow-hidden p-8 md:flex-row"
  >
     <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-container/5 to-transparent" />
      <div className="relative z-10 space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-semibold text-on-surface">Welcome, {user.name}</h1>
        <p className="w-full text-body-lg text-on-surface-variant">
          Here is a summary of your attendance and performance.
        </p>
      </div>
      <div className="relative z-10 shrink-0 text-center md:text-right">
        <p className="mb-1.5 text-label-md text-on-surface-variant font-bold">Current Shift</p>
        <p className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-5 py-2.5 text-h3 font-semibold text-on-surface shadow-sm">
          {user.shiftLabel}
        </p>
      </div>
    </DashboardCard>
  );
}
