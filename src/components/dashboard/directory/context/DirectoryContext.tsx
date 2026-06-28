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
  DIRECTORY_DEPARTMENTS,
  DIRECTORY_EMPLOYEES_INITIAL,
  DIRECTORY_LOCATIONS,
  DIRECTORY_STATS,
  type DirectoryEmployee,
} from "../directoryTypes";
import { filterDirectoryEmployees } from "../directoryUtils";

type ModalType = "profile" | "message" | "invite" | null;
type Notification = { type: "success" | "info"; message: string };

type DirectoryContextValue = {
  stats: typeof DIRECTORY_STATS;
  departments: typeof DIRECTORY_DEPARTMENTS;
  locations: typeof DIRECTORY_LOCATIONS;
  employees: DirectoryEmployee[];
  filteredEmployees: DirectoryEmployee[];
  search: string;
  departmentFilter: string;
  locationFilter: string;
  activeModal: ModalType;
  selectedEmployee: DirectoryEmployee | null;
  notification: Notification | null;
  setSearch: (value: string) => void;
  setDepartmentFilter: (value: string) => void;
  setLocationFilter: (value: string) => void;
  openProfile: (employee: DirectoryEmployee) => void;
  openMessage: (employee: DirectoryEmployee) => void;
  openInvite: () => void;
  closeModal: () => void;
  sendMessage: (body: string) => void;
  sendInvite: (email: string) => void;
  clearNotification: () => void;
};

const DirectoryContext = createContext<DirectoryContextValue | null>(null);

export function DirectoryProvider({ children }: { children: ReactNode }) {
  const [employees] = useState(DIRECTORY_EMPLOYEES_INITIAL);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<DirectoryEmployee | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const filteredEmployees = useMemo(
    () => filterDirectoryEmployees(employees, search, departmentFilter, locationFilter),
    [employees, search, departmentFilter, locationFilter],
  );

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 3500);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedEmployee(null);
  }, []);

  const openProfile = useCallback((employee: DirectoryEmployee) => {
    setSelectedEmployee(employee);
    setActiveModal("profile");
  }, []);

  const openMessage = useCallback((employee: DirectoryEmployee) => {
    setSelectedEmployee(employee);
    setActiveModal("message");
  }, []);

  const openInvite = useCallback(() => setActiveModal("invite"), []);

  const sendMessage = useCallback(
    (body: string) => {
      if (!selectedEmployee || !body.trim()) return;
      closeModal();
      showNotification("success", `Message sent to ${selectedEmployee.name}.`);
    },
    [selectedEmployee, closeModal, showNotification],
  );

  const sendInvite = useCallback(
    (email: string) => {
      if (!email.trim()) return;
      closeModal();
      showNotification("success", `Invitation sent to ${email}.`);
    },
    [closeModal, showNotification],
  );

  const value = useMemo(
    () => ({
      stats: DIRECTORY_STATS,
      departments: DIRECTORY_DEPARTMENTS,
      locations: DIRECTORY_LOCATIONS,
      employees,
      filteredEmployees,
      search,
      departmentFilter,
      locationFilter,
      activeModal,
      selectedEmployee,
      notification,
      setSearch,
      setDepartmentFilter,
      setLocationFilter,
      openProfile,
      openMessage,
      openInvite,
      closeModal,
      sendMessage,
      sendInvite,
      clearNotification: () => setNotification(null),
    }),
    [
      employees,
      filteredEmployees,
      search,
      departmentFilter,
      locationFilter,
      activeModal,
      selectedEmployee,
      notification,
      closeModal,
      openProfile,
      openMessage,
      openInvite,
      sendMessage,
      sendInvite,
    ],
  );

  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>;
}

export function useDirectory() {
  const ctx = useContext(DirectoryContext);
  if (!ctx) throw new Error("useDirectory must be used within DirectoryProvider");
  return ctx;
}
