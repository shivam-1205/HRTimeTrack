type AnalyticsProgressProps = {
  percent: number;
  colorClass: string;
};

export function AnalyticsProgress({ percent, colorClass }: AnalyticsProgressProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className="mt-3 h-1 w-full overflow-hidden rounded-full bg-outline-variant/25"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

type AnalyticsDonutProps = {
  percent: number;
  size?: number;
};

export function AnalyticsDonut({ percent, size = 48 }: AnalyticsDonutProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-outline-variant/40"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        className="text-primary transition-all duration-500 ease-out"
      />
    </svg>
  );
}
