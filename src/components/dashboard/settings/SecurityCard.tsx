"use client";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

const cardClass =
  "rounded-lg border border-outline-variant/50 bg-surface p-6 shadow-[0_4px_6px_-1px_rgba(53,37,205,0.05),0_2px_4px_-1px_rgba(53,37,205,0.03)]";

export default function SecurityCard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <article className={cardClass}>
      <div className="mb-4 flex items-center gap-2 border-b border-outline-variant/30 pb-2">
        <LockOutlinedIcon className="text-primary" sx={{ fontSize: 22 }} />
        <h3 className="text-h3 font-semibold text-on-surface">Security</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-label-md font-medium text-on-surface">Password</h4>
          <p className="text-body-md text-on-surface-variant">Last changed 3 months ago.</p>
          <button
            type="button"
            className="w-full rounded border border-outline-variant bg-surface-container-lowest px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container-low sm:w-auto"
          >
            Request Reset
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-label-md font-medium text-on-surface">Two-Factor Authentication</h4>
          <p className="text-body-md text-on-surface-variant">
            Add an extra layer of security to your account.
          </p>
          <div className="flex items-center justify-between rounded border border-outline-variant/30 bg-surface-container-low p-2">
            <span className="text-label-md text-on-surface">Authenticator App</span>
            <button
              type="button"
              role="switch"
              aria-checked={twoFactorEnabled}
              onClick={() => setTwoFactorEnabled((prev) => !prev)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                twoFactorEnabled ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
