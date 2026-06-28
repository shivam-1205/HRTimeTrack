import type { DepartmentFilter, EmployeeRecord, StatusFilter } from "./employeesTypes";

export function filterEmployees(
  employees: EmployeeRecord[],
  search: string,
  department: DepartmentFilter,
  status: StatusFilter,
): EmployeeRecord[] {
  const query = search.trim().toLowerCase();
  return employees.filter((emp) => {
    const deptMatch = department === "all" || emp.department === department;
    const statusMatch = status === "all" || emp.status === status;
    const searchMatch =
      !query ||
      emp.name.toLowerCase().includes(query) ||
      emp.designation.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.employeeId.toLowerCase().includes(query);
    return deptMatch && statusMatch && searchMatch;
  });
}

export function exportEmployeesCsv(employees: EmployeeRecord[]) {
  const headers = ["Name", "Employee ID", "Department", "Designation", "Email", "Phone", "Status", "Joining Date"];
  const rows = employees.map((e) => [
    e.name,
    e.employeeId,
    e.department,
    e.designation,
    e.email,
    e.phone,
    e.status,
    e.joiningDate,
  ]);
  const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employees-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}
