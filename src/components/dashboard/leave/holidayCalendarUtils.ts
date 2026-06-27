import {
  HOLIDAY_IMAGES,
  HOLIDAYS_BY_YEAR_JSON,
  HOLIDAY_META,
  type Holiday,
  type NextHolidayHero,
} from "./holidayCalendarTypes";

export function getHolidaysForYear(year: number): Holiday[] {
  return HOLIDAYS_BY_YEAR_JSON[String(year)] ?? [];
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getToday(): Date {
  return parseIsoDate(HOLIDAY_META.todayIso);
}

export function formatFullDate(holiday: Holiday): string {
  const date = parseIsoDate(holiday.dateIso);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function computeCountdown(targetIso: string, from = getToday()) {
  const target = parseIsoDate(targetIso);
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffMs = targetMidnight.getTime() - fromMidnight.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0 };
  }

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return { days, hours };
}

export function getNextHoliday(year: number, today = getToday()): NextHolidayHero | null {
  const holidays = getHolidaysForYear(year)
    .filter((h) => parseIsoDate(h.dateIso) >= today)
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso));

  const next = holidays[0];
  if (!next) return null;

  const { days, hours } = computeCountdown(next.dateIso, today);
  const image = HOLIDAY_IMAGES[next.imageKey] ?? HOLIDAY_IMAGES.defaultHero;

  return {
    holiday: next,
    fullDate: formatFullDate(next),
    days,
    hours,
    image,
  };
}

export function getUpcomingHolidays(
  year: number,
  count = 3,
  today = getToday(),
): Holiday[] {
  return getHolidaysForYear(year)
    .filter((h) => parseIsoDate(h.dateIso) >= today)
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso))
    .slice(0, count);
}

export function getYearStats(year: number) {
  const holidays = getHolidaysForYear(year);
  return {
    total: holidays.length,
    paid: holidays.filter((h) => h.status === "paid").length,
    floating: holidays.filter((h) => h.status === "floating").length,
    longWeekends: holidays.filter((h) => h.longWeekend).length,
  };
}

export function exportHolidaysCsv(holidays: Holiday[], year: number) {
  const headers = ["Date", "Holiday", "Day", "Type", "Status", "Observed On", "Regions"];
  const rows = holidays.map((h) => [
    h.date,
    h.name,
    h.dayOfWeek,
    h.type,
    h.statusLabel,
    h.observedOn,
    h.regions.join("; "),
  ]);
  const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `holiday-calendar-${year}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function statusBadgeClass(status: Holiday["status"]): string {
  if (status === "floating") {
    return "bg-amber-50 text-amber-800 border border-amber-200";
  }
  return "bg-emerald-50 text-emerald-800 border border-emerald-200";
}
