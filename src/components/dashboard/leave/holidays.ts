export type HolidayStatus = "paid" | "floating";

export type Holiday = {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  shortDate: string;
  status: HolidayStatus;
  statusLabel: string;
};

export const HOLIDAYS_BY_YEAR: Record<number, Holiday[]> = {
  2024: [
    {
      id: "2024-01-01",
      name: "New Year's Day",
      date: "Jan 1, 2024",
      dayOfWeek: "Monday",
      shortDate: "Jan 1",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-01-15",
      name: "Martin Luther King Jr. Day",
      date: "Jan 15, 2024",
      dayOfWeek: "Monday",
      shortDate: "Jan 15",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-05-27",
      name: "Memorial Day",
      date: "May 27, 2024",
      dayOfWeek: "Monday",
      shortDate: "May 27",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-07-04",
      name: "Independence Day",
      date: "Jul 4, 2024",
      dayOfWeek: "Thursday",
      shortDate: "Jul 4",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-09-02",
      name: "Labor Day",
      date: "Sep 2, 2024",
      dayOfWeek: "Monday",
      shortDate: "Sep 2",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-11-28",
      name: "Thanksgiving Day",
      date: "Nov 28, 2024",
      dayOfWeek: "Thursday",
      shortDate: "Nov 28",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2024-12-25",
      name: "Christmas Day",
      date: "Dec 25, 2024",
      dayOfWeek: "Wednesday",
      shortDate: "Dec 25",
      status: "paid",
      statusLabel: "Paid",
    },
  ],
  2025: [
    {
      id: "2025-01-01",
      name: "New Year's Day",
      date: "Jan 1, 2025",
      dayOfWeek: "Wednesday",
      shortDate: "Jan 1",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-01-20",
      name: "Martin Luther King Jr. Day",
      date: "Jan 20, 2025",
      dayOfWeek: "Monday",
      shortDate: "Jan 20",
      status: "floating",
      statusLabel: "Floating",
    },
    {
      id: "2025-05-26",
      name: "Memorial Day",
      date: "May 26, 2025",
      dayOfWeek: "Monday",
      shortDate: "May 26",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-07-04",
      name: "Independence Day",
      date: "Jul 4, 2025",
      dayOfWeek: "Friday",
      shortDate: "Jul 4",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-09-01",
      name: "Labor Day",
      date: "Sep 1, 2025",
      dayOfWeek: "Monday",
      shortDate: "Sep 1",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-11-27",
      name: "Thanksgiving Day",
      date: "Nov 27, 2025",
      dayOfWeek: "Thursday",
      shortDate: "Nov 27",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-12-25",
      name: "Christmas Day",
      date: "Dec 25, 2025",
      dayOfWeek: "Thursday",
      shortDate: "Dec 25",
      status: "paid",
      statusLabel: "Paid",
    },
  ],
};

export const THANKSGIVING_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ6tYN5PKItLNjJKkgRUfN7smqTuX3hItttt6mj7X_q_6yYtIJCsoitYn0TZPJGtuJRZzWlT70ed4omY6x_xE0SRAykZgPdKs7bsZA4y_9sEKRvBTDQJ5IpM6ad9gDIN2W7ljxVHhHUgAivAFrz01Qa_S4ErFP86AV5ffAg1RcVvfb8zPeqmfa5HldPWqtFX_vob5L_6kiibBI9gzShx-ZPg-0tuOnenoYOVMlw3dElno7gfx79ntW2IMHZnlVmknbZ6B7fZ1hQQfP";

export const UPCOMING_CARDS: Record<number, Holiday[]> = {
  2024: [
    {
      id: "2024-12-25",
      name: "Christmas Day",
      date: "Dec 25, 2024",
      dayOfWeek: "Wednesday",
      shortDate: "Dec 25",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-01-01",
      name: "New Year's Day",
      date: "Jan 1, 2025",
      dayOfWeek: "Wednesday",
      shortDate: "Jan 1",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2025-01-20",
      name: "MLK Jr. Day",
      date: "Jan 20, 2025",
      dayOfWeek: "Monday",
      shortDate: "Jan 20",
      status: "floating",
      statusLabel: "Floating",
    },
  ],
  2025: [
    {
      id: "2025-12-25",
      name: "Christmas Day",
      date: "Dec 25, 2025",
      dayOfWeek: "Thursday",
      shortDate: "Dec 25",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2026-01-01",
      name: "New Year's Day",
      date: "Jan 1, 2026",
      dayOfWeek: "Thursday",
      shortDate: "Jan 1",
      status: "paid",
      statusLabel: "Paid",
    },
    {
      id: "2026-01-19",
      name: "MLK Jr. Day",
      date: "Jan 19, 2026",
      dayOfWeek: "Monday",
      shortDate: "Jan 19",
      status: "floating",
      statusLabel: "Floating",
    },
  ],
};

export const UPCOMING_HERO: Record<
  number,
  { name: string; fullDate: string; days: number; hours: number; image: string }
> = {
  2024: {
    name: "Thanksgiving Day",
    fullDate: "Thursday, November 28, 2024",
    days: 14,
    hours: 8,
    image: THANKSGIVING_IMAGE,
  },
  2025: {
    name: "Thanksgiving Day",
    fullDate: "Thursday, November 27, 2025",
    days: 21,
    hours: 6,
    image: THANKSGIVING_IMAGE,
  },
};
