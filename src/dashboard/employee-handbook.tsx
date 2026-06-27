import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import EmployeeHandbookView from "../components/dashboard/employee-handbook/EmployeeHandbookView";

export default function EmployeeHandbookPage() {
  return (
    <DashboardPageShell>
      <EmployeeHandbookView />
    </DashboardPageShell>
  );
}
