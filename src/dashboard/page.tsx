import AnalyticsGrid from "../components/dashboard/AnalyticsGrid";
import AnnouncementsPanel from "../components/dashboard/AnnouncementsPanel";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import LiveTrackerCard from "../components/dashboard/LiveTrackerCard";
import RecentAttendanceTable from "../components/dashboard/RecentAttendanceTable";

export default function DashboardPage() {
  return (
    <DashboardPageShell>
      <DashboardHero />

      <div className="grid grid-cols-1 gap-lg md:grid-cols-3 lg:grid-cols-4">
        <LiveTrackerCard />
        <AnalyticsGrid />
        <AnnouncementsPanel />
      </div>

      <RecentAttendanceTable />
    </DashboardPageShell>
  );
}
