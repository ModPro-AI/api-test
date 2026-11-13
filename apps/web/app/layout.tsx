import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ModPro Pokédex",
  description: "Frontend for the ModPro NestJS API test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} min-h-screen bg-neutral-950 text-neutral-100`}>
        <header className="border-b border-neutral-800">
          <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold">
              ModPro Pokédex
            </Link>
            <span className="text-xs text-neutral-500">powered by apps/api</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
