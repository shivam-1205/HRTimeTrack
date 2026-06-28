"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useState } from "react";
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
} from "../shared/modalStyles";
import { statusBadgeClass } from "../shared/pageStyles";
import { useDirectory } from "./context/DirectoryContext";
import { getDirectoryInitials, type DirectoryEmployee } from "./directoryTypes";

function DirectoryAvatar({ employee }: { employee: DirectoryEmployee }) {
  if (employee.avatar) {
    return (
      <img src={employee.avatar} alt={employee.name} className="h-14 w-14 rounded-full object-cover" />
    );
  }
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container/15 text-lg font-semibold text-primary">
      {getDirectoryInitials(employee.name)}
    </div>
  );
}

function ProfileModal() {
  const { selectedEmployee, closeModal, openMessage } = useDirectory();
  if (!selectedEmployee) return null;
  const emp = selectedEmployee;

  return (
    <DashboardModal
      title={emp.name}
      subtitle={emp.role}
      size="md"
      onClose={closeModal}
      headerBadge={
        <span className={statusBadgeClass(emp.status === "Active" ? "success" : "warning")}>
          {emp.status}
        </span>
      }
      footer={
        <>
          <button type="button" onClick={closeModal} className={modalBtnOutline}>Close</button>
          <button type="button" onClick={() => openMessage(emp)} className={modalBtnPrimary}>
            Send Message
          </button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-4">
        <DirectoryAvatar employee={emp} />
        <p className="text-body-md text-on-surface-variant">{emp.bio}</p>
      </div>
      <DashboardModalStatGrid>
        <DashboardModalStat label="Department" value={emp.department} />
        <DashboardModalStat label="Employee ID" value={emp.employeeId} />
        <DashboardModalStat icon={<LocationOnOutlinedIcon />} label="Location" value={emp.location} />
        <DashboardModalStat label="Manager" value={emp.manager} />
        <DashboardModalStat icon={<EmailOutlinedIcon />} label="Email" value={emp.email} spanFull />
        <DashboardModalStat icon={<PhoneOutlinedIcon />} label="Phone" value={emp.phone} spanFull />
        <DashboardModalStat label="Skills" value={emp.skills.join(", ")} spanFull />
      </DashboardModalStatGrid>
    </DashboardModal>
  );
}

function MessageModal() {
  const { selectedEmployee, closeModal, sendMessage } = useDirectory();
  const [body, setBody] = useState("");
  if (!selectedEmployee) return null;

  return (
    <DashboardModal
      title="Send Message"
      subtitle={`To ${selectedEmployee.name}`}
      size="sm"
      onClose={closeModal}
      footer={
        <>
          <button type="button" onClick={closeModal} className={modalBtnSecondary}>Cancel</button>
          <button
            type="button"
            onClick={() => sendMessage(body)}
            className={`flex items-center gap-1.5 ${modalBtnPrimary}`}
          >
            <SendOutlinedIcon sx={{ fontSize: 16 }} />
            Send
          </button>
        </>
      }
    >
      <textarea
        className={`${modalInputClass} min-h-[120px] resize-y`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`Hi ${selectedEmployee.name.split(" ")[0]},\n\n`}
        rows={5}
      />
    </DashboardModal>
  );
}

function InviteModal() {
  const { closeModal, sendInvite } = useDirectory();
  const [email, setEmail] = useState("");

  return (
    <DashboardModal
      title="Invite Team Member"
      subtitle="Send an invitation to join the enterprise portal"
      size="sm"
      onClose={closeModal}
      footer={
        <>
          <button type="button" onClick={closeModal} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => sendInvite(email)} className={modalBtnPrimary}>
            Send Invite
          </button>
        </>
      }
    >
      <div>
        <label className={modalLabelClass}>Email address</label>
        <input
          type="email"
          className={modalInputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@enterprise.com"
        />
      </div>
    </DashboardModal>
  );
}

export default function DirectoryModals() {
  const { activeModal } = useDirectory();

  return (
    <>
      {activeModal === "profile" && <ProfileModal />}
      {activeModal === "message" && <MessageModal />}
      {activeModal === "invite" && <InviteModal />}
    </>
  );
}
