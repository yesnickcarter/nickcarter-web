import type { Metadata } from "next";
import Link from "next/link";
import { artifacts } from "@/lib/artifacts";
import ScrollReveal from "@/app/components/ScrollReveal";
import PageTransition from "@/app/components/PageTransition";

export const metadata: Metadata = {
  title: "Until The Day Is Over — AI-Augmented Concept Album — Nick Carter",
  description:
    "A 14-track concept album: a daughter sings her mother's life. Composite characters, human-written songs, AI production tools, and a philosophy of transparency.",
};

const documents = [
  {
    title: "The Concept",
    href: "/portfolio/until-the-day-is-over/concept",
    description:
      "Joan and Margot — a daughter singing her mother's life through thirteen remembered songs and one invented from a conversation",
  },
  {
    title: "The Band",
    href: "/portfolio/until-the-day-is-over/band",
    description:
      "Four composite characters — Joan, Arc, Leigh, and Kid Fisto — each drawn from real people with real histories",
  },
  {
    title: "Track Listing",
    href: "/portfolio/until-the-day-is-over/tracks",
    description:
      "Fourteen tracks across four acts: the world opens, love and loss, the world closes in, and reckoning",
  },
  {
    title: "AI & Production",
    href: "/portfolio/until-the-day-is-over/production",
    description:
      "Human-written songs with an AI production layer — what that means, what it doesn't, and the disclosure philosophy",
  },
];

export default function UntilTheDayIsOverPage() {
  const artifact = artifacts.find((a) => a.id === "until-the-day-is-over");
  if (!artifact) return null;

  const paragraphs = artifact.detail.split("\n\n");

  return (
    <PageTransition>
      <div className="py-16">
        <Link
          href="/portfolio"
          className="text-xs uppercase tracking-[0.12em] text-[#a69e95] hover:text-[#1a1a1a] transition-colors"
        >
          &larr; Back to Portfolio
        </Link>

        <ScrollReveal>
          <h1 className="mt-8 text-3xl md:text-4xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] leading-tight">
            Until The Day Is Over — A Concept Album
          </h1>

          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#a69e95]">
            {artifact.skills.join(" \u00B7 ")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 max-w-[65ch] space-y-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.7] text-[#4a4540]">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-20 border-t-2 border-[#1a1a1a] pt-6">
            <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] mb-8">
              Documents
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {documents.map((doc, i) => (
                <ScrollReveal key={doc.href} delay={i * 0.08}>
                  <Link
                    href={doc.href}
                    className="group block border-t border-[#e8e4df] pt-5 hover:border-[#b45309] transition-colors"
                  >
                    <h3 className="text-base font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] group-hover:text-[#6b6560]">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6b6560] leading-relaxed">
                      {doc.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-[#b45309] group-hover:text-[#92400e] transition-colors view-details-link">
                      Read <span className="view-details-arrow">&rarr;</span>
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
