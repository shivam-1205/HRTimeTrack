import type { DirectoryEmployee } from "./directoryTypes";

export function filterDirectoryEmployees(
  employees: DirectoryEmployee[],
  search: string,
  department: string,
  location: string,
): DirectoryEmployee[] {
  const query = search.trim().toLowerCase();
  return employees.filter((emp) => {
    const deptMatch = department === "all" || emp.department === department;
    const locMatch =
      location === "all" ||
      emp.location.toLowerCase().includes(location.toLowerCase());
    const searchMatch =
      !query ||
      emp.name.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query);
    return deptMatch && locMatch && searchMatch;
  });
}

export function formatStatNumber(value: number) {
  return value.toLocaleString("en-US");
}
