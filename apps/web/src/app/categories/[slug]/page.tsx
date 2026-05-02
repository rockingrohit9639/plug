import Link from "next/link";

const SERVERS_BY_CATEGORY: Record<string, { slug: string; name: string; description: string; grade: "A" | "B" | "C" | "D" | "F"; trust_score: number; github_stars: number }[]> = {
  filesystem: [
    { slug: "modelcontextprotocol-server-filesystem", name: "@modelcontextprotocol/server-filesystem", description: "Secure file operations with configurable access controls", grade: "A", trust_score: 94, github_stars: 2400 },
    { slug: "mcp-server-fs-extra", name: "mcp-server-fs-extra", description: "Extended filesystem operations with copy, move, and watch", grade: "B", trust_score: 76, github_stars: 180 },
  ],
  databases: [
    { slug: "mcp-server-sqlite", name: "@modelcontextprotocol/server-sqlite", description: "SQLite database operations with read/write access", grade: "A", trust_score: 89, github_stars: 340 },
    { slug: "supabase-mcp-server", name: "@supabase/mcp-server", description: "Direct Supabase database access, auth, and storage", grade: "B", trust_score: 82, github_stars: 510 },
  ],
  "dev-tools": [
    { slug: "modelcontextprotocol-server-github", name: "@modelcontextprotocol/server-github", description: "GitHub API integration — repos, issues, PRs, and code search", grade: "A", trust_score: 91, github_stars: 1800 },
    { slug: "browser-tools-mcp", name: "browser-tools-mcp", description: "Browser automation with screenshots, console, and network", grade: "C", trust_score: 61, github_stars: 890 },
  ],
  "web-apis": [
    { slug: "tavily-mcp-server", name: "tavily-mcp-server", description: "Web search and content extraction via Tavily API", grade: "B", trust_score: 78, github_stars: 620 },
    { slug: "modelcontextprotocol-server-github", name: "@modelcontextprotocol/server-github", description: "GitHub API integration — repos, issues, PRs, and code search", grade: "A", trust_score: 91, github_stars: 1800 },
  ],
  "ai-llms": [
    { slug: "tavily-mcp-server", name: "tavily-mcp-server", description: "Web search and content extraction via Tavily API", grade: "B", trust_score: 78, github_stars: 620 },
  ],
  cloud: [
    { slug: "supabase-mcp-server", name: "@supabase/mcp-server", description: "Direct Supabase database access, auth, and storage", grade: "B", trust_score: 82, github_stars: 510 },
  ],
  communication: [],
  "data-analytics": [],
};

const CATEGORY_NAMES: Record<string, string> = {
  filesystem: "File Systems",
  databases: "Databases",
  "ai-llms": "AI & LLMs",
  "web-apis": "Web & APIs",
  "dev-tools": "Dev Tools",
  cloud: "Cloud",
  communication: "Communication",
  "data-analytics": "Data & Analytics",
};

function GradeBadge({ grade }: { grade: "A" | "B" | "C" | "D" | "F" }) {
  const colors = {
    A: "bg-grade-a/10 text-grade-a border-grade-a/30",
    B: "bg-grade-b/10 text-grade-b border-grade-b/30",
    C: "bg-grade-c/10 text-grade-c border-grade-c/30",
    D: "bg-grade-d/10 text-grade-d border-grade-d/30",
    F: "bg-grade-f/10 text-grade-f border-grade-f/30",
  };
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-md border font-bold text-sm ${colors[grade]}`}>
      {grade}
    </span>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servers = SERVERS_BY_CATEGORY[slug] ?? [];
  const categoryName = CATEGORY_NAMES[slug] ?? slug;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
        <Link href="/categories" className="hover:text-foreground transition-colors">
          Categories
        </Link>
        <span>/</span>
        <span className="text-foreground">{categoryName}</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
      <p className="mt-2 text-zinc-500">{servers.length} servers in this category</p>

      <div className="mt-8 flex flex-col gap-3">
        {servers.map((server) => (
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
        {servers.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <p>No servers scanned in this category yet.</p>
            <Link href="/scan" className="mt-2 inline-block text-accent hover:text-accent-hover text-sm">
              Scan a server
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
