// components/landing/features/FeatureCard.tsx

type Props = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl border border-outline shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-surface-container-low mb-6" />

      <h3 className="text-2xl font-semibold text-on-surface mb-3">
        {title}
      </h3>

      <p className="text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}