import Link from "next/link";

const MOCK_SERVER = {
  slug: "modelcontextprotocol-server-filesystem",
  name: "@modelcontextprotocol/server-filesystem",
  description: "Secure file operations with configurable access controls",
  ai_summary:
    "A well-maintained MCP server providing filesystem access with explicit permission boundaries. Tools are clearly scoped and descriptions are honest. No evidence of tool poisoning or hidden directives. Dependencies are minimal and well-audited.",
  source_url: "https://github.com/modelcontextprotocol/servers",
  npm_package: "@modelcontextprotocol/server-filesystem",
  author: "Anthropic",
  license: "MIT",
  transport: "stdio" as const,
  trust_score: 94,
  grade: "A" as const,
  github_stars: 2400,
  last_commit: "2026-04-28",
  open_issues: 12,
  has_tests: true,
  has_typescript: true,
  dependency_count: 3,
  categories: ["filesystem"],
  scanned_at: "2026-04-30",
  scanned_version: "1.2.0",
  status: "complete" as const,
};

const MOCK_TOOLS = [
  {
    id: "1",
    name: "read_file",
    description: "Read the complete contents of a file from the file system.",
    input_schema: { path: "string" },
    security_flags: [],
    description_honesty: "clean" as const,
  },
  {
    id: "2",
    name: "write_file",
    description: "Create a new file or overwrite an existing file with new contents.",
    input_schema: { path: "string", content: "string" },
    security_flags: ["filesystem-write"],
    description_honesty: "clean" as const,
  },
  {
    id: "3",
    name: "list_directory",
    description: "List files and directories at a given path.",
    input_schema: { path: "string" },
    security_flags: [],
    description_honesty: "clean" as const,
  },
  {
    id: "4",
    name: "move_file",
    description: "Move or rename files and directories.",
    input_schema: { source: "string", destination: "string" },
    security_flags: ["filesystem-write"],
    description_honesty: "clean" as const,
  },
  {
    id: "5",
    name: "search_files",
    description: "Recursively search for files matching a pattern.",
    input_schema: { path: "string", pattern: "string" },
    security_flags: [],
    description_honesty: "clean" as const,
  },
];

const MOCK_FINDINGS = [
  {
    id: "1",
    severity: "low" as const,
    category: "filesystem-access",
    title: "Broad filesystem read access",
    description:
      "The read_file tool can access any path within the configured allowed directories. Ensure the allowed directories are scoped appropriately.",
    evidence: "No path restriction beyond configured roots",
    location: "src/index.ts:45",
  },
  {
    id: "2",
    severity: "info" as const,
    category: "filesystem-access",
    title: "Write operations available",
    description:
      "The server exposes write_file and move_file tools that can modify the filesystem. This is expected behavior but should be noted.",
    evidence: "write_file, move_file tools registered",
    location: "src/index.ts:78",
  },
];

function GradeBadge({ grade, size = "lg" }: { grade: "A" | "B" | "C" | "D" | "F"; size?: "sm" | "lg" }) {
  const colors = {
    A: "bg-grade-a/10 text-grade-a border-grade-a/30",
    B: "bg-grade-b/10 text-grade-b border-grade-b/30",
    C: "bg-grade-c/10 text-grade-c border-grade-c/30",
    D: "bg-grade-d/10 text-grade-d border-grade-d/30",
    F: "bg-grade-f/10 text-grade-f border-grade-f/30",
  };
  const sizes = {
    sm: "w-8 h-8 text-sm",
    lg: "w-14 h-14 text-2xl",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg border font-bold ${colors[grade]} ${sizes[size]}`}
    >
      {grade}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" | "low" | "info" }) {
  const colors = {
    critical: "bg-grade-f/10 text-grade-f",
    high: "bg-grade-d/10 text-grade-d",
    medium: "bg-grade-c/10 text-grade-c",
    low: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    info: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors[severity]}`}>
      {severity}
    </span>
  );
}

