import DashboardCard from "./DashboardCard";

export default function DashboardHero() {
  return (
    <DashboardCard
      variant="tinted"
      className="relative flex flex-col items-center justify-between overflow-hidden p-8 md:flex-row"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-primary-container/5 to-transparent" />
      <div className="relative z-10 space-y-2 text-center md:text-left">
        <h1 className="text-h1 font-semibold text-on-surface">Welcome, Shivam Singh</h1>
        <p className="text-body-lg text-on-surface-variant">
          Here is a summary of your attendance and performance today.
        </p>
      </div>
      <div className="relative z-10 mt-6 md:mt-0">
        <p className="mb-1 text-label-md text-outline">Current Shift</p>
        <p className="rounded-xl border border-outline-variant/70 bg-surface-container-lowest px-5 py-2.5 text-h3 font-semibold text-on-surface shadow-sm">
          09:00 AM - 06:00 PM
        </p>
      </div>
    </DashboardCard>
  );
}
