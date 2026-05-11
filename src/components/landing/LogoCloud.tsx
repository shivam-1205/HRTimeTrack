// components/landing/logo-cloud/LogoCloud.tsx
"use client";
export default function LogoCloud() {
  const logos = [
    "Acme Corp",
    "GlobalTech",
    "TerraForm",
    "NovaSys",
    "ZapInc",
  ];

  return (
    <section className="w-full bg-white border-y border-gray-200 py-8">
      <div className="max-w-[1440px] mx-auto px-6">
        <p className="text-center text-sm text-slate-500 mb-6 uppercase tracking-wider">
          Trusted by innovative teams worldwide
        </p>

        <div className="flex flex-wrap justify-center items-center gap-10 opacity-60">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-2xl font-bold text-slate-700"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}