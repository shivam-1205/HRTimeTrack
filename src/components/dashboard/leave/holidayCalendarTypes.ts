import holidayCalendarResponse from "./holidayCalendarData.json";

export type HolidayStatus = "paid" | "floating";

export type Holiday = {
  id: string;
  name: string;
  date: string;
  dateIso: string;
  dayOfWeek: string;
  shortDate: string;
  status: HolidayStatus;
  statusLabel: string;
  type: string;
  description: string;
  observedOn: string;
  regions: string[];
  longWeekend: boolean;
  imageKey: string;
};

export type NextHolidayHero = {
  holiday: Holiday;
  fullDate: string;
  days: number;
  hours: number;
  image: string;
};

export type HolidayCalendarApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      companyName: string;
      defaultYear: number;
      todayIso: string;
      region: string;
    };
    years: number[];
    images: Record<string, string>;
    holidaysByYear: Record<string, Holiday[]>;
  };
};

const response = holidayCalendarResponse as HolidayCalendarApiResponse;

export const HOLIDAY_CALENDAR_API = response;
export const HOLIDAY_META = response.data.meta;
export const HOLIDAY_YEARS = response.data.years;
export const HOLIDAY_IMAGES = response.data.images;
export const HOLIDAYS_BY_YEAR_JSON = response.data.holidaysByYear;

export const CARD_SHADOW =
  "shadow-[0_4px_12px_rgba(53,37,205,0.05)] border border-outline-variant/50";
