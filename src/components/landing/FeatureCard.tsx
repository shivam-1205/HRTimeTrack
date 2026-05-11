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
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 mb-6" />

      <h3 className="text-2xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-slate-600">
        {description}
      </p>
    </div>
  );
}