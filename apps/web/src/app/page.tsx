import Link from "next/link";

const CATEGORIES = [
  { name: "File Systems", slug: "filesystem", count: 42 },
  { name: "Databases", slug: "databases", count: 38 },
  { name: "AI & LLMs", slug: "ai-llms", count: 31 },
  { name: "Web & APIs", slug: "web-apis", count: 56 },
  { name: "Dev Tools", slug: "dev-tools", count: 47 },
  { name: "Cloud", slug: "cloud", count: 29 },
  { name: "Communication", slug: "communication", count: 18 },
  { name: "Data & Analytics", slug: "data-analytics", count: 23 },
];

const RECENT_SERVERS = [
  {
    slug: "modelcontextprotocol-server-filesystem",
    name: "@modelcontextprotocol/server-filesystem",
    description: "Secure file operations with configurable access controls",
    grade: "A" as const,
    trust_score: 94,
    categories: ["filesystem"],
    github_stars: 2400,
    scanned_at: "2026-04-30",
  },
  {
    slug: "modelcontextprotocol-server-github",
    name: "@modelcontextprotocol/server-github",
    description:
      "GitHub API integration — repos, issues, PRs, and code search",
    grade: "A" as const,
    trust_score: 91,
    categories: ["dev-tools", "web-apis"],
    github_stars: 1800,
    scanned_at: "2026-04-30",
  },
  {
    slug: "tavily-mcp-server",
    name: "tavily-mcp-server",
    description: "Web search and content extraction via Tavily API",
    grade: "B" as const,
    trust_score: 78,
    categories: ["web-apis", "ai-llms"],
    github_stars: 620,
    scanned_at: "2026-04-29",
  },
  {
    slug: "supabase-mcp-server",
    name: "@supabase/mcp-server",
    description: "Direct Supabase database access, auth, and storage",
    grade: "B" as const,
    trust_score: 82,
    categories: ["databases", "cloud"],
    github_stars: 510,
    scanned_at: "2026-04-29",
  },
  {
    slug: "browser-tools-mcp",
    name: "browser-tools-mcp",
    description: "Browser automation with screenshots, console, and network",
    grade: "C" as const,
    trust_score: 61,
    categories: ["dev-tools", "web-apis"],
    github_stars: 890,
    scanned_at: "2026-04-28",
  },
  {
    slug: "mcp-server-sqlite",
    name: "@modelcontextprotocol/server-sqlite",
    description: "SQLite database operations with read/write access",
    grade: "A" as const,
    trust_score: 89,
    categories: ["databases"],
    github_stars: 340,
    scanned_at: "2026-04-28",
  },
];

function GradeBadge({ grade }: { grade: "A" | "B" | "C" | "D" | "F" }) {
  const colors = {
    A: "bg-grade-a/10 text-grade-a border-grade-a/30",
    B: "bg-grade-b/10 text-grade-b border-grade-b/30",
    C: "bg-grade-c/10 text-grade-c border-grade-c/30",
    D: "bg-grade-d/10 text-grade-d border-grade-d/30",
    F: "bg-grade-f/10 text-grade-f border-grade-f/30",
  };
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md border font-bold text-sm ${colors[grade]}`}
    >
      {grade}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero + Search */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Find trusted MCP servers
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-xl">
            AI-verified security analysis for every MCP server. Browse grades,
            inspect tools, and install with confidence.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search MCP servers..."
                className="w-full h-14 rounded-xl bg-zinc-800 border border-zinc-700 px-5 pr-24 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 h-10 px-5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm text-zinc-500">
            <span>Popular:</span>
            <Link href="/search?q=filesystem" className="hover:text-white transition-colors">filesystem</Link>
            <Link href="/search?q=github" className="hover:text-white transition-colors">github</Link>
            <Link href="/search?q=database" className="hover:text-white transition-colors">database</Link>
            <Link href="/search?q=browser" className="hover:text-white transition-colors">browser</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
          <span>
            <strong className="text-foreground">523</strong> servers scanned
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>
            <strong className="text-foreground">47</strong> security issues
            found
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span>
            <strong className="text-foreground">8</strong> categories
          </span>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link
            href="/categories"
            className="text-sm text-zinc-500 hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-accent/50 hover:bg-accent/5 transition-colors"
            >
              <span className="font-medium text-sm">{cat.name}</span>
              <span className="text-xs text-zinc-500">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently scanned */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recently scanned</h2>
          <Link
            href="/scan"
            className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            + Scan new server
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {RECENT_SERVERS.map((server) => (
            <Link
              key={server.slug}
              href={`/servers/${server.slug}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <GradeBadge grade={server.grade} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium truncate">
                    {server.name}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 truncate mt-0.5">
                  {server.description}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500">
                <span>{server.github_stars.toLocaleString()} stars</span>
                <span>{server.scanned_at}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
