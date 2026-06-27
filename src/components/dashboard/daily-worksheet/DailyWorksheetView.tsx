"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DailyWorksheetHeader from "./DailyWorksheetHeader";
import TaskLedgerTable from "./TaskLedgerTable";
import WorksheetKpiSection from "./WorksheetKpiSection";
import WorksheetStickyFooter from "./WorksheetStickyFooter";
import WorksheetTimeline from "./WorksheetTimeline";
import WeeklyHoursChart from "./WeeklyHoursChart";
import BlockersActivityFeed from "./BlockersActivityFeed";
import AddDailyTaskModal from "./AddDailyTaskModal";
import { DailyWorksheetProvider, useDailyWorksheet } from "./context/DailyWorksheetContext";

function WorksheetNotification() {
  const { notification, clearNotification } = useDailyWorksheet();
  if (!notification) return null;

  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };
  const icons = {
    success: CheckCircleOutlinedIcon,
    info: InfoOutlinedIcon,
    error: ErrorOutlineOutlinedIcon,
  };
  const Icon = icons[notification.type];

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${styles[notification.type]}`}
      role="status"
    >
      <div className="flex items-center gap-2">
        <Icon sx={{ fontSize: 20 }} />
        <span className="text-label-md">{notification.message}</span>
      </div>
      <button
        type="button"
        onClick={clearNotification}
        className="text-caption underline opacity-70 hover:opacity-100"
      >
        Dismiss
      </button>
    </div>
  );
}

function DailyWorksheetContent() {
  const {
    isModalOpen,
    editingTaskId,
    modalInitialDraft,
    closeModal,
    saveDraftFromModal,
    submitTasksFromModal,
  } = useDailyWorksheet();

  return (
    <div className="flex min-w-0 flex-col gap-8 pb-4">
      <WorksheetNotification />
      <DailyWorksheetHeader />
      <WorksheetKpiSection />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <TaskLedgerTable />
        </div>
        <div className="lg:col-span-4">
          <WorksheetTimeline />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WeeklyHoursChart />
        <BlockersActivityFeed />
      </div>

      <WorksheetStickyFooter />

      <AddDailyTaskModal
        open={isModalOpen}
        initialDraft={modalInitialDraft}
        editingTaskId={editingTaskId}
        onClose={closeModal}
        onSaveDraft={saveDraftFromModal}
        onSubmit={submitTasksFromModal}
      />
    </div>
  );
}

export default function DailyWorksheetView() {
  return (
    <DailyWorksheetProvider>
      <DailyWorksheetContent />
    </DailyWorksheetProvider>
  );
}
