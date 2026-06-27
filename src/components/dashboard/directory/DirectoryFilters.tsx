import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DEPARTMENTS, LOCATIONS } from "./employees";

export default function DirectoryFilters() {
  return (
    <section className="flex flex-col items-end gap-4 rounded-xl border border-outline-variant/50 bg-surface p-4 shadow-sm md:flex-row">
      <div className="w-full flex-1">
        <label className="mb-1 block text-caption text-on-surface-variant">Search</label>
        <div className="relative">
          <SearchOutlinedIcon
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
          <input
            type="text"
            placeholder="Name, Role, or Department"
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-4 text-body-md text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="w-full md:w-48">
        <label className="mb-1 block text-caption text-on-surface-variant">Department</label>
        <div className="relative">
          <select className="w-full cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {DEPARTMENTS.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
          <KeyboardArrowDownOutlinedIcon
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
        </div>
      </div>

      <div className="w-full md:w-48">
        <label className="mb-1 block text-caption text-on-surface-variant">Location</label>
        <div className="relative">
          <select className="w-full cursor-pointer appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {LOCATIONS.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
          <KeyboardArrowDownOutlinedIcon
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline"
            sx={{ fontSize: 20 }}
          />
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary px-6 py-2.5 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container md:w-auto"
      >
        <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
        Filter
      </button>
    </section>
  );
}
