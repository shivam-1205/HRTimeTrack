import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import LeaveBalanceView from "../components/dashboard/leave-balance/LeaveBalanceView";

export default function LeaveBalancePage() {
  return (
    <DashboardPageShell>
      <LeaveBalanceView />
    </DashboardPageShell>
  );
}
