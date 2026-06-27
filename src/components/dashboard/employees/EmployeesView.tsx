"use client";

import { useState } from "react";
import PageIntro from "../shared/PageIntro";
import { PAGE_CARD } from "../shared/pageStyles";
import { EMPLOYEE_LIST, getInitials, type EmployeeRecord } from "./data";
import EmployeeDetailModal from "./EmployeeDetailModal";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

export default function EmployeesView() {
  const [selected, setSelected] = useState<EmployeeRecord | null>(null);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<GroupOutlinedIcon sx={{ fontSize: 22 }} />}
        iconClassName="bg-primary-container/10 text-primary"
        title="Employee Directory"
        description="Browse employee profiles, contact details, and organizational information."
      />

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joining Date</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {EMPLOYEE_LIST.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-outline-variant/20 transition-colors hover:bg-surface-container-low/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container/15 text-sm font-semibold text-primary">
                          {getInitials(employee.name)}
                        </div>
                      )}
                      <span className="font-medium text-on-surface">{employee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-caption font-medium text-on-surface-variant">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface">{employee.designation}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{employee.phone}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{employee.joiningDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(employee)}
                      className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <EmployeeDetailModal employee={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
