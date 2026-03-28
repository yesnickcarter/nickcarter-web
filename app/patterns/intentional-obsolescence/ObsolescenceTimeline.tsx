"use client";

interface TimelineNode {
  day: string;
  label: string;
  lines: string[];
}

const nodes: TimelineNode[] = [
  {
    day: "Day 0",
    label: "BUILD",
    lines: [
      "Write the spec.",
      "Ship the skill.",
      "Document the why.",
    ],
  },
  {
    day: "Day 30",
    label: "MEASURE",
    lines: [
      "Track what works.",
      "Note the constraints.",
      "Version the changes.",
    ],
  },
  {
    day: "Day 60",
    label: "QUESTION",
    lines: [
      "Ask: is there a",
      "better way now?",
      "Model improved?",
    ],
  },
  {
    day: "Day 90",
    label: "REBUILD",
    lines: [
      "New spec. New skill.",
      "Old version archived.",
      "90 days starts over.",
    ],
  },
];

export default function ObsolescenceTimeline() {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] mb-2">
        The 90-Day Cycle
      </h2>
      <p className="text-base text-[#6b6560] mb-10">
        Every workflow runs this loop. Not because the current version is broken — because something better will exist.
      </p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <div
          className="absolute top-[52px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-[2px] bg-[#b45309]"
          aria-hidden="true"
        />

        <div className="grid grid-cols-4 gap-4">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Day label */}
              <span className="text-xs uppercase tracking-[0.12em] text-[#a69e95] mb-3 font-mono">
                {node.day}
              </span>

              {/* Node circle */}
              <div className="relative z-10 w-[52px] h-[52px] rounded-full bg-[#b45309] flex items-center justify-center shadow-md mb-4">
                <span className="text-white text-[10px] font-semibold tracking-[0.08em] leading-none text-center px-1">
                  {node.label}
                </span>
              </div>

              {/* Description lines */}
              <div className="space-y-0.5">
                {node.lines.map((line, j) => (
                  <p key={j} className="text-xs text-[#6b6560] leading-snug">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative">
        {/* Vertical connector line */}
        <div className="absolute left-[25px] top-[26px] bottom-[26px] w-[2px] bg-[#b45309]" aria-hidden="true" />

        <div className="space-y-10">
          {nodes.map((node, i) => (
            <div key={i} className="relative flex gap-5 items-start">
              {/* Node circle */}
              <div className="relative z-10 flex-shrink-0 w-[52px] h-[52px] rounded-full bg-[#b45309] flex flex-col items-center justify-center shadow-md">
                <span className="text-white text-[9px] font-semibold tracking-[0.06em] leading-none text-center px-1">
                  {node.label}
                </span>
              </div>

              {/* Content */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-[0.12em] text-[#a69e95] font-mono block mb-1">
                  {node.day}
                </span>
                <div className="space-y-0.5">
                  {node.lines.map((line, j) => (
                    <p key={j} className="text-sm text-[#6b6560] leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
