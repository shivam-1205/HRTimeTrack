"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LightModeIcon from "@mui/icons-material/LightMode";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function HeroContent() {
  return (
    <div className="z-10 flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface-container-low px-3 py-1">
        <LightModeIcon className="text-secondary" sx={{ fontSize: 18 }} />
        <span className="text-label-md font-medium text-primary">Introducing AI-Powered Payroll</span>
      </div>

      <h1 className="text-5xl font-bold leading-tight text-on-surface sm:text-6xl">
        Elevate Your <br />
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Workforce Experience
        </span>
      </h1>

      <p className="max-w-lg text-body-lg text-on-surface-variant">
        The modern, intuitive HRMS platform designed to streamline payroll, enhance employee
        wellness, and ensure global compliance.
      </p>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-on-primary shadow-md transition hover:opacity-90"
        >
          Start Free Trial
          <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-outline bg-surface-container-lowest px-8 py-3 text-on-surface transition hover:bg-surface-container-low"
        >
          <PlayCircleIcon sx={{ fontSize: 18 }} />
          Watch Demo
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full border-2 border-surface-container-lowest bg-surface-variant" />
          <div className="h-8 w-8 rounded-full border-2 border-surface-container-lowest bg-outline" />
          <div className="h-8 w-8 rounded-full border-2 border-surface-container-lowest bg-on-surface-variant" />
        </div>
        <span className="text-caption text-on-surface-variant">
          Trusted by 10,000+ HR professionals
        </span>
      </div>
    </div>
  );
}
