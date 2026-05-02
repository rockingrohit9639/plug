import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plug — AI-Verified Security for MCP Servers",
  description:
    "Browse and scan MCP servers with AI-powered security analysis. Trust grades, tool inspection, and install commands for Claude Code, Cursor, and VS Code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-background/80 backdrop-blur-lg">
          <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">plug</span>
              <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                beta
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/scan"
                className="font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Scan Server
              </Link>
              <Link
                href="/categories"
                className="font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Categories
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
            Plug — The trust layer for the MCP ecosystem
          </div>
        </footer>
      </body>
    </html>
  );
}
