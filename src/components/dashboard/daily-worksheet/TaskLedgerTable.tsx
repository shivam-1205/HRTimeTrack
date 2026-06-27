"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { CARD_SHADOW, type TaskPriority, type TaskStatus } from "./dailyWorksheetTypes";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center rounded-full border border-error-container/50 bg-error-container/30 px-2 py-0.5 text-[11px] font-semibold text-on-error-container">
        High
      </span>
    );
  }
  if (priority === "low") {
    return (
      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
        Low
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-outline-variant/30 bg-surface-variant px-2 py-0.5 text-[11px] font-semibold text-on-surface-variant">
      Med
    </span>
  );
}

function StatusBadge({ status }: { status: TaskStatus }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-1 text-[12px] font-medium text-emerald-800">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Done
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-1 text-[12px] font-medium text-amber-800">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded bg-surface-variant px-2 py-1 text-[12px] font-medium text-on-surface-variant">
      <span className="h-1.5 w-1.5 rounded-full bg-outline" />
      Pending
    </span>
  );
}

export default function TaskLedgerTable() {
  const { filteredTasks, projectFilters, projectFilter, setProjectFilter, openEditModal } =
    useDailyWorksheet();

  return (
    <section className={`flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest ${CARD_SHADOW}`}>
      <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-bright p-4">
        <h3 className="text-h3 font-semibold text-on-surface">Task Ledger</h3>
        <div className="relative">
          <FilterListOutlinedIcon
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant"
            sx={{ fontSize: 16 }}
          />
          <select
            className="cursor-pointer appearance-none rounded-md border border-outline-variant/30 bg-surface py-1.5 pr-6 pl-8 text-caption text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            {projectFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <KeyboardArrowDownOutlinedIcon
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 16 }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface/50 text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 py-3 font-medium">Task / Project</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Hours (Est/Act)</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-on-surface-variant">
                  No tasks for this project. Click &quot;Add Task&quot; to log work.
                </td>
              </tr>
            ) : (
              filteredTasks.map((row, index) => (
                <tr
                  key={row.id}
                  className={`group transition-colors hover:bg-surface-container-low ${
                    index < filteredTasks.length - 1 ? "border-b border-outline-variant/20" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.task}</div>
                    <div className="mt-0.5 text-caption text-on-surface-variant">{row.project}</div>
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={row.priority} />
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {row.estimatedHours} /{" "}
                    <span className="font-medium text-on-surface">{row.actualHours}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openEditModal(row.id)}
                      className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 bg-surface p-1.5 text-on-surface-variant transition-colors hover:border-primary/30 hover:bg-primary-container/10 hover:text-primary"
                      aria-label={`Edit ${row.task}`}
                    >
                      <EditOutlinedIcon sx={{ fontSize: 18, color: "currentColor" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
