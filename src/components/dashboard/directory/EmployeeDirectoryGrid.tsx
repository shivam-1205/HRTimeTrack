import EmployeeCard from "./EmployeeCard";
import InviteTeamCard from "./InviteTeamCard";
import { EMPLOYEES } from "./employees";

export default function EmployeeDirectoryGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {EMPLOYEES.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
      <InviteTeamCard />
    </section>
  );
}
