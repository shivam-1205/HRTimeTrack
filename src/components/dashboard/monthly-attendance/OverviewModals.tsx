"use client";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useEffect, useState } from "react";
import DashboardModal from "../shared/DashboardModal";
import {
  modalBtnPrimary,
  modalBtnSecondary,
  modalInputClass,
  modalLabelClass,
  modalSectionClass,
} from "../shared/modalStyles";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";
import OverviewLogDetailModal from "./OverviewLogDetailModal";
import type { AttendanceLogRow } from "./monthlyAttendanceTypes";

function ApplyLeaveModal({ onClose }: { onClose: () => void }) {
  const { leaveTypes, submitLeave } = useMonthlyAttendance();
  const [leaveType, setLeaveType] = useState(leaveTypes[0] ?? "");
  const [fromDate, setFromDate] = useState("2026-06-28");
  const [toDate, setToDate] = useState("2026-06-28");
  const [reason, setReason] = useState("");

  return (
    <DashboardModal
      title="Apply Leave"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => submitLeave({ leaveType, fromDate, toDate, reason })} className={modalBtnPrimary}>Submit</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className={modalLabelClass}>Leave Type *</label>
          <select className={modalInputClass} value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            {leaveTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={modalLabelClass}>From Date *</label>
            <input type="date" className={modalInputClass} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div>
            <label className={modalLabelClass}>To Date *</label>
            <input type="date" className={modalInputClass} value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={modalLabelClass}>Reason</label>
          <textarea className={`${modalInputClass} min-h-[80px]`} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave" rows={3} />
        </div>
      </div>
    </DashboardModal>
  );
}

function RegularizeModal({ onClose, logId }: { onClose: () => void; logId: string | null }) {
  const { recentLogs, formDefaults, submitRegularize } = useMonthlyAttendance();
  const log = recentLogs.find((l) => l.id === logId) ?? recentLogs.find((l) => l.action === "fix") ?? null;
  const [clockOut, setClockOut] = useState("18:00");
  const [reason, setReason] = useState(formDefaults.regularizeReasons[0] ?? "");

  useEffect(() => {
    if (log) setReason(log.detail.remarks !== "—" ? log.detail.remarks : formDefaults.regularizeReasons[0]);
  }, [log, formDefaults.regularizeReasons]);

  if (!log) return null;

  const clockOut12 = (() => {
    const [h, m] = clockOut.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
  })();

  return (
    <DashboardModal
      title="Regularize Attendance"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => submitRegularize({ logId: log.id, clockOut: clockOut12, reason })} className={modalBtnPrimary}>Submit</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className={modalSectionClass}>
          <p className="text-caption text-on-surface-variant">Date</p>
          <p className="text-label-md font-semibold text-on-surface">{log.date} ({log.day})</p>
          <p className="mt-1 text-caption text-on-surface-variant">Clock In: {log.clockIn}</p>
        </div>
        <div>
          <label className={modalLabelClass}>Clock Out Time *</label>
          <input type="time" className={modalInputClass} value={clockOut} onChange={(e) => setClockOut(e.target.value)} />
        </div>
        <div>
          <label className={modalLabelClass}>Reason *</label>
          <select className={modalInputClass} value={reason} onChange={(e) => setReason(e.target.value)}>
            {formDefaults.regularizeReasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
    </DashboardModal>
  );
}

function WfhModal({ onClose }: { onClose: () => void }) {
  const { formDefaults, submitWfh } = useMonthlyAttendance();
  const [date, setDate] = useState("2026-06-30");
  const [reason, setReason] = useState(formDefaults.wfhReasons[0] ?? "");

  return (
    <DashboardModal
      title="Work From Home Request"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => submitWfh({ date, reason })} className={modalBtnPrimary}>Submit</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className={modalLabelClass}>Date *</label>
          <input type="date" className={modalInputClass} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className={modalLabelClass}>Reason *</label>
          <select className={modalInputClass} value={reason} onChange={(e) => setReason(e.target.value)}>
            {formDefaults.wfhReasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
    </DashboardModal>
  );
}

