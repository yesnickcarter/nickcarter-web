import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-lg font-[family-name:var(--font-serif)] text-[#111] hover:text-[#555] transition-colors"
      >
        Nick Carter
      </Link>
      <Link
        href="/portfolio"
        className="text-sm tracking-wide uppercase text-[#555] hover:text-[#111] transition-colors"
      >
        Portfolio
      </Link>
    </nav>
  );
}
