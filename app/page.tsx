import Hero from "./components/Hero";
import Summary from "./components/Summary";
import SectionHeader from "./components/SectionHeader";
import ArtifactCard from "./components/ArtifactCard";
import ScrollReveal from "./components/ScrollReveal";
import PageTransition from "./components/PageTransition";
import SiteMapDiagram from "./components/SiteMapDiagram";
import WorkflowDiagram from "./components/WorkflowDiagram";
import SkillsMapDiagram from "./components/SkillsMapDiagram";
import { artifacts } from "@/lib/artifacts";

export default function Home() {
  const buildArtifacts = artifacts.filter((a) => a.section === "build");
  const createArtifacts = artifacts.filter((a) => a.section === "create");

  return (
    <PageTransition>
      <div>
        <Hero />

        <SiteMapDiagram />

        <ScrollReveal>
          <Summary />
        </ScrollReveal>

        <div id="artifacts" className="py-16">

          <WorkflowDiagram />

          <ScrollReveal>
            <SectionHeader title="How I Build with AI" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buildArtifacts.map((artifact, i) => (
              <ScrollReveal key={artifact.id} delay={i * 0.1}>
                <ArtifactCard artifact={artifact} />
              </ScrollReveal>
            ))}
          </div>

          <div>
            <ScrollReveal>
              <SectionHeader title="How I Create with AI" />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {createArtifacts.map((artifact, i) => (
                <ScrollReveal key={artifact.id} delay={i * 0.1}>
                  <ArtifactCard artifact={artifact} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <SkillsMapDiagram />
      </div>
    </PageTransition>
  );
}
