import Link from "next/link";

const ALL_SERVERS = [
  {
    slug: "modelcontextprotocol-server-filesystem",
    name: "@modelcontextprotocol/server-filesystem",
    description: "Secure file operations with configurable access controls",
    grade: "A" as const,
    trust_score: 94,
    categories: ["filesystem"],
    github_stars: 2400,
  },
  {
    slug: "modelcontextprotocol-server-github",
    name: "@modelcontextprotocol/server-github",
    description: "GitHub API integration — repos, issues, PRs, and code search",
    grade: "A" as const,
    trust_score: 91,
    categories: ["dev-tools", "web-apis"],
    github_stars: 1800,
  },
  {
    slug: "tavily-mcp-server",
    name: "tavily-mcp-server",
    description: "Web search and content extraction via Tavily API",
    grade: "B" as const,
    trust_score: 78,
    categories: ["web-apis", "ai-llms"],
    github_stars: 620,
  },
  {
    slug: "supabase-mcp-server",
    name: "@supabase/mcp-server",
    description: "Direct Supabase database access, auth, and storage",
    grade: "B" as const,
    trust_score: 82,
    categories: ["databases", "cloud"],
    github_stars: 510,
  },
  {
    slug: "browser-tools-mcp",
    name: "browser-tools-mcp",
    description: "Browser automation with screenshots, console, and network",
    grade: "C" as const,
    trust_score: 61,
    categories: ["dev-tools", "web-apis"],
    github_stars: 890,
  },
  {
    slug: "mcp-server-sqlite",
    name: "@modelcontextprotocol/server-sqlite",
    description: "SQLite database operations with read/write access",
    grade: "A" as const,
    trust_score: 89,
    categories: ["databases"],
    github_stars: 340,
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";

  const results = query
    ? ALL_SERVERS.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.categories.some((c) => c.includes(query))
      )
    : ALL_SERVERS;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <form action="/search" className="relative mb-8">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search MCP servers..."
          className="w-full h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 pr-24 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1.5 h-9 px-4 rounded-md bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>

      {query && (
        <p className="text-sm text-zinc-500 mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{q}&quot;
        </p>
      )}

      <div className="flex flex-col gap-3">
        {results.map((server) => (
          <Link
            key={server.slug}
            href={`/servers/${server.slug}`}
            className="flex items-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <GradeBadge grade={server.grade} />
            <div className="flex-1 min-w-0">
              <span className="font-mono text-sm font-medium">{server.name}</span>
              <p className="text-sm text-zinc-500 truncate mt-0.5">{server.description}</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500">
              <span>Score: {server.trust_score}</span>
              <span>{server.github_stars.toLocaleString()} stars</span>
            </div>
          </Link>
        ))}
        {results.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg">No servers found</p>
            <p className="mt-2 text-sm">
              Try a different search term or{" "}
              <Link href="/scan" className="text-accent hover:text-accent-hover">
                scan a new server
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
