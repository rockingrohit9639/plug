# Plug

AI-verified security registry for MCP (Model Context Protocol) servers. The trust layer for the MCP ecosystem.

## What is Plug?

Plug scans MCP servers for security issues and generates trust grades. Developers can:

- **Browse** pre-scanned servers with security grades (A-F) and one-click install commands
- **Scan** any MCP server by pasting a GitHub URL — get a full security report in seconds
- **Install** with confidence using copy-paste commands for Claude Code, Cursor, and VS Code

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router) on Cloudflare Pages via `@opennextjs/cloudflare` |
| Styling | Tailwind CSS 4 |
| Linting | Biome |
| Compiler | React Compiler |
| Analysis engine | Cloudflare Workflows (durable, multi-step) |
| Database + Realtime | Supabase (Postgres) |
| LLM | Claude Haiku via Anthropic API |
| Package manager | bun |

## Development

```bash
bun install
bun dev
```

Open http://localhost:3000

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun run build` | Production build |
| `bun run lint` | Biome lint + format check |
| `bun run format` | Auto-format with Biome |

## Project Structure

```
src/app/
├── page.tsx                  # Homepage: search, categories, recent servers
├── scan/page.tsx             # Scan new server by GitHub URL
├── search/page.tsx           # Search results
├── categories/page.tsx       # Category listing
├── categories/[slug]/page.tsx # Servers filtered by category
└── servers/[slug]/page.tsx   # Server detail: grade, tools, findings, install
```

## Security Patterns Detected

1. Hidden directives in tool descriptions (`<IMPORTANT>`, `<HIDDEN>`, `<SYSTEM>`)
2. Filesystem path references (`~/.ssh`, `~/.cursor`, `~/.config`)
3. Parameter exfiltration (innocent params as covert data channels)
4. Cross-tool shadowing (one tool modifying another's behavior)
5. Instruction injection ("Before using this tool, first read...")
6. Obfuscation (base64, unicode tricks)

## Deployment

Deployed to Cloudflare Pages with `@opennextjs/cloudflare`.
