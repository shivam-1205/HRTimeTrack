export const EMPLOYEE_PROFILE = {
  name: "Shivam Singh",
  employeeId: "EMP-1024",
  department: "Product Design",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1rqijmmF8-AAQSSbBY8vYmoZSAC_YdQrZmiX4ooDhF4rZ7TWvdArlYDtqEMRxsi50OlVRfLjW8GyXHDVAGO1CL_3BmZ1s5lDMhesFSXMUgGw7_Eil0BkXXmUxMpLJYWoGblJqrvuzzRwznpuboD8XAa9e2nqP6mDYayI7eyh7i5IdPVz0cBdRB3L1VmI9Cs3UQ2Kj31pv8tyqd-FxVaGrk1nWGm6WGC5dn3XRL0AsoL-L_UktljaIyg",
  workingHours: { hours: 6, minutes: 42 },
  loginTime: "09:05 AM",
  status: "Present" as const,
};

export const KPI_STATS = [
  {
    id: "attendance",
    label: "Attendance %",
    value: "94.2%",
    subtext: "+2.1% from last month",
    subtextClass: "text-emerald-600",
    icon: "percent",
    iconClass: "bg-primary/10 text-primary",
    trend: true,
  },
  {
    id: "present",
    label: "Present Days",
    value: "18",
    subtext: "Out of 22 working days",
    subtextClass: "text-on-surface-variant",
    icon: "check_circle",
    iconClass: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "late",
    label: "Late Arrivals",
    value: "01",
    subtext: "Grace late: 02",
    subtextClass: "text-on-surface-variant",
    icon: "schedule",
    iconClass: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "missing",
    label: "Missing Logouts",
    value: "02",
    subtext: "Requires action",
    subtextClass: "text-error font-medium",
    icon: "logout",
    iconClass: "bg-error/10 text-error",
    alertBorder: true,
  },
] as const;

export const CHART_BARS = [
  { height: "40%", className: "bg-primary/40 group-hover:bg-primary" },
  { height: "70%", className: "bg-primary/60 group-hover:bg-primary" },
  { height: "55%", className: "bg-primary/50 group-hover:bg-primary" },
  { height: "20%", className: "bg-error/40 group-hover:bg-error" },
  { height: "85%", className: "bg-primary/70 group-hover:bg-primary" },
  { height: "95%", className: "bg-primary/90 group-hover:bg-primary" },
  { height: "60%", className: "bg-primary/50 group-hover:bg-primary" },
  { height: "45%", className: "bg-emerald-500/40 group-hover:bg-emerald-500" },
] as const;

export type AttendanceLogRow = {
  id: string;
  date: string;
  day: string;
  dayClass?: string;
  status: string;
  statusVariant: "present" | "missing";
  clockIn: string;
  clockOut: string;
  clockOutClass?: string;
  totalHrs: string;
  action: "menu" | "fix";
  highlight?: boolean;
};

export const RECENT_LOGS: AttendanceLogRow[] = [
  {
    id: "1",
    date: "Jun 14, 2026",
    day: "Friday",
    status: "Present",
    statusVariant: "present",
    clockIn: "09:05 AM",
    clockOut: "--:-- --",
    totalHrs: "06h 42m",
    action: "menu",
  },
  {
    id: "2",
    date: "Jun 13, 2026",
    day: "Thursday",
    status: "Present",
    statusVariant: "present",
    clockIn: "08:55 AM",
    clockOut: "06:10 PM",
    totalHrs: "09h 15m",
    action: "menu",
  },
  {
    id: "3",
    date: "Jun 12, 2026",
    day: "Wednesday",
    dayClass: "text-error",
    status: "Missing Out",
    statusVariant: "missing",
    clockIn: "09:15 AM",
    clockOut: "Missing",
    clockOutClass: "text-error font-medium",
    totalHrs: "--",
    action: "fix",
    highlight: true,
  },
];

export const TIMELINE_ITEMS = [
  { label: "Clocked In", time: "09:05 AM", variant: "success" as const },
  { label: "Tea Break", time: "11:15 AM - 11:30 AM (15m)", variant: "default" as const },
  { label: "Lunch Break", time: "01:30 PM - 02:15 PM (45m)", variant: "default" as const },
  {
    label: "Expected Clock Out",
    time: "06:30 PM",
    variant: "pending" as const,
  },
];

export const UPCOMING_HOLIDAY = {
  name: "Eid al-Adha",
  date: "17 June 2026",
  note: "Long weekend incoming!",
};

export const CARD_SHADOW =
  "shadow-[0_4px_12px_rgba(53,37,205,0.05)] border border-[#e7eefe]";
