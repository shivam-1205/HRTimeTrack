"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PageIntro from "../shared/PageIntro";
import { PAGE_CARD, statusBadgeClass } from "../shared/pageStyles";
import { EmployeesProvider, useEmployees } from "./context/EmployeesContext";
import EmployeesModals, { EmployeeAvatar } from "./EmployeesModals";
import { statusToTone } from "./employeesTypes";

function EmployeesNotification() {
  const { notification, clearNotification } = useEmployees();
  if (!notification) return null;
  const Icon = notification.type === "success" ? CheckCircleOutlinedIcon : InfoOutlinedIcon;
  const styles =
    notification.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-blue-200 bg-blue-50 text-blue-800";

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles}`}>
      <div className="flex items-center gap-2">
        <Icon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button type="button" onClick={clearNotification} className="text-caption underline opacity-70 hover:opacity-100">
        Dismiss
      </button>
    </div>
  );
}

function EmployeesContent() {
  const {
    meta,
    departments,
    statuses,
    filteredEmployees,
    search,
    departmentFilter,
    statusFilter,
    setSearch,
    setDepartmentFilter,
    setStatusFilter,
    openDetail,
    exportEmployees,
  } = useEmployees();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <EmployeesNotification />

      <PageIntro
        icon={<GroupOutlinedIcon sx={{ fontSize: 22 }} />}
        title="Employees"
        description={`Browse ${meta.totalEmployees} employee profiles, contact details, and organizational information.`}
        action={
          <button
            type="button"
            onClick={exportEmployees}
            className="flex items-center gap-2 rounded-xl border border-outline-variant px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
          >
            <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
            Export
          </button>
        }
      />

      <section className={`${PAGE_CARD} p-4`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="relative flex-1">
            <SearchOutlinedIcon
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              sx={{ fontSize: 20 }}
            />
            <input
              type="text"
              placeholder="Search name, role, department, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-4 text-body-md text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-label-md text-on-surface"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <select
            className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-label-md text-on-surface"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </section>

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joining Date</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-on-surface-variant">
                    No employees match your search.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-outline-variant/20 transition-colors hover:bg-surface-container-low/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <EmployeeAvatar employee={employee} size="sm" />
                        <span className="font-medium text-on-surface">{employee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-caption font-medium text-on-surface-variant">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface">{employee.designation}</td>
                    <td className="px-6 py-4">
                      <span className={statusBadgeClass(statusToTone(employee.status))}>{employee.status}</span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{employee.phone}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{employee.joiningDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openDetail(employee)}
                        className="inline-flex items-center gap-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
                      >
                        <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <EmployeesModals />
    </div>
  );
}

export default function EmployeesView() {
  return (
    <EmployeesProvider>
      <EmployeesContent />
    </EmployeesProvider>
  );
}
