export type ExtraWorkingDayRow = {
  id: string;
  date: string;
  reason: string;
  reasonType: "holiday" | "weekend";
  note: string;
  status: "pending" | "approved" | "on_hold" | "rejected";
};

export const EXTRA_DAY_STATUS_COUNTS = {
  approved: 0,
  pending: 2,
  onHold: 0,
  rejected: 0,
} as const;

export const EXTRA_WORKING_DAYS: ExtraWorkingDayRow[] = [
  {
    id: "1",
    date: "Apr 3, 2026 (Fri)",
    reason: "Public Holiday",
    reasonType: "holiday",
    note: "[auto] Detected from login on public holiday",
    status: "pending",
  },
  {
    id: "2",
    date: "Apr 4, 2026 (Sat)",
    reason: "Weekend (Sat/Sun)",
    reasonType: "weekend",
    note: "[auto] Detected from login on Saturday",
    status: "pending",
  },
];
