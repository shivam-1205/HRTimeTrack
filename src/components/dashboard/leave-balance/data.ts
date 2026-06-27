export const LEAVE_BALANCE = {
  year: 2026,
  employee: "You",
  casual: { used: 3.5, total: 12, remaining: 8.5 },
  medical: { used: 1, total: 6, remaining: 5 },
  unpaid: { used: 0.5 },
  quarters: [
    { label: "Q1", used: 2, cap: 6 },
    { label: "Q2", used: 2.5, cap: 6 },
    { label: "Q3", used: 0, cap: 6 },
  ],
} as const;
