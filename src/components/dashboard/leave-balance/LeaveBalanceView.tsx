"use client";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useState } from "react";
import DashboardModal, {
  DashboardModalStat,
  DashboardModalStatGrid,
} from "../shared/DashboardModal";
import PageIntro from "../shared/PageIntro";
import { modalBtnPrimary } from "../shared/modalStyles";
import { PAGE_CARD, remainingBadgeClass, statusBadgeClass } from "../shared/pageStyles";
import { LEAVE_BALANCE } from "./data";

type BalanceModal =
  | { type: "casual" }
  | { type: "medical" }
  | { type: "unpaid" }
  | { type: "quarter"; label: string; used: number; cap: number }
  | null;

const QUARTER_PERIODS: Record<string, string> = {
  Q1: "Jan – Apr",
  Q2: "May – Aug",
  Q3: "Sep – Dec",
};

export default function LeaveBalanceView() {
  const { year, employee, casual, medical, unpaid, quarters } = LEAVE_BALANCE;
  const [modal, setModal] = useState<BalanceModal>(null);

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
                  <button
                    type="button"
                    onClick={() => setModal({ type: "casual" })}
                    className="text-left transition-opacity hover:opacity-80"
                  >
                    <div className="text-on-surface">
                      Used <span className="font-semibold">{casual.used}</span> / {casual.total}
                    </div>
                    <span className={`${remainingBadgeClass()} mt-2`}>{casual.remaining} remaining</span>
                  </button>
                </td>
                <td className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => setModal({ type: "medical" })}
                    className="text-left transition-opacity hover:opacity-80"
                  >
                    <div className="text-on-surface">
                      Used <span className="font-semibold">{medical.used}</span> / {medical.total}
                    </div>
                    <span className={`${remainingBadgeClass()} mt-2`}>{medical.remaining} remaining</span>
                  </button>
                </td>
                <td className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => setModal({ type: "unpaid" })}
                    className="text-left transition-opacity hover:opacity-80"
                  >
                    <div className="text-on-surface">
                      Used <span className="font-semibold">{unpaid.used}</span>
                    </div>
                    <span className={`${statusBadgeClass("neutral")} mt-2`}>No cap</span>
                  </button>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {quarters.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => setModal({ type: "quarter", label: q.label, used: q.used, cap: q.cap })}
                        className={`${statusBadgeClass("neutral")} cursor-pointer transition-opacity hover:opacity-80`}
                      >
                        {q.label}: {q.used}/{q.cap}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {modal?.type === "casual" && (
        <DashboardModal
          title="Casual Leave"
          size="sm"
          onClose={() => setModal(null)}
          footer={<button type="button" onClick={() => setModal(null)} className={modalBtnPrimary}>Close</button>}
        >
          <DashboardModalStatGrid>
            <DashboardModalStat label="Allocated" value={String(casual.total)} />
            <DashboardModalStat label="Used" value={String(casual.used)} />
            <DashboardModalStat label="Remaining" value={String(casual.remaining)} valueClass="text-emerald-600" spanFull />
          </DashboardModalStatGrid>
        </DashboardModal>
      )}

      {modal?.type === "medical" && (
        <DashboardModal
          title="Medical Leave"
          size="sm"
          onClose={() => setModal(null)}
          footer={<button type="button" onClick={() => setModal(null)} className={modalBtnPrimary}>Close</button>}
        >
          <DashboardModalStatGrid>
            <DashboardModalStat label="Allocated" value={String(medical.total)} />
            <DashboardModalStat label="Used" value={String(medical.used)} />
            <DashboardModalStat label="Remaining" value={String(medical.remaining)} valueClass="text-emerald-600" spanFull />
          </DashboardModalStatGrid>
        </DashboardModal>
      )}

      {modal?.type === "unpaid" && (
        <DashboardModal
          title="Unpaid Leave"
          size="sm"
          onClose={() => setModal(null)}
          footer={<button type="button" onClick={() => setModal(null)} className={modalBtnPrimary}>Close</button>}
        >
          <DashboardModalStatGrid>
            <DashboardModalStat label="Used" value={String(unpaid.used)} />
            <DashboardModalStat label="Cap" value="No limit" valueClass="text-on-surface-variant" />
          </DashboardModalStatGrid>
        </DashboardModal>
      )}

      {modal?.type === "quarter" && (
        <DashboardModal
          title={`${modal.label} — ${QUARTER_PERIODS[modal.label] ?? ""}`}
          size="sm"
          onClose={() => setModal(null)}
          headerBadge={
            <span className={statusBadgeClass(modal.used > modal.cap ? "danger" : "success")}>
              {modal.used > modal.cap ? "Over cap" : "Within cap"}
            </span>
          }
          footer={<button type="button" onClick={() => setModal(null)} className={modalBtnPrimary}>Close</button>}
        >
          <DashboardModalStatGrid>
            <DashboardModalStat label="Used" value={String(modal.used)} />
            <DashboardModalStat label="Quarterly Cap" value={String(modal.cap)} />
            <DashboardModalStat
              label="Remaining"
              value={String(Math.max(0, modal.cap - modal.used))}
              valueClass={modal.used > modal.cap ? "text-error" : "text-emerald-600"}
              spanFull
            />
          </DashboardModalStatGrid>
        </DashboardModal>
      )}
    </div>
  );
}
