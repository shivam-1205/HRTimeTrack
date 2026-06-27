import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { CARD_SHADOW } from "./dailyWorksheetData";

export default function WorksheetPlaceholderCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <article
        className={`flex h-48 items-center justify-center rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 ${CARD_SHADOW}`}
      >
        <div className="text-center text-on-surface-variant">
          <BarChartOutlinedIcon className="mb-2 opacity-50" sx={{ fontSize: 32 }} />
          <div className="text-label-md">Weekly Hours Analytics Chart Area</div>
        </div>
      </article>
      <article
        className={`flex h-48 items-center justify-center rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 ${CARD_SHADOW}`}
      >
        <div className="text-center text-on-surface-variant">
          <ReportProblemOutlinedIcon className="mb-2 opacity-50" sx={{ fontSize: 32 }} />
          <div className="text-label-md">Blockers &amp; Activity Feed Area</div>
        </div>
      </article>
    </div>
  );
}
