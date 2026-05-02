# Plug — Roadmap

## Backlog

- [ ] Check domain availability (plug.dev, getplug.dev, plugmcp.dev)
- [ ] Create GitHub repo for Plug
- [ ] Set up Supabase project (database + realtime)
- [ ] Set up Cloudflare project (Pages + Workers + Workflows)
- [ ] Get Anthropic API key for Haiku calls

## Week 1 — Build & Ship

- [ ] Scaffold project: Next.js + `@opennextjs/cloudflare` + Tailwind
- [ ] Supabase schema: servers, tools, findings tables
- [ ] Cloudflare Workflow: analyze MCP server
  - [ ] Step 1: Validate GitHub URL
  - [ ] Step 2: Fetch repo metadata (stars, author, last commit)
  - [ ] Step 3: Fetch source files (package.json → entry point → imports)
  - [ ] Step 4: Send source to Claude Haiku → extract tools + security findings
  - [ ] Step 5: Compute trust score (A-F grade)
  - [ ] Step 6: Store results in Supabase
- [ ] Homepage: hero, search bar, category grid, recently scanned
- [ ] Server detail page: AI summary, trust grade, tool list, security findings
- [ ] Server detail page: install commands (tabs: Claude Code / Cursor / VS Code)
- [ ] "Scan new server" input: paste GitHub URL → kicks off workflow
- [ ] Progress/loading state while workflow runs (Supabase realtime or polling)
- [ ] Redirect to existing report if server already scanned
- [ ] Category pages with filters and sorting
- [ ] Search by name, description, category
- [ ] Responsive / mobile
- [ ] Seed database: batch scan top 50-100 servers from awesome-mcp-servers
- [ ] Deploy to Cloudflare Pages, connect domain

## Week 2 — Content & Polish

- [ ] Scan remaining 400+ servers from awesome-mcp-servers
- [ ] Aggregate stats from all scans
- [ ] Write "State of MCP Security 2026" blog post
- [ ] OG images for social sharing
- [ ] Improve search (natural language / fuzzy)
- [ ] "Alternatives" section on server pages (similar servers)
- [ ] SEO: meta tags, structured data, sitemap

## Launch

- [ ] Show HN: "We scanned 500 MCP servers for security issues"
- [ ] Twitter thread with key findings + screenshots
- [ ] Post to r/ClaudeAI, r/cursor
- [ ] Product Hunt submission
- [ ] Pitch newsletters (TLDR AI, Ben's Bites, Console.dev)
- [ ] Tag @simonw, @swyx, @alexalbert__ on Twitter

## Later — Automated Discovery

- [ ] GitHub crawler: discover new MCP server repos automatically
- [ ] npm watcher: new packages matching MCP patterns
- [ ] Re-scan on new releases (watch GitHub releases API)
- [ ] Rate limiting on scan submissions (by IP)
- [ ] Notification to author when their server is scanned

## Later — Integrations

- [ ] Public REST API
- [ ] VS Code extension: browse + one-click install
- [ ] Claude Code plugin: `/plug search`
- [ ] "Verified by Plug" badge SVG for READMEs
- [ ] GitHub Action: auto-scan on push (for authors)
- [ ] Open-source the scanner as CLI tool

## Later — Monetize

- [ ] User accounts (favorites, alerts)
- [ ] Server author dashboard (claim, fix issues)
- [ ] Verified publisher badge (paid tier)
- [ ] Priority scanning (paid)
- [ ] Enterprise private registry
