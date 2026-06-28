import directoryResponse from "./directoryData.json";

export type DirectoryEmployee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  employeeId: string;
  manager: string;
  status: "Active" | "On Leave" | "Probation";
  skills: string[];
  bio: string;
  avatar: string;
};

export type DirectoryStats = {
  totalEmployees: number;
  newJoiners: number;
  departments: number;
};

export type DirectoryApiResponse = {
  success: boolean;
  message: string;
  data: {
    stats: DirectoryStats;
    filterOptions: {
      departments: { value: string; label: string }[];
      locations: { value: string; label: string }[];
    };
    employees: DirectoryEmployee[];
  };
};

const response = directoryResponse as DirectoryApiResponse;

export const DIRECTORY_STATS = response.data.stats;
export const DIRECTORY_DEPARTMENTS = response.data.filterOptions.departments;
export const DIRECTORY_LOCATIONS = response.data.filterOptions.locations;
export const DIRECTORY_EMPLOYEES_INITIAL = response.data.employees;

export function getDirectoryInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
