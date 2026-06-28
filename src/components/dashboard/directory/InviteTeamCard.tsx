"use client";

import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useDirectory } from "./context/DirectoryContext";

export default function InviteTeamCard() {
  const { openInvite } = useDirectory();

  return (
    <button
      type="button"
      onClick={openInvite}
      className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface p-4 text-center shadow-sm transition-colors hover:border-primary"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
        <PersonAddOutlinedIcon sx={{ fontSize: 24 }} />
      </div>
      <h3 className="mb-1 text-label-md font-medium text-on-surface">Invite Team Member</h3>
      <p className="mb-4 text-caption text-outline">
        Send an invitation to join the enterprise portal.
      </p>
      <span className="rounded-xl bg-primary px-4 py-1.5 text-label-md text-on-primary">
        Send Invite
      </span>
    </button>
  );
}
