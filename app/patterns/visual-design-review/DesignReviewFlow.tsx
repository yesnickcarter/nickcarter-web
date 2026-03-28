"use client";

interface TerminalLine {
  prompt?: boolean;
  text: string;
  dim?: boolean;
}

interface BrowserOption {
  label: string;
  selected?: boolean;
  description?: string;
}

interface FlowStep {
  number: number;
  title: string;
  description: string;
  terminal?: TerminalLine[];
  browser?: {
    url: string;
    options: BrowserOption[];
  };
}

const steps: FlowStep[] = [
  {
    number: 1,
    title: "AI writes a design question",
    description:
      "Renders 2-4 options as interactive HTML and pushes to your browser.",
    terminal: [
      { prompt: true, text: "Check localhost \u2014 showing three design directions" },
      { text: "  Warm Minimal  |  Dark Technical  |  Editorial", dim: true },
      { text: "  Which direction feels right?", dim: true },
    ],
  },
  {
    number: 2,
    title: "You see the options",
    description:
      "Real mockups with enough fidelity to make a decision.",
    browser: {
      url: "localhost:59958",
      options: [
        { label: "Warm Minimal", description: "Soft tones, airy layout" },
        { label: "Dark Technical", description: "High contrast, code-forward" },
        { label: "Editorial", selected: true, description: "Serif type, amber accent" },
      ],
    },
  },
  {
    number: 3,
    title: "You click and respond",
    description:
      "Click your preference in the browser. Confirm in the terminal.",
    terminal: [
      { prompt: true, text: "c" },
      { text: "", dim: true },
      { text: "  \u2713 Selected: Editorial", dim: false },
      { text: "  Refining hero layout within editorial direction...", dim: true },
    ],
  },
  {
    number: 4,
    title: "AI advances or iterates",
    description:
      "Clean decision \u2192 next question. Needs refinement \u2192 new options within the chosen direction.",
    browser: {
      url: "localhost:59958",
      options: [
        { label: "Classic", description: "Quiet authority, centered" },
        { label: "Bold", selected: true, description: "Stacked name, accent bar" },
      ],
    },
  },
  {
    number: 5,
    title: "Decisions locked, AI builds",
    description:
      "All visual decisions made. The AI implements the chosen design.",
    terminal: [
      { prompt: true, text: "Design locked. Building editorial style..." },
      { text: "  Direction: Editorial", dim: true },
      { text: "  Hero: Bold (accent bar)", dim: true },
      { text: "  Cards: Accent Bar", dim: true },
      { text: "  Animations: All six selected", dim: true },
      { text: "", dim: true },
      { text: "  Writing components...", dim: true },
    ],
  },
];

function TerminalBox({ lines }: { lines: TerminalLine[] }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#252525]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-[#666] font-mono">terminal</span>
      </div>
      {/* Terminal content */}
      <div className="px-4 py-3 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={line.dim ? "text-[#666]" : "text-[#e8e4df]"}>
            {line.prompt && <span className="text-[#b45309]">$ </span>}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserBox({ url, options }: { url: string; options: BrowserOption[] }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-[#e8e4df]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f0eeeb] border-b border-[#e8e4df]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 bg-white rounded px-3 py-0.5 text-[11px] text-[#a69e95] font-mono">
          {url}
        </div>
      </div>
      {/* Browser content */}
      <div className="p-4">
        <div className={`grid gap-3 ${options.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {options.map((opt) => (
            <div
              key={opt.label}
              className={`relative rounded-md p-3 text-center transition-all ${
                opt.selected
                  ? "border-2 border-[#b45309] bg-[#fdf8f0]"
                  : "border border-[#e8e4df] bg-[#faf9f7]"
              }`}
            >
              {opt.selected && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#b45309] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="text-sm font-semibold text-[#1a1a1a]">{opt.label}</div>
              {opt.description && (
                <div className="mt-1 text-[11px] text-[#6b6560]">{opt.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignReviewFlow() {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] mb-2">
        The Flow
      </h2>
      <p className="text-base text-[#6b6560] mb-10">
        Five steps from question to implementation. Each design decision is isolated, visual, and fast.
      </p>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[19px] top-[40px] bottom-[40px] w-[2px] bg-[#e8e4df]" />

        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="relative flex gap-6">
              {/* Step number circle */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#b45309] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{step.number}</span>
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-lg font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-[#6b6560] leading-relaxed">
                  {step.description}
                </p>

                {/* Visualization */}
                <div className="mt-4">
                  {step.terminal && <TerminalBox lines={step.terminal} />}
                  {step.browser && (
                    <BrowserBox url={step.browser.url} options={step.browser.options} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
