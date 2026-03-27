import Link from "next/link";

interface DocumentPageProps {
  title: string;
  description: string;
  backLink: { href: string; label: string };
  children: React.ReactNode;
}

export default function DocumentPage({
  title,
  description,
  backLink,
  children,
}: DocumentPageProps) {
  return (
    <div className="py-16 px-6 md:px-0">
      <Link
        href={backLink.href}
        className="text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
      >
        &larr; {backLink.label}
      </Link>

      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-base text-zinc-500 max-w-2xl">{description}</p>

      <div className="mt-10 max-w-3xl">{children}</div>
    </div>
  );
}
