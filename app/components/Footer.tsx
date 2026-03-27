export default function Footer() {
  const links = [
    { label: "Substack", href: "https://shipwithintent.substack.com" },
    { label: "YouTube", href: "https://www.youtube.com/@ShipWithIntent" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yes-nick-carter" },
    { label: "Email", href: "mailto:nick.carter@hey.com" },
  ];

  return (
    <footer className="border-t border-zinc-200 py-8 px-6 md:px-0 mt-16">
      <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-500">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="hover:text-zinc-900 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
