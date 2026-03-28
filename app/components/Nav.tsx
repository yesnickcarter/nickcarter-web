import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-lg font-[family-name:var(--font-serif)] text-[#1a1a1a] hover:text-[#6b6560] transition-colors"
      >
        Nick Carter
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/patterns"
          className="nav-link text-sm tracking-wide uppercase text-[#6b6560] hover:text-[#1a1a1a] transition-colors"
        >
          AI Patterns
        </Link>
        <Link
          href="/portfolio"
          className="nav-link text-sm tracking-wide uppercase text-[#6b6560] hover:text-[#1a1a1a] transition-colors"
        >
          Portfolio
        </Link>
      </div>
    </nav>
  );
}
