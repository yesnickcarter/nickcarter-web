import Hero from "./components/Hero";
import Summary from "./components/Summary";
import SectionHeader from "./components/SectionHeader";
import ArtifactCard from "./components/ArtifactCard";
import { artifacts } from "@/lib/artifacts";

export default function Home() {
  const buildArtifacts = artifacts.filter((a) => a.section === "build");
  const createArtifacts = artifacts.filter((a) => a.section === "create");

  return (
    <div>
      <Hero />
      <Summary />

      <div id="artifacts" className="py-16">
        <SectionHeader title="How I Build with AI" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {buildArtifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>

        <div>
          <SectionHeader title="How I Create with AI" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {createArtifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
