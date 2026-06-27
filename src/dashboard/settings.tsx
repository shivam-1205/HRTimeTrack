import AccountSettingsView from "../components/dashboard/settings/AccountSettingsView";
import DashboardPageShell from "../components/dashboard/DashboardPageShell";

export default function SettingsPage() {
  return (
    <DashboardPageShell>
      <AccountSettingsView />
    </DashboardPageShell>
  );
}
