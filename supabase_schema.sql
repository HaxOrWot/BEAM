-- BEAM P2P Platform Database Schema

-- Profiles and Handlers Registry
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  handle text not null unique,
  full_name text not null default '',
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  node_id text not null default '001',
  gateway_node text not null default 'Frankfurt-01 (18ms ping)',
  storage_limit_bytes bigint not null default 26843545600,
  storage_used_bytes bigint not null default 0,
  passphrase_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive handle lookup index
create unique index if not exists idx_profiles_handle_lower on public.profiles (lower(handle));
create index if not exists idx_profiles_email_lower on public.profiles (lower(email));

-- Transfers Audit & Manifest Log
create table if not exists public.transfers (
  id text primary key,
  sender_handle text not null,
  recipient_handle text not null,
  files jsonb not null default '[]'::jsonb,
  total_bytes bigint not null default 0,
  status text not null default 'completed' check (status in ('pending', 'streaming', 'completed', 'expired')),
  passkey_lock boolean not null default false,
  burn_on_download boolean not null default false,
  max_downloads integer not null default 3,
  download_count integer not null default 0,
  ttl_hours integer not null default 24,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_transfers_sender on public.transfers (sender_handle);
create index if not exists idx_transfers_recipient on public.transfers (recipient_handle);

-- Node Presence & Mesh Status
create table if not exists public.presence (
  handle text primary key,
  node_id text not null,
  is_online boolean not null default true,
  last_seen timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.transfers enable row level security;
alter table public.presence enable row level security;

-- Policies for Profiles
drop policy if exists "Public profiles read" on public.profiles;
create policy "Public profiles read" on public.profiles for select using (true);

drop policy if exists "Public profiles insert" on public.profiles;
create policy "Public profiles insert" on public.profiles for insert with check (true);

drop policy if exists "Public profiles update" on public.profiles;
create policy "Public profiles update" on public.profiles for update using (true);

-- Policies for Transfers
drop policy if exists "Transfers read" on public.transfers;
create policy "Transfers read" on public.transfers for select using (true);

drop policy if exists "Transfers insert" on public.transfers;
create policy "Transfers insert" on public.transfers for insert with check (true);

drop policy if exists "Transfers update" on public.transfers;
create policy "Transfers update" on public.transfers for update using (true);

-- Policies for Presence
drop policy if exists "Presence all" on public.presence;
create policy "Presence all" on public.presence for all using (true);

-- Enable Supabase Realtime publication
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'presence') then
    alter publication supabase_realtime add table public.presence;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'transfers') then
    alter publication supabase_realtime add table public.transfers;
  end if;
end $$;
