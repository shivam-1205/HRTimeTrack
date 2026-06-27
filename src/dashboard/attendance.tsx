import AttendanceCalendar from "../components/dashboard/attendance/AttendanceCalendar";
import AttendanceDetailedLog from "../components/dashboard/attendance/AttendanceDetailedLog";
import AttendanceHeader from "../components/dashboard/attendance/AttendanceHeader";
import DashboardPageShell from "../components/dashboard/DashboardPageShell";

export default function AttendancePage() {
  return (
    <DashboardPageShell>
      <AttendanceHeader />
      <AttendanceCalendar />
      <AttendanceDetailedLog />
    </DashboardPageShell>
  );
}
