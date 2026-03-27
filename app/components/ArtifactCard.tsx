import Link from "next/link";
import type { Artifact } from "@/lib/artifacts";

interface ArtifactCardProps {
  artifact: Artifact;
}

export default function ArtifactCard({ artifact }: ArtifactCardProps) {
  const href = artifact.deepDivePath || `/portfolio#${artifact.id}`;

  return (
    <Link
      href={href}
      className="group block border-l-[3px] border-[#111] pl-6 py-4 hover:pl-7 transition-all"
    >
      <h3 className="text-lg font-[family-name:var(--font-serif)] font-normal text-[#111] group-hover:text-[#555]">
        {artifact.title}
      </h3>
      <p className="mt-2 text-sm text-[#777] leading-relaxed">
        {artifact.oneLiner}
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#999]">
        {artifact.skills.join(" \u00B7 ")}
      </p>
      <p className="mt-3 text-sm font-medium text-[#111] group-hover:text-[#555] transition-colors">
        View Details &rarr;
      </p>
    </Link>
  );
}