function IncompleteLogsModal({ onClose }: { onClose: () => void }) {
  const { alert, recentLogs, openRegularize } = useMonthlyAttendance();

  return (
    <DashboardModal
      title={alert.title}
      size="md"
      onClose={onClose}
      footer={
        <button type="button" onClick={onClose} className={modalBtnPrimary}>Close</button>
      }
    >
      <p className="mb-4 text-body-md text-on-surface-variant">{alert.message}</p>
      {alert.incompleteLogs.length === 0 ? (
        <p className="text-body-md text-emerald-600">All logs are complete.</p>
      ) : (
        <ul className="space-y-3">
          {alert.incompleteLogs.map((item) => {
            const log = recentLogs.find((l) => l.date === item.date);
            return (
              <li key={item.id} className="flex items-center justify-between rounded-xl border border-error/20 bg-error-container/10 p-3">
                <div className="flex items-center gap-3">
                  <WarningAmberOutlinedIcon className="text-error" sx={{ fontSize: 20 }} />
                  <div>
                    <p className="text-label-md font-medium text-on-surface">{item.date}</p>
                    <p className="text-caption text-on-surface-variant">{item.issue} · In: {item.clockIn}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openRegularize(log?.id);
                  }}
                  className="rounded-xl border border-error/30 px-3 py-1 text-caption text-error transition-colors hover:bg-error/10"
                >
                  Fix
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardModal>
  );
}

function HolidayModal({ onClose }: { onClose: () => void }) {
  const { upcomingHoliday } = useMonthlyAttendance();

  return (
    <DashboardModal
      title="Upcoming Holiday"
      size="md"
      onClose={onClose}
      footer={
        <button type="button" onClick={onClose} className={modalBtnPrimary}>Close</button>
      }
    >
      <div className="space-y-3">
        <div>
          <p className="text-caption text-on-surface-variant">Holiday</p>
          <p className="text-h2 font-bold text-primary">{upcomingHoliday.name}</p>
        </div>
        <div>
          <p className="text-caption text-on-surface-variant">Date</p>
          <p className="text-label-md font-medium text-on-surface">{upcomingHoliday.date}</p>
        </div>
        <div>
          <p className="text-caption text-on-surface-variant">Type</p>
          <p className="text-label-md text-on-surface">{upcomingHoliday.type}</p>
        </div>
        <p className="text-body-md text-on-surface-variant">{upcomingHoliday.description}</p>
        <span className="inline-block rounded-xl bg-surface-container px-2 py-1 text-caption text-on-surface-variant">{upcomingHoliday.note}</span>
      </div>
    </DashboardModal>
  );
}

function KpiModal({ onClose }: { onClose: () => void }) {
  const { selectedKpi } = useMonthlyAttendance();
  if (!selectedKpi) return null;

  return (
    <DashboardModal
      title={selectedKpi.label}
      size="md"
      onClose={onClose}
      footer={
        <button type="button" onClick={onClose} className={modalBtnPrimary}>Close</button>
      }
    >
      <p className="mb-2 text-h1 font-semibold text-on-surface">{selectedKpi.value}</p>
      <p className="mb-4 text-body-md text-on-surface-variant">{selectedKpi.detail}</p>
      <p className={`text-caption ${selectedKpi.subtextClass}`}>{selectedKpi.subtext}</p>
    </DashboardModal>
  );
}

function LogRowButton({ log, onView }: { log: AttendanceLogRow; onView: () => void }) {
  return (
    <button
      type="button"
      onClick={onView}
      className="flex w-full items-center justify-between rounded-xl border border-outline-variant/30 p-3 text-left transition-colors hover:bg-surface-container-low"
    >
      <div>
        <p className="text-label-md font-medium text-on-surface">{log.date}</p>
        <p className="text-caption text-on-surface-variant">{log.status} · {log.totalHrs}</p>
      </div>
      <span className="text-caption text-primary">View</span>
    </button>
  );
}

function AllLogsModal({ onClose }: { onClose: () => void }) {
  const { recentLogs, openLogDetail } = useMonthlyAttendance();

  return (
    <DashboardModal
      title="All Attendance Logs"
      size="md"
      onClose={onClose}
      footer={
        <button type="button" onClick={onClose} className={modalBtnPrimary}>Close</button>
      }
    >
      <div className="space-y-2">
        {recentLogs.map((log) => (
          <LogRowButton key={log.id} log={log} onView={() => { onClose(); openLogDetail(log); }} />
        ))}
      </div>
    </DashboardModal>
  );
}

export default function OverviewModals() {
  const {
    activeModal,
    selectedLogDetail,
    regularizeLogId,
    closeModal,
  } = useMonthlyAttendance();

  return (
    <>
      {activeModal === "logDetail" && (
        <OverviewLogDetailModal detail={selectedLogDetail} onClose={closeModal} />
      )}
      {activeModal === "applyLeave" && <ApplyLeaveModal onClose={closeModal} />}
      {activeModal === "regularize" && <RegularizeModal onClose={closeModal} logId={regularizeLogId} />}
      {activeModal === "wfh" && <WfhModal onClose={closeModal} />}
      {activeModal === "incomplete" && <IncompleteLogsModal onClose={closeModal} />}
      {activeModal === "holiday" && <HolidayModal onClose={closeModal} />}
      {activeModal === "kpi" && <KpiModal onClose={closeModal} />}
      {activeModal === "allLogs" && <AllLogsModal onClose={closeModal} />}
    </>
  );
}
