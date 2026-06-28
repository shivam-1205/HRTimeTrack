"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  EMPLOYEES_INITIAL,
  EMPLOYEES_META,
  EMPLOYEE_DEPARTMENTS,
  EMPLOYEE_STATUSES,
  type DepartmentFilter,
  type EmployeeRecord,
  type StatusFilter,
} from "../employeesTypes";
import { exportEmployeesCsv, filterEmployees } from "../employeesUtils";

type ModalType = "detail" | "edit" | null;
type Notification = { type: "success" | "info"; message: string };

type EmployeesContextValue = {
  meta: typeof EMPLOYEES_META;
  departments: typeof EMPLOYEE_DEPARTMENTS;
  statuses: typeof EMPLOYEE_STATUSES;
  employees: EmployeeRecord[];
  filteredEmployees: EmployeeRecord[];
  search: string;
  departmentFilter: DepartmentFilter;
  statusFilter: StatusFilter;
  activeModal: ModalType;
  selectedEmployee: EmployeeRecord | null;
  notification: Notification | null;
  setSearch: (value: string) => void;
  setDepartmentFilter: (value: DepartmentFilter) => void;
  setStatusFilter: (value: StatusFilter) => void;
  openDetail: (employee: EmployeeRecord) => void;
  openEdit: (employee: EmployeeRecord) => void;
  closeModal: () => void;
  saveEmployee: (updated: EmployeeRecord) => void;
  exportEmployees: () => void;
  clearNotification: () => void;
};

const EmployeesContext = createContext<EmployeesContextValue | null>(null);

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState(EMPLOYEES_INITIAL);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, search, departmentFilter, statusFilter),
    [employees, search, departmentFilter, statusFilter],
  );

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 3500);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedEmployee(null);
  }, []);

  const openDetail = useCallback((employee: EmployeeRecord) => {
    setSelectedEmployee(employee);
    setActiveModal("detail");
  }, []);

  const openEdit = useCallback((employee: EmployeeRecord) => {
    setSelectedEmployee(employee);
    setActiveModal("edit");
  }, []);

  const saveEmployee = useCallback(
    (updated: EmployeeRecord) => {
      setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      closeModal();
      showNotification("success", `${updated.name}'s profile updated.`);
    },
    [closeModal, showNotification],
  );

  const exportEmployees = useCallback(() => {
    exportEmployeesCsv(filteredEmployees);
    showNotification("info", `Exported ${filteredEmployees.length} employee(s).`);
  }, [filteredEmployees, showNotification]);

  const value = useMemo(
    () => ({
      meta: EMPLOYEES_META,
      departments: EMPLOYEE_DEPARTMENTS,
      statuses: EMPLOYEE_STATUSES,
      employees,
      filteredEmployees,
      search,
      departmentFilter,
      statusFilter,
      activeModal,
      selectedEmployee,
      notification,
      setSearch,
      setDepartmentFilter,
      setStatusFilter,
      openDetail,
      openEdit,
      closeModal,
      saveEmployee,
      exportEmployees,
      clearNotification: () => setNotification(null),
    }),
    [
      employees,
      filteredEmployees,
      search,
      departmentFilter,
      statusFilter,
      activeModal,
      selectedEmployee,
      notification,
      closeModal,
      openDetail,
      openEdit,
      saveEmployee,
      exportEmployees,
    ],
  );

  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>;
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx) throw new Error("useEmployees must be used within EmployeesProvider");
  return ctx;
}
