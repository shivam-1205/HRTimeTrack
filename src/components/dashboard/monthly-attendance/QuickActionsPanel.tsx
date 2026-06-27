"use client";

import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { CARD_SHADOW } from "./monthlyAttendanceTypes";
import { useMonthlyAttendance } from "./context/MonthlyAttendanceContext";

export default function QuickActionsPanel() {
  const { openRegularize, openWfh } = useMonthlyAttendance();

  return (
    <section className={`rounded-xl bg-surface-container-lowest p-6 ${CARD_SHADOW}`}>
      <h3 className="mb-4 text-h3 font-semibold text-on-surface">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => openRegularize()}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-outline-variant/10 bg-surface-container p-4 transition-colors hover:bg-surface-container-high"
        >
          <EventAvailableOutlinedIcon className="text-primary" sx={{ fontSize: 28 }} />
          <span className="text-center text-caption text-on-surface">Regularization</span>
        </button>
        <button
          type="button"
          onClick={openWfh}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-outline-variant/10 bg-surface-container p-4 transition-colors hover:bg-surface-container-high"
        >
          <HomeWorkOutlinedIcon className="text-secondary" sx={{ fontSize: 28 }} />
          <span className="text-center text-caption text-on-surface">WFH Request</span>
        </button>
      </div>
    </section>
  );
}
