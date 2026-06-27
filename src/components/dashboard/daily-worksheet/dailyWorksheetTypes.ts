import dailyWorksheetResponse from "./dailyWorksheetData.json";

export const CARD_SHADOW =
  "shadow-[0px_4px_12px_rgba(53,37,205,0.05),inset_0_0_0_1px_rgba(199,196,216,0.3)]";

export type TaskPriority = "low" | "med" | "high";
export type TaskStatus = "done" | "in_progress" | "pending";
export type TimelineVariant = "success" | "active" | "upcoming";

export type TaskRow = {
  id: string;
  task: string;
  project: string;
  clientName?: string;
  taskDescription?: string;
  workCategory?: string;
  priority: TaskPriority;
  estimatedHours: string;
  actualHours: string;
  status: TaskStatus;
  startTime?: string;
  endTime?: string;
  remarks?: string;
  attachmentName?: string;
  projectFilterKey?: string;
};

export type TaskFormEntry = {
  id: string;
  projectName: string;
  clientName: string;
  taskTitle: string;
  taskDescription: string;
  workCategory: string;
  priority: TaskPriority;
  startTime: string;
  endTime: string;
  status: TaskStatus;
  remarks: string;
  attachmentName?: string;
};

export type DailyTaskDraft = {
  date: string;
  tasks: TaskFormEntry[];
};

export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  variant: TimelineVariant;
};

export type WeeklyDay = {
  label: string;
  date: string;
  hours: number;
  isToday: boolean;
};

export type BlockerItem = {
  id: string;
  title: string;
  project: string;
  severity: "high" | "med" | "low";
  reportedAt: string;
  status: "open" | "resolved";
};

export type ActivityItem = {
  id: string;
  message: string;
  time: string;
  type: "submit" | "task" | "draft" | "status";
};

export type DailyWorksheetApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      date: string;
      dateIso: string;
      userName: string;
      activeProjects: number;
    };
    kpis: {
      loggedHours: {
        current: number;
        target: number;
        trendPercent: number;
        trendLabel: string;
      };
      completed: { count: number; planned: number; label: string };
      inProgress: { count: number; note: string };
      productivityScore: { value: number; label: string };
      dailyGoal: { percent: number; remainingHours: number; streakDays: number };
    };
    projectFilters: { value: string; label: string }[];
    formOptions: {
      priorities: { value: TaskPriority; label: string }[];
      statuses: { value: TaskStatus; label: string }[];
      workCategories: string[];
    };
    tasks: TaskRow[];
    timeline: TimelineItem[];
    weeklyAnalytics: {
      weekLabel: string;
      targetHours: number;
      days: WeeklyDay[];
    };
    blockers: BlockerItem[];
    activityFeed: ActivityItem[];
    footer: {
      totalSubmissions: number;
      submissionsLabel: string;
      productivityStatus: string;
    };
  };
};

const response = dailyWorksheetResponse as DailyWorksheetApiResponse;

export const DAILY_WORKSHEET_API = response;
export const WORKSHEET_META = response.data.meta;
export const WORKSHEET_KPIS = response.data.kpis;
export const PROJECT_FILTERS = response.data.projectFilters;
export const TASK_ROWS = response.data.tasks;
export const TIMELINE_ITEMS = response.data.timeline;
export const WEEKLY_ANALYTICS = response.data.weeklyAnalytics;
export const WORKSHEET_BLOCKERS = response.data.blockers;
export const ACTIVITY_FEED = response.data.activityFeed;
export const FORM_OPTIONS = response.data.formOptions;
export const WORKSHEET_FOOTER = response.data.footer;
