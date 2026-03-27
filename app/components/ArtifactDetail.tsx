import type { Artifact } from "@/lib/artifacts";

interface ArtifactDetailProps {
  artifact: Artifact;
}

export default function ArtifactDetail({ artifact }: ArtifactDetailProps) {
  const paragraphs = artifact.detail.split("\n\n");

  return (
    <article id={artifact.id} className="py-10 border-b border-zinc-100 last:border-b-0">
      <h3 className="text-xl font-semibold text-zinc-900">{artifact.title}</h3>
      <p className="mt-2 text-base text-zinc-600 italic">{artifact.oneLiner}</p>

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

      <div className="mt-6 space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-zinc-700">
            {paragraph}
          </p>
        ))}
      </div>

      {artifact.links && artifact.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {artifact.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
