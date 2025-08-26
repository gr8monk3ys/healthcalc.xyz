-- Supabase saved_results table for cloud-synced calculator history.
-- Requires Supabase Auth (auth.users) to be available.

create table if not exists saved_results (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  calculator_type text not null,
  calculator_name text not null,
  data jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_saved_results_user on saved_results(user_id);
create index idx_saved_results_type on saved_results(user_id, calculator_type);

alter table saved_results enable row level security;

create policy "Users can read own results" on saved_results
  for select using (auth.uid() = user_id);
create policy "Users can insert own results" on saved_results
  for insert with check (auth.uid() = user_id);
create policy "Users can update own results" on saved_results
  for update using (auth.uid() = user_id);
create policy "Users can delete own results" on saved_results
  for delete using (auth.uid() = user_id);
