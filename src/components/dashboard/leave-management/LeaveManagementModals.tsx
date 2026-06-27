"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useEffect, useState } from "react";
import DashboardModal from "../shared/DashboardModal";
import {
  modalBtnOutline,
  modalBtnPrimary,
  modalBtnSecondary,
  modalInputClass,
  modalLabelClass,
  modalSectionClass,
} from "../shared/modalStyles";
import type { HolidayMessage, LeaveRequestForm, LeaveRequestRow } from "./leaveManagementTypes";
import { recipientLabel, statusLabel, statusToTone } from "./leaveManagementUtils";
import { useLeaveManagement } from "./context/LeaveManagementContext";
import { reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";

function MessageThread({ messages }: { messages: LeaveRequestRow["messages"] }) {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-xl border px-3 py-2.5 ${
            msg.direction === "sent"
              ? "border-primary/20 bg-primary-container/5 ml-2"
              : "border-outline-variant/25 bg-surface-container-low mr-2"
          }`}
        >
          <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-caption text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <MailOutlineOutlinedIcon sx={{ fontSize: 14 }} />
              <span className="font-medium text-on-surface">{msg.from}</span>
              <span>→</span>
              <span>{msg.to}</span>
            </div>
            <span>{msg.sentAt}</span>
          </div>
          <p className="mb-1 text-label-md font-semibold text-on-surface">{msg.subject}</p>
          <p className="whitespace-pre-wrap text-caption leading-relaxed text-on-surface-variant">{msg.body}</p>
        </div>
      ))}
    </div>
  );
}

function RequestLeaveModal({ onClose }: { onClose: () => void }) {
  const { formOptions, meta, submitLeaveRequest } = useLeaveManagement();
  const [leaveType, setLeaveType] = useState(formOptions.leaveTypes[0]?.value ?? "casual");
  const [fromDate, setFromDate] = useState("2026-07-05");
  const [toDate, setToDate] = useState("2026-07-05");
  const [recipient, setRecipient] = useState(formOptions.recipients[0]?.value ?? "manager");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const form: LeaveRequestForm = { leaveType, fromDate, toDate, recipient, subject, message };

  return (
    <DashboardModal
      title="Request Leave"
      subtitle="Send a leave request like an email to your manager or HR"
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => submitLeaveRequest(form)} className={`flex items-center gap-2 ${modalBtnPrimary}`}>
            <SendOutlinedIcon sx={{ fontSize: 18 }} />
            Send Request
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={modalLabelClass}>Leave Type <span className="text-error">*</span></label>
            <select className={modalInputClass} value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
              {formOptions.leaveTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={modalLabelClass}>To <span className="text-error">*</span></label>
            <select className={modalInputClass} value={recipient} onChange={(e) => setRecipient(e.target.value)}>
              {formOptions.recipients.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={modalLabelClass}>From Date <span className="text-error">*</span></label>
            <input type="date" className={modalInputClass} value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div>
            <label className={modalLabelClass}>To Date <span className="text-error">*</span></label>
            <input type="date" className={modalInputClass} value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={modalLabelClass}>Subject <span className="text-error">*</span></label>
          <input className={modalInputClass} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={`Leave request from ${meta.employeeName}`} />
        </div>
        <div>
          <label className={modalLabelClass}>Message <span className="text-error">*</span></label>
          <textarea
            className={`${modalInputClass} min-h-[120px] resize-y font-mono text-sm`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Hi ${meta.managerName},\n\nI am requesting leave for...\n\nThanks,\n${meta.employeeName}`}
            rows={5}
          />
        </div>
      </div>
    </DashboardModal>
  );
}

function LeaveDetailModal({ leave, onClose }: { leave: LeaveRequestRow; onClose: () => void }) {
  const { openReply } = useLeaveManagement();

  return (
    <DashboardModal
      title="Leave Request Details"
      subtitle={`${leave.from} → ${leave.to} · ${leave.days} day(s)`}
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnOutline}>Close</button>
          {(leave.status === "pending" || leave.status === "on_hold") && (
            <button type="button" onClick={() => { onClose(); openReply(leave); }} className={`flex items-center gap-2 ${modalBtnPrimary}`}>
              <ReplyOutlinedIcon sx={{ fontSize: 18 }} />
              Send Follow-up
            </button>
          )}
        </>
      }
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className={reasonBadgeClass(leave.typeTone)}>{leave.type}</span>
        <span className={statusBadgeClass(statusToTone(leave.status))}>{statusLabel(leave.status)}</span>
        {leave.conflict && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-caption text-amber-700">
            Conflict: {leave.conflict}
          </span>
        )}
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2 text-caption sm:grid-cols-4">
        <div><span className="text-on-surface-variant">To</span><p className="font-medium text-on-surface">{recipientLabel(leave.recipient)}</p></div>
        <div><span className="text-on-surface-variant">Submitted</span><p className="font-medium text-on-surface">{leave.submittedAt}</p></div>
        <div><span className="text-on-surface-variant">Reviewed by</span><p className="font-medium text-on-surface">{leave.reviewedBy ?? "—"}</p></div>
        <div><span className="text-on-surface-variant">Subject</span><p className="font-medium text-on-surface">{leave.subject}</p></div>
      </div>
      <h3 className="mb-3 flex items-center gap-2 text-label-md font-semibold text-on-surface">
        <EmailOutlinedIcon sx={{ fontSize: 18 }} />
        Message Thread
      </h3>
      <MessageThread messages={leave.messages} />
    </DashboardModal>
  );
}

