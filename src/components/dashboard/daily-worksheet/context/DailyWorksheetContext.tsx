"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ACTIVITY_FEED,
  FORM_OPTIONS,
  PROJECT_FILTERS,
  WEEKLY_ANALYTICS,
  WORKSHEET_BLOCKERS,
  WORKSHEET_FOOTER,
  WORKSHEET_KPIS,
  TASK_ROWS,
  WORKSHEET_META,
  type ActivityItem,
  type BlockerItem,
  type DailyTaskDraft,
  type TaskRow,
  type TimelineItem,
  type WeeklyDay,
} from "../dailyWorksheetTypes";
import {
  buildTimelineFromTasks,
  computeKpis,
  createActivity,
  deriveBlockerFromTask,
  filterTasksByProject,
  taskFormToRow,
  taskRowToFormEntry,
  updateWeeklyTodayHours,
  validateDraft,
} from "../dailyWorksheetUtils";

type Notification = { type: "success" | "info" | "error"; message: string };

type DailyWorksheetContextValue = {
  meta: typeof WORKSHEET_META;
  formOptions: typeof FORM_OPTIONS;
  projectFilters: typeof PROJECT_FILTERS;
  tasks: TaskRow[];
  filteredTasks: TaskRow[];
  projectFilter: string;
  setProjectFilter: (value: string) => void;
  kpis: ReturnType<typeof computeKpis>;
  timeline: TimelineItem[];
  weeklyDays: WeeklyDay[];
  weekLabel: string;
  targetHours: number;
  blockers: BlockerItem[];
  activityFeed: ActivityItem[];
  footer: typeof WORKSHEET_FOOTER & { submissionsLabel: string; productivityStatus: string };
  isModalOpen: boolean;
  editingTaskId: string | null;
  modalInitialDraft: DailyTaskDraft | null;
  openAddModal: () => void;
  openEditModal: (taskId: string) => void;
  closeModal: () => void;
  saveDraftFromModal: (draft: DailyTaskDraft) => void;
  submitTasksFromModal: (draft: DailyTaskDraft) => void;
  saveWorksheetDraft: () => void;
  submitDailyWorksheet: () => void;
  notification: Notification | null;
  clearNotification: () => void;
  isSubmitted: boolean;
};

const DailyWorksheetContext = createContext<DailyWorksheetContextValue | null>(null);

