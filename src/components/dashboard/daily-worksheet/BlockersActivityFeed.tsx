"use client";

import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { CARD_SHADOW } from "./dailyWorksheetTypes";
import { useDailyWorksheet } from "./context/DailyWorksheetContext";

function severityClass(severity: "high" | "med" | "low") {
  if (severity === "high") return "border-error-container/50 bg-error-container/20 text-on-error-container";
  if (severity === "med") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-outline-variant/30 bg-surface-variant text-on-surface-variant";
}

function activityIcon(type: "submit" | "task" | "draft" | "status") {
  const colors: Record<string, string> = {
    submit: "bg-emerald-100 text-emerald-700",
    task: "bg-primary-container/20 text-primary",
    draft: "bg-surface-variant text-on-surface-variant",
    status: "bg-amber-100 text-amber-700",
  };
  return colors[type] ?? colors.draft;
}

export default function BlockersActivityFeed() {
  const { blockers, activityFeed } = useDailyWorksheet();

  return (
    <article className={`flex flex-col rounded-xl bg-surface-container-lowest p-4 ${CARD_SHADOW}`}>
      <div className="mb-4 flex items-center gap-2">
        <ReportProblemOutlinedIcon className="text-amber-600" sx={{ fontSize: 22 }} />
        <h3 className="text-h3 font-semibold text-on-surface">Blockers & Activity</h3>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-caption font-semibold uppercase tracking-wider text-on-surface-variant">
          Open Blockers
        </h4>
        {blockers.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">No blockers reported.</p>
        ) : (
          <ul className="space-y-2">
            {blockers.map((blocker) => (
              <li
                key={blocker.id}
                className="rounded-lg border border-outline-variant/30 bg-surface p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-label-md font-medium text-on-surface">{blocker.title}</p>
                    <p className="mt-0.5 text-caption text-on-surface-variant">{blocker.project}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${severityClass(blocker.severity)}`}
                  >
                    {blocker.severity}
                  </span>
                </div>
                <p className="mt-1 text-caption text-on-surface-variant">{blocker.reportedAt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-outline-variant/20 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <HistoryOutlinedIcon className="text-on-surface-variant" sx={{ fontSize: 18 }} />
          <h4 className="text-caption font-semibold uppercase tracking-wider text-on-surface-variant">
            Activity Feed
          </h4>
        </div>
        <ul className="max-h-40 space-y-2 overflow-y-auto">
          {activityFeed.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${activityIcon(item.type)}`}
              >
                {item.type[0].toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body-md text-on-surface">{item.message}</p>
                <p className="text-caption text-on-surface-variant">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
