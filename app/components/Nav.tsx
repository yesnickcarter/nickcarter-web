import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-0">
      <Link href="/" className="text-lg font-semibold text-zinc-900 hover:text-zinc-700 transition-colors">
        Nick Carter
      </Link>
      <Link href="/portfolio" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
        Portfolio
      </Link>
    </nav>
  );
}
