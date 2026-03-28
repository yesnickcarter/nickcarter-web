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

function ResourceBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-[10px] bg-[#fff7ed] text-[#b45309] px-2.5 py-0.5 rounded-full border border-[#fed7aa]">
      {label}
    </span>
  );
}

function ServiceBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#f5f3f0] border border-[#e8e4df] rounded-md p-4">
      <div className="font-[family-name:var(--font-serif)] text-[13px] text-[#1a1a1a]">{title}</div>
      <div className="text-[12px] text-[#6b6560] leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  );
}

function VaultBox({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="border-l-[3px] border-[#b45309] border-t border-r border-b border-t-[#e8e4df] border-r-[#e8e4df] border-b-[#e8e4df] bg-white rounded-md p-4">
      <div className="font-[family-name:var(--font-serif)] text-[14px] text-[#1a1a1a]">{title}</div>
      <div className="text-[12px] text-[#6b6560] leading-relaxed mt-1">
        {lines.map((line, i) => (
          <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="py-3 text-center">
      <div className="text-[#b45309] text-xl">↕</div>
      <div className="text-[10px] uppercase tracking-[1.5px] text-[#a69e95] -mt-0.5">{label}</div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="relative border-t-2 border-[#e8e4df] my-8">
      <span className="absolute -top-2.5 left-5 bg-[#faf9f7] px-3 text-[10px] uppercase tracking-[2px] text-[#b45309]">
        {label}
      </span>
    </div>
  );
}

function LayerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[2px] text-[#a69e95] mb-2">{children}</div>
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="my-16 py-12 -mx-4 px-4 md:-mx-8 md:px-8 bg-[#faf9f7] rounded-lg">
      <FadeIn>
        <h2 className="font-[family-name:var(--font-serif)] text-2xl text-[#b45309] mb-1">
          Architecture
        </h2>
        <p className="text-sm text-[#6b6560] mb-10">
          How context flows from the user to AI tools — and back
        </p>
      </FadeIn>

      {/* AI Tools */}
      <FadeIn delay={0.1}>
        <LayerLabel>AI Tools</LayerLabel>
        <div className="flex gap-3 justify-center flex-wrap">
          {["Claude Desktop", "Claude Code", "ChatGPT", "Gemini"].map((tool) => (
            <span key={tool} className="bg-[#f0eeeb] border border-[#e8e4df] rounded-full px-4 py-2 text-[12px] text-[#4a4540]">
              {tool}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* Connections */}
      <FadeIn delay={0.15}>
        <div className="flex justify-center gap-10 py-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-[1.5px] text-[#a69e95]">MCP Protocol</span>
            <div className="w-0.5 h-6 bg-[#b45309]" />
            <div className="w-2 h-2 bg-[#b45309] rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-[1.5px] text-[#d4d0cc]">Copy / Paste</span>
            <div className="w-0.5 h-6 bg-[#e8e4df]" />
            <div className="w-2 h-2 bg-[#e8e4df] rounded-full" />
          </div>
        </div>
      </FadeIn>

      {/* MCP Server */}
      <FadeIn delay={0.2}>
        <LayerLabel>Local Server (localhost:7891)</LayerLabel>
        <div className="border-2 border-[#b45309] bg-[#fffbf5] rounded-md p-4">
          <div className="font-[family-name:var(--font-serif)] text-base text-[#1a1a1a]">MCP Server</div>
          <div className="text-[12px] text-[#6b6560] mt-1">
            stdio transport · 8 resource types · session tracking (UUID + date + tool)
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <ResourceBadge label="lore://me" />
            <ResourceBadge label="vault://permanent/*" />
            <ResourceBadge label="vault://workspace/*" />
            <ResourceBadge label="vault://temp/*" />
            <ResourceBadge label="docs://lorehaven/*" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.25}><Arrow label="File System" /></FadeIn>

      {/* Vault */}
      <FadeIn delay={0.3}>
        <LayerLabel>Haven Vault (~/LoreHaven/)</LayerLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <VaultBox title="Lore" lines={["Core document", "300–600 words", "Always loaded"]} />
          <VaultBox title="Permanent" lines={["5–10 curated files", "Auto-indexed", "AI-readable"]} />
          <VaultBox title="Workspace" lines={["Active projects", "Per-project README", "Working files"]} />
          <VaultBox title="Temp" lines={["Session artifacts", "Date + UUID", "Review & migrate"]} />
        </div>
      </FadeIn>

      <FadeIn delay={0.35}><SectionDivider label="Desktop Client (Electron)" /></FadeIn>

      {/* Client Services */}
      <FadeIn delay={0.4}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ServiceBox title="Vault Watcher" desc="fs.watch on ~/LoreHaven/<br/>Rebuilds index on change" />
          <ServiceBox title="Config Merge" desc="Atomic key-level merge<br/>Claude Desktop config" />
          <ServiceBox title="Auth Service" desc="Browser OAuth<br/>OS keychain (keytar)" />
          <ServiceBox title="Sync Service" desc="Lore → cloud backup<br/>Pull on first launch" />
        </div>
      </FadeIn>

      <FadeIn delay={0.45}><Arrow label="API (HTTPS)" /></FadeIn>

      {/* Cloud */}
      <FadeIn delay={0.5}>
        <LayerLabel>Cloud (api.lorehaven.ai)</LayerLabel>
        <div className="grid grid-cols-3 gap-3">
          <ServiceBox title="Auth & Accounts" desc="OAuth, sessions, subscription" />
          <ServiceBox title="Lore Storage" desc="Versioned backup, schema migration" />
          <ServiceBox title="Starter Packs" desc="Distributed to clients on sync" />
        </div>
      </FadeIn>

      <FadeIn delay={0.55}><SectionDivider label="Web (lorehaven.ai)" /></FadeIn>

      {/* Web */}
      <FadeIn delay={0.6}>
        <div className="grid grid-cols-2 gap-3">
          <ServiceBox title="Lore Builder Wizard" desc="Plain-English questions → structured Lore<br/>No install required (Tier 1 value)" />
          <ServiceBox title="Account & Billing" desc="Sign up, subscribe, download client" />
        </div>
      </FadeIn>
    </div>
  );
}
