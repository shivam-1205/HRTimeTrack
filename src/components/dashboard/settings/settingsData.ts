export const USER_PROFILE = {
  name: "Alex Mercer",
  email: "alex.mercer@enterprise.com",
  role: "Senior Developer",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCSBWMmRXNOZgad-9M2FoS-L3bx_hZIOaq68WYmyqY0zNcz6PZnSw6U-MR3SIjDTHthLeo_1XRP3WdV8joHmUDgA1naaYlsmGY-UDaQbs9ORaI9xEJY4xO4yDTks0_Cffd4ytI8PR_mZCIavFv44CeBJBaw6AKlxMxHuPIkh-U38v5aIdP7jORxOn6o3G6CU04b8JMuk2pWKgst0Cgx8FmDRsW4eO2WF4Po3pIOmYF-26eOVmnG_8J5-bfFdCVOIekzYf2FZXUpTUWH",
  phone: "+1 (555) 123-4567",
  address: "123 Corporate Blvd, Suite 400\nSan Francisco, CA 94105",
  emergencyContact: "Sarah Mercer - (555) 987-6543",
} as const;

export type LoginActivityRow = {
  id: string;
  dateTime: string;
  location: string;
  ipAddress: string;
  status: "success" | "failed";
};

export const LOGIN_ACTIVITY: LoginActivityRow[] = [
  {
    id: "1",
    dateTime: "Today, 09:41 AM",
    location: "San Francisco, CA",
    ipAddress: "192.168.1.105",
    status: "success",
  },
  {
    id: "2",
    dateTime: "Yesterday, 18:20 PM",
    location: "San Jose, CA",
    ipAddress: "192.168.1.142",
    status: "success",
  },
  {
    id: "3",
    dateTime: "Oct 24, 14:05 PM",
    location: "Unknown Location",
    ipAddress: "104.28.19.45",
    status: "failed",
  },
];

export type ActiveSession = {
  id: string;
  device: string;
  details: string;
  isCurrent?: boolean;
};

export const ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: "1",
    device: 'MacBook Pro 16"',
    details: "Chrome • San Francisco • Active Now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iPhone 14 Pro",
    details: "Safari • San Jose • Last active 2h ago",
  },
];
