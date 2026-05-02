import Link from "next/link";

const CATEGORIES = [
  { name: "File Systems", slug: "filesystem", count: 42, description: "Local and remote file operations" },
  { name: "Databases", slug: "databases", count: 38, description: "SQL, NoSQL, and vector databases" },
  { name: "AI & LLMs", slug: "ai-llms", count: 31, description: "AI model integrations and pipelines" },
  { name: "Web & APIs", slug: "web-apis", count: 56, description: "HTTP clients, web scraping, REST/GraphQL" },
  { name: "Dev Tools", slug: "dev-tools", count: 47, description: "Git, CI/CD, testing, and debugging" },
  { name: "Cloud", slug: "cloud", count: 29, description: "AWS, GCP, Azure, and cloud services" },
  { name: "Communication", slug: "communication", count: 18, description: "Email, Slack, Discord, and messaging" },
  { name: "Data & Analytics", slug: "data-analytics", count: 23, description: "Data processing and visualization" },
];

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      <p className="mt-2 text-zinc-500">Browse MCP servers by category</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-accent/50 hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{cat.name}</span>
              <span className="text-sm text-zinc-500">{cat.count} servers</span>
            </div>
            <p className="mt-1 text-sm text-zinc-500">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
