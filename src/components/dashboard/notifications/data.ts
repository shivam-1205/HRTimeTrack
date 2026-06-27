export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  category: "leave" | "attendance" | "system" | "approval";
  unread: boolean;
};

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Leave request approved",
    message: "Your casual leave for May 24–25, 2026 has been approved by your manager.",
    time: "2 hours ago",
    category: "leave",
    unread: true,
  },
  {
    id: "2",
    title: "Extra working day detected",
    message: "A login was recorded on Apr 4, 2026 (Saturday). Review and submit a note if needed.",
    time: "Yesterday",
    category: "attendance",
    unread: true,
  },
  {
    id: "3",
    title: "Quarterly leave cap reminder",
    message: "You have used 2.5 of 6 paid leaves in Q2. Plan remaining days accordingly.",
    time: "Jun 10, 2026",
    category: "system",
    unread: false,
  },
  {
    id: "4",
    title: "Pending approval required",
    message: "Your team member submitted a medical leave request awaiting your review.",
    time: "Jun 8, 2026",
    category: "approval",
    unread: false,
  },
];

export const UPCOMING_HOLIDAYS_NOTIFY = [
  { name: "Independence Day", date: "15 Aug 2026 • Saturday", days: "In 49 days" },
  { name: "Gandhi Jayanti", date: "2 Oct 2026 • Friday", days: "In 97 days" },
  { name: "Christmas Day", date: "25 Dec 2026 • Friday", days: "In 181 days" },
];
