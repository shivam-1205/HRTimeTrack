"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
import { type DailyTaskDraft, type TaskFormEntry } from "./dailyWorksheetTypes";
import {
  createEmptyTaskEntry,
  formatDisplayDate,
  formatHoursLabel,
  parseHoursFromTimes,
} from "./dailyWorksheetUtils";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

type AddDailyTaskModalProps = {
  open: boolean;
  initialDraft: DailyTaskDraft | null;
  editingTaskId: string | null;
  onClose: () => void;
  onSaveDraft: (draft: DailyTaskDraft) => void;
  onSubmit: (draft: DailyTaskDraft) => void;
};

const inputClass = modalInputClass;
const labelClass = modalLabelClass;

function TaskEntryForm({
  entry,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  entry: TaskFormEntry;
  index: number;
  canRemove: boolean;
  onChange: (updated: TaskFormEntry) => void;
  onRemove: () => void;
}) {
  const { formOptions } = useDailyWorksheet();
  const totalHours = parseHoursFromTimes(entry.startTime, entry.endTime);

  return (
    <div className={modalSectionClass}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-label-md font-semibold text-on-surface">Task {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-caption text-error hover:text-error/80"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Project Name <span className="text-error">*</span>
          </label>
          <input
            className={inputClass}
            value={entry.projectName}
            onChange={(e) => onChange({ ...entry, projectName: e.target.value })}
            placeholder="e.g. HRMS Redesign"
          />
        </div>
        <div>
          <label className={labelClass}>Client Name</label>
          <input
            className={inputClass}
            value={entry.clientName}
            onChange={(e) => onChange({ ...entry, clientName: e.target.value })}
            placeholder="Client Name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Task Title <span className="text-error">*</span>
          </label>
          <input
            className={inputClass}
            value={entry.taskTitle}
            onChange={(e) => onChange({ ...entry, taskTitle: e.target.value })}
            placeholder="Task Title"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Task Description</label>
          <textarea
            className={`${inputClass} min-h-[72px] resize-y`}
            value={entry.taskDescription}
            onChange={(e) => onChange({ ...entry, taskDescription: e.target.value })}
            placeholder="Describe the work done or planned"
            rows={2}
          />
        </div>
        <div>
          <label className={labelClass}>Work Category</label>
          <input
            className={inputClass}
            list="work-categories"
            value={entry.workCategory}
            onChange={(e) => onChange({ ...entry, workCategory: e.target.value })}
            placeholder="e.g. Development, Design"
          />
          <datalist id="work-categories">
            {formOptions.workCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>
        <div>
          <label className={labelClass}>
            Priority <span className="text-error">*</span>
          </label>
          <select
            className={inputClass}
            value={entry.priority}
            onChange={(e) =>
              onChange({ ...entry, priority: e.target.value as TaskFormEntry["priority"] })
            }
          >
            {formOptions.priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Start Time</label>
          <input
            type="time"
            className={inputClass}
            value={entry.startTime}
            onChange={(e) => onChange({ ...entry, startTime: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>End Time</label>
          <input
            type="time"
            className={inputClass}
            value={entry.endTime}
            onChange={(e) => onChange({ ...entry, endTime: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>
            Status <span className="text-error">*</span>
          </label>
          <select
            className={inputClass}
            value={entry.status}
            onChange={(e) =>
              onChange({ ...entry, status: e.target.value as TaskFormEntry["status"] })
            }
          >
            {formOptions.statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <div className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-3 py-2">
            <span className="text-caption text-on-surface-variant">Total hours: </span>
            <span className="text-label-md font-semibold text-on-surface">
              {formatHoursLabel(totalHours)}
            </span>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Remarks / Notes</label>
          <textarea
            className={`${inputClass} min-h-[60px] resize-y`}
            value={entry.remarks}
            onChange={(e) => onChange({ ...entry, remarks: e.target.value })}
            placeholder="Remarks / Notes"
            rows={2}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Attachment</label>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface px-3 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low">
              <AttachFileOutlinedIcon sx={{ fontSize: 18 }} />
              Choose file
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange({ ...entry, attachmentName: file?.name });
                }}
              />
            </label>
            <span className="text-caption text-on-surface-variant">
              {entry.attachmentName ?? "No file chosen"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddDailyTaskModal({
  open,
  initialDraft,
  editingTaskId,
  onClose,
  onSaveDraft,
  onSubmit,
}: AddDailyTaskModalProps) {
  const { meta } = useDailyWorksheet();
  const [date, setDate] = useState(meta.dateIso);
  const [taskEntries, setTaskEntries] = useState<TaskFormEntry[]>([createEmptyTaskEntry()]);

  useEffect(() => {
    if (!open) return;
    if (initialDraft) {
      setDate(initialDraft.date);
      setTaskEntries(
        initialDraft.tasks.length > 0 ? initialDraft.tasks : [createEmptyTaskEntry()],
      );
    } else {
      setDate(meta.dateIso);
      setTaskEntries([createEmptyTaskEntry()]);
    }
  }, [open, initialDraft, meta.dateIso]);

  if (!open) return null;

  const draft: DailyTaskDraft = { date, tasks: taskEntries };
  const isEditing = Boolean(editingTaskId);

  return (
    <DashboardModal
      title={isEditing ? "Edit Daily Task" : "Add Daily Tasks"}
      titleId="add-daily-task-title"
      size="lg"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnSecondary}>
            Cancel
          </button>
          <button type="button" onClick={() => onSaveDraft(draft)} className={modalBtnOutline}>
            Save Draft
          </button>
          <button type="button" onClick={() => onSubmit(draft)} className={modalBtnPrimary}>
            Submit
          </button>
        </>
      }
    >
      <div className="mb-6 max-w-xs">
        <label className={labelClass}>
          Date <span className="text-error">*</span>
        </label>
        <input
          type="date"
          className={inputClass}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className="mt-1 text-caption text-on-surface-variant">
          {formatDisplayDate(date)}
        </p>
      </div>

      <div className="space-y-4">
        {taskEntries.map((entry, index) => (
          <TaskEntryForm
            key={entry.id}
            entry={entry}
            index={index}
            canRemove={!isEditing && taskEntries.length > 1}
            onChange={(updated) =>
              setTaskEntries((prev) => prev.map((t) => (t.id === entry.id ? updated : t)))
            }
            onRemove={() =>
              setTaskEntries((prev) => prev.filter((t) => t.id !== entry.id))
            }
          />
        ))}
      </div>

      {!isEditing && (
        <button
          type="button"
          onClick={() => setTaskEntries((prev) => [...prev, createEmptyTaskEntry()])}
          className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-primary/40 px-4 py-2.5 text-label-md text-primary transition-colors hover:bg-primary-container/10"
        >
          <AddOutlinedIcon sx={{ fontSize: 18 }} />
          Add Another Project / Task
        </button>
      )}
    </DashboardModal>
  );
}
