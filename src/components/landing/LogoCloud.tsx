"use client";

export default function LogoCloud() {
  const logos = ["Acme Corp", "GlobalTech", "TerraForm", "NovaSys", "ZapInc"];

  return (
    <section className="w-full border-y border-outline bg-surface-container-lowest py-8">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="mb-6 text-center text-caption uppercase tracking-wider text-on-surface-variant">
          Trusted by innovative teams worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
          {logos.map((logo) => (
            <div key={logo} className="text-2xl font-bold text-on-surface">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
