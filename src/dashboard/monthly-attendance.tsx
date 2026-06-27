import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import MonthlyAttendanceView from "../components/dashboard/monthly-attendance/MonthlyAttendanceView";

export default function MonthlyAttendancePage() {
  return (
    <DashboardPageShell>
      <MonthlyAttendanceView />
    </DashboardPageShell>
  );
}
