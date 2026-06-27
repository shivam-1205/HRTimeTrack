"use client";

import { useState } from "react";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayScheduleTable from "./HolidayScheduleTable";
import NextHolidayHero from "./NextHolidayHero";
import UpcomingHolidayCards from "./UpcomingHolidayCards";

export default function HolidayCalendarView() {
  const [year, setYear] = useState(2024);

  return (
    <>
      <HolidayCalendarHeader year={year} onYearChange={setYear} />
      <NextHolidayHero year={year} />
      <UpcomingHolidayCards year={year} />
      <HolidayScheduleTable year={year} />
    </>
  );
}
