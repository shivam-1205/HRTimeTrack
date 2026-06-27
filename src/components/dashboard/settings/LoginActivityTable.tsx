import { LOGIN_ACTIVITY } from "./settingsData";

const cardClass =
  "overflow-hidden rounded-lg border border-outline-variant/50 bg-surface shadow-[0_4px_6px_-1px_rgba(53,37,205,0.05),0_2px_4px_-1px_rgba(53,37,205,0.03)]";

export default function LoginActivityTable() {
  return (
    <section className={cardClass}>
      <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest p-6">
        <h3 className="text-h3 font-semibold text-on-surface">Login Activity</h3>
        <button type="button" className="text-label-md text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low">
              <th className="p-3 text-caption font-medium text-on-surface-variant md:p-4">
                Date &amp; Time
              </th>
              <th className="p-3 text-caption font-medium text-on-surface-variant md:p-4">
                Location
              </th>
              <th className="p-3 text-caption font-medium text-on-surface-variant md:p-4">
                IP Address
              </th>
              <th className="p-3 text-caption font-medium text-on-surface-variant md:p-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-body-md text-on-surface">
            {LOGIN_ACTIVITY.map((row, index) => (
              <tr
                key={row.id}
                className={`transition-colors hover:bg-surface-container-lowest ${
                  index < LOGIN_ACTIVITY.length - 1 ? "border-b border-outline-variant/10" : ""
                }`}
              >
                <td className="p-3 md:p-4">{row.dateTime}</td>
                <td className="p-3 md:p-4">{row.location}</td>
                <td className="p-3 text-caption text-on-surface-variant md:p-4">{row.ipAddress}</td>
                <td className="p-3 md:p-4">
                  {row.status === "success" ? (
                    <span className="inline-flex items-center rounded-full bg-[#10b981]/10 px-2 py-1 text-xs font-medium text-[#10b981]">
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-error/10 px-2 py-1 text-xs font-medium text-error">
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
