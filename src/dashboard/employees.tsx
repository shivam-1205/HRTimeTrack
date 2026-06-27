import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import EmployeesView from "../components/dashboard/employees/EmployeesView";

export default function EmployeesPage() {
  return (
    <DashboardPageShell>
      <EmployeesView />
    </DashboardPageShell>
  );
}
