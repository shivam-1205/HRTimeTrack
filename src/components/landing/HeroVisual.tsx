// components/landing/hero/HeroVisual.tsx

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function HeroVisual() {
  return (
    <div className="flex-1 relative w-full min-h-[400px] lg:min-h-[500px] z-10 flex items-center justify-center">
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
          alt="office"
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-indigo-100/30" />
      </div>

      <div className="relative w-full max-w-md aspect-square flex flex-col justify-center items-center gap-6 p-6">
        {/* Wellness Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg w-[80%] rounded-2xl p-5 -translate-x-6 -translate-y-4 rotate-[-2deg] hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                <FavoriteIcon sx={{ fontSize: 18 }} />
              </div>

              <span className="font-semibold">
                Employee Wellness
              </span>
            </div>

            <span className="text-xs text-primary bg-[#6366F1]/50 px-2 py-1 rounded">
              +14%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">86%</span>

              <span className="text-sm text-slate-500">
                Engagement Score
              </span>
            </div>

            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="w-[86%] h-full bg-[#4F46E5] rounded-full" />
            </div>
          </div>
        </div>

        {/* Payroll Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg w-[85%] rounded-2xl p-5 translate-x-6 translate-y-4 rotate-[3deg] hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
                <PaymentsIcon sx={{ fontSize: 18 }} />
              </div>

              <span className="font-semibold">
                Payroll Automation
              </span>
            </div>

            <CheckCircleIcon className="text-green-500" />
          </div>

          <div className="flex justify-between items-center bg-white/50 rounded-xl p-4 border border-gray-200">
            <div>
              <p className="text-xs text-slate-500">
                Processing Time
              </p>

              <h4 className="font-semibold">12 mins</h4>
            </div>

            <div className="h-6 w-[1px] bg-gray-300" />

            <div>
              <p className="text-xs text-slate-500">
                Accuracy
              </p>

              <h4 className="font-semibold">99.9%</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}