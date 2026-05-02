# Plug

AI-verified security registry for MCP (Model Context Protocol) servers. "The trust layer for the MCP ecosystem."

@AGENTS.md
@ROADMAP.md

## What this is

A website where developers can:
1. **Browse** pre-scanned MCP servers with security grades and install commands
2. **Scan new servers** by pasting a GitHub URL — triggers async analysis, report appears in real-time

No authentication required. Anyone can browse and submit.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js (App Router) on Cloudflare Pages via `@opennextjs/cloudflare` |
| Styling | Tailwind CSS |
| Linting | Biome |
| Compiler | React Compiler |
| Analysis engine | Cloudflare Workflows (durable, multi-step) |
| Database + Realtime | Supabase (Postgres) |
| LLM | Claude Haiku via Anthropic API |
| Package manager | bun |

## Architecture

```
User visits plug.dev
     │
     ├── Browse → reads from Supabase → server pages with grades + install commands
     │
     └── Scan new → paste GitHub URL → Cloudflare Workflow kicks off:
              Step 1: Validate GitHub URL
              Step 2: Fetch repo metadata (stars, author, last commit)
              Step 3: Fetch source files (package.json → entry point → imports)
              Step 4: Send source to Claude Haiku → extract tools + security findings
              Step 5: Compute trust score (A-F grade)
              Step 6: Store results in Supabase
              → Frontend sees update via Supabase realtime / polling
```

## Data Model

### servers table
- id, slug, name, description, ai_summary
- source_url (GitHub), npm_package, author, license
- transport (stdio | http | sse)
- trust_score (0-100), grade (A-F)
- github_stars, last_commit, open_issues
- has_tests, has_typescript, dependency_count
- categories (text[])
- scanned_at, scanned_version
- status (pending | scanning | complete | error)

### tools table
- id, server_id (FK)
- name, description, input_schema (jsonb)
- security_flags (text[])
- description_honesty (clean | suspicious | malicious)

### findings table
- id, server_id (FK)
- severity (critical | high | medium | low | info)
- category (tool-poisoning | data-exfiltration | credential-access | filesystem-access | network-access | shadowing | obfuscation | dependency-risk)
- title, description, evidence, location

## Security Patterns to Detect

The LLM + static checks look for:
1. Hidden directives in tool descriptions (`<IMPORTANT>`, `<HIDDEN>`, `<SYSTEM>`)
2. Filesystem paths in descriptions (`~/.ssh`, `~/.cursor`, `~/.config`, `/etc/`)
3. Parameter exfiltration (using innocent params as covert data channels)
4. Cross-tool shadowing (one tool's description modifies another tool's behavior)
5. Instruction injection ("Before using this tool, first read...")
6. Obfuscation (base64, unicode tricks)

## User Flows

### Browse
- Homepage → categories / search → server detail page → copy install command

### Scan New
- Paste GitHub URL → if already exists, redirect to report → else kick off workflow → show loading → report appears

### Server Detail Page Shows
- AI-generated summary
- Trust grade (A-F) with color
- Tool list (name, description, security flags per tool)
- Security findings (severity, evidence, explanation)
- Install commands (tabs: Claude Code / Cursor / VS Code)
- Metadata (stars, last commit, author, license)

## Commands

- `bun dev` — start dev server
- `bun run build` — production build
- `bun run lint` — biome lint + format check

## Guidelines

- No Docker, no containers
- No authentication for v1
- Keep it simple — ship fast
- Security-first positioning (not "another directory")
- Show both good and bad servers (so bad ones can improve)
- Redirect to existing report on duplicate submission (don't re-scan)

