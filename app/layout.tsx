import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nick Carter — Engineering Leader & AI Builder",
  description:
    "Eighteen years in engineering leadership. Director-level experience in regulated medical devices at Becton Dickinson and Dexcom. Hands-on AI builder shipping real systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-[#111] font-[family-name:var(--font-inter)]">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 px-6">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
