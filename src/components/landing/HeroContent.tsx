// components/landing/hero/HeroContent.tsx
"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LightModeIcon from '@mui/icons-material/LightMode';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function HeroContent() {
  return (
    <div className="flex-1 flex flex-col items-start justify-center gap-6 z-10 w-full max-w-2xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-primary rounded-full border border-gray-200">
        <LightModeIcon className="text-[#6366F1] text-[18px]" fontSize="small" />

        <span className="text-[#6366F1]">Introducing AI-Powered Payroll</span>
      </div>

      <h1 className="text-6xl font-bold leading-tight text-slate-900">
        Elevate Your <br />

        <span className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
          Workforce Experience
        </span>
      </h1>

      <p className="text-lg text-slate-600 max-w-lg">
        The modern, intuitive HRMS platform designed to streamline
        payroll, enhance employee wellness, and ensure global compliance.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <button className="px-8 py-3 bg-[#4F46E5] text-white rounded-xl shadow-md hover:opacity-90 transition flex items-center gap-2">
          Start Free Trial
          <ArrowForwardIcon />
        </button>

        <button className="px-8 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2">
          <PlayCircleIcon />
          Watch Demo
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-white" />
        </div>

        <span className="text-sm text-slate-500">
          Trusted by 10,000+ HR professionals
        </span>
      </div>
    </div>
  );
}