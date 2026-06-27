import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function WorksheetStickyFooter() {
  return (
    <footer className="sticky bottom-0 z-40 -mx-4 mt-8 flex items-center justify-between border-t border-outline-variant/30 bg-surface/90 px-4 py-3 shadow-[0px_-4px_12px_rgba(0,0,0,0.03)] backdrop-blur-md lg:-mx-8 lg:px-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-caption text-on-surface-variant">Total Submissions</span>
          <span className="text-label-md font-semibold text-on-surface">12 Logs Today</span>
        </div>
        <div className="hidden h-8 w-px bg-outline-variant/30 sm:block" />
        <div className="hidden flex-col sm:flex">
          <span className="text-caption text-on-surface-variant">Productivity</span>
          <span className="text-label-md font-semibold text-emerald-600">On Track</span>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-label-md text-on-primary shadow-sm transition-transform hover:bg-primary/90 active:scale-95"
      >
        Submit Daily Worksheet
        <SendOutlinedIcon sx={{ fontSize: 18 }} />
      </button>
    </footer>
  );
}
