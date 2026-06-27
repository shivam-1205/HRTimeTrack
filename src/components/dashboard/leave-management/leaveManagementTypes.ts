import leaveManagementResponse from "./leaveManagementData.json";

export type LeaveStatus = "approved" | "pending" | "rejected" | "on_hold";
export type TypeTone = "medical" | "casual" | "holiday" | "weekend";
export type MessageDirection = "sent" | "received";
export type PeriodFilter = "monthly" | "yearly";
export type StatusFilter = "all" | LeaveStatus;

export type LeaveMessage = {
  id: string;
  direction: MessageDirection;
  from: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
};

export type LeaveRequestRow = {
  id: string;
  type: string;
  typeTone: TypeTone;
  typeValue: string;
  from: string;
  to: string;
  fromIso: string;
  toIso: string;
  days: number;
  subject: string;
  status: LeaveStatus;
  conflict: string | null;
  recipient: string;
  submittedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  messages: LeaveMessage[];
};

export type HolidayMessage = {
  id: string;
  holidayName: string;
  holidayDate: string;
  subject: string;
  preview: string;
  sentAt: string;
  from: string;
  to: string;
  body: string;
  relatedLeaveId: string;
};

export type LeaveRequestForm = {
  leaveType: string;
  fromDate: string;
  toDate: string;
  recipient: string;
  subject: string;
  message: string;
};

export type HistoryStats = {
  total: number;
  approved: number;
  pending: number;
  onHold: number;
  rejected: number;
  daysTaken: number;
};

export type LeaveManagementApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      employeeName: string;
      employeeId: string;
      managerName: string;
      hrEmail: string;
    };
    formOptions: {
      leaveTypes: { value: string; label: string; tone: TypeTone }[];
      recipients: { value: string; label: string }[];
      months: { value: string; label: string }[];
      years: number[];
    };
    holidayMessages: HolidayMessage[];
    leaveRequests: LeaveRequestRow[];
  };
};

const response = leaveManagementResponse as LeaveManagementApiResponse;

export const LEAVE_MANAGEMENT_API = response;
export const LEAVE_META = response.data.meta;
export const LEAVE_FORM_OPTIONS = response.data.formOptions;
export const HOLIDAY_MESSAGES = response.data.holidayMessages;
export const LEAVE_REQUESTS_INITIAL = response.data.leaveRequests;
