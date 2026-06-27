import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import LeaveManagementView from "../components/dashboard/leave-management/LeaveManagementView";

export default function LeaveManagementPage() {
  return (
    <DashboardPageShell>
      <LeaveManagementView />
    </DashboardPageShell>
  );
}
