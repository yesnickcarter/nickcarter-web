interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-zinc-900">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-base text-zinc-500">{subtitle}</p>
      )}
    </div>
  );
}
