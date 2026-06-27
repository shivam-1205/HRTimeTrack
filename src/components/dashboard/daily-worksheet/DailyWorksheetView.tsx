import DailyWorksheetHeader from "./DailyWorksheetHeader";
import TaskLedgerTable from "./TaskLedgerTable";
import WorksheetKpiSection from "./WorksheetKpiSection";
import WorksheetPlaceholderCards from "./WorksheetPlaceholderCards";
import WorksheetStickyFooter from "./WorksheetStickyFooter";
import WorksheetTimeline from "./WorksheetTimeline";

export default function DailyWorksheetView() {
  return (
    <div className="flex min-w-0 flex-col gap-8 pb-4">
      <DailyWorksheetHeader />
      <WorksheetKpiSection />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <TaskLedgerTable />
        </div>
        <div className="lg:col-span-4">
          <WorksheetTimeline />
        </div>
      </div>

      <WorksheetPlaceholderCards />
      <WorksheetStickyFooter />
    </div>
  );
}
