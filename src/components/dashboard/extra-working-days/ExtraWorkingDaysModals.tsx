"use client";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useEffect, useState } from "react";
import DashboardModal, {
  DashboardModalStat,
  DashboardModalStatGrid,
} from "../shared/DashboardModal";
import {
  modalBtnOutline,
  modalBtnPrimary,
  modalBtnSecondary,
  modalInputClass,
  modalLabelClass,
  modalSectionClass,
} from "../shared/modalStyles";
import type { ExtraDayRequest, ExtraWorkingDayRow, ReasonType } from "./extraWorkingDaysTypes";
import { parseHoursFromTimes } from "./extraWorkingDaysUtils";
import { useExtraWorkingDays } from "./context/ExtraWorkingDaysContext";
import { reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { statusLabel, statusToTone } from "./extraWorkingDaysUtils";

function RequestExtraDayModal({ onClose }: { onClose: () => void }) {
  const { formOptions, submitRequest } = useExtraWorkingDays();
  const [date, setDate] = useState("2026-06-28");
  const [reasonType, setReasonType] = useState<ReasonType>("weekend");
  const [workType, setWorkType] = useState(formOptions.workTypes[0] ?? "Office");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [note, setNote] = useState("");
  const totalHours = parseHoursFromTimes(startTime, endTime);

  const request: ExtraDayRequest = { date, reasonType, workType, startTime, endTime, note };

  return (
    <DashboardModal
      title="Request Extra Working Day"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => submitRequest(request)} className={modalBtnPrimary}>Submit Request</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className={modalLabelClass}>Date <span className="text-error">*</span></label>
          <input type="date" className={modalInputClass} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className={modalLabelClass}>Reason <span className="text-error">*</span></label>
          <select className={modalInputClass} value={reasonType} onChange={(e) => setReasonType(e.target.value as ReasonType)}>
            {formOptions.reasons.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={modalLabelClass}>Work Type <span className="text-error">*</span></label>
          <select className={modalInputClass} value={workType} onChange={(e) => setWorkType(e.target.value)}>
            {formOptions.workTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={modalLabelClass}>Start Time <span className="text-error">*</span></label>
            <input type="time" className={modalInputClass} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <label className={modalLabelClass}>End Time <span className="text-error">*</span></label>
            <input type="time" className={modalInputClass} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2">
          <span className="text-caption text-on-surface-variant">Total hours: </span>
          <span className="text-label-md font-semibold text-on-surface">{totalHours}</span>
        </div>
        <div>
          <label className={modalLabelClass}>Your Note <span className="text-error">*</span></label>
          <textarea
            className={`${modalInputClass} min-h-[88px] resize-y`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe why you worked on this day..."
            rows={3}
          />
        </div>
      </div>
    </DashboardModal>
  );
}

function EditNoteModal({ row, onClose }: { row: ExtraWorkingDayRow; onClose: () => void }) {
  const { saveNote } = useExtraWorkingDays();
  const [note, setNote] = useState(row.note);

  useEffect(() => setNote(row.note), [row.note]);

  return (
    <DashboardModal
      title="Edit Note"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => saveNote(row.id, note)} className={modalBtnPrimary}>Save</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className={modalSectionClass}>
          <p className="text-caption text-on-surface-variant">Date</p>
          <p className="text-label-md font-semibold text-on-surface">{row.date}</p>
        </div>
        <div>
          <label className={modalLabelClass}>Your Note <span className="text-error">*</span></label>
          <textarea className={`${modalInputClass} min-h-[100px] resize-y`} value={note} onChange={(e) => setNote(e.target.value)} rows={4} />
        </div>
      </div>
    </DashboardModal>
  );
}

function DetailModal({ row, onClose }: { row: ExtraWorkingDayRow; onClose: () => void }) {
  const { openEditNote } = useExtraWorkingDays();
  const canEdit = row.status === "pending" || row.status === "on_hold";

  return (
    <DashboardModal
      title={row.date}
      size="sm"
      onClose={onClose}
      headerBadge={
        <>
          <span className={reasonBadgeClass(row.reasonType)}>{row.reason}</span>
          <span className={statusBadgeClass(statusToTone(row.status))}>{statusLabel(row.status)}</span>
        </>
      }
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnOutline}>Close</button>
          {canEdit && (
            <button type="button" onClick={() => { onClose(); openEditNote(row); }} className={modalBtnPrimary}>Edit Note</button>
          )}
        </>
      }
    >
      <DashboardModalStatGrid>
        <DashboardModalStat label="Clock In" value={row.clockIn} />
        <DashboardModalStat label="Clock Out" value={row.clockOut} />
        <DashboardModalStat label="Hours" value={row.totalHours} />
        <DashboardModalStat label="Work Type" value={row.workType} />
        <DashboardModalStat label="Note" value={row.note} spanFull />
        {row.remarks && row.remarks !== row.note && (
          <DashboardModalStat label="Remarks" value={row.remarks} valueClass="text-on-surface-variant" spanFull />
        )}
      </DashboardModalStatGrid>
      <div className="mt-2 flex flex-wrap gap-3 text-caption text-on-surface-variant">
        <span className="flex items-center gap-1"><AccessTimeOutlinedIcon sx={{ fontSize: 13 }} /> {row.submittedAt}</span>
        {row.reviewedBy && (
          <span className="flex items-center gap-1"><WorkOutlineOutlinedIcon sx={{ fontSize: 13 }} /> {row.reviewedBy}</span>
        )}
      </div>
    </DashboardModal>
  );
}

export default function ExtraWorkingDaysModals() {
  const { activeModal, selectedRow, closeModal } = useExtraWorkingDays();

  return (
    <>
      {activeModal === "request" && <RequestExtraDayModal onClose={closeModal} />}
      {activeModal === "editNote" && selectedRow && <EditNoteModal row={selectedRow} onClose={closeModal} />}
      {activeModal === "detail" && selectedRow && <DetailModal row={selectedRow} onClose={closeModal} />}
    </>
  );
}
