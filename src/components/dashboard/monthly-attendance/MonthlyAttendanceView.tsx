import AttendanceAlertBanner from "./AttendanceAlertBanner";
import AttendanceHeroSummary from "./AttendanceHeroSummary";
import AttendanceKpiCards from "./AttendanceKpiCards";
import AttendanceOverviewHeader from "./AttendanceOverviewHeader";
import QuickActionsPanel from "./QuickActionsPanel";
import RecentAttendanceLogs from "./RecentAttendanceLogs";
import TodaysActivity from "./TodaysActivity";
import UpcomingHolidayWidget from "./UpcomingHolidayWidget";
import WorkingHoursTrend from "./WorkingHoursTrend";

export default function MonthlyAttendanceView() {
  return (
    <div className="flex flex-col gap-8">
      <AttendanceOverviewHeader />
      <AttendanceHeroSummary />
      <AttendanceAlertBanner />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <AttendanceKpiCards />
          <WorkingHoursTrend />
          <RecentAttendanceLogs />
        </div>
        <div className="flex flex-col gap-8 lg:col-span-4">
          <TodaysActivity />
          <QuickActionsPanel />
          <UpcomingHolidayWidget />
        </div>
      </div>
    </div>
  );
}
