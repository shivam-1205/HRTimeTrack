import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import { ACTIVE_SESSIONS } from "./settingsData";

const cardClass =
  "rounded-lg border border-outline-variant/50 bg-surface p-6 shadow-[0_4px_6px_-1px_rgba(53,37,205,0.05),0_2px_4px_-1px_rgba(53,37,205,0.03)]";

export default function ActiveSessionsCard() {
  return (
    <article className={cardClass}>
      <div className="mb-4 flex items-center justify-between border-b border-outline-variant/30 pb-2">
        <h3 className="text-h3 font-semibold text-on-surface">Active Sessions</h3>
        <span className="rounded-full bg-surface-container-highest px-2 py-1 text-caption text-on-surface-variant">
          2 Devices
        </span>
      </div>

      <div className="overflow-hidden rounded border border-outline-variant/20">
        {ACTIVE_SESSIONS.map((session, index) => (
          <div
            key={session.id}
            className={`flex items-center justify-between bg-surface p-4 transition-colors hover:bg-surface-container-lowest ${
              index < ACTIVE_SESSIONS.length - 1 ? "border-b border-outline-variant/20" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  session.isCurrent
                    ? "bg-primary-container/10 text-primary"
                    : "bg-surface-container-highest text-on-surface-variant"
                }`}
              >
                {session.isCurrent ? (
                  <ComputerOutlinedIcon sx={{ fontSize: 22 }} />
                ) : (
                  <SmartphoneOutlinedIcon sx={{ fontSize: 22 }} />
                )}
              </div>
              <div>
                <p className="text-label-md font-medium text-on-surface">{session.device}</p>
                <p className="text-caption text-on-surface-variant">{session.details}</p>
              </div>
            </div>
            {session.isCurrent ? (
              <span className="mr-2 text-sm font-medium italic text-outline-variant">Current</span>
            ) : (
              <button type="button" className="px-2 py-1 text-label-md text-error hover:underline">
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
