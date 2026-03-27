import type { Metadata } from "next";
import SectionHeader from "../components/SectionHeader";
import ArtifactDetail from "../components/ArtifactDetail";
import { artifacts } from "@/lib/artifacts";

export const metadata: Metadata = {
  title: "Portfolio — Nick Carter",
  description:
    "AI systems, regulated medical device platforms, and creative projects. Full portfolio of what Nick Carter builds and how.",
};

export default function PortfolioPage() {
  const buildArtifacts = artifacts.filter((a) => a.section === "build");
  const createArtifacts = artifacts.filter((a) => a.section === "create");

  const externalLinks = [
    { label: "Ship With Intent (Substack)", href: "https://shipwithintent.substack.com" },
    { label: "Ship With Intent (YouTube)", href: "https://www.youtube.com/@ShipWithIntent" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yes-nick-carter" },
    { label: "Email", href: "mailto:nick.carter@hey.com" },
  ];

  return (
    <div className="py-16">
      <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#111] leading-tight">
        Portfolio
      </h1>
      <p className="mt-3 text-base text-[#777] max-w-2xl">
        A closer look at how I build and create with AI.
      </p>

      <div>
        <SectionHeader title="How I Build with AI" />
        {buildArtifacts.map((artifact) => (
          <ArtifactDetail key={artifact.id} artifact={artifact} />
        ))}
      </div>

      <div>
        <SectionHeader title="How I Create with AI" />
        {createArtifacts.map((artifact) => (
          <ArtifactDetail key={artifact.id} artifact={artifact} />
        ))}
      </div>

      <div>
        <SectionHeader title="Links" />
        <div className="flex flex-wrap gap-4">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="inline-block border-2 border-[#111] px-5 py-3 text-sm font-medium text-[#111] hover:bg-[#111] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
