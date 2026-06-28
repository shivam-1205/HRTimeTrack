"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
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
} from "../shared/modalStyles";
import { reasonBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { useEmployees } from "./context/EmployeesContext";
import { getInitials, statusToTone, type EmployeeRecord } from "./employeesTypes";

function EmployeeAvatar({ employee, size = "md" }: { employee: EmployeeRecord; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-14 w-14 text-lg" : size === "sm" ? "h-9 w-9 text-sm" : "h-12 w-12 text-base";
  if (employee.avatar) {
    return (
      <img src={employee.avatar} alt={employee.name} className={`${sizeClass} rounded-full object-cover`} />
    );
  }
  return (
    <div className={`flex items-center justify-center rounded-full bg-primary-container/15 font-semibold text-primary ${sizeClass}`}>
      {getInitials(employee.name)}
    </div>
  );
}

function DetailModal() {
  const { selectedEmployee, closeModal, openEdit } = useEmployees();
  if (!selectedEmployee) return null;
  const emp = selectedEmployee;

  return (
    <DashboardModal
      title={emp.name}
      subtitle={emp.designation}
      size="md"
      onClose={closeModal}
      headerBadge={
        <>
          <span className={reasonBadgeClass("casual")}>{emp.department}</span>
          <span className={statusBadgeClass(statusToTone(emp.status))}>{emp.status}</span>
        </>
      }
      footer={
        <>
          <button type="button" onClick={closeModal} className={modalBtnOutline}>Close</button>
          <button type="button" onClick={() => openEdit(emp)} className={modalBtnPrimary}>Edit Employee</button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-4">
        <EmployeeAvatar employee={emp} size="lg" />
        <p className="text-body-md text-on-surface-variant">{emp.bio}</p>
      </div>

      <DashboardModalStatGrid>
        <DashboardModalStat label="Employee ID" value={emp.employeeId} />
        <DashboardModalStat label="Joining Date" value={emp.joiningDate} />
        <DashboardModalStat label="Manager" value={emp.manager} />
        <DashboardModalStat icon={<LocationOnOutlinedIcon />} label="Location" value={emp.location} />
        <DashboardModalStat icon={<EmailOutlinedIcon />} label="Email" value={emp.email} spanFull />
        <DashboardModalStat icon={<PhoneOutlinedIcon />} label="Phone" value={emp.phone} spanFull />
        <DashboardModalStat label="Skills" value={emp.skills.join(", ")} spanFull />
      </DashboardModalStatGrid>
    </DashboardModal>
  );
}

function EditModal() {
  const { selectedEmployee, closeModal, saveEmployee } = useEmployees();
  const [form, setForm] = useState<EmployeeRecord | null>(null);

  useEffect(() => {
    if (selectedEmployee) setForm({ ...selectedEmployee });
  }, [selectedEmployee]);

  if (!form) return null;

  return (
    <DashboardModal
      title="Edit Employee"
      subtitle={form.employeeId}
      size="md"
      onClose={closeModal}
      footer={
        <>
          <button type="button" onClick={closeModal} className={modalBtnSecondary}>Cancel</button>
          <button type="button" onClick={() => saveEmployee(form)} className={modalBtnPrimary}>Save Changes</button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={modalLabelClass}>Name</label>
          <input className={modalInputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className={modalLabelClass}>Designation</label>
          <input className={modalInputClass} value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
        </div>
        <div>
          <label className={modalLabelClass}>Phone</label>
          <input className={modalInputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className={modalLabelClass}>Location</label>
          <input className={modalInputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className={modalLabelClass}>Email</label>
          <input className={modalInputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className={modalLabelClass}>Status</label>
          <select
            className={modalInputClass}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as EmployeeRecord["status"] })}
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
          </select>
        </div>
      </div>
    </DashboardModal>
  );
}

export default function EmployeesModals() {
  const { activeModal } = useEmployees();

  return (
    <>
      {activeModal === "detail" && <DetailModal />}
      {activeModal === "edit" && <EditModal />}
    </>
  );
}

export { EmployeeAvatar };
