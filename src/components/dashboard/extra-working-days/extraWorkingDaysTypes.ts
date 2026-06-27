import extraWorkingDaysResponse from "./extraWorkingDaysData.json";

export type ExtraDayStatus = "pending" | "approved" | "on_hold" | "rejected";
export type ReasonType = "holiday" | "weekend" | "medical" | "casual";

export type ExtraWorkingDayRow = {
  id: string;
  date: string;
  dateIso: string;
  dayLabel: string;
  reason: string;
  reasonType: ReasonType;
  note: string;
  status: ExtraDayStatus;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  workType: string;
  submittedAt: string;
  reviewedBy: string | null;
  remarks: string;
};

export type ExtraDayRequest = {
  date: string;
  reasonType: ReasonType;
  workType: string;
  startTime: string;
  endTime: string;
  note: string;
};

export type StatusCounts = {
  approved: number;
  pending: number;
  onHold: number;
  rejected: number;
};

export type ExtraWorkingDaysApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      employeeName: string;
      employeeId: string;
      approvedBalance: number;
      pendingBalance: number;
      description: string;
    };
    formOptions: {
      reasons: { value: ReasonType; label: string }[];
      workTypes: string[];
    };
    records: ExtraWorkingDayRow[];
  };
};

const response = extraWorkingDaysResponse as ExtraWorkingDaysApiResponse;

export const EXTRA_WORKING_DAYS_API = response;
export const EXTRA_DAYS_META = response.data.meta;
export const EXTRA_DAYS_FORM = response.data.formOptions;
export const EXTRA_WORKING_DAYS_INITIAL = response.data.records;

export type StatusFilter = "all" | ExtraDayStatus;

export const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  all: "All",
  approved: "Approved",
  pending: "Pending",
  on_hold: "On Hold",
  rejected: "Rejected",
};
