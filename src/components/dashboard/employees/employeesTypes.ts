import employeesResponse from "./employeesData.json";

export type EmployeeStatus = "Active" | "On Leave" | "Probation";

export type EmployeeRecord = {
  id: string;
  name: string;
  department: string;
  designation: string;
  phone: string;
  joiningDate: string;
  email: string;
  location: string;
  employeeId: string;
  manager: string;
  status: EmployeeStatus;
  avatar?: string;
  skills: string[];
  bio: string;
};

export type DepartmentFilter = string;
export type StatusFilter = "all" | EmployeeStatus;

export type EmployeesApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: { companyName: string; totalEmployees: number };
    departments: { value: string; label: string }[];
    statuses: { value: string; label: string }[];
    employees: EmployeeRecord[];
  };
};

const response = employeesResponse as EmployeesApiResponse;

export const EMPLOYEES_META = response.data.meta;
export const EMPLOYEE_DEPARTMENTS = response.data.departments;
export const EMPLOYEE_STATUSES = response.data.statuses;
export const EMPLOYEES_INITIAL = response.data.employees;

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function statusToTone(status: EmployeeStatus): "success" | "warning" | "info" {
  if (status === "Active") return "success";
  if (status === "On Leave") return "warning";
  return "info";
}
