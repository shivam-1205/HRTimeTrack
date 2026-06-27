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
  HOLIDAY_MESSAGES,
  LEAVE_FORM_OPTIONS,
  LEAVE_META,
  LEAVE_REQUESTS_INITIAL,
  type HolidayMessage,
  type LeaveRequestForm,
  type LeaveRequestRow,
  type PeriodFilter,
  type StatusFilter,
} from "../leaveManagementTypes";
import {
  computeHistoryStats,
  computeSummaryCounts,
  exportLeavesCsv,
  filterByStatus,
  formToLeaveRequest,
  validateLeaveForm,
} from "../leaveManagementUtils";

type Notification = { type: "success" | "info" | "error"; message: string };
type ModalType = "request" | "leaveDetail" | "holidayMessage" | "reply" | null;

type LeaveManagementContextValue = {
  meta: typeof LEAVE_META;
  formOptions: typeof LEAVE_FORM_OPTIONS;
  leaveRequests: LeaveRequestRow[];
  filteredRequests: LeaveRequestRow[];
  holidayMessages: HolidayMessage[];
  summary: ReturnType<typeof computeSummaryCounts>;
  historyStats: ReturnType<typeof computeHistoryStats>;
  statusFilter: StatusFilter;
  period: PeriodFilter;
  monthValue: string;
  year: number;
  activeModal: ModalType;
  selectedLeave: LeaveRequestRow | null;
  selectedHolidayMessage: HolidayMessage | null;
  notification: Notification | null;
  setStatusFilter: (filter: StatusFilter) => void;
  setPeriod: (period: PeriodFilter) => void;
  setMonthValue: (value: string) => void;
  setYear: (year: number) => void;
  openRequestModal: () => void;
  openLeaveDetail: (leave: LeaveRequestRow) => void;
  openHolidayMessage: (message: HolidayMessage) => void;
  openReply: (leave: LeaveRequestRow) => void;
  closeModal: () => void;
  submitLeaveRequest: (form: LeaveRequestForm) => void;
  sendReply: (leaveId: string, body: string) => void;
  exportRequests: () => void;
  clearNotification: () => void;
};

const LeaveManagementContext = createContext<LeaveManagementContextValue | null>(null);

export function LeaveManagementProvider({ children }: { children: ReactNode }) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestRow[]>(LEAVE_REQUESTS_INITIAL);
  const [holidayMessages] = useState<HolidayMessage[]>(HOLIDAY_MESSAGES);
  const [statusFilter, setStatusFilterState] = useState<StatusFilter>("all");
  const [period, setPeriodState] = useState<PeriodFilter>("monthly");
  const [monthValue, setMonthValueState] = useState(LEAVE_FORM_OPTIONS.months[0]?.value ?? "2026-06");
  const [year, setYearState] = useState(LEAVE_FORM_OPTIONS.years[0] ?? 2026);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequestRow | null>(null);
  const [selectedHolidayMessage, setSelectedHolidayMessage] = useState<HolidayMessage | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 4000);
  }, []);

  const summary = useMemo(() => computeSummaryCounts(leaveRequests), [leaveRequests]);
  const filteredRequests = useMemo(
    () => filterByStatus(leaveRequests, statusFilter),
    [leaveRequests, statusFilter],
  );
  const historyStats = useMemo(
    () => computeHistoryStats(leaveRequests, period, monthValue, year),
    [leaveRequests, period, monthValue, year],
  );

  const setStatusFilter = useCallback((filter: StatusFilter) => setStatusFilterState(filter), []);
  const setPeriod = useCallback((p: PeriodFilter) => setPeriodState(p), []);
  const setMonthValue = useCallback((v: string) => setMonthValueState(v), []);
  const setYear = useCallback((y: number) => setYearState(y), []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedLeave(null);
    setSelectedHolidayMessage(null);
  }, []);

  const openRequestModal = useCallback(() => {
    setSelectedLeave(null);
    setSelectedHolidayMessage(null);
    setActiveModal("request");
  }, []);

  const openLeaveDetail = useCallback((leave: LeaveRequestRow) => {
    setSelectedLeave(leave);
    setSelectedHolidayMessage(null);
    setActiveModal("leaveDetail");
  }, []);

  const openHolidayMessage = useCallback(
    (message: HolidayMessage) => {
      setSelectedHolidayMessage(message);
      const related = leaveRequests.find((r) => r.id === message.relatedLeaveId);
      setSelectedLeave(related ?? null);
      setActiveModal("holidayMessage");
    },
    [leaveRequests],
  );

  const openReply = useCallback((leave: LeaveRequestRow) => {
    setSelectedLeave(leave);
    setActiveModal("reply");
  }, []);

  const submitLeaveRequest = useCallback(
    (form: LeaveRequestForm) => {
      const err = validateLeaveForm(form);
      if (err) {
        showNotification("error", err);
        return;
      }
      const row = formToLeaveRequest(form);
      setLeaveRequests((prev) => [row, ...prev]);
      closeModal();
      showNotification("success", "Leave request sent successfully.");
    },
    [closeModal, showNotification],
  );

  const sendReply = useCallback(
    (leaveId: string, body: string) => {
      if (!body.trim()) {
        showNotification("error", "Message cannot be empty.");
        return;
      }
      const sentAt = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave.id === leaveId
            ? {
                ...leave,
                messages: [
                  ...leave.messages,
                  {
                    id: `msg-${crypto.randomUUID()}`,
                    direction: "sent",
                    from: LEAVE_META.employeeName,
                    to: LEAVE_META.managerName,
                    subject: `Re: ${leave.subject}`,
                    body,
                    sentAt,
                  },
                ],
              }
            : leave,
        ),
      );
      closeModal();
      showNotification("success", "Follow-up message sent.");
    },
    [closeModal, showNotification],
  );

  const exportRequests = useCallback(() => {
    exportLeavesCsv(filteredRequests);
    showNotification("success", "Leave requests exported.");
  }, [filteredRequests, showNotification]);

  const value = useMemo(
    (): LeaveManagementContextValue => ({
      meta: LEAVE_META,
      formOptions: LEAVE_FORM_OPTIONS,
      leaveRequests,
      filteredRequests,
      holidayMessages,
      summary,
      historyStats,
      statusFilter,
      period,
      monthValue,
      year,
      activeModal,
      selectedLeave,
      selectedHolidayMessage,
      notification,
      setStatusFilter,
      setPeriod,
      setMonthValue,
      setYear,
      openRequestModal,
      openLeaveDetail,
      openHolidayMessage,
      openReply,
      closeModal,
      submitLeaveRequest,
      sendReply,
      exportRequests,
      clearNotification: () => setNotification(null),
    }),
    [
      leaveRequests,
      filteredRequests,
      holidayMessages,
      summary,
      historyStats,
      statusFilter,
      period,
      monthValue,
      year,
      activeModal,
      selectedLeave,
      selectedHolidayMessage,
      notification,
      setStatusFilter,
      setPeriod,
      setMonthValue,
      setYear,
      openRequestModal,
      openLeaveDetail,
      openHolidayMessage,
      openReply,
      closeModal,
      submitLeaveRequest,
      sendReply,
      exportRequests,
    ],
  );

  return (
    <LeaveManagementContext.Provider value={value}>{children}</LeaveManagementContext.Provider>
  );
}

export function useLeaveManagement() {
  const context = useContext(LeaveManagementContext);
  if (!context) {
    throw new Error("useLeaveManagement must be used within LeaveManagementProvider");
  }
  return context;
}
