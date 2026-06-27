import { HOLIDAYS_BY_YEAR } from "./holidays";

type HolidayScheduleTableProps = {
  year: number;
};

export default function HolidayScheduleTable({ year }: HolidayScheduleTableProps) {
  const holidays = HOLIDAYS_BY_YEAR[year] ?? [];
  const highlightId =
    year === 2024 ? "2024-11-28" : holidays[holidays.length - 2]?.id;

  return (
    <section className="overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-sm">
      <div className="border-b border-outline-variant bg-surface-container-lowest p-6">
        <h3 className="text-h3 font-semibold text-on-surface">Full Schedule - {year}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-container-low">
              <th className="w-1/4 px-6 py-4 text-label-md text-on-surface-variant">Date</th>
              <th className="w-1/3 px-6 py-4 text-label-md text-on-surface-variant">
                Holiday Name
              </th>
              <th className="w-1/4 px-6 py-4 text-label-md text-on-surface-variant">
                Day of Week
              </th>
              <th className="px-6 py-4 text-label-md text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50 text-body-md">
            {holidays.map((holiday) => (
              <tr
                key={holiday.id}
                className={`transition-colors hover:bg-surface-container-low/50 ${
                  holiday.id === highlightId ? "bg-surface-container-low/20" : ""
                }`}
              >
                <td className="px-6 py-4 text-on-surface">{holiday.date}</td>
                <td className="px-6 py-4 font-medium text-on-surface">{holiday.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{holiday.dayOfWeek}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded bg-[#d1fae5] px-2 py-1 text-caption text-[#065f46]">
                    {holiday.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
