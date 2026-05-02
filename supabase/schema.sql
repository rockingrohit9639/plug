-- Plug: MCP Server Security Registry
-- Run this in your Supabase SQL editor

-- Servers table
create table servers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  ai_summary text,
  source_url text not null,
  npm_package text,
  author text,
  license text,
  transport text check (transport in ('stdio', 'http', 'sse')),
  trust_score integer check (trust_score >= 0 and trust_score <= 100),
  grade text check (grade in ('A', 'B', 'C', 'D', 'F')),
  github_stars integer default 0,
  last_commit date,
  open_issues integer default 0,
  has_tests boolean default false,
  has_typescript boolean default false,
  dependency_count integer default 0,
  categories text[] default '{}',
  scanned_at timestamptz,
  scanned_version text,
  status text not null default 'pending' check (status in ('pending', 'scanning', 'complete', 'error')),
  created_at timestamptz default now()
);

-- Tools table
create table tools (
  id uuid primary key default gen_random_uuid(),
  server_id uuid not null references servers(id) on delete cascade,
  name text not null,
  description text,
  input_schema jsonb,
  security_flags text[] default '{}',
  description_honesty text default 'clean' check (description_honesty in ('clean', 'suspicious', 'malicious')),
  created_at timestamptz default now()
);

-- Findings table
create table findings (
  id uuid primary key default gen_random_uuid(),
  server_id uuid not null references servers(id) on delete cascade,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low', 'info')),
  category text not null check (category in (
    'tool-poisoning', 'data-exfiltration', 'credential-access',
    'filesystem-access', 'network-access', 'shadowing',
    'obfuscation', 'dependency-risk'
  )),
  title text not null,
  description text,
  evidence text,
  location text,
  created_at timestamptz default now()
);

-- Indexes
create index idx_servers_slug on servers(slug);
create index idx_servers_status on servers(status);
create index idx_servers_grade on servers(grade);
create index idx_servers_source_url on servers(source_url);
create index idx_tools_server_id on tools(server_id);
create index idx_findings_server_id on findings(server_id);
create index idx_findings_severity on findings(severity);

-- Enable realtime for scan progress
alter publication supabase_realtime add table servers;

-- Row-level security (public read, service role write)
alter table servers enable row level security;
alter table tools enable row level security;
alter table findings enable row level security;

create policy "Public read access" on servers for select using (true);
create policy "Public read access" on tools for select using (true);
create policy "Public read access" on findings for select using (true);

create policy "Service role write" on servers for all using (auth.role() = 'service_role');
create policy "Service role write" on tools for all using (auth.role() = 'service_role');
create policy "Service role write" on findings for all using (auth.role() = 'service_role');
