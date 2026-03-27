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
      className="group block rounded-lg border border-zinc-200 p-6 hover:border-zinc-400 hover:shadow-sm transition-all"
    >
      <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-700">
        {artifact.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
        {artifact.oneLiner}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {artifact.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">
        View Details &rarr;
      </p>
    </Link>
  );
}
