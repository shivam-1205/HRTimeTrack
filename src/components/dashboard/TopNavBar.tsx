"use client";

import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSidebar } from "./context/SidebarContext";

const PROFILE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYpKlKoqgDcAlnvLmNvRA6bKPgqnYTE8nfkojAJB9dEhD0f-QIAEfS3UfxEI93v2jXtwQUxYSwBMPJaZwzbo_4TjtCJuA4Pn2epqHoUM-AWwpaqRCDfnZ_oz7e0Yug9168iKYV6hqmqScEAQiFmMJ1uyYbQtR88jqJSz8gAzD4ZHayCKm6HkDiIUAiybkbZqxMqPhPm7jXs2z8kPdfYDWMyecuqKI3qtzY2ojrzCll1xuK4fksmDdv7zLH6TSgF9vSdDmu3mNhCQ5u";

export default function TopNavBar() {
  const { toggleMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between gap-4 border-b border-outline-variant/60 bg-surface-container-lowest/90 px-4 shadow-sm backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Toggle sidebar"
          className="shrink-0 rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary md:hidden"
        >
          <MenuOutlinedIcon />
        </button>

        <div className="relative hidden w-full max-w-md sm:block">
          <SearchOutlinedIcon
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-outline-variant/60 bg-surface-container-low py-2 pl-10 pr-4 text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
        >
          <NotificationsNoneOutlinedIcon sx={{ fontSize: 22 }} />
        </button>

        <button
          type="button"
          className="hidden rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary sm:block"
        >
          <AppsOutlinedIcon sx={{ fontSize: 22 }} />
        </button>

        <button
          type="button"
          className="hidden rounded-lg bg-primary px-4 py-2 text-label-md font-medium text-on-primary shadow-sm transition-opacity hover:opacity-90 sm:block"
        >
          Check In
        </button>

        <div className="ml-1 h-9 w-9 overflow-hidden rounded-full border border-outline-variant bg-surface-container-high">
          <img src={PROFILE_IMAGE} alt="User Profile" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
}
