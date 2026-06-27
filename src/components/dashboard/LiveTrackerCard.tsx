import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import DashboardCard from "./DashboardCard";

export default function LiveTrackerCard() {
  return (
    <DashboardCard className="col-span-1 flex flex-col justify-between p-6 md:col-span-3 lg:col-span-1">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-h3 font-semibold text-on-surface">Live Tracker</h3>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-caption font-medium text-emerald-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Present
          </span>
        </div>
        <div className="py-8 text-center">
          <p className="text-display font-bold tracking-tight text-primary">04:32:15</p>
          <p className="mt-2 text-caption text-outline">Started at 09:05 AM</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-label-md font-medium text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          <PauseCircleOutlinedIcon sx={{ fontSize: 18 }} />
          Take a Break
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest py-3 text-label-md font-medium text-on-surface transition-colors hover:bg-surface-container-low"
        >
          <StopCircleOutlinedIcon sx={{ fontSize: 18 }} />
          End Day
        </button>
      </div>
    </DashboardCard>
  );
}
