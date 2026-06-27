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
  EXTRA_DAYS_FORM,
  EXTRA_DAYS_META,
  EXTRA_WORKING_DAYS_INITIAL,
  type ExtraDayRequest,
  type ExtraWorkingDayRow,
  type StatusFilter,
} from "../extraWorkingDaysTypes";
import {
  computeStatusCounts,
  exportExtraDaysCsv,
  filterByStatus,
  requestToRow,
  validateRequest,
} from "../extraWorkingDaysUtils";

type Notification = { type: "success" | "info" | "error"; message: string };
type ModalType = "request" | "editNote" | "detail" | null;

type ExtraWorkingDaysContextValue = {
  meta: typeof EXTRA_DAYS_META;
  formOptions: typeof EXTRA_DAYS_FORM;
  records: ExtraWorkingDayRow[];
  filteredRecords: ExtraWorkingDayRow[];
  statusCounts: ReturnType<typeof computeStatusCounts>;
  statusFilter: StatusFilter;
  activeModal: ModalType;
  selectedRow: ExtraWorkingDayRow | null;
  notification: Notification | null;
  setStatusFilter: (filter: StatusFilter) => void;
  openRequestModal: () => void;
  openEditNote: (row: ExtraWorkingDayRow) => void;
  openDetail: (row: ExtraWorkingDayRow) => void;
  closeModal: () => void;
  submitRequest: (request: ExtraDayRequest) => void;
  saveNote: (id: string, note: string) => void;
  exportRecords: () => void;
  clearNotification: () => void;
};

const ExtraWorkingDaysContext = createContext<ExtraWorkingDaysContextValue | null>(null);

export function ExtraWorkingDaysProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<ExtraWorkingDayRow[]>(EXTRA_WORKING_DAYS_INITIAL);
  const [statusFilter, setStatusFilterState] = useState<StatusFilter>("all");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedRow, setSelectedRow] = useState<ExtraWorkingDayRow | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 4000);
  }, []);

  const statusCounts = useMemo(() => computeStatusCounts(records), [records]);
  const filteredRecords = useMemo(
    () => filterByStatus(records, statusFilter),
    [records, statusFilter],
  );

  const setStatusFilter = useCallback((filter: StatusFilter) => {
    setStatusFilterState(filter);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedRow(null);
  }, []);

  const openRequestModal = useCallback(() => {
    setSelectedRow(null);
    setActiveModal("request");
  }, []);

  const openEditNote = useCallback((row: ExtraWorkingDayRow) => {
    if (row.status !== "pending" && row.status !== "on_hold") {
      showNotification("info", "Only pending or on-hold requests can be edited.");
      return;
    }
    setSelectedRow(row);
    setActiveModal("editNote");
  }, [showNotification]);

  const openDetail = useCallback((row: ExtraWorkingDayRow) => {
    setSelectedRow(row);
    setActiveModal("detail");
  }, []);

  const submitRequest = useCallback(
    (request: ExtraDayRequest) => {
      const err = validateRequest(request);
      if (err) {
        showNotification("error", err);
        return;
      }
      const row = requestToRow(request);
      setRecords((prev) => [row, ...prev]);
      closeModal();
      showNotification("success", "Extra working day request submitted successfully.");
    },
    [closeModal, showNotification],
  );

  const saveNote = useCallback(
    (id: string, note: string) => {
      if (!note.trim()) {
        showNotification("error", "Note cannot be empty.");
        return;
      }
      setRecords((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, note, remarks: note } : r,
        ),
      );
      closeModal();
      showNotification("success", "Note updated successfully.");
    },
    [closeModal, showNotification],
  );

  const exportRecords = useCallback(() => {
    exportExtraDaysCsv(filteredRecords);
    showNotification("success", "Extra working days exported.");
  }, [filteredRecords, showNotification]);

  const value = useMemo(
    (): ExtraWorkingDaysContextValue => ({
      meta: { ...EXTRA_DAYS_META, pendingBalance: statusCounts.pending },
      formOptions: EXTRA_DAYS_FORM,
      records,
      filteredRecords,
      statusCounts,
      statusFilter,
      activeModal,
      selectedRow,
      notification,
      setStatusFilter,
      openRequestModal,
      openEditNote,
      openDetail,
      closeModal,
      submitRequest,
      saveNote,
      exportRecords,
      clearNotification: () => setNotification(null),
    }),
    [
      records,
      filteredRecords,
      statusCounts,
      statusFilter,
      activeModal,
      selectedRow,
      notification,
      setStatusFilter,
      openRequestModal,
      openEditNote,
      openDetail,
      closeModal,
      submitRequest,
      saveNote,
      exportRecords,
    ],
  );

  return (
    <ExtraWorkingDaysContext.Provider value={value}>{children}</ExtraWorkingDaysContext.Provider>
  );
}

export function useExtraWorkingDays() {
  const context = useContext(ExtraWorkingDaysContext);
  if (!context) {
    throw new Error("useExtraWorkingDays must be used within ExtraWorkingDaysProvider");
  }
  return context;
}
