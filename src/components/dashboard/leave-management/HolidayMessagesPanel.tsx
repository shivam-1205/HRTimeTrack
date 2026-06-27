"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { useLeaveManagement } from "./context/LeaveManagementContext";

export default function HolidayMessagesPanel() {
  const { holidayMessages, openHolidayMessage } = useLeaveManagement();

  return (
    <section className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_4px_12px_rgba(53,37,205,0.05)]">
      <div className="flex items-center gap-2 border-b border-outline-variant/30 px-6 py-4">
        <EmailOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
        <h2 className="text-h3 font-semibold text-on-surface">Previous Holiday Messages</h2>
      </div>
      <ul className="divide-y divide-outline-variant/20">
        {holidayMessages.map((msg) => (
          <li key={msg.id}>
            <button
              type="button"
              onClick={() => openHolidayMessage(msg)}
              className="flex w-full flex-col gap-1 px-6 py-4 text-left transition-colors hover:bg-surface-container-low/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <EventOutlinedIcon className="text-violet-600" sx={{ fontSize: 18 }} />
                  <span className="text-label-md font-semibold text-on-surface">{msg.holidayName}</span>
                  <span className="text-caption text-on-surface-variant">({msg.holidayDate})</span>
                </div>
                <span className="text-caption text-on-surface-variant">{msg.sentAt}</span>
              </div>
              <p className="text-label-md font-medium text-primary">{msg.subject}</p>
              <p className="line-clamp-2 text-body-md text-on-surface-variant">{msg.preview}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