function HolidayMessageModal({
  message,
  relatedLeave,
  onClose,
}: {
  message: HolidayMessage;
  relatedLeave: LeaveRequestRow | null;
  onClose: () => void;
}) {
  const { openLeaveDetail } = useLeaveManagement();

  return (
    <DashboardModal
      title="Holiday Leave Message"
      subtitle={`${message.holidayName} · ${message.holidayDate}`}
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnOutline}>Close</button>
          {relatedLeave && (
            <button type="button" onClick={() => { onClose(); openLeaveDetail(relatedLeave); }} className={modalBtnPrimary}>
              View Related Leave
            </button>
          )}
        </>
      }
    >
      <div className="mb-4 rounded-xl border border-violet-200 bg-violet-50 p-3">
        <div className="flex items-center gap-2 text-violet-800">
          <EventOutlinedIcon sx={{ fontSize: 20 }} />
          <span className="text-label-md font-semibold">{message.holidayName}</span>
          <span className="text-caption">({message.holidayDate})</span>
        </div>
      </div>
      <div className={`mb-4 ${modalSectionClass}`}>
        <div className="mb-2 flex justify-between text-caption text-on-surface-variant">
          <span>{message.from} → {message.to}</span>
          <span>{message.sentAt}</span>
        </div>
        <p className="mb-2 text-label-md font-semibold text-on-surface">{message.subject}</p>
        <p className="whitespace-pre-wrap text-body-md text-on-surface-variant">{message.body}</p>
      </div>
      {relatedLeave && (
        <div className="rounded-xl border border-outline-variant/30 p-4">
          <h4 className="mb-2 text-label-md font-semibold text-on-surface">Related Leave Request</h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className={reasonBadgeClass(relatedLeave.typeTone)}>{relatedLeave.type}</span>
            <span className={statusBadgeClass(statusToTone(relatedLeave.status))}>{statusLabel(relatedLeave.status)}</span>
            <span className="text-caption text-on-surface-variant">{relatedLeave.from} – {relatedLeave.to}</span>
          </div>
          <p className="mt-2 text-body-md text-on-surface-variant">{relatedLeave.subject}</p>
        </div>
      )}
    </DashboardModal>
  );
}

function ReplyModal({ leave, onClose }: { leave: LeaveRequestRow; onClose: () => void }) {
  const { sendReply } = useLeaveManagement();
  const [body, setBody] = useState("");

  useEffect(() => setBody(""), [leave.id]);

  return (
    <DashboardModal
      title="Send Follow-up"
      subtitle={`Re: ${leave.subject}`}
      size="md"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => sendReply(leave.id, body)} className={`flex items-center gap-2 ${modalBtnPrimary}`}>
            <SendOutlinedIcon sx={{ fontSize: 18 }} />
            Send
          </button>
        </>
      }
    >
      <textarea
        className={`${modalInputClass} min-h-[120px] resize-y`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add a follow-up message..."
        rows={5}
      />
    </DashboardModal>
  );
}

export default function LeaveManagementModals() {
  const { activeModal, selectedLeave, selectedHolidayMessage, leaveRequests, closeModal } = useLeaveManagement();

  const relatedLeave = selectedHolidayMessage
    ? leaveRequests.find((r) => r.id === selectedHolidayMessage.relatedLeaveId) ?? null
    : null;

  return (
    <>
      {activeModal === "request" && <RequestLeaveModal onClose={closeModal} />}
      {activeModal === "leaveDetail" && selectedLeave && <LeaveDetailModal leave={selectedLeave} onClose={closeModal} />}
      {activeModal === "holidayMessage" && selectedHolidayMessage && (
        <HolidayMessageModal message={selectedHolidayMessage} relatedLeave={relatedLeave} onClose={closeModal} />
      )}
      {activeModal === "reply" && selectedLeave && <ReplyModal leave={selectedLeave} onClose={closeModal} />}
    </>
  );
}