function InstallTabs() {
  const commands = {
    "Claude Code": `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents`,
    Cursor: `// .cursor/mcp.json\n{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/Documents"]\n    }\n  }\n}`,
    "VS Code": `// .vscode/mcp.json\n{\n  "servers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/Documents"]\n    }\n  }\n}`,
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        {Object.keys(commands).map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              i === 0
                ? "bg-zinc-50 dark:bg-zinc-800 text-foreground"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="p-4 bg-zinc-950 overflow-x-auto">
        <pre className="text-sm text-zinc-300 font-mono whitespace-pre">
          {commands["Claude Code"]}
        </pre>
      </div>
    </div>
  );
}

export default async function ServerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = MOCK_SERVER;
  const tools = MOCK_TOOLS;
  const findings = MOCK_FINDINGS;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="flex items-start gap-5">
        <GradeBadge grade={server.grade} />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold font-mono tracking-tight">{server.name}</h1>
          <p className="mt-1 text-zinc-500">{server.description}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500">
            <span>{server.author}</span>
            <span>•</span>
            <span>{server.license}</span>
            <span>•</span>
            <span>{server.github_stars.toLocaleString()} stars</span>
            <span>•</span>
            <span>{server.transport}</span>
          </div>
        </div>
      </div>

      {/* Trust Score */}
      <div className="mt-8 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-zinc-500">Trust Score</span>
            <div className="text-3xl font-bold mt-0.5">{server.trust_score}/100</div>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <div className="text-center">
              <div className="font-medium text-foreground">{server.dependency_count}</div>
              <div>deps</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">{server.has_tests ? "Yes" : "No"}</div>
              <div>tests</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">{server.has_typescript ? "Yes" : "No"}</div>
              <div>TypeScript</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">{server.open_issues}</div>
              <div>issues</div>
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-grade-a"
            style={{ width: `${server.trust_score}%` }}
          />
        </div>
      </div>

      {/* AI Summary */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">AI Summary</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {server.ai_summary}
        </p>
      </section>

      {/* Install */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Install</h2>
        <InstallTabs />
      </section>

      {/* Tools */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          Tools <span className="text-zinc-500 font-normal text-sm">({tools.length})</span>
        </h2>
        <div className="flex flex-col gap-2">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{tool.name}</span>
                {tool.security_flags.map((flag) => (
                  <span
                    key={flag}
                    className="px-2 py-0.5 rounded text-xs bg-grade-c/10 text-grade-c font-medium"
                  >
                    {flag}
                  </span>
                ))}
                <span
                  className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${
                    tool.description_honesty === "clean"
                      ? "bg-grade-a/10 text-grade-a"
                      : tool.description_honesty === "suspicious"
                        ? "bg-grade-c/10 text-grade-c"
                        : "bg-grade-f/10 text-grade-f"
                  }`}
                >
                  {tool.description_honesty}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Findings */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          Security Findings{" "}
          <span className="text-zinc-500 font-normal text-sm">({findings.length})</span>
        </h2>
        <div className="flex flex-col gap-2">
          {findings.map((finding) => (
            <div
              key={finding.id}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <SeverityBadge severity={finding.severity} />
                <span className="text-sm font-medium">{finding.title}</span>
                <span className="ml-auto text-xs text-zinc-500 font-mono">{finding.location}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{finding.description}</p>
              {finding.evidence && (
                <p className="mt-1 text-xs text-zinc-400 font-mono">
                  Evidence: {finding.evidence}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Metadata */}
      <section className="mt-8 pb-8">
        <h2 className="text-lg font-semibold mb-3">Metadata</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-zinc-500">Source</span>
            <div className="mt-0.5 font-medium truncate">
              <Link
                href={server.source_url}
                className="text-accent hover:text-accent-hover"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Package</span>
            <div className="mt-0.5 font-mono text-xs">{server.npm_package}</div>
          </div>
          <div>
            <span className="text-zinc-500">Last commit</span>
            <div className="mt-0.5">{server.last_commit}</div>
          </div>
          <div>
            <span className="text-zinc-500">Scanned</span>
            <div className="mt-0.5">{server.scanned_at}</div>
          </div>
          <div>
            <span className="text-zinc-500">Version</span>
            <div className="mt-0.5">{server.scanned_version}</div>
          </div>
          <div>
            <span className="text-zinc-500">Categories</span>
            <div className="mt-0.5">{server.categories.join(", ")}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
