"use client";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Link from "next/link";
import { useState } from "react";
import HandbookContent from "./HandbookContent";
import { HANDBOOK_POLICIES, getPolicyById } from "./handbookData";

export default function EmployeeHandbookView() {
  const [activePolicyId, setActivePolicyId] = useState(HANDBOOK_POLICIES[0].id);
  const policy = getPolicyById(activePolicyId);
  const [activeSectionId, setActiveSectionId] = useState(policy.sections[0].id);

  const handlePolicyChange = (policyId: string) => {
    const next = getPolicyById(policyId);
    setActivePolicyId(policyId);
    setActiveSectionId(next.sections[0].id);
  };

  const handleSectionSelect = (sectionId: string) => {
    setActiveSectionId(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <nav className="text-caption text-on-surface-variant">
        <Link href="/dashboard" className="hover:text-primary">
          Company Hub
        </Link>
        <span className="mx-2">›</span>
        <span>HR Policies</span>
        <span className="mx-2">›</span>
        <span className="text-on-surface">Employee Handbook</span>
      </nav>

      <header className="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-h1 font-semibold text-on-surface">Employee Handbook</h1>
          <p className="mt-1 max-w-full text-body-md text-on-surface-variant">
            Official corporate policies and code of conduct.
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90"
        >
          <DownloadOutlinedIcon sx={{ fontSize: 18 }} />
          Download PDF
        </button>
      </header>

      <div className="border-b border-outline-variant/40">
        <div className="flex gap-1 overflow-x-auto">
          {HANDBOOK_POLICIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handlePolicyChange(tab.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-label-md transition-colors ${
                activePolicyId === tab.id
                  ? "border-primary bg-primary-container/10 font-medium text-primary"
                  : "border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <HandbookContent
        policy={policy}
        activeSectionId={activeSectionId}
        onSectionSelect={handleSectionSelect}
      />
    </div>
  );
}
