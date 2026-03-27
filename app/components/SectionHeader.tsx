interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mt-16 mb-10 border-t-2 border-[#111] pt-6">
      <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#111]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#999]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
