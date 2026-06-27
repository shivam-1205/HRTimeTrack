import { UPCOMING_HERO } from "./holidays";

type NextHolidayHeroProps = {
  year: number;
};

export default function NextHolidayHero({ year }: NextHolidayHeroProps) {
  const hero = UPCOMING_HERO[year];

  return (
    <section className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-container/10 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-8 p-6 md:flex-row md:p-12">
        <div className="flex-1">
          <span className="mb-4 inline-block rounded-full border border-tertiary-container/30 bg-tertiary-container/20 px-2 py-1 text-caption font-medium uppercase tracking-wide text-tertiary">
            Next Upcoming Holiday
          </span>
          <h2 className="mb-2 text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface">
            {hero.name}
          </h2>
          <p className="mb-6 text-body-lg text-on-surface-variant">{hero.fullDate}</p>
          <div className="flex gap-4">
            <div className="min-w-[80px] rounded-lg border border-outline-variant bg-surface-container px-6 py-4 text-center shadow-sm">
              <span className="block text-h2 font-semibold text-primary">{hero.days}</span>
              <span className="mt-1 block text-caption uppercase text-on-surface-variant">
                Days
              </span>
            </div>
            <div className="min-w-[80px] rounded-lg border border-outline-variant bg-surface-container px-6 py-4 text-center shadow-sm">
              <span className="block text-h2 font-semibold text-primary">
                {String(hero.hours).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-caption uppercase text-on-surface-variant">
                Hours
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-outline-variant shadow-sm md:h-64 md:w-1/3">
          <img
            src={hero.image}
            alt={`${hero.name} decoration`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
