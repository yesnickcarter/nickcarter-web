import type { Artifact } from "@/lib/artifacts";

interface ArtifactDetailProps {
  artifact: Artifact;
}

export default function ArtifactDetail({ artifact }: ArtifactDetailProps) {
  const paragraphs = artifact.detail.split("\n\n");

  return (
    <article
      id={artifact.id}
      className="py-10 border-l-[3px] border-[#111] pl-6 mb-10"
    >
      <h3 className="text-xl font-[family-name:var(--font-serif)] font-normal text-[#111]">
        {artifact.title}
      </h3>
      <p className="mt-2 text-base text-[#777] italic">{artifact.oneLiner}</p>

      <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#999]">
        {artifact.skills.join(" \u00B7 ")}
      </p>

      <div className="mt-6 space-y-4 max-w-[65ch]">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-[1.7] text-[#555]">
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
              className="inline-block border-2 border-[#111] px-5 py-2 text-sm font-medium text-[#111] hover:bg-[#111] hover:text-white transition-colors"
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
