"use client";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDirectory } from "./context/DirectoryContext";

export default function DirectoryFilters() {
  const {
    search,
    departmentFilter,
    locationFilter,
    departments,
    locations,
    setSearch,
    setDepartmentFilter,
    setLocationFilter,
    filteredEmployees,
  } = useDirectory();

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-2.5 pl-10 pr-4 text-body-md text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="w-full md:w-48">
        <label className="mb-1 block text-caption text-on-surface-variant">Department</label>
        <div className="relative">
          <select
            className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
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
          <select
            className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-md text-on-surface"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>{loc.label}</option>
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
        className="flex w-full items-center justify-center gap-1 rounded-xl bg-primary px-6 py-2.5 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90 md:w-auto"
      >
        <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
        {filteredEmployees.length} results
      </button>
    </section>
  );
}
