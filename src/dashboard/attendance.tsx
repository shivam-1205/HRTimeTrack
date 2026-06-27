import AttendanceView from "../components/dashboard/attendance/AttendanceView";
import DashboardPageShell from "../components/dashboard/DashboardPageShell";

export default function AttendancePage() {
  return (
    <DashboardPageShell>
      <AttendanceView />
    </DashboardPageShell>
  );
}
