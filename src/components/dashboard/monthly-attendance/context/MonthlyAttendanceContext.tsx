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
  CHART_DATA,
  FORM_DEFAULTS,
  KPI_STATS,
  LEAVE_TYPES,
  OVERVIEW_ALERT,
  OVERVIEW_META,
  OVERVIEW_PROFILE,
  OVERVIEW_SCORES,
  RECENT_LOGS,
  TODAY_ACTIVITY,
  UPCOMING_HOLIDAY,
  type AttendanceLogRow,
  type ChartBar,
  type KpiStat,
  type LogDetail,
} from "../monthlyAttendanceTypes";
import {
  exportOverviewCsv,
  findLogById,
  formatClockOutNow,
} from "../monthlyAttendanceUtils";

type Notification = { type: "success" | "info" | "error"; message: string };

type ModalType =
  | "logDetail"
  | "applyLeave"
  | "regularize"
  | "wfh"
  | "incomplete"
  | "holiday"
  | "kpi"
  | "allLogs"
  | null;

type MonthlyAttendanceContextValue = {
  meta: typeof OVERVIEW_META;
  profile: typeof OVERVIEW_PROFILE & { isClockedIn: boolean };
  alert: typeof OVERVIEW_ALERT;
  kpis: KpiStat[];
  scores: typeof OVERVIEW_SCORES;
  recentLogs: AttendanceLogRow[];
  todayActivity: typeof TODAY_ACTIVITY;
  upcomingHoliday: typeof UPCOMING_HOLIDAY;
  leaveTypes: typeof LEAVE_TYPES;
  formDefaults: typeof FORM_DEFAULTS;
  chartPeriod: "week" | "month";
  chartBars: ChartBar[];
  chartRangeLabel: string;
  activeModal: ModalType;
  selectedLog: AttendanceLogRow | null;
  selectedLogDetail: LogDetail | null;
  selectedKpi: KpiStat | null;
  regularizeLogId: string | null;
  notification: Notification | null;
  setChartPeriod: (period: "week" | "month") => void;
  openLogDetail: (log: AttendanceLogRow) => void;
  openLogDetailById: (logId: string | null) => void;
  openRegularize: (logId?: string) => void;
  openApplyLeave: () => void;
  openWfh: () => void;
  openIncompleteLogs: () => void;
  openHolidayDetail: () => void;
  openKpiDetail: (kpi: KpiStat) => void;
  openAllLogs: () => void;
  closeModal: () => void;
  clockOut: () => void;
  submitRegularize: (data: {
    logId: string;
    clockOut: string;
    reason: string;
  }) => void;
  submitLeave: (data: {
    leaveType: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) => void;
  submitWfh: (data: { date: string; reason: string }) => void;
  downloadReport: () => void;
  clearNotification: () => void;
};

const MonthlyAttendanceContext = createContext<MonthlyAttendanceContextValue | null>(null);

export function MonthlyAttendanceProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState({ ...OVERVIEW_PROFILE });
  const [recentLogs, setRecentLogs] = useState<AttendanceLogRow[]>(RECENT_LOGS);
  const [kpis, setKpis] = useState<KpiStat[]>([...KPI_STATS]);
  const [alert, setAlert] = useState({ ...OVERVIEW_ALERT });
  const [todayActivity, setTodayActivity] = useState({ ...TODAY_ACTIVITY });
  const [chartPeriod, setChartPeriodState] = useState<"week" | "month">("month");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedLog, setSelectedLog] = useState<AttendanceLogRow | null>(null);
  const [selectedKpi, setSelectedKpi] = useState<KpiStat | null>(null);
  const [regularizeLogId, setRegularizeLogId] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 4000);
  }, []);

  const chartBars = chartPeriod === "week" ? CHART_DATA.week.bars : CHART_DATA.month.bars;
  const chartRangeLabel =
    chartPeriod === "week" ? CHART_DATA.week.rangeLabel : CHART_DATA.month.rangeLabel;

  const selectedLogDetail = selectedLog?.detail ?? null;

  const setChartPeriod = useCallback((period: "week" | "month") => {
    setChartPeriodState(period);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedLog(null);
    setSelectedKpi(null);
    setRegularizeLogId(null);
  }, []);

  const openLogDetail = useCallback((log: AttendanceLogRow) => {
    setSelectedLog(log);
    setActiveModal("logDetail");
  }, []);

  const openLogDetailById = useCallback(
    (logId: string | null) => {
      const log = findLogById(recentLogs, logId);
      if (log) openLogDetail(log);
    },
    [recentLogs, openLogDetail],
  );

  const openRegularize = useCallback((logId?: string) => {
    setRegularizeLogId(logId ?? null);
    setActiveModal("regularize");
  }, []);

  const openApplyLeave = useCallback(() => setActiveModal("applyLeave"), []);
  const openWfh = useCallback(() => setActiveModal("wfh"), []);
  const openIncompleteLogs = useCallback(() => setActiveModal("incomplete"), []);
  const openHolidayDetail = useCallback(() => setActiveModal("holiday"), []);
  const openKpiDetail = useCallback((kpi: KpiStat) => {
    setSelectedKpi(kpi);
    setActiveModal("kpi");
  }, []);
  const openAllLogs = useCallback(() => setActiveModal("allLogs"), []);

  const clockOut = useCallback(() => {
    if (!profile.isClockedIn) {
      showNotification("info", "You are already clocked out.");
      return;
    }
    const clockOutTime = formatClockOutNow();
    setProfile((p) => ({
      ...p,
      isClockedIn: false,
      status: "Clocked Out",
      workingHours: { hours: 8, minutes: 15 },
    }));
    setRecentLogs((logs) =>
      logs.map((log) =>
        log.id === "1"
          ? {
              ...log,
              clockOut: clockOutTime,
              totalHrs: "08h 15m",
              detail: {
                ...log.detail,
                logoutTime: clockOutTime,
                liveSession: "Closed",
                totalWorked: "08h 15m",
                remarks: "Clocked out successfully.",
              },
            }
          : log,
      ),
    );
    setTodayActivity((activity) => ({
      ...activity,
      progressPercent: 100,
      timeline: activity.timeline.map((item) =>
        item.variant === "pending"
          ? { ...item, label: "Clocked Out", time: clockOutTime, variant: "success" as const }
          : item,
      ),
    }));
    showNotification("success", `Clocked out at ${clockOutTime}.`);
  }, [profile.isClockedIn, showNotification]);

  const submitRegularize = useCallback(
    (data: { logId: string; clockOut: string; reason: string }) => {
      setRecentLogs((logs) =>
        logs.map((log) =>
          log.id === data.logId
            ? {
                ...log,
                status: "Present",
                statusVariant: "present" as const,
                clockOut: data.clockOut,
                clockOutClass: undefined,
                dayClass: undefined,
                totalHrs: "08h 00m",
                action: "menu" as const,
                highlight: false,
                detail: {
                  ...log.detail,
                  onTimeLabel: "On Time",
                  logoutTime: data.clockOut,
                  liveSession: "Closed",
                  totalWorked: "08h 00m",
                  remarks: data.reason,
                },
              }
            : log,
        ),
      );
      setAlert((a) => {
        const fixedLog = recentLogs.find((r) => r.id === data.logId);
        const remaining = a.incompleteLogs.filter((l) => l.date !== fixedLog?.date);
        setKpis((prev) =>
          prev.map((k) => {
            if (k.id !== "missing") return k;
            const count = String(remaining.length).padStart(2, "0");
            return {
              ...k,
              value: count,
              subtext: remaining.length > 0 ? "Requires action" : "All resolved",
              subtextClass: remaining.length > 0 ? "text-error font-medium" : "text-emerald-600",
              alertBorder: remaining.length > 0,
              detail:
                remaining.length > 0
                  ? `${remaining.length} day(s) still need regularization.`
                  : "All missing logouts have been regularized.",
            };
          }),
        );
        return {
          ...a,
          incompleteLogs: remaining,
          message:
            remaining.length === 0
              ? "All attendance logs are up to date."
              : `You have ${remaining.length} day(s) with incomplete attendance logs this week.`,
        };
      });
      closeModal();
      showNotification("success", "Attendance regularized successfully.");
    },
    [recentLogs, alert.incompleteLogs.length, closeModal, showNotification],
  );

  const submitLeave = useCallback(
    (data: { leaveType: string; fromDate: string; toDate: string; reason: string }) => {
      closeModal();
      showNotification(
        "success",
        `${data.leaveType} request submitted for ${data.fromDate} to ${data.toDate}.`,
      );
    },
    [closeModal, showNotification],
  );

  const submitWfh = useCallback(
    (data: { date: string; reason: string }) => {
      closeModal();
      showNotification("success", `WFH request submitted for ${data.date}.`);
    },
    [closeModal, showNotification],
  );

  const downloadReport = useCallback(() => {
    exportOverviewCsv(recentLogs, OVERVIEW_META.monthLabel);
    showNotification("success", "Attendance report downloaded.");
  }, [recentLogs, showNotification]);

  const value = useMemo(
    (): MonthlyAttendanceContextValue => ({
      meta: OVERVIEW_META,
      profile,
      alert,
      kpis,
      scores: OVERVIEW_SCORES,
      recentLogs,
      todayActivity,
      upcomingHoliday: UPCOMING_HOLIDAY,
      leaveTypes: LEAVE_TYPES,
      formDefaults: FORM_DEFAULTS,
      chartPeriod,
      chartBars,
      chartRangeLabel,
      activeModal,
      selectedLog,
      selectedLogDetail,
      selectedKpi,
      regularizeLogId,
      notification,
      setChartPeriod,
      openLogDetail,
      openLogDetailById,
      openRegularize,
      openApplyLeave,
      openWfh,
      openIncompleteLogs,
      openHolidayDetail,
      openKpiDetail,
      openAllLogs,
      closeModal,
      clockOut,
      submitRegularize,
      submitLeave,
      submitWfh,
      downloadReport,
      clearNotification: () => setNotification(null),
    }),
    [
      profile,
      alert,
      kpis,
      recentLogs,
      todayActivity,
      chartPeriod,
      chartBars,
      chartRangeLabel,
      activeModal,
      selectedLog,
      selectedLogDetail,
      selectedKpi,
      regularizeLogId,
      notification,
      setChartPeriod,
      openLogDetail,
      openLogDetailById,
      openRegularize,
      openApplyLeave,
      openWfh,
      openIncompleteLogs,
      openHolidayDetail,
      openKpiDetail,
      openAllLogs,
      closeModal,
      clockOut,
      submitRegularize,
      submitLeave,
      submitWfh,
      downloadReport,
    ],
  );

  return (
    <MonthlyAttendanceContext.Provider value={value}>{children}</MonthlyAttendanceContext.Provider>
  );
}

export function useMonthlyAttendance() {
  const context = useContext(MonthlyAttendanceContext);
  if (!context) {
    throw new Error("useMonthlyAttendance must be used within MonthlyAttendanceProvider");
  }
  return context;
}
