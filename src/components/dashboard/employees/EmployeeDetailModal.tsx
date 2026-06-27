"use client";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import type { EmployeeRecord } from "./data";
import { getInitials } from "./data";
import { PAGE_CARD, statusBadgeClass } from "../shared/pageStyles";

type EmployeeDetailModalProps = {
  employee: EmployeeRecord | null;
  onClose: () => void;
};

export default function EmployeeDetailModal({ employee, onClose }: EmployeeDetailModalProps) {
  if (!employee) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${PAGE_CARD} w-full max-w-lg bg-surface-container-lowest p-0`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-detail-title"
      >
        <div className="flex items-start justify-between border-b border-outline-variant/30 px-6 py-4">
          <div className="flex items-center gap-4">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={employee.name}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container/15 text-lg font-semibold text-primary">
                {getInitials(employee.name)}
              </div>
            )}
            <div>
              <h2 id="employee-detail-title" className="text-h3 font-semibold text-on-surface">
                {employee.name}
              </h2>
              <p className="text-body-md text-on-surface-variant">{employee.designation}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-on-surface-variant hover:bg-surface-container-low"
            aria-label="Close"
          >
            <CloseOutlinedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-caption font-medium text-on-surface-variant">
              {employee.department}
            </span>
            <span
              className={statusBadgeClass(
                employee.status === "Active" ? "success" : "warning",
              )}
            >
              {employee.status}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-body-md sm:grid-cols-2">
            <div>
              <dt className="text-caption text-on-surface-variant">Employee ID</dt>
              <dd className="font-medium text-on-surface">{employee.employeeId}</dd>
            </div>
            <div>
              <dt className="text-caption text-on-surface-variant">Joining Date</dt>
              <dd className="font-medium text-on-surface">{employee.joiningDate}</dd>
            </div>
            <div>
              <dt className="text-caption text-on-surface-variant">Manager</dt>
              <dd className="font-medium text-on-surface">{employee.manager}</dd>
            </div>
            <div>
              <dt className="text-caption text-on-surface-variant">Location</dt>
              <dd className="flex items-center gap-1 font-medium text-on-surface">
                <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                {employee.location}
              </dd>
            </div>
          </dl>

          <div className="space-y-2 border-t border-outline-variant/30 pt-4">
            <div className="flex items-center gap-2 text-body-md text-on-surface">
              <EmailOutlinedIcon className="text-on-surface-variant" sx={{ fontSize: 18 }} />
              {employee.email}
            </div>
            <div className="flex items-center gap-2 text-body-md text-on-surface">
              <PhoneOutlinedIcon className="text-on-surface-variant" sx={{ fontSize: 18 }} />
              {employee.phone}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-outline-variant/30 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-low"
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary hover:bg-primary/90"
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}
