"use client";

import { DashboardTrackerProvider } from "./context/DashboardTrackerContext";
import AnalyticsGrid from "./AnalyticsGrid";
import AnnouncementsPanel from "./AnnouncementsPanel";
import DashboardHero from "./DashboardHero";
import LiveTrackerCard from "./LiveTrackerCard";
import RecentAttendanceTable from "./RecentAttendanceTable";

export default function DashboardView() {
  return (
    <DashboardTrackerProvider>
      <DashboardHero />

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-4">
        <LiveTrackerCard />
        <AnalyticsGrid />
        <AnnouncementsPanel />
      </div>

      <RecentAttendanceTable />
    </DashboardTrackerProvider>
  );
}