export function DailyWorksheetProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskRow[]>(TASK_ROWS);
  const [projectFilter, setProjectFilter] = useState("all");
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(ACTIVITY_FEED);
  const [blockers, setBlockers] = useState<BlockerItem[]>(WORKSHEET_BLOCKERS);
  const [submissionCount, setSubmissionCount] = useState(WORKSHEET_FOOTER.totalSubmissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [modalInitialDraft, setModalInitialDraft] = useState<DailyTaskDraft | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState<DailyTaskDraft | null>(null);

  const showNotification = useCallback((type: Notification["type"], message: string) => {
    setNotification({ type, message });
    window.setTimeout(() => setNotification(null), 4000);
  }, []);

  const targetHours = WORKSHEET_KPIS.loggedHours.target;

  const kpis = useMemo(() => computeKpis(tasks, targetHours), [tasks, targetHours]);
  const filteredTasks = useMemo(
    () => filterTasksByProject(tasks, projectFilter),
    [tasks, projectFilter],
  );
  const timeline = useMemo(() => buildTimelineFromTasks(tasks), [tasks]);
  const weeklyDays = useMemo(
    () => updateWeeklyTodayHours(WEEKLY_ANALYTICS.days, kpis.loggedHours.current),
    [kpis.loggedHours.current],
  );

  const footer = useMemo(
    () => ({
      ...WORKSHEET_FOOTER,
      submissionsLabel: `${submissionCount} Logs Today`,
      productivityStatus: isSubmitted
        ? "Submitted"
        : kpis.dailyGoal.percent >= 80
          ? "On Track"
          : "In Progress",
    }),
    [submissionCount, isSubmitted, kpis.dailyGoal.percent],
  );

  const openAddModal = useCallback(() => {
    setEditingTaskId(null);
    setModalInitialDraft(
      savedDraft ?? {
        date: WORKSHEET_META.dateIso,
        tasks: [],
      },
    );
    setIsModalOpen(true);
  }, [savedDraft]);

  const openEditModal = useCallback((taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    setEditingTaskId(taskId);
    setModalInitialDraft({
      date: WORKSHEET_META.dateIso,
      tasks: [taskRowToFormEntry(task)],
    });
    setIsModalOpen(true);
  }, [tasks]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTaskId(null);
    setModalInitialDraft(null);
  }, []);

  const commitTasksFromDraft = useCallback(
    (draft: DailyTaskDraft) => {
      const newRows = draft.tasks.map((entry) =>
        taskFormToRow(entry, editingTaskId ?? undefined),
      );

      if (editingTaskId) {
        const updated = newRows[0];
        setTasks((prev) => prev.map((t) => (t.id === editingTaskId ? updated : t)));
        setActivityFeed((prev) => [
          createActivity(`Updated task: ${updated.task}`, "task"),
          ...prev,
        ]);
        const blocker = deriveBlockerFromTask(updated);
        if (blocker) {
          setBlockers((prev) => {
            const without = prev.filter((b) => b.id !== blocker.id);
            return [blocker, ...without];
          });
        }
        showNotification("success", "Task updated successfully.");
      } else {
        setTasks((prev) => [...prev, ...newRows]);
        newRows.forEach((row) => {
          setActivityFeed((prev) => [
            createActivity(`Added task: ${row.task}`, "task"),
            ...prev,
          ]);
          const blocker = deriveBlockerFromTask(row);
          if (blocker) {
            setBlockers((prev) => [blocker, ...prev]);
          }
        });
        showNotification("success", `Added ${newRows.length} task(s) successfully.`);
      }

      setSavedDraft(null);
      closeModal();
    },
    [editingTaskId, closeModal, showNotification],
  );

  const saveDraftFromModal = useCallback(
    (draft: DailyTaskDraft) => {
      if (draft.tasks.length === 0) {
        showNotification("error", "Add at least one task before saving draft.");
        return;
      }
      setSavedDraft(draft);
      setActivityFeed((prev) => [createActivity("Saved worksheet draft", "draft"), ...prev]);
      showNotification("info", "Draft saved. Re-open Add Task to continue editing.");
      closeModal();
    },
    [closeModal, showNotification],
  );

  const submitTasksFromModal = useCallback(
    (draft: DailyTaskDraft) => {
      const err = validateDraft(draft);
      if (err) {
        showNotification("error", err);
        return;
      }
      commitTasksFromDraft(draft);
    },
    [commitTasksFromDraft, showNotification],
  );

  const saveWorksheetDraft = useCallback(() => {
    setActivityFeed((prev) => [createActivity("Saved worksheet draft", "draft"), ...prev]);
    showNotification("info", "Worksheet saved as draft.");
  }, [showNotification]);

  const submitDailyWorksheet = useCallback(() => {
    if (tasks.length === 0) {
      showNotification("error", "Add at least one task before submitting.");
      return;
    }
    setIsSubmitted(true);
    setSubmissionCount((c) => c + 1);
    setActivityFeed((prev) => [
      createActivity(`Submitted daily worksheet for ${WORKSHEET_META.date}`, "submit"),
      ...prev,
    ]);
    showNotification("success", "Daily worksheet submitted successfully.");
  }, [tasks.length, showNotification]);

  const value = useMemo(
    (): DailyWorksheetContextValue => ({
      meta: WORKSHEET_META,
      formOptions: FORM_OPTIONS,
      projectFilters: PROJECT_FILTERS,
      tasks,
      filteredTasks,
      projectFilter,
      setProjectFilter,
      kpis,
      timeline,
      weeklyDays,
      weekLabel: WEEKLY_ANALYTICS.weekLabel,
      targetHours: WEEKLY_ANALYTICS.targetHours,
      blockers,
      activityFeed,
      footer,
      isModalOpen,
      editingTaskId,
      modalInitialDraft,
      openAddModal,
      openEditModal,
      closeModal,
      saveDraftFromModal,
      submitTasksFromModal,
      saveWorksheetDraft,
      submitDailyWorksheet,
      notification,
      clearNotification: () => setNotification(null),
      isSubmitted,
    }),
    [
      tasks,
      filteredTasks,
      projectFilter,
      kpis,
      timeline,
      weeklyDays,
      blockers,
      activityFeed,
      footer,
      isModalOpen,
      editingTaskId,
      modalInitialDraft,
      openAddModal,
      openEditModal,
      closeModal,
      saveDraftFromModal,
      submitTasksFromModal,
      saveWorksheetDraft,
      submitDailyWorksheet,
      notification,
      isSubmitted,
    ],
  );

  return (
    <DailyWorksheetContext.Provider value={value}>{children}</DailyWorksheetContext.Provider>
  );
}

export function useDailyWorksheet() {
  const context = useContext(DailyWorksheetContext);
  if (!context) {
    throw new Error("useDailyWorksheet must be used within DailyWorksheetProvider");
  }
  return context;
}
