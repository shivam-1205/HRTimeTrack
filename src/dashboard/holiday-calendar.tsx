import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import HolidayCalendarView from "../components/dashboard/leave/HolidayCalendarView";

export default function HolidayCalendarPage() {
  return (
    <DashboardPageShell>
      <HolidayCalendarView />
    </DashboardPageShell>
  );
}
