"use client";

import { motion } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const skills = [
  { name: "Specification Precision", artifacts: ["LoreHaven", "CLAUDE.md", "Ship With Intent", "Agentic", "This Site", "Album"] },
  { name: "Evaluation & Quality Judgment", artifacts: ["Ship With Intent", "Agentic", "This Site", "Album"] },
  { name: "Decomposition for Delegation", artifacts: ["LoreHaven", "Ship With Intent", "Agentic", "This Site"] },
  { name: "Failure Pattern Recognition", artifacts: ["LoreHaven", "Agentic"] },
  { name: "Trust Boundary Design", artifacts: ["LoreHaven"] },
  { name: "Context Architecture", artifacts: ["LoreHaven", "CLAUDE.md", "Agentic"] },
  { name: "Cost & Token Economics", artifacts: [] },
];

const allArtifacts = ["LoreHaven", "CLAUDE.md", "Ship With Intent", "Agentic", "This Site", "Album"];

export default function SkillsMapDiagram() {
  return (
    <div className="my-16">
      <FadeIn>
        <h2 className="font-[family-name:var(--font-serif)] text-xl text-[#b45309] mb-1">
          Seven Skills, Mapped to Artifacts
        </h2>
        <p className="text-sm text-[#6b6560] mb-2">
          Based on the{" "}
          <a href="https://shipwithintent.substack.com" className="text-[#b45309] underline underline-offset-2 hover:text-[#92400e]">
            Nate Jones framework
          </a>
          {" "}— seven AI skills that show up consistently across $150K–$400K job postings
        </p>
        <p className="text-xs text-[#a69e95] mb-8">
          Each dot represents an artifact that demonstrates the skill. Empty rows are gaps I'm actively closing.
        </p>
      </FadeIn>

      {/* Header row — artifact names */}
      <FadeIn delay={0.1}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left pb-3 pr-4 w-[220px]">
                  <span className="text-[10px] uppercase tracking-[2px] text-[#a69e95]">Skill</span>
                </th>
                {allArtifacts.map((artifact) => (
                  <th key={artifact} className="pb-3 px-2 text-center w-[70px]">
                    <span className="text-[10px] text-[#6b6560] leading-tight block">{artifact}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, i) => (
                <FadeIn key={skill.name} delay={0.15 + i * 0.05}>
                  <tr className="border-t border-[#e8e4df]">
                    <td className="py-3 pr-4">
                      <div className="font-[family-name:var(--font-serif)] text-[13px] text-[#1a1a1a]">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-[#a69e95] mt-0.5">
                        {skill.artifacts.length > 0
                          ? `${skill.artifacts.length} artifact${skill.artifacts.length !== 1 ? "s" : ""}`
                          : "Building"}
                      </div>
                    </td>
                    {allArtifacts.map((artifact) => (
                      <td key={artifact} className="py-3 px-2 text-center">
                        {skill.artifacts.includes(artifact) ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-[#b45309] mx-auto" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-[#f0eeeb] mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                </FadeIn>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="mt-6 flex gap-6 text-[11px] text-[#a69e95]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#b45309]" />
            Demonstrated
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f0eeeb]" />
            Not covered by this artifact
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
