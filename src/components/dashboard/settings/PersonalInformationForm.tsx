"use client";

import { USER_PROFILE } from "./settingsData";

const cardClass =
  "rounded-lg border border-outline-variant/50 bg-surface p-6 shadow-[0_4px_6px_-1px_rgba(53,37,205,0.05),0_2px_4px_-1px_rgba(53,37,205,0.03)]";

const inputClass =
  "w-full rounded border border-outline-variant bg-surface-container-lowest px-4 py-2 text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function PersonalInformationForm() {
  return (
    <article className={cardClass}>
      <h3 className="mb-4 border-b border-outline-variant/30 pb-2 text-h3 font-semibold text-on-surface">
        Personal Information
      </h3>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="phone" className="mb-1 block text-label-md text-on-surface">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            defaultValue={USER_PROFILE.phone}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="address" className="mb-1 block text-label-md text-on-surface">
            Address
          </label>
          <textarea
            id="address"
            rows={2}
            defaultValue={USER_PROFILE.address}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="emergency" className="mb-1 block text-label-md text-on-surface">
            Emergency Contact
          </label>
          <input
            id="emergency"
            type="text"
            defaultValue={USER_PROFILE.emergencyContact}
            className={inputClass}
          />
        </div>
        <div className="pt-2">
          <button
            type="button"
            className="w-full rounded border border-outline-variant bg-surface-container-lowest px-4 py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
          >
            Save Changes
          </button>
        </div>
      </form>
    </article>
  );
}
