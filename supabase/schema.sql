begin;

create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  content text not null check (char_length(content) between 1 and 2000 and content ~ '[^[:space:]]'),
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

-- 升级时保留历史记录的公开状态；之后发布默认私密，重复执行不改已有状态。
alter table public.moments
  add column if not exists is_public boolean not null default true;
alter table public.moments alter column is_public set default false;

create index if not exists moments_created_at_id_idx
  on public.moments (created_at desc, id desc);

alter table public.moments enable row level security;

revoke all on table public.moments from anon, authenticated;
revoke insert (id, content, created_at, is_public), update (id, content, created_at, is_public)
  on table public.moments from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on table public.moments to anon, authenticated;
grant insert (id, content, is_public) on table public.moments to authenticated;
grant update (is_public) on table public.moments to authenticated;

drop policy if exists moments_read on public.moments;
create policy moments_read on public.moments
  for select to anon, authenticated using (is_public);

-- 新环境未执行 set-owner.sql 时，RLS 默认拒绝所有账号发布、修改或读取私密记录。
commit;
