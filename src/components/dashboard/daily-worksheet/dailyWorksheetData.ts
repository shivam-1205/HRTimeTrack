export const WORKSHEET_META = {
  date: "Thursday, Oct 26, 2023",
  userName: "Alex Mercer",
  activeProjects: 4,
} as const;

export const CARD_SHADOW =
  "shadow-[0px_4px_12px_rgba(53,37,205,0.05),inset_0_0_0_1px_rgba(199,196,216,0.3)]";

export type TaskRow = {
  id: string;
  task: string;
  project: string;
  priority: "high" | "med";
  estimatedHours: string;
  actualHours: string;
  status: "done" | "in_progress" | "pending";
};

export const TASK_ROWS: TaskRow[] = [
  {
    id: "1",
    task: "Design System Audit",
    project: "HRMS Redesign",
    priority: "high",
    estimatedHours: "2.0",
    actualHours: "2.5",
    status: "done",
  },
  {
    id: "2",
    task: "API Endpoint Integration",
    project: "Core Services",
    priority: "med",
    estimatedHours: "3.0",
    actualHours: "1.5",
    status: "in_progress",
  },
  {
    id: "3",
    task: "Unit Testing",
    project: "Core Services",
    priority: "med",
    estimatedHours: "1.5",
    actualHours: "--",
    status: "pending",
  },
];

export const TIMELINE_ITEMS = [
  {
    id: "1",
    time: "09:00 AM",
    title: "Started Work",
    subtitle: "Design System Audit",
    variant: "success" as const,
  },
  {
    id: "2",
    time: "11:30 AM",
    title: "Current Focus",
    subtitle: "API Endpoint Integration",
    variant: "active" as const,
  },
  {
    id: "3",
    time: "02:00 PM",
    title: "Scheduled Break",
    variant: "upcoming" as const,
  },
  {
    id: "4",
    time: "05:00 PM",
    title: "End of Day",
    variant: "upcoming" as const,
  },
];
