export type LeaveRequestRow = {
  id: string;
  type: string;
  typeTone: "medical" | "casual";
  from: string;
  to: string;
  subject: string;
  status: "approved" | "pending" | "rejected" | "on_hold";
};

export const LEAVE_SUMMARY = {
  approved: 3,
  pending: 0,
  rejected: 0,
} as const;

export const LEAVE_REQUESTS: LeaveRequestRow[] = [
  {
    id: "1",
    type: "Medical",
    typeTone: "medical",
    from: "May 29, 2026",
    to: "May 29, 2026",
    subject: "Doctor appointment — feeling unwell since morning.",
    status: "approved",
  },
  {
    id: "2",
    type: "Casual (½ PM)",
    typeTone: "casual",
    from: "May 25, 2026",
    to: "May 25, 2026",
    subject: "Personal errand — half day afternoon leave.",
    status: "approved",
  },
  {
    id: "3",
    type: "Casual",
    typeTone: "casual",
    from: "May 24, 2026",
    to: "May 25, 2026",
    subject: "Family function out of town.",
    status: "approved",
  },
];

export const HISTORY_STATS = {
  total: 0,
  approved: 0,
  pending: 0,
  onHold: 0,
  rejected: 0,
  daysTaken: 0,
} as const;
