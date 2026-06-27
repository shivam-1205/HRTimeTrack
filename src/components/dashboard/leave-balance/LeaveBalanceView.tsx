import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PageIntro from "../shared/PageIntro";
import { PAGE_CARD, remainingBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { LEAVE_BALANCE } from "./data";

export default function LeaveBalanceView() {
  const { year, employee, casual, medical, unpaid, quarters } = LEAVE_BALANCE;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageIntro
        icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 22 }} />}
        iconClassName="bg-primary-container/10 text-primary"
        title={`Leave Balance — ${year}`}
        description={
          <>
            Annual allocation: Casual 12 · Medical 6 (total 18). 3 quarters of 4 months each
            (Jan–Apr · May–Aug · Sep–Dec). Quarterly cap: 6 paid leaves per quarter — anything
            above auto-converts to Unpaid. Employees exceeding the cap are highlighted in red.{" "}
            <span className="font-medium text-on-surface">View-only access.</span>
          </>
        }
      />

      <section className={`${PAGE_CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-caption text-on-surface-variant">
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Casual (12)</th>
                <th className="px-6 py-4 font-medium">Medical (6)</th>
                <th className="px-6 py-4 font-medium">Unpaid</th>
                <th className="px-6 py-4 font-medium">Quarterly Usage (3 qtrs · cap 6)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-body-md">
                <td className="px-6 py-5 font-semibold text-on-surface">{employee}</td>
                <td className="px-6 py-5">
                  <div className="text-on-surface">
                    Used <span className="font-semibold">{casual.used}</span> / {casual.total}
                  </div>
                  <span className={`${remainingBadgeClass()} mt-2`}>{casual.remaining} remaining</span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-on-surface">
                    Used <span className="font-semibold">{medical.used}</span> / {medical.total}
                  </div>
                  <span className={`${remainingBadgeClass()} mt-2`}>{medical.remaining} remaining</span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-on-surface">
                    Used <span className="font-semibold">{unpaid.used}</span>
                  </div>
                  <span className={`${statusBadgeClass("neutral")} mt-2`}>No cap</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {quarters.map((q) => (
                      <span key={q.label} className={statusBadgeClass("neutral")}>
                        {q.label}: {q.used}/{q.cap}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
