"use client";

import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

export default function DailyWorksheetHeader() {
  const { meta, openAddModal, saveWorksheetDraft } = useDailyWorksheet();

  return (
    <header className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-on-surface-variant">
          <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
          <span className="text-label-md">{meta.date}</span>
          <span className="h-1 w-1 rounded-full bg-outline-variant" />
          <span className="text-label-md font-semibold text-primary">{meta.userName}</span>
        </div>
        <h1 className="text-h1 font-semibold text-on-surface md:text-[48px] md:leading-[1.1] md:tracking-[-0.02em]">
          Daily Worksheet
        </h1>
        <p className="mt-2 max-w-full text-body-lg leading-relaxed text-on-surface-variant">
          Log your daily work, track progress, submit updates, and monitor productivity across{" "}
          {meta.activeProjects} active projects.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 lg:pb-1">
        <button
          type="button"
          onClick={saveWorksheetDraft}
          className="rounded-lg border border-outline-variant/50 px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          <AddTaskOutlinedIcon sx={{ fontSize: 18 }} />
          Add Task
        </button>
      </div>
    </header>
  );
}
