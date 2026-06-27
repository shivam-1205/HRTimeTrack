"use client";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import DashboardModal, {
  DashboardModalStat,
  DashboardModalStatGrid,
} from "../shared/DashboardModal";
import { modalBtnOutline, modalBtnPrimary } from "../shared/modalStyles";
import { HOLIDAY_IMAGES, type Holiday } from "./holidayCalendarTypes";
import { formatFullDate, statusBadgeClass } from "./holidayCalendarUtils";
import { useHolidayCalendar } from "./context/HolidayCalendarContext";

type HolidayDetailModalProps = {
  holiday: Holiday | null;
  onClose: () => void;
  onAddToCalendar: (holiday: Holiday) => void;
};

export default function HolidayDetailModal({
  holiday,
  onClose,
  onAddToCalendar,
}: HolidayDetailModalProps) {
  if (!holiday) return null;

  const image = HOLIDAY_IMAGES[holiday.imageKey] ?? HOLIDAY_IMAGES.defaultHero;

  return (
    <DashboardModal
      title=""
      size="md"
      showHeader={false}
      onClose={onClose}
      titleId="holiday-detail-title"
      banner={
        <div className="relative h-24 shrink-0 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute px-1.5 py-1 top-2 right-3 justify-center items-center rounded-3xl bg-black/35 text-white transition-colors hover:bg-black/50"
            aria-label="Close"
          >
            <CloseOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      }
      footer={
        <>
          <button type="button" onClick={onClose} className={modalBtnOutline}>
            Close
          </button>
          <button
            type="button"
            onClick={() => onAddToCalendar(holiday)}
            className={`flex items-center gap-1.5 ${modalBtnPrimary}`}
          >
            <CalendarMonthOutlinedIcon sx={{ fontSize: 16 }} />
            Add to Calendar
          </button>
        </>
      }
    >
      <div className="mb-3">
        <h2 id="holiday-detail-title" className="text-label-lg font-semibold text-on-surface">
          {holiday.name}
        </h2>
        <p className="mt-0.5 text-caption text-on-surface-variant">{formatFullDate(holiday)}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-caption font-medium ${statusBadgeClass(holiday.status)}`}
          >
            {holiday.statusLabel}
          </span>
          <span className="inline-flex rounded-full border border-outline-variant bg-surface-container px-2 py-0.5 text-caption text-on-surface-variant">
            {holiday.type}
          </span>
          {holiday.longWeekend && (
            <span className="inline-flex items-center gap-0.5 rounded-full border border-primary/20 bg-primary-container/10 px-2 py-0.5 text-caption text-primary">
              <WeekendOutlinedIcon sx={{ fontSize: 12 }} />
              Long Weekend
            </span>
          )}
        </div>
      </div>

      <DashboardModalStatGrid>
        <DashboardModalStat icon={<EventOutlinedIcon />} label="Observed" value={holiday.observedOn} />
        <DashboardModalStat icon={<CalendarMonthOutlinedIcon />} label="Day" value={holiday.dayOfWeek} />
        <DashboardModalStat
          icon={<LocationOnOutlinedIcon />}
          label="Regions"
          value={holiday.regions.join(", ")}
          spanFull
        />
        <DashboardModalStat
          icon={<NotesOutlinedIcon />}
          label="About"
          value={holiday.description}
          spanFull
        />
      </DashboardModalStatGrid>
    </DashboardModal>
  );
}

export function HolidayCalendarModals() {
  const { selectedHoliday, closeHolidayDetail, addToCalendar } = useHolidayCalendar();

  return (
    <HolidayDetailModal
      holiday={selectedHoliday}
      onClose={closeHolidayDetail}
      onAddToCalendar={addToCalendar}
    />
  );
}
