"use client";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDirectory } from "./context/DirectoryContext";
import { getDirectoryInitials, type DirectoryEmployee } from "./directoryTypes";

type EmployeeCardProps = {
  employee: DirectoryEmployee;
};

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const { openProfile, openMessage } = useDirectory();

  return (
    <article className="flex flex-col rounded-xl border border-outline-variant/50 bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-outline-variant/30 bg-surface-container-high">
            {employee.avatar ? (
              <img src={employee.avatar} alt={employee.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-container/15 text-sm font-semibold text-primary">
                {getDirectoryInitials(employee.name)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-label-md font-medium text-on-surface">{employee.name}</h3>
            <p className="text-caption text-outline">{employee.role}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex-1 space-y-2">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <DomainOutlinedIcon sx={{ fontSize: 16 }} />
          <span className="text-caption">{employee.department}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
          <span className="text-caption">{employee.location}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <MailOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          <span className="truncate text-caption">{employee.email}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-outline-variant/30 pt-4">
        <button
          type="button"
          onClick={() => openProfile(employee)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-outline-variant px-2 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container"
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          Profile
        </button>
        <button
          type="button"
          onClick={() => openMessage(employee)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary-container/10 px-2 py-1.5 text-label-md text-primary transition-colors hover:bg-primary-container/20"
        >
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          Message
        </button>
      </div>
    </article>
  );
}
