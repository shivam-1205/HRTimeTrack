type HolidayCalendarHeaderProps = {
  year: number;
  onYearChange: (year: number) => void;
};

const YEARS = [2024, 2025] as const;

export default function HolidayCalendarHeader({
  year,
  onYearChange,
}: HolidayCalendarHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-h1 font-semibold text-on-surface">Holiday Calendar</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Company-recognized holidays and observed days off.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container p-1">
        {YEARS.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => onYearChange(y)}
            className={`rounded-full px-4 py-2 text-label-md transition-colors ${
              year === y
                ? "border border-outline-variant/50 bg-surface text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
