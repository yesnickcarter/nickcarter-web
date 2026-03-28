"use client";

interface DiagramType {
  name: string;
  description: string;
  svg: React.ReactNode;
}

const diagramTypes: DiagramType[] = [
  {
    name: "Architecture Diagram",
    description: "What talks to what, and how.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Three stacked boxes connected by arrows */}
        <rect x="30" y="8" width="60" height="18" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="20" textAnchor="middle" fontSize="8" fill="#6b6560">Client</text>
        <rect x="30" y="41" width="60" height="18" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="53" textAnchor="middle" fontSize="8" fill="#6b6560">API</text>
        <rect x="30" y="74" width="60" height="18" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="86" textAnchor="middle" fontSize="8" fill="#6b6560">DB</text>
        {/* Arrows */}
        <line x1="60" y1="26" x2="60" y2="41" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="60" y1="59" x2="60" y2="74" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4a574" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    name: "Sequence Diagram",
    description: "What happens first, second, third.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Two lifelines */}
        <rect x="20" y="6" width="24" height="14" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="32" y="16" textAnchor="middle" fontSize="7" fill="#6b6560">A</text>
        <rect x="76" y="6" width="24" height="14" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="88" y="16" textAnchor="middle" fontSize="7" fill="#6b6560">B</text>
        <line x1="32" y1="20" x2="32" y2="94" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="88" y1="20" x2="88" y2="94" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,3" />
        {/* Horizontal arrows */}
        <line x1="32" y1="38" x2="88" y2="38" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#arrowSeq)" />
        <text x="60" y="34" textAnchor="middle" fontSize="6" fill="#6b6560">request</text>
        <line x1="88" y1="58" x2="32" y2="58" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#arrowSeq)" />
        <text x="60" y="54" textAnchor="middle" fontSize="6" fill="#6b6560">response</text>
        <line x1="32" y1="78" x2="88" y2="78" stroke="#b45309" strokeWidth="1.5" markerEnd="url(#arrowSeq)" />
        <text x="60" y="74" textAnchor="middle" fontSize="6" fill="#6b6560">confirm</text>
        <defs>
          <marker id="arrowSeq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b45309" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    name: "Entity Relationship",
    description: "How do these things relate to each other.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Three entity boxes */}
        <rect x="6" y="10" width="32" height="16" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="22" y="21" textAnchor="middle" fontSize="7" fill="#6b6560">User</text>
        <rect x="82" y="10" width="32" height="16" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="98" y="21" textAnchor="middle" fontSize="7" fill="#6b6560">Post</text>
        <rect x="44" y="74" width="32" height="16" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="85" textAnchor="middle" fontSize="7" fill="#6b6560">Tag</text>
        {/* Diamond */}
        <polygon points="60,36 72,46 60,56 48,46" fill="none" stroke="#d4a574" strokeWidth="1.5" />
        <text x="60" y="49" textAnchor="middle" fontSize="6" fill="#6b6560">has</text>
        {/* Lines */}
        <line x1="38" y1="18" x2="48" y2="42" stroke="#d4a574" strokeWidth="1" />
        <line x1="82" y1="18" x2="72" y2="42" stroke="#d4a574" strokeWidth="1" />
        <line x1="60" y1="56" x2="60" y2="74" stroke="#d4a574" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "State Machine",
    description: "What states can this be in.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Start state (double circle) */}
        <circle cx="24" cy="50" r="12" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="24" cy="50" r="9" fill="none" stroke="#b45309" strokeWidth="1" />
        <text x="24" y="53" textAnchor="middle" fontSize="6" fill="#6b6560">idle</text>
        {/* Middle state */}
        <circle cx="60" cy="28" r="12" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="31" textAnchor="middle" fontSize="6" fill="#6b6560">run</text>
        {/* End state */}
        <circle cx="96" cy="50" r="12" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="96" y="53" textAnchor="middle" fontSize="6" fill="#6b6560">done</text>
        {/* Arrows */}
        <path d="M 34 43 Q 42 30 48 28" fill="none" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrowSM)" />
        <path d="M 72 28 Q 82 30 90 41" fill="none" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrowSM)" />
        <path d="M 60 40 Q 48 62 34 56" fill="none" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowSM)" />
        <defs>
          <marker id="arrowSM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4a574" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    name: "Component Diagram",
    description: "How is the code organized.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Outer box */}
        <rect x="8" y="6" width="104" height="88" rx="4" fill="none" stroke="#e8e4df" strokeWidth="1" />
        <text x="60" y="18" textAnchor="middle" fontSize="7" fill="#a69e95">app</text>
        {/* Inner boxes */}
        <rect x="16" y="26" width="36" height="20" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="34" y="39" textAnchor="middle" fontSize="7" fill="#6b6560">UI</text>
        <rect x="68" y="26" width="36" height="20" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="86" y="39" textAnchor="middle" fontSize="7" fill="#6b6560">API</text>
        <rect x="30" y="64" width="60" height="20" rx="2" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="77" textAnchor="middle" fontSize="7" fill="#6b6560">shared</text>
        {/* Dependency arrows */}
        <line x1="34" y1="46" x2="46" y2="64" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowComp)" />
        <line x1="86" y1="46" x2="74" y2="64" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowComp)" />
        <defs>
          <marker id="arrowComp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4a574" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    name: "Deployment Diagram",
    description: "Where does this run.",
    svg: (
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Cloud box */}
        <rect x="30" y="6" width="60" height="22" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="20" textAnchor="middle" fontSize="8" fill="#6b6560">Cloud</text>
        {/* CDN box */}
        <rect x="8" y="68" width="44" height="22" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="30" y="82" textAnchor="middle" fontSize="8" fill="#6b6560">CDN</text>
        {/* Server box */}
        <rect x="68" y="68" width="44" height="22" rx="3" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <text x="90" y="82" textAnchor="middle" fontSize="8" fill="#6b6560">Server</text>
        {/* Arrows from Cloud */}
        <line x1="48" y1="28" x2="34" y2="68" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrowDep)" />
        <line x1="72" y1="28" x2="86" y2="68" stroke="#d4a574" strokeWidth="1.5" markerEnd="url(#arrowDep)" />
        <defs>
          <marker id="arrowDep" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d4a574" />
          </marker>
        </defs>
      </svg>
    ),
  },
];

export default function DiagramTypes() {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a] mb-2">
        Diagram Types
      </h2>
      <p className="text-base text-[#6b6560] mb-10">
        Six ways to draw understanding. Each type catches a different category of misunderstanding before it becomes code.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagramTypes.map((diagram) => (
          <div
            key={diagram.name}
            className="border-l-[3px] border-[#b45309] bg-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="w-full h-24 mb-4 flex items-center justify-center bg-[#faf9f7] rounded">
                {diagram.svg}
              </div>
              <h3 className="text-base font-[family-name:var(--font-serif)] font-normal text-[#1a1a1a]">
                {diagram.name}
              </h3>
              <p className="mt-1 text-sm text-[#6b6560] leading-relaxed">
                {diagram.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
