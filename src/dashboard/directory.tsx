import DashboardPageShell from "../components/dashboard/DashboardPageShell";
import DirectoryFilters from "../components/dashboard/directory/DirectoryFilters";
import DirectoryStats from "../components/dashboard/directory/DirectoryStats";
import EmployeeDirectoryGrid from "../components/dashboard/directory/EmployeeDirectoryGrid";

export default function DirectoryPage() {
  return (
    <DashboardPageShell>
      <DirectoryStats />
      <DirectoryFilters />
      <EmployeeDirectoryGrid />
    </DashboardPageShell>
  );
}
