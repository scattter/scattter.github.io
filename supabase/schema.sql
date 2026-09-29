begin;

create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  content text not null check (char_length(content) between 1 and 2000 and content ~ '[^[:space:]]'),
  created_at timestamptz not null default now()
);

create index if not exists moments_created_at_id_idx
  on public.moments (created_at desc, id desc);

alter table public.moments enable row level security;

revoke all on table public.moments from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on table public.moments to anon, authenticated;
grant insert (id, content) on table public.moments to authenticated;

drop policy if exists moments_read on public.moments;
create policy moments_read on public.moments
  for select to anon, authenticated using (true);

-- 未执行 set-owner.sql 时，RLS 默认拒绝所有账号发布。
commit;
