import ActiveSessionsCard from "./ActiveSessionsCard";
import LoginActivityTable from "./LoginActivityTable";
import PersonalInformationForm from "./PersonalInformationForm";
import ProfileOverviewCard from "./ProfileOverviewCard";
import SecurityCard from "./SecurityCard";
import SettingsHeader from "./SettingsHeader";

export default function AccountSettingsView() {
  return (
    <>
      <SettingsHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <ProfileOverviewCard />
          <PersonalInformationForm />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <SecurityCard />
          <LoginActivityTable />
          <ActiveSessionsCard />
        </div>
      </div>
    </>
  );
}
